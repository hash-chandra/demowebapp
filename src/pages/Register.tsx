import { useState } from 'react'

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
    country: '',
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
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.username) newErrors.username = 'Username is required'
    else if (formData.username.length < 4) newErrors.username = 'Username must be at least 4 characters'
    
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password'
    else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    if (!formData.gender) newErrors.gender = 'Please select a gender'
    if (!formData.country) newErrors.country = 'Please select a country'
    if (!formData.terms) newErrors.terms = 'You must accept the terms and conditions'
    
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validationErrors = validate()
    
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true)
      console.log('Form submitted:', formData)
    } else {
      setErrors(validationErrors)
    }
  }

  if (submitted) {
    return (
      <div className="page">
        <h1>Registration Successful!</h1>
        <div className="alert success" id="registration-success" data-testid="registration-success">
          <h2>Welcome, {formData.firstName} {formData.lastName}!</h2>
          <p>Your account has been created successfully.</p>
          <p><strong>Username:</strong> {formData.username}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Gender:</strong> {formData.gender}</p>
          <p><strong>Country:</strong> {formData.country}</p>
        </div>
        <button onClick={() => setSubmitted(false)} id="register-another" data-testid="register-another">
          Register Another Account
        </button>
      </div>
    )
  }

  return (
    <div className="page">
      <h1>Registration Form</h1>
      
      <form onSubmit={handleSubmit} id="registration-form" data-testid="registration-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            data-testid="first-name-input"
            className={errors.firstName ? 'error' : ''}
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
          />
          {errors.firstName && <div className="error-message" data-testid="first-name-error">{errors.firstName}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            data-testid="last-name-input"
            className={errors.lastName ? 'error' : ''}
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
          />
          {errors.lastName && <div className="error-message" data-testid="last-name-error">{errors.lastName}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email <span style={{ color: 'red' }}>*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            data-testid="email-input"
            className={errors.email ? 'error' : ''}
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
          />
          {errors.email && <div className="error-message" data-testid="email-error">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="username">Username <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            id="username"
            name="username"
            data-testid="username-input"
            className={errors.username ? 'error' : ''}
            value={formData.username}
            onChange={handleChange}
            placeholder="Choose a username (min 4 characters)"
          />
          {errors.username && <div className="error-message" data-testid="username-error">{errors.username}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password <span style={{ color: 'red' }}>*</span></label>
          <input
            type="password"
            id="password"
            name="password"
            data-testid="password-input"
            className={errors.password ? 'error' : ''}
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password (min 6 characters)"
          />
          {errors.password && <div className="error-message" data-testid="password-error">{errors.password}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password <span style={{ color: 'red' }}>*</span></label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            data-testid="confirm-password-input"
            className={errors.confirmPassword ? 'error' : ''}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
          />
          {errors.confirmPassword && <div className="error-message" data-testid="confirm-password-error">{errors.confirmPassword}</div>}
        </div>

        <div className="form-group">
          <label>Gender <span style={{ color: 'red' }}>*</span></label>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="radio"
                name="gender"
                value="male"
                data-testid="gender-male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="radio"
                name="gender"
                value="female"
                data-testid="gender-female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              />
              Female
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="radio"
                name="gender"
                value="other"
                data-testid="gender-other"
                checked={formData.gender === 'other'}
                onChange={handleChange}
              />
              Other
            </label>
          </div>
          {errors.gender && <div className="error-message" data-testid="gender-error">{errors.gender}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="country">Country <span style={{ color: 'red' }}>*</span></label>
          <select
            id="country"
            name="country"
            data-testid="country-select"
            className={errors.country ? 'error' : ''}
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">Select a country</option>
            <option value="USA">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="India">India</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Japan">Japan</option>
            <option value="China">China</option>
            <option value="Brazil">Brazil</option>
          </select>
          {errors.country && <div className="error-message" data-testid="country-error">{errors.country}</div>}
        </div>

        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              name="terms"
              id="terms"
              data-testid="terms-checkbox"
              checked={formData.terms}
              onChange={handleChange}
              style={{ width: 'auto' }}
            />
            I accept the terms and conditions <span style={{ color: 'red' }}>*</span>
          </label>
          {errors.terms && <div className="error-message" data-testid="terms-error">{errors.terms}</div>}
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" id="register-button" data-testid="register-button">
            Register
          </button>
          <button
            type="reset"
            className="secondary"
            id="reset-button"
            data-testid="reset-button"
            onClick={() => {
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                username: '',
                password: '',
                confirmPassword: '',
                gender: '',
                country: '',
                terms: false
              })
              setErrors({})
            }}
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
