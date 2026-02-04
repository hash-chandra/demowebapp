import { useState } from 'react'

function FormElements() {
  const [textInput, setTextInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [numberInput, setNumberInput] = useState('')
  const [dateInput, setDateInput] = useState('')
  const [timeInput, setTimeInput] = useState('')
  const [colorInput, setColorInput] = useState('#3498db')
  const [rangeInput, setRangeInput] = useState(50)
  const [urlInput, setUrlInput] = useState('')
  const [telInput, setTelInput] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [textareaInput, setTextareaInput] = useState('')
  const [selectInput, setSelectInput] = useState('')
  const [multiSelectInput, setMultiSelectInput] = useState<string[]>([])
  const [checkboxes, setCheckboxes] = useState({
    option1: false,
    option2: false,
    option3: false
  })
  const [radioValue, setRadioValue] = useState('')
  const [fileInput, setFileInput] = useState<File | null>(null)

  const handleCheckboxChange = (name: string) => {
    setCheckboxes({
      ...checkboxes,
      [name]: !checkboxes[name as keyof typeof checkboxes]
    })
  }

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options
    const values: string[] = []
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        values.push(options[i].value)
      }
    }
    setMultiSelectInput(values)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileInput(e.target.files[0])
    }
  }

  return (
    <div className="page">
      <h1>Form Elements</h1>
      <p>Practice automating various form input types</p>

      <h2>Text Inputs</h2>
      <div className="form-group">
        <label htmlFor="text-input">Text Input</label>
        <input
          type="text"
          id="text-input"
          name="text-input"
          data-testid="text-input"
          placeholder="Enter some text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        {textInput && <p>You entered: {textInput}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email-input">Email Input</label>
        <input
          type="email"
          id="email-input"
          name="email-input"
          data-testid="email-input"
          placeholder="email@example.com"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password-input">Password Input</label>
        <input
          type="password"
          id="password-input"
          name="password-input"
          data-testid="password-input"
          placeholder="Enter password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="number-input">Number Input</label>
        <input
          type="number"
          id="number-input"
          name="number-input"
          data-testid="number-input"
          placeholder="Enter a number"
          value={numberInput}
          onChange={(e) => setNumberInput(e.target.value)}
          min="0"
          max="100"
        />
      </div>

      <div className="form-group">
        <label htmlFor="tel-input">Phone Number Input</label>
        <input
          type="tel"
          id="tel-input"
          name="tel-input"
          data-testid="tel-input"
          placeholder="(123) 456-7890"
          value={telInput}
          onChange={(e) => setTelInput(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="url-input">URL Input</label>
        <input
          type="url"
          id="url-input"
          name="url-input"
          data-testid="url-input"
          placeholder="https://example.com"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="search-input">Search Input</label>
        <input
          type="search"
          id="search-input"
          name="search-input"
          data-testid="search-input"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <h2>Date & Time Inputs</h2>
      <div className="form-group">
        <label htmlFor="date-input">Date Input</label>
        <input
          type="date"
          id="date-input"
          name="date-input"
          data-testid="date-input"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
        />
        {dateInput && <p>Selected date: {dateInput}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="time-input">Time Input</label>
        <input
          type="time"
          id="time-input"
          name="time-input"
          data-testid="time-input"
          value={timeInput}
          onChange={(e) => setTimeInput(e.target.value)}
        />
      </div>

      <h2>Other Input Types</h2>
      <div className="form-group">
        <label htmlFor="color-input">Color Picker</label>
        <input
          type="color"
          id="color-input"
          name="color-input"
          data-testid="color-input"
          value={colorInput}
          onChange={(e) => setColorInput(e.target.value)}
        />
        <p>Selected color: <span style={{ color: colorInput, fontWeight: 'bold' }}>{colorInput}</span></p>
      </div>

      <div className="form-group">
        <label htmlFor="range-input">Range Slider (0-100): {rangeInput}</label>
        <input
          type="range"
          id="range-input"
          name="range-input"
          data-testid="range-input"
          min="0"
          max="100"
          value={rangeInput}
          onChange={(e) => setRangeInput(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="file-input">File Upload</label>
        <input
          type="file"
          id="file-input"
          name="file-input"
          data-testid="file-input"
          onChange={handleFileChange}
        />
        {fileInput && <p>Selected file: {fileInput.name} ({fileInput.size} bytes)</p>}
      </div>

      <h2>Textarea</h2>
      <div className="form-group">
        <label htmlFor="textarea-input">Textarea</label>
        <textarea
          id="textarea-input"
          name="textarea-input"
          data-testid="textarea-input"
          rows={5}
          placeholder="Enter multiple lines of text here..."
          value={textareaInput}
          onChange={(e) => setTextareaInput(e.target.value)}
        />
        <p>Character count: {textareaInput.length}</p>
      </div>

      <h2>Dropdowns (Select)</h2>
      <div className="form-group">
        <label htmlFor="select-input">Single Select Dropdown</label>
        <select
          id="select-input"
          name="select-input"
          data-testid="select-input"
          value={selectInput}
          onChange={(e) => setSelectInput(e.target.value)}
        >
          <option value="">-- Select an option --</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
          <option value="option4">Option 4</option>
          <option value="option5">Option 5</option>
        </select>
        {selectInput && <p>You selected: {selectInput}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="multi-select-input">Multi-Select Dropdown (Hold Ctrl/Cmd to select multiple)</label>
        <select
          id="multi-select-input"
          name="multi-select-input"
          data-testid="multi-select-input"
          multiple
          size={5}
          value={multiSelectInput}
          onChange={handleMultiSelectChange}
        >
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="cherry">Cherry</option>
          <option value="date">Date</option>
          <option value="elderberry">Elderberry</option>
        </select>
        {multiSelectInput.length > 0 && (
          <p>Selected: {multiSelectInput.join(', ')}</p>
        )}
      </div>

      <h2>Checkboxes</h2>
      <div className="form-group">
        <label>Select your interests:</label>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              id="checkbox-1"
              name="option1"
              data-testid="checkbox-1"
              checked={checkboxes.option1}
              onChange={() => handleCheckboxChange('option1')}
            />
            <span>Programming</span>
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              id="checkbox-2"
              name="option2"
              data-testid="checkbox-2"
              checked={checkboxes.option2}
              onChange={() => handleCheckboxChange('option2')}
            />
            <span>Testing</span>
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              id="checkbox-3"
              name="option3"
              data-testid="checkbox-3"
              checked={checkboxes.option3}
              onChange={() => handleCheckboxChange('option3')}
            />
            <span>Automation</span>
          </label>
        </div>
        <p>Selected: {Object.entries(checkboxes).filter(([_, v]) => v).map(([k]) => k).join(', ') || 'None'}</p>
      </div>

      <h2>Radio Buttons</h2>
      <div className="form-group">
        <label>Choose your experience level:</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              id="radio-beginner"
              name="experience"
              data-testid="radio-beginner"
              value="beginner"
              checked={radioValue === 'beginner'}
              onChange={(e) => setRadioValue(e.target.value)}
            />
            <span>Beginner</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              id="radio-intermediate"
              name="experience"
              data-testid="radio-intermediate"
              value="intermediate"
              checked={radioValue === 'intermediate'}
              onChange={(e) => setRadioValue(e.target.value)}
            />
            <span>Intermediate</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              id="radio-expert"
              name="experience"
              data-testid="radio-expert"
              value="expert"
              checked={radioValue === 'expert'}
              onChange={(e) => setRadioValue(e.target.value)}
            />
            <span>Expert</span>
          </label>
        </div>
        {radioValue && <p>You selected: {radioValue}</p>}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button
          id="submit-form-elements"
          data-testid="submit-form-elements"
          onClick={() => alert('Form values would be submitted here!')}
        >
          Submit All Values
        </button>
      </div>
      <footer style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px solid #ecf0f1', textAlign: 'center', color: '#7f8c8d' }}>
        <p>
          Created by <a href="https://github.com/hash-chandra" target="_blank" rel="noopener noreferrer" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>@hash-chandra</a>
        </p>
      </footer>
    </div>
  )
}

export default FormElements
