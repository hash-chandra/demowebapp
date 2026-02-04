import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ErrorStates() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const EmptyStateCard = ({ icon, title, description, actionText, onAction }: {
    icon: string
    title: string
    description: string
    actionText?: string
    onAction?: () => void
  }) => (
    <div
      data-testid="empty-state"
      style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        border: '2px dashed #ddd'
      }}
    >
      <div style={{ fontSize: '6rem', marginBottom: '1.5rem' }}>{icon}</div>
      <h2 style={{ marginBottom: '1rem', color: '#2c3e50' }}>{title}</h2>
      <p style={{ color: '#7f8c8d', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
        {description}
      </p>
      {actionText && onAction && (
        <button onClick={onAction} className="btn-primary">
          {actionText}
        </button>
      )}
    </div>
  )

  return (
    <div className="page">
      <h1>🚨 Error & Empty States</h1>
      <p>Practice automation with error pages, empty states, and edge cases</p>

      {/* Offline Detection */}
      {isOffline && (
        <div 
          id="offline-banner" 
          data-testid="offline-banner"
          style={{
            padding: '1rem',
            backgroundColor: '#fff3cd',
            border: '2px solid #ffc107',
            borderRadius: '8px',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <span style={{ fontSize: '2rem' }}>📡</span>
          <div style={{ flex: 1 }}>
            <strong>You are offline</strong>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', color: '#856404' }}>
              Some features may not be available. Check your internet connection.
            </p>
          </div>
        </div>
      )}

      {/* Maintenance Mode */}
      {maintenanceMode && (
        <div 
          id="maintenance-overlay" 
          data-testid="maintenance-overlay"
          className="modal-overlay"
        >
          <div className="modal" style={{ maxWidth: '600px', textAlign: 'center' }}>
            <div style={{ fontSize: '6rem', marginBottom: '1.5rem' }}>🔧</div>
            <h2>System Under Maintenance</h2>
            <p style={{ fontSize: '1.1rem', color: '#7f8c8d', marginBottom: '2rem' }}>
              We're currently performing scheduled maintenance. The application will be back online shortly.
            </p>
            <div style={{
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>
                Estimated completion: <strong>15 minutes</strong>
              </p>
            </div>
            <button onClick={() => setMaintenanceMode(false)} className="btn-primary">
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* 404 Error */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>🔍 404 Not Found</h2>
        <p>Test page not found errors and navigation recovery</p>
        <div 
          id="error-404" 
          data-testid="error-404"
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '3rem',
            textAlign: 'center',
            border: '1px solid #ddd'
          }}
        >
          <div style={{ fontSize: '8rem', marginBottom: '1rem' }}>🔍</div>
          <h1 style={{ fontSize: '4rem', margin: '0.5rem 0', color: '#e74c3c' }}>404</h1>
          <h2 style={{ marginBottom: '1rem' }}>Page Not Found</h2>
          <p style={{ color: '#7f8c8d', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              id="back-button"
              data-testid="back-button"
              onClick={() => navigate(-1)} 
              className="secondary"
            >
              ← Go Back
            </button>
            <button 
              id="home-button"
              data-testid="home-button"
              onClick={() => navigate('/')} 
              className="btn-primary"
            >
              🏠 Go Home
            </button>
          </div>
        </div>
      </section>

      {/* 500 Server Error */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>⚠️ 500 Server Error</h2>
        <p>Test internal server error handling</p>
        <div 
          id="error-500" 
          data-testid="error-500"
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '3rem',
            textAlign: 'center',
            border: '1px solid #ddd'
          }}
        >
          <div style={{ fontSize: '8rem', marginBottom: '1rem' }}>⚠️</div>
          <h1 style={{ fontSize: '4rem', margin: '0.5rem 0', color: '#e74c3c' }}>500</h1>
          <h2 style={{ marginBottom: '1rem' }}>Internal Server Error</h2>
          <p style={{ color: '#7f8c8d', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Something went wrong on our end. We're working to fix it.
          </p>
          <button 
            id="retry-button"
            data-testid="retry-button"
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            🔄 Retry
          </button>
        </div>
      </section>

      {/* Empty States */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>📭 Empty States</h2>
        <p>Test various empty state scenarios</p>
        
        <div style={{ display: 'grid', gap: '2rem' }}>
          {/* Empty Inbox */}
          <div id="empty-inbox" data-testid="empty-inbox">
            <h3>Empty Inbox</h3>
            <EmptyStateCard
              icon="📬"
              title="No messages"
              description="Your inbox is empty. When you receive messages, they'll appear here."
              actionText="Compose Message"
              onAction={() => alert('Compose clicked')}
            />
          </div>

          {/* No Search Results */}
          <div id="no-search-results" data-testid="no-search-results">
            <h3>No Search Results</h3>
            <EmptyStateCard
              icon="🔍"
              title="No results found"
              description="We couldn't find any results matching your search. Try different keywords or check your spelling."
              actionText="Clear Search"
              onAction={() => alert('Search cleared')}
            />
          </div>

          {/* Empty Cart */}
          <div id="empty-shopping-cart" data-testid="empty-shopping-cart">
            <h3>Empty Shopping Cart</h3>
            <EmptyStateCard
              icon="🛒"
              title="Your cart is empty"
              description="Looks like you haven't added anything to your cart yet. Start shopping to fill it up!"
              actionText="Start Shopping"
              onAction={() => navigate('/ecommerce')}
            />
          </div>

          {/* No Notifications */}
          <div id="no-notifications" data-testid="no-notifications">
            <h3>No Notifications</h3>
            <EmptyStateCard
              icon="🔔"
              title="You're all caught up!"
              description="No new notifications. We'll let you know when something important happens."
            />
          </div>

          {/* No Data */}
          <div id="no-data" data-testid="no-data">
            <h3>No Data Available</h3>
            <EmptyStateCard
              icon="📊"
              title="No data to display"
              description="There's no data available for the selected time period. Try choosing a different date range."
              actionText="Refresh"
              onAction={() => alert('Data refreshed')}
            />
          </div>
        </div>
      </section>

      {/* Network Error */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>🌐 Network Error</h2>
        <p>Test network connectivity error handling</p>
        <div 
          id="network-error" 
          data-testid="network-error"
          style={{
            backgroundColor: '#fff5f5',
            border: '2px solid #fc8181',
            borderRadius: '12px',
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem'
          }}
        >
          <div style={{ fontSize: '4rem' }}>🌐</div>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 0.5rem', color: '#c53030' }}>Connection Failed</h3>
            <p style={{ margin: '0 0 1rem', color: '#742a2a' }}>
              Unable to connect to the server. Please check your network connection and try again.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                id="test-connection"
                data-testid="test-connection"
                className="btn-primary"
              >
                Test Connection
              </button>
              <button 
                id="offline-mode"
                data-testid="offline-mode"
                onClick={() => setIsOffline(!isOffline)}
                className="secondary"
              >
                Toggle Offline Mode
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Mode Trigger */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>🔧 Maintenance Mode</h2>
        <p>Test maintenance page and system status messages</p>
        <button 
          id="trigger-maintenance"
          data-testid="trigger-maintenance"
          onClick={() => setMaintenanceMode(true)}
          className="secondary"
          style={{ backgroundColor: '#f39c12', color: 'white' }}
        >
          Show Maintenance Modal
        </button>
      </section>

      {/* Access Denied */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>🚫 403 Forbidden</h2>
        <p>Test access denied and permission errors</p>
        <div 
          id="error-403" 
          data-testid="error-403"
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '3rem',
            textAlign: 'center',
            border: '1px solid #ddd'
          }}
        >
          <div style={{ fontSize: '8rem', marginBottom: '1rem' }}>🚫</div>
          <h1 style={{ fontSize: '4rem', margin: '0.5rem 0', color: '#e74c3c' }}>403</h1>
          <h2 style={{ marginBottom: '1rem' }}>Access Denied</h2>
          <p style={{ color: '#7f8c8d', fontSize: '1.1rem', marginBottom: '2rem' }}>
            You don't have permission to access this resource. Please contact your administrator.
          </p>
          <button 
            id="request-access"
            data-testid="request-access"
            className="btn-primary"
          >
            Request Access
          </button>
        </div>
      </section>

      {/* Loading Failed */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>❌ Load Failed</h2>
        <p>Test content loading failures and retry mechanisms</p>
        <div 
          id="load-failed" 
          data-testid="load-failed"
          style={{
            backgroundColor: '#fff5f5',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center',
            border: '2px solid #fc8181'
          }}
        >
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>❌</div>
          <h3 style={{ marginBottom: '0.5rem', color: '#c53030' }}>Failed to Load Content</h3>
          <p style={{ color: '#742a2a', marginBottom: '1.5rem' }}>
            The content couldn't be loaded. This might be due to a network issue or server problem.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              id="retry-load"
              data-testid="retry-load"
              className="btn-primary"
            >
              Retry
            </button>
            <button 
              id="report-issue"
              data-testid="report-issue"
              className="secondary"
            >
              Report Issue
            </button>
          </div>
        </div>
      </section>

      <footer style={{ marginTop: '4rem', padding: '2rem', textAlign: 'center', borderTop: '2px solid #ecf0f1' }}>
        <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
          Created by <a href="https://github.com/hash-chandra" target="_blank" rel="noopener noreferrer" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>@hash-chandra</a>
        </p>
      </footer>
    </div>
  )
}

export default ErrorStates
