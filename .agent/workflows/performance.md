---
description: Performance guidelines - page speed, Core Web Vitals, and optimization.
---

# ⚡ Performance Guidelines

## Current Baseline

| Metric | Current Score | Minimum Acceptable |
|--------|--------------|-------------------|
| **Page Speed (Lighthouse)** | 100/100 | 95/100 |
| **SEO Score** | Optimized | Must pass all checks |

## Core Web Vitals Thresholds

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | ≤ 4.0s | > 4.0s |
| **FID** (First Input Delay) | ≤ 100ms | ≤ 300ms | > 300ms |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | ≤ 0.25 | > 0.25 |
| **INP** (Interaction to Next Paint) | ≤ 200ms | ≤ 500ms | > 500ms |

---

## ⚠️ Changes That WILL Hurt Page Speed

| Action | Risk Level | Mitigation |
|--------|-----------|------------|
| Adding new npm packages | 🔴 HIGH | Check bundle size first, use dynamic imports |
| Adding web fonts | 🟠 MEDIUM | Use `font-display: swap`, preload critical fonts |
| Adding large images | 🔴 HIGH | Convert to WebP/AVIF, optimize, lazy load |
| Adding third-party scripts | 🔴 HIGH | Load async/defer, consider impact |
| Adding animations | 🟡 LOW-MED | Use CSS animations, avoid JS animations |
| Adding iframes | 🔴 HIGH | Lazy load iframes |
| Adding client:load components | 🟠 MEDIUM | Prefer client:idle or client:visible |

---

## Image Requirements

- [ ] **Format**: Use WebP or AVIF (NOT JPG/PNG for new images)
- [ ] **Size**: Images properly sized (no 2000px images for 200px containers)
- [ ] **Lazy Loading**: Use `loading="lazy"` for below-fold images
- [ ] **Dimensions**: Always specify width and height to prevent CLS
- [ ] **Compression**: Images optimized for web (use tools like squoosh.app)
- [ ] **Alt Text**: ALWAYS provide meaningful alt text (never `alt=""`)

---

## JavaScript Best Practices

- [ ] **Bundle Size**: Monitor and minimize bundle size
- [ ] **Code Splitting**: Use dynamic imports for non-critical code
- [ ] **Defer/Async**: Non-critical scripts loaded with defer or async
- [ ] **No Blocking**: No render-blocking JavaScript in `<head>`
- [ ] **Inline Scripts**: Use `is:inline` sparingly in Astro

---

## CSS Best Practices

- [ ] **Critical CSS**: Inline critical above-fold CSS
- [ ] **No Unused CSS**: TailwindCSS purges unused styles in production
- [ ] **Minification**: CSS is minified in production (automatic with Astro)

---

## Font Loading

- [ ] **Preload**: Critical fonts preloaded (in BaseHead.astro)
- [ ] **Font Display**: Use `font-display: swap` in @font-face
- [ ] **Subset**: Use font subsets when possible
- [ ] **Local Fonts**: Current setup uses local fonts (good!)

---

## Caching (Cloudflare)

- [ ] **Static Assets**: Long cache headers for static files
- [ ] **Cache Busting**: Astro handles hashed filenames automatically
- [ ] **Edge Caching**: Leverage Cloudflare's edge network

---

## Verification Commands

```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview

# Run Lighthouse CLI
npx lighthouse https://your-site.com --output=html --output-path=./lighthouse.html
```

## Online Tools

- **PageSpeed Insights**: https://pagespeed.web.dev/
- **WebPageTest**: https://www.webpagetest.org/

---

## ✅ Implemented Optimizations (2026-02-08)

### LCP Optimization
- [x] **fetchpriority="high"** on hero images in blog posts
- [x] **fetchpriority="high"** on first blog post image in blog index
- [x] **loading="eager"** for above-the-fold images
- [x] **Preconnect** to Google Analytics domain

### Forced Reflow Prevention
- [x] **requestAnimationFrame** for reading progress bar
- [x] **Throttling** scroll events with ticking flag
- [x] **Batched DOM reads and writes** to prevent layout thrashing

### Best Practices
```javascript
// ✅ GOOD - Prevent forced reflow with RAF
let ticking = false;

function updateProgress() {
  // Batch all DOM reads
  const rect = element.getBoundingClientRect();
  const height = element.offsetHeight;
  
  // Batch all DOM writes in RAF
  requestAnimationFrame(() => {
    element.style.width = `${progress}%`;
  });
  
  ticking = false;
}

function requestTick() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(updateProgress);
  }
}

window.addEventListener('scroll', requestTick, { passive: true });
```

```astro
<!-- ✅ GOOD - Optimize LCP image -->
<img 
  src={heroImage} 
  alt="..."
  width={1200}
  height={630}
  loading="eager"
  fetchpriority="high"
  decoding="async"
/>
```

---

*Last updated: 2026-02-08*
