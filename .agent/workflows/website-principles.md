---
description: Core website principles - SEO optimization and page speed requirements. MUST be checked before any code changes.
---

# 🎯 Website Core Principles

**CRITICAL**: Before making ANY changes to this website, review the relevant workflow files.

---

## 📚 Workflow Files Reference

| Workflow | Description | When to Use |
|----------|-------------|-------------|
| **/design-system** | Colors, typography, SVG icons | Any UI/visual changes |
| **/code-standards** | File structure, naming, engineering practices | Writing or refactoring code |
| **/seo-guidelines** | Meta tags, structured data, content optimization | Adding pages or content |
| **/performance** | Page speed, Core Web Vitals, optimization | Any changes that load assets |
| **/accessibility** | WCAG 2.1 AA, color contrast, keyboard nav | Any UI/interactive changes |

---

## 🛠️ Tech Stack

- **Framework**: Astro 5.x (Static + SSR)
- **Deployment**: Cloudflare Workers
- **Styling**: TailwindCSS 3.x
- **Content**: MDX for blog posts
- **Icons**: Inline SVG (Lucide-style)
- **Sitemap**: @astrojs/sitemap (automatic)

---

## 📊 Performance Baseline

| Metric | Target |
|--------|--------|
| **Lighthouse Performance** | ≥ 95/100 |
| **Lighthouse Accessibility** | ≥ 95/100 |
| **LCP** | ≤ 2.5s |
| **CLS** | ≤ 0.1 |
| **INP** | ≤ 200ms |
| **Color Contrast** | ≥ 4.5:1 |

---

## ⚡ Quick Rules

### Design (see /design-system)
- ✅ Black & white color scheme only
- ✅ Use CSS variables for all colors
- ✅ SVG icons via `Icon.astro` (no emojis)
- ✅ Test both light and dark modes

### Code (see /code-standards)
- ✅ Components ≤ 200 lines, Pages ≤ 150 lines
- ✅ PascalCase components, kebab-case pages
- ✅ Typed props with defaults
- ✅ Extract repeated code into components

### SEO (see /seo-guidelines)
- ✅ Single H1 per page
- ✅ All images have alt text
- ✅ Proper frontmatter (title, description)
- ✅ Internal linking between related pages

### Performance (see /performance)
- ✅ WebP/AVIF images only
- ✅ Lazy load below-fold images
- ✅ Prefer `client:visible` over `client:load`
- ✅ CSS animations over JS animations

### Accessibility (see /accessibility)
- ✅ Color contrast ≥ 4.5:1 for text
- ✅ All form inputs have labels
- ✅ All buttons/links have accessible names
- ✅ Skip-to-main-content link present
- ✅ Keyboard navigation works

---

## ⚠️ SSG-First Policy

**This is a static blog. ALWAYS use Static Site Generation (SSG).**

| Mode | When to Use |
|------|-------------|
| **SSG (Static)** | ✅ DEFAULT - All pages, blog posts |
| **SSR (Server)** | ⚠️ EXCEPTION - Only for auth/real-time data |

---

## 🚨 Agent Instructions

When I (the AI assistant) make changes, I MUST:

1. **Before changes**: Review relevant workflow files
2. **During changes**: Follow all applicable principles
3. **After changes**: Warn about any potential impacts

### Mandatory Warnings

| Action | Warning |
|--------|---------|
| New npm package | ⚠️ "May impact bundle size" |
| New image | ⚠️ "Ensure WebP/AVIF and optimized" |
| Third-party script | ⚠️ "Impacts page speed" |
| client:load directive | ⚠️ "Consider client:idle or client:visible" |
| Emoji icons | ⚠️ "Use SVG icons via Icon.astro" |
| External icon fonts | ⚠️ "Use inline SVG icons" |
| New color value | ⚠️ "Verify contrast ratio ≥ 4.5:1" |
| Icon-only button | ⚠️ "Add aria-label for accessibility" |
| New form input | ⚠️ "Ensure label is associated" |

---

## ✅ Pre-Change Checklist

```
□ Page Speed: Lighthouse score ≥ 95
□ Accessibility: Lighthouse a11y score ≥ 95
□ Core Web Vitals: LCP < 2.5s, CLS < 0.1
□ SEO: Single H1, proper meta tags
□ Mobile: Tested on 375px viewport
□ Icons: Using Icon.astro (no emojis)
□ Contrast: Text meets 4.5:1 ratio
□ Labels: All inputs have associated labels
□ Keyboard: Tab navigation works
□ Build: `npm run build` passes
```

---

## 🧪 Commands

```bash
npm run dev          # Start dev server
npm run build        # Build production
npm run preview      # Preview production build
```

---

*Last updated: 2026-01-06*
*Tech Stack: Astro 5.x + Cloudflare Workers + TailwindCSS + Inline SVG Icons*
*Accessibility: WCAG 2.1 Level AA Compliant*
