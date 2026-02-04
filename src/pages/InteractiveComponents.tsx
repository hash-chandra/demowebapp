import { useState, useEffect } from 'react'

interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

function InteractiveComponents() {
  const [activeTab, setActiveTab] = useState(0)
  const [openAccordions, setOpenAccordions] = useState<number[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null)

  const tabs = [
    { id: 0, title: 'Profile', content: 'User profile information and settings' },
    { id: 1, title: 'Settings', content: 'Application configuration and preferences' },
    { id: 2, title: 'Notifications', content: 'Manage your notification preferences' },
    { id: 3, title: 'Security', content: 'Password and security settings' }
  ]

  const accordionItems = [
    { id: 0, title: 'What is automation testing?', content: 'Automation testing uses software tools to execute tests automatically, improving efficiency and coverage.' },
    { id: 1, title: 'Why use Playwright?', content: 'Playwright offers cross-browser testing, auto-waiting, and powerful debugging capabilities.' },
    { id: 2, title: 'What are locators?', content: 'Locators are methods to identify elements on a webpage using CSS selectors, XPath, or test IDs.' },
    { id: 3, title: 'How to handle dynamic content?', content: 'Use explicit waits, retry mechanisms, and stable locators to handle dynamic content reliably.' }
  ]

  const slides = [
    { id: 0, emoji: '🎨', title: 'Beautiful Design', description: 'Modern and responsive UI' },
    { id: 1, emoji: '🚀', title: 'Fast Performance', description: 'Optimized for speed' },
    { id: 2, emoji: '🔒', title: 'Secure', description: 'Enterprise-grade security' },
    { id: 3, emoji: '📱', title: 'Mobile Ready', description: 'Works on all devices' }
  ]

  const toggleAccordion = (id: number) => {
    setOpenAccordions(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const showToast = (message: string, type: Toast['type']) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  const toastColors = {
    success: { bg: '#d4edda', border: '#28a745', color: '#155724' },
    error: { bg: '#f8d7da', border: '#dc3545', color: '#721c24' },
    warning: { bg: '#fff3cd', border: '#ffc107', color: '#856404' },
    info: { bg: '#d1ecf1', border: '#17a2b8', color: '#0c5460' }
  }

  return (
    <div className="page">
      <h1>🎯 Interactive Components</h1>
      <p>Practice automation with tabs, accordions, carousels, and notifications</p>

      {/* Toast Notifications */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>🍞 Toast Notifications</h2>
        <p>Test dynamic toast messages with different types</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            id="toast-success"
            data-testid="toast-success"
            onClick={() => showToast('Operation completed successfully!', 'success')}
            className="success"
          >
            Show Success
          </button>
          <button
            id="toast-error"
            data-testid="toast-error"
            onClick={() => showToast('An error occurred!', 'error')}
            className="danger"
          >
            Show Error
          </button>
          <button
            id="toast-warning"
            data-testid="toast-warning"
            onClick={() => showToast('Please review your input', 'warning')}
            style={{ backgroundColor: '#ffc107', color: '#000' }}
          >
            Show Warning
          </button>
          <button
            id="toast-info"
            data-testid="toast-info"
            onClick={() => showToast('Here is some information', 'info')}
            style={{ backgroundColor: '#17a2b8', color: '#fff' }}
          >
            Show Info
          </button>
        </div>

        {/* Toast Container */}
        <div 
          id="toast-container" 
          data-testid="toast-container"
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}
        >
          {toasts.map(toast => (
            <div
              key={toast.id}
              id={`toast-${toast.id}`}
              data-testid={`toast-${toast.type}`}
              style={{
                padding: '1rem 1.5rem',
                backgroundColor: toastColors[toast.type].bg,
                border: `2px solid ${toastColors[toast.type].border}`,
                color: toastColors[toast.type].color,
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                minWidth: '300px',
                animation: 'slideIn 0.3s ease-out'
              }}
            >
              {toast.message}
            </div>
          ))}
        </div>
      </section>

      {/* Tabs */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>📑 Tabs</h2>
        <p>Test tab navigation and content switching</p>
        <div 
          id="tabs-container" 
          data-testid="tabs-container"
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: 'white'
          }}
        >
          <div 
            id="tab-headers" 
            data-testid="tab-headers"
            style={{ display: 'flex', borderBottom: '2px solid #ddd' }}
          >
            {tabs.map(tab => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                data-testid={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: '1rem',
                  border: 'none',
                  background: activeTab === tab.id ? '#3498db' : 'transparent',
                  color: activeTab === tab.id ? 'white' : '#2c3e50',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                  transition: 'all 0.3s'
                }}
              >
                {tab.title}
              </button>
            ))}
          </div>
          <div 
            id="tab-content" 
            data-testid="tab-content"
            style={{ padding: '2rem' }}
          >
            {tabs[activeTab].content}
          </div>
        </div>
      </section>

      {/* Accordion */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>📚 Accordion</h2>
        <p>Test collapsible accordion panels</p>
        <div 
          id="accordion-container" 
          data-testid="accordion-container"
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          {accordionItems.map(item => (
            <div
              key={item.id}
              id={`accordion-${item.id}`}
              data-testid={`accordion-${item.id}`}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: 'white'
              }}
            >
              <button
                id={`accordion-header-${item.id}`}
                data-testid={`accordion-header-${item.id}`}
                onClick={() => toggleAccordion(item.id)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: 'none',
                  background: openAccordions.includes(item.id) ? '#f8f9fa' : 'white',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontWeight: 'bold',
                  fontSize: '1.1rem'
                }}
              >
                {item.title}
                <span style={{ fontSize: '1.5rem', transition: 'transform 0.3s', transform: openAccordions.includes(item.id) ? 'rotate(180deg)' : 'rotate(0)' }}>
                  ▼
                </span>
              </button>
              {openAccordions.includes(item.id) && (
                <div
                  id={`accordion-content-${item.id}`}
                  data-testid={`accordion-content-${item.id}`}
                  style={{
                    padding: '1rem',
                    borderTop: '1px solid #ecf0f1',
                    backgroundColor: '#f8f9fa',
                    animation: 'slideDown 0.3s ease-out'
                  }}
                >
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Image Carousel */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>🎠 Image Carousel</h2>
        <p>Test carousel navigation and auto-play</p>
        <div 
          id="carousel-container" 
          data-testid="carousel-container"
          style={{
            position: 'relative',
            backgroundColor: '#2c3e50',
            borderRadius: '12px',
            overflow: 'hidden',
            padding: '3rem 1rem',
            minHeight: '300px'
          }}
        >
          <div
            id={`slide-${currentSlide}`}
            data-testid="carousel-slide"
            style={{
              textAlign: 'center',
              color: 'white',
              animation: 'fadeIn 0.5s'
            }}
          >
            <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>
              {slides[currentSlide].emoji}
            </div>
            <h2>{slides[currentSlide].title}</h2>
            <p style={{ fontSize: '1.2rem', color: '#ecf0f1' }}>
              {slides[currentSlide].description}
            </p>
          </div>

          <button
            id="carousel-prev"
            data-testid="carousel-prev"
            onClick={prevSlide}
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              fontSize: '2rem',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              borderRadius: '8px'
            }}
          >
            ←
          </button>

          <button
            id="carousel-next"
            data-testid="carousel-next"
            onClick={nextSlide}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              fontSize: '2rem',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              borderRadius: '8px'
            }}
          >
            →
          </button>

          <div 
            id="carousel-indicators" 
            data-testid="carousel-indicators"
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '0.5rem'
            }}
          >
            {slides.map((_, index) => (
              <button
                key={index}
                id={`indicator-${index}`}
                data-testid={`indicator-${index}`}
                onClick={() => setCurrentSlide(index)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: '2px solid white',
                  background: currentSlide === index ? 'white' : 'transparent',
                  cursor: 'pointer',
                  padding: 0
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tooltips */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>💬 Tooltips</h2>
        <p>Test hover tooltips and tooltip positioning</p>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['top', 'right', 'bottom', 'left'].map(position => (
            <div key={position} style={{ position: 'relative' }}>
              <button
                id={`tooltip-${position}`}
                data-testid={`tooltip-${position}`}
                onMouseEnter={() => setTooltipVisible(position)}
                onMouseLeave={() => setTooltipVisible(null)}
                className="secondary"
              >
                Hover me ({position})
              </button>
              {tooltipVisible === position && (
                <div
                  id={`tooltip-content-${position}`}
                  data-testid={`tooltip-content-${position}`}
                  style={{
                    position: 'absolute',
                    backgroundColor: '#2c3e50',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                    fontSize: '0.9rem',
                    zIndex: 100,
                    ...(position === 'top' && { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '0.5rem' }),
                    ...(position === 'bottom' && { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '0.5rem' }),
                    ...(position === 'left' && { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '0.5rem' }),
                    ...(position === 'right' && { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '0.5rem' })
                  }}
                >
                  Tooltip on {position}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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

export default InteractiveComponents
