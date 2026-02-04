import { useState } from 'react'

function LoadersSpinners() {
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [loading3, setLoading3] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Click button to start')

  const handleAction1 = () => {
    setLoading1(true)
    setTimeout(() => {
      setLoading1(false)
      alert('Action 1 completed!')
    }, 3000)
  }

  const handleAction2 = () => {
    setLoading2(true)
    setTimeout(() => {
      setLoading2(false)
      alert('Action 2 completed!')
    }, 2500)
  }

  const handleProgressAction = () => {
    setLoading3(true)
    setProgress(0)
    setLoadingText('Initializing...')
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 10
        if (next >= 100) {
          clearInterval(interval)
          setLoading3(false)
          setLoadingText('Completed!')
          setTimeout(() => setLoadingText('Click button to start'), 2000)
          return 100
        }
        
        if (next === 30) setLoadingText('Processing data...')
        if (next === 60) setLoadingText('Almost there...')
        if (next === 90) setLoadingText('Finalizing...')
        
        return next
      })
    }, 300)
  }

  return (
    <div className="page">
      <h1>Loaders & Spinners</h1>
      <p>Practice handling loading states and spinners in automation tests</p>

      <h2>Different Spinner Styles</h2>
      <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', padding: '2rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Default Spinner</p>
          <div className="spinner" id="spinner-1" data-testid="spinner-1"></div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Small Spinner</p>
          <div className="spinner-small" id="spinner-2" data-testid="spinner-2"></div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Green Spinner</p>
          <div style={{
            border: '4px solid rgba(39, 174, 96, 0.3)',
            borderTop: '4px solid #27ae60',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            animation: 'spin 1s linear infinite'
          }} id="spinner-3" data-testid="spinner-3"></div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Red Spinner</p>
          <div style={{
            border: '4px solid rgba(231, 76, 60, 0.3)',
            borderTop: '4px solid #e74c3c',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            animation: 'spin 0.8s linear infinite'
          }} id="spinner-4" data-testid="spinner-4"></div>
        </div>
      </div>

      <h2>Loading States with Actions</h2>
      <div className="form-group">
        <button
          id="action-button-1"
          data-testid="action-button-1"
          onClick={handleAction1}
          disabled={loading1}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '200px', justifyContent: 'center' }}
        >
          {loading1 ? (
            <>
              <div className="spinner-small" style={{ width: '20px', height: '20px', borderWidth: '2px', borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white' }}></div>
              Loading...
            </>
          ) : (
            'Trigger Loading State 1'
          )}
        </button>
        {loading1 && (
          <div id="loading-indicator-1" data-testid="loading-indicator-1" className="alert info" style={{ marginTop: '1rem' }}>
            Please wait while we process your request...
          </div>
        )}
      </div>

      <div className="form-group">
        <button
          id="action-button-2"
          data-testid="action-button-2"
          onClick={handleAction2}
          disabled={loading2}
          className="success"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '200px', justifyContent: 'center' }}
        >
          {loading2 ? (
            <>
              <div className="spinner-small" style={{ width: '20px', height: '20px', borderWidth: '2px', borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white' }}></div>
              Processing...
            </>
          ) : (
            'Trigger Loading State 2'
          )}
        </button>
      </div>

      <h2>Progress Bar with Loader</h2>
      <div className="form-group">
        <button
          id="progress-action"
          data-testid="progress-action"
          onClick={handleProgressAction}
          disabled={loading3}
        >
          Start Progress Action
        </button>
        
        {loading3 && (
          <div id="progress-container" data-testid="progress-container" style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div className="spinner-small"></div>
              <span id="loading-text" data-testid="loading-text">{loadingText}</span>
            </div>
            <div style={{ width: '100%', backgroundColor: '#ecf0f1', borderRadius: '10px', height: '30px', overflow: 'hidden' }}>
              <div
                id="progress-bar"
                data-testid="progress-bar"
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  backgroundColor: '#3498db',
                  transition: 'width 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                {progress}%
              </div>
            </div>
          </div>
        )}
        
        {!loading3 && progress === 100 && (
          <div className="alert success" id="completion-message" data-testid="completion-message" style={{ marginTop: '1rem' }}>
            ✓ Action completed successfully!
          </div>
        )}
      </div>

      <h2>Full Page Loader Overlay</h2>
      <div className="form-group">
        <button
          id="show-overlay-loader"
          data-testid="show-overlay-loader"
          onClick={() => {
            const overlay = document.getElementById('overlay-loader')
            if (overlay) {
              overlay.style.display = 'flex'
              setTimeout(() => {
                overlay.style.display = 'none'
                alert('Loading completed!')
              }, 3000)
            }
          }}
        >
          Show Full Page Loader
        </button>
      </div>

      <div
        id="overlay-loader"
        data-testid="overlay-loader"
        className="modal-overlay"
        style={{ display: 'none' }}
      >
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
          <h2 style={{ color: 'white' }}>Loading...</h2>
          <p style={{ color: 'white' }}>Please wait while we fetch your data</p>
        </div>
      </div>

      <div style={{ marginTop: '2rem', backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '4px' }}>
        <h3>Automation Testing Tips:</h3>
        <ul>
          <li>Always wait for loaders to disappear before proceeding with next actions</li>
          <li>Use explicit waits with visibility conditions for loader elements</li>
          <li>Verify button disabled state during loading</li>
          <li>Check for loading indicators before asserting final results</li>
          <li>Test timeout scenarios when loaders don't disappear</li>
        </ul>

        <h3 style={{ marginTop: '1.5rem' }}>Code Examples:</h3>
        <pre style={{ backgroundColor: '#2c3e50', color: '#ecf0f1', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`// Playwright
// Wait for loader to appear
await page.waitForSelector('#loading-indicator-1', { state: 'visible' });

// Wait for loader to disappear
await page.waitForSelector('#loading-indicator-1', { state: 'hidden' });

// Click button and wait for loading to complete
await page.click('#action-button-1');
await page.waitForSelector('[data-testid="loading-indicator-1"]', { 
  state: 'detached',
  timeout: 5000 
});

// Selenium (Java)
// Wait for loader to appear
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.visibilityOfElementLocated(
  By.id("loading-indicator-1")
));

// Wait for loader to disappear
wait.until(ExpectedConditions.invisibilityOfElementLocated(
  By.id("loading-indicator-1")
));

// Verify button is disabled during loading
WebElement button = driver.findElement(By.id("action-button-1"));
assertFalse(button.isEnabled());

// Cypress
cy.get('#action-button-1').click();
cy.get('[data-testid="loading-indicator-1"]').should('be.visible');
cy.get('[data-testid="loading-indicator-1"]').should('not.exist');`}
        </pre>
      </div>
      <footer style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px solid #ecf0f1', textAlign: 'center', color: '#7f8c8d' }}>
        <p>
          Created by <a href="https://github.com/hash-chandra" target="_blank" rel="noopener noreferrer" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>@hash-chandra</a>
        </p>
      </footer>
    </div>
  )
}

export default LoadersSpinners
