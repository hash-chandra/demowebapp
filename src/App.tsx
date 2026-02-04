import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
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
import Ecommerce from './pages/Ecommerce'
import Banking from './pages/Banking'
import InteractiveComponents from './pages/InteractiveComponents'
import AdvancedData from './pages/AdvancedData'
import RichContent from './pages/RichContent'
import ErrorStates from './pages/ErrorStates'

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true'
  })
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || ''
  })
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const navigate = useNavigate()

  const searchablePages = [
    { name: 'Home', path: '/', keywords: ['home', 'welcome', 'main', 'start'] },
    { name: 'Login', path: '/login', keywords: ['login', 'signin', 'authenticate', 'auth'] },
    { name: 'Register', path: '/register', keywords: ['register', 'signup', 'create account'] },
    { name: 'Form Elements', path: '/form-elements', keywords: ['form', 'input', 'text', 'email', 'checkbox', 'radio', 'select', 'dropdown'] },
    { name: 'Advanced Elements', path: '/advanced-elements', keywords: ['advanced', 'tooltip', 'disabled', 'readonly', 'dynamic'] },
    { name: 'Alerts', path: '/alerts', keywords: ['alert', 'modal', 'dialog', 'confirm', 'prompt'] },
    { name: 'Drag & Drop', path: '/drag-drop', keywords: ['drag', 'drop', 'dnd', 'draggable'] },
    { name: 'Tables', path: '/tables', keywords: ['table', 'grid', 'sort', 'filter', 'pagination'] },
    { name: 'iFrames', path: '/iframes', keywords: ['iframe', 'frame', 'nested'] },
    { name: 'Shadow DOM', path: '/shadow-dom', keywords: ['shadow', 'dom', 'web component'] },
    { name: 'Multi-Step Form', path: '/multi-step-form', keywords: ['multi', 'step', 'wizard', 'form'] },
    { name: 'Loaders', path: '/loaders-spinners', keywords: ['loader', 'spinner', 'loading', 'progress'] },
    { name: 'E-commerce', path: '/ecommerce', keywords: ['ecommerce', 'shop', 'cart', 'product', 'wishlist', 'rating'] },
    { name: 'Banking', path: '/banking', keywords: ['bank', 'finance', 'currency', 'otp', 'calculator'] },
    { name: 'Interactive', path: '/interactive', keywords: ['interactive', 'tab', 'accordion', 'carousel', 'toast', 'tooltip'] },
    { name: 'Advanced Data', path: '/advanced-data', keywords: ['data', 'infinite', 'scroll', 'filter', 'chart', 'visualization'] },
    { name: 'Rich Content', path: '/rich-content', keywords: ['rich', 'editor', 'wysiwyg', 'upload', 'file', 'context menu'] },
    { name: 'Error States', path: '/error-states', keywords: ['error', '404', '500', '403', 'empty', 'offline'] }
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setShowSearchResults(query.length > 0)
  }

  const getSearchResults = () => {
    if (!searchQuery) return []
    const lowerQuery = searchQuery.toLowerCase()
    return searchablePages.filter(page => 
      page.name.toLowerCase().includes(lowerQuery) ||
      page.keywords.some(keyword => keyword.includes(lowerQuery))
    )
  }

  const navigateToPage = (path: string) => {
    navigate(path)
    setSearchQuery('')
    setShowSearchResults(false)
  }

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
              <span className="logo-text">Excellent Automation Testing Demo Site</span>
            </NavLink>
          </div>
          <div className="nav-search">
            <div className="search-container">
              <input
                type="text"
                id="global-search"
                data-testid="global-search"
                className="search-input"
                placeholder="Search pages..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && getSearchResults().length > 0) {
                    navigateToPage(getSearchResults()[0].path)
                  }
                  if (e.key === 'Escape') {
                    setSearchQuery('')
                    setShowSearchResults(false)
                  }
                }}
              />
              <span className="search-icon">🔍</span>
              {showSearchResults && (
                <div className="search-results" id="search-results" data-testid="search-results">
                  {getSearchResults().length > 0 ? (
                    getSearchResults().map(page => (
                      <div
                        key={page.path}
                        className="search-result-item"
                        data-testid={`search-result-${page.name.toLowerCase().replaceAll(/\s+/, '-')}`}
                        onClick={() => navigateToPage(page.path)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            navigateToPage(page.path)
                          }
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        <span className="result-name">{page.name}</span>
                        <span className="result-path">{page.path}</span>
                      </div>
                    ))
                  ) : (
                    <div className="search-no-results" data-testid="search-no-results">
                      <span>🔍 No pages found</span>
                      <button 
                        className="not-found-btn"
                        onClick={() => {
                          navigate('/error-states')
                          setSearchQuery('')
                          setShowSearchResults(false)
                        }}
                      >
                        View Error Page
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
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

      {!isSidebarCollapsed && (
        <div 
          className="sidebar-overlay" 
          data-testid="sidebar-overlay"
          onClick={toggleSidebar}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              toggleSidebar()
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
        />
      )}

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
            <li><NavLink to="/ecommerce">🛒 E-commerce</NavLink></li>
            <li><NavLink to="/banking">🏦 Banking</NavLink></li>
            <li><NavLink to="/interactive">🎯 Interactive Components</NavLink></li>
            <li><NavLink to="/advanced-data">📊 Advanced Data</NavLink></li>
            <li><NavLink to="/rich-content">✨ Rich Content</NavLink></li>
            <li><NavLink to="/error-states">🚨 Error States</NavLink></li>
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
              <Route path="/ecommerce" element={<Ecommerce />} />
              <Route path="/banking" element={<Banking />} />
              <Route path="/interactive" element={<InteractiveComponents />} />
              <Route path="/advanced-data" element={<AdvancedData />} />
              <Route path="/rich-content" element={<RichContent />} />
              <Route path="/error-states" element={<ErrorStates />} />
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
