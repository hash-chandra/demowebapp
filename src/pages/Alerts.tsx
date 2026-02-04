import { useState } from 'react'

function Alerts() {
  const [showModal, setShowModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [modalResult, setModalResult] = useState('')

  const handleAlert = () => {
    alert('This is a JavaScript alert!')
  }

  const handleConfirm = () => {
    const result = confirm('Do you confirm this action?')
    setModalResult(result ? 'User clicked OK' : 'User clicked Cancel')
  }

  const handlePrompt = () => {
    const result = prompt('Please enter your name:', 'John Doe')
    setModalResult(result ? `User entered: ${result}` : 'User cancelled the prompt')
  }

  return (
    <div className="page">
      <h1>Alerts & Dialogs</h1>
      <p>Practice handling JavaScript alerts, confirms, prompts, and custom modals</p>

      <h2>JavaScript Native Alerts</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          id="alert-button"
          data-testid="alert-button"
          onClick={handleAlert}
        >
          Trigger Alert
        </button>

        <button
          id="confirm-button"
          data-testid="confirm-button"
          className="secondary"
          onClick={handleConfirm}
        >
          Trigger Confirm
        </button>

        <button
          id="prompt-button"
          data-testid="prompt-button"
          className="success"
          onClick={handlePrompt}
        >
          Trigger Prompt
        </button>
      </div>

      {modalResult && (
        <div className="alert info" id="modal-result" data-testid="modal-result" style={{ marginTop: '1rem' }}>
          <strong>Result:</strong> {modalResult}
        </div>
      )}

      <h2>Custom Modal Dialogs</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          id="open-modal"
          data-testid="open-modal"
          onClick={() => setShowModal(true)}
        >
          Open Simple Modal
        </button>

        <button
          id="open-confirm-modal"
          data-testid="open-confirm-modal"
          className="danger"
          onClick={() => setShowConfirmModal(true)}
        >
          Open Confirmation Modal
        </button>
      </div>

      {/* Simple Modal */}
      {showModal && (
        <div className="modal-overlay" id="modal-overlay" data-testid="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" id="simple-modal" data-testid="simple-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Simple Modal</h2>
            <p>This is a custom modal dialog. Click outside or press the button to close.</p>
            <div className="modal-actions">
              <button
                id="close-modal"
                data-testid="close-modal"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div
          className="modal-overlay"
          id="confirm-modal-overlay"
          data-testid="confirm-modal-overlay"
        >
          <div className="modal" id="confirm-modal" data-testid="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Action</h2>
            <p>Are you sure you want to proceed with this action?</p>
            <div className="modal-actions">
              <button
                id="confirm-yes"
                data-testid="confirm-yes"
                className="success"
                onClick={() => {
                  setModalResult('User confirmed the action')
                  setShowConfirmModal(false)
                }}
              >
                Yes, Proceed
              </button>
              <button
                id="confirm-no"
                data-testid="confirm-no"
                className="danger"
                onClick={() => {
                  setModalResult('User cancelled the action')
                  setShowConfirmModal(false)
                }}
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <h2>Notifications</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="alert success" id="success-notification" data-testid="success-notification">
          <strong>Success!</strong> This is a success notification message.
        </div>
        
        <div className="alert error" id="error-notification" data-testid="error-notification">
          <strong>Error!</strong> This is an error notification message.
        </div>
        
        <div className="alert info" id="info-notification" data-testid="info-notification">
          <strong>Info:</strong> This is an informational notification message.
        </div>
      </div>

      <h2>Selector Practice Guide</h2>
      <div style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '4px', marginTop: '2rem' }}>
        <h3>XPath Examples:</h3>
        <pre style={{ backgroundColor: '#2c3e50', color: '#ecf0f1', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`// Alert button
//button[@id='alert-button']
//button[@data-testid='alert-button']
//button[text()='Trigger Alert']

// Modal overlay (when visible)
//div[@class='modal-overlay']
//div[@data-testid='modal-overlay']

// Modal close button
//button[@id='close-modal']
//div[@class='modal']//button[text()='Close']`}
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

export default Alerts
