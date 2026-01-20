# 📱 Floating Share Modal - Implementation Specification

**Created**: 2026-01-13  
**Status**: Ready for Implementation  
**Priority**: High  

---

## 📋 Overview

Create a professional floating share button with a modal overlay for sharing blog content across multiple social media platforms, email, and clipboard. The implementation follows Google's best practices including the Web Share API for native mobile sharing.

---

## 🎯 Requirements Summary

| Requirement | Decision |
|-------------|----------|
| **FAB Position** | Bottom-right corner |
| **FAB Visibility** | Always visible |
| **Native Share API** | ~~Disabled~~ - Always uses custom modal for consistent UX |
| **Additional Platforms** | Hacker News, Pinterest, Pocket |
| **Copy Success Feedback** | Text change + Checkmark icon animation |

---

## 🏗️ Architecture

### New Files to Create

| File | Purpose |
|------|---------|
| `src/components/ui/FloatingShareButton.astro` | Floating action button + modal container |
| `src/components/ui/ShareModal.astro` | Modal with sharing options grid |

### Files to Modify

| File | Changes |
|------|---------|
| `src/layouts/BlogPost.astro` | Add FloatingShareButton component |
| `src/types/icons.ts` | Add icon types: share, facebook, reddit, whatsapp, telegram, hackernews, pinterest, pocket |
| `src/components/ui/Icon.astro` | Add SVG paths for new icons |

---

## 🎨 Design Specifications

### Floating Action Button (FAB)

```
Position: fixed
Bottom: 24px (mobile: 16px)
Right: 24px (mobile: 16px)
Size: 56px × 56px (mobile: 48px × 48px)
Shape: Circular
Background: var(--text-primary)
Icon Color: var(--bg-primary)
Shadow: 0 4px 12px rgba(0, 0, 0, 0.15)
Border: 1px solid var(--border)
z-index: 50
```

### FAB Hover/Focus States

```css
/* Hover */
transform: scale(1.05);
box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);

/* Focus */
outline: 2px solid var(--text-primary);
outline-offset: 2px;
```

### Modal Overlay

```
Backdrop: rgba(0, 0, 0, 0.5) with backdrop-filter: blur(4px)
Modal Background: var(--bg-primary)
Border: 1px solid var(--border)
Border Radius: 16px
Max Width: 420px
Padding: 24px
Shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
z-index: 100
```

### Modal Animation

```css
/* Open */
@keyframes modalOpen {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
animation: modalOpen 0.2s ease-out;

/* For mobile (bottom sheet) */
@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
```

---

## 🔗 Sharing Platforms

### Tier 1: Primary Platforms (Large Icons - 4-column grid)

| Platform | Icon | Share URL Template |
|----------|------|-------------------|
| **X (Twitter)** | `twitter` | `https://twitter.com/intent/tweet?text={title}&url={url}` |
| **Facebook** | `facebook` | `https://www.facebook.com/sharer/sharer.php?u={url}` |
| **LinkedIn** | `linkedin` | `https://www.linkedin.com/sharing/share-offsite/?url={url}` |
| **Reddit** | `reddit` | `https://reddit.com/submit?url={url}&title={title}` |

### Tier 2: Secondary Platforms (4-column grid)

| Platform | Icon | Share URL Template |
|----------|------|-------------------|
| **WhatsApp** | `whatsapp` | `https://wa.me/?text={title}%20{url}` |
| **Telegram** | `telegram` | `https://t.me/share/url?url={url}&text={title}` |
| **Pinterest** | `pinterest` | `https://pinterest.com/pin/create/button/?url={url}&description={title}` |
| **Pocket** | `pocket` | `https://getpocket.com/save?url={url}&title={title}` |

### Tier 3: Developer/Tech Platforms (4-column grid)

| Platform | Icon | Share URL Template |
|----------|------|-------------------|
| **Hacker News** | `hackernews` | `https://news.ycombinator.com/submitlink?u={url}&t={title}` |
| **Email** | `mail` | `mailto:?subject={title}&body=Check%20out%20this%20article%3A%20{url}` |

### Tier 4: Utility Action (Full width button)

| Action | Icon | Behavior |
|--------|------|----------|
| **Copy Link** | `copy` → `check` | Copy URL to clipboard, animate to checkmark, show "Copied!" text |

---

## 📱 Sharing Behavior

> **Note**: The native Web Share API (iOS/Android share sheet) was initially implemented but later disabled per user preference. The custom modal now shows on all devices for a consistent, branded experience.

### Behavior Flow

```
User clicks FAB
       ↓
Open custom modal (all devices)
       ↓
User selects platform or copies link
       ↓
Done
```

---

## ⌨️ Accessibility Specifications

### ARIA Attributes

```html
<!-- FAB Button -->
<button
  aria-label="Share this article"
  aria-haspopup="dialog"
  aria-expanded="false"  <!-- Toggle to true when open -->
>
  <Icon name="share" />
</button>

<!-- Modal -->
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="share-modal-title"
>
  <h2 id="share-modal-title">Share this article</h2>
  <!-- content -->
</div>
```

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate between focusable elements |
| `Shift+Tab` | Navigate backwards |
| `Enter` / `Space` | Activate focused button/link |
| `Escape` | Close modal |

### Focus Management

```javascript
// When modal opens:
1. Store reference to FAB button
2. Move focus to modal (first focusable element or close button)
3. Trap focus within modal

// When modal closes:
1. Return focus to FAB button
2. Remove focus trap
```

### Screen Reader Announcements

```javascript
// After copy link success
aria-live="polite" announcement: "Link copied to clipboard"
```

---

## 📐 Responsive Breakpoints

### Desktop (≥ 640px)

- Modal: Centered overlay
- Grid: 4 columns for platform icons
- FAB: 56px, offset 24px

### Mobile (< 640px)

- Modal: Bottom sheet (slides up from bottom)
- Grid: 4 columns for platform icons
- FAB: 48px, offset 16px
- Modal height: Auto (max 80vh)
- Border radius: 16px 16px 0 0 (top corners only)

---

## 🎭 Animation Specifications

### FAB Entrance (if adding scroll-based reveal later)

```css
.fab {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.fab--hidden {
  transform: translateY(100px);
  opacity: 0;
  pointer-events: none;
}
```

### Modal Open/Close

```css
/* Desktop - Scale + Fade */
@keyframes modalOpen {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes modalClose {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
}

/* Mobile - Slide Up */
@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

@keyframes slideDown {
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
}
```

### Copy Success Animation

```css
/* Icon swap: copy → check */
.copy-btn .icon-copy { transition: opacity 0.15s, transform 0.15s; }
.copy-btn .icon-check { position: absolute; opacity: 0; transform: scale(0.5); }

.copy-btn.copied .icon-copy { opacity: 0; transform: scale(0.5); }
.copy-btn.copied .icon-check { opacity: 1; transform: scale(1); }
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .fab,
  .modal,
  .copy-btn * {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🔧 Implementation Steps

### Phase 1: Icon Updates ✅
- [x] Add icon types to `src/types/icons.ts`
- [x] Add SVG paths to `src/components/ui/Icon.astro`
  - `share` (share-2 from Lucide)
  - `facebook`
  - `reddit`
  - `whatsapp`
  - `telegram`
  - `hackernews`
  - `pinterest`
  - `pocket`

### Phase 2: ShareModal Component ✅
- [x] Create `src/components/ui/ShareModal.astro`
- [x] Implement modal structure with header, grid, and copy button
- [x] Add platform share links
- [x] Add copy link functionality with feedback
- [x] Style for both light and dark modes
- [x] Add keyboard event handlers (Escape to close)
- [x] Add focus trap logic

### Phase 3: FloatingShareButton Component ✅
- [x] Create `src/components/ui/FloatingShareButton.astro`
- [x] Implement FAB with fixed positioning
- [x] ~~Add Web Share API detection and handling~~ (Removed - always uses custom modal)
- [x] Wire up modal open/close logic
- [x] Add ARIA attributes for accessibility

### Phase 4: BlogPost Integration ✅
- [x] Import FloatingShareButton in `src/layouts/BlogPost.astro`
- [x] Add component with title and URL props
- [x] Ensure proper z-index layering with other fixed elements

### Phase 5: Testing & Polish ⬜
- [ ] Test all share links work correctly
- [ ] Test copy link with feedback
- [ ] Test keyboard navigation (Tab, Enter, Escape)
- [ ] Test focus trap and focus return
- [ ] Test in Chrome, Firefox, Safari
- [ ] Test on iOS Safari (Web Share API)
- [ ] Test on Android Chrome (Web Share API)
- [ ] Test both light and dark modes
- [ ] Test responsive layout (320px to 1920px)
- [ ] Test with screen reader (VoiceOver)
- [ ] Verify reduced motion preference works

---

## ✅ Acceptance Criteria

### Functional
- [x] FAB is always visible on blog posts (bottom-right)
- [x] Clicking FAB opens custom modal (all devices)
- [x] All 10 platform share links work correctly
- [x] Copy link copies URL and shows success feedback (text + icon)
- [x] Modal closes on backdrop click
- [x] Modal closes on close button click
- [x] Modal closes on Escape key

### Accessibility
- [ ] All buttons have proper aria-labels
- [ ] Modal has role="dialog" and aria-modal="true"
- [ ] Focus is trapped within modal when open
- [ ] Focus returns to FAB when modal closes
- [ ] Tab order is logical
- [ ] Focus indicators are visible
- [ ] Works with screen readers

### Design
- [ ] Matches black & white design system
- [ ] Works in both light and dark modes
- [ ] Animations are smooth (60fps)
- [ ] Respects prefers-reduced-motion
- [ ] Responsive from 320px to 1920px
- [ ] Mobile uses bottom-sheet style

### Performance
- [ ] No external JavaScript dependencies
- [ ] No layout shift when FAB appears
- [ ] Modal lazy-loads (not in initial DOM)

---

## 📁 File Structure After Implementation

```
src/
├── components/
│   └── ui/
│       ├── FloatingShareButton.astro  ← NEW
│       ├── ShareModal.astro           ← NEW
│       ├── ShareButtons.astro         (existing, unchanged)
│       └── Icon.astro                 (updated with new icons)
├── layouts/
│   └── BlogPost.astro                 (updated to include FAB)
└── types/
    └── icons.ts                       (updated with new icon types)
```

---

## 🔗 References

- [Web Share API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)
- [Web Share API - web.dev (Google)](https://web.dev/web-share/)
- [ARIA Authoring Practices - Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [Lucide Icons](https://lucide.dev/)

---

*Last Updated: 2026-01-13*
