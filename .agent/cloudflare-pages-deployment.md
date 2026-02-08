# Cloudflare Pages Deployment Guide

Complete guide to deploying your static site to Cloudflare Pages.

---

## Quick Start (Command Line)

The fastest way to deploy:

```bash
# 1. Build your site
npm run build

# 2. Deploy to Cloudflare Pages
npm run deploy
```

That's it! Follow the prompts to create your Pages project.

---

## Option 1: Deploy via Wrangler (Command Line) - RECOMMENDED

### First-Time Deployment

```bash
# 1. Make sure you're logged in to Cloudflare
npx wrangler login

# 2. Build your site
npm run build

# 3. Deploy to Cloudflare Pages
npm run deploy
```

**You'll see prompts like this:**

```
? Enter the name of your new project: › inspirationquoteshub
? Enter the production branch name: › main
✨ Successfully created the 'inspirationquoteshub' project.
🌎 Deploying...
✨ Deployment complete!
🌐 https://inspirationquoteshub.pages.dev
```

### Subsequent Deployments

After the first deployment, it's even simpler:

```bash
npm run build
npm run deploy
```

**Output:**
```
🌎 Deploying...
✨ Deployment complete!
🌐 https://inspirationquoteshub.pages.dev
```

---

## Option 2: Deploy via Cloudflare Dashboard (Git Integration)

This method automatically deploys when you push to GitHub/GitLab.

### Step 1: Push Your Code to Git

```bash
# If you haven't already
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Connect to Cloudflare Pages

1. **Go to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com
   - Log in to your account

2. **Navigate to Pages**
   - Click "Workers & Pages" in the left sidebar
   - Click "Create application"
   - Click "Pages" tab
   - Click "Connect to Git"

3. **Connect Your Repository**
   - Choose your Git provider (GitHub/GitLab)
   - Authorize Cloudflare to access your repositories
   - Select your repository: `inspirationquotes`

4. **Configure Build Settings**
   ```
   Project name:           inspirationquoteshub
   Production branch:      main
   Framework preset:       Astro
   Build command:          npm run build
   Build output directory: dist
   ```

5. **Environment Variables** (if needed)
   - Usually not needed for static sites
   - Click "Add variable" if you have any

6. **Deploy**
   - Click "Save and Deploy"
   - Wait 2-5 minutes for first build
   - Your site will be live at: `https://inspirationquoteshub.pages.dev`

### Step 3: Automatic Deployments

Now, every time you push to your `main` branch:
- Cloudflare automatically builds your site
- Deploys the new version
- No manual deployment needed! 🎉

---

## Option 3: Deploy via Cloudflare Dashboard (Direct Upload)

Upload the `dist` folder directly without Git.

### Step 1: Build Your Site

```bash
npm run build
```

### Step 2: Upload to Cloudflare Pages

1. **Go to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com
   - Click "Workers & Pages"
   - Click "Create application"
   - Click "Pages" tab

2. **Upload Assets**
   - Click "Upload assets"
   - Enter project name: `inspirationquoteshub`
   - Drag and drop your `dist` folder
   - Or click "Select from computer" and choose `dist` folder

3. **Deploy**
   - Click "Deploy site"
   - Wait 1-2 minutes
   - Your site will be live at: `https://inspirationquoteshub.pages.dev`

**Note:** This method requires manual upload for each deployment. Git integration (Option 2) is recommended for automatic deployments.

---

## Custom Domain Setup

After deployment, add your custom domain.

### Step 1: Add Custom Domain

1. **Go to Your Pages Project**
   - Dashboard → Workers & Pages
   - Click your project: `inspirationquoteshub`

2. **Add Custom Domain**
   - Click "Custom domains" tab
   - Click "Set up a custom domain"
   - Enter: `inspirationquoteshub.com`
   - Click "Continue"

3. **DNS Configuration**
   - If your domain is on Cloudflare: DNS is configured automatically ✅
   - If not: You'll see DNS records to add manually

### Step 2: Add www Subdomain (Optional)

1. Click "Set up a custom domain" again
2. Enter: `www.inspirationquoteshub.com`
3. Click "Continue"
4. DNS configured automatically

### Step 3: Verify

- Wait 1-5 minutes for DNS propagation
- Visit: https://inspirationquoteshub.com
- Should show your site! 🎉

---

## Deployment Verification Checklist

After deployment, verify everything works:

### Basic Checks
- [ ] Homepage loads: `https://inspirationquoteshub.pages.dev`
- [ ] Blog listing works: `/blog`
- [ ] Individual blog post loads: `/blog/any-post`
- [ ] Category pages work: `/categories/motivation-success`
- [ ] About page loads: `/about`
- [ ] Contact page loads: `/contact`
- [ ] 404 page displays: `/nonexistent-page`

### Asset Checks
- [ ] Images load correctly
- [ ] CSS styles applied
- [ ] JavaScript works
- [ ] Fonts load properly
- [ ] Dark mode toggle works

### SEO Checks
- [ ] Meta tags present (view source)
- [ ] Open Graph tags correct
- [ ] Canonical URLs correct
- [ ] Sitemap accessible: `/sitemap.xml`
- [ ] RSS feed accessible: `/rss.xml`
- [ ] Robots.txt accessible: `/robots.txt`

### Performance Checks
- [ ] Page loads fast (<2 seconds)
- [ ] Images optimized
- [ ] No console errors
- [ ] Mobile responsive

### Analytics Checks
- [ ] Google Analytics tracking code present
- [ ] Analytics firing (check Real-Time in GA)

---

## Deployment Commands Reference

### Build Commands

```bash
# Full build (includes search index and sitemap)
npm run build

# Build search index only
npm run build:search

# Check for errors before building
npm run check
```

### Preview Commands

```bash
# Preview built site locally
npm run preview

# Development server (with hot reload)
npm run dev
```

### Deployment Commands

```bash
# Deploy to Cloudflare Pages
npm run deploy

# Login to Cloudflare (first time)
npx wrangler login

# Check deployment status
npx wrangler pages deployment list
```

---

## Troubleshooting

### Issue: Build fails on Cloudflare

**Error:** `Build failed`

**Solution:**
```bash
# Test build locally first
npm run build

# Check for errors
npm run check

# If local build works, check Cloudflare build logs
# Dashboard → Your project → Deployments → View logs
```

---

### Issue: Custom domain not working

**Error:** Domain shows "This site can't be reached"

**Solution:**
1. Check DNS propagation: https://dnschecker.org
2. Verify DNS records in Cloudflare dashboard
3. Wait up to 24 hours for full propagation
4. Clear browser cache

---

### Issue: 404 page not showing

**Error:** Default Cloudflare 404 instead of custom page

**Solution:**
```bash
# Verify 404.html exists in dist/
ls -la dist/404.html

# Rebuild if missing
npm run build

# Redeploy
npm run deploy
```

---

### Issue: Images not loading

**Error:** 404 for images

**Solution:**
```bash
# Check images are in dist/
ls -la dist/images/

# Verify image paths in your code
# Should be: /images/filename.webp
# Not: ./images/filename.webp

# Rebuild and redeploy
npm run build
npm run deploy
```

---

### Issue: CSS not applying

**Error:** Unstyled content

**Solution:**
```bash
# Check CSS files in dist/
ls -la dist/_astro/

# Verify base URL in astro.config.mjs
# Should be: site: "https://inspirationquoteshub.com"

# Rebuild and redeploy
npm run build
npm run deploy
```

---

## Environment Variables (If Needed)

If you need to add environment variables:

### Via Dashboard

1. Go to your Pages project
2. Click "Settings" tab
3. Click "Environment variables"
4. Click "Add variable"
5. Add your variables:
   ```
   Name:  GA_TRACKING_ID
   Value: G-SLDPHCRMYM
   ```
6. Click "Save"
7. Redeploy for changes to take effect

### Via Wrangler

Create a `.dev.vars` file (for local development):
```bash
# .dev.vars (don't commit this!)
GA_TRACKING_ID=G-SLDPHCRMYM
```

**Note:** Your current setup doesn't need environment variables since the GA ID is hardcoded in the component.

---

## Deployment Workflow

### Recommended Workflow (Git Integration)

```bash
# 1. Make changes locally
# Edit your files...

# 2. Test locally
npm run dev
# Visit http://localhost:4321

# 3. Build and preview
npm run build
npm run preview
# Visit http://localhost:4322

# 4. Commit and push
git add .
git commit -m "Your changes"
git push origin main

# 5. Cloudflare automatically deploys!
# Check deployment status in dashboard
```

### Alternative Workflow (Manual Deploy)

```bash
# 1. Make changes locally
# Edit your files...

# 2. Test locally
npm run dev

# 3. Build
npm run build

# 4. Deploy
npm run deploy

# 5. Verify
# Visit https://inspirationquoteshub.pages.dev
```

---

## Rollback Deployment

If you need to rollback to a previous version:

### Via Dashboard

1. Go to your Pages project
2. Click "Deployments" tab
3. Find the previous successful deployment
4. Click "..." menu
5. Click "Rollback to this deployment"
6. Confirm

**Rollback is instant!** ⚡

### Via Wrangler

```bash
# List deployments
npx wrangler pages deployment list

# Rollback to specific deployment
npx wrangler pages deployment rollback <deployment-id>
```

---

## Performance Optimization

Your site is already optimized, but here are some tips:

### Cloudflare Settings

1. **Enable Auto Minify**
   - Dashboard → Speed → Optimization
   - Enable: HTML, CSS, JavaScript

2. **Enable Brotli Compression**
   - Dashboard → Speed → Optimization
   - Enable Brotli

3. **Enable Rocket Loader** (Optional)
   - Dashboard → Speed → Optimization
   - Enable Rocket Loader
   - **Note:** Test thoroughly, may break some JS

4. **Enable HTTP/3**
   - Dashboard → Network
   - Enable HTTP/3 (with QUIC)

### Caching

Cloudflare Pages automatically caches:
- ✅ Static HTML files
- ✅ CSS/JS bundles
- ✅ Images
- ✅ Fonts

**Cache is purged automatically on new deployments.**

---

## Monitoring & Analytics

### Cloudflare Analytics

1. Go to your Pages project
2. Click "Analytics" tab
3. View:
   - Page views
   - Unique visitors
   - Bandwidth usage
   - Top pages
   - Geographic distribution

### Google Analytics

Your site already has Google Analytics configured:
- Tracking ID: `G-SLDPHCRMYM`
- Only loads in production
- Check: https://analytics.google.com

---

## Cost

**Cloudflare Pages is FREE for:**
- ✅ Unlimited requests
- ✅ Unlimited bandwidth
- ✅ 500 builds per month
- ✅ Unlimited sites

**You'll never pay anything for hosting!** 🎉

---

## Summary

### Quick Deploy (Recommended)

```bash
# One-time setup
npx wrangler login

# Every deployment
npm run build
npm run deploy
```

### Git Integration (Best for Teams)

1. Push code to GitHub/GitLab
2. Connect repo in Cloudflare dashboard
3. Automatic deployments on every push

### Your Site URLs

- **Pages URL:** https://inspirationquoteshub.pages.dev
- **Custom Domain:** https://inspirationquoteshub.com (after setup)

---

## Next Steps

1. ✅ Deploy your site: `npm run deploy`
2. ✅ Verify deployment works
3. ✅ Set up custom domain
4. ✅ Submit sitemap to Google Search Console
5. ✅ Monitor analytics

**You're ready to go live!** 🚀
