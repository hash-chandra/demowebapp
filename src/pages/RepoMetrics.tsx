import { useState, useEffect, useMemo } from 'react'

interface Repository {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  open_issues_count: number
  size: number
  language: string
  created_at: string
  updated_at: string
  topics: string[]
}

function RepoMetrics() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'stars' | 'forks' | 'updated'>('stars')
  const [filterLanguage, setFilterLanguage] = useState<string>('all')

  useEffect(() => {
    fetchRepositories()
  }, [])

  const fetchRepositories = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Fetch all repositories for the user
      // Note: GitHub API has a rate limit of 60 requests/hour for unauthenticated requests
      // For more than 100 repos, pagination would be needed
      const response = await fetch('https://api.github.com/users/hash-chandra/repos?per_page=100&sort=updated')
      
      if (!response.ok) {
        throw new Error(`Failed to fetch repositories: ${response.status}`)
      }
      
      const data = await response.json()
      setRepos(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getUniqueLanguages = useMemo((): string[] => {
    const languages = new Set<string>()
    repos.forEach(repo => {
      if (repo.language) {
        languages.add(repo.language)
      }
    })
    return Array.from(languages).sort()
  }, [repos])

  const getSortedAndFilteredRepos = useMemo((): Repository[] => {
    let filtered = repos

    // Filter by language
    if (filterLanguage !== 'all') {
      filtered = filtered.filter(repo => repo.language === filterLanguage)
    }

    // Sort repositories
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count
        case 'forks':
          return b.forks_count - a.forks_count
        case 'updated':
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        default:
          return 0
      }
    })

    return sorted
  }, [repos, sortBy, filterLanguage])

  const calculateTotalMetrics = useMemo(() => {
    const total = {
      repos: repos.length,
      stars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      forks: repos.reduce((sum, repo) => sum + repo.forks_count, 0),
      watchers: repos.reduce((sum, repo) => sum + repo.watchers_count, 0),
      issues: repos.reduce((sum, repo) => sum + repo.open_issues_count, 0),
      size: repos.reduce((sum, repo) => sum + repo.size, 0)
    }
    return total
  }, [repos])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const formatSize = (sizeInKB: number) => {
    if (sizeInKB < 1024) return `${sizeInKB} KB`
    const sizeInMB = (sizeInKB / 1024).toFixed(2)
    return `${sizeInMB} MB`
  }

  if (loading) {
    return (
      <div className="page">
        <h1>Repository Usage Metrics</h1>
        <div className="alert info" data-testid="loading-message">
          <div className="skeleton-loader" style={{ height: '200px' }}></div>
          <p style={{ marginTop: '1rem', textAlign: 'center' }}>Loading repositories from GitHub...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page">
        <h1>Repository Usage Metrics</h1>
        <div className="alert danger" data-testid="error-message">
          <strong>⚠️ Error:</strong> {error}
          <button 
            onClick={fetchRepositories}
            style={{ marginTop: '1rem' }}
            data-testid="retry-button"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const totalMetrics = calculateTotalMetrics
  const sortedRepos = getSortedAndFilteredRepos
  const languages = getUniqueLanguages

  return (
    <div className="page">
      <h1>📊 Repository Usage Metrics</h1>
      <p>Displaying usage metrics for all repositories under the GitHub handle <strong>hash-chandra</strong></p>

      {/* Summary Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div className="metric-card" data-testid="total-repos">
          <div className="metric-icon">📦</div>
          <div className="metric-value">{totalMetrics.repos}</div>
          <div className="metric-label">Total Repositories</div>
        </div>
        <div className="metric-card" data-testid="total-stars">
          <div className="metric-icon">⭐</div>
          <div className="metric-value">{totalMetrics.stars}</div>
          <div className="metric-label">Total Stars</div>
        </div>
        <div className="metric-card" data-testid="total-forks">
          <div className="metric-icon">🔱</div>
          <div className="metric-value">{totalMetrics.forks}</div>
          <div className="metric-label">Total Forks</div>
        </div>
        <div className="metric-card" data-testid="total-watchers">
          <div className="metric-icon">👁️</div>
          <div className="metric-value">{totalMetrics.watchers}</div>
          <div className="metric-label">Total Watchers</div>
        </div>
        <div className="metric-card" data-testid="total-issues">
          <div className="metric-icon">🐛</div>
          <div className="metric-value">{totalMetrics.issues}</div>
          <div className="metric-label">Open Issues</div>
        </div>
        <div className="metric-card" data-testid="total-size">
          <div className="metric-icon">💾</div>
          <div className="metric-value">{formatSize(totalMetrics.size)}</div>
          <div className="metric-label">Total Size</div>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <div>
          <label htmlFor="sort-by" style={{ marginRight: '0.5rem' }}>Sort by:</label>
          <select 
            id="sort-by"
            data-testid="sort-by-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'stars' | 'forks' | 'updated')}
            style={{ padding: '0.5rem' }}
          >
            <option value="stars">Stars ⭐</option>
            <option value="forks">Forks 🔱</option>
            <option value="updated">Last Updated 📅</option>
          </select>
        </div>

        <div>
          <label htmlFor="filter-language" style={{ marginRight: '0.5rem' }}>Language:</label>
          <select 
            id="filter-language"
            data-testid="filter-language-select"
            value={filterLanguage}
            onChange={(e) => setFilterLanguage(e.target.value)}
            style={{ padding: '0.5rem' }}
          >
            <option value="all">All Languages</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={fetchRepositories}
          data-testid="refresh-button"
          style={{ marginLeft: 'auto' }}
        >
          🔄 Refresh Data
        </button>
      </div>

      {/* Repository List */}
      <div className="repo-list" data-testid="repo-list">
        {sortedRepos.length === 0 ? (
          <div className="alert info">
            No repositories found with the selected filters.
          </div>
        ) : (
          sortedRepos.map((repo) => (
            <div 
              key={repo.id} 
              className="repo-card"
              data-testid={`repo-${repo.name}`}
            >
              <div className="repo-header">
                <h3>
                  <a 
                    href={repo.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-testid={`repo-link-${repo.name}`}
                  >
                    {repo.name}
                  </a>
                </h3>
                {repo.language && (
                  <span className="repo-language" data-testid={`repo-language-${repo.name}`}>
                    {repo.language}
                  </span>
                )}
              </div>
              
              {repo.description && (
                <p className="repo-description">{repo.description}</p>
              )}

              {repo.topics && repo.topics.length > 0 && (
                <div className="repo-topics">
                  {repo.topics.map(topic => (
                    <span key={topic} className="repo-topic">{topic}</span>
                  ))}
                </div>
              )}

              <div className="repo-stats">
                <span data-testid={`repo-stars-${repo.name}`}>
                  ⭐ {repo.stargazers_count}
                </span>
                <span data-testid={`repo-forks-${repo.name}`}>
                  🔱 {repo.forks_count}
                </span>
                <span data-testid={`repo-watchers-${repo.name}`}>
                  👁️ {repo.watchers_count}
                </span>
                <span data-testid={`repo-issues-${repo.name}`}>
                  🐛 {repo.open_issues_count}
                </span>
                <span data-testid={`repo-size-${repo.name}`}>
                  💾 {formatSize(repo.size)}
                </span>
              </div>

              <div className="repo-dates">
                <span>Created: {formatDate(repo.created_at)}</span>
                <span>Updated: {formatDate(repo.updated_at)}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .metric-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1.5rem;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .metric-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .metric-value {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 0.25rem;
        }

        .metric-label {
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .repo-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .repo-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .repo-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .repo-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .repo-header h3 {
          margin: 0;
          font-size: 1.25rem;
        }

        .repo-header a {
          color: #3182ce;
          text-decoration: none;
        }

        .repo-header a:hover {
          text-decoration: underline;
        }

        .repo-language {
          background: #edf2f7;
          color: #2d3748;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .repo-description {
          color: #4a5568;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .repo-topics {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .repo-topic {
          background: #bee3f8;
          color: #2c5282;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
        }

        .repo-stats {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
        }

        .repo-stats span {
          color: #4a5568;
          font-size: 0.9rem;
        }

        .repo-dates {
          display: flex;
          gap: 1.5rem;
          color: #718096;
          font-size: 0.85rem;
          flex-wrap: wrap;
        }

        .skeleton-loader {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 8px;
        }

        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        @media (max-width: 768px) {
          .metric-card {
            padding: 1rem;
          }

          .metric-value {
            font-size: 1.5rem;
          }

          .repo-stats, .repo-dates {
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default RepoMetrics
