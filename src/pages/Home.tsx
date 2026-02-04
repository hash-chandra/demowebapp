import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="page">
      <h1>Automation Practice Web Application</h1>
      
      <div className="alert info" id="welcome-message" data-testid="welcome-message">
        <strong>⚠️ Educational Use Only - Demo Application</strong><br/>
        This is a practice website for learning test automation. <strong>DO NOT enter real passwords or personal information.</strong> All authentication is mock-based with no backend storage.
      </div>

      <section>
        <h2>What You Can Practice Here</h2>
        <ul style={{ lineHeight: '2', fontSize: '1.1rem' }}>
          <li>✅ <strong>Login & Registration Forms</strong> - Practice form submissions and authentication flows</li>
          <li>✅ <strong>Form Elements</strong> - Input fields, dropdowns, checkboxes, radio buttons, sliders, date pickers</li>
          <li>✅ <strong>Advanced Elements</strong> - File uploads, tooltips, autocomplete, dynamic content</li>
          <li>✅ <strong>Alerts & Dialogs</strong> - JavaScript alerts, confirms, prompts, and custom modals</li>
          <li>✅ <strong>Drag & Drop</strong> - Drag and drop interactions</li>
          <li>✅ <strong>Tables</strong> - Sortable, filterable, and paginated tables</li>
          <li>✅ <strong>iFrames</strong> - Practice switching between iframes</li>
          <li>✅ <strong>Shadow DOM</strong> - Work with Web Components and Shadow DOM</li>
          <li>✅ <strong>Multi-Step Forms</strong> - Complex form wizards with validation</li>
        </ul>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Learn Selectors</h2>
        <p>
          Every element on this site has multiple attributes (id, name, class, data-testid) 
          to help you practice creating:
        </p>
        <ul style={{ lineHeight: '2' }}>
          <li><code>XPath</code> selectors - //button[@id='submit-button']</li>
          <li><code>CSS</code> selectors - #submit-button, .btn-primary</li>
          <li><code>data-testid</code> attributes - [data-testid="submit-btn"]</li>
          <li><code>Accessibility</code> selectors - ARIA labels and roles</li>
        </ul>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Quick Links</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <Link to="/login">
            <button id="nav-login" data-testid="nav-login-btn">Login Page</button>
          </Link>
          <Link to="/form-elements">
            <button id="nav-forms" data-testid="nav-forms-btn" className="secondary">Form Elements</button>
          </Link>
          <Link to="/advanced-elements">
            <button id="nav-advanced" data-testid="nav-advanced-btn" className="success">Advanced Elements</button>
          </Link>
        </div>
      </section>

      <section style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#ecf0f1', borderRadius: '4px' }}>
        <h3>Technologies Used</h3>
        <p>
          <strong>Frontend:</strong> React 19 + TypeScript + Vite<br/>
          <strong>Routing:</strong> React Router v7<br/>
          <strong>License:</strong> MIT (Free & Open Source)<br/>
          <strong>Deployment:</strong> GitHub Pages
        </p>
      </section>
      <footer style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px solid #ecf0f1', textAlign: 'center', color: '#7f8c8d' }}>
        <p>Created by <a href="https://github.com/hash-chandra" target="_blank" rel="noopener noreferrer" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>@hash-chandra</a></p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Open Source • MIT License • Contributions Welcome</p>
      </footer>    </div>
  )
}

export default Home
