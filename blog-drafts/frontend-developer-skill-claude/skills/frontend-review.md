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
