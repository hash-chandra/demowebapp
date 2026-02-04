import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface LoginProps {
  onLoginSuccess?: () => void
}

function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({})
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors: { username?: string; password?: string } = {}

    if (!username) {
      newErrors.username = 'Username is required'
    }
    if (!password) {
      newErrors.password = 'Password is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Show loading spinner
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      // Mock authentication
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('username', username)
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true')
        }
        setIsLoading(false)
        setShowSuccessDialog(true)
        if (onLoginSuccess) {
          onLoginSuccess()
        }
      } else if (username === 'user' && password === 'user123') {
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('username', username)
        setIsLoading(false)
        setShowSuccessDialog(true)
        if (onLoginSuccess) {
          onLoginSuccess()
        }
      } else {
        setIsLoading(false)
        setErrors({ username: 'Invalid username or password' })
      }
    }, 1500) // 1.5 second delay to simulate API call
  }

  const handleDialogClose = () => {
    setShowSuccessDialog(false)
    navigate('/')
  }

  const handleForgotPassword = () => {
    alert('Password reset link would be sent to your email')
  }

  return (
    <div className="page">
      <h1>Login Page</h1>
      
      <div className="alert info" id="login-info" data-testid="login-info">
        <strong>⚠️ Demo Application - Educational Use Only</strong><br/>
        <strong>DO NOT enter real passwords!</strong><br/><br/>
        <strong>Test Credentials:</strong><br/>
        Username: <code>admin</code> Password: <code>admin123</code><br/>
        Username: <code>user</code> Password: <code>user123</code>
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="modal-overlay" id="loading-overlay" data-testid="loading-overlay">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div className="spinner" id="login-spinner" data-testid="login-spinner"></div>
            <p style={{ color: 'white', fontSize: '1.2rem' }}>Authenticating...</p>
          </div>
        </div>
      )}

      {/* Success Dialog */}
      {showSuccessDialog && (
        <div className="modal-overlay" id="success-dialog-overlay" data-testid="success-dialog-overlay">
          <div className="modal" id="success-dialog" data-testid="success-dialog">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', color: '#27ae60', marginBottom: '1rem' }}>✓</div>
              <h2 style={{ color: '#27ae60' }}>Login Successful!</h2>
              <p style={{ fontSize: '1.1rem', margin: '1rem 0' }}>
                Welcome back, <strong>{username}</strong>!
              </p>
              <p style={{ color: '#7f8c8d' }}>You have been successfully authenticated.</p>
            </div>
            <div className="modal-actions">
              <button
                id="close-success-dialog"
                data-testid="close-success-dialog"
                className="success"
                onClick={handleDialogClose}
              >
                Continue to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} id="login-form" data-testid="login-form">
        <div className="form-group">
          <label htmlFor="username">
            Username <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            data-testid="username-input"
            className={`username-field ${errors.username ? 'error' : ''}`}
            placeholder="Enter your username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
              setErrors({ ...errors, username: undefined })
            }}
            autoComplete="username"
          />
          {errors.username && (
            <div className="error-message" id="username-error" data-testid="username-error">
              {errors.username}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">
            Password <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            data-testid="password-input"
            className={`password-field ${errors.password ? 'error' : ''}`}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setErrors({ ...errors, password: undefined })
            }}
            autoComplete="current-password"
          />
          {errors.password && (
            <div className="error-message" id="password-error" data-testid="password-error">
              {errors.password}
            </div>
          )}
        </div>

        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            id="remember-me"
            name="rememberMe"
            data-testid="remember-me-checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            style={{ width: 'auto' }}
          />
          <label htmlFor="remember-me" style={{ marginBottom: 0 }}>Remember me</label>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            type="submit"
            id="login-button"
            data-testid="login-button"
            className="btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          
          <button
            type="button"
            id="forgot-password"
            data-testid="forgot-password-link"
            className="secondary"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>
      </form>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <h3>XPath & CSS Selector Examples:</h3>
        <pre style={{ backgroundColor: '#2c3e50', color: '#ecf0f1', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`// By ID
//input[@id='username']
#username

// By Name
//input[@name='username']
input[name='username']

// By data-testid
//input[@data-testid='username-input']
[data-testid='username-input']

// By Class
//input[@class='username-field']
.username-field

// By Placeholder
//input[@placeholder='Enter your username']
input[placeholder='Enter your username']

// Submit button
//button[@type='submit']
button[type='submit']`}
        </pre>
      </div>

      <p style={{ textAlign: 'center', marginTop: '2rem', color: '#7f8c8d', fontSize: '0.9rem' }}>
        Demo by <a href="https://github.com/hash-chandra" target="_blank" rel="noopener noreferrer" style={{ color: '#3498db' }}>@hash-chandra</a>
      </p>
    </div>
  )
}

export default Login
