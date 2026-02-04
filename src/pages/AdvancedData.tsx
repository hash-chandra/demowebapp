import { useState, useEffect, useRef } from 'react'

interface DataItem {
  id: number
  name: string
  category: string
  status: string
  value: number
  date: string
}

function AdvancedData() {
  const [data, setData] = useState<DataItem[]>([])
  const [visibleData, setVisibleData] = useState<DataItem[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [filters, setFilters] = useState({ category: '', status: '', minValue: '' })
  const [sortBy, setSortBy] = useState<'name' | 'value' | 'date'>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(1)
  const observerTarget = useRef<HTMLDivElement>(null)

  const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Toys']
  const statuses = ['Active', 'Pending', 'Completed', 'Cancelled']

  // Generate sample data
  useEffect(() => {
    const generateData = () => {
      const items: DataItem[] = []
      for (let i = 1; i <= 100; i++) {
        items.push({
          id: i,
          name: `Product ${i}`,
          category: categories[Math.floor(Math.random() * categories.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)],
          value: Math.floor(Math.random() * 1000) + 100,
          date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0]
        })
      }
      setData(items)
      setVisibleData(items.slice(0, 20))
    }
    generateData()
  }, [])

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore()
        }
      },
      { threshold: 1.0 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [hasMore, loading, visibleData])

  const loadMore = () => {
    setLoading(true)
    setTimeout(() => {
      const nextPage = page + 1
      const nextData = data.slice(0, nextPage * 20)
      setVisibleData(nextData)
      setPage(nextPage)
      setHasMore(nextData.length < data.length)
      setLoading(false)
    }, 1000)
  }

  const applyFilters = () => {
    let filtered = [...data]
    
    if (filters.category) {
      filtered = filtered.filter(item => item.category === filters.category)
    }
    if (filters.status) {
      filtered = filtered.filter(item => item.status === filters.status)
    }
    if (filters.minValue) {
      filtered = filtered.filter(item => item.value >= Number.parseInt(filters.minValue))
    }

    // Sort
    filtered.sort((a, b) => {
      const aVal = a[sortBy]
      const bVal = b[sortBy]
      const modifier = sortDir === 'asc' ? 1 : -1
      return aVal > bVal ? modifier : -modifier
    })

    setVisibleData(filtered.slice(0, 20))
    setPage(1)
    setHasMore(filtered.length > 20)
  }

  const SkeletonLoader = () => (
    <div 
      className="skeleton-loader" 
      data-testid="skeleton-loader"
      style={{
        display: 'grid',
        gap: '1rem',
        marginTop: '1rem'
      }}
    >
      {[1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          style={{
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            padding: '1.5rem',
            animation: 'pulse 1.5s ease-in-out infinite'
          }}
        >
          <div style={{ height: '20px', backgroundColor: '#ddd', borderRadius: '4px', marginBottom: '0.75rem', width: '60%' }} />
          <div style={{ height: '16px', backgroundColor: '#e5e5e5', borderRadius: '4px', width: '40%' }} />
        </div>
      ))}
    </div>
  )

  const ProgressBar = ({ value }: { value: number }) => (
    <div 
      data-testid="progress-bar"
      style={{
        width: '100%',
        height: '8px',
        backgroundColor: '#ecf0f1',
        borderRadius: '4px',
        overflow: 'hidden'
      }}
    >
      <div
        data-testid="progress-fill"
        style={{
          height: '100%',
          width: `${value}%`,
          backgroundColor: value < 30 ? '#e74c3c' : value < 70 ? '#f39c12' : '#27ae60',
          transition: 'width 0.3s ease'
        }}
      />
    </div>
  )

  const ChartBar = ({ label, value, max }: { label: string; value: number; max: number }) => (
    <div data-testid={`chart-bar-${label}`} style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.9rem' }}>
        <span>{label}</span>
        <span style={{ fontWeight: 'bold' }}>{value}</span>
      </div>
      <div style={{ height: '24px', backgroundColor: '#ecf0f1', borderRadius: '4px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${(value / max) * 100}%`,
            backgroundColor: '#3498db',
            transition: 'width 0.5s ease',
            borderRadius: '4px'
          }}
        />
      </div>
    </div>
  )

  const categoryData = categories.map(cat => ({
    label: cat,
    value: data.filter(item => item.category === cat).length
  }))

  const maxCategoryCount = Math.max(...categoryData.map(c => c.value))

  return (
    <div className="page">
      <h1>📊 Advanced Data Features</h1>
      <p>Practice automation with infinite scroll, filters, sorting, and visualizations</p>

      {/* Advanced Filters */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>🔍 Advanced Filters</h2>
        <div 
          id="filter-panel" 
          data-testid="filter-panel"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            padding: '1.5rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}
        >
          <div className="form-group">
            <label htmlFor="filter-category">Category</label>
            <select
              id="filter-category"
              data-testid="filter-category"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="filter-status">Status</label>
            <select
              id="filter-status"
              data-testid="filter-status"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="filter-min-value">Min Value</label>
            <input
              type="number"
              id="filter-min-value"
              data-testid="filter-min-value"
              value={filters.minValue}
              onChange={(e) => setFilters({ ...filters, minValue: e.target.value })}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="sort-by">Sort By</label>
            <select
              id="sort-by"
              data-testid="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            >
              <option value="name">Name</option>
              <option value="value">Value</option>
              <option value="date">Date</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="sort-direction">Direction</label>
            <select
              id="sort-direction"
              data-testid="sort-direction"
              value={sortDir}
              onChange={(e) => setSortDir(e.target.value as typeof sortDir)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
            <button
              id="apply-filters"
              data-testid="apply-filters"
              onClick={applyFilters}
              className="btn-primary"
            >
              Apply Filters
            </button>
            <button
              id="reset-filters"
              data-testid="reset-filters"
              onClick={() => {
                setFilters({ category: '', status: '', minValue: '' })
                setSortBy('name')
                setSortDir('asc')
                setVisibleData(data.slice(0, 20))
                setPage(1)
                setHasMore(true)
              }}
              className="secondary"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* Charts */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>📈 Data Visualization</h2>
        <div 
          id="chart-container" 
          data-testid="chart-container"
          style={{
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '1px solid #ddd'
          }}
        >
          <h3 style={{ marginBottom: '1.5rem' }}>Products by Category</h3>
          {categoryData.map(item => (
            <ChartBar key={item.label} label={item.label} value={item.value} max={maxCategoryCount} />
          ))}
        </div>
      </section>

      {/* Progress Indicators */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>📊 Progress Indicators</h2>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {[
            { label: 'Upload Progress', value: 75 },
            { label: 'Storage Used', value: 45 },
            { label: 'Profile Completion', value: 90 },
            { label: 'Course Progress', value: 25 }
          ].map(item => (
            <div key={item.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>{item.label}</span>
                <span style={{ fontWeight: 'bold' }}>{item.value}%</span>
              </div>
              <ProgressBar value={item.value} />
            </div>
          ))}
        </div>
      </section>

      {/* Infinite Scroll */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>♾️ Infinite Scroll</h2>
        <p>Showing {visibleData.length} of {data.length} items</p>
        <div 
          id="infinite-scroll-container" 
          data-testid="infinite-scroll-container"
          style={{
            maxHeight: '600px',
            overflow: 'auto',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1rem',
            backgroundColor: 'white'
          }}
        >
          {visibleData.map(item => (
            <div
              key={item.id}
              id={`data-item-${item.id}`}
              data-testid={`data-item-${item.id}`}
              style={{
                padding: '1rem',
                borderBottom: '1px solid #ecf0f1',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                gap: '1rem',
                alignItems: 'center'
              }}
            >
              <div>
                <strong>{item.name}</strong>
                <div style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>{item.category}</div>
              </div>
              <div>
                <span 
                  style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    backgroundColor: 
                      item.status === 'Active' ? '#d4edda' :
                      item.status === 'Pending' ? '#fff3cd' :
                      item.status === 'Completed' ? '#d1ecf1' : '#f8d7da',
                    color: '#2c3e50'
                  }}
                >
                  {item.status}
                </span>
              </div>
              <div style={{ fontWeight: 'bold', color: '#27ae60' }}>
                ${item.value}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                {item.date}
              </div>
            </div>
          ))}
          
          <div ref={observerTarget} style={{ height: '20px', margin: '1rem 0' }} />
          
          {loading && <SkeletonLoader />}
          
          {!hasMore && (
            <div 
              id="end-of-data" 
              data-testid="end-of-data"
              style={{
                textAlign: 'center',
                padding: '2rem',
                color: '#7f8c8d',
                fontStyle: 'italic'
              }}
            >
              No more items to load
            </div>
          )}
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>

      <footer style={{ marginTop: '4rem', padding: '2rem', textAlign: 'center', borderTop: '2px solid #ecf0f1' }}>
        <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
          Created by <a href="https://github.com/hash-chandra" target="_blank" rel="noopener noreferrer" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>@hash-chandra</a>
        </p>
      </footer>
    </div>
  )
}

export default AdvancedData
