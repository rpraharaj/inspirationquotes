# Migration Guide: Reverting to Cloudflare Workers

**Purpose:** Instructions to migrate back from Cloudflare Pages (pure static) to Cloudflare Workers (SSR/hybrid)  
**Use Case:** If you need server-side features, API routes, or dynamic content generation  
**Time Required:** ~15 minutes

---

## ⚠️ Important: What This Migration Actually Does

**After migrating back to Workers, your site will STILL be mostly static:**

- ✅ **~95% of traffic** → Served as **static files** from CDN (no Worker execution)
- ⚠️ **~5% of traffic** → Goes through Worker (404 errors, dynamic routes)

**This is NOT a full server-side rendering migration.** Your existing static pages will remain static and served directly from Cloudflare's CDN. The Worker only runs for:

1. **404 errors** - Invalid URLs
2. **Dynamic routes** - Routes you explicitly mark as `export const prerender = false`
3. **API endpoints** - Routes in `/api/*` (if you create them)

**In other words:** Migrating to Workers gives you the **option** to add server-side features, but doesn't change how your existing static content is served.

---

## When to Use This Guide

Migrate back to Cloudflare Workers if you need:

- ✅ **Server-side API routes** - `/api/*` endpoints with server logic
- ✅ **Dynamic content generation** - Content that changes per request
- ✅ **Authentication/Authorization** - User sessions, protected routes
- ✅ **Server-side data fetching** - Database queries at request time
- ✅ **Edge computing** - Custom logic at Cloudflare's edge
- ✅ **Form processing** - Server-side form handling
- ✅ **A/B testing** - Server-side experiments
- ✅ **Geolocation routing** - Different content per region

**Don't migrate back if:**
- ❌ You only need static site hosting
- ❌ You want zero Worker requests
- ❌ Your content is pre-rendered at build time

---

## Migration Steps

### Step 1: Install Cloudflare Adapter

Add the Cloudflare Workers adapter back to your dependencies:

```bash
npm install @astrojs/cloudflare@12.6.12
```

**Expected output:**
```
added 16 packages, and audited 594 packages in 5s
```

---

### Step 2: Update Astro Configuration

**File:** `astro.config.mjs`

**Current (Static):**
```javascript
// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
	site: "https://inspirationquoteshub.com",
	output: "static", // Pure static site
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => !page.includes('/blog/page/'),
		}),
		tailwind({ applyBaseStyles: false }),
	],
	// No adapter needed for static sites
});
```

**Change to (Workers):**
```javascript
// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
	site: "https://inspirationquoteshub.com",
	// Remove or comment out: output: "static",
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => !page.includes('/blog/page/'),
		}),
		tailwind({ applyBaseStyles: false }),
	],
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
});
```

**Key changes:**
1. Add `import cloudflare from "@astrojs/cloudflare";`
2. Remove `output: "static"` line
3. Add `adapter: cloudflare({ ... })` configuration

---

### Step 3: Update Package.json

**File:** `package.json`

**Current (Static):**
```json
{
  "dependencies": {
    "@astrojs/mdx": "4.3.12",
    "@astrojs/partytown": "^2.1.4",
    "@astrojs/rss": "4.0.14",
    "@astrojs/sitemap": "3.6.0",
    "astro": "5.16.2"
  },
  "cloudflare": {
    "label": "Inspiration Quotes Hub",
    "products": ["Pages"],
    ...
  },
  "scripts": {
    ...
    "deploy": "wrangler pages deploy dist",
    "preview": "astro preview",
    ...
  }
}
```

**Change to (Workers):**
```json
{
  "dependencies": {
    "@astrojs/cloudflare": "12.6.12",
    "@astrojs/mdx": "4.3.12",
    "@astrojs/partytown": "^2.1.4",
    "@astrojs/rss": "4.0.14",
    "@astrojs/sitemap": "3.6.0",
    "astro": "5.16.2"
  },
  "cloudflare": {
    "label": "Inspiration Quotes Hub",
    "products": ["Workers"],
    ...
  },
  "scripts": {
    ...
    "cf-typegen": "wrangler types",
    "deploy": "wrangler deploy",
    "preview": "astro build && wrangler dev",
    ...
  }
}
```

**Key changes:**
1. Add `"@astrojs/cloudflare": "12.6.12"` to dependencies
2. Change `"products": ["Pages"]` to `"products": ["Workers"]`
3. Change `"deploy": "wrangler pages deploy dist"` to `"deploy": "wrangler deploy"`
4. Change `"preview": "astro preview"` to `"preview": "astro build && wrangler dev"`
5. Add `"cf-typegen": "wrangler types"` script

---

### Step 4: Verify wrangler.json Configuration

**File:** `wrangler.json`

Ensure your `wrangler.json` is configured for Workers deployment:

```json
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "inspirationquoteshub",
  "compatibility_date": "2025-10-08",
  "compatibility_flags": [
    "nodejs_compat"
  ],
  "main": "./dist/_worker.js/index.js",
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS"
  },
  "observability": {
    "enabled": true
  },
  "upload_source_maps": true
}
```

**Key fields:**
- `main`: Points to Worker entry point (`./dist/_worker.js/index.js`)
- `assets`: Configures static asset serving
- `name`: Your Worker name (change as needed)

---

### Step 5: Rebuild the Site

```bash
npm run build
```

**Expected output:**
```
✓ Built in XXs
✓ 158 pages built
✓ Worker files generated at dist/_worker.js/
✓ Routes configuration at dist/_routes.json
```

**Verify Worker files exist:**
```bash
ls -la dist/_worker.js/
```

**Expected:**
```
_worker.js/
├── index.js              ← Worker entry point
├── manifest_*.mjs        ← Route manifest
├── pages/                ← Page modules
├── chunks/               ← Code chunks
└── renderers.mjs         ← Astro renderers
```

**Verify _routes.json exists:**
```bash
cat dist/_routes.json
```

**Expected:**
```json
{
  "version": 1,
  "include": ["/*"],
  "exclude": [
    "/",
    "/_astro/*",
    "/images/*",
    "/blog/*",
    ...
  ]
}
```

---

### Step 6: Test Locally with Wrangler

```bash
npm run preview
```

**Expected output:**
```
⛅️ wrangler dev

Using vars defined in .dev.vars
Your worker has access to the following bindings:
- Vars:
  - ASSETS: (Assets)
⎔ Starting local server...
[wrangler:inf] Ready on http://localhost:8787
```

**Test the site:**
- Visit http://localhost:8787
- Test homepage, blog posts, categories
- Verify 404 page works
- Check that static assets load

---

### Step 7: Deploy to Cloudflare Workers

```bash
npm run deploy
```

**Expected output:**
```
⛅️ wrangler deploy

Uploading...
Uploaded inspirationquoteshub (X.XX sec)
Published inspirationquoteshub (X.XX sec)
  https://inspirationquoteshub.workers.dev
Current Deployment ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

**Verify deployment:**
- Visit your Worker URL (e.g., `https://inspirationquoteshub.workers.dev`)
- Test all pages
- Check Cloudflare dashboard → Workers & Pages → Your worker

---

### Step 8: Configure Custom Domain (Optional)

If you want to use your custom domain with Workers:

1. **Cloudflare Dashboard:**
   - Go to Workers & Pages
   - Select your Worker
   - Click "Triggers" tab
   - Click "Add Custom Domain"
   - Enter: `inspirationquoteshub.com`
   - Click "Add Custom Domain"

2. **DNS Configuration:**
   - Cloudflare will automatically configure DNS
   - Wait 1-5 minutes for propagation

3. **Verify:**
   - Visit https://inspirationquoteshub.com
   - Should now be served by Worker

---

## Verification Checklist

After migration, verify:

### Build Verification
- [ ] `npm run build` completes successfully
- [ ] `dist/_worker.js/` directory exists
- [ ] `dist/_routes.json` file exists
- [ ] All pages built (158 pages)

### Local Testing
- [ ] `npm run preview` starts Wrangler dev server
- [ ] Homepage loads at http://localhost:8787
- [ ] Blog posts load correctly
- [ ] Category pages work
- [ ] 404 page displays for invalid URLs
- [ ] Static assets (images, CSS, JS) load

### Production Testing
- [ ] `npm run deploy` succeeds
- [ ] Worker URL is accessible
- [ ] All pages load on production
- [ ] Custom domain works (if configured)
- [ ] Google Analytics tracking works
- [ ] No console errors

### Cloudflare Dashboard
- [ ] Worker appears in Workers & Pages
- [ ] Deployment status: Active
- [ ] Routes configured correctly
- [ ] Custom domain attached (if applicable)

---

## Comparison: Static vs Workers

### Build Output

**Static (Current):**
```
dist/
├── index.html           ← Static HTML
├── 404.html             ← Static 404
├── about/index.html
├── blog/index.html
└── _astro/              ← CSS/JS bundles

NO _worker.js/
NO _routes.json
```

**Workers (After Migration):**
```
dist/
├── _worker.js/          ← Worker runtime ✅
│   ├── index.js
│   ├── manifest.mjs
│   └── pages/
├── _routes.json         ← Routing config ✅
├── index.html
├── 404.html
├── about/index.html
└── _astro/
```

### Deployment

| Aspect | Static (Pages) | Workers |
|--------|---------------|---------|
| **Command** | `wrangler pages deploy dist` | `wrangler deploy` |
| **Preview** | `astro preview` | `wrangler dev` |
| **Worker execution** | None | Every non-excluded route |
| **Static files** | Direct CDN serve | Via Worker or excluded |
| **404 handling** | Static 404.html | Worker-generated |

### Performance

| Metric | Static (Pages) | Workers |
|--------|---------------|---------|
| **Static pages** | 0-5ms | 0-5ms (if excluded) |
| **Dynamic routes** | N/A | 5-20ms (Worker execution) |
| **404 errors** | 0-5ms (static) | 5-20ms (Worker) |
| **API routes** | Not supported | Supported ✅ |

### Cost

| Tier | Static (Pages) | Workers |
|------|---------------|------------|
| **Free tier** | Unlimited requests | 100,000 requests/day |
| **Paid tier** | $0/month | $5/month (10M requests) |
| **Overage** | N/A | $0.50 per 1M requests |

### Traffic Breakdown After Workers Migration

**Important:** After migrating to Workers, your traffic will look like this:

| Route Type | % of Traffic | Served By | Worker Execution? |
|------------|-------------|-----------|-------------------|
| **Homepage** (`/`) | ~20% | Static CDN | ❌ No |
| **Blog posts** (`/blog/*`) | ~60% | Static CDN | ❌ No |
| **Category pages** (`/categories/*`) | ~10% | Static CDN | ❌ No |
| **Static assets** (`/_astro/*`, `/images/*`) | ~5% | Static CDN | ❌ No |
| **Other pages** (`/about`, `/contact`) | ~3% | Static CDN | ❌ No |
| **404 errors** (invalid URLs) | ~2% | Worker | ✅ Yes |
| **API routes** (if you add them) | ~0% | Worker | ✅ Yes |

**Summary:**
- ✅ **~98% of traffic** → Served as static files (no Worker execution)
- ⚠️ **~2% of traffic** → Goes through Worker (404 errors only)

**This means:** Your Worker will only execute ~1,000-2,000 times per day (for 404s), well within the free tier of 100,000 requests/day.

---

## When Workers Make Sense

Use Workers if you need:

### 1. Server-side API Routes

**Example:** `/api/submit-form`

```javascript
// src/pages/api/submit-form.js
export async function POST({ request }) {
  const data = await request.json();
  
  // Process form data
  // Save to database
  // Send email
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
```

### 2. Dynamic Content Generation

**Example:** Personalized content per user

```astro
---
// src/pages/dashboard.astro
export const prerender = false; // Disable prerendering

const userId = Astro.cookies.get('userId');
const userData = await fetchUserData(userId);
---

<h1>Welcome, {userData.name}!</h1>
```

### 3. Authentication

**Example:** Protected routes

```javascript
// src/middleware.js
export function onRequest({ request, cookies }, next) {
  const session = cookies.get('session');
  
  if (!session && request.url.includes('/dashboard')) {
    return Response.redirect('/login');
  }
  
  return next();
}
```

### 4. Edge Computing

**Example:** A/B testing, geolocation routing

```javascript
export function onRequest({ request }, next) {
  const country = request.cf.country;
  
  if (country === 'US') {
    // Serve US-specific content
  }
  
  return next();
}
```

---

## Rollback to Static (If Needed)

If you migrate to Workers and want to go back to static:

```bash
# 1. Remove Cloudflare adapter
npm uninstall @astrojs/cloudflare

# 2. Update astro.config.mjs
# - Remove cloudflare import
# - Add output: 'static'
# - Remove adapter configuration

# 3. Update package.json
# - Remove @astrojs/cloudflare from dependencies
# - Change products to ["Pages"]
# - Update deploy script to "wrangler pages deploy dist"

# 4. Rebuild
npm run build

# 5. Deploy
npm run deploy
```

Or simply revert to the commit before this migration:
```bash
git log --oneline
git revert <commit-hash>
```

---

## Troubleshooting

### Issue: Worker deployment fails

**Error:** `No such file: dist/_worker.js/index.js`

**Solution:**
```bash
# Rebuild with adapter
npm run build

# Verify worker files exist
ls -la dist/_worker.js/
```

---

### Issue: Static files not loading

**Error:** 404 for CSS/JS files

**Solution:** Check `dist/_routes.json` excludes static assets:
```json
{
  "exclude": [
    "/_astro/*",
    "/images/*",
    "/fonts/*"
  ]
}
```

---

### Issue: 404 page not working

**Error:** Default Cloudflare 404 instead of custom page

**Solution:** Remove `export const prerender = false` from `404.astro`:
```astro
---
// src/pages/404.astro
// Don't add: export const prerender = false;
// Let it be pre-rendered
---
```

---

### Issue: Preview server not starting

**Error:** `wrangler dev` fails

**Solution:**
```bash
# Update wrangler
npm install wrangler@latest

# Clear cache
rm -rf .wrangler

# Try again
npm run preview
```

---

## Summary

### Migration Checklist

- [ ] Install `@astrojs/cloudflare` adapter
- [ ] Update `astro.config.mjs` (add adapter, remove `output: 'static'`)
- [ ] Update `package.json` (add dependency, update scripts)
- [ ] Verify `wrangler.json` configuration
- [ ] Run `npm run build`
- [ ] Verify `_worker.js/` and `_routes.json` exist
- [ ] Test locally with `npm run preview`
- [ ] Deploy with `npm run deploy`
- [ ] Verify production deployment
- [ ] Configure custom domain (optional)

### Key Files to Change

1. `astro.config.mjs` - Add cloudflare adapter
2. `package.json` - Add dependency, update scripts
3. `wrangler.json` - Verify Worker configuration

### Time Required

- **Migration:** 10 minutes
- **Testing:** 5 minutes
- **Deployment:** 5 minutes
- **Total:** ~20 minutes

---

## Need Help?

If you encounter issues during migration:

1. Check the troubleshooting section above
2. Verify all files match the examples
3. Review build output for errors
4. Check Cloudflare dashboard for deployment status
5. Test locally before deploying to production

**Remember:** Only migrate to Workers if you need server-side features. For pure static sites, Cloudflare Pages (current setup) is simpler and faster.
