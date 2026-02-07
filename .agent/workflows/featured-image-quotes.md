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

**PROBLEM:** AI models often generate **1024×1024 SQUARE** images even when asked for landscape.
**SOLUTION:** We must prompt for a **SQUARE** image but instruct the AI to **COMPOSE FOR THE CENTER STRIP** with text included.

**Master Prompt Template (Center-Strip Composition with Text):**

```
Create a premium, abstract featured image for a quote collection blog post.

POST TITLE (MUST INCLUDE): "[POST_TITLE]"
THEME: [THEME/CATEGORY]

🚨 CRITICAL COMPOSITION RULE (Center-Strip Only):
This image will be cropped to a wide landscape format (1.91:1). 
You MUST generate a SQUARE image (1024x1024), but keep ALL content in the **MIDDLE 50% HORIZONTAL STRIP**.

LAYOUT ZONES:
- Top 25% (0-256px): Empty background, sky, or gradient (WILL BE CROPPED OUT)
- Middle 50% (256-768px): SAFE ZONE - All content MUST be here
- Bottom 25% (768-1024px): Empty background, ground, or shadow (WILL BE CROPPED OUT)

📝 TEXT REQUIREMENTS (CRITICAL):
1. POST TITLE:
   - Text: "[POST_TITLE]"
   - Position: CENTER of the safe zone (vertically centered in middle 50%)
   - Font: Bold, modern sans-serif (e.g., Inter, Montserrat, Poppins)
   - Size: Large and prominent (readable at thumbnail size)
   - Color: High contrast against background (White on dark, Dark on light)
   - Alignment: Center-aligned
   - Max width: 80% of image width (leave margins)

2. WATERMARK:
   - Text: "www.inspirationquoteshub.com"
   - Position: Bottom of safe zone (near the 768px line, but INSIDE safe zone)
   - Position: Horizontally centered
   - Font: Clean, minimal sans-serif
   - Size: Small but readable (14-18pt equivalent)
   - Color: Low-opacity white or gold (#FFFFFF at 40% or #D4AF37 at 50%)
   - Style: Subtle, elegant

🎨 VISUAL METAPHOR (Background):
- Use a strong, abstract visual metaphor for [THEME_CONCEPT]
- [CONTEXTUAL_DETAIL]: For "[POST_TITLE]", the visual should evoke [EMOTIONAL_TONE]
- The visual should complement the text, not compete with it
- Keep background elements subtle enough that text remains highly readable

Examples by theme:
- Success: Mountain peak silhouette in center strip, sky above, base below
- Friendship: Interlocking golden rings behind the text
- Love: Two merging paths with text overlaid
- Discipline: Geometric grid pattern as subtle background

STYLE:
- Minimalist, high-end, abstract, aspirational
- Text must be CRISP and READABLE (not blurry or distorted)
- NO faces or realistic humans (use silhouettes or geometry if needed)
- Premium aesthetic suitable for social media sharing

COLOR PALETTE:
- Use [Specific_Colors_For_Theme] (e.g., Deep Navy & Gold for Success)
- Ensure HIGH CONTRAST between text and background
- Text should pop and be instantly readable

REMEMBER: 
- Top and bottom 25% will be cropped out - keep them simple
- ALL text must be in the middle 50% safe zone
- Title text is the PRIMARY element - make it bold and clear
- Watermark is secondary - keep it subtle but present
```

### Category Visual Concepts & Color Palettes for Quote Posts

| Category/Theme | Visual Concept (Center Strip Focus) | Emotional Tone | Colors |
|----------------|----------------|----------------|--------|
| **Success / Achievement** | **Center:** A glowing mountain peak, a golden staircase rising, or a key. **Top/Bottom:** Dark starry sky / deep shadow base. | Triumphant, Determined | Deep Navy (#0F172A) & Gold |
| **Friendship / Connection** | **Center:** Interlocking golden rings, a bridge connecting two sides, or knotted roots. **Top/Bottom:** Soft blurred gradient. | Warm, Trusting, Loyal | Teal (#115E59) & Soft Gold |
| **Love / Relationships** | **Center:** Two merging paths, a heart-shaped constellation, or a singular blooming rose. **Top/Bottom:** Deep velvet background. | Passionate, Gentle | Burgundy (#881337) & Rose Gold |
| **Breakups / Healing** | **Center:** A cracked geometric shape mending with gold (Kintsugi), or a sun rising over a wall. **Top/Bottom:** Muted grey/blue fog. | Hopeful, Resilient | Slate Blue (#475569) & Silver |
| **Discipline / Focus** | **Center:** A perfect sphere, a straight uninterrupted beam of light, or a compass needle. **Top/Bottom:** Clean, minimal void. | Sharp, Clear, Steady | Steel Blue (#1E3A8A) & White |
| **Wisdom / Life** | **Center:** A lone tree silhouette, balanced stones, or an open book/scroll. **Top/Bottom:** Earth tones/Sky. | Calm, Reflective | Forest Green (#14532D) & Sage |
| **Courage / Strength** | **Center:** A stone pillar resisting waves, a shield, or an anchor. **Top/Bottom:** Stormy sky/Rough sea. | Bold, Unwavering | Charcoal (#333333) & Bronze |
| **Positive Thinking** | **Center:** A sunburst, opening flower, or prism refracting light. **Top/Bottom:** Bright white/yellow gradient. | Uplifting, Radiant | Bright Gold (#F59E0B) & White |

### Practical Example: Filling the Prompt Template

**For a post titled:** "150 Friendship Quotes to Celebrate Your Best Friends"

**Filled Prompt:**
```
Create a premium, abstract featured image for a quote collection blog post.

POST TITLE (MUST INCLUDE): "150 Friendship Quotes to Celebrate Your Best Friends"
THEME: Friendship / Connection

🚨 CRITICAL COMPOSITION RULE (Center-Strip Only):
This image will be cropped to a wide landscape format (1.91:1). 
You MUST generate a SQUARE image (1024x1024), but keep ALL content in the **MIDDLE 50% HORIZONTAL STRIP**.

LAYOUT ZONES:
- Top 25% (0-256px): Empty background, soft blurred gradient (WILL BE CROPPED OUT)
- Middle 50% (256-768px): SAFE ZONE - All content MUST be here
- Bottom 25% (768-1024px): Empty background, soft blurred gradient (WILL BE CROPPED OUT)

📝 TEXT REQUIREMENTS (CRITICAL):
1. POST TITLE:
   - Text: "150 Friendship Quotes to Celebrate Your Best Friends"
   - Position: CENTER of the safe zone (vertically centered in middle 50%)
   - Font: Bold, modern sans-serif (Montserrat Bold or Poppins Bold)
   - Size: Large and prominent (readable at thumbnail size)
   - Color: White (#FFFFFF) on dark background
   - Alignment: Center-aligned
   - Max width: 80% of image width (leave margins)

2. WATERMARK:
   - Text: "www.inspirationquoteshub.com"
   - Position: Bottom of safe zone (around 740px, but INSIDE safe zone)
   - Position: Horizontally centered
   - Font: Clean sans-serif
   - Size: Small but readable (16pt equivalent)
   - Color: Soft Gold (#D4AF37 at 50% opacity)
   - Style: Subtle, elegant

🎨 VISUAL METAPHOR (Background):
- Use interlocking golden rings or a bridge connecting two sides as the central visual
- The visual should evoke warmth, trust, and loyalty
- Keep the background subtle - a soft teal (#115E59) to gold gradient
- The visual should complement the text, not compete with it
- Background elements should be abstract and minimalist

STYLE:
- Minimalist, high-end, abstract, aspirational
- Text must be CRISP and READABLE (not blurry or distorted)
- NO faces or realistic humans
- Premium aesthetic suitable for social media sharing

COLOR PALETTE:
- Primary: Teal (#115E59) and Soft Gold (#D4AF37)
- Text: White (#FFFFFF) for high contrast
- Ensure HIGH CONTRAST between text and background
- Text should pop and be instantly readable

REMEMBER: 
- Top and bottom 25% will be cropped out - keep them simple gradient
- ALL text must be in the middle 50% safe zone
- Title text is the PRIMARY element - make it bold and clear
- Watermark is secondary - keep it subtle but present
```

### Step 1.3: Generate and Process

1. **Generate** image using the `generate_image` tool.
   - **Important:** Request a **Square (1:1)** aspect ratio if the tool allows, or just expect it. The prompt handles the composition.

2. **Naming Rule Integration (CRITICAL):**
   - Use strict slug format: `[slug].webp`
   - **NO numbers or years** (e.g., `friendship-quotes.webp`).

3. **Process, Crop & Optimize (The "Squeeze Prevention" Workflow)**
   
   Since we generated a square with a "safe zone" and text already included, we now crop to that zone.
   
   **Use the `process-image.cjs` script:**
   
   // turbo
   ```bash
   node scripts/process-image.cjs [generated_image_path] public/images/blog/[slug].webp
   ```
   
   **Note:** The `--watermark` flag is optional since the AI should have already included the watermark. Only use it if the AI failed to add the watermark.
   
   **This script performs the Magic Crop:**
   - **Detects Square Input:** Checks source dimensions (likely 1024x1024 or 640x640)
   - **Targeted Crop:** Cuts out the **exact middle 1200x630 area** (Safe Zone)
   - **Preserves Text & Content:** Because our prompt kept the top/bottom 25% empty and text in the middle, everything important is preserved!
   - **No Distortion:** Verifies no vertical squeezing occurs.
   - **Optimizes:** Converts to WebP (<100KB).

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
