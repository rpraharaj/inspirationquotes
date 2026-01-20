# Generic Featured Image Generation Guide

**Created:** 2026-01-11  
**Status:** ✅ Complete Guide  
**Purpose:** Step-by-step guide for generating featured images (OG images) for any blog or content website

---

## Table of Contents

1. [Overview](#overview)
2. [Image Specifications](#image-specifications)
3. [Method 1: AI Image Generation](#method-1-ai-image-generation)
4. [Method 2: Programmatic Generation with Node.js](#method-2-programmatic-generation-with-nodejs)
5. [Image Processing & Optimization](#image-processing--optimization)
6. [Integration into Website](#integration-into-website)
7. [Deployment & Hosting](#deployment--hosting)
8. [Checklist for New Websites](#checklist-for-new-websites)
9. [Troubleshooting](#troubleshooting)
10. [Best Practices](#best-practices)

---

## Overview

### What Are Featured Images (OG Images)?

Featured images, also known as **Open Graph (OG) images**, are the preview images that appear when your content is shared on:

- **Social Media**: Twitter/X, LinkedIn, Facebook, Discord, Slack
- **Messaging Apps**: WhatsApp, Telegram, iMessage
- **Link Previews**: Anywhere URLs are pasted that support link unfurling

These images are NOT displayed on the page itself—they only appear in social share previews.

### Why They Matter

- **Increase click-through rates** by 30-50% with compelling visuals
- **Improve brand recognition** with consistent styling
- **Professional appearance** when content is shared
- **SEO benefit** as social signals can improve rankings

### Two Generation Methods

| Method | Best For | Speed | Quality |
|--------|----------|-------|---------|
| **AI Generation** | Unique, creative designs with icons/illustrations | Slower (requires prompting) | High visual appeal |
| **Programmatic (Node.js)** | Text-focused, consistent branding, batch processing | Fast (automated) | Clean and consistent |

---

## Image Specifications

### Standard Dimensions

| Property | Value | Notes |
|----------|-------|-------|
| **Width** | 1200 pixels | Open Graph standard |
| **Height** | 630 pixels | 1.91:1 aspect ratio |
| **Format** | WebP (preferred) or PNG | WebP for smaller size |
| **Max File Size** | < 100 KB | <50KB is ideal |
| **Quality** | 80-85% | Balance between quality and size |

### Safe Zone for Content

When designing images, keep important content within the **safe zone** to avoid cropping on different platforms:

```
+--------------------------------------------------+
|                TOP 25% - SAFE MARGIN              |  <- Gradient/background only
|                                                   |
+--------------------------------------------------+
|                                                   |
|              MIDDLE 50% - CONTENT ZONE            |  <- Title, icons, main elements
|                                                   |
+--------------------------------------------------+
|              BOTTOM 25% - SAFE MARGIN             |  <- Gradient/background only
+--------------------------------------------------+
```

**Why?** Different platforms crop images differently. Twitter uses 2:1, Facebook uses 1.91:1, LinkedIn varies.

---

## Method 1: AI Image Generation

### Step 1: Define Your Brand Style

Create a **reference image** that defines your visual style. This will be used as a style guide for all future images.

**Key elements to define:**
- Background style (gradient, solid, texture)
- Color scheme (primary, secondary, accent colors)
- Typography style (bold, minimal, tech, elegant)
- Icon/illustration style (outline, filled, 3D, flat)

### Step 2: Create a Template Prompt

Here's a proven template prompt structure:

```
Create a featured image in the EXACT SAME STYLE as the reference image,
but change the text to "[YOUR TITLE]".

IMPORTANT: Keep ALL main content (title text, icons) in the CENTER HORIZONTAL
BAND - only the middle 50% of the image height. Leave the TOP 25% and BOTTOM 25%
with just background/gradient - no text or important elements there.

Keep same dark gradient background, same text style, same color scheme
(dark with indigo/purple accents).

Add [CATEGORY] themed subtle icons like [ICON1], [ICON2], [ICON3].
```

### Step 3: Generate Images

**Using Claude/ChatGPT with Image Generation:**

1. Upload your reference image
2. Provide the template prompt with specific title
3. Generate the image
4. Process the image (see [Image Processing](#image-processing--optimization))

**Example prompts by category:**

#### For AI/Tech Articles
```
Create a featured image in the EXACT SAME STYLE as the reference image,
but change the text to "AI Prompts for Developers". IMPORTANT: Keep ALL
main content in the CENTER HORIZONTAL BAND. Keep same dark gradient
background, same text style, same color scheme (dark with indigo/purple
accents). Add AI themed subtle icons like brain networks, code snippets,
neural connections, and sparkle effects.
```

#### For Dev Tools
```
Create a featured image in the EXACT SAME STYLE as the reference image,
but change the text to "JSON Formatter". IMPORTANT: Keep ALL main content
in the CENTER HORIZONTAL BAND. Keep same dark gradient background, same
text style, same color scheme. Add developer themed subtle icons like
curly braces, code formatting symbols, and structured data patterns.
```

#### For Business/Marketing
```
Create a featured image in the EXACT SAME STYLE as the reference image,
but change the text to "Email Marketing Guide". IMPORTANT: Keep ALL main
content in the CENTER HORIZONTAL BAND. Keep same gradient background,
same text style, same color scheme. Add marketing themed subtle icons
like envelope, charts, email @ symbols, and notification badges.
```

---

## Method 2: Programmatic Generation with Node.js

### Prerequisites

```bash
npm install canvas sharp
```

### Complete Script: `generate-featured-image.cjs`

```javascript
/**
 * Featured Image Generator for Blog Posts
 * Creates clean, professional 1200x630 images with gradient backgrounds.
 * 
 * Usage: node generate-featured-image.cjs "Your Title" output-filename
 */

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// ============================================
// CONFIGURATION - Customize for your brand
// ============================================

const WIDTH = 1200;
const HEIGHT = 630;

// Brand colors - customize these for your website
const COLORS = {
    bgDark: '#0a0a0f',        // Primary background
    bgDarker: '#050508',      // Secondary background
    accentPrimary: '#6366f1', // Primary accent (indigo)
    accentSecondary: '#8b5cf6', // Secondary accent (purple)
    accentTertiary: '#ec4899',  // Tertiary accent (pink)
    textPrimary: '#ffffff',    // Main text color
    textSecondary: '#94a3b8',  // Secondary text color
};

// Typography - customize font family
const FONT_FAMILY = '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';

// ============================================
// DRAWING FUNCTIONS
// ============================================

function drawBackground(ctx) {
    // Create rich gradient background
    const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
    gradient.addColorStop(0, COLORS.bgDarker);
    gradient.addColorStop(0.4, COLORS.bgDark);
    gradient.addColorStop(0.7, '#0f0f1a');
    gradient.addColorStop(1, '#12121f');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Add subtle accent glow in center
    const glowGradient = ctx.createRadialGradient(
        WIDTH / 2, HEIGHT / 2, 0,
        WIDTH / 2, HEIGHT / 2, 400
    );
    glowGradient.addColorStop(0, COLORS.accentPrimary + '25'); // 25 = ~15% opacity
    glowGradient.addColorStop(0.5, COLORS.accentSecondary + '10');
    glowGradient.addColorStop(1, 'transparent');

    ctx.fillStyle = glowGradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function drawAccentElements(ctx) {
    // Top-left corner accent triangle
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 0);
    ctx.lineTo(0, 120);
    ctx.closePath();

    const cornerGradient1 = ctx.createLinearGradient(0, 0, 100, 60);
    cornerGradient1.addColorStop(0, COLORS.accentPrimary + '40');
    cornerGradient1.addColorStop(1, 'transparent');
    ctx.fillStyle = cornerGradient1;
    ctx.fill();

    // Bottom-right corner accent triangle
    ctx.beginPath();
    ctx.moveTo(WIDTH, HEIGHT);
    ctx.lineTo(WIDTH - 200, HEIGHT);
    ctx.lineTo(WIDTH, HEIGHT - 120);
    ctx.closePath();

    const cornerGradient2 = ctx.createLinearGradient(WIDTH, HEIGHT, WIDTH - 100, HEIGHT - 60);
    cornerGradient2.addColorStop(0, COLORS.accentSecondary + '40');
    cornerGradient2.addColorStop(1, 'transparent');
    ctx.fillStyle = cornerGradient2;
    ctx.fill();

    // Horizontal accent line at bottom
    const lineGradient = ctx.createLinearGradient(0, HEIGHT - 6, WIDTH, HEIGHT - 6);
    lineGradient.addColorStop(0, 'transparent');
    lineGradient.addColorStop(0.2, COLORS.accentPrimary);
    lineGradient.addColorStop(0.5, COLORS.accentSecondary);
    lineGradient.addColorStop(0.8, COLORS.accentTertiary);
    lineGradient.addColorStop(1, 'transparent');

    ctx.fillStyle = lineGradient;
    ctx.fillRect(100, HEIGHT - 6, WIDTH - 200, 6);
}

function drawText(ctx, title, subtitle = null) {
    const x = WIDTH / 2;
    const y = subtitle ? HEIGHT / 2 - 30 : HEIGHT / 2;

    // Add glow behind text
    ctx.shadowColor = COLORS.accentPrimary;
    ctx.shadowBlur = 60;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Main title - LARGE and BOLD
    ctx.font = `bold 72px ${FONT_FAMILY}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = COLORS.textPrimary;
    
    // Handle long titles with word wrapping
    const maxWidth = WIDTH - 100;
    const words = title.split(' ');
    let lines = [];
    let currentLine = '';

    for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    lines.push(currentLine);

    // Draw title lines
    const lineHeight = 85;
    const totalHeight = lines.length * lineHeight;
    const startY = y - totalHeight / 2 + lineHeight / 2;

    lines.forEach((line, index) => {
        ctx.fillText(line, x, startY + index * lineHeight);
    });

    // Reset shadow
    ctx.shadowBlur = 0;

    // Draw subtitle if provided
    if (subtitle) {
        ctx.font = `400 28px ${FONT_FAMILY}`;
        ctx.fillStyle = COLORS.textSecondary;
        ctx.fillText(subtitle, x, startY + lines.length * lineHeight + 40);
    }
}

// ============================================
// MAIN GENERATION FUNCTION
// ============================================

async function generateFeaturedImage(title, outputPath, subtitle = null) {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');

    // Draw all elements
    drawBackground(ctx);
    drawAccentElements(ctx);
    drawText(ctx, title, subtitle);

    // Convert to buffer
    const buffer = canvas.toBuffer('image/png');

    // Use sharp to convert to WebP with compression
    await sharp(buffer)
        .webp({ quality: 85 })
        .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    console.log(`✅ Generated: ${outputPath}`);
    console.log(`   Size: ${(stats.size / 1024).toFixed(2)} KB`);

    return stats.size;
}

// ============================================
// CLI INTERFACE
// ============================================

async function main() {
    const args = process.argv.slice(2);
    
    if (args.length < 2) {
        console.log('Usage: node generate-featured-image.cjs "Your Title" output-filename');
        console.log('');
        console.log('Examples:');
        console.log('  node generate-featured-image.cjs "AI for Developers" ai-for-developers');
        console.log('  node generate-featured-image.cjs "Getting Started Guide" getting-started');
        process.exit(1);
    }

    const [title, outputName] = args;
    const outputDir = path.join(__dirname, '../public/assets/images');

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, `${outputName}.webp`);
    await generateFeaturedImage(title, outputPath);

    console.log('\n✅ Featured image generated successfully!');
}

// Run if called directly
if (require.main === module) {
    main().catch(console.error);
}

// Export for use as module
module.exports = { generateFeaturedImage };
```

### Usage Examples

```bash
# Generate single image
node scripts/generate-featured-image.cjs "AI Prompts for Writers" prompts-for-writers

# Batch generation (create a batch script)
node scripts/generate-featured-image.cjs "Getting Started" getting-started
node scripts/generate-featured-image.cjs "API Reference" api-reference
node scripts/generate-featured-image.cjs "Best Practices" best-practices
```

---

## Image Processing & Optimization

### Processing AI-Generated Images

AI-generated images often need cropping and optimization. Use this script:

```javascript
// process-image.cjs
const sharp = require('sharp');
const fs = require('fs');

const inputPath = process.argv[2];  // Path to AI-generated image
const outputPath = process.argv[3]; // Output path

async function processImage() {
    const metadata = await sharp(inputPath).metadata();
    
    // Calculate crop for 1.91:1 aspect ratio
    const targetRatio = 1200 / 630;
    const cropHeight = Math.round(metadata.width / targetRatio);
    const cropTop = Math.round((metadata.height - cropHeight) / 2);
    
    await sharp(inputPath)
        // Extract center portion with correct aspect ratio
        .extract({
            left: 0,
            top: cropTop,
            width: metadata.width,
            height: cropHeight
        })
        // Resize to standard dimensions
        .resize(1200, 630, { fit: 'fill' })
        // Convert to WebP with compression
        .webp({ quality: 85 })
        .toFile(outputPath);
    
    const stats = fs.statSync(outputPath);
    console.log('✅ Processed:', outputPath);
    console.log(`   Size: ${(stats.size / 1024).toFixed(2)} KB`);
}

processImage().catch(console.error);
```

**Usage:**
```bash
node scripts/process-image.cjs ./raw-image.png ./public/assets/images/final-image.webp
```

### Compression Commands

If images are too large, use these compression techniques:

```bash
# Using sharp (in Node.js script)
await sharp(inputPath)
    .resize(1200, 630)
    .webp({ quality: 75 })  // Lower quality for smaller size
    .toFile(outputPath);

# Using ImageMagick (CLI)
convert input.png -resize 1200x630 -quality 80 output.webp

# Using Squoosh (online)
# Visit https://squoosh.app for browser-based compression
```

---

## Integration into Website

### Step 1: Define Schema for Content

**For Astro/Zod (content collections):**

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        // Featured image for social sharing
        featuredImage: z.string().optional(),  // For blog posts
        // OR
        ogImage: z.string().optional(),        // For tools/pages
    }),
});
```

### Step 2: Add to Content Frontmatter

**Markdown/MDX files:**

```yaml
---
title: "Your Article Title"
description: "A brief description of the article."
featuredImage: "/assets/images/your-article.webp"
---

Article content here...
```

### Step 3: Create SEO Component

Create a reusable SEO component that handles OG image meta tags:

```astro
---
// src/components/SEO.astro
interface Props {
    title: string;
    description: string;
    ogImage?: string;
    canonical?: string;
}

const { title, description, ogImage = '/og-default.webp', canonical } = Astro.props;

// Get site URL
const siteUrl = import.meta.env.SITE || 'https://your-site.com';
const canonicalUrl = canonical || new URL(Astro.url.pathname, siteUrl).href;

// Transform ogImage to full URL
let ogImageUrl: string;
if (ogImage.startsWith('http')) {
    ogImageUrl = ogImage;
} else {
    ogImageUrl = new URL(ogImage, siteUrl).href;
}
---

<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalUrl} />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImageUrl} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content={canonicalUrl} />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImageUrl} />
```

### Step 4: Use in Page Templates

```astro
---
// src/pages/blog/[slug].astro
import { getCollection } from 'astro:content';
import SEO from '../../components/SEO.astro';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
    const posts = await getCollection('blog');
    return posts.map(post => ({
        params: { slug: post.slug },
        props: { post },
    }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<BaseLayout>
    <head>
        <SEO 
            title={post.data.title}
            description={post.data.description}
            ogImage={post.data.featuredImage}
        />
    </head>
    <main>
        <Content />
    </main>
</BaseLayout>
```

---

## Deployment & Hosting

### Option 1: Local/Public Directory

Store images in your repository's public folder:

```
public/
└── assets/
    └── images/
        ├── blog/
        │   ├── post-1.webp
        │   └── post-2.webp
        ├── tools/
        │   ├── tool-1.webp
        │   └── tool-2.webp
        └── og-default.webp
```

**Pros:** Simple, no external dependencies  
**Cons:** Increases repository size, no CDN caching

### Option 2: CDN/Object Storage (Recommended)

Use Cloudflare R2, AWS S3, or similar for hosting images:

```typescript
// src/config/site.config.ts
export const useR2Assets = true;
export const r2PublicUrl = 'https://assets.yoursite.com';

export const getAssetUrl = (path: string): string => {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    if (useR2Assets) {
        return `${r2PublicUrl}/${cleanPath}`;
    }
    return `/${cleanPath}`;
};
```

**Upload Script:**

```bash
#!/bin/bash
# scripts/upload-to-r2.sh

BUCKET_NAME="your-bucket"
LOCAL_PATH="public/assets/images"

# Upload all images with proper headers
for file in $(find $LOCAL_PATH -type f -name "*.webp"); do
    key=${file#$LOCAL_PATH/}
    wrangler r2 object put "$BUCKET_NAME/assets/images/$key" \
        --file "$file" \
        --content-type "image/webp" \
        --cache-control "public, max-age=31536000, immutable" \
        --remote
done
```

---

## Checklist for New Websites

Use this checklist when setting up featured images for a new website:

### Initial Setup

- [ ] Create `scripts/generate-featured-image.cjs` (copy or adapt from above)
- [ ] Install dependencies: `npm install canvas sharp`
- [ ] Customize brand colors in the script
- [ ] Create `public/assets/images/` directory structure
- [ ] Generate a default OG image: `og-default.webp`

### Schema & Integration

- [ ] Add `featuredImage` or `ogImage` field to content schema
- [ ] Create `SEO.astro` component with OG meta tags
- [ ] Update page templates to pass ogImage prop
- [ ] Test with social share debuggers (see below)

### Content Creation

For each new blog post or page:

- [ ] Choose generation method (AI or programmatic)
- [ ] Generate image with title
- [ ] Process to 1200x630 WebP format
- [ ] Verify file size < 100KB
- [ ] Add to content frontmatter
- [ ] Test social preview

### Verification

- [ ] Run production build: `npm run build`
- [ ] Check images in `dist/assets/images/`
- [ ] Verify meta tags in HTML output
- [ ] Test with [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test with [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Test with [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

---

## Troubleshooting

### Image Not Showing in Social Preview

1. **Check meta tags exist:**
   ```bash
   curl -s https://yoursite.com/your-page/ | grep -i "og:image"
   ```

2. **Verify image URL is accessible:**
   ```bash
   curl -I "https://yoursite.com/assets/images/your-image.webp"
   # Should return HTTP 200
   ```

3. **Clear social media cache:**
   - Facebook: Use [Sharing Debugger](https://developers.facebook.com/tools/debug/) and click "Scrape Again"
   - Twitter: Paste URL in a new tweet to see updated preview
   - LinkedIn: Use [Post Inspector](https://www.linkedin.com/post-inspector/)

### Image Appears Cropped Wrong

- Ensure content is in the middle 50% (vertical safe zone)
- Check aspect ratio is exactly 1.91:1 (1200x630)
- Use the processing script to center-crop images

### File Size Too Large

```javascript
// Reduce quality for smaller files
await sharp(inputPath)
    .resize(1200, 630)
    .webp({ quality: 70 })  // Reduce from 85 to 70
    .toFile(outputPath);
```

### Fonts Not Rendering (Node.js Script)

The canvas library uses system fonts. If fonts don't render correctly:

1. Install font files on your system
2. Use web-safe fallback fonts
3. Consider using `registerFont()` from node-canvas:

```javascript
const { registerFont } = require('canvas');
registerFont('path/to/font.ttf', { family: 'CustomFont' });
```

---

## Best Practices

### Design

1. **Keep it simple** - Title should be readable at small sizes
2. **Use contrasting colors** - Ensure text is legible against background
3. **Consistent branding** - All images should feel like they belong together
4. **Avoid clutter** - Don't add too many elements or icons

### Technical

1. **Always use WebP** - Significantly smaller than PNG/JPG
2. **Target < 50KB** - Faster loading, better crawling
3. **Use CDN hosting** - Better performance globally
4. **Set cache headers** - `max-age=31536000, immutable`
5. **Have a fallback** - Always set a default OG image

### SEO

1. **Match title to content** - Image title should match page title
2. **Include branding** - Consider adding logo or domain name
3. **Test regularly** - Social platforms change their requirements
4. **Update when content updates** - Refresh images for major content changes

---

## Quick Reference Card

```bash
# Generate programmatic image
node scripts/generate-featured-image.cjs "Title Here" output-name

# Process AI-generated image  
node scripts/process-image.cjs input.png ./public/assets/images/output.webp

# Verify image dimensions
identify ./public/assets/images/output.webp
# Should show: 1200x630

# Check file size
ls -lh ./public/assets/images/output.webp
# Should be < 100KB, ideally < 50KB

# Test OG tags
curl -s https://yoursite.com/page/ | grep "og:image"
```

---

## Example Prompt Templates

### For Various Categories

**AI/Tech:**
```
Create a featured image with dark gradient background (dark blue to purple).
Title: "[TITLE]" in bold white text, centered.
Add subtle glowing AI-themed icons: neural network patterns, code brackets, sparkles.
```

**Business/Marketing:**
```
Create a featured image with professional gradient background (navy to teal).
Title: "[TITLE]" in bold white text, centered.
Add subtle business icons: charts, arrows, target symbols.
```

**Tutorial/How-To:**
```
Create a featured image with gradient background (dark teal to green).
Title: "[TITLE]" in bold white text, centered.
Add subtle tutorial icons: numbered steps, checkmarks, lightbulb.
```

**News/Updates:**
```
Create a featured image with gradient background (dark red to orange).
Title: "[TITLE]" in bold white text, centered.
Add subtle news icons: notification bell, update arrows, megaphone outline.
```

---

*Last updated: January 11, 2026*
