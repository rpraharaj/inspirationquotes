# PageSpeed Optimization Plan

**Date**: 2026-02-08  
**Current Issues**: Render-blocking CSS, Forced reflow, LCP optimization

---

## 🎯 Issues & Solutions

### 1. Render-Blocking CSS (Est. savings: 150ms)

**Problem**: CSS files are blocking initial render
- `slug_CaDPt_el.css` - 10.9 KiB, 630ms
- `about.CNs0rqBT.css` - 8.6 KiB, 160ms

**Solutions**:

#### A. Inline Critical CSS
Extract and inline above-the-fold CSS directly in `<head>` to eliminate render-blocking.

```astro
<!-- In BaseHead.astro -->
<style is:inline>
  /* Critical CSS for above-the-fold content */
  /* Typography, layout, hero section */
</style>
```

#### B. Preload CSS Files
Add `rel="preload"` for CSS files to start downloading earlier:

```astro
<link rel="preload" href="/path/to/critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/path/to/critical.css"></noscript>
```

#### C. Use `media` Attribute for Non-Critical CSS
Defer non-critical CSS by using media queries:

```astro
<link rel="stylesheet" href="/path/to/print.css" media="print" onload="this.media='all'">
```

---

### 2. Forced Reflow (68ms)

**Problem**: JavaScript is querying geometric properties (like `offsetWidth`) after styles have been invalidated, causing layout recalculation.

**Common Causes**:
- Reading layout properties in loops
- Mixing reads and writes to the DOM
- Animations that trigger layout

**Solutions**:

#### A. Batch DOM Reads and Writes
```javascript
// ❌ BAD - causes multiple reflows
element.style.width = element.offsetWidth + 10 + 'px';
element.style.height = element.offsetHeight + 10 + 'px';

// ✅ GOOD - batch reads, then writes
const width = element.offsetWidth;
const height = element.offsetHeight;
element.style.width = width + 10 + 'px';
element.style.height = height + 10 + 'px';
```

#### B. Use CSS Transforms Instead of Layout Properties
```javascript
// ❌ BAD - triggers layout
element.style.left = '100px';

// ✅ GOOD - uses compositing
element.style.transform = 'translateX(100px)';
```

#### C. Use `requestAnimationFrame` for Animations
```javascript
requestAnimationFrame(() => {
  // DOM manipulations here
});
```

**Action Required**: Audit all client-side JavaScript for layout thrashing.

---

### 3. LCP Image Optimization

**Problem**: Featured image for the blog post is not optimized for LCP.

**Current Issue**:
```astro
<img src="/images/blog/gratitude-quotes-for-journaling.webp" 
     alt="..." 
     width="1200" 
     height="630" />
```

**Solution**: Add `fetchpriority="high"` and ensure NO lazy loading:

```astro
<img src="/images/blog/gratitude-quotes-for-journaling.webp" 
     alt="..." 
     width="1200" 
     height="630"
     fetchpriority="high"
     loading="eager" />
```

**Implementation**:
- Identify LCP image component (likely in blog post layout)
- Add `fetchpriority="high"` to hero/featured images
- Ensure `loading="eager"` (or omit `loading` attribute)
- Keep `loading="lazy"` for below-the-fold images

---

### 4. Preconnect to Required Origins

**Problem**: Not preconnecting to Google Analytics domain.

**Solution**: Add DNS prefetch and preconnect:

```astro
<!-- In BaseHead.astro -->
<link rel="dns-prefetch" href="https://www.googletagmanager.com">
<link rel="preconnect" href="https://www.googletagmanager.com" crossorigin>
```

---

## 📋 Implementation Checklist

### Phase 1: Quick Wins (Immediate)
- [ ] Add `fetchpriority="high"` to LCP images (hero/featured images)
- [ ] Add `loading="eager"` to above-the-fold images
- [ ] Add preconnect for Google Analytics
- [ ] Audit and fix forced reflow in client-side JS

### Phase 2: CSS Optimization (Medium effort)
- [ ] Extract critical CSS for above-the-fold content
- [ ] Inline critical CSS in `<head>`
- [ ] Defer non-critical CSS using `media` attribute or JS loading
- [ ] Test on PageSpeed Insights

### Phase 3: Advanced (If needed)
- [ ] Consider using Astro's `<ViewTransitions />` for smoother page loads
- [ ] Implement resource hints (`dns-prefetch`, `preconnect`, `prefetch`)
- [ ] Optimize font loading with `font-display: swap`

---

## 🧪 Testing

After each phase, test with:

```bash
# Build production
npm run build

# Preview locally
npm run preview

# Test with Lighthouse
npx lighthouse http://localhost:4321 --view
```

**Online Testing**:
- PageSpeed Insights: https://pagespeed.web.dev/
- WebPageTest: https://www.webpagetest.org/

---

## 📊 Expected Improvements

| Metric | Before | Target | Strategy |
|--------|--------|--------|----------|
| **Render-blocking time** | 150ms | 0ms | Inline critical CSS |
| **Forced reflow** | 68ms | 0ms | Fix JS layout thrashing |
| **LCP** | Current | <2.5s | `fetchpriority="high"` |
| **Overall Score** | Current | 95+ | Combined optimizations |

---

## 🔗 References

- [Web.dev: Optimize LCP](https://web.dev/optimize-lcp/)
- [Web.dev: Avoid Layout Shifts](https://web.dev/avoid-layout-shifts/)
- [MDN: fetchpriority](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/fetchPriority)
- [Astro Performance Guide](https://docs.astro.build/en/guides/performance/)
