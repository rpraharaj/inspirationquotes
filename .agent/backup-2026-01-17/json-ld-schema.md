---
description: JSON-LD structured data system - how to add and manage schema markup for SEO.
---

# 🏗️ JSON-LD Structured Data System

A centralized, type-safe system for managing structured data across the website following Google's recommended best practices.

---

## Quick Reference

### Adding Schema to a Page

```astro
---
import { generateArticleSchema, type Schema } from '../lib/schema';
import JsonLd from '../components/seo/JsonLd.astro';

const schema = generateArticleSchema({ ... });
---

<!-- In the <head> section -->
<JsonLd schema={schema} />
```

Or pass schemas to `BaseLayout`:

```astro
<BaseLayout
  title="Page Title"
  description="Page description"
  schemas={[schema1, schema2]}
>
  <!-- content -->
</BaseLayout>
```

---

## Available Schema Generators

### 1. Article/BlogPosting Schema

For blog posts and articles. **Required for rich results in search.**

```typescript
import { generateArticleSchema } from '../lib/schema';

const schema = generateArticleSchema({
  title: "Post Title",
  description: "Post description",
  slug: "post-slug",
  pubDate: new Date("2026-01-05"),
  updatedDate: new Date("2026-01-06"),  // optional
  heroImage: "/blog-placeholder-1.jpg", // optional
  author: "Vibe Coder",                 // optional
  category: "ai-news",                  // optional
  tags: ["AI", "Tutorial"],             // optional
  wordCount: 1500,                      // optional
});
```

### 2. WebSite Schema

For the homepage. Establishes site identity for search engines.

```typescript
import { generateWebSiteSchema } from '../lib/schema';

const schema = generateWebSiteSchema();
```

### 3. WebPage Schema

For non-article pages (About, Contact, Categories, etc.)

```typescript
import { generateWebPageSchema, generateAboutPageSchema, generateCollectionPageSchema } from '../lib/schema';

// Generic WebPage
const pageSchema = generateWebPageSchema({
  title: "Page Title",
  description: "Description",
  url: "/page-path",
  type: "WebPage",  // or "AboutPage", "CollectionPage"
});

// Shortcuts
const aboutSchema = generateAboutPageSchema("Description");
const categorySchema = generateCollectionPageSchema("Title", "Desc", "/url");
```

### 4. Breadcrumb Schema

For navigation paths. Helps search engines understand site structure.

```typescript
import { generateBreadcrumbSchema, generateBlogPostBreadcrumbSchema } from '../lib/schema';

// Custom breadcrumb
const breadcrumb = generateBreadcrumbSchema(
  [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: 'Current Post' }  // no URL for current page
  ],
  '/blog/current-post/'  // current path
);

// Blog post breadcrumb helper
const blogBreadcrumb = generateBlogPostBreadcrumbSchema(
  "Post Title",
  "post-slug",
  "ai-news",        // category slug
  "AI News"         // category name
);
```

### 5. Organization Schema

For the publisher/organization. Automatically used in article schema.

```typescript
import { getOrganizationSchema } from '../lib/schema';

const orgSchema = getOrganizationSchema();
```

### 6. Person/Author Schema

For author information. Automatically used in article schema.

```typescript
import { getDefaultAuthorSchema, getAuthorSchema } from '../lib/schema';

const authorSchema = getDefaultAuthorSchema();
const guestAuthor = getAuthorSchema("Guest Author Name");
```

---

## Combining Multiple Schemas

Google supports multiple schemas per page. Use the `schemas` prop:

```astro
---
import { 
  generateArticleSchema, 
  generateBlogPostBreadcrumbSchema,
  type Schema 
} from '../lib/schema';

const schemas: Schema[] = [
  generateArticleSchema({ ... }),
  generateBlogPostBreadcrumbSchema("Title", "slug", "category", "Category Name"),
];
---

<JsonLd schemas={schemas} />
```

Or with BaseLayout:

```astro
<BaseLayout schemas={schemas}>
  <!-- content -->
</BaseLayout>
```

---

## File Structure

```
src/lib/schema/
├── index.ts              # Main exports & utilities
├── types.ts              # TypeScript interfaces
├── config.ts             # Organization & author config
└── generators/
    ├── article.ts        # BlogPosting schema
    ├── website.ts        # WebSite schema
    ├── webpage.ts        # WebPage schema
    └── breadcrumb.ts     # BreadcrumbList schema

src/components/seo/
└── JsonLd.astro          # Universal JSON-LD component
```

---

## Required Properties by Schema Type

### BlogPosting (per Google)

| Property | Required | Notes |
|----------|----------|-------|
| `headline` | ✅ Yes | From `title` |
| `image` | ✅ Yes | From `heroImage` |
| `datePublished` | ✅ Yes | From `pubDate` |
| `author` | ✅ Yes | With `name` and `url` |
| `dateModified` | Recommended | From `updatedDate` |
| `description` | Recommended | From `description` |
| `publisher` | Recommended | Auto-populated |

### WebSite (per Google)

| Property | Required | Notes |
|----------|----------|-------|
| `name` | ✅ Yes | Site name |
| `url` | ✅ Yes | Site URL |
| `publisher` | Recommended | Organization |

### BreadcrumbList (per Google)

| Property | Required | Notes |
|----------|----------|-------|
| `itemListElement` | ✅ Yes | Array of ListItem |
| Each ListItem: `position`, `name` | ✅ Yes | |
| Each ListItem: `item` (url) | ✅ Yes (except last) | Not needed for current page |

---

## Testing & Validation

### Development Testing

1. Run `npm run dev`
2. Open a page in browser
3. View source or inspect head
4. Look for `<script type="application/ld+json">`

### Google Tools

- **Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Markup Validator**: https://validator.schema.org/

### Common Validation Errors

| Error | Fix |
|-------|-----|
| Missing `image` | Ensure `heroImage` is set in frontmatter |
| Missing `author.url` | Author schema includes `url` to about page |
| Invalid date format | Use ISO 8601 format (auto-handled) |
| Multiple `@context` | Use `combineSchemas()` for multiple schemas |

---

## Adding New Schema Types

1. Add TypeScript interface in `types.ts`
2. Create generator in `generators/` folder
3. Export from `index.ts`
4. Use in page component

Example for FAQ schema:

```typescript
// In types.ts
export interface FAQPageSchema extends SchemaBase {
  '@type': 'FAQPage';
  mainEntity: FAQQuestion[];
}

// In generators/faq.ts
export function generateFAQSchema(questions: {q: string, a: string}[]): FAQPageSchema {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.a,
      },
    })),
  };
}
```

---

## Best Practices

1. **Use type-safe imports** — Always import `type Schema` for type checking
2. **Combine related schemas** — Use the `@graph` pattern via `combineSchemas()`
3. **Test with Google tools** — Validate before deploying
4. **Keep schema in sync** — Update when content changes
5. **Use consistent `@id`** — Allows cross-referencing between schemas

---

## 🎯 Google Compliance Status (2026)

### Current Implementation: ✅ Fully Compliant

Our schema implementation follows Google's recommended best practices for blogs:

| Schema Type | Status | Purpose |
|-------------|--------|---------|
| **BlogPosting** | ✅ Active | Article rich results, AI Overview eligibility |
| **BreadcrumbList** | ✅ Active | Site structure display in SERPs |
| **Person (Author)** | ✅ Active | E-E-A-T signals, author knowledge panel |
| **Organization** | ✅ Active | Publisher info, brand knowledge panel |
| **WebSite** | ✅ Active | Sitelinks search box eligibility |
| **WebPage** | ✅ Active | Page context for search engines |

### Schema Types NOT Implemented (By Design)

| Schema Type | Status | Reason |
|-------------|--------|--------|
| **FAQPage** | ❌ Not using | Rich results deprecated Aug 2023 for content sites |
| **HowTo** | ❌ Not using | Rich results deprecated Aug 2023 for content sites |
| **Review/Rating** | ❌ Not using | Would require actual product reviews with ratings |

> **Important:** Google deprecated FAQ and HowTo rich results in August 2023 for generic websites. While the types are defined in `types.ts` for reference, implementing them provides no SEO benefit for blog content.

### What Actually Helps Rankings

| Factor | Impact | Our Status |
|--------|--------|------------|
| Article schema with author | Required for article features | ✅ Implemented |
| Author `sameAs` links | E-E-A-T signals | ✅ Implemented |
| Author image | E-E-A-T enhancement | ✅ Implemented |
| Breadcrumb schema | Site structure | ✅ Implemented |
| Content quality | Primary ranking factor | ✅ Via blog workflows |
| Page speed | Direct ranking signal | Verify regularly |

### When to Add More Schema Types

Only consider adding FAQ/HowTo/Review schemas if:
- You're a government, health, or educational site (still get rich results)
- Building for third-party tools that consume schema.org data
- Future Google policy changes restore rich results

---

## Validation Checklist

Before deploying, test with:

1. **Rich Results Test:** https://search.google.com/test/rich-results
2. **Schema Markup Validator:** https://validator.schema.org/

**Expected results:**
- BlogPosting: Should show "Article" rich result eligibility
- BreadcrumbList: Should show breadcrumb eligibility
- No errors or warnings

---

*Last updated: 2026-01-11*
*Status: Google compliant - no additional schema types needed*
