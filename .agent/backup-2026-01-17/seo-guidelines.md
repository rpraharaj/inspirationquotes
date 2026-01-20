---
description: SEO guidelines - meta tags, structured data, and content optimization.
---

# 🔍 SEO Guidelines

## Required for ALL Pages

- [ ] **Title Tag**: Unique, descriptive, 50-60 characters
- [ ] **Meta Description**: Compelling, 150-160 characters
- [ ] **Canonical URL**: Properly set to avoid duplicate content
- [ ] **Open Graph Tags**: og:title, og:description, og:image, og:url
- [ ] **Twitter Card Tags**: twitter:card, twitter:title, twitter:description, twitter:image

---

## HTML Structure Requirements

- [ ] **Single H1**: Only ONE `<h1>` per page
- [ ] **Heading Hierarchy**: Proper order (H1 → H2 → H3), no skipping levels
- [ ] **Semantic HTML**: Use `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`, `<main>`
- [ ] **Alt Text**: ALL images MUST have descriptive alt attributes (never empty!)
- [ ] **Unique IDs**: All interactive elements need unique, descriptive IDs

---

## Structured Data (JSON-LD)

- [ ] Appropriate schema types for page content (Article, BlogPosting, etc.)
- [ ] Valid JSON-LD without errors
- [ ] Test with Google Rich Results Test

---

## Sitemap & Indexing

- [ ] New pages automatically added via @astrojs/sitemap
- [ ] `robots.txt` updated if needed
- [ ] `noindex` meta tag on non-public pages (auth, dashboard, etc.)
- [ ] Verify sitemap at `/sitemap-index.xml`

---

## Internal Linking

- [ ] Important pages linked from other relevant pages
- [ ] No orphan pages (pages with no internal links)
- [ ] Use descriptive anchor text (avoid "click here")

---

## External Links (Google Compliance)

**All external links MUST have proper `rel` attributes.**

### Required Attributes

| Link Type | Required Attributes | Example |
|-----------|-------------------|---------|
| **Standard external** | `rel="noopener noreferrer"` + `target="_blank"` | Links to documentation, references |
| **Affiliate/sponsored** | `rel="noopener noreferrer sponsored"` + `target="_blank"` | Paid partnerships, affiliate links |
| **User-generated content** | `rel="noopener noreferrer nofollow ugc"` + `target="_blank"` | Comments, forum posts (if applicable) |

### Implementation Examples

```astro
<!-- ✅ Standard external link -->
<a href="https://astro.build" target="_blank" rel="noopener noreferrer">
  Astro Documentation
</a>

<!-- ✅ Affiliate/sponsored link -->
<a href="https://partner.com" target="_blank" rel="noopener noreferrer sponsored">
  Get 20% off with our link
</a>

<!-- ❌ WRONG: Missing rel attributes -->
<a href="https://external-site.com">External Link</a>
```

### Why This Matters

- **`noopener`**: Prevents the new page from accessing `window.opener` (security)
- **`noreferrer`**: Prevents sending the referrer header (privacy)
- **`sponsored`**: Required by Google for paid/affiliate links (avoids penalties)
- **`nofollow`**: Tells search engines not to pass link equity
- **`ugc`**: Marks user-generated content links

---

## MDX Content Rules

For blog posts and content pages:

### Frontmatter Requirements

```yaml
---
title: "Descriptive Title (50-60 chars)"      # Required
description: "Compelling description (150-160 chars)"  # Required
pubDate: 2024-01-05                           # Required
updatedDate: 2024-01-10                       # Optional
heroImage: "/path/to/image.webp"              # Optional
category: "ai-news"                           # Required
tags: ["tag1", "tag2"]                        # Optional
difficulty: "beginner"                        # Optional
---
```

### Content Rules

- [ ] **No H1 in MDX**: Title comes from frontmatter (rendered by layout)
- [ ] **Start with H2**: First heading in content should be `##`
- [ ] **Heading Order**: Maintain hierarchy (H2 → H3 → H4)
- [ ] **Image Alt Text**: All images must have descriptive alt text
- [ ] **Internal Links**: Link to related content on the site
- [ ] **External Links**: Use `rel="noopener"` for security

---

## Key Files for SEO

| Purpose | File Location |
|---------|---------------|
| Meta tags, OG tags, canonical | `src/components/BaseHead.astro` |
| Blog post layout | `src/layouts/BlogPost.astro` |
| Sitemap config | `astro.config.mjs` |

---

## Testing Tools

- **Rich Results Test**: https://search.google.com/test/rich-results
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
- **PageSpeed Insights**: https://pagespeed.web.dev/

---

*Last updated: 2026-01-06*
