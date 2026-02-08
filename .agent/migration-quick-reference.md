# Quick Reference: Migration Paths

This document provides a quick overview of migration options between Cloudflare Pages (static) and Cloudflare Workers.

---

## Current Setup: Cloudflare Pages (Static)

✅ **Zero Worker requests**  
✅ **Pure static HTML/CSS/JS**  
✅ **Unlimited free tier**  
✅ **Fastest performance for static content**

**Deployment:** `npm run deploy` → `wrangler pages deploy dist`

---

## Migration Options

### Option 1: Stay Static (Recommended)

**When to use:**
- ✅ Content is pre-rendered at build time
- ✅ No server-side logic needed
- ✅ No API endpoints required
- ✅ Want zero Worker requests

**No action needed** - you're already set up correctly!

---

### Option 2: Migrate to Workers

**When to use:**
- ✅ Need server-side API routes
- ✅ Need dynamic content per request
- ✅ Need authentication/sessions
- ✅ Need edge computing features

**Migration guide:** See `.agent/migrate-back-to-workers.md`

**Quick steps:**
```bash
# 1. Install adapter
npm install @astrojs/cloudflare

# 2. Update astro.config.mjs
# - Add: import cloudflare from "@astrojs/cloudflare"
# - Remove: output: "static"
# - Add: adapter: cloudflare({ ... })

# 3. Update package.json scripts
# - deploy: "wrangler deploy"
# - preview: "astro build && wrangler dev"

# 4. Build and deploy
npm run build
npm run deploy
```

---

## Comparison Table

| Feature | Static (Pages) | Workers |
|---------|---------------|---------|
| **Worker requests** | 0 | Every non-excluded route |
| **Performance** | 0-5ms | 5-20ms (with Worker) |
| **Free tier** | Unlimited | 100k requests/day |
| **API routes** | ❌ No | ✅ Yes |
| **Server logic** | ❌ No | ✅ Yes |
| **Deployment** | `wrangler pages deploy` | `wrangler deploy` |
| **Complexity** | Simple | More complex |
| **Cost** | $0 | $0 (within free tier) |

---

## Documentation Index

1. **`.agent/migration-complete.md`**  
   Full documentation of the static migration (current setup)

2. **`.agent/migrate-back-to-workers.md`**  
   Step-by-step guide to migrate back to Workers

3. **`.agent/static-site-proposal-v2.md`**  
   Original analysis and proposal

---

## Quick Commands

### Current Setup (Static)
```bash
# Build
npm run build

# Preview locally
npm run preview

# Deploy to Cloudflare Pages
npm run deploy
```

### If You Migrate to Workers
```bash
# Build
npm run build

# Preview with Wrangler
npm run preview

# Deploy to Cloudflare Workers
npm run deploy
```

---

## Decision Tree

```
Do you need server-side features?
│
├─ NO → Stay with Cloudflare Pages (current setup) ✅
│        - Zero Worker requests
│        - Fastest performance
│        - Simplest deployment
│
└─ YES → Migrate to Cloudflare Workers
         - Follow: .agent/migrate-back-to-workers.md
         - Adds Worker execution
         - Enables server-side features
```

---

## Support

- **Current setup docs:** `.agent/migration-complete.md`
- **Migration guide:** `.agent/migrate-back-to-workers.md`
- **Cloudflare Pages:** https://developers.cloudflare.com/pages/
- **Cloudflare Workers:** https://developers.cloudflare.com/workers/
