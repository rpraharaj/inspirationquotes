---
description: Code standards - file structure, naming conventions, and engineering best practices.
---

# 🏗️ Code Standards

## File Structure

```
cf-worker-template/
├── .agent/workflows/     # Agent workflows and rules
├── public/               # Static assets (images, fonts)
├── src/
│   ├── components/       # Reusable Astro components
│   ├── content/          # MDX content (blog posts)
│   ├── layouts/          # Page layouts
│   ├── pages/            # Route pages
│   ├── types/            # TypeScript type definitions
│   └── styles/           # Global CSS
├── astro.config.mjs      # Astro configuration
├── tailwind.config.mjs   # Tailwind configuration
└── wrangler.json         # Cloudflare configuration
```

## Directory Organization

| Directory | Purpose | File Types |
|-----------|---------|------------|
| `src/components/` | Reusable UI components | `.astro` |
| `src/components/ui/` | Atomic UI elements (Button, Card, Icon) | `.astro` |
| `src/content/blog/` | Blog posts | `.mdx`, `.md` |
| `src/layouts/` | Page templates | `.astro` |
| `src/pages/` | Route definitions | `.astro` |
| `src/styles/` | Global styles | `.css` |
| `src/lib/` | Utility functions | `.ts` |
| `src/types/` | TypeScript type definitions | `.ts` |
| `public/images/` | Static images | `.webp`, `.svg` |
| `public/fonts/` | Web fonts | `.woff`, `.woff2` |

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `BlogCard.astro` |
| Pages | kebab-case | `about-us.astro` |
| Layouts | PascalCase | `BlogPost.astro` |
| Utilities | camelCase | `formatDate.ts` |
| Content | kebab-case | `my-first-post.mdx` |
| CSS | kebab-case | `global.css` |
| Config | kebab-case | `astro.config.mjs` |

---

## Maximum File Lengths

| File Type | Max Lines | Action if Exceeded |
|-----------|-----------|-------------------|
| Components (`.astro`) | 200 lines | Split into smaller components |
| Pages (`.astro`) | 150 lines | Extract logic to components |
| Utilities (`.ts`) | 100 lines | Split into separate functions |
| Config files | 100 lines | Use imports for large configs |
| MDX content | No limit* | Focus on readability |

---

## Component Structure Template

```astro
---
// 1. Imports (external, then internal)
import ExternalLib from 'external-lib';
import LocalComponent from './LocalComponent.astro';

// 2. Type definitions
interface Props {
  title: string;
  description?: string;
}

// 3. Props destructuring with defaults
const { title, description = '' } = Astro.props;

// 4. Computed values / logic
const formattedTitle = title.toUpperCase();
---

<!-- 5. Template (HTML) -->
<div class="component">
  <h2>{formattedTitle}</h2>
  {description && <p>{description}</p>}
  <slot />
</div>

<!-- 6. Scoped styles (if needed) -->
<style>
  .component { /* styles */ }
</style>

<!-- 7. Client-side scripts (if needed) -->
<script>
  // Minimal JS
</script>
```

---

## Code Quality Principles

### DRY (Don't Repeat Yourself)
- [ ] Extract repeated code into reusable components
- [ ] Create utility functions for common operations
- [ ] Use slots and props for component variations

### KISS (Keep It Simple, Stupid)
- [ ] Prefer simple solutions over clever ones
- [ ] Avoid premature optimization
- [ ] Write code that's easy to understand

### YAGNI (You Aren't Gonna Need It)
- [ ] Don't add features "just in case"
- [ ] Build what's needed now, refactor later
- [ ] Remove unused code

---

## Component Design Principles

| Principle | Description |
|-----------|-------------|
| **Single Responsibility** | Each component does ONE thing well |
| **Composability** | Components work together via slots/props |
| **Isolation** | Components don't depend on global state |
| **Accessibility** | Built-in ARIA, keyboard support |

### When to Create a New Component

Create a new component when:
- [ ] Code is repeated 2+ times
- [ ] Logic is complex enough to extract
- [ ] Component has clear, single purpose
- [ ] It improves readability

Don't create a new component when:
- ❌ It's only used once AND is simple
- ❌ It creates unnecessary abstraction
- ❌ It makes code harder to follow

---

## Props Best Practices

```typescript
// ✅ Good: Typed props with defaults
interface Props {
  title: string;           // Required
  size?: 'sm' | 'md' | 'lg'; // Optional with union type
  isActive?: boolean;      // Optional boolean
}

const { 
  title, 
  size = 'md', 
  isActive = false 
} = Astro.props;

// ❌ Bad: Untyped, no defaults
const { title, size, isActive } = Astro.props;
```

---

## Git Commit Conventions

| Type | Format | Example |
|------|--------|---------|
| Feature | `feat: description` | `feat: add dark mode toggle` |
| Fix | `fix: description` | `fix: correct meta description` |
| Refactor | `refactor: description` | `refactor: extract Header component` |
| Docs | `docs: description` | `docs: update README` |
| Style | `style: description` | `style: format CSS files` |
| Perf | `perf: description` | `perf: optimize images` |

---

*Last updated: 2026-01-05*
