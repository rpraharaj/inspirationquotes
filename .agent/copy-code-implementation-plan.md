# Click-to-Copy Code Block Implementation Plan

**Date:** 2026-01-17  
**Objective:** Add click-to-copy functionality to all code blocks in blog posts  
**Current State:** Code blocks render with `.prose pre` styling but no copy button

---

## 🔍 Current Analysis

### Architecture Stack
- **Framework:** Astro (static site generator)
- **Markdown Rendering:** Native Astro + MDX
- **Styling:** TailwindCSS + Custom CSS in `global.css`
- **Blog Layout:** `src/layouts/BlogPost.astro`
- **Content Slot:** `<div class="prose max-w-none"><slot /></div>`

### Code Block Rendering
- **CSS Selectors:** `.prose pre` and `.prose pre code`
- **Background:** `var(--prose-pre-bg)` → `var(--bg-tertiary)`
- **No syntax highlighting library** actively configured (basic markdown rendering)
- **No existing copy button** infrastructure

---

## 📋 Implementation Options

### **Option 1: Client-Side JavaScript Solution** ⭐ RECOMMENDED

**Pros:**
- Works with static generation (Astro's strength)
- No build-time changes needed
- Progressive enhancement (fails gracefully)
- Minimal dependencies
- Full control over UI/UX

**Cons:**
- Requires JavaScript (but acceptable for this feature)
- Slightly more manual setup

**Implementation:**
1. Create `CopyCodeButton.astro` component
2. Add client-side script to detect code blocks
3. Inject copy buttons dynamically
4. Style buttons to match design system

---

### **Option 2: Rehype Plugin** (Alternative)

**Pros:**
- Automatic at build time
- No client-side JavaScript needed

**Cons:**
- Requires build configuration changes
- Less flexible styling
- More complex setup
- Harder to maintain

**Verdict:** NOT recommended for this use case

---

## ✅ Recommended Implementation Plan

### **Phase 1: Create Copy Button Component**

**File:** `src/components/ui/CopyCodeButton.astro`

**Features:**
- Floating "Copy" button in top-right of code blocks
- Icon-based UI (copy icon → checkmark on success)
- Tooltip feedback
- Keyboard accessible
- Theme-aware styling

**Implementation Details:**
- Use `position: absolute` with `position: relative` parent
- Clipboard API for copying
- 2-second success state before reverting
- Respect reduced motion preferences

---

### **Phase 2: Add Client-Side Script**

**Location:** `src/layouts/BlogPost.astro` (inline script)

**Script Responsibilities:**
1. Detect all `pre > code` elements in `.prose`
2. Create wrapper for positioning context
3. Inject copy button for each code block
4. Attach click event listeners
5. Handle copy to clipboard
6. Show success feedback

**Pseudo-code:**
```javascript
// On page load
document.querySelectorAll('.prose pre:has(code)').forEach(pre => {
  // Wrap in relative container
  // Create copy button element
  // Append button to container
  // Add click handler for clipboard API
});
```

---

### **Phase 3: Update Styles**

**File:** `src/styles/global.css`

**Changes:**
```css
/* Code block container - add position context */
.prose pre {
  position: relative;
  background-color: var(--prose-pre-bg);
  padding: 1.25rem;
  border-radius: 8px;
  overflow-x: auto;
}

/* Copy button styling */
.copy-code-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s, background-color 0.15s;
  z-index: 10;
}

.prose pre:hover .copy-code-button {
  opacity: 1;
}

.copy-code-button:hover {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
}

.copy-code-button:focus-visible {
  opacity: 1;
  outline: 2px solid var(--text-primary);
  outline-offset: 2px;
}

.copy-code-button.copied {
  background-color: var(--text-primary);
  color: var(--bg-primary);
}
```

---

### **Phase 4: Accessibility Enhancements**

**ARIA Labels:**
- `aria-label="Copy code to clipboard"`
- Update to `"Code copied!"` on success
- Live region for screen reader announcements

**Keyboard Support:**
- Focusable with Tab
- Activatable with Enter/Space
- Clear focus indicators

**Reduced Motion:**
- Respect `prefers-reduced-motion`
- Instant state changes (no animations)

---

## 📂 File Structure

```
src/
├── components/
│   └── ui/
│       └── CopyCodeButton.astro        [NEW]
├── layouts/
│   └── BlogPost.astro                  [MODIFY - add script]
└── styles/
    └── global.css                      [MODIFY - add button styles]
```

---

## 🎨 UI/UX Specifications

### Button States

| State | Visual | Duration |
|-------|--------|----------|
| **Default (hidden)** | Opacity 0 | Permanent |
| **Hover (visible)** | Opacity 1, subtle bg | While hovering |
| **Focus** | Opacity 1, outline | While focused |
| **Clicked** | Icon changes to checkmark | 0.15s transition |
| **Success** | Green bg, "Copied!" text | 2 seconds |
| **Reset** | Back to default | After 2s |

### Button Design

**Appearance:**
- Text: "Copy" (default) → "Copied!" (success)
- Icon: Copy icon → Checkmark icon
- Size: Small (0.75rem font, 32px height)
- Position: Top-right corner, 8px from edges
- Border: 1px solid
- Rounded corners: 6px

**Colors (Light Theme):**
- Background: `#FAFAFA` (bg-secondary)
- Text: `#404040` (text-secondary)
- Hover: `#F0F0F0` (bg-tertiary)
- Success: `#000000` (text-primary) bg, `#FFFFFF` text

**Colors (Dark Theme):**
- Background: `#0A0A0A` (bg-secondary)
- Text: `#E5E5E5` (text-secondary)
- Hover: `#171717` (bg-tertiary)
- Success: `#FFFFFF` (text-primary) bg, `#000000` text

---

## 🔧 Implementation Steps (Detailed)

### Step 1: Create Copy Button Component (5 min)

Create `src/components/ui/CopyCodeButton.astro`:

```astro
---
// Empty frontmatter - this is a client-only component
---

<template id="copy-button-template">
  <button 
    class="copy-code-button" 
    aria-label="Copy code to clipboard"
    type="button"
  >
    <span class="copy-icon" aria-hidden="true">📋</span>
    <span class="copy-text">Copy</span>
  </button>
</template>
```

### Step 2: Add Client Script to BlogPost Layout (10 min)

Add this `<script>` tag before the closing `</body>` in `BlogPost.astro`:

```javascript
<script>
  // Copy code block functionality
  function initCopyCodeButtons() {
    const codeBlocks = document.querySelectorAll('.prose pre:has(code)');
    
    codeBlocks.forEach(pre => {
      // Create copy button
      const button = document.createElement('button');
      button.className = 'copy-code-button';
      button.setAttribute('aria-label', 'Copy code to clipboard');
      button.innerHTML = '<span aria-hidden="true">📋</span> Copy';
      
      // Append button to pre
      pre.style.position = 'relative';
      pre.appendChild(button);
      
      // Click handler
      button.addEventListener('click', async () => {
        const code = pre.querySelector('code');
        if (!code) return;
        
        try {
          await navigator.clipboard.writeText(code.textContent || '');
          
          // Success feedback
          button.innerHTML = '<span aria-hidden="true">✓</span> Copied!';
          button.classList.add('copied');
          button.setAttribute('aria-label', 'Code copied to clipboard');
          
          // Reset after 2 seconds
          setTimeout(() => {
            button.innerHTML = '<span aria-hidden="true">📋</span> Copy';
            button.classList.remove('copied');
            button.setAttribute('aria-label', 'Copy code to clipboard');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
          button.innerHTML = '<span aria-hidden="true">✗</span> Failed';
          setTimeout(() => {
            button.innerHTML = '<span aria-hidden="true">📋</span> Copy';
          }, 2000);
        }
      });
    });
  }
  
  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCopyCodeButtons);
  } else {
    initCopyCodeButtons();
  }
</script>
```

### Step 3: Add CSS Styles (5 min)

Add to `src/styles/global.css` after existing `.prose pre` rules:

``` css
/* Copy code button */
.copy-code-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1;
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease, background-color 0.15s ease, transform 0.1s ease;
  transform: scale(1);
  z-index: 10;
}

.prose pre:hover .copy-code-button,
.copy-code-button:focus {
  opacity: 1;
}

.copy-code-button:hover {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  border-color: var(--border-strong);
}

.copy-code-button:active {
  transform: scale(0.95);
}

.copy-code-button:focus-visible {
  opacity: 1;
  outline: 2px solid var(--text-primary);
  outline-offset: 2px;
}

.copy-code-button.copied {
  background-color: var(--text-primary);
  color: var(--bg-primary);
  border-color: var(--text-primary);
}

/* Ensure pre has position context */
.prose pre {
  position: relative;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .copy-code-button {
    transition: none;
  }
}
```

### Step 4: Test (5 min)

1. Run `npm run dev`
2. Navigate to blog post with code blocks
3. Test copy functionality
4. Verify keyboard accessibility (Tab, Enter)
5. Test in dark mode
6. Test with screen reader

---

## �� Testing Checklist

- [ ] Copy button appears on hover
- [ ] Copy button visible with keyboard focus
- [ ] Clicking copies code to clipboard
- [ ] Success state shows "Copied!" for 2 seconds
- [ ] Multiple code blocks on same page work independently
- [ ] Works in light theme
- [ ] Works in dark theme
- [ ] Keyboard accessible (Tab + Enter)
- [ ] Screen reader announces state changes
- [ ] No layout shift when button appears
- [ ] Works on mobile (touch)
- [ ] Works in all major browsers (Chrome, Firefox, Safari, Edge)

---

## 🚀 Rollout Plan

### Option A: Deploy Immediately
- Implement all 4 steps
- Test locally
- Deploy to production
- Monitor for issues

### Option B: Gradual Rollout
- Implement on dev branch
- Test with new blog post only
- Verify analytics/user feedback
- Roll out site-wide

**Recommendation:** Option A (immediate) - Low risk, high value feature

---

## 📊 Success Metrics

Track after deployment:
1. **User Engagement:** Do users copy more code snippets?
2. **Time on Page:** Does convenience improve engagement?
3. **Accessibility:** Any keyboard/screen reader issues reported?
4. **Performance:** Page load impact (should be negligible)

---

## 🔄 Future Enhancements (Optional)

**Phase 2 Ideas:**
1. **Syntax highlighting** with Shiki or Prism
2. **Line numbers** with highlighting
3. **Language labels** (JavaScript, Python, etc.)
4. **Multiple code tabs** (before/after comparisons)
5. **Download as file** button
6. **"Run in playground"** for JavaScript/TypeScript

---

## 📝 Summary

**Total Implementation Time:** ~25 minutes

| Phase | Time | Complexity |
|-------|------|------------|
| Create component | 5 min | Low |
| Add script | 10 min | Medium |
| Add CSS | 5 min | Low |
| Test | 5 min | Low |

**Impact:** High - Significantly improves developer experience on a developer-focused blog

**Recommendation:** Proceed with implementation immediately. This is a best-practice feature for technical blogs in 2026.

---

*Ready to implement? Let me know and I'll execute all 4 phases.*
