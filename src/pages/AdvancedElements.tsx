import { useState } from 'react'

function AdvancedElements() {
  const [showTooltip, setShowTooltip] = useState(false)
  const [disabledInput, setDisabledInput] = useState(true)
  const [readonlyInput] = useState('This is readonly')
  const [hiddenValue] = useState('Hidden value for testing')
  const [dynamicContent, setDynamicContent] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const addDynamicContent = () => {
    setLoading(true)
    setTimeout(() => {
      setDynamicContent([...dynamicContent, `Item ${dynamicContent.length + 1}`])
      setLoading(false)
    }, 1000)
  }

  const removeDynamicContent = (index: number) => {
    setDynamicContent(dynamicContent.filter((_, i) => i !== index))
  }

  return (
    <div className="page">
      <h1>Advanced Elements</h1>
      <p>Practice automating advanced UI interactions</p>

      <h2>Disabled & Readonly Elements</h2>
      <div className="form-group">
        <label htmlFor="disabled-input">Disabled Input</label>
        <input
          type="text"
          id="disabled-input"
          data-testid="disabled-input"
          disabled={disabledInput}
          placeholder="This input is disabled"
        />
        <button
          id="toggle-disabled"
          data-testid="toggle-disabled"
          onClick={() => setDisabledInput(!disabledInput)}
          className="secondary"
          style={{ marginTop: '0.5rem' }}
        >
          {disabledInput ? 'Enable' : 'Disable'} Input
        </button>
      </div>

      <div className="form-group">
        <label htmlFor="readonly-input">Readonly Input</label>
        <input
          type="text"
          id="readonly-input"
          data-testid="readonly-input"
          readOnly
          value={readonlyInput}
        />
      </div>

      <div className="form-group">
        <label htmlFor="hidden-input">Hidden Input (inspect HTML to find it)</label>
        <input
          type="hidden"
          id="hidden-input"
          data-testid="hidden-input"
          value={hiddenValue}
        />
        <p style={{ backgroundColor: '#f0f0f0', padding: '0.5rem', borderRadius: '4px' }}>
          Hidden value: <code>{hiddenValue}</code>
        </p>
      </div>

      <h2>Tooltips & Hover Elements</h2>
      <div className="form-group">
        <div
          id="tooltip-trigger"
          data-testid="tooltip-trigger"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          style={{
            display: 'inline-block',
            padding: '1rem',
            backgroundColor: '#3498db',
            color: 'white',
            borderRadius: '4px',
            cursor: 'pointer',
            position: 'relative'
          }}
        >
          Hover over me!
          {showTooltip && (
            <div
              id="tooltip"
              data-testid="tooltip"
              style={{
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#2c3e50',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                marginBottom: '0.5rem',
                whiteSpace: 'nowrap'
              }}
            >
              This is a tooltip!
            </div>
          )}
        </div>
      </div>

      <h2>Loading Spinners</h2>
      <div className="form-group" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '1rem' }}>Large Spinner</p>
          <div className="spinner" id="large-spinner" data-testid="large-spinner"></div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '1rem' }}>Small Spinner</p>
          <div className="spinner-small" id="small-spinner" data-testid="small-spinner"></div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '1rem' }}>Custom Color Spinner</p>
          <div style={{
            border: '4px solid rgba(231, 76, 60, 0.3)',
            borderTop: '4px solid #e74c3c',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite'
          }} id="custom-spinner" data-testid="custom-spinner"></div>
        </div>
      </div>

      <h2>Dynamic Content (AJAX Simulation)</h2>
      <div className="form-group">
        <button
          id="add-dynamic-content"
          data-testid="add-dynamic-content"
          onClick={addDynamicContent}
          disabled={loading}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div className="spinner-small" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
              Loading...
            </span>
          ) : (
            'Add Dynamic Content'
          )}
        </button>
        
        {loading && (
          <div id="loading-spinner" data-testid="loading-spinner" className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}
        
        <div id="dynamic-content-container" data-testid="dynamic-content-container" style={{ marginTop: '1rem' }}>
          {dynamicContent.map((item, index) => (
            <div
              key={index}
              className="dynamic-item"
              data-testid={`dynamic-item-${index}`}
              style={{
                padding: '0.75rem',
                backgroundColor: '#ecf0f1',
                marginBottom: '0.5rem',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{item}</span>
              <button
                className="danger"
                data-testid={`remove-item-${index}`}
                onClick={() => removeDynamicContent(index)}
                style={{ padding: '0.25rem 0.75rem' }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <h2>Progress Bar</h2>
      <div className="form-group">
        <label htmlFor="progress-bar">Progress: 65%</label>
        <progress
          id="progress-bar"
          data-testid="progress-bar"
          value="65"
          max="100"
          style={{ width: '100%', height: '30px' }}
        />
      </div>

      <h2>Meter</h2>
      <div className="form-group">
        <label htmlFor="meter">Disk Usage</label>
        <meter
          id="meter"
          data-testid="meter"
          min="0"
          max="100"
          low="30"
          high="70"
          optimum="20"
          value="80"
          style={{ width: '100%', height: '30px' }}
        />
        <p>80 GB used out of 100 GB</p>
      </div>

      <h2>Details & Summary (Accordion)</h2>
      <details id="details-1" data-testid="details-1" style={{ marginBottom: '1rem' }}>
        <summary style={{ cursor: 'pointer', padding: '0.5rem', backgroundColor: '#ecf0f1', fontWeight: 'bold' }}>
          Click to expand Section 1
        </summary>
        <div style={{ padding: '1rem', border: '1px solid #ddd', borderTop: 'none' }}>
          This is the content of section 1. It's hidden by default and revealed when you click the summary.
        </div>
      </details>

      <details id="details-2" data-testid="details-2" style={{ marginBottom: '1rem' }}>
        <summary style={{ cursor: 'pointer', padding: '0.5rem', backgroundColor: '#ecf0f1', fontWeight: 'bold' }}>
          Click to expand Section 2
        </summary>
        <div style={{ padding: '1rem', border: '1px solid #ddd', borderTop: 'none' }}>
          This is the content of section 2. Practice interacting with accordion/collapsible elements.
        </div>
      </details>

      <h2>Nested Elements</h2>
      <div id="parent-div" data-testid="parent-div" style={{ border: '2px solid #3498db', padding: '1rem' }}>
        <h3>Parent Div</h3>
        <div id="child-div" data-testid="child-div" style={{ border: '2px solid #27ae60', padding: '1rem', margin: '1rem 0' }}>
          <h4>Child Div</h4>
          <div id="grandchild-div" data-testid="grandchild-div" style={{ border: '2px solid #e74c3c', padding: '1rem' }}>
            <h5>Grandchild Div</h5>
            <button id="nested-button" data-testid="nested-button">
              Deeply Nested Button
            </button>
          </div>
        </div>
      </div>

      <h2>Button with Loading State</h2>
      <div className="form-group">
        <button
          id="action-with-loader"
          data-testid="action-with-loader"
          onClick={() => {
            const btn = document.getElementById('action-with-loader')
            if (btn) {
              btn.innerHTML = '<div class="spinner-small" style="width: 20px; height: 20px; border-width: 2px; border-color: rgba(255,255,255,0.3); border-top-color: white;"></div> Processing...'
              btn.setAttribute('disabled', 'true')
              setTimeout(() => {
                btn.innerHTML = 'Action Completed ✓'
                btn.removeAttribute('disabled')
                btn.style.backgroundColor = '#27ae60'
                setTimeout(() => {
                  btn.innerHTML = 'Click to Process'
                  btn.style.backgroundColor = ''
                }, 2000)
              }, 3000)
            }
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', minWidth: '200px' }}
        >
          Click to Process
        </button>
      </div>

      <div style={{ marginTop: '2rem', backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '4px' }}>
        <h3>Automation Tips for Loaders:</h3>
        <ul>
          <li>Wait for loaders to disappear before interacting with new content</li>
          <li>Use explicit waits to handle loading states</li>
          <li>Verify loader visibility during async operations</li>
          <li>Test button disabled states during loading</li>
        </ul>
        <pre style={{ backgroundColor: '#2c3e50', color: '#ecf0f1', padding: '1rem', borderRadius: '4px', overflow: 'auto', marginTop: '1rem' }}>
{`// Playwright - Wait for loader to disappear
await page.waitForSelector('#loading-spinner', { state: 'hidden' });

// Selenium - Wait for loader
WebDriverWait wait = new WebDriverWait(driver, 10);
wait.until(ExpectedConditions.invisibilityOfElementLocated(
  By.id("loading-spinner")
));`}
        </pre>
      </div>
    </div>
  )
}

export default AdvancedElements
