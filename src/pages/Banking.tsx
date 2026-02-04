import { useState, useRef } from 'react'

function Banking() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [currency, setCurrency] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [downloadStatus, setDownloadStatus] = useState('')
  const [copyStatus, setCopyStatus] = useState('')
  const [accountNumber] = useState('1234567890123456')
  const [calcDisplay, setCalcDisplay] = useState('0')
  const [sessionTimeout, setSessionTimeout] = useState(false)
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d.]/g, '')
    const parts = value.split('.')
    if (parts.length > 2) return
    if (parts[1] && parts[1].length > 2) return
    setCurrency(value)
  }

  const formatCurrency = (value: string) => {
    if (!value) return ''
    const num = parseFloat(value)
    return isNaN(num) ? value : num.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopyStatus('Copied!')
      setTimeout(() => setCopyStatus(''), 2000)
    } catch (err) {
      setCopyStatus('Failed to copy')
    }
  }

  const downloadStatement = () => {
    setDownloadStatus('Downloading...')
    setTimeout(() => {
      const content = `BANK STATEMENT
Date Range: ${startDate} to ${endDate}
Account: ${accountNumber}
Transaction History would be here...`
      
      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'statement.txt'
      a.click()
      URL.revokeObjectURL(url)
      
      setDownloadStatus('Downloaded!')
      setTimeout(() => setDownloadStatus(''), 3000)
    }, 1000)
  }

  const handleCalc = (value: string) => {
    if (value === 'C') {
      setCalcDisplay('0')
    } else if (value === '=') {
      try {
        const result = eval(calcDisplay)
        setCalcDisplay(String(result))
      } catch {
        setCalcDisplay('Error')
      }
    } else {
      setCalcDisplay(prev => prev === '0' ? value : prev + value)
    }
  }

  const startSessionTimer = () => {
    setSessionTimeout(false)
    setTimeout(() => {
      setSessionTimeout(true)
    }, 10000) // 10 seconds for demo
  }

  return (
    <div className="page">
      <h1>🏦 Banking & Finance Features</h1>
      <p>Practice automation with financial forms, calculators, and specialized inputs</p>

      {/* Date Range Picker */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>📅 Date Range Picker</h2>
        <p>Test date selection for transaction history or statement downloads</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="form-group">
            <label htmlFor="start-date">Start Date</label>
            <input
              type="date"
              id="start-date"
              data-testid="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="end-date">End Date</label>
            <input
              type="date"
              id="end-date"
              data-testid="end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
            />
          </div>
          <button
            id="apply-date-range"
            data-testid="apply-date-range"
            className="btn-primary"
            disabled={!startDate || !endDate}
          >
            Apply Range
          </button>
        </div>
        {startDate && endDate && (
          <div 
            id="date-range-display" 
            data-testid="date-range-display"
            style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#e8f5e9', borderRadius: '4px' }}
          >
            Selected: {startDate} to {endDate} ({Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))} days)
          </div>
        )}
      </section>

      {/* Currency Input */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>💰 Currency Input</h2>
        <p>Test formatted currency input with validation</p>
        <div className="form-group">
          <label htmlFor="currency-input">Amount</label>
          <input
            type="text"
            id="currency-input"
            data-testid="currency-input"
            value={currency}
            onChange={handleCurrencyChange}
            placeholder="0.00"
            style={{ fontSize: '1.2rem' }}
          />
          {currency && (
            <div 
              id="currency-formatted" 
              data-testid="currency-formatted"
              style={{ marginTop: '0.5rem', fontSize: '1.5rem', color: '#27ae60', fontWeight: 'bold' }}
            >
              {formatCurrency(currency)}
            </div>
          )}
        </div>
      </section>

      {/* OTP Input */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>🔐 OTP Input</h2>
        <p>Test one-time password input with auto-focus navigation</p>
        <div 
          id="otp-container" 
          data-testid="otp-container"
          style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', margin: '1rem 0' }}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { otpRefs.current[index] = el }}
              type="text"
              id={`otp-${index}`}
              data-testid={`otp-${index}`}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(index, e)}
              maxLength={1}
              style={{
                width: '50px',
                height: '50px',
                textAlign: 'center',
                fontSize: '1.5rem',
                border: '2px solid #ddd',
                borderRadius: '8px',
                fontWeight: 'bold'
              }}
            />
          ))}
        </div>
        <button
          id="verify-otp"
          data-testid="verify-otp"
          className="btn-primary"
          disabled={otp.some(d => !d)}
        >
          Verify OTP
        </button>
        {otp.every(d => d) && (
          <div 
            id="otp-value" 
            data-testid="otp-value"
            style={{ marginTop: '1rem', color: '#7f8c8d' }}
          >
            Entered OTP: {otp.join('')}
          </div>
        )}
      </section>

      {/* Copy to Clipboard */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>📋 Copy to Clipboard</h2>
        <p>Test clipboard functionality for account numbers and transaction IDs</p>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div 
            id="account-number" 
            data-testid="account-number"
            style={{
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '1.2rem',
              letterSpacing: '2px'
            }}
          >
            {accountNumber}
          </div>
          <button
            id="copy-account"
            data-testid="copy-account"
            onClick={() => copyToClipboard(accountNumber)}
            className="secondary"
          >
            📋 Copy
          </button>
          {copyStatus && (
            <span 
              id="copy-status" 
              data-testid="copy-status"
              style={{ color: copyStatus.includes('Failed') ? '#e74c3c' : '#27ae60', fontWeight: 'bold' }}
            >
              {copyStatus}
            </span>
          )}
        </div>
      </section>

      {/* Download Statement */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>💾 Download Statement</h2>
        <p>Test file download functionality for statements and reports</p>
        <button
          id="download-statement"
          data-testid="download-statement"
          onClick={downloadStatement}
          className="btn-primary"
          disabled={!startDate || !endDate}
        >
          📥 Download Statement
        </button>
        {downloadStatus && (
          <div 
            id="download-status" 
            data-testid="download-status"
            style={{ 
              marginTop: '1rem', 
              padding: '0.75rem',
              backgroundColor: downloadStatus.includes('Downloaded') ? '#e8f5e9' : '#fff3cd',
              borderRadius: '4px',
              color: '#2c3e50'
            }}
          >
            {downloadStatus}
          </div>
        )}
      </section>

      {/* Calculator */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>🔢 EMI Calculator</h2>
        <p>Test calculator functionality for loan/EMI calculations</p>
        <div style={{ maxWidth: '300px', margin: '0 auto' }}>
          <div 
            id="calc-display" 
            data-testid="calc-display"
            style={{
              padding: '1.5rem',
              backgroundColor: '#2c3e50',
              color: 'white',
              textAlign: 'right',
              fontSize: '2rem',
              borderRadius: '8px 8px 0 0',
              fontFamily: 'monospace',
              minHeight: '60px',
              wordBreak: 'break-all'
            }}
          >
            {calcDisplay}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', backgroundColor: '#ddd' }}>
            {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', 'C', '0', '=', '+'].map(btn => (
              <button
                key={btn}
                id={`calc-${btn}`}
                data-testid={`calc-${btn}`}
                onClick={() => handleCalc(btn)}
                style={{
                  padding: '1.5rem',
                  fontSize: '1.5rem',
                  border: 'none',
                  backgroundColor: btn === '=' ? '#27ae60' : btn === 'C' ? '#e74c3c' : 'white',
                  color: btn === '=' || btn === 'C' ? 'white' : '#2c3e50',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Session Timeout */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>⏱️ Session Timeout</h2>
        <p>Test session timeout warnings (10 seconds for demo)</p>
        <button
          id="start-session"
          data-testid="start-session"
          onClick={startSessionTimer}
          className="btn-primary"
        >
          Start Session
        </button>
        {sessionTimeout && (
          <div 
            id="timeout-warning" 
            data-testid="timeout-warning"
            className="modal-overlay"
          >
            <div className="modal" style={{ maxWidth: '400px' }}>
              <h3>⚠️ Session Timeout</h3>
              <p>Your session has expired due to inactivity</p>
              <div className="modal-actions">
                <button onClick={() => setSessionTimeout(false)} className="btn-primary">
                  Continue Session
                </button>
                <button onClick={() => setSessionTimeout(false)} className="secondary">
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <footer style={{ marginTop: '4rem', padding: '2rem', textAlign: 'center', borderTop: '2px solid #ecf0f1' }}>
        <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
          Created by <a href="https://github.com/hash-chandra" target="_blank" rel="noopener noreferrer" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>@hash-chandra</a>
        </p>
      </footer>
    </div>
  )
}

export default Banking
