---
title: "Build Front-end Developer Skills for Claude: Production-Ready Tutorial (2026)"
description: "Create a modular Claude Agent Skills system for front-end development. Three focused Skills covering code review, WCAG 2.2 accessibility, and React 19 patterns. Complete, copy-ready files based on production best practices."
pubDate: 2026-01-14
updatedDate: 2026-01-15
heroImage: "/images/featured/frontend-developer-skill-claude.webp"
category: "ai-agents"
tags: ["Claude Skills", "Front-end Development", "React", "TypeScript", "Accessibility", "Code Review", "Tutorial", "WCAG 2.2"]
author: "Raj Praharaj"
readTime: "25 min read"
---

I'll be honest—my first attempt at getting Claude to review front-end code was... messy. I'd paste in a React component, ask for feedback, and get back generic advice that missed half the important stuff. No accessibility checks, no bundle size warnings, nothing about whether my responsive breakpoints made sense.

Then I built a dedicated Front-end Developer Skill. But here's where it gets interesting: after researching how <a href="https://github.com/anthropics/skills" target="_blank" rel="noopener">Anthropic and the community</a> actually use Skills in production, I discovered that one monolithic Skill isn't the best approach.

**The breakthrough: Three focused Skills work better than one catch-all Skill.**

This tutorial gives you the exact 3-skill system I use daily. Each Skill file is complete and ready to copy—just paste into your `.claude/skills/` folder and you're set.

## Why Three Skills Beat One

When I first created a single "frontend-developer" Skill, it was 600+ lines covering everything: React patterns, accessibility, performance, TypeScript, security, responsive design, modern CSS features. Comprehensive? Yes. Efficient? Not really.

**Issues I hit:**
- Claude would load the entire Skill even for quick reviews
- Updating accessibility rules meant touching React-specific code
- The description was too broad ("reviews front-end code") so triggering was inconsistent
- Over 500 lines violated Anthropic's performance recommendations

### The Modular Solution

After researching production examples, I restructured into three focused Skills:

| Skill | Lines | Purpose | When It Triggers |
|-------|-------|---------|------------------|
| **frontend-review** | ~260 | Core systematic review | "Review this component" |
| **accessibility-audit** | ~490 | WCAG 2.2 AA compliance | "Check accessibility" |
| **react-patterns-2026** | ~740 | React 19 & Next.js 15 | "Is this React 19 compliant?" |

**Benefits I immediately saw:**
- ✅ Better token efficiency—smaller Skills load faster
- ✅ **frontend-review** handles 80% of my requests
- ✅ Specialized Skills load only when I need deep audits
- ✅ Updates are isolated—fix WCAG criteria without touching React code
- ✅ Better triggering—specific descriptions match user intent

For more on how Claude Skills work architecturally, check out the [Claude Agent Skills guide](/blog/claude-agent-skills-guide).

## The Three Skills (Complete, Copy-Ready)

Below are the complete Skill files. Copy each one into your `.claude/skills/` folder.

### Skill 1: frontend-review.md

**Purpose:** Your everyday code reviewer. Systematic checks across structure, TypeScript, accessibility basics, performance, and security.

**When to use:**
- Pull request reviews
- Quick component checks
- General "review this code" requests
- Standardizing review quality across team

**The complete file (copy this):**

`````markdown
---
name: frontend-review
description: Systematic front-end code review for React/Vue components. Checks component structure, TypeScript basics, common accessibility issues, performance patterns, and security. Use for general code review, pull request review, or when user asks to review web UI code.
---

# Front-end Code Review

## Review Process

When reviewing front-end code, follow this systematic 5-step approach:

### 1. Component Structure & Architecture

**Single Responsibility Principle:**
- Does this component do one thing well?
- Is it focused or trying to handle multiple concerns?
- Could it be split into smaller, more focused components?

**Component Size:**
- ❌ Components over 300 lines are red flags
- ✅ Keep components under 200 lines when possible
- Exception: Complex forms or tables may be larger if well-organized

**Props Drilling:**
- Count levels: Parent → Child → Grandchild → Great-grandchild
- ❌ More than 2-3 levels = suggest Context or state management
- ✅ Recommend React Context, Zustand, or composition patterns

**State Management:**
- Local UI state → useState
- Derived state → useMemo (or let React Compiler handle)
- Server state → React Query / SWR
- Global app state → Context or Zustand
- ❌ Avoid: State in presentational components

### 2. TypeScript Quality

**Type Safety Issues:**
```typescript
// ❌ BAD
const handleClick = (e: any) => { }
const props: any = { }
function Component(props) { } // No types

// ✅ GOOD
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { }
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}
const Component: React.FC<ButtonProps> = (props) => { }
```

**Use `satisfies` for validation (TypeScript 4.9+):**
```typescript
// ❌ Type annotation widens the type
const config: Record<string, string> = {
  apiUrl: "https://api.example.com",
  timeout: "5000"
};

// ✅ satisfies validates without widening
const config = {
  apiUrl: "https://api.example.com",
  timeout: "5000"
} satisfies Record<string, string>;
// config.apiUrl is still literal type, not just 'string'
```

**Common TypeScript Checks:**
- Avoiding `any` - suggest proper types
- Using `unknown` over `any` for truly generic cases
- Proper interface/type usage for props and state
- Explicit return types for functions (aids readability)
- Discriminated unions for complex state

### 3. Accessibility Quick Checks

**Semantic HTML:**
```jsx
// ❌ BAD - Not accessible
<div onClick={handleClick}>Submit</div>

// ✅ GOOD - Semantic and accessible
<button onClick={handleClick}>Submit</button>
```

**Form Labels:**
```jsx
// ❌ BAD - Label not associated
<label>Email</label>
<input type="email" />

// ✅ GOOD - Properly associated
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

**Images:**
```jsx
// ❌ BAD - No alt text
<img src="logo.png" />

// ✅ GOOD - Descriptive alt
<img src="logo.png" alt="Company logo" />
// OR for decorative images:
<img src="decoration.png" alt="" />
```

**Basic Keyboard Navigation:**
- Can user tab to all interactive elements?
- Does Tab order make logical sense?
- Can user activate with Enter/Space?

**When to escalate:**
If component is accessibility-critical (forms, navigation, modals), recommend:
> "For comprehensive WCAG 2.2 AA compliance, run the `accessibility-audit` skill"

### 4. Performance Patterns

**Re-render Detection:**
```jsx
// ❌ Creates new function every render
<Child onClick={() => handleClick(id)} />

// ✅ Memoized (Note: React 19 Compiler may handle this automatically)
const handleChildClick = useCallback(() => handleClick(id), [id]);
<Child onClick={handleChildClick} />
```

**Expensive Calculations:**
```jsx
// ❌ Recalculates every render
const sortedItems = items.sort((a, b) => a.name.localeCompare(b.name));

// ✅ Memoized
const sortedItems = useMemo(
  () => items.sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);
```

**Bundle Size Awareness:**
- ❌ `import moment from 'moment'` → 72KB
- ✅ `import { format } from 'date-fns'` → 2.9KB
- ❌ `import _ from 'lodash'` → Full library
- ✅ `import get from 'lodash/get'` → Tree-shakeable

**Large Lists:**
- Lists with 100+ items → Recommend virtualization (react-window, react-virtual)
- Images in lists → Recommend lazy loading

**Code Splitting Opportunities:**
- Heavy components (charts, editors) → Recommend dynamic imports
- Route-level splitting → Already handled by Next.js/Remix

**When to escalate:**
If performance is critical or component shows performance issues:
> "For React 19-specific optimization patterns, run the `react-patterns-2026` skill"

### 5. Security Quick Checks

**XSS Prevention:**
```jsx
// ❌ CRITICAL - XSS vulnerability
<div dangerouslySetInnerHTML={{__html: userInput}} />

// ✅ GOOD - Sanitized
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(userInput)}} />

// ✅ BETTER - Avoid HTML if possible
<div>{userInput}</div>
```

**Input Validation:**
- User input displayed? → Check for sanitization
- Form submissions? → Check validation (client + server)
- URL parameters used? → Check for validation and encoding

**External Links:**
```jsx
// ❌ Security risk
<a href="https://example.com">Link</a>

// ✅ Secure
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Link
</a>
```

**Authentication/Sensitive Data:**
- ❌ Storing tokens in localStorage (vulnerable to XSS)
- ✅ Using HttpOnly cookies for auth tokens
- ❌ Exposing API keys in client code
- ✅ Using environment variables and server-side APIs

## Output Format

Structure your review as follows:

**✅ Strengths:**
- List what's done well
- Highlight good patterns used
- Recognize thoughtful implementation

**🔴 Critical Issues:**
- Accessibility violations (must fix)
- Security vulnerabilities (must fix)
- Major performance problems (must fix)
- Type safety issues causing bugs (must fix)

**🟡 Improvements:**
- TypeScript type improvements
- Performance optimizations
- Better component patterns
- Refactoring opportunities

**📚 Recommendations:**
- Suggest running specialized skills if needed:
  - `accessibility-audit` for WCAG compliance
  - `react-patterns-2026` for modern React patterns
- Link to relevant documentation
- Suggest learning resources if patterns are outdated

## Component-Specific Patterns

### Forms
- Controlled vs uncontrolled (prefer controlled for validation)
- Error handling and display
- Validation (client + server, never trust client alone)
- Accessibility (labels, error announcements, field descriptions)

### Modals/Dialogs
- Focus trap implemented?
- Escape key closes modal?
- Focus returns to trigger on close?
- ARIA dialog role present?
- Backdrop click behavior (especially with unsaved changes)

### Lists/Tables
- Using stable keys (IDs, not array index)?
- Loading states shown?
- Empty states handled?
- Sorting/filtering accessible?
- Virtualization for long lists (100+)?

## Modern Standards Reference (2026)

Be aware of current standards when reviewing:
- React 19 (concurrent features, automatic batching)
- TypeScript 5+ (satisfies operator, const type parameters)
- WCAG 2.2 AA (new criteria for focus, target sizes, auth)
- Modern CSS (container queries, :has(), nesting)
- Web APIs (View Transitions, Popover API)

For deep dives into modern patterns, recommend the specialized skills.
`````

---

### Skill 2: accessibility-audit.md

**Purpose:** Comprehensive <a href="https://www.w3.org/WAI/WCAG22/quickref/" target="_blank" rel="noopener">WCAG 2.2</a> Level AA compliance audit. This is your accessibility expert.

**When to use:**
- Production-ready component audits
- Accessibility-critical features (forms, auth, navigation)
- Compliance verification
- When `frontend-review` flags accessibility concerns

**Key coverage:**
- All 9 new WCAG 2.2 criteria (2023)
- Target size requirements (24×24px minimum)
- Accessible authentication (password manager support, magic links)
- Focus management and visibility
- Component-specific checklists

**The complete file (copy this):**

`````markdown
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
`````

---

### Skill 3: react-patterns-2026.md

**Purpose:** React 19, Next.js 15, and 2026 web platform best practices. Your modernization specialist.

**When to use:**
- Modernizing legacy React code
- React 19 migration reviews
- Next.js App Router patterns
- When `frontend-review` suggests modern alternatives

**Key coverage:**
- React Compiler (automatic memoization)
- Server vs Client Components
- Actions pattern (useActionState, useOptimistic, useFormStatus)
- Modern hooks (use())
- 2026 Web Platform (View Transitions, Popover API, Container Queries, CSS :has())
- Core Web Vitals optimization

**The complete file (copy this):**

`````markdown
---
name: react-patterns-2026
description: Modern React 19 and Next.js 15 best practices for 2026. Checks Server Components usage, React Compiler optimization, Actions pattern, modern hooks (use, useOptimistic, useActionState), proper directive placement, and 2026 web platform features. Use when reviewing React code for latest patterns, modernization, or framework-specific optimization.
---

# React 19 & Modern Web Patterns (2026)

## Review Process

Check code against current React 19 and 2026 web platform best practices.

---

## React 19 Compiler

### Automatic Memoization

**The React Compiler automatically memoizes components and values**—you no longer need manual optimization in most cases.

**Remove These (Unless Profiling Shows Specific Need):**
```jsx
// ❌ OLD - Manual memoization (React 18 pattern)
const MemoizedComponent = React.memo(ExpensiveComponent);

const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// ✅ NEW - Let compiler handle it (React 19)
const ExpensiveComponent = ({ data }) => {
  const value = computeExpensiveValue(data.a, data.b); // Auto-memoized
  const handleClick = () => doSomething(data.a, data.b); // Auto-memoized
  return <div>{value}</div>;
};
```

**When Manual Memo IS Still Needed:**
- Profiling shows specific performance bottleneck
- Comparing complex objects that compiler can't infer stability for
- Third-party libraries that haven't adopted compiler patterns

**Compiler Requirements:**
- Small, focused components (compiler works best on < 200 lines)
- Pure functions with no side effects in render
- Stable references for props when possible

---

## Server vs Client Components

### Server Components (Default in Next.js App Router)

**Server Components run on the server and don't ship JavaScript to the client.**

```jsx
// ✅ Server Component (no directive = server by default in App Router)
async function ProductList() {
  // Can directly access database, file system, env variables
  const products = await db.products.findMany();
  const apiKey = process.env.SECRET_API_KEY; // Safe on server
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**Server Component Benefits:**
- Direct database/API access
- Zero client JavaScript for static content
- Automatic code splitting
- Better SEO (HTML rendered on server)
- Secure (sensitive data/logic stays server-side)

**Server Component Limitations:**
- ❌ No useState, useEffect, or otheHooks
- ❌ No browser APIs (window, localStorage, etc.)
- ❌ No event handlers (onClick, onChange, etc.)
- ❌ No Context providers/consumers

### Client Components (Explicit)

**Client Components run in the browser and can use hooks, state, and events.**

```jsx
'use client'; // ✅ Explicit directive at top of file

import { useState } from 'react';

function InteractiveButton() {
  const [count, setCount] = useState(0); // ✅ Hooks work
  
  return (
    <button onClick={() => setCount(count + 1)}> {/* ✅ Events work */}
      Clicked {count} times
    </button>
  );
}
```

**When to Use 'use client':**
- Component uses React hooks (useState, useEffect, useContext, etc.)
- Needs event handlers (onClick, onSubmit, onChange, etc.)
- Uses browser APIs (window, document, localStorage, etc.)
- Needs to create Context providers
- Third-party libraries that require client-side rendering

**Best Practices:**
- Keep 'use client' boundary as low as possible in tree
- Extract only interactive parts into Client Components
- Pass server-fetched data as props to Client Components

**Boundary Example:**
```jsx
// ❌ BAD - Entire page is client just for one button
'use client';

async function ProductPage() {
  const [liked, setLiked] = useState(false);
  const product = await fetchProduct(); // CAN'T do async in client component!
  
  return (
    <div>
      <h1>{product.name}</h1>
      <button onClick={() => setLiked(!liked)}>
        {liked ? '❤️' : '🤍'}
      </button>
    </div>
  );
}

// ✅ GOOD - Server Component wraps Client Component
async function ProductPage() {
  const product = await fetchProduct(); // ✅ Server-side fetch
  
  return (
    <div>
      <h1>{product.name}</h1>
      <LikeButton productId={product.id} /> {/* ✅ Client only for interaction */}
    </div>
  );
}

// In separate file:
'use client';
function LikeButton({ productId }) {
  const [liked, setLiked] = useState(false);
  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? '❤️' : '🤍'}
    </button>
  );
}
```

---

## Actions Pattern

### Server Actions (Replaces Manual Form Handling)

**Actions simplify data mutations and automatically handle pending states.**

```jsx
// ✅ Server Action (in Server Component file or separate file with 'use server')
'use server';

async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  
  // Validate
  if (!title || !content) {
    return { error: 'Title and content required' };
  }
  
  // Mutate database
  const post = await db.post.create({
    data: { title, content, authorId: getServerSession().userId }
  });
  
  // Revalidate cache
  revalidatePath('/posts');
  
  // Redirect
  redirect(`/posts/${post.id}`);
}

// In component:
function CreatePostForm() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Title" />
      <textarea name="content" placeholder="Content" />
      <button type="submit">Create Post</button>
    </form>
  );
}
```

**Actions Automatically:**
- Handle pending states (no manual loading state management)
- Work with progressive enhancement (form works without JS)
- Integrate with Suspense boundaries
- Handle errors and re-throws to Error Boundaries

### useActionState Hook

**For client-side state from Server Actions:**

```jsx
'use client';

import { useActionState } from 'react';

function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, null);
  
  return (
    <form action={formAction}>
      <input name="email" type="email" />
      <textarea name="message" />
      
      {state?.error && <span className="error">{state.error}</span>}
      {state?.success && <span className="success">Message sent!</span>}
      
      <button type="submit" disabled={isPending}>
        {isPending ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

### useOptimistic Hook

**For optimistic UI updates:**

```jsx
'use client';

import { useOptimistic } from 'react';

function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [... state, { ...newTodo, pending: true }]
  );
  
  async function addTodo(formData) {
    const text = formData.get('text');
    
    // Show optimistically
    addOptimisticTodo({ id: Date.now(), text });
    
    // Actually create
    await createTodo(text);
  }
  
  return (
    <div>
      <form action={addTodo}>
        <input name="text" />
        <button>Add</button>
      </form>
      <ul>
        {optimisticTodos.map(todo => (
          <li key={todo.id} style={{ opacity: todo.pending ? 0.5 : 1 }}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### useFormStatus Hook

**For form submission state in child components:**

```jsx
'use client';

import { useFormStatus } from 'react-dom';

function  SubmitButton() {
  const { pending, data, method } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

// Used in form:
function MyForm() {
  return (
    <form action={serverAction}>
      <input name="name" />
      <SubmitButton /> {/* Automatically knows form state */}
    </form>
  );
}
```

---

## Modern Hooks

### use() Hook

**Read Promises or Context without useEffect:**

```jsx
// ❌ OLD - Using useEffect for promises
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  if (!user) return <Loading />;
  return <div>{user.name}</div>;
}

// ✅ NEW - Using use() hook
import { use } from 'react';

function UserProfile({ userPromise }) {
  const user = use(userPromise); // Suspends until promise resolves
  return <div>{user.name}</div>;
}

// Wrap with Suspense:
function Page() {
  const userPromise = fetchUser(userId);
  
  return (
    <Suspense fallback={<Loading />}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}
```

**use() with Context:**
```jsx
import { use } from 'react';

function Component() {
  const theme = use(ThemeContext); // Alternative to useContext
  return <div className={theme}>Content</div>;
}
```

---

## Next.js 15 App Router Patterns

### Data Fetching

```jsx
// ✅ Server Component - fetch in component
async function PostPage({ params }) {
  const post = await db.post.findUnique({
    where: { id: params.id }
  });
  
  return <article>{post.content}</article>;
}

// ✅ Parallel data fetching
async function Dashboard() {
  const [user, posts, analytics] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchAnalytics()
  ]);
  
  return <DashboardLayout user={user} posts={posts} analytics={analytics} />;
}
```

### Streaming with Suspense

```jsx
async function Page() {
  return (
    <div>
      <Header /> {/* Renders immediately */}
      
      <Suspense fallback={<Skeleton />}>
        <SlowComponent /> {/* Streams in when ready */}
      </Suspense>
      
      <Suspense fallback={<Skeleton />}>
        <AnotherSlowComponent /> {/* Streams independently */}
      </Suspense>
    </div>
  );
}
```

### Metadata API

```jsx
// ✅ Static metadata
export const metadata = {
  title: 'My Page',
  description: 'Page description',
  openGraph: {
    title: 'My Page',
    description: 'Page description',
    images: ['/og-image.png'],
  },
};

// ✅ Dynamic metadata
export async function generateMetadata({ params }) {
  const product = await fetchProduct(params.id);
  
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  };
}
```

### Image Optimization

```jsx
import Image from 'next/image';

// ✅ Automatic optimization
<Image
  src="/product.jpg"
  alt="Product photo"
  width={800}
  height={600}
  priority={aboveFold} // LCP optimization
  placeholder="blur" // Better loading UX
  blurDataURL={lowResImage}
/>
```

---

## 2026 Web Platform Features

### View Transitions API

```jsx
'use client';

function NavigationLink({ href, children }) {
  const router = useRouter();
  
  const handleClick = (e) => {
    e.preventDefault();
    
    // ✅ Smooth page transitions
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        router.push(href);
      });
    } else {
      router.push(href);
    }
  };
  
  return <a href={href} onClick={handleClick}>{children}</a>;
}
```

**CSS for transitions:**
```css
/* Define transition behavior */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.3s;
}
```

### Popover API

```jsx
// ✅ Native popover (no JavaScript required for basic functionality)
function HelpTooltip() {
  return (
    <>
      <button popovertarget="help-popover">
        Help
      </button>
      <div popover id="help-popover">
        <p>This is helpful information</p>
      </div>
    </>
  );
}
```

**With JavaScript control:**
```jsx
'use client';

function ControlledPopover() {
  const popoverRef = useRef(null);
  
  return (
    <>
      <button onClick={() => popoverRef.current?.showPopover()}>
        Show
      </button>
      <div ref={popoverRef} popover>
        Content
      </div>
    </>
  );
}
```

### Container Queries

```css
/* ✅ Component responds to container size, not viewport */
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}

@container card (max-width: 399px) {
  .card {
    display: block;
  }
}
```

### CSS :has() Selector

```css
/* ✅ Parent selectors based on children */
.card:has(img) {
  display: grid;
}

.card:not(:has(img)) {
  display: block;
}

/* ✅ Form validation styling */
form:has(:invalid) .submit-btn {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### CSS Nesting

```css
/* ✅ Native CSS nesting (no preprocessor needed) */
.button {
  padding: 8px 16px;
  
  &:hover {
    background: blue;
  }
  
  &.primary {
    background: green;
  }
  
  & .icon {
    margin-right: 8px;
  }
}
```

---

## Performance Optimization

### Core Web Vitals 2026

**INP (Interaction to Next Paint) - Replaced FID in March 2024:**
- Target: < 200ms
- Measures all interactions, not just first
- Check: Long tasks, heavy JavaScript, slow event handlers

**LCP (Largest Contentful Paint):**
- Target: < 2.5s
- Optimize: Images (use Next.js Image), fonts (preload), above-fold content

**CLS (Cumulative Layout Shift):**
- Target: < 0.1
- Fix: Set image dimensions, reserve space for dynamic content, avoid layout shifts

### Modern Image Formats

```jsx
// ✅ AVIF (best compression, wide support in 2026)
<Image
  src="/photo.avif" // or let Next.js auto-convert
  alt="Photo"
  width={800}
  height={600}
  formats={['avif', 'webp', 'jpeg']} // Fallbacks
/>
```

### Resource Preloading

```jsx
// In app layout or head:
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
<link rel="preconnect" href="https://api.example.com" />
```

---

## Common Anti-Patterns to Flag

### ❌ Mixing Server and Client inappropriately

```jsx
// ❌ BAD - Can't use hooks in Server Component
async function ServerComponent() {
  const [state, setState] = useState(0); // ERROR!
  const data = await fetchData();
  return <div>{data}</div>;
}

// ❌ BAD - Can't await in Client Component
'use client';
async function ClientComponent() {
  const data = await fetchData(); // ERROR!
  return <div>{data}</div>;
}
```

### ❌ Over-using 'use client'

```jsx
// ❌ BAD - Entire page is client for one button
'use client';
function Page() {
  const [count, setCount] = useState(0);
  return (
    <main>
      <StaticContent /> {/* Unnecessarily shipped to client */}
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </main>
  );
}

// ✅ GOOD - Only interactive part is client
function Page() {
  return (
    <main>
      <StaticContent /> {/* Server rendered */}
      <Counter /> {/* Client component */}
    </main>
  );
}
```

### ❌ Manual data fetching in Client Components

```jsx
// ❌ OLD PATTERN - useEffect for data fetching
'use client';
function Component() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api/data').then(r => r.json()).then(setData);
  }, []);
  // ...
}

// ✅ NEW PATTERN - Server Component or use() hook
async function Component() {
  const data = await fetchData(); // Server Component
  // ...
}
```

---

## Output Format

**✅ Modern Patterns Used:**
- Highlight usage of React 19 features
- Note correct Server/Client boundary
- Recognize optimization opportunities taken

**⚠️  Outdated Patterns:**
- Flag manual memoization (suggest removing if no performance issue)
- Identify old data fetching patterns
- Note missing opportunities for Server Components

**🔴 Framework Violations:**
- Incorrect 'use client' / 'use server' usage
- Hooks in Server Components
- Async operations in Client Components

**📈 Optimization Opportunities:**
- Suggest Image component for images
- Recommend Server Components for static content
- Identify Actions pattern opportunities
- Note web platform features that could be adopted

---

## References

- <a href="https://react.dev/blog/2024/12/05/react-19" target="_blank" rel="noopener">React 19 Release Notes</a>
- <a href="https://nextjs.org/docs" target="_blank" rel="noopener">Next.js 15 Documentation</a>
- <a href="https://web.dev/articles/vitals" target="_blank" rel="noopener">Core Web Vitals</a>
`````

---

## Which Skill When? Decision Tree

Here's how to decide which Skill to use:

```text
Need to review front-end code?
│
├─ Quick PR review / General check
│  └─ ✅ Use: frontend-review
│
├─ Accessibility-critical feature (forms, auth, navigation)
│  └─ ✅ Use: accessibility-audit
│
├─ React/Next.js specific question or modernization
│  └─ ✅ Use: react-patterns-2026
│
└─ Production-ready component needing full audit
   └─ ✅ Use: All three (Claude auto-loads as needed)
```

**In practice:**
- **80% of my reviews:** `frontend-review` alone
- **15% of my reviews:** `frontend-review` + one specialist
- **5% of my reviews:** All three (pre-production audits)

## Deploying the Skills

### Option 1: Claude.ai (Web Interface)

1. Go to Claude.ai → Settings → Skills
2. Click "Create Skill"
3. Paste the content of each Skill file
4. Save

### Option 2: Claude Code (CLI)

Create the Skills folder and files:

```bash
mkdir -p .claude/skills
```

Then create each file:
- `.claude/skills/frontend-review.md`
- `.claude/skills/accessibility-audit.md`
- `.claude/skills/react-patterns-2026.md`

Claude Code automatically detects and uses Skills from this folder.

### Option 3: Claude API

Pass Skills in the system prompt:

```python
import anthropic

client = anthropic.Anthropic()

# Load skill content
with open("frontend-review.md") as f:
    skill_content = f.read()

response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=4096,
    system=f"You have access to the following skill:\n\n{skill_content}",
    messages=[
        {"role": "user", "content": "Review this React component..."}
    ]
)
```

## Testing the Skills

Here's a quick test to verify your Skills work:

**Test Component (with intentional issues):**

```jsx
'use client';

function UserCard({ user }) {
  const [liked, setLiked] = useState(false);
  
  return (
    <div onClick={() => setLiked(!liked)}>
      <img src={user.avatar} />
      <div>{user.name}</div>
      <div style={{width: '16px', height: '16px'}}>×</div>
    </div>
  );
}
```

**Ask Claude:** "Review this component using the frontend-review skill"

**Expected issues flagged:**
- ❌ Missing alt text on image
- ❌ div with onClick instead of button
- ❌ Close button too small (16px < 24px WCAG 2.2)
- ❌ No TypeScript types
- 🟡 Consider moving `'use client'` lower

If Claude catches these, your Skills are working!

## Real-World Use Cases

### Use Case 1: PR Reviews

Configure your CI/CD to run Claude review on front-end PRs:

```bash
# In your PR workflow
claude review src/components --skill frontend-review
```

### Use Case 2: Team Onboarding

New team members use the Skills to learn your codebase patterns:

> "Review this component and explain what patterns it follows"

### Use Case 3: Legacy Modernization

Point the react-patterns-2026 Skill at old code:

> "Identify opportunities to modernize this React 16 code to React 19 patterns"

## Customization Tips

### Adapting for Vue/Svelte

The `frontend-review` skill is framework-agnostic for most checks. For Vue-specific patterns, add a section like:

```markdown
## Vue-Specific Patterns

### Composition API (Vue 3+)
- Prefer `<script setup>` syntax
- Use `ref()` for primitives, `reactive()` for objects
- Extract composables for reusable logic
```

### Adding Project-Specific Rules

Add a section to any Skill:

```markdown
## Project Standards

- Use `cn()` utility for className merging
- Components go in `src/components/ui/`
- Use Tailwind for styling (no CSS modules)
```

## Frequently Asked Questions

**Q: Do I need all three Skills?**

Start with `frontend-review`. Add the others when you need deep dives into accessibility or React 19 patterns.

**Q: How often should I update the Skills?**

Review quarterly. WCAG and React patterns evolve, update when new standards land.

**Q: Can I combine Skills into one file?**

You can, but you'll lose the token efficiency benefits. The modular approach means Claude only loads what's needed.

**Q: Will these work with other AI assistants?**

The content is universal—accessibility rules and React patterns apply everywhere. The SKILL.md format is Claude-specific.

## Conclusion

Building focused, modular Skills changed how I work with Claude. Instead of one massive instruction set, I have three specialists:

1. **frontend-review** - The everyday workhorse
2. **accessibility-audit** - The WCAG 2.2 expert
3. **react-patterns-2026** - The modernization guide

Copy the files above, drop them in your `.claude/skills/` folder, and you're ready. Each Skill is complete—no additional setup needed.

For more on building Claude Skills for other domains, see the [Claude Agent Skills guide](/blog/claude-agent-skills-guide). You might also enjoy [What Are AI Agents](/blog/what-are-ai-agents) for the bigger picture on agentic AI.

Now go build something accessible, performant, and modern. 🚀
