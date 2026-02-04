# 🎯 Automation Practice Web Application

A comprehensive web application designed specifically for learning and practicing test automation with **Playwright**, **Selenium WebDriver**, **Cypress**, and other automation frameworks.

![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Vite](https://img.shields.io/badge/Vite-7.2-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## ⚠️ **IMPORTANT: Educational Use Only**

**This is a demo application for automation testing practice only.**
- ❌ **DO NOT** enter real passwords or personal information
- ❌ **DO NOT** use this for production purposes
- ✅ Use only for learning and practicing test automation
- ✅ All authentication is mock-based (no backend)
- ✅ No data is stored on any server
- ✅ Test credentials are provided for practice purposes

**Test Credentials:**
- Username: `admin` / Password: `admin123`
- Username: `user` / Password: `user123`

## 🌟 Features

This application provides **18 comprehensive pages** with over **60+ UI elements and scenarios** to practice automation across real-world use cases including e-commerce, banking, data visualization, and error handling.

### 📝 Form Elements
- Text inputs (text, email, password, number, tel, url, search)
- Date and time pickers
- Color picker
- Range slider
- File upload
- Textareas
- Dropdowns (single and multi-select)
- Checkboxes
- Radio buttons

### 🔐 Authentication
- Login page with validation
- Registration form with multi-field validation
- Form error handling
- Success/error messages

### 🎨 Advanced Elements
- **Modals & Dialogs**: JavaScript alerts, confirms, prompts, custom modals
- **Drag & Drop**: Interactive drag and drop zones
- **Tables**: Sortable, filterable, and paginated tables with row selection
- **iFrames**: Practice switching between iframes and nested iframes
- **Shadow DOM**: Web Components with shadow DOM for advanced automation practice
- **Dynamic Content**: AJAX-like content loading with loading indicators
- **Tooltips**: Hover interactions
- **Disabled/Readonly/Hidden Elements**

### 🔄 Multi-Step Forms
- 4-step form wizard with validation at each step
- Progress indicator
- Form state persistence
- Review and confirmation step

### 🛒 E-commerce Features

Practice end-to-end e-commerce testing workflows:

- **Product Grid**: Responsive product cards with images and details
- **Shopping Cart**: Add/remove items, quantity selectors, cart total calculation
- **Star Ratings**: Interactive 5-star rating system with hover states
- **Wishlist**: Add/remove products from favorites
- **Search Autocomplete**: Dynamic search suggestions as you type
- **Breadcrumb Navigation**: Hierarchical navigation tracking
- **Quick View Modal**: Product preview without page navigation
- **Empty States**: Empty cart messaging and CTAs

**Test IDs**: `product-grid`, `cart-items`, `cart-total`, `wishlist-{id}`, `search-suggestions`, `breadcrumb`

### 🏦 Banking & Finance

Test financial application scenarios with specialized inputs:

- **Date Range Picker**: Select date ranges for statements with validation
- **Currency Input**: Formatted currency input with automatic formatting
- **OTP Input**: 6-digit one-time password with auto-focus navigation
- **Copy to Clipboard**: Account number copying with success feedback
- **File Download**: Statement download simulation with progress
- **Calculator**: EMI/loan calculator with basic mathematical operations
- **Session Timeout**: Inactivity warning and session management (10s demo)

**Test IDs**: `start-date`, `end-date`, `currency-input`, `otp-{0-5}`, `copy-account`, `download-statement`, `calc-display`

### 🎯 Interactive Components

Test complex UI interactions and dynamic behaviors:

- **Toast Notifications**: Success, error, warning, info messages with auto-dismiss
- **Tabs**: Multi-tab navigation with 4 content sections
- **Accordion**: Collapsible content panels (multiple can be open)
- **Image Carousel**: Auto-play slider with manual navigation controls and indicators
- **Tooltips**: Multi-position hover tooltips (top, right, bottom, left)
- **Animations**: Smooth CSS transitions and loading effects

**Test IDs**: `toast-container`, `toast-{type}`, `tabs-container`, `tab-{id}`, `accordion-{id}`, `carousel-slide`, `tooltip-{position}`

### 📊 Advanced Data & Visualizations

Practice data-heavy application testing:

- **Infinite Scroll**: Auto-load 100 items on scroll with Intersection Observer
- **Skeleton Loaders**: Loading placeholders during data fetch
- **Advanced Filters**: Multi-criteria filtering (category, status, value, sort)
- **Progress Bars**: Color-coded progress indicators (red/yellow/green)
- **Charts**: Bar charts for data visualization
- **Virtual Scrolling**: Efficient rendering for large datasets

**Test IDs**: `infinite-scroll-container`, `data-item-{id}`, `skeleton-loader`, `filter-panel`, `chart-container`, `progress-bar`

### ✨ Rich Content Features

Test content editing and file management workflows:

- **Rich Text Editor**: WYSIWYG editor with formatting toolbar (Bold, Italic, Underline, Headings, Lists)
- **File Upload with Preview**: Image preview before upload with file validation
- **Upload Progress**: Real-time upload progress simulation (0-100%)
- **Context Menu**: Custom right-click menus with 6 actions
- **Keyboard Shortcuts**: Cmd/Ctrl+S (Save), B (Bold), I (Italic), U (Underline)
- **Content Editable**: Direct text editing in browser with HTML output

**Test IDs**: `rich-text-editor`, `editor-toolbar`, `format-{bold|italic|underline}`, `file-input`, `upload-progress`, `context-menu-area`

### 🚨 Error & Empty States

Practice error handling and edge case scenarios:

- **404 Page Not Found**: Navigation recovery with back/home buttons
- **500 Server Error**: Internal error handling with retry functionality
- **403 Forbidden**: Access denied scenarios with request access CTA
- **Offline Detection**: Automatic network status monitoring with banner
- **Maintenance Mode**: System maintenance modal overlay
- **Empty States**: 5 scenarios (inbox, search, cart, notifications, data)
- **Network Errors**: Connection failure handling with test connection
- **Load Failures**: Content loading error with retry/report options

**Test IDs**: `error-404`, `error-500`, `error-403`, `offline-banner`, `maintenance-overlay`, `empty-{type}`, `network-error`

## 🚀 Live Demo

[**Try it now!**](https://hash-chandra.github.io/DemoWebApp/)

## 👨‍💻 Author

Created and maintained by **[@hash-chandra](https://github.com/hash-chandra)**

Contributions, issues, and feature requests are welcome!

## 💻 Running Locally

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/hash-chandra/DemoWebApp.git

# Navigate to project directory
cd DemoWebApp

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 🧪 Automation Practice

### Element Locators

Every element in this application has multiple attributes for practicing different locator strategies:

- **ID**: `id="username-input"`
- **Name**: `name="username"`
- **Class**: `class="username-field"`
- **data-testid**: `data-testid="username-input"`

### Example Test Scripts

#### Playwright

```typescript
import { test, expect } from '@playwright/test';

test('login with valid credentials', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  
  // Using data-testid
  await page.getByTestId('username-input').fill('admin');
  await page.getByTestId('password-input').fill('admin123');
  await page.getByTestId('login-button').click();
  
  // Verify success message
  await expect(page.getByTestId('success-message')).toBeVisible();
});

test('interact with shadow DOM', async ({ page }) => {
  await page.goto('http://localhost:3000/shadow-dom');
  
  // Access shadow DOM element
  const shadowHost = page.locator('#shadow-host');
  await shadowHost.locator('button#shadow-button-1').click();
});
```

#### Selenium (Java)

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class LoginTest {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost:3000/login");
        
        // Using ID
        driver.findElement(By.id("username")).sendKeys("admin");
        driver.findElement(By.id("password")).sendKeys("admin123");
        driver.findElement(By.id("login-button")).click();
        
        // Verify success message
        WebElement successMsg = driver.findElement(
            By.cssSelector("[data-testid='success-message']")
        );
        System.out.println(successMsg.isDisplayed());
        
        driver.quit();
    }
}
```

#### Selenium (Python)

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("http://localhost:3000/login")

# Using XPath
driver.find_element(By.XPATH, "//input[@id='username']").send_keys("admin")
driver.find_element(By.XPATH, "//input[@id='password']").send_keys("admin123")
driver.find_element(By.XPATH, "//button[@id='login-button']").click()

# Verify success message
success_msg = driver.find_element(By.CSS_SELECTOR, "[data-testid='success-message']")
assert success_msg.is_displayed()

driver.quit()
```

#### Cypress

```javascript
describe('Login Test', () => {
  it('should login with valid credentials', () => {
    cy.visit('http://localhost:3000/login');
    
    // Using data-testid
    cy.get('[data-testid="username-input"]').type('admin');
    cy.get('[data-testid="password-input"]').type('admin123');
    cy.get('[data-testid="login-button"]').click();
    
    // Verify success message
    cy.get('[data-testid="success-message"]').should('be.visible');
  });
});
```

## 📚 Test Scenarios to Practice

### 1. **Basic Form Interactions**
   - Fill out login form with test credentials
   - Submit registration form with validation
   - Handle form validation errors
   - Test remember me functionality

### 2. **E-commerce Workflows**
   - Browse product grid and filter by category
   - Add items to cart and update quantities
   - Use product search with autocomplete
   - Add/remove items from wishlist
   - Complete checkout process

### 3. **Banking Operations**
   - Select date ranges for statements
   - Enter and format currency values
   - Complete OTP verification flow
   - Copy account numbers to clipboard
   - Download statements with progress tracking
   - Use calculator for EMI calculations

### 4. **Table Operations**
   - Sort table columns
   - Filter table data
   - Select rows
   - Navigate pagination

### 5. **Alert & Dialog Handling**
   - Accept/dismiss JavaScript alerts
   - Handle confirms and prompts
   - Interact with custom modals
   - Test toast notifications

### 6. **Drag and Drop**
   - Drag items between containers
   - Verify dropped elements
   - Test drag handles

### 7. **iFrame Switching**
   - Switch to iframe
   - Interact with iframe content
   - Handle nested iframes

### 8. **Shadow DOM**
   - Access elements inside shadow root
   - Click shadow DOM buttons
   - Fill shadow DOM forms

### 9. **Dynamic Content**
   - Wait for dynamic content to load
   - Handle infinite scroll
   - Test skeleton loaders
   - Verify AJAX responses

### 10. **Interactive Components**
   - Navigate between tabs
   - Expand/collapse accordions
   - Control image carousel
   - Trigger toast notifications
   - Test tooltip positioning

### 11. **Rich Content Editing**
   - Format text with toolbar buttons
   - Upload files with preview
   - Monitor upload progress
   - Use keyboard shortcuts
   - Test context menus

### 12. **Error Handling**
   - Navigate error pages (404, 500, 403)
   - Test offline detection
   - Handle network errors
   - Verify empty states
   - Test maintenance mode

### 13. **Multi-Step Forms**
   - Navigate through form steps
   - Validate each step
   - Submit complete form
   - Test form state persistence

### 14. **Data Visualization**
   - Test advanced filters
   - Sort and filter large datasets
   - Verify chart data
   - Test progress indicators

## 🛠️ Technology Stack

- **Frontend**: React 19.2 with TypeScript
- **Build Tool**: Vite 7.2
- **Routing**: React Router v7
- **Styling**: Plain CSS (no external dependencies)
- **Deployment**: GitHub Pages
- **License**: MIT (100% Free & Open Source)

## 📖 XPath & CSS Selector Examples

### XPath Examples

```xpath
// By ID
//input[@id='username']
//button[@id='login-button']

// By data-testid
//input[@data-testid='username-input']
//button[@data-testid='login-button']

// By text content
//button[text()='Submit']
//h1[contains(text(), 'Login')]

// By class
//div[@class='form-group']
//input[contains(@class, 'username-field')]

// By placeholder
//input[@placeholder='Enter your username']

// Parent-child relationships
//form[@id='login-form']//input[@name='username']
//div[@class='page']//button[1]
```

### CSS Selector Examples

```css
/* By ID */
#username
#login-button

/* By data-testid */
[data-testid="username-input"]
[data-testid="login-button"]

/* By class */
.username-field
.form-group

/* By attribute */
input[name="username"]
button[type="submit"]

/* Combinators */
form#login-form input[name="username"]
.page > button:first-child
```

## 🤝 Contributing

Contributions are welcome! If you'd like to add more test scenarios or improve existing ones:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-scenario`)
3. Commit your changes (`git commit -am 'Add new scenario'`)
4. Push to the branch (`git push origin feature/new-scenario`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎓 Learning Resources

- [Playwright Documentation](https://playwright.dev/)
- [Selenium WebDriver Documentation](https://www.selenium.dev/documentation/)
- [Cypress Documentation](https://docs.cypress.io/)
- [XPath Tutorial](https://www.w3schools.com/xml/xpath_intro.asp)
- [CSS Selectors Reference](https://www.w3schools.com/cssref/css_selectors.php)

## 📞 Support

If you find this project helpful, please ⭐ star the repository!

For questions or issues, please [open an issue](https://github.com/hash-chandra/DemoWebApp/issues).

---

**Happy Testing! 🎉**
