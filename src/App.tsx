import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import FormElements from './pages/FormElements'
import AdvancedElements from './pages/AdvancedElements'
import Alerts from './pages/Alerts'
import DragDrop from './pages/DragDrop'
import Tables from './pages/Tables'
import Iframes from './pages/Iframes'
import ShadowDOM from './pages/ShadowDOM'
import MultiStepForm from './pages/MultiStepForm'
import LoadersSpinners from './pages/LoadersSpinners'

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated')
    const storedUsername = localStorage.getItem('username')
    if (authStatus === 'true' && storedUsername) {
      setIsLoggedIn(true)
      setUsername(storedUsername)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('username')
    localStorage.removeItem('rememberMe')
    setIsLoggedIn(false)
    setUsername('')
    navigate('/login')
  }

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-left">
            <button
              id="sidebar-toggle"
              data-testid="sidebar-toggle"
              className="sidebar-toggle-btn"
              onClick={toggleSidebar}
              title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              <span className="hamburger-icon">
                {isSidebarCollapsed ? '☰' : '✕'}
              </span>
            </button>
            <NavLink to="/" className="logo" end>
              <span className="logo-icon">🧪</span>
              <span className="logo-text">Automation Testing Demo</span>
            </NavLink>
          </div>
          <div className="nav-right">
            {isLoggedIn && (
              <>
                <span id="logged-in-user" data-testid="logged-in-user" className="user-welcome">
                  Welcome, <strong>{username}</strong>
                </span>
                <button
                  id="logout-button"
                  data-testid="logout-button"
                  className="danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
            {!isLoggedIn && (
              <NavLink to="/login" className="login-link">
                Login
              </NavLink>
            )}
          </div>
        </div>
      </nav>

      <div className="content-wrapper">
        <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`} id="sidebar" data-testid="sidebar">
          <h3>Quick Navigation</h3>
          <ul className="sidebar-nav">
            <li><NavLink to="/" end>🏠 Home</NavLink></li>
            <li><NavLink to="/login">🔐 Login</NavLink></li>
            <li><NavLink to="/register">📝 Register</NavLink></li>
            <li><NavLink to="/form-elements">📋 Form Elements</NavLink></li>
            <li><NavLink to="/advanced-elements">⚙️ Advanced Elements</NavLink></li>
            <li><NavLink to="/alerts">🔔 Alerts & Dialogs</NavLink></li>
            <li><NavLink to="/drag-drop">🔄 Drag & Drop</NavLink></li>
            <li><NavLink to="/tables">📊 Tables</NavLink></li>
            <li><NavLink to="/iframes">🖼️ iFrames</NavLink></li>
            <li><NavLink to="/shadow-dom">🌓 Shadow DOM</NavLink></li>
            <li><NavLink to="/multi-step-form">📑 Multi-Step Form</NavLink></li>
            <li><NavLink to="/loaders-spinners">⏳ Loaders & Spinners</NavLink></li>
          </ul>
        </aside>
        <main className="main-content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/form-elements" element={<FormElements />} />
              <Route path="/advanced-elements" element={<AdvancedElements />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/drag-drop" element={<DragDrop />} />
              <Route path="/tables" element={<Tables />} />
              <Route path="/iframes" element={<Iframes />} />
              <Route path="/shadow-dom" element={<ShadowDOM />} />
              <Route path="/multi-step-form" element={<MultiStepForm />} />
              <Route path="/loaders-spinners" element={<LoadersSpinners />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router basename="/DemoWebApp">
      <AppContent />
    </Router>
  )
}

export default App
