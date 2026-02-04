import { useState } from 'react'

interface FormData {
  // Step 1
  firstName: string
  lastName: string
  email: string
  phone: string
  // Step 2
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  // Step 3
  cardNumber: string
  expiryDate: string
  cvv: string
  billingAddress: string
  // Step 4
  newsletter: boolean
  terms: boolean
}

function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    newsletter: false,
    terms: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.phone) newErrors.phone = 'Phone is required'
    return newErrors
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.address) newErrors.address = 'Address is required'
    if (!formData.city) newErrors.city = 'City is required'
    if (!formData.state) newErrors.state = 'State is required'
    if (!formData.zipCode) newErrors.zipCode = 'Zip code is required'
    if (!formData.country) newErrors.country = 'Country is required'
    return newErrors
  }

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required'
    else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits'
    }
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required'
    if (!formData.cvv) newErrors.cvv = 'CVV is required'
    else if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'CVV must be 3 or 4 digits'
    if (!formData.billingAddress) newErrors.billingAddress = 'Billing address is required'
    return newErrors
  }

  const validateStep4 = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.terms) newErrors.terms = 'You must accept the terms and conditions'
    return newErrors
  }

  const handleNext = () => {
    let validationErrors: Record<string, string> = {}
    
    switch (currentStep) {
      case 1:
        validationErrors = validateStep1()
        break
      case 2:
        validationErrors = validateStep2()
        break
      case 3:
        validationErrors = validateStep3()
        break
      case 4:
        validationErrors = validateStep4()
        break
    }

    if (Object.keys(validationErrors).length === 0) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1)
      } else {
        setSubmitted(true)
      }
      setErrors({})
    } else {
      setErrors(validationErrors)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setErrors({})
    }
  }

  if (submitted) {
    return (
      <div className="page">
        <h1>Order Confirmation</h1>
        <div className="alert success" id="confirmation" data-testid="confirmation">
          <h2>Thank you for your order!</h2>
          <p>Your multi-step form has been successfully submitted.</p>
        </div>
        <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '4px', marginTop: '1rem' }}>
          <h3>Order Summary:</h3>
          <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Shipping Address:</strong> {formData.address}, {formData.city}, {formData.state} {formData.zipCode}, {formData.country}</p>
          <p><strong>Card Number:</strong> **** **** **** {formData.cardNumber.slice(-4)}</p>
          <p><strong>Newsletter:</strong> {formData.newsletter ? 'Subscribed' : 'Not subscribed'}</p>
        </div>
        <button onClick={() => { setSubmitted(false); setCurrentStep(1); }} style={{ marginTop: '1rem' }}>
          Start New Order
        </button>
      </div>
    )
  }

  return (
    <div className="page">
      <h1>Multi-Step Form</h1>
      <p>Practice automating multi-step form workflows with validation</p>

      {/* Progress Indicator */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            id={`step-indicator-${step}`}
            data-testid={`step-indicator-${step}`}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: currentStep === step ? '#3498db' : currentStep > step ? '#27ae60' : '#ecf0f1',
              color: currentStep >= step ? 'white' : '#7f8c8d',
              fontWeight: 'bold',
              borderRadius: '4px',
              margin: '0 0.25rem'
            }}
          >
            Step {step}
          </div>
        ))}
      </div>

      <form id="multi-step-form" data-testid="multi-step-form">
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div id="step-1" data-testid="step-1">
            <h2>Step 1: Personal Information</h2>
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                data-testid="first-name"
                className={errors.firstName ? 'error' : ''}
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <div className="error-message">{errors.firstName}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                data-testid="last-name"
                className={errors.lastName ? 'error' : ''}
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <div className="error-message">{errors.lastName}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                data-testid="email"
                className={errors.email ? 'error' : ''}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                data-testid="phone"
                className={errors.phone ? 'error' : ''}
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <div className="error-message">{errors.phone}</div>}
            </div>
          </div>
        )}

        {/* Step 2: Address Information */}
        {currentStep === 2 && (
          <div id="step-2" data-testid="step-2">
            <h2>Step 2: Shipping Address</h2>
            <div className="form-group">
              <label htmlFor="address">Street Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                data-testid="address"
                className={errors.address ? 'error' : ''}
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <div className="error-message">{errors.address}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                data-testid="city"
                className={errors.city ? 'error' : ''}
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <div className="error-message">{errors.city}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="state">State/Province *</label>
              <input
                type="text"
                id="state"
                name="state"
                data-testid="state"
                className={errors.state ? 'error' : ''}
                value={formData.state}
                onChange={handleChange}
              />
              {errors.state && <div className="error-message">{errors.state}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="zipCode">Zip/Postal Code *</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                data-testid="zip-code"
                className={errors.zipCode ? 'error' : ''}
                value={formData.zipCode}
                onChange={handleChange}
              />
              {errors.zipCode && <div className="error-message">{errors.zipCode}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="country">Country *</label>
              <select
                id="country"
                name="country"
                data-testid="country"
                className={errors.country ? 'error' : ''}
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Select a country</option>
                <option value="USA">United States</option>
                <option value="Canada">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="India">India</option>
              </select>
              {errors.country && <div className="error-message">{errors.country}</div>}
            </div>
          </div>
        )}

        {/* Step 3: Payment Information */}
        {currentStep === 3 && (
          <div id="step-3" data-testid="step-3">
            <h2>Step 3: Payment Information</h2>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number *</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                data-testid="card-number"
                className={errors.cardNumber ? 'error' : ''}
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
              {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date *</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  data-testid="expiry-date"
                  className={errors.expiryDate ? 'error' : ''}
                  value={formData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                />
                {errors.expiryDate && <div className="error-message">{errors.expiryDate}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="cvv">CVV *</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  data-testid="cvv"
                  className={errors.cvv ? 'error' : ''}
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  maxLength={4}
                />
                {errors.cvv && <div className="error-message">{errors.cvv}</div>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="billingAddress">Billing Address *</label>
              <input
                type="text"
                id="billingAddress"
                name="billingAddress"
                data-testid="billing-address"
                className={errors.billingAddress ? 'error' : ''}
                value={formData.billingAddress}
                onChange={handleChange}
              />
              {errors.billingAddress && <div className="error-message">{errors.billingAddress}</div>}
            </div>
          </div>
        )}

        {/* Step 4: Review & Confirm */}
        {currentStep === 4 && (
          <div id="step-4" data-testid="step-4">
            <h2>Step 4: Review & Confirm</h2>
            <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '4px', marginBottom: '1rem' }}>
              <h3>Please review your information:</h3>
              <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Shipping:</strong> {formData.address}, {formData.city}, {formData.state} {formData.zipCode}, {formData.country}</p>
              <p><strong>Payment:</strong> Card ending in {formData.cardNumber.slice(-4)}</p>
            </div>

            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  name="newsletter"
                  id="newsletter"
                  data-testid="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                  style={{ width: 'auto' }}
                />
                Subscribe to newsletter
              </label>
            </div>

            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  name="terms"
                  id="terms"
                  data-testid="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  style={{ width: 'auto' }}
                />
                I accept the terms and conditions *
              </label>
              {errors.terms && <div className="error-message">{errors.terms}</div>}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          {currentStep > 1 && (
            <button
              type="button"
              id="previous-button"
              data-testid="previous-button"
              className="secondary"
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}
          <button
            type="button"
            id="next-button"
            data-testid="next-button"
            onClick={handleNext}
          >
            {currentStep === 4 ? 'Submit Order' : 'Next'}
          </button>
        </div>
      </form>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#7f8c8d' }}>
          💡 Practice automation with this form • Built by <a href="https://github.com/hash-chandra" target="_blank" rel="noopener noreferrer" style={{ color: '#3498db', textDecoration: 'none' }}>@hash-chandra</a>
        </p>
      </div>
    </div>
  )
}

export default MultiStepForm
