import { useState } from 'react'

function Iframes() {
  const [iframeContent, setIframeContent] = useState('home')

  return (
    <div className="page">
      <h1>iFrames</h1>
      <p>Practice switching between iframes and interacting with nested content</p>

      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          id="load-home"
          data-testid="load-home"
          onClick={() => setIframeContent('home')}
          className={iframeContent === 'home' ? '' : 'secondary'}
        >
          Load Home Content
        </button>
        <button
          id="load-form"
          data-testid="load-form"
          onClick={() => setIframeContent('form')}
          className={iframeContent === 'form' ? '' : 'secondary'}
        >
          Load Form Content
        </button>
        <button
          id="load-table"
          data-testid="load-table"
          onClick={() => setIframeContent('table')}
          className={iframeContent === 'table' ? '' : 'secondary'}
        >
          Load Table Content
        </button>
      </div>

      {/* iFrame 1 */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>iFrame 1 - Dynamic Content</h2>
        <iframe
          id="iframe-1"
          data-testid="iframe-1"
          title="iFrame 1"
          srcDoc={getIframeContent(iframeContent)}
          style={{
            width: '100%',
            height: '400px',
            border: '2px solid #3498db',
            borderRadius: '4px'
          }}
        />
      </div>

      {/* iFrame 2 */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>iFrame 2 - Nested iFrame</h2>
        <iframe
          id="iframe-2"
          data-testid="iframe-2"
          title="iFrame 2"
          srcDoc={getNestedIframeContent()}
          style={{
            width: '100%',
            height: '400px',
            border: '2px solid #27ae60',
            borderRadius: '4px'
          }}
        />
      </div>

      <div style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '4px' }}>
        <h3>Automation Tips for iFrames:</h3>
        <pre style={{ backgroundColor: '#2c3e50', color: '#ecf0f1', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`// Playwright
const frame = page.frame({ name: 'iframe-1' });
await frame.click('#iframe-button');

// Selenium
driver.switchTo().frame("iframe-1");
driver.findElement(By.id("iframe-button")).click();
driver.switchTo().defaultContent(); // Switch back to main page

// For nested iframes, switch multiple times:
driver.switchTo().frame("iframe-2");
driver.switchTo().frame("nested-iframe");
// interact with nested iframe content
driver.switchTo().defaultContent(); // Switch back to main page`}
        </pre>
      </div>
    </div>
  )
}

function getIframeContent(type: string): string {
  const baseStyles = `
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
        background-color: #ecf0f1;
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
      input, select {
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        width: 100%;
        margin-bottom: 10px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        background: white;
      }
      th, td {
        padding: 10px;
        border: 1px solid #ddd;
        text-align: left;
      }
      th {
        background-color: #34495e;
        color: white;
      }
      .form-group {
        margin-bottom: 15px;
      }
      label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }
    </style>
  `

  if (type === 'home') {
    return `
      <!DOCTYPE html>
      <html>
        <head>${baseStyles}</head>
        <body>
          <h1 id="iframe-heading">iFrame Home Content</h1>
          <p id="iframe-text">This is content inside an iframe. Practice switching to this iframe and interacting with elements.</p>
          <button id="iframe-button" onclick="alert('Button clicked inside iframe!')">Click Me in iFrame</button>
          <input type="text" id="iframe-input" placeholder="Type something here..." />
        </body>
      </html>
    `
  }

  if (type === 'form') {
    return `
      <!DOCTYPE html>
      <html>
        <head>${baseStyles}</head>
        <body>
          <h1 id="iframe-form-heading">iFrame Form</h1>
          <form id="iframe-form">
            <div class="form-group">
              <label for="iframe-name">Name:</label>
              <input type="text" id="iframe-name" name="name" placeholder="Enter your name" />
            </div>
            <div class="form-group">
              <label for="iframe-email">Email:</label>
              <input type="email" id="iframe-email" name="email" placeholder="Enter your email" />
            </div>
            <div class="form-group">
              <label for="iframe-country">Country:</label>
              <select id="iframe-country" name="country">
                <option value="">Select a country</option>
                <option value="USA">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="Canada">Canada</option>
              </select>
            </div>
            <button type="submit" id="iframe-submit">Submit</button>
          </form>
          <script>
            document.getElementById('iframe-form').addEventListener('submit', (e) => {
              e.preventDefault();
              alert('Form submitted in iframe!');
            });
          </script>
        </body>
      </html>
    `
  }

  if (type === 'table') {
    return `
      <!DOCTYPE html>
      <html>
        <head>${baseStyles}</head>
        <body>
          <h1 id="iframe-table-heading">iFrame Table</h1>
          <table id="iframe-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr id="row-1">
                <td>1</td>
                <td>John Doe</td>
                <td>Admin</td>
              </tr>
              <tr id="row-2">
                <td>2</td>
                <td>Jane Smith</td>
                <td>User</td>
              </tr>
              <tr id="row-3">
                <td>3</td>
                <td>Bob Johnson</td>
                <td>Manager</td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `
  }

  return ''
}

function getNestedIframeContent(): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background-color: #d5f4e6;
          }
          button {
            padding: 10px 20px;
            background-color: #27ae60;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          iframe {
            width: 100%;
            height: 200px;
            border: 2px dashed #e74c3c;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <h2 id="parent-iframe-heading">Parent iFrame</h2>
        <p>This iframe contains another nested iframe below:</p>
        <button id="parent-iframe-button" onclick="alert('Clicked in parent iframe!')">Parent iFrame Button</button>
        
        <iframe id="nested-iframe" title="Nested iFrame" srcdoc="
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  padding: 15px;
                  background-color: #ffe6e6;
                }
                button {
                  padding: 8px 16px;
                  background-color: #e74c3c;
                  color: white;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                }
              </style>
            </head>
            <body>
              <h3 id='nested-iframe-heading'>Nested iFrame Content</h3>
              <p>This is inside a nested iframe!</p>
              <button id='nested-iframe-button' onclick='alert(&#39;Clicked in nested iframe!&#39;)'>Nested iFrame Button</button>
              <input type='text' id='nested-iframe-input' placeholder='Nested iframe input' />
            </body>
          </html>
        "></iframe>
      </body>
    </html>
  `
}

export default Iframes
