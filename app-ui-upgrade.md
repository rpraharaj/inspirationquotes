# Astro Blog UI Upgrade Plan

## Executive Summary

This document outlines a comprehensive strategy to upgrade the Astro blog template to a modern, professional-grade design using only black and white colors with full dark/light mode support. The primary constraint is maintaining the current 100/100 PageSpeed score.

---

## Current State Analysis

### Existing Architecture
- **Framework**: Astro 5.16.2 with Cloudflare adapter
- **Styling**: Custom CSS in `src/styles/global.css` with CSS variables
- **Font**: Atkinson (self-hosted, already optimized with `font-display: swap`)
- **Pages**: Home, About, Blog listing, Blog posts
- **Components**: BaseHead, Header, Footer, HeaderLink, FormattedDate
- **Layout**: BlogPost.astro

### Current CSS Variables
```css
--accent: #2337ff;
--accent-dark: #000d8a;
--black: 15, 18, 25;
--gray: 96, 115, 159;
--gray-light: 229, 233, 240;
--gray-dark: 34, 41, 57;
```

### Performance Baseline
- Font preloading already implemented
- No external CSS frameworks
- Minimal JavaScript
- Static site generation

---

## Design Philosophy

### Color Palette (Black & White Only)

#### Light Mode
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#FFFFFF` | Page background |
| `--bg-secondary` | `#FAFAFA` | Cards, sections |
| `--bg-tertiary` | `#F5F5F5` | Code blocks, hover states |
| `--text-primary` | `#000000` | Headings, primary text |
| `--text-secondary` | `#404040` | Body text |
| `--text-tertiary` | `#737373` | Captions, metadata |
| `--border` | `#E5E5E5` | Borders, dividers |
| `--border-strong` | `#D4D4D4` | Emphasized borders |

#### Dark Mode
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#000000` | Page background |
| `--bg-secondary` | `#0A0A0A` | Cards, sections |
| `--bg-tertiary` | `#171717` | Code blocks, hover states |
| `--text-primary` | `#FFFFFF` | Headings, primary text |
| `--text-secondary` | `#E5E5E5` | Body text |
| `--text-tertiary` | `#A3A3A3` | Captions, metadata |
| `--border` | `#262626` | Borders, dividers |
| `--border-strong` | `#404040` | Emphasized borders |

### Typography Scale (Fluid)
Using `clamp()` for responsive typography without media queries:

```css
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
--text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
--text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
--text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
--text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
--text-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem);
--text-4xl: clamp(2.25rem, 1.75rem + 2.5vw, 3.5rem);
```

### Spacing System
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-24: 6rem;     /* 96px */
```

---

## Tailwind CSS Integration Strategy

### Why Tailwind CSS?
1. **Utility-first**: No unused CSS in production (PurgeCSS built-in)
2. **JIT Mode**: Generates only used classes at build time
3. **Dark mode**: Native support with `dark:` prefix
4. **Performance**: Smaller CSS bundle than custom CSS when properly configured

### Installation (Performance-Optimized)

```bash
npm install -D tailwindcss @astrojs/tailwind
```

### Astro Configuration Update

```javascript
// astro.config.mjs
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://example.com",
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: false, // We'll use our own base styles
    }),
  ],
  adapter: cloudflare({
    platformProxy: { enabled: true },
  }),
});
```

### Tailwind Configuration

```javascript
// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Semantic color tokens
        background: {
          DEFAULT: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
        },
        foreground: {
          DEFAULT: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
        },
        border: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
        },
      },
      fontFamily: {
        sans: ['Atkinson', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        base: 'var(--text-base)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        'prose': '65ch',
        'content': '720px',
        'wide': '960px',
      },
      transitionDuration: {
        DEFAULT: '150ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
```

---

## Performance-First Implementation

### Critical CSS Strategy

#### 1. Inline Critical CSS
For above-the-fold content, inline critical styles directly in `<head>`:

```astro
<!-- BaseHead.astro -->
<style is:inline>
  :root {
    --bg-primary: #FFFFFF;
    --bg-secondary: #FAFAFA;
    --bg-tertiary: #F5F5F5;
    --text-primary: #000000;
    --text-secondary: #404040;
    --text-tertiary: #737373;
    --border: #E5E5E5;
    --border-strong: #D4D4D4;
  }
  
  .dark {
    --bg-primary: #000000;
    --bg-secondary: #0A0A0A;
    --bg-tertiary: #171717;
    --text-primary: #FFFFFF;
    --text-secondary: #E5E5E5;
    --text-tertiary: #A3A3A3;
    --border: #262626;
    --border-strong: #404040;
  }
  
  html { background-color: var(--bg-primary); }
  body { 
    color: var(--text-primary);
    font-family: 'Atkinson', system-ui, sans-serif;
  }
</style>
```

#### 2. Dark Mode Toggle (Zero Layout Shift)

```astro
<!-- ThemeToggle.astro -->
---
---
<button
  id="theme-toggle"
  type="button"
  class="p-2 rounded-lg hover:bg-tertiary transition-colors"
  aria-label="Toggle dark mode"
>
  <svg class="w-5 h-5 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
    <!-- Sun icon -->
    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
  </svg>
  <svg class="w-5 h-5 block dark:hidden" fill="currentColor" viewBox="0 0 20 20">
    <!-- Moon icon -->
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
  </svg>
</button>

<script is:inline>
  // Prevent FOUC - runs before page renders
  (function() {
    const theme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  })();
</script>

<script>
  const toggle = document.getElementById('theme-toggle');
  toggle?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
</script>
```

#### 3. Flash of Unstyled Content (FOUC) Prevention

Add this script to `BaseHead.astro` BEFORE any stylesheets:

```html
<script is:inline>
  // Must be inline and in <head> to prevent flash
  const theme = (() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  })();
  document.documentElement.classList.toggle('dark', theme === 'dark');
</script>
```

---

## Component Redesign Specifications

### Header Component

```astro
<!-- Header.astro -->
---
import HeaderLink from './HeaderLink.astro';
import ThemeToggle from './ThemeToggle.astro';
import { SITE_TITLE } from '../consts';
---

<header class="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
  <nav class="mx-auto flex h-16 max-w-wide items-center justify-between px-4 sm:px-6">
    <!-- Logo -->
    <a 
      href="/" 
      class="text-lg font-bold tracking-tight text-foreground hover:text-foreground-secondary transition-colors"
    >
      {SITE_TITLE}
    </a>
    
    <!-- Navigation Links -->
    <div class="hidden sm:flex items-center gap-8">
      <HeaderLink href="/">Home</HeaderLink>
      <HeaderLink href="/blog">Blog</HeaderLink>
      <HeaderLink href="/about">About</HeaderLink>
    </div>
    
    <!-- Actions -->
    <div class="flex items-center gap-4">
      <ThemeToggle />
      
      <!-- Mobile Menu Button -->
      <button 
        id="mobile-menu-btn"
        class="sm:hidden p-2 -mr-2 hover:bg-tertiary rounded-lg transition-colors"
        aria-label="Open menu"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </div>
  </nav>
  
  <!-- Mobile Menu -->
  <div id="mobile-menu" class="hidden sm:hidden border-t border-border">
    <div class="px-4 py-4 space-y-2">
      <a href="/" class="block py-2 text-foreground hover:text-foreground-secondary">Home</a>
      <a href="/blog" class="block py-2 text-foreground hover:text-foreground-secondary">Blog</a>
      <a href="/about" class="block py-2 text-foreground hover:text-foreground-secondary">About</a>
    </div>
  </div>
</header>

<script>
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  btn?.addEventListener('click', () => menu?.classList.toggle('hidden'));
</script>
```

### HeaderLink Component

```astro
<!-- HeaderLink.astro -->
---
import type { HTMLAttributes } from 'astro/types';

type Props = HTMLAttributes<'a'>;

const { href, class: className, ...props } = Astro.props;
const pathname = Astro.url.pathname.replace(import.meta.env.BASE_URL, '');
const subpath = pathname.match(/[^\/]+/g);
const isActive = href === pathname || href === '/' + (subpath?.[0] || '');
---

<a 
  href={href} 
  class:list={[
    'relative py-1 text-sm font-medium transition-colors',
    isActive 
      ? 'text-foreground' 
      : 'text-foreground-tertiary hover:text-foreground',
    className
  ]} 
  {...props}
>
  <slot />
  {isActive && (
    <span class="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-foreground" />
  )}
</a>
```

### Footer Component

```astro
<!-- Footer.astro -->
---
const today = new Date();
---

<footer class="border-t border-border bg-background">
  <div class="mx-auto max-w-wide px-4 sm:px-6 py-12">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
      <!-- Copyright -->
      <p class="text-sm text-foreground-tertiary">
        &copy; {today.getFullYear()} Your Name. All rights reserved.
      </p>
      
      <!-- Social Links -->
      <div class="flex items-center gap-4">
        <a 
          href="https://github.com/yourusername" 
          target="_blank"
          rel="noopener noreferrer"
          class="p-2 text-foreground-tertiary hover:text-foreground transition-colors"
          aria-label="GitHub"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
        <a 
          href="https://twitter.com/yourusername" 
          target="_blank"
          rel="noopener noreferrer"
          class="p-2 text-foreground-tertiary hover:text-foreground transition-colors"
          aria-label="Twitter"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</footer>
```

---

## Page-by-Page Redesign

### Home Page (index.astro)

```astro
---
import BaseHead from '../components/BaseHead.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
---

<!doctype html>
<html lang="en">
  <head>
    <BaseHead title={SITE_TITLE} description={SITE_DESCRIPTION} />
  </head>
  <body class="bg-background text-foreground min-h-screen flex flex-col">
    <Header />
    <main class="flex-1">
      <!-- Hero Section -->
      <section class="py-24 sm:py-32">
        <div class="mx-auto max-w-content px-4 sm:px-6 text-center">
          <h1 class="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            Welcome to My Blog
          </h1>
          <p class="text-lg text-foreground-secondary max-w-prose mx-auto mb-8">
            Thoughts on web development, design, and building products that matter.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/blog" 
              class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium bg-foreground text-background rounded-lg hover:bg-foreground-secondary transition-colors"
            >
              Read the Blog
            </a>
            <a 
              href="/about" 
              class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium border border-border rounded-lg hover:bg-secondary transition-colors"
            >
              About Me
            </a>
          </div>
        </div>
      </section>
      
      <!-- Features/Info Section -->
      <section class="py-16 border-t border-border">
        <div class="mx-auto max-w-wide px-4 sm:px-6">
          <div class="grid sm:grid-cols-3 gap-8">
            <div class="text-center sm:text-left">
              <h3 class="text-lg font-semibold mb-2">Fast & Minimal</h3>
              <p class="text-foreground-secondary text-sm">
                Built with Astro for lightning-fast performance.
              </p>
            </div>
            <div class="text-center sm:text-left">
              <h3 class="text-lg font-semibold mb-2">Dark Mode</h3>
              <p class="text-foreground-secondary text-sm">
                Automatic theme detection with manual toggle.
              </p>
            </div>
            <div class="text-center sm:text-left">
              <h3 class="text-lg font-semibold mb-2">SEO Ready</h3>
              <p class="text-foreground-secondary text-sm">
                Optimized meta tags and structured data.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </body>
</html>
```

### Blog Listing Page (blog/index.astro)

```astro
---
import BaseHead from '../../components/BaseHead.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import { SITE_TITLE, SITE_DESCRIPTION } from '../../consts';
import { getCollection } from 'astro:content';
import FormattedDate from '../../components/FormattedDate.astro';

const posts = (await getCollection('blog')).sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
);
---

<!doctype html>
<html lang="en">
  <head>
    <BaseHead title={`Blog | ${SITE_TITLE}`} description={SITE_DESCRIPTION} />
  </head>
  <body class="bg-background text-foreground min-h-screen flex flex-col">
    <Header />
    <main class="flex-1 py-16">
      <div class="mx-auto max-w-wide px-4 sm:px-6">
        <!-- Page Header -->
        <header class="mb-12">
          <h1 class="text-3xl font-bold tracking-tight mb-4">Blog</h1>
          <p class="text-foreground-secondary">
            Latest articles and thoughts.
          </p>
        </header>
        
        <!-- Posts Grid -->
        <div class="grid gap-8 sm:grid-cols-2">
          {posts.map((post, index) => (
            <article 
              class:list={[
                'group',
                index === 0 && 'sm:col-span-2'
              ]}
            >
              <a href={`/blog/${post.id}/`} class="block">
                <!-- Image -->
                <div class="aspect-[16/9] overflow-hidden rounded-lg bg-secondary mb-4">
                  <img 
                    src={post.data.heroImage} 
                    alt=""
                    width={index === 0 ? 960 : 480}
                    height={index === 0 ? 540 : 270}
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading={index < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
                
                <!-- Content -->
                <div class={index === 0 ? 'max-w-2xl' : ''}>
                  <time class="text-sm text-foreground-tertiary">
                    <FormattedDate date={post.data.pubDate} />
                  </time>
                  <h2 class:list={[
                    'font-semibold mt-2 group-hover:underline underline-offset-4',
                    index === 0 ? 'text-2xl' : 'text-lg'
                  ]}>
                    {post.data.title}
                  </h2>
                  {post.data.description && (
                    <p class="text-foreground-secondary mt-2 line-clamp-2">
                      {post.data.description}
                    </p>
                  )}
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </body>
</html>
```

### Blog Post Layout (layouts/BlogPost.astro)

```astro
---
import type { CollectionEntry } from 'astro:content';
import BaseHead from '../components/BaseHead.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import FormattedDate from '../components/FormattedDate.astro';

type Props = CollectionEntry<'blog'>['data'];

const { title, description, pubDate, updatedDate, heroImage } = Astro.props;
---

<html lang="en">
  <head>
    <BaseHead title={title} description={description} />
  </head>
  <body class="bg-background text-foreground min-h-screen flex flex-col">
    <Header />
    <main class="flex-1">
      <article>
        <!-- Hero Image -->
        {heroImage && (
          <div class="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-8">
            <img 
              src={heroImage} 
              alt=""
              width={1020}
              height={510}
              class="w-full rounded-xl"
              loading="eager"
              decoding="async"
            />
          </div>
        )}
        
        <!-- Article Content -->
        <div class="mx-auto max-w-content px-4 sm:px-6 py-12">
          <!-- Meta -->
          <header class="mb-8 pb-8 border-b border-border">
            <div class="flex items-center gap-2 text-sm text-foreground-tertiary mb-4">
              <FormattedDate date={pubDate} />
              {updatedDate && (
                <>
                  <span>·</span>
                  <span>Updated <FormattedDate date={updatedDate} /></span>
                </>
              )}
            </div>
            <h1 class="text-3xl sm:text-4xl font-bold tracking-tight">
              {title}
            </h1>
            {description && (
              <p class="text-lg text-foreground-secondary mt-4">
                {description}
              </p>
            )}
          </header>
          
          <!-- Prose Content -->
          <div class="prose prose-neutral dark:prose-invert max-w-none">
            <slot />
          </div>
        </div>
      </article>
    </main>
    <Footer />
  </body>
</html>
```

---

## Global Styles (global.css)

```css
/* src/styles/global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ============================================
   CSS Custom Properties (Design Tokens)
   ============================================ */
:root {
  /* Light Mode Colors */
  --bg-primary: #FFFFFF;
  --bg-secondary: #FAFAFA;
  --bg-tertiary: #F5F5F5;
  --text-primary: #000000;
  --text-secondary: #404040;
  --text-tertiary: #737373;
  --border: #E5E5E5;
  --border-strong: #D4D4D4;
  
  /* Typography Scale */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
  --text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
  --text-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem);
  --text-4xl: clamp(2.25rem, 1.75rem + 2.5vw, 3.5rem);
}

.dark {
  --bg-primary: #000000;
  --bg-secondary: #0A0A0A;
  --bg-tertiary: #171717;
  --text-primary: #FFFFFF;
  --text-secondary: #E5E5E5;
  --text-tertiary: #A3A3A3;
  --border: #262626;
  --border-strong: #404040;
}

/* ============================================
   Base Styles
   ============================================ */
@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  body {
    font-family: 'Atkinson', system-ui, -apple-system, sans-serif;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.7;
    font-size: var(--text-base);
  }
  
  /* Focus styles for accessibility */
  :focus-visible {
    outline: 2px solid var(--text-primary);
    outline-offset: 2px;
  }
  
  /* Selection */
  ::selection {
    background-color: var(--text-primary);
    color: var(--bg-primary);
  }
}

/* ============================================
   Font Face (Keep existing - already optimized)
   ============================================ */
@font-face {
  font-family: 'Atkinson';
  src: url('/fonts/atkinson-regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Atkinson';
  src: url('/fonts/atkinson-bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* ============================================
   Prose Styles (for blog content)
   ============================================ */
@layer components {
  .prose {
    --prose-body: var(--text-secondary);
    --prose-headings: var(--text-primary);
    --prose-links: var(--text-primary);
    --prose-code: var(--text-primary);
    --prose-pre-bg: var(--bg-tertiary);
    --prose-borders: var(--border);
    --prose-quotes: var(--text-tertiary);
  }
  
  .prose h1, .prose h2, .prose h3, .prose h4 {
    color: var(--prose-headings);
    font-weight: 700;
    line-height: 1.3;
    margin-top: 2em;
    margin-bottom: 0.5em;
  }
  
  .prose h1 { font-size: var(--text-3xl); }
  .prose h2 { font-size: var(--text-2xl); }
  .prose h3 { font-size: var(--text-xl); }
  .prose h4 { font-size: var(--text-lg); }
  
  .prose p {
    color: var(--prose-body);
    margin-bottom: 1.5em;
  }
  
  .prose a {
    color: var(--prose-links);
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: opacity 0.15s;
  }
  
  .prose a:hover {
    opacity: 0.7;
  }
  
  .prose code {
    background-color: var(--prose-pre-bg);
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-size: 0.9em;
  }
  
  .prose pre {
    background-color: var(--prose-pre-bg);
    padding: 1.25rem;
    border-radius: 8px;
    overflow-x: auto;
  }
  
  .prose pre code {
    background: none;
    padding: 0;
  }
  
  .prose blockquote {
    border-left: 3px solid var(--prose-borders);
    padding-left: 1rem;
    color: var(--prose-quotes);
    font-style: italic;
  }
  
  .prose ul, .prose ol {
    padding-left: 1.5rem;
    margin-bottom: 1.5em;
  }
  
  .prose li {
    margin-bottom: 0.5em;
  }
  
  .prose img {
    border-radius: 8px;
    margin: 2em 0;
  }
  
  .prose hr {
    border: none;
    border-top: 1px solid var(--prose-borders);
    margin: 3em 0;
  }
}

/* ============================================
   Utility Classes
   ============================================ */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

/* ============================================
   Screen Reader Only (Accessibility)
   ============================================ */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## Performance Optimization Checklist

### Critical Rendering Path

| Optimization | Implementation | Impact |
|--------------|----------------|--------|
| Inline critical CSS | Theme variables in `<head>` | Prevents FOUC |
| Font preloading | Already implemented | Faster text rendering |
| `font-display: swap` | Already implemented | No invisible text |
| Async theme script | Inline in `<head>` | No layout shift |

### Image Optimization

```astro
<!-- Use native lazy loading -->
<img 
  src={image} 
  alt={alt}
  width={width}
  height={height}
  loading="lazy"
  decoding="async"
/>

<!-- For above-the-fold images -->
<img 
  src={heroImage} 
  alt=""
  width={1020}
  height={510}
  loading="eager"
  decoding="async"
  fetchpriority="high"
/>
```

### CSS Optimization

1. **Tailwind JIT Mode**: Only generates used classes
2. **PurgeCSS**: Automatically removes unused CSS in production
3. **No external CSS**: All styles bundled and minified
4. **CSS Variables**: Minimal runtime overhead for theming

### JavaScript Optimization

1. **Minimal JS**: Only theme toggle requires JavaScript
2. **Inline scripts**: No external JS files to fetch
3. **No framework runtime**: Pure Astro components
4. **Event delegation**: Single event listener for mobile menu

---

## Implementation Phases

### Phase 1: Foundation (Day 1)
1. Install Tailwind CSS and configure
2. Update `global.css` with new design tokens
3. Add dark mode script to `BaseHead.astro`
4. Create `ThemeToggle.astro` component

### Phase 2: Components (Day 2)
1. Redesign `Header.astro` with mobile menu
2. Update `HeaderLink.astro` with new styles
3. Redesign `Footer.astro`
4. Update `FormattedDate.astro` styling

### Phase 3: Pages (Day 3)
1. Redesign `index.astro` (Home page)
2. Redesign `blog/index.astro` (Blog listing)
3. Update `BlogPost.astro` layout
4. Update `about.astro` page

### Phase 4: Polish & Testing (Day 4)
1. Cross-browser testing
2. Mobile responsiveness verification
3. Accessibility audit (WCAG 2.1 AA)
4. PageSpeed Insights verification
5. Dark mode testing

---

## Performance Verification

### PageSpeed Insights Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| FCP (First Contentful Paint) | < 1.0s | Inline critical CSS, font preload |
| LCP (Largest Contentful Paint) | < 2.5s | Optimize hero images, eager loading |
| CLS (Cumulative Layout Shift) | < 0.1 | Fixed dimensions, no FOUC |
| TBT (Total Blocking Time) | < 200ms | Minimal JS, no heavy computations |
| Speed Index | < 3.0s | Progressive rendering |

### Testing Commands

```bash
# Build and preview locally
npm run build
npm run preview

# Run Lighthouse audit
npx lighthouse http://localhost:4321 --view

# Check bundle size
npx astro build --verbose
```

### Monitoring Checklist

- [ ] Run PageSpeed Insights on all pages
- [ ] Verify Core Web Vitals in Chrome DevTools
- [ ] Test on slow 3G network throttling
- [ ] Verify no layout shifts during theme toggle
- [ ] Check accessibility with axe DevTools

---

## Accessibility Considerations

### Color Contrast (WCAG 2.1 AA)

| Element | Light Mode | Dark Mode | Ratio |
|---------|------------|-----------|-------|
| Primary text on background | #000 on #FFF | #FFF on #000 | 21:1 ✓ |
| Secondary text | #404040 on #FFF | #E5E5E5 on #000 | 9.7:1 ✓ |
| Tertiary text | #737373 on #FFF | #A3A3A3 on #000 | 4.6:1 ✓ |

### Keyboard Navigation

```css
/* Visible focus indicators */
:focus-visible {
  outline: 2px solid var(--text-primary);
  outline-offset: 2px;
}

/* Skip to main content link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px;
  background: var(--bg-primary);
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

### Screen Reader Support

- All interactive elements have accessible names
- Images have appropriate alt text
- Theme toggle has `aria-label`
- Mobile menu button has `aria-label`
- Social links have `sr-only` text descriptions

---

## File Structure After Upgrade

```
src/
├── components/
│   ├── BaseHead.astro      # Updated with theme script
│   ├── Footer.astro        # Redesigned
│   ├── FormattedDate.astro # Minor styling updates
│   ├── Header.astro        # Redesigned with mobile menu
│   ├── HeaderLink.astro    # Updated styling
│   └── ThemeToggle.astro   # NEW - Dark mode toggle
├── layouts/
│   └── BlogPost.astro      # Redesigned
├── pages/
│   ├── about.astro         # Updated styling
│   ├── index.astro         # Redesigned
│   ├── rss.xml.js          # No changes needed
│   └── blog/
│       ├── index.astro     # Redesigned
│       └── [...slug].astro # No changes needed
├── styles/
│   └── global.css          # Complete rewrite with Tailwind
├── consts.ts               # No changes needed
└── content.config.ts       # No changes needed

Root files:
├── astro.config.mjs        # Add Tailwind integration
├── tailwind.config.mjs     # NEW - Tailwind configuration
└── package.json            # Add Tailwind dependencies
```

---

## Potential Performance Pitfalls to Avoid

### ❌ Don't Do This

1. **External fonts**: Don't add Google Fonts or other external font services
2. **Heavy animations**: Avoid complex CSS animations or transitions
3. **Large images**: Don't use unoptimized images without width/height
4. **External CSS**: Don't link to external stylesheets
5. **Heavy JS libraries**: Don't add React, Vue, or other frameworks
6. **Web fonts overload**: Don't add more than 2 font weights
7. **Render-blocking resources**: Don't add synchronous scripts in `<head>`

### ✅ Do This Instead

1. **Self-hosted fonts**: Keep using local Atkinson font
2. **CSS transitions only**: Use simple `transition-colors` and `transition-transform`
3. **Optimized images**: Always specify width/height, use lazy loading
4. **Bundled CSS**: Let Astro bundle and minify all styles
5. **Vanilla JS**: Use minimal inline scripts for interactivity
6. **Font subsetting**: Consider subsetting fonts if bundle size is a concern
7. **Async/defer scripts**: All scripts should be non-blocking

---

## Quick Reference: Tailwind Classes Used

### Layout
- `flex`, `flex-col`, `items-center`, `justify-between`, `gap-*`
- `grid`, `sm:grid-cols-2`, `sm:col-span-2`
- `mx-auto`, `max-w-content`, `max-w-wide`, `max-w-prose`
- `px-4`, `sm:px-6`, `py-*`

### Typography
- `text-sm`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`
- `font-medium`, `font-semibold`, `font-bold`
- `tracking-tight`, `leading-*`

### Colors (Custom)
- `bg-background`, `bg-secondary`, `bg-tertiary`
- `text-foreground`, `text-foreground-secondary`, `text-foreground-tertiary`
- `border-border`, `border-border-strong`

### Interactive
- `hover:bg-*`, `hover:text-*`, `hover:underline`
- `transition-colors`, `transition-transform`
- `group`, `group-hover:*`

### Responsive
- `sm:*` (640px+), `md:*` (768px+), `lg:*` (1024px+)
- `hidden`, `sm:flex`, `sm:hidden`

### Dark Mode
- `dark:*` prefix for all dark mode variants

---

## Summary

This upgrade plan transforms the Astro blog template into a modern, professional-grade design while maintaining the 100/100 PageSpeed score through:

1. **Minimal color palette**: Pure black and white with semantic tokens
2. **Tailwind CSS**: JIT compilation ensures zero unused CSS
3. **Native dark mode**: CSS variables with class-based toggling
4. **Performance-first approach**: Inline critical CSS, optimized images, minimal JS
5. **Accessibility compliance**: WCAG 2.1 AA color contrast, keyboard navigation
6. **Progressive enhancement**: Works without JavaScript, enhanced with it

The implementation can be completed in 4 days with careful attention to performance metrics at each phase.
