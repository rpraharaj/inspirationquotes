# Universal Search Functionality Implementation Plan

**Status:** 📋 PENDING APPROVAL  
**Created:** 2026-01-13  
**Priority:** High  

---

## Overview

Implement a command palette-style universal search modal for the AI Agents Kit website. The search will allow users to quickly find blog posts using fuzzy text matching, with full keyboard navigation support.

### Design Reference

The search modal will follow the style shown in the reference screenshot (command palette like Algolia DocSearch):
- Clean, dark-themed modal with rounded corners
- Search input at top with magnifying glass icon
- Results grouped by "Blog Posts" header
- Each result shows title with category indicator
- Keyboard navigation hints in footer

---

## Confirmed Requirements

| Requirement | Decision |
|-------------|----------|
| Keyboard shortcut | ✅ `Cmd/Ctrl + K` to open search |
| Result behavior | ✅ Navigate immediately on click/Enter |
| Mobile layout | ✅ Responsive modal (optimized size, not full-screen) |
| Search scope | ✅ Blog posts only (no category pages) |

---

## Technical Architecture

### Approach: Client-Side Search with Prebuilt JSON Index

**Why this approach?**
- Zero external dependencies (no API calls, no Algolia)
- Works offline
- Fast performance (< 100ms search time)
- No ongoing costs
- Full control over the implementation

**How it works:**
1. At build time, generate `public/search-index.json` with all blog post metadata
2. Lazy-load search index when modal opens (first time only)
3. Use **Fuse.js** (CDN) for fuzzy text matching
4. Display instant results as user types

---

## Files to Create/Modify

### New Files

| File | Purpose |
|------|---------|
| `scripts/build-search-index.cjs` | Node.js script to generate search index at build time |
| `public/search-index.json` | Generated JSON file with all blog post metadata |
| `src/components/ui/SearchModal.astro` | Main search modal component |

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/Header.astro` | Add search icon button |
| `package.json` | Add `build:search` script |

---

## Implementation Details

### 1. Search Index Generator (`scripts/build-search-index.cjs`)

```javascript
// Script that reads all blog posts and generates a search index
// Output: public/search-index.json

// Index structure for each post:
{
  "id": "what-are-ai-agents",
  "title": "What Are AI Agents? The Complete Guide",
  "description": "Learn what AI agents are, how they work...",
  "category": "ai-agents",
  "categoryName": "AI Agents",
  "tags": ["ai-agents", "introduction", "guide"],
  "excerpt": "First 200 characters of post body...",
  "url": "/blog/what-are-ai-agents/"
}
```

**Build Integration:**
```json
// package.json updates
{
  "scripts": {
    "build:search": "node scripts/build-search-index.cjs",
    "build": "npm run build:search && astro check && astro build"
  }
}
```

---

### 2. Search Modal Component (`src/components/ui/SearchModal.astro`)

**Structure:**
```
┌──────────────────────────────────────────────────────────┐
│ 🔍  Search articles...                                 ✕ │
├──────────────────────────────────────────────────────────┤
│                                                          │
│ Blog Posts                                               │
│ ┌──────────────────────────────────────────────────────┐│
│ │ 📄 What Are AI Agents? The Complete Guide            ││
│ │    AI Agents                                          ││
│ └──────────────────────────────────────────────────────┘│
│ ┌──────────────────────────────────────────────────────┐│
│ │ 📄 Building Your First AI Agent in Python           ││
│ │    Tutorials                                          ││
│ └──────────────────────────────────────────────────────┘│
│ ┌──────────────────────────────────────────────────────┐│
│ │ 📄 AI Agent Use Cases for Business                  ││
│ │    AI Agents                                          ││
│ └──────────────────────────────────────────────────────┘│
│                                                          │
├──────────────────────────────────────────────────────────┤
│ ↵ to select   ↑↓ to navigate   esc to close             │
└──────────────────────────────────────────────────────────┘
```

**Key Features:**
- Lazy-loaded template (like existing ShareModal pattern)
- Fuse.js loaded via CDN on first open
- Debounced search (200ms delay)
- Maximum 8 results displayed
- Keyboard navigation with visual highlight
- Focus trap within modal
- Respects `prefers-reduced-motion`

**Styling (following design system):**
- Uses CSS custom properties (`--bg-primary`, `--border`, etc.)
- Black & white minimalist theme
- Smooth animations for open/close
- Hover states on results
- Active/selected result highlight

---

### 3. Header Updates (`src/components/Header.astro`)

**Add search button between navigation and theme toggle:**

```astro
<!-- Search Button -->
<button 
  id="search-trigger"
  class="p-2 text-foreground-secondary hover:text-foreground hover:bg-background-secondary rounded-lg transition-colors"
  aria-label="Search articles (Cmd+K)"
  title="Search (⌘K)"
>
  <Icon name="search" size={20} />
</button>
```

**Position in header:**
```
[Logo] --- [Nav Links] --- [Search] [Theme Toggle] [Mobile Menu]
```

---

### 4. Fuse.js Configuration

```javascript
const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'description', weight: 0.3 },
    { name: 'tags', weight: 0.2 },
    { name: 'excerpt', weight: 0.1 }
  ],
  threshold: 0.3,        // Fuzzy matching tolerance
  includeScore: true,    // For result ranking
  minMatchCharLength: 2, // Minimum characters to search
  limit: 8               // Maximum results
};
```

---

## Keyboard Shortcuts & Navigation

| Key | Action |
|-----|--------|
| `Cmd/Ctrl + K` | Open search modal (global) |
| `Escape` | Close search modal |
| `↑` / `↓` | Navigate through results |
| `Enter` | Navigate to selected result |
| `Tab` | Move focus (trapped within modal) |

---

## Accessibility (WCAG 2.1 AA)

| Requirement | Implementation |
|-------------|----------------|
| Modal semantics | `role="dialog"`, `aria-modal="true"` |
| Input labeling | `aria-label="Search articles"` |
| Results announcements | `aria-live="polite"` for result count |
| Keyboard navigation | Full arrow key + Enter support |
| Focus management | Focus trap, restore focus on close |
| Reduced motion | Respect `prefers-reduced-motion` |
| Screen reader | Announce "X results found" on search |

---

## Performance Optimizations

| Optimization | Details |
|--------------|---------|
| Lazy loading | Modal HTML only injected on first open |
| CDN for Fuse.js | Load library on-demand, not bundled |
| Debounced search | 200ms delay prevents excessive searches |
| Cached index | Search index fetched once, cached in memory |
| Result limit | Max 8 results to prevent DOM bloat |
| Minimal index | Only essential fields in search-index.json |

**Estimated index size:** ~200-300KB for 181 posts (gzipped: ~40-60KB)

---

## Implementation Steps

| Step | Task | Est. Time |
|------|------|-----------|
| 1 | Create `scripts/build-search-index.cjs` | 30 min |
| 2 | Update `package.json` with build script | 5 min |
| 3 | Run build script to generate initial index | 5 min |
| 4 | Create `SearchModal.astro` component | 2 hours |
| 5 | Update `Header.astro` with search trigger | 20 min |
| 6 | Implement Fuse.js search logic | 1 hour |
| 7 | Add keyboard shortcuts (Cmd+K) | 30 min |
| 8 | Style modal matching design system | 1 hour |
| 9 | Test & fix edge cases | 1 hour |
| 10 | Test accessibility | 30 min |

**Total estimated time:** ~7-8 hours

---

## Testing Checklist

### Functional Testing
- [ ] Search returns relevant results for various queries
- [ ] Fuzzy matching works (typos, partial matches)
- [ ] Click on result navigates to blog post
- [ ] Enter key navigates to selected result
- [ ] Arrow keys navigate through results
- [ ] Escape closes modal
- [ ] Cmd/Ctrl + K opens modal from anywhere
- [ ] Search works with empty query (shows nothing or popular)
- [ ] Clicking outside modal closes it

### Visual Testing
- [ ] Modal looks correct in light mode
- [ ] Modal looks correct in dark mode
- [ ] Responsive on mobile (320px - 768px)
- [ ] Responsive on tablet (768px - 1024px)
- [ ] Responsive on desktop (1024px+)
- [ ] Animations are smooth
- [ ] Selected result is visually highlighted

### Accessibility Testing
- [ ] Screen reader announces results
- [ ] Focus is trapped within modal
- [ ] Focus returns to trigger on close
- [ ] All interactive elements are keyboard accessible
- [ ] Color contrast meets WCAG AA

### Performance Testing
- [ ] Index loads in < 500ms on 3G
- [ ] Search results appear in < 100ms
- [ ] No layout shift when modal opens
- [ ] Modal doesn't affect page load time (lazy loaded)

---

## Dependencies

| Dependency | Version | Purpose | Load Method |
|------------|---------|---------|-------------|
| Fuse.js | 7.0.0 | Fuzzy search library | CDN (on-demand) |

**CDN URL:** `https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.mjs`

---

## Future Enhancements (Out of Scope)

These features are NOT included in this implementation but could be added later:

- [ ] Search analytics (track popular searches)
- [ ] Recent searches history
- [ ] Search filters (by category, date, etc.)
- [ ] Search highlighting in results
- [ ] "View all results" page for more than 8 results
- [ ] Autocomplete suggestions

---

## Approval Checklist

Please review and confirm:

- [ ] **Architecture:** Client-side search with Fuse.js is acceptable
- [ ] **UI Design:** Command palette style matches expectations
- [ ] **Keyboard shortcut:** Cmd/Ctrl + K is desired
- [ ] **Scope:** Blog posts only (no categories/tags search)
- [ ] **Performance:** Lazy loading approach is acceptable
- [ ] **Dependencies:** Fuse.js via CDN is acceptable

---

## Sign-off

**Approved by:** ________________  
**Date:** ________________  
**Notes:** ________________

---

*Once approved, implementation will proceed following the steps outlined above.*
