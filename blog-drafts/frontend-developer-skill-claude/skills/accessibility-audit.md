---
name: accessibility-audit
description: Comprehensive WCAG 2.2 AA accessibility audit for web components. Checks all success criteria including new 2026 requirements like focus management (2.4.11), target sizes (2.5.8), accessible authentication (3.3.8), and dragging alternatives (2.5.7). Use when accessibility review is requested, for production-ready components, or when compliance verification is needed.
---

# WCAG 2.2 AA Accessibility Audit

## Audit Process

This audit systematically checks compliance with WCAG 2.2 Level AA success criteria, with emphasis on the 9 new criteria added in 2023.

### Priority Levels
- **CRITICAL** = Must fix (breaks accessibility for users)
- **IMPORTANT** = Should fix (significantly impacts UX for users with disabilities)
- **RECOMMENDED** = Nice to have (improves overall accessibility)

---

## WCAG 2.2 New Success Criteria (2023+)

### 2.4.11 Focus Not Obscured (Minimum) - Level AA ⭐ NEW

**Requirement:** When a UI component receives keyboard focus, it is not entirely hidden by author-created content.

**Common Issues:**
```jsx
// ❌ FAIL - Sticky header hides focused element
<header style={{position: 'sticky', top: 0, zIndex: 100}}>
  {/* Header content */}
</header>
<main>
  <button>Clickable</button> {/* May be obscured when focused */}
</main>

// ✅ PASS - Ensure focus scrolls into view with offset
const handleFocus = (e) => {
  e.target.scrollIntoView({
    behavior: 'smooth',
    block: 'center' // Ensures element not hidden by sticky elements
  });
};
```

**What to Check:**
- Sticky headers/footers don't cover focused elements
- Modals/popups don't obscure keyboard focus
- Fixed position elements account for focus visibility
- Scroll behavior keeps focused element visible

### 2.4.12 Focus Not Obscured (Enhanced) - Level AAA

**Requirement:** No part of the focused component is hidden by author-created content.

(This is an enhanced version of 2.4.11 - note for AAA compliance)

### 2.5.7 Dragging Movements - Level AA ⭐ NEW

**Requirement:** All functionality that uses a dragging movement has a single-pointer alternative.

**Common Patterns:**
```jsx
// ❌ FAIL - Drag-only reordering
<DraggableList items={items} onReorder={handleReorder} />

// ✅ PASS - Provides keyboard alternative
<List>
  {items.map((item, index) => (
    <ListItem key={item.id}>
      {item.name}
      <button onClick={() => moveUp(index)} aria-label="Move up">↑</button>
      <button onClick={() => moveDown(index)} aria-label="Move down">↓</button>
      {/* Drag handle still available but not required */}
      <DragHandle />
    </ListItem>
  ))}
</List>
```

**What to Check:**
- Drag-to-reorder has up/down buttons
- Drag-to-resize has input fields for dimensions
- Drag-to-draw has alternative input methods
- Sliders have keyboard controls (already required by other criteria)

**Exceptions:** When dragging is essential (e.g., freehand drawing app signature)

### 2.5.8 Target Size (Minimum) - Level AA ⭐ NEW

**Requirement:** Interactive targets are at least 24×24 CSS pixels, with exceptions.

**Measurement:**
```jsx
// ❌ FAIL - Too small
<button style={{width: '16px', height: '16px'}}>×</button>

// ✅ PASS - Meets minimum
<button style={{width: '24px', height: '24px'}}>×</button>

// ✅ PASS - Adequate spacing counts toward target
<button style={{width: '16px',  height: '16px', padding: '8px'}}>×</button>
// 16 + 8 + 8 = 32px total = PASS
```

**Exceptions (these don't need to meet 24×24):**
- Inline links within a paragraph of text
- User agent default sizing (browser controls)
- Essential representation (e.g., map pins at scale)

**Common Issues:**
- Icon buttons without sufficient padding
- Mobile hamburger menu icons
- Close buttons (×) on modals
- Social media icon links
- Tag/chip dismiss buttons

### 3.2.6 Consistent Help - Level A ⭐ NEW

**Requirement:** If help is available on multiple pages, it appears in the same relative order.

**What to Check:**
- Help link in same location across pages (e.g., always top-right nav)
- Chat widget button in consistent position
- Support contact info in same spot in footer
- Doesn't require identical HTML structure, just relative order

### 3.3.7 Redundant Entry - Level A ⭐ NEW

**Requirement:** Information previously entered by the user is either auto-populated or available to select.

**Common Patterns:**
```jsx
// ❌ FAIL - Makes user re-enter shipping address for billing
<CheckoutForm>
  <ShippingAddress />
  <BillingAddress /> {/* Forces re-entry of same info */}
</CheckoutForm>

// ✅ PASS - Offers to copy shipping to billing
<CheckoutForm>
  <ShippingAddress onChange={setShipping} />
  <label>
    <input
      type="checkbox"
      checked={sameAsShipping}
      onChange={(e) => {
        if (e.target.checked) setBilling(shipping);
        setSameAsShipping(e.target.checked);
      }}
    />
    Billing address same as shipping
  </label>
  {!sameAsShipping && <BillingAddress />}
</CheckoutForm>
```

**What to Check:**
- Multi-step forms remember previous stepsinformation
- "Same as..." checkboxes for repeated info
- Auto-fill from previous sessions (with user permission)
- Don't require re-entering after server-side validation errors

**Exceptions:** When re-entry is essential (e.g., password confirmation, security verification)

### 3.3.8 Accessible Authentication (Minimum) - Level AA ⭐ NEW

**Requirement:** Cognitive function test is not required for authentication unless alternative is provided.

**Cognitive Function Tests to Avoid:**
- Remembering passwords or usernames (without password manager support)
- Solving puzzles
- Recalling information from previous session
- Transcribing characters

**Acceptable Alternatives:**
```jsx
// ❌ FAIL - Only password option, no alternatives
<LoginForm>
  <input type="text" placeholder="Username" />
  <input type="password" placeholder="Password" />
  <button>Login</button>
</LoginForm>

// ✅ PASS - Provides alternatives
<LoginForm>
  {/* Option 1: Password manager support */}
  <input type="text" placeholder="Username" autocomplete="username" />
  <input type="password" placeholder="Password" autocomplete="current-password" />
  
  {/* Option 2: Email magic link */}
  <button onClick={sendMagicLink}>Email me a sign-in link</button>
  
  {/* Option 3: OAuth (no password needed) */}
  <button onClick={signInWithGoogle}>Continue with Google</button>
  
  {/* Option 4: Biometric (Face ID, fingerprint) */}
  <button onClick={signInWithBiometric}>Use biometric sign-in</button>
</LoginForm>
```

**What to Check:**
- `autocomplete` attributes present for username/password fields
- Alternative auth methods offered (magic links, OAuth, biometric)
- Password managers can detect and fill fields
- 2FA doesn't rely solely on remembering codes (allow paste, use auth apps)

### 3.3.9 Accessible Authentication (Enhanced) - Level AAA

**Requirement:** No cognitive function test for authentication (stricter than 3.3.8).

(This is an enhanced version - note for AAA compliance)

---

## WCAG 2.1 & 2.0 Core Criteria

### Perceivable

#### 1.1.1 Non-text Content - Level A

**Text Alternatives:**
```jsx
// ❌ Missing alt
<img src="chart.png" />

// ✅ Descriptive alt
<img src="chart.png" alt="Bar chart showing 40% increase in sales from Q1 to Q2 2026" />

// ✅ Decorative image
<img src="decoration.png" alt="" />

// ✅ Complex image with longdesc
<img src="complex-diagram.png" alt="System architecture diagram" aria-describedby="diagram-description" />
<div id="diagram-description">
  Detailed description: The system consists of three layers...
</div>
```

 #### 1.3.1 Info and Relationships - Level A

**Semantic HTML:**
```jsx
// ❌ Generic divs
<div className="header">Page Title</div>
<div className="nav">
  <div onClick={goTo}>Home</div>
</div>

// ✅ Semantic elements
<h1>Page Title</h1>
<nav>
  <a href="/">Home</a>
</nav>
```

#### 1.4.3 Contrast (Minimum) - Level AA

**Requirements:**
- Text: 4.5:1 contrast ratio
- Large text (18pt+ or 14pt+ bold): 3:1 ratio
- UI components: 3:1 contrast ratio

**Tools to Check:**
- Browser DevTools contrast checker
- WebAIM Contrast Checker
- Built-in: Chrome DevTools > Elements > Styles > Color picker

**Common Issues:**
- Light gray text on white background
- White text on light blue background
- Disabled button contrast (exempt, but good UX to maintain)

### Operable

#### 2.1.1 Keyboard - Level A

**Full Keyboard Access:**
```jsx
// ❌ FAIL - Mouse-only interaction
<div onClick={handleClick}>Click me</div>

// ✅ PASS - Keyboard accessible
<button onClick={handleClick}>Click me</button>
// OR if div is necessary:
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Click me
</div>
```

**What to Test:**
- Tab through all interactive elements
- Enter/Space activates buttons and links
- Arrow keys navigate select/radio/checkbox groups
- Escape closes modals/menus
- No keyboard traps (can Tab out of all elements)

#### 2.4.7 Focus Visible - Level AA

**Visible Focus Indicators:**
```css
/* ❌ FAIL - Removes focus outline */
button:focus {
  outline: none;
}

/* ✅ PASS - Custom visible focus */
button:focus-visible{
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
```

#### 2.5.2 Pointer Cancellation - Level A

**Down-Event Behavior:**
```jsx
// ❌ Action on mousedown (hard to cancel)
<button onMouseDown={deleteItem}>Delete</button>

// ✅ Action on click/mouseup (can cancel by moving pointer away)
<button onClick={deleteItem}>Delete</button>
```

### Understandable

#### 3.1.1  Language of Page - Level A

```html
<!-- ✅ Specify language -->
<html lang="en">
```

#### 3.2.1 On Focus - Level A

**No unexpected context changes on focus:**
```jsx
// ❌ FAIL - Focus triggers form submission
<input
  onFocus={() => submitForm()} // Unexpected!
/>

// ✅ PASS - Requires explicit user action
<input />
<button onClick={submitForm}>Submit</button>
```

#### 3.3.1 Error Identification - Level A

**Clear Error Messages:**
```jsx
// ❌ Generic error
 <span className="error">Invalid input</span>

// ✅ Specific, actionable error
<span className="error" role="alert">
  Email address must include an @ symbol
</span>
```

#### 3.3.2 Labels or Instructions - Level A

```jsx
// ❌ No label
<input type="email" placeholder="Email" />

// ✅ Proper label
<label htmlFor="email">Email address:</label>
<input id="email" type="email" />
```

### Robust

#### 4.1.2 Name, Role, Value - Level A

**ARIA for Custom Controls:**
```jsx
// ❌ Custom control without ARIA
<div onClick={toggle}>Toggle</div>

// ✅ Proper ARIA
<button
  role="switch"
  aria-checked={isOn}
  onClick={toggle}
>
  {isOn ? 'On' : 'Off'}
</button>
```

---

## Component-Specific Audits

### Forms

**Complete Checklist:**
- [ ] All form inputs have associated labels
- [ ] Labels use `<label htmlFor="id">` or wrap inputs
- [ ] Required fields indicated (visually + aria-required="true")
- [ ] Error messages associated with fields (aria-describedby)
- [ ] Errors announced to screen readers (role="alert")
- [ ] Field-level help text provided when needed
- [ ] Form groups use `<fieldset>` and `<legend>`
- [ ] Autocomplete attributes set appropriately

### Modals/Dialogs

**Complete Checklist:**
- [ ] Focus moves to modal on open
- [ ] Focus trapped within modal while open
- [ ] Escape key closes modal
- [ ] Close button has accessible label
- [ ] Focus returns to trigger element on close
- [ ] Modal uses `role="dialog"` or `role="alertdialog"`
- [ ] Modal has accessible name (aria-labelledby)
- [ ] Background content inert (aria-hidden="true")
- [ ] Target size for close button ≥ 24×24px (WCAG 2.2)

### Navigation

**Complete Checklist:**
- [ ] Wrapped in `<nav>` landmark
- [ ] Current page indicated (aria-current="page")
- [ ] Keyboard accessible (Tab, Enter)
- [ ] Skip link provided ("Skip to main content")
- [ ] Hamburger/mobile menu has accessible label
- [ ] Submenu toggle buttons labeled correctly

---

## Automated Testing Recommendations

While this audit provides   manual review, recommend automated tools:

**Browser Extensions:**
- axe DevTools (free, comprehensive)
- WAVE (visual feedback)
- Lighthouse (built into Chrome DevTools)

**Testing Libraries:**
- jest-axe (for Jest unit tests)
- @testing-library/react (encourages accessible queries)
- Playwright accessibility snapshots

**CI/CD Integration:**
- axe-core (npm package for automated checks)
- pa11y (command-line tool)

---

## Output Format

**🔴 Critical Accessibility Issues:**
- List WCAG violations that must be fixed
- Include criterion number (e.g., "2.5.8 Target Size")
- Explain impact: "Screen reader users cannot..."

**🟡 Important Improvements:**
- List items that significantly improve accessibility
- May not strictly violate WCAG but help users

**✅ Accessibility Strengths:**
- Highlight what's done well
- Recognize good practices

**📋 Compliance Summary:**
- WCAG 2.2 AA: PASS / FAIL (+ list of failing criteria)
- Percentage of criteria met
- Recommended next steps

---

## Additional Resources

- <a href="https://www.w3.org/WAI/WCAG22/quickref/" target="_blank" rel="noopener">WCAG 2.2 Quick Reference</a>
- <a href="https://www.w3.org/WAI/WCAG22/Understanding/" target="_blank" rel="noopener">Understanding WCAG 2.2</a>
- <a href="https://www.deque.com/axe/" target="_blank" rel="noopener">axe DevTools</a>
