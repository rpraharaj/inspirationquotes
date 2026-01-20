# 🚀 Website Go-Live Checklist

**Site:** AI Agents Kit (https://aiagentskit.com)  
**Deployment:** Cloudflare Workers  
**Last Updated:** 2026-01-13  

---

## Executive Summary

This comprehensive checklist ensures your website is fully SEO optimized, follows all Google guidelines, and is positioned for strong search rankings. Complete each section methodically before launch.

---

## 📋 Table of Contents

1. [Pre-Launch Technical Checks](#1-pre-launch-technical-checks)
2. [SEO On-Page Optimization](#2-seo-on-page-optimization)
3. [Content Quality Validation](#3-content-quality-validation)
4. [Structured Data & Schema Markup](#4-structured-data--schema-markup)
5. [Performance & Core Web Vitals](#5-performance--core-web-vitals)
6. [Accessibility Compliance](#6-accessibility-compliance)
7. [Mobile Optimization](#7-mobile-optimization)
8. [Site Architecture & Crawlability](#8-site-architecture--crawlability)
9. [Security & HTTPS](#9-security--https)
10. [Analytics & Tracking Setup](#10-analytics--tracking-setup)
11. [Search Console & Indexing](#11-search-console--indexing)
12. [Social Media & Sharing](#12-social-media--sharing)
13. [Final Pre-Launch Tests](#13-final-pre-launch-tests)
14. [Post-Launch Actions](#14-post-launch-actions)

---

## 1. Pre-Launch Technical Checks

### Build & Deployment

| Check | Command/Tool | Expected Result | Status |
|-------|------------|-----------------|--------|
| Clean production build | `npm run build` | No errors or warnings | ☐ |
| Preview production locally | `npm run preview` | All pages render correctly | ☐ |
| Verify all routes work | Manual testing | No 404 errors | ☐ |
| Check wrangler config | Review `wrangler.json` | Correct settings | ☐ |
| Verify site URL | `astro.config.mjs` | `https://aiagentskit.com` | ☐ |

### File Structure Validation

| Check | Validation Steps | Status |
|-------|------------------|--------|
| All blog posts have valid frontmatter | Run analytics: `npm run build-analytics` | ☐ |
| No broken internal links | Check blog analytics dashboard | ☐ |
| No orphan pages | Verify 0 orphan pages in analytics | ☐ |
| All images exist | Check for missing image references | ☐ |
| No draft posts published | Verify `draft: true` posts are excluded | ☐ |

---

## 2. SEO On-Page Optimization

### Meta Tags (All Pages)

| Element | Requirement | Validation Tool | Status |
|---------|-------------|-----------------|--------|
| **Title Tag** | Unique, 50-60 characters, keyword-rich | View source | ☐ |
| **Meta Description** | Unique, 150-160 characters, compelling | View source | ☐ |
| **Canonical URL** | Set correctly on every page | View source | ☐ |
| **Open Graph Tags** | og:title, og:description, og:image, og:url, og:type | Social debug tools | ☐ |
| **Twitter Card Tags** | twitter:card, twitter:title, twitter:description, twitter:image | Twitter Card Validator | ☐ |
| **Viewport Meta** | `<meta name="viewport" content="width=device-width, initial-scale=1">` | View source | ☐ |
| **Language** | `<html lang="en">` attribute set | View source | ☐ |

### Page-Level SEO

| Check | Requirement | Status |
|-------|-------------|--------|
| **Single H1 per page** | Only ONE `<h1>` on every page | ☐ |
| **Heading hierarchy** | H1 → H2 → H3 (no levels skipped) | ☐ |
| **Keyword in first 100 words** | Primary keyword appears early | ☐ |
| **Keyword in at least 1 H2** | Natural keyword placement | ☐ |
| **Internal links** | Minimum 3 per blog post | ☐ |
| **External links** | Minimum 2 per blog post, with `target="_blank" rel="noopener"` | ☐ |
| **No duplicate meta descriptions** | Each page unique | ☐ |
| **No thin content pages** | All posts ≥ 4,000 words | ☐ |

### URL Structure

| Check | Requirement | Status |
|-------|-------------|--------|
| Clean, readable URLs | `/blog/post-slug` format | ☐ |
| Lowercase URLs | No uppercase characters | ☐ |
| Hyphens for word separation | No underscores | ☐ |
| Keywords in URL slugs | Descriptive, keyword-rich | ☐ |
| Consistent trailing slashes | URLs end with `/` consistently | ☐ |

---

## 3. Content Quality Validation

### Blog Quality Standards

Run the blog analytics dashboard (`npm run serve-dashboard`) and verify:

| Metric | Target | Validation | Status |
|--------|--------|------------|--------|
| **Word count** | All posts ≥ 4,000 words | Blog analytics | ☐ |
| **SEO score** | All posts ≥ 85 score | Blog analytics | ☐ |
| **Internal links** | All posts ≥ 3 links | Blog analytics | ☐ |
| **External links** | All posts ≥ 2 links | Blog analytics | ☐ |
| **Featured images** | All posts have images | Blog analytics | ☐ |
| **Orphan pages** | 0 orphan pages | Blog analytics | ☐ |

### Human Voice Requirements

| Check | Requirement | Status |
|-------|-------------|--------|
| **No AI banned phrases** | No "In this comprehensive guide...", "Whether you're a...", etc. | ☐ |
| **Personal anecdotes** | 2+ first-person experiences per post | ☐ |
| **Opinions expressed** | 1+ clear stances or hot takes per post | ☐ |
| **Contractions used** | Natural use of don't, it's, they're | ☐ |
| **Conversational transitions** | "Here's the thing..." not "Additionally," | ☐ |

### E-E-A-T Signals

| Signal | Implementation | Status |
|--------|----------------|--------|
| **Experience** | First-person stories, "When I implemented..." | ☐ |
| **Expertise** | Technical depth, accurate terminology | ☐ |
| **Authoritativeness** | Links to official documentation | ☐ |
| **Trustworthiness** | Update dates, balanced perspective | ☐ |

### Information Currency

| Check | Requirement | Status |
|-------|-------------|--------|
| **AI model versions** | All references to current models (GPT-5.x, Claude 4.x, Gemini 3.x) | ☐ |
| **Statistics** | From current year or previous year only | ☐ |
| **Product info** | Current versions referenced | ☐ |
| **No outdated claims** | All "latest" claims verified | ☐ |

---

## 4. Structured Data & Schema Markup

### Implemented Schema Types

| Schema Type | Pages | Validation Status |
|-------------|-------|-------------------|
| **BlogPosting** | All blog posts | ☐ Validate with Rich Results Test |
| **BreadcrumbList** | All pages | ☐ Validate with Rich Results Test |
| **WebSite** | Homepage | ☐ Validate with Rich Results Test |
| **WebPage** | Category/About pages | ☐ Validate with Rich Results Test |
| **Person (Author)** | Blog posts | ☐ Validate with Rich Results Test |
| **Organization** | Site-wide | ☐ Validate with Rich Results Test |

### Schema Validation

| Check | Tool | Expected Result | Status |
|-------|------|-----------------|--------|
| Test homepage | [Rich Results Test](https://search.google.com/test/rich-results) | No errors | ☐ |
| Test 3+ blog posts | [Rich Results Test](https://search.google.com/test/rich-results) | Article rich result eligible | ☐ |
| Validate all schemas | [Schema Markup Validator](https://validator.schema.org/) | No errors or warnings | ☐ |
| Verify JSON-LD format | View page source | Valid JSON in `<script type="application/ld+json">` | ☐ |

### Required Schema Properties

| Property | Present | Status |
|----------|---------|--------|
| **Article: headline** | Title from frontmatter | ☐ |
| **Article: image** | Hero image from frontmatter | ☐ |
| **Article: datePublished** | pubDate from frontmatter | ☐ |
| **Article: author** | With name and URL | ☐ |
| **Article: dateModified** | updatedDate if available | ☐ |
| **Article: publisher** | Organization with logo | ☐ |

---

## 5. Performance & Core Web Vitals

### Lighthouse Scores

Test with [PageSpeed Insights](https://pagespeed.web.dev/):

| Page Type | Performance | SEO | Accessibility | Best Practices | Status |
|-----------|-------------|-----|---------------|----------------|--------|
| Homepage | ≥ 95 | ≥ 95 | ≥ 95 | ≥ 95 | ☐ |
| Blog listing | ≥ 95 | ≥ 95 | ≥ 95 | ≥ 95 | ☐ |
| Blog post (3 samples) | ≥ 95 | ≥ 95 | ≥ 95 | ≐ 95 | ☐ |
| Category page | ≥ 95 | ≥ 95 | ≥ 95 | ≥ 95 | ☐ |
| About page | ≥ 95 | ≥ 95 | ≥ 95 | ≥ 95 | ☐ |

### Core Web Vitals Thresholds

| Metric | Target (Good) | Maximum Acceptable | Status |
|--------|---------------|-------------------|--------|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | ≤ 4.0s | ☐ |
| **FID** (First Input Delay) | ≤ 100ms | ≤ 300ms | ☐ |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | ≤ 0.25 | ☐ |
| **INP** (Interaction to Next Paint) | ≤ 200ms | ≤ 500ms | ☐ |
| **TTFB** (Time to First Byte) | ≤ 800ms | ≤ 1.8s | ☐ |

### Image Optimization

| Check | Requirement | Status |
|-------|-------------|--------|
| **Format** | All images WebP or AVIF | ☐ |
| **Lazy loading** | `loading="lazy"` on below-fold images | ☐ |
| **Dimensions** | Width and height specified (prevent CLS) | ☐ |
| **Alt text** | All images have descriptive alt text | ☐ |
| **Compression** | Images optimized for web | ☐ |
| **Size** | Images sized appropriately (no 2000px for 200px containers) | ☐ |

### JavaScript & CSS

| Check | Requirement | Status |
|-------|-------------|--------|
| No render-blocking JS in `<head>` | Defer/async for non-critical | ☐ |
| Critical CSS inlined | Above-fold styles load fast | ☐ |
| Unused CSS purged | TailwindCSS purges in production | ☐ |
| Bundle size monitored | No unnecessary dependencies | ☐ |

### Font Loading

| Check | Requirement | Status |
|-------|-------------|--------|
| Critical fonts preloaded | Atkinson font preloaded | ☐ |
| `font-display: swap` | Prevents invisible text | ☐ |
| Local fonts used | No external font CDN calls | ☐ |

---

## 6. Accessibility Compliance

### WCAG 2.1 Level AA Requirements

| Check | Requirement | Status |
|-------|-------------|--------|
| **Lighthouse Accessibility** | ≥ 95/100 | ☐ |
| **Color contrast (text)** | ≥ 4.5:1 ratio | ☐ |
| **Color contrast (large text)** | ≥ 3:1 ratio | ☐ |
| **Skip link present** | Skip to main content link | ☐ |
| **Focus states visible** | All interactive elements | ☐ |
| **Keyboard navigation works** | Tab through all elements | ☐ |

### Form Accessibility

| Check | Requirement | Status |
|-------|-------------|--------|
| All inputs have labels | `<label for="id">` or `aria-label` | ☐ |
| Required fields marked | `required` or `aria-required` | ☐ |
| Error messages associated | `aria-describedby` | ☐ |

### Button & Link Accessibility

| Check | Requirement | Status |
|-------|-------------|--------|
| Icon-only buttons have `aria-label` | All icon buttons accessible | ☐ |
| Link text is descriptive | No "click here" | ☐ |
| External links indicate new window | Visual or `aria-label` indicator | ☐ |

### Image Accessibility

| Check | Requirement | Status |
|-------|-------------|--------|
| All images have alt text | No `alt=""` on informative images | ☐ |
| Decorative images marked | `alt="" role="presentation"` | ☐ |
| Complex images have descriptions | Charts, diagrams explained | ☐ |

### Semantic HTML

| Check | Requirement | Status |
|-------|-------------|--------|
| Proper heading hierarchy | H1 → H2 → H3 (no skipping) | ☐ |
| Semantic elements used | `<header>`, `<main>`, `<footer>`, `<nav>`, `<article>` | ☐ |
| ARIA landmarks present | Main, navigation, banner, contentinfo | ☐ |

---

## 7. Mobile Optimization

### Mobile-Friendly Testing

| Check | Tool | Expected Result | Status |
|-------|------|-----------------|--------|
| Mobile-friendly test | [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) | Pass | ☐ |
| 375px viewport test | Chrome DevTools | Content readable, no horizontal scroll | ☐ |
| Touch targets | 44x44px minimum | All buttons/links tappable | ☐ |
| Viewport meta tag | View source | `width=device-width, initial-scale=1` | ☐ |

### Responsive Design

| Breakpoint | Layout Works | Status |
|------------|--------------|--------|
| 375px (Mobile S) | ☐ | ☐ |
| 414px (Mobile L) | ☐ | ☐ |
| 768px (Tablet) | ☐ | ☐ |
| 1024px (Laptop) | ☐ | ☐ |
| 1440px (Desktop) | ☐ | ☐ |

### Mobile UX

| Check | Requirement | Status |
|-------|-------------|--------|
| Text readable without zoom | Font size ≥ 16px | ☐ |
| No horizontal scrolling | Content fits viewport | ☐ |
| Navigation accessible | Mobile menu functional | ☐ |
| Forms usable | Inputs properly sized | ☐ |

---

## 8. Site Architecture & Crawlability

### Sitemap

| Check | URL | Expected Result | Status |
|-------|-----|-----------------|--------|
| Sitemap exists | `/sitemap-index.xml` | Valid XML sitemap | ☐ |
| All pages included | Check sitemap | All public pages listed | ☐ |
| No non-public pages | Check sitemap | No auth/dashboard pages | ☐ |
| Valid lastmod dates | Check sitemap | ISO 8601 format | ☐ |

### Robots.txt

| Check | URL | Expected Result | Status |
|-------|-----|-----------------|--------|
| Robots.txt exists | `/robots.txt` | Valid robots.txt | ☐ |
| Sitemap referenced | Check file | `Sitemap: https://aiagentskit.com/sitemap-index.xml` | ☐ |
| Important pages allowed | Check file | Not blocking content | ☐ |
| Non-public pages blocked | Check file | Admin/auth pages blocked if any | ☐ |

### Internal Linking Structure

| Check | Requirement | Status |
|-------|-------------|--------|
| No orphan pages | All pages linked from ≥1 other page | ☐ |
| Hub pages link to posts | Category pages, homepage | ☐ |
| Related posts linked | Cross-linking between content | ☐ |
| Anchor text descriptive | Keyword-rich, not "click here" | ☐ |

### Crawl Errors

| Check | Tool | Expected Result | Status |
|-------|------|-----------------|--------|
| No broken links | [Screaming Frog](https://www.screamingfrog.co.uk/) or manual check | 0 broken links | ☐ |
| No redirect chains | Manual check | Max 1 redirect | ☐ |
| No soft 404s | Check 404 page | Proper 404 response | ☐ |

---

## 9. Security & HTTPS

### SSL/TLS

| Check | Requirement | Status |
|-------|-------------|--------|
| **HTTPS enforced** | All pages serve over HTTPS | ☐ |
| **HTTP redirects to HTTPS** | 301 redirect in place | ☐ |
| **Valid SSL certificate** | No warnings in browser | ☐ |
| **Certificate not expiring soon** | > 30 days validity | ☐ |

### Security Headers

| Header | Recommendation | Status |
|--------|----------------|--------|
| **Strict-Transport-Security** | `max-age=31536000; includeSubDomains` | ☐ |
| **X-Content-Type-Options** | `nosniff` | ☐ |
| **X-Frame-Options** | `DENY` or `SAMEORIGIN` | ☐ |
| **Content-Security-Policy** | Appropriate policy set | ☐ |

### Link Security

| Check | Requirement | Status |
|-------|-------------|--------|
| External links open in new tab | `target="_blank"` | ☐ |
| External links have `rel="noopener"` | Prevents tabnapping | ☐ |
| No mixed content | All resources over HTTPS | ☐ |

---

## 10. Analytics & Tracking Setup

### Analytics Implementation

| Platform | Requirement | Status |
|----------|-------------|--------|
| **Google Analytics 4** | GA4 property created | ☐ |
| **Tracking code installed** | Verify with Tag Assistant | ☐ |
| **Events tracking** | Page views, clicks work | ☐ |
| **Conversions defined** | Newsletter, contact, etc. | ☐ |

### Privacy Compliance

| Check | Requirement | Status |
|-------|-------------|--------|
| **Cookie consent** | Banner if required in your region | ☐ |
| **Privacy policy** | Published and linked | ☐ |
| **Analytics anonymization** | IP anonymization if required | ☐ |

---

## 11. Search Console & Indexing

### Google Search Console Setup

| Task | Steps | Status |
|------|-------|--------|
| **Add property** | Add `https://aiagentskit.com` | ☐ |
| **Verify ownership** | DNS, HTML file, or meta tag | ☐ |
| **Submit sitemap** | Submit `/sitemap-index.xml` | ☐ |
| **Check coverage** | Review Index Coverage report | ☐ |

### Bing Webmaster Tools

| Task | Steps | Status |
|------|-------|--------|
| **Add site** | Add property in Bing | ☐ |
| **Verify ownership** | Use preferred method | ☐ |
| **Submit sitemap** | Submit sitemap URL | ☐ |

### Initial Indexing

| Action | Priority | Status |
|--------|----------|--------|
| Request indexing of homepage | High | ☐ |
| Request indexing of key pages | High | ☐ |
| Monitor crawl stats | Medium | ☐ |
| Check for crawl errors | High | ☐ |

---

## 12. Social Media & Sharing

### Open Graph Validation

| Platform | Test Tool | Expected Result | Status |
|----------|-----------|-----------------|--------|
| Facebook | [Facebook Debugger](https://developers.facebook.com/tools/debug/) | All OG tags render correctly | ☐ |
| Twitter | [Twitter Card Validator](https://cards-dev.twitter.com/validator) | Summary large image card | ☐ |
| LinkedIn | [Post Inspector](https://www.linkedin.com/post-inspector/) | Content preview correct | ☐ |

### Share Testing

| Check | Requirement | Status |
|-------|-------------|--------|
| **OG image dimensions** | 1200x630px | ☐ |
| **OG image on all pages** | Featured or default image | ☐ |
| **OG description compelling** | Encourages clicks | ☐ |
| **Share buttons work** | Test all share options | ☐ |

### Brand Consistency

| Element | Requirement | Status |
|---------|-------------|--------|
| **Site name consistent** | "AI Agents Kit" everywhere | ☐ |
| **Logo/favicon correct** | Renders in bookmarks/tabs | ☐ |
| **Brand colors in OG images** | Black & white theme | ☐ |

---

## 13. Final Pre-Launch Tests

### Cross-Browser Testing

| Browser | Version | Works | Status |
|---------|---------|-------|--------|
| Chrome | Latest | ☐ | ☐ |
| Firefox | Latest | ☐ | ☐ |
| Safari | Latest | ☐ | ☐ |
| Edge | Latest | ☐ | ☐ |
| Safari iOS | Latest | ☐ | ☐ |
| Chrome Android | Latest | ☐ | ☐ |

### Dark Mode Testing

| Check | Requirement | Status |
|-------|-------------|--------|
| All pages work in dark mode | Colors invert correctly | ☐ |
| Images visible in dark mode | No white backgrounds bleeding | ☐ |
| Icons adapt to theme | `currentColor` working | ☐ |
| OG images look good in both modes | Test sharing | ☐ |

### Edge Cases

| Check | Requirement | Status |
|-------|-------------|--------|
| Empty state handling | No errors on empty searches | ☐ |
| Long titles handled | Truncation works | ☐ |
| Special characters | Display correctly | ☐ |
| Very long posts | Pagination/scroll works | ☐ |

### Final Build

| Command | Expected Result | Status |
|---------|-----------------|--------|
| `npm run build` | Clean build, no errors | ☐ |
| Check bundle size | No unexpected increases | ☐ |
| `npm run preview` | Site works correctly | ☐ |

---

## 14. Post-Launch Actions

### Immediate (Day 1)

| Task | Priority | Status |
|------|----------|--------|
| Verify site is live | Critical | ☐ |
| Check HTTPS working | Critical | ☐ |
| Submit sitemap to Google | Critical | ☐ |
| Request indexing of key pages | Critical | ☐ |
| Test all forms work | High | ☐ |
| Verify analytics tracking | High | ☐ |

### First Week

| Task | Priority | Status |
|------|----------|--------|
| Monitor Search Console for errors | High | ☐ |
| Check indexing status | High | ☐ |
| Monitor Core Web Vitals | High | ☐ |
| Share launch on social media | Medium | ☐ |
| Set up uptime monitoring | Medium | ☐ |

### First Month

| Task | Priority | Status |
|------|----------|--------|
| Review Search Console performance | High | ☐ |
| Analyze top-performing content | Medium | ☐ |
| Identify indexing issues | High | ☐ |
| Plan content calendar | Medium | ☐ |
| Build backlinks | Medium | ☐ |

### Ongoing Maintenance

| Task | Frequency | Status |
|------|-----------|--------|
| Publish new content | Weekly | ☐ |
| Update existing content | Monthly | ☐ |
| Check for broken links | Monthly | ☐ |
| Review analytics | Weekly | ☐ |
| Monitor Core Web Vitals | Monthly | ☐ |
| Renew SSL certificate | Annual | ☐ |

---

## 🛠️ Validation Tools Quick Reference

| Tool | Purpose | URL |
|------|---------|-----|
| **PageSpeed Insights** | Performance & Core Web Vitals | https://pagespeed.web.dev/ |
| **Rich Results Test** | Structured data | https://search.google.com/test/rich-results |
| **Mobile-Friendly Test** | Mobile optimization | https://search.google.com/test/mobile-friendly |
| **WebPageTest** | Detailed performance | https://www.webpagetest.org/ |
| **Schema Validator** | JSON-LD validation | https://validator.schema.org/ |
| **Facebook Debugger** | OG tags | https://developers.facebook.com/tools/debug/ |
| **Twitter Card Validator** | Twitter cards | https://cards-dev.twitter.com/validator |
| **WebAIM Contrast Checker** | Color accessibility | https://webaim.org/resources/contrastchecker/ |
| **axe DevTools** | Accessibility | Browser extension |
| **Screaming Frog** | Crawl analysis | https://www.screamingfrog.co.uk/ |

---

## 📊 Summary Scorecard

Complete this before launch:

| Category | Checklist Items | Completed | Score |
|----------|-----------------|-----------|-------|
| Technical Checks | 10 | ☐/10 | |
| SEO On-Page | 25 | ☐/25 | |
| Content Quality | 20 | ☐/20 | |
| Structured Data | 15 | ☐/15 | |
| Performance | 25 | ☐/25 | |
| Accessibility | 20 | ☐/20 | |
| Mobile | 15 | ☐/15 | |
| Site Architecture | 15 | ☐/15 | |
| Security | 10 | ☐/10 | |
| Analytics | 5 | ☐/5 | |
| Search Console | 10 | ☐/10 | |
| Social Sharing | 10 | ☐/10 | |
| **TOTAL** | **180** | ☐/180 | |

**Minimum to Launch:** 165/180 (90%+)

---

## ✅ Final Sign-Off

| Approval | Name | Date | Signature |
|----------|------|------|-----------|
| Technical Review | | | |
| Content Review | | | |
| SEO Review | | | |
| Final Approval | | | |

---

*This checklist is based on your website's established workflows and guidelines:*
- */seo-guidelines* - SEO best practices
- */performance* - Core Web Vitals requirements
- */accessibility* - WCAG 2.1 AA compliance
- */blog-quality-standards* - Content quality standards
- */json-ld-schema* - Structured data implementation
- */website-principles* - Core website principles

*Last updated: 2026-01-13*
