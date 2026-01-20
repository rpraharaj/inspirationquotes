---
description: Accessibility guidelines - WCAG 2.1 AA compliance, color contrast, and assistive technology support. MUST be followed for all UI changes.
---

# ♿ Accessibility (A11y) Guidelines

**CRITICAL**: All UI changes MUST comply with WCAG 2.1 Level AA standards.

---

## 🎯 Accessibility Targets

| Metric | Target | Tool to Verify |
|--------|--------|----------------|
| **PageSpeed A11y Score** | ≥ 95/100 | Lighthouse |
| **WCAG Level** | AA (Minimum) | axe DevTools |
| **Color Contrast** | ≥ 4.5:1 (text), ≥ 3:1 (large text) | WebAIM Contrast Checker |

---

## 🎨 Color Contrast Requirements

### Current Color Values (WCAG Compliant)

| Variable | Light Mode | Dark Mode | Min Contrast |
|----------|------------|-----------|--------------|
| `--text-primary` | `#000000` | `#FFFFFF` | 21:1 ✅ |
| `--text-secondary` | `#404040` | `#E5E5E5` | ~10:1 ✅ |
| `--text-tertiary` | `#525252` | `#A3A3A3` | ~7.5:1 ✅ |
| `--bg-tertiary` | `#F0F0F0` | `#171717` | N/A |

### ⚠️ Contrast Rules

| Combination | Allowed? | Contrast Ratio |
|-------------|----------|----------------|
| `text-primary` on `bg-primary` | ✅ Yes | 21:1 |
| `text-secondary` on `bg-primary` | ✅ Yes | ~10:1 |
| `text-tertiary` on `bg-primary` | ✅ Yes | ~7.5:1 |
| `text-tertiary` on `bg-secondary` | ✅ Yes | ~6:1 |
| `text-tertiary` on `bg-tertiary` | ⚠️ Caution | ~5.5:1 (use `text-secondary` if possible) |

### When Adding New Colors

1. **Test contrast** at [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
2. **Minimum 4.5:1** for normal text (< 18px or < 14px bold)
3. **Minimum 3:1** for large text (≥ 18px or ≥ 14px bold)
4. **Minimum 3:1** for UI components and graphics

---

## 📝 Form Accessibility

### All Form Inputs MUST Have:

```astro
<!-- ✅ CORRECT: Visible or screen-reader-only label -->
<label for="email" class="sr-only">Email address</label>
<input type="email" id="email" placeholder="Enter your email" />

<!-- ❌ WRONG: No label -->
<input type="email" placeholder="Enter your email" />
```

### Form Input Checklist

- [ ] Every `<input>` has a `<label>` with matching `for`/`id`
- [ ] Labels are either visible or use `class="sr-only"`
- [ ] Required fields have `aria-required="true"` or `required` attribute
- [ ] Error messages are associated with inputs via `aria-describedby`
- [ ] Placeholder text is NOT the only label (it disappears on focus)

---

## 🔘 Button & Link Accessibility

### Icon-Only Buttons MUST Have aria-label

```astro
<!-- ✅ CORRECT: Icon button with aria-label -->
<button aria-label="Toggle dark mode">
  <Icon name="moon" />
</button>

<!-- ❌ WRONG: No accessible name -->
<button>
  <Icon name="moon" />
</button>
```

### Link Text Must Be Descriptive

```astro
<!-- ✅ CORRECT: Descriptive link text -->
<a href="/blog">Read all articles</a>
<a href={url} aria-label="Go to page 3">3</a>

<!-- ❌ WRONG: Generic link text -->
<a href="/blog">Click here</a>
<a href={url}>3</a>
```

---

## 🖼️ Image Accessibility

### All Images MUST Have Alt Text

```astro
<!-- ✅ CORRECT: Descriptive alt text -->
<img src="/image.webp" alt="Dashboard showing AI agent metrics" />

<!-- ✅ CORRECT: Decorative image (empty alt) -->
<img src="/decorative.webp" alt="" role="presentation" />

<!-- ❌ WRONG: Missing alt attribute -->
<img src="/image.webp" />
```

### Alt Text Guidelines

| Image Type | Alt Text Approach |
|------------|-------------------|
| **Informative** | Describe the content and purpose |
| **Decorative** | Use `alt=""` with `role="presentation"` |
| **Functional** (linked) | Describe the action (e.g., "Go to homepage") |
| **Complex** (charts) | Provide summary + detailed description |

---

## ⌨️ Keyboard Navigation

### Skip Links (Required)

Every layout MUST include a skip link:

```astro
<body>
  <!-- First element in body -->
  <a 
    href="#main-content" 
    class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded-lg"
  >
    Skip to main content
  </a>
  
  <Header />
  <main id="main-content">
    <!-- Page content -->
  </main>
</body>
```

### Focus States (Required)

All interactive elements MUST have visible focus indicators:

```css
/* Already defined in global.css */
:focus-visible {
  outline: 2px solid var(--text-primary);
  outline-offset: 2px;
}
```

### Keyboard Checklist

- [ ] All interactive elements are focusable with `Tab`
- [ ] Focus order follows visual order
- [ ] Modal dialogs trap focus
- [ ] Escape key closes modals/menus
- [ ] Focus is visible (not removed via `outline: none`)

---

## 🏷️ ARIA Best Practices

### Landmarks

Every page should have proper landmarks:

```html
<header>...</header>          <!-- Implicit banner role -->
<nav aria-label="Main">...</nav>
<main id="main-content">...</main>
<aside>...</aside>            <!-- Implicit complementary role -->
<footer>...</footer>          <!-- Implicit contentinfo role -->
```

### When to Use ARIA

| Situation | Solution |
|-----------|----------|
| Icon-only button | `aria-label="Description"` |
| Decorative element | `aria-hidden="true"` |
| Current page indicator | `aria-current="page"` |
| Loading state | `aria-busy="true"` |
| Expandable content | `aria-expanded="true/false"` |
| Navigation region | `aria-label="Main navigation"` |

### Decorative Elements

Hide decorative elements from screen readers:

```astro
<!-- ✅ CORRECT: Decorative icon hidden from AT -->
<svg aria-hidden="true">...</svg>
<Icon name="sparkles" />  <!-- Icon.astro automatically adds aria-hidden -->

<!-- ✅ CORRECT: Decorative divider -->
<hr aria-hidden="true" />
<div class="reading-progress" aria-hidden="true"></div>
```

---

## 📱 Semantic HTML

### Heading Hierarchy

```html
<!-- ✅ CORRECT: Logical heading hierarchy -->
<h1>Page Title</h1>
  <h2>Section 1</h2>
    <h3>Subsection 1.1</h3>
  <h2>Section 2</h2>

<!-- ❌ WRONG: Skipped heading levels -->
<h1>Page Title</h1>
  <h3>Section 1</h3>  <!-- Skipped h2! -->
```

### Semantic Elements

| Element | Use For |
|---------|---------|
| `<nav>` | Navigation sections |
| `<main>` | Main page content |
| `<article>` | Self-contained content |
| `<aside>` | Related but separate content |
| `<section>` | Thematic grouping |
| `<header>` | Introductory content |
| `<footer>` | Footer content |
| `<button>` | Clickable actions |
| `<a>` | Navigation/links |

---

## ✅ Pre-Change Accessibility Checklist

Before submitting ANY UI change, verify:

```
□ Color contrast meets 4.5:1 minimum for text
□ All form inputs have associated labels
□ All buttons/links have accessible names
□ All images have appropriate alt text
□ Page has single h1 with logical heading order
□ Skip link is present and functional
□ Focus states are visible
□ Interactive elements are keyboard accessible
□ Decorative elements are hidden from AT
□ Tested with keyboard-only navigation
```

---

## 🧪 Testing Tools

| Tool | Purpose | Link |
|------|---------|------|
| **Lighthouse** | Overall accessibility audit | Chrome DevTools |
| **axe DevTools** | Detailed WCAG violations | Browser extension |
| **WAVE** | Visual accessibility feedback | Browser extension |
| **WebAIM Contrast** | Color contrast checking | webaim.org |
| **VoiceOver** | Screen reader testing | macOS built-in |
| **NVDA** | Screen reader testing | Windows (free) |

---

## 🚨 Agent Instructions

When I (the AI assistant) make UI changes, I MUST:

### Before Changes
1. Review this accessibility workflow
2. Check if changes involve colors, forms, images, or interactive elements

### During Changes
1. Follow all accessibility guidelines in this document
2. Use semantic HTML elements
3. Add appropriate ARIA attributes
4. Ensure keyboard accessibility

### After Changes
1. Verify color contrast if colors were modified
2. Confirm all new interactive elements are accessible
3. Test with keyboard navigation mentally

### Mandatory Warnings

| Action | Warning |
|--------|---------|
| New color | ⚠️ "Verify contrast ratio ≥ 4.5:1" |
| New button/link | ⚠️ "Ensure accessible name present" |
| New form input | ⚠️ "Ensure label is associated" |
| New image | ⚠️ "Ensure alt text is descriptive" |
| Icon-only element | ⚠️ "Add aria-label" |
| New interactive element | ⚠️ "Ensure keyboard accessible" |

---

## 📚 Resources

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [Inclusive Components](https://inclusive-components.design/)

---

*Last updated: 2026-01-06*
*WCAG Target: Level AA Compliance*
