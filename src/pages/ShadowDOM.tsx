import { useEffect, useRef, useState } from 'react'

function ShadowDOM() {
  const shadowHostRef = useRef<HTMLDivElement>(null)
  const shadowFormRef = useRef<HTMLDivElement>(null)
  const [shadowMessage, setShadowMessage] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '' })

  useEffect(() => {
    // Create shadow DOM for buttons
    if (shadowHostRef.current && !shadowHostRef.current.shadowRoot) {
      const shadowRoot = shadowHostRef.current.attachShadow({ mode: 'open' })
      
      const style = document.createElement('style')
      style.textContent = `
        button {
          padding: 12px 24px;
          margin: 5px;
          font-size: 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }
        .primary-btn {
          background-color: #3498db;
          color: white;
        }
        .primary-btn:hover {
          background-color: #2980b9;
        }
        .secondary-btn {
          background-color: #95a5a6;
          color: white;
        }
        .secondary-btn:hover {
          background-color: #7f8c8d;
        }
        .success-btn {
          background-color: #27ae60;
          color: white;
        }
        .success-btn:hover {
          background-color: #229954;
        }
      `
      
      const button1 = document.createElement('button')
      button1.textContent = 'Shadow Button 1'
      button1.className = 'primary-btn'
      button1.id = 'shadow-button-1'
      button1.setAttribute('data-testid', 'shadow-button-1')
      button1.addEventListener('click', () => {
        setShadowMessage('Shadow Button 1 clicked!')
      })
      
      const button2 = document.createElement('button')
      button2.textContent = 'Shadow Button 2'
      button2.className = 'secondary-btn'
      button2.id = 'shadow-button-2'
      button2.setAttribute('data-testid', 'shadow-button-2')
      button2.addEventListener('click', () => {
        setShadowMessage('Shadow Button 2 clicked!')
      })
      
      const button3 = document.createElement('button')
      button3.textContent = 'Shadow Button 3'
      button3.className = 'success-btn'
      button3.id = 'shadow-button-3'
      button3.setAttribute('data-testid', 'shadow-button-3')
      button3.addEventListener('click', () => {
        setShadowMessage('Shadow Button 3 clicked!')
      })
      
      shadowRoot.appendChild(style)
      shadowRoot.appendChild(button1)
      shadowRoot.appendChild(button2)
      shadowRoot.appendChild(button3)
    }

    // Create shadow DOM for form
    if (shadowFormRef.current && !shadowFormRef.current.shadowRoot) {
      const shadowRoot = shadowFormRef.current.attachShadow({ mode: 'open' })
      
      const style = document.createElement('style')
      style.textContent = `
        .shadow-form {
          background-color: #ecf0f1;
          padding: 20px;
          border-radius: 8px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: 600;
          color: #2c3e50;
        }
        input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }
        input:focus {
          outline: none;
          border-color: #3498db;
        }
        button {
          padding: 10px 20px;
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        button:hover {
          background-color: #2980b9;
        }
      `
      
      const form = document.createElement('form')
      form.className = 'shadow-form'
      form.id = 'shadow-form'
      
      const nameGroup = document.createElement('div')
      nameGroup.className = 'form-group'
      const nameLabel = document.createElement('label')
      nameLabel.textContent = 'Name:'
      nameLabel.setAttribute('for', 'shadow-name-input')
      const nameInput = document.createElement('input')
      nameInput.type = 'text'
      nameInput.id = 'shadow-name-input'
      nameInput.setAttribute('data-testid', 'shadow-name-input')
      nameInput.placeholder = 'Enter your name'
      nameInput.addEventListener('input', (e) => {
        setFormData(prev => ({ ...prev, name: (e.target as HTMLInputElement).value }))
      })
      nameGroup.appendChild(nameLabel)
      nameGroup.appendChild(nameInput)
      
      const emailGroup = document.createElement('div')
      emailGroup.className = 'form-group'
      const emailLabel = document.createElement('label')
      emailLabel.textContent = 'Email:'
      emailLabel.setAttribute('for', 'shadow-email-input')
      const emailInput = document.createElement('input')
      emailInput.type = 'email'
      emailInput.id = 'shadow-email-input'
      emailInput.setAttribute('data-testid', 'shadow-email-input')
      emailInput.placeholder = 'Enter your email'
      emailInput.addEventListener('input', (e) => {
        setFormData(prev => ({ ...prev, email: (e.target as HTMLInputElement).value }))
      })
      emailGroup.appendChild(emailLabel)
      emailGroup.appendChild(emailInput)
      
      const submitButton = document.createElement('button')
      submitButton.type = 'submit'
      submitButton.textContent = 'Submit Shadow Form'
      submitButton.id = 'shadow-submit-button'
      submitButton.setAttribute('data-testid', 'shadow-submit-button')
      
      form.appendChild(nameGroup)
      form.appendChild(emailGroup)
      form.appendChild(submitButton)
      
      form.addEventListener('submit', (e) => {
        e.preventDefault()
        setShadowMessage(`Shadow Form submitted! Name: ${nameInput.value}, Email: ${emailInput.value}`)
      })
      
      shadowRoot.appendChild(style)
      shadowRoot.appendChild(form)
    }
  }, [])

  return (
    <div className="page">
      <h1>Shadow DOM</h1>
      <p>Practice working with Web Components and Shadow DOM</p>

      <h2>Shadow DOM Buttons</h2>
      <div
        ref={shadowHostRef}
        id="shadow-host"
        data-testid="shadow-host"
        style={{
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          marginBottom: '20px'
        }}
      />

      {shadowMessage && (
        <div className="alert success" id="shadow-result" data-testid="shadow-result">
          {shadowMessage}
        </div>
      )}

      <h2>Shadow DOM Form</h2>
      <div
        ref={shadowFormRef}
        id="shadow-form-host"
        data-testid="shadow-form-host"
        style={{
          marginBottom: '20px'
        }}
      />

      {formData.name && formData.email && (
        <div className="alert info" id="form-values" data-testid="form-values">
          <strong>Current Values:</strong> Name: {formData.name}, Email: {formData.email}
        </div>
      )}

      <h2>Regular (Non-Shadow) Elements for Comparison</h2>
      <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <button
          id="regular-button"
          data-testid="regular-button"
          onClick={() => setShadowMessage('Regular button clicked!')}
        >
          Regular Button
        </button>
      </div>

      <div style={{ marginTop: '2rem', backgroundColor: '#fff3cd', padding: '1rem', borderRadius: '4px', border: '1px solid #ffc107' }}>
        <h3>⚠️ Shadow DOM Automation Challenges</h3>
        <p>
          Shadow DOM encapsulates elements, making them harder to access with standard selectors.
          The buttons and form above are inside shadow roots.
        </p>
        
        <h4>Accessing Shadow DOM Elements:</h4>
        <pre style={{ backgroundColor: '#2c3e50', color: '#ecf0f1', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`// Playwright
const shadowHost = page.locator('#shadow-host');
const shadowButton = shadowHost.locator('button#shadow-button-1');
await shadowButton.click();

// Or use piercing selectors
await page.locator('#shadow-host >>> button#shadow-button-1').click();

// Selenium (requires JavaScript execution)
WebElement shadowHost = driver.findElement(By.id("shadow-host"));
SearchContext shadowRoot = shadowHost.getShadowRoot();
WebElement shadowButton = shadowRoot.findElement(By.id("shadow-button-1"));
shadowButton.click();

// JavaScript execution approach
JavascriptExecutor js = (JavascriptExecutor) driver;
WebElement button = (WebElement) js.executeScript(
  "return document.querySelector('#shadow-host').shadowRoot.querySelector('#shadow-button-1')"
);
button.click();`}
        </pre>
      </div>

      <div style={{ marginTop: '1rem', backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '4px' }}>
        <h3>Practice Tips:</h3>
        <ul>
          <li>Shadow DOM elements are not accessible via normal DOM queries</li>
          <li>You need to pierce through the shadow root to access elements</li>
          <li>Each framework handles shadow DOM differently</li>
          <li>Modern frameworks like Playwright have built-in shadow DOM support</li>
          <li>Older tools like Selenium may require JavaScript execution</li>
        </ul>
      </div>
    </div>
  )
}

export default ShadowDOM
