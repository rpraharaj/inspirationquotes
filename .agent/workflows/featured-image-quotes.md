---
description: Generate professional OG images for quote blog posts with InspirationalQuotes branding - optimized for quote collection posts with strict quality standards.
---

# 📸 Featured Image Workflow for Quotes

Generate professional Open Graph (OG) images for **quote blog posts** that align with Google guidelines and **InspirationalQuotes Hub's** premium, minimalist aesthetic.

---

## 📋 Quick Reference

**Output:** `public/images/blog/[slug].webp`
**Dimensions:** 1200×630 pixels (1.91:1 aspect ratio)
**Format:** WebP
**Size:** **MUST BE <100KB** (Critical Performance Requirement)
**Watermark:** www.inspirationquoteshub.com (Bottom RIGHT, 20-30px padding)
**Theme:** Premium, Abstract, Minimalist, Inspirational (Deep Blue, Gold, Black, White)

**Two Modes:**
- **Integrated Mode:** Called from `/blog-master` for single post
- **Standalone Mode:** Batch process posts missing featured images

---

## 🚀 Mode Selection

### When Invoked from `/blog-master`

The workflow will generate a featured image for the specific quote post being created.
**Jump to:** [Blog-Master Integration Mode](#-blog-master-integration-mode)

### When Invoked Standalone

```
/featured-image-quotes [number]
```

**Examples:**
```
/featured-image-quotes 5      # Generate for up to 5 posts missing images
/featured-image-quotes 10     # Generate for up to 10 posts missing images
/featured-image-quotes all    # Generate for ALL posts missing images
```

---

## ⚡ Standalone Mode: Batch Processing

### Step 1: Scan for Missing Featured Images

Run the scanner script to find quote blog posts without properly configured featured images:

// turbo
```bash
node scripts/scan-missing-images.cjs --count 20
```

This script checks for:
- Posts missing image files in `public/images/blog/`
- Posts with image files but frontmatter still pointing to placeholders
- Posts using placeholder images in frontmatter

### Step 2: Process Results

**If output shows:** `✅ All blog posts have featured images correctly configured!`
→ **STOP.** Report to user: "No featured image generation needed. All quote posts have properly configured featured images."

**If output lists posts needing attention:**
→ Note the count and proceed to Step 3.

### Step 3: Select Generation Method [REQUIRES USER INPUT]

**⛔ STOP AND WAIT FOR USER RESPONSE**

Present the following options to the user and wait for their choice:

---

🎨 **Featured Image Generation Method**

I found **[X] quote posts** needing featured images.

Which method would you prefer?

**1. AI Generation** (Creative & Premium)
- Unique, abstract designs (Mountains, Paths, Geometry)
- High engagement potential
- Best for high-value quote collections
- Slower (requires individual prompting)

**2. Programmatic Generation** (Consistent)
- Clean text-focused design
- Fast batch processing
- Consistent branding across all posts
- Ideal for batch work

Enter **1** or **2** (or type **'ai'** / **'prog'**):

---

**DO NOT PROCEED** until user responds with their choice.

### Step 4: Generate Images

Based on user's choice, follow either:
- **User chose 1 or 'ai':** Go to [AI Generation Method](#-method-1-ai-generation)
- **User chose 2 or 'prog':** Go to [Programmatic Generation Method](#-method-2-programmatic-generation)

---

## 🔗 Blog-Master Integration Mode

When this workflow is called from `/blog-master`, follow these steps for the **single quote post** being created.

### Integration Step 1: Get Post Details

Extract from the quote post being created:
- **Title:** From frontmatter (usually in format "[Number] [Theme] Quotes for [Context]")
- **Slug:** The filename (without `.md`)
- **Category:** From frontmatter
- **Main Theme:** Extract the primary theme (e.g., "success", "motivation", "discipline")

### Integration Step 2: Ask User for Method [REQUIRES USER INPUT]

**⛔ STOP AND WAIT FOR USER RESPONSE**

Since you're actively working with the user on blog creation, ask:

---

🎨 **Featured Image for: \"[Post Title]\"**

How would you like to generate the featured image?

**1. AI Generation** - Creative, abstract, premium look (slower, recommended for quote posts)
**2. Programmatic** - Text-focused, consistent branding (faster)

Enter **1** or **2**:

---

**DO NOT PROCEED** until user responds.

### Integration Step 3: Generate the Image

Based on user choice:
- **AI:** Use the [AI Generation Method](#-method-1-ai-generation) for this single post
- **Programmatic:** Run:
  // turbo
  ```bash
  node scripts/generate-featured-image.cjs "[POST_TITLE]" [SLUG] --category [CATEGORY] --update-frontmatter
  ```

### Integration Step 4: Report and Continue

After generating, report:

```
✅ Featured Image Generated for Quote Post

File: public/images/blog/[slug].webp
Size: [X] KB
Method: [AI/Programmatic]
Watermark: www.inspirationquoteshub.com ✓
Aspect Ratio: 1200×630 (No squeezing) ✓

Frontmatter updated with:
heroImage: "/images/blog/[slug].webp"

Proceeding to validation...
```

Then continue with `/blog-validator`.

---

## 🎨 Method 1: AI Generation

Use this method for high-impact quote posts or when you want unique, emotionally resonant designs.

**RECOMMENDED for quote collection posts** as they deserve premium, engaging visuals.

### Step 1.1: Get Post Details

For each quote post, extract:
- **Title:** From frontmatter
- **Category:** From frontmatter
- **Main Theme:** Extract the primary theme (e.g., "courage", "success", "motivation")
- **Slug:** Filename without `.md`

### Step 1.2: Use Optimized AI Prompt Template for Quote Posts

**Master Prompt Template (Quote Collection Style):**

```
Create a premium, abstract featured image for a quote collection blog post titled "[POST TITLE]".

CRITICAL: The final output must be EXACTLY 1200 pixels wide x 630 pixels tall. 
Design the image at this exact aspect ratio (1.91:1) from the start. 
DO NOT squeeze or distort - use proper cropping if needed.

CONTEXT: This is for a curated collection of [THEME] quotes designed to inspire and motivate readers.

STYLE: Minimalist, high-end, abstract, aspirational, timeless.
LAYOUT: Horizontal 1200x630px OG image format. The image should stand alone without text overlay (visual metaphor only).

VISUAL CONCEPTS:
- Use abstract visual metaphors for [THEME_CONCEPT].
- Focus on themes of: Growth, ascent, clarity, horizons, light, inner strength, wisdom, and balance.
- Avoid human faces or realistic stock photo looks. Use geometric abstraction or stylized landscapes.
- Examples: Stylized mountains, ascending stairs, winding paths, sun rays, horizon lines, geometric patterns suggesting growth/clarity.

COLOR PALETTE for [CATEGORY]:
- Primary: Deep Navy Blue (#0F172A) and Gold/Bronze (#D4AF37)
- Accents: White (#FFFFFF) for light/contrast, subtle Charcoal (#333333)
- The overall look should be dark mode compatible but hopeful (contrast of dark and light)
- Evoke feelings of: [EMOTIONAL_TONE]

MOOD:
- Inspiring, sophisticated, calm, powerful, determined, reflective
- The image should resonate with someone seeking [THEME] wisdom

WATERMARK:
- Include the text "www.inspirationquoteshub.com" in the bottom right corner (20-30px from edges)
- Font: Clean, minimal sans-serif
- Color: Low-opacity white or gold (#FFFFFF at 40% or #D4AF37 at 50%), subtle but readable

SAFE ZONE:
- Keep main visual interest in the center (middle 50%)
- Leave breathing space at edges for social media crops
- Ensure the composition works at both full size and thumbnail
```

### Category Visual Concepts & Color Palettes for Quote Posts

| Category/Theme | Visual Concept | Symbols/Shapes | Emotional Tone |
|----------------|----------------|----------------|----------------|
| **Success/Achievement** | Ascent, peaks, overcoming obstacles | Mountain silhouette, upward arrow, stairs, sunrise, summit | Triumphant, Determined |
| **Discipline/Focus** | Structure, consistency, unwavering path | Straight geometric lines, grid patterns, steady stairs, tunnel of light, compass | Resolute, Steady |
| **Motivation/Inspiration** | Energy, forward movement, momentum | Dynamic arrows, road ahead, sun rays, expanding circles | Energized, Hopeful |
| **Courage/Strength** | Resilience, standing firm, inner power | Strong foundations, pillars, shields, mountains, anchor | Bold, Unwavering |
| **Wisdom/Life** | Clarity, horizons, reflection, depth | Calm water, open horizon, circle (enso), balanced stones, tree | Contemplative, Calm |
| **Relationships/Love** | Connection, balance, harmony, unity | Interlocking rings, overlapping circles, bridge, intertwined paths | Warm, Connected |
| **Entrepreneurship** | Vision, strategy, building, risk-taking | Abstract skyscrapers, chess pieces, keys, bridges, pathways | Ambitious, Strategic |
| **Positive Thinking** | Light, energy, expansion, brightness | Sun rays, blooming geometry, expanding circles, light beams | Uplifting, Radiant |
| **Hard Work/Perseverance** | Endurance, journey, persistence | Long winding path, marathon road, steps, climbing | Persistent, Resilient |

### Step 1.3: Generate and Process

1. **Generate** image using the `generate_image` tool with the customized prompt above.

2. **Naming Rule Integration (CRITICAL):**
   - Use strict slug format: `[slug].webp`
   - **NO numbers or years** in the filename
   - ✅ CORRECT: `motivational-quotes.webp`, `success-quotes.webp`
   - ❌ WRONG: `150-motivational-quotes.webp`, `quotes-2026.webp`, `100-success-quotes.webp`

3. **CRITICAL: Process, Crop & Optimize (The "Squeeze Prevention" Workflow)**
   
   Many AI generators create square images (e.g., 640×640). **DO NOT simply resize them to 1200x630** as this causes vertical squeezing.
   
   **Use the `process-image.cjs` script which handles this correctly (cropping instead of resizing):**
   
   // turbo
   ```bash
   node scripts/process-image.cjs [generated_image_path] public/images/blog/[slug].webp --watermark
   ```
   
   This script will:
   - Check source dimensions
   - Resize to larger dimension while maintaining aspect ratio
   - Center-crop to exact 1200×630
   - Verify dimensions
   - Convert to WebP with optimal quality (75-85%)
   - Apply watermark if needed
   - Compress to target size (<100KB)

4. **Verify Dimensions and Size:**
   // turbo
   ```bash
   sips -g pixelWidth -g pixelHeight public/images/blog/[slug].webp && ls -lh public/images/blog/[slug].webp
   ```
   
   **Expected:**
   - pixelWidth: 1200
   - pixelHeight: 630
   - File size: <100KB (ideally 40-80KB)

5. **Update the frontmatter:**
   // turbo
   ```bash
   node scripts/update-frontmatter.cjs [slug]
   ```

### Step 1.4: Visual Quality Check

After generation, verify:
- [ ] Image is NOT vertically compressed or squeezed
- [ ] Visual elements are naturally proportioned
- [ ] Watermark is clearly visible in bottom right corner
- [ ] Colors align with quote theme (Deep Blue, Gold, White)
- [ ] Design feels premium and timeless, not generic
- [ ] File size is <100KB

---

## 🔧 Method 2: Programmatic Generation

Use this method for consistent branding and fast batch processing of quote posts.

### Step 2.1: Ensure Dependencies

// turbo
```bash
npm list canvas sharp 2>/dev/null || npm install canvas sharp
```

### Step 2.2: Generate Single Image

// turbo
```bash
node scripts/generate-featured-image.cjs "[Post Title]" [slug] --category [category] --update-frontmatter
```

**Note:** Ensure the script uses the InspirationalQuotes color palette:
- Deep Navy (#0F172A)
- Gold (#D4AF37)
- White (#FFFFFF)

### Step 2.3: Batch Generation

For multiple quote posts, run sequentially:

```bash
node scripts/generate-featured-image.cjs "150 Success Quotes for Entrepreneurs" success-quotes --category motivation-success --update-frontmatter
node scripts/generate-featured-image.cjs "100 Discipline Quotes to Stay Consistent" discipline-quotes --category discipline-focus --update-frontmatter
node scripts/generate-featured-image.cjs "Courage Quotes for Difficult Times" courage-quotes --category wisdom-life --update-frontmatter
```

---

## 📐 Image Specifications for Quote Posts

### Dimensions & Format

| Property | Value | Reason |
|----------|-------|--------|
| **Width** | 1200px | Open Graph standard |
| **Height** | 630px | 1.91:1 aspect ratio |
| **Aspect Ratio** | 1.91:1 | **CRITICAL: Must NOT be squeezed** |
| **Format** | WebP | 30-50% smaller than PNG |
| **Quality** | 75-85% | Balance quality/size |
| **Max Size** | <100KB | Fast loading, Core Web Vitals |
| **Target Size** | 40-80KB | Optimal performance |
| **Watermark** | Required | Brand protection + authority |

### Safe Zone Layout for Quote Images

**Critical:** Keep all important content in the **middle 50%** of the image.

```
+----------------------------------------------------------+
|              TOP 25% (157.5px)                           |
|              Background/gradient only                     |
+----------------------------------------------------------+
|                                                          |
|              MIDDLE 50% (315px) ← SAFE ZONE              |
|              ┌────────────────────────────────┐          |
|              │   VISUAL METAPHOR              │          |
|              │   (Mountain/Path/Geometry)     │          |
|              │                                │          |
|              │  www.inspirationquoteshub.com  │          |
|              └────────────────────────────────┘          |
|                                                          |
+----------------------------------------------------------+
|              BOTTOM 25% (157.5px)                        |
|              Background/gradient                         |
+----------------------------------------------------------+
```

### Professional Color Palette (Quote Website)

| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| **Primary Base** | Deep Navy | `#0F172A` | Backgrounds, strong foundations |
| **Primary Accent** | Gold/Bronze | `#D4AF37` | Highlights, "Success/Achievement" elements |
| **Secondary Accent** | Deep Blue | `#1E3A8A` | Alternative accent for variety |
| **Contrast Base** | Charcoal | `#333333` | Contrast elements, text on light |
| **Light Tint** | Off-White | `#F8FAFC` | Light rays, clarity, text on dark |
| **Watermark** | Low-opacity White or Gold | `#FFFFFF` (40%) or `#D4AF37` (50%) | Branding |

---

## 🚨 CRITICAL: AI Image Generation & Cropping Workflow

**PROBLEM:** AI image generators often create **square images (e.g., 640×640)** which must be **CROPPED, NOT RESIZED** to 1200×630 to avoid squeezing/distortion.

### ❌ WRONG Approach (Causes Squeezing):
```bash
# This SQUEEZES a 640x640 square into 1200x630 - DON'T DO THIS!
cwebp -resize 1200 630 input_640x640.png -o output.webp
```
**Result:** Vertically compressed, distorted image ❌

### ✅ CORRECT Approach (Use the Script):

**The `process-image.cjs` script handles this automatically:**

```bash
node scripts/process-image.cjs [generated_image_path] public/images/blog/[slug].webp --watermark
```

**What the script does:**

1. **Check source image dimensions**
   ```bash
   sips -g pixelWidth -g pixelHeight generated_image.png
   ```
   Example output: `640x640` (square)

2. **Resize to larger dimension while maintaining aspect ratio**
   ```bash
   sips -z 1200 1200 generated_image.png --out /tmp/resized.png
   ```

3. **Center-crop to exact 1200×630**
   ```bash
   sips -c 630 1200 /tmp/resized.png --out /tmp/cropped.png
   ```

4. **Verify dimensions are exact**
   ```bash
   sips -g pixelWidth -g pixelHeight /tmp/cropped.png
   ```
   Expected output: `pixelWidth: 1200`, `pixelHeight: 630`

5. **Convert to WebP (NO resizing)**
   ```bash
   cwebp -q 75 /tmp/cropped.png -o public/images/blog/[slug].webp
   ```

6. **Verify file size**
   ```bash
   ls -lh public/images/blog/[slug].webp
   ```
   Target: <100KB (ideally 40-80KB)

---

## 🔄 Post-Generation Steps

### Step 1: Verify Image Quality

// turbo
```bash
sips -g pixelWidth -g pixelHeight public/images/blog/[slug].webp && file public/images/blog/[slug].webp && ls -lh public/images/blog/[slug].webp
```

Expected output:
- **pixelWidth:** 1200
- **pixelHeight:** 630
- **Format:** WebP
- **Size:** <100KB

### Step 2: Verify Frontmatter Updated

Check that the quote post's frontmatter references the new image:

```yaml
---
title: "150 Success Quotes for Entrepreneurs"
heroImage: "/images/blog/success-quotes.webp"
---
```

**Critical checks:**
- ✅ Path starts with `/images/blog/`
- ✅ Uses `.webp` extension
- ✅ Slug in filename matches post slug (no numbers/years)

### Step 3: Validation Checklist

### Technical Requirements
- [ ] **Dimensions:** Exactly 1200×630 pixels (verify with `sips`)
- [ ] **ASPECT RATIO CHECK:** Image looks natural, NOT squeezed vertically
- [ ] **Format:** WebP
- [ ] **File size:** <100KB (CRITICAL for Core Web Vitals)
- [ ] **Target size:** 40-80KB (optimal)
- [ ] **Watermark visible:** "www.inspirationquoteshub.com" (Bottom Right, 20-30px padding)
- [ ] **Watermark readable:** Low-opacity white or gold, subtle but clear

### Content Requirements
- [ ] **Abstract, premium aesthetic** (no cheesy stock photos or faces)
- [ ] **Fits the emotional tone** of the quote category/theme
- [ ] **Professional color palette:** Deep Blue, Gold, White (InspirationalQuotes brand)
- [ ] **Filename Check:** No numbers or years in filename (e.g., `success-quotes.webp` NOT `150-success-quotes.webp`)
- [ ] **Visual metaphor aligns** with quote theme (mountains for success, paths for journey, etc.)
- [ ] **Safe zone respected:** Main content in middle 50%

### SEO & Performance Requirements
- [ ] **Frontmatter updated** with correct `heroImage` path
- [ ] **File optimized:** WebP format with 75-85% quality
- [ ] **Load time:** Fast enough for Core Web Vitals (file size <100KB ensures this)
- [ ] **Social media preview:** Image displays correctly when shared (1200×630 is OG standard)

---

## 📊 Validation Report Template

After generation, provide this report:

```
✅ Featured Image Generation Complete

QUOTE POST: "[Post Title]"
SLUG: [slug]

📁 FILE DETAILS:
   Path: public/images/blog/[slug].webp
   Dimensions: [width] × [height] (Expected: 1200×630)
   File Size: [size] KB (Target: <100KB)
   Format: WebP

🎨 VISUAL QUALITY:
   ✓ Aspect ratio correct (no squeezing)
   ✓ Watermark visible (www.inspirationquoteshub.com)
   ✓ Color palette: Deep Blue + Gold + White
   ✓ Premium, abstract design

📝 FRONTMATTER:
   ✓ heroImage: "/images/blog/[slug].webp"

🚀 PERFORMANCE:
   File size: [X] KB ✓ (Under 100KB requirement)
   WebP format: ✓
   Load time: Excellent

NEXT STEPS:
→ Proceeding to /blog-validator for full quality check
```

---

## 🎯 Best Practices for Quote Post Images

### Do's ✅

- **Use abstract visual metaphors** that connect to the quote theme
- **Keep it timeless** - avoid trendy design elements that will age poorly
- **Maintain brand consistency** - use the InspirationalQuotes color palette
- **Think mobile-first** - ensure design is recognizable as thumbnail
- **Prioritize clarity** - simple, bold visuals over complex compositions
- **Test on social platforms** - verify OG preview looks good

### Don'ts ❌

- **Never use faces or people** in quote post images (keep it abstract)
- **Never squeeze images** - always crop, never resize square to 1200×630
- **Never use stock photo clichés** (shaking hands, jumping people, etc.)
- **Never include years or numbers** in filenames
- **Never exceed 100KB** file size (performance requirement)
- **Never skip the watermark** (brand protection)
- **Never use garish colors** - stick to the refined palette

---

## 🔍 Troubleshooting

### Issue: Image looks squeezed vertically

**Cause:** Resized instead of cropped
**Solution:** Use `process-image.cjs` script which crops properly

### Issue: File size >100KB

**Solution:**
```bash
cwebp -q 70 /tmp/cropped.png -o public/images/blog/[slug].webp
```
Reduce quality to 70% if needed (acceptable range: 60-85%)

### Issue: Watermark not visible

**Solution:** Re-run with `--watermark` flag:
```bash
node scripts/process-image.cjs [input] [output] --watermark
```

### Issue: Wrong dimensions

**Verify:**
```bash
sips -g pixelWidth -g pixelHeight public/images/blog/[slug].webp
```
If wrong, re-run the cropping step in `process-image.cjs`.

---

## 📚 Related Workflows

- **`/blog-quality-standards-quotes`** - Quote post quality standards (references featured image requirements)
- **`/blog-master`** - Main blog creation workflow (calls this workflow)
- **`/blog-validator`** - Validates images meet all requirements

---

**Last Updated:** February 2026
**Version:** 1.0 (Quote-specific adaptation)
