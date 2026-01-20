---
description: Design system guidelines - colors, typography, and SVG icons. Reference for all UI work.
---

# 🎨 Design System

## Design Philosophy: Minimalist Black & White

**This website uses a deliberately minimalist black and white color scheme.**

### Why Black & White?

| Reason | Benefit |
|--------|---------|
| **Timeless** | Never goes out of style |
| **Professional** | Clean, sophisticated appearance |
| **High Contrast** | Excellent readability & accessibility |
| **Fast** | No complex gradients = better performance |
| **Focus on Content** | Colors don't distract from writing |
| **Easy Dark Mode** | Perfect inversion between modes |

### ⚠️ Color Constraints

**DO NOT introduce new accent colors without explicit approval.**

| Allowed | Not Allowed |
|---------|-------------|
| ✅ Black (`#000000`) | ❌ Random brand colors |
| ✅ White (`#FFFFFF`) | ❌ Colorful buttons |
| ✅ Grayscale shades | ❌ Gradients |
| ✅ Semantic colors for states* | ❌ Decorative colors |

*Semantic colors (if needed in future):
- 🔴 Error states: Red tones
- 🟢 Success states: Green tones
- 🟡 Warning states: Yellow/amber tones
- 🔵 Info/links: Blue tones (use sparingly)

---

## Color Palette

All colors are defined as CSS custom properties in `src/styles/global.css`.

### Light Mode (`:root`)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#FFFFFF` | Main background |
| `--bg-secondary` | `#FAFAFA` | Cards, sections |
| `--bg-tertiary` | `#F0F0F0` | Code blocks, subtle backgrounds |
| `--text-primary` | `#000000` | Headings, primary text |
| `--text-secondary` | `#404040` | Body text, paragraphs |
| `--text-tertiary` | `#525252` | Muted text, captions (WCAG compliant) |
| `--border` | `#E5E5E5` | Default borders |
| `--border-strong` | `#D4D4D4` | Emphasized borders |

### Dark Mode (`.dark`)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#000000` | Main background |
| `--bg-secondary` | `#0A0A0A` | Cards, sections |
| `--bg-tertiary` | `#171717` | Code blocks, subtle backgrounds |
| `--text-primary` | `#FFFFFF` | Headings, primary text |
| `--text-secondary` | `#E5E5E5` | Body text, paragraphs |
| `--text-tertiary` | `#A3A3A3` | Muted text, captions |
| `--border` | `#262626` | Default borders |
| `--border-strong` | `#404040` | Emphasized borders |

### Color Usage Rules

- [ ] **ALWAYS use CSS variables** - Never hardcode hex colors
- [ ] **Use semantic names** - `bg-background` not `bg-white`
- [ ] **Test both modes** - All UI must work in light AND dark mode
- [ ] **Maintain contrast** - WCAG 2.1 AA (4.5:1 for text) - See **/accessibility**
- [ ] **Avoid tertiary-on-tertiary** - Use `text-secondary` on `bg-tertiary` when possible

---

## Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Body | Atkinson | 400 | 1rem (16px) |
| Headings | Atkinson | 700 | Varies |
| Code | System monospace | 400 | 0.9em |

---

## 🎯 SVG Icons (Mandatory)

**This website uses inline SVG icons exclusively. NO emoji icons or external icon fonts.**

### Why SVG Icons?

| Reason | Benefit |
|--------|---------|
| **Consistency** | Identical appearance across all platforms and browsers |
| **Theming** | Uses `currentColor` to adapt to light/dark mode automatically |
| **Performance** | Inline SVGs = zero HTTP requests, instant rendering |
| **Accessibility** | Proper `aria-hidden` attributes for screen readers |
| **Scalability** | Crisp at any size, no pixelation |
| **Professional** | Clean, modern developer-focused aesthetic |

### Icon Implementation

| File | Purpose |
|------|---------|
| `src/components/ui/Icon.astro` | Icon component with 30+ Lucide-style SVG icons |
| `src/types/icons.ts` | TypeScript type definitions for icon names |

### Usage Rules

- [ ] **ALWAYS use the Icon component** - Never inline SVG directly in pages
- [ ] **Use semantic icon names** - e.g., `name="newspaper"` not `name="icon1"`
- [ ] **Set appropriate size** - Default is 24px, adjust via `size` prop
- [ ] **Icons are decorative** - Always include `aria-hidden="true"` (automatic)
- [ ] **NO emoji icons** - Replace emojis with corresponding SVG icons

### Icon Component Usage

```astro
---
import Icon from '../components/ui/Icon.astro';
---

<!-- Basic usage -->
<Icon name="bot" />

<!-- With custom size -->
<Icon name="arrow-right" size={16} />

<!-- With custom stroke width -->
<Icon name="layers" size={24} strokeWidth={1.5} />

<!-- With additional classes -->
<Icon name="github" class="text-foreground-secondary" />
```

### Available Icons

| Category | Icons |
|----------|-------|
| **Branding** | `bot`, `brain`, `sparkles`, `cpu` |
| **Categories** | `newspaper`, `message-square`, `plug`, `wrench`, `code` |
| **Navigation** | `arrow-right`, `arrow-left`, `chevron-right`, `menu`, `x` |
| **UI** | `clock`, `calendar`, `search`, `layers`, `file-code`, `book-open` |
| **Social** | `twitter`, `github`, `linkedin`, `mail`, `external-link` |
| **Actions** | `copy`, `check`, `terminal`, `zap` |
| **Theme** | `sun`, `moon` |

### Adding New Icons

1. Add the icon name to `src/types/icons.ts`
2. Add the SVG paths to `src/components/ui/Icon.astro`
3. Use Lucide icons (https://lucide.dev/) as the source
4. Ensure stroke-based icons (not filled) for consistency
5. Test in both light and dark modes

### ⚠️ Icon Constraints

| Allowed | Not Allowed |
|---------|-------------|
| ✅ Inline SVG via Icon.astro | ❌ Emoji icons (🤖, 📰, etc.) |
| ✅ Lucide-style stroke icons | ❌ External icon fonts (Font Awesome) |
| ✅ `currentColor` for theming | ❌ Hardcoded colors in SVG |
| ✅ Semantic icon names | ❌ Icon sprites or external SVG files |

---

*Last updated: 2026-01-06*
*See also: /accessibility for WCAG compliance guidelines*
