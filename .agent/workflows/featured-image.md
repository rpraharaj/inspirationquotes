---
description: Generate professional OG images for blog posts with Inspiration Quotes Hub branding, watermark, and Google compliance. Can run standalone for batch processing or integrated with /blog-master.
---

# 📸 Featured Image Workflow

Generate professional Open Graph (OG) images for blog posts that align with Google guidelines and **Inspiration Quotes Hub's** premium, minimalist aesthetic.

---

## 📋 Quick Reference

**Output:** `public/images/blog/[slug].webp`
**Dimensions:** 1200×630 pixels (1.91:1 aspect ratio)
**Format:** WebP
**Size:** **MUST BE <100KB** (Critical Performance Requirement)
**Watermark:** www.inspirationquoteshub.com (Bottom RIGHT, 20-30px padding)
**Theme:** Premium, Abstract, Minimalist, Motivational (Deep Blue, Gold, Black, White)

**Two Modes:**
- **Integrated Mode:** Called from `/blog-master` for single post
- **Standalone Mode:** Batch process posts missing featured images

---

## 🚀 Mode Selection

### When Invoked from `/blog-master`

The workflow will generate a featured image for the specific post being created.
**Jump to:** [Blog-Master Integration Mode](#-blog-master-integration-mode)

### When Invoked Standalone

```
/featured-image [number]
```

**Examples:**
```
/featured-image 5      # Generate for up to 5 posts missing images
/featured-image 10     # Generate for up to 10 posts missing images
/featured-image all    # Generate for ALL posts missing images
```

---

## ⚡ Standalone Mode: Batch Processing

### Step 1: Scan for Missing Featured Images

Run the scanner script to find blog posts without properly configured featured images:

// turbo
```bash
node scripts/scan-missing-images.cjs --count 20
```

This script checks for:
- Posts missing image files in `public/images/blog/` or `public/images/featured/`
- Posts with image files but frontmatter still pointing to placeholders
- Posts using placeholder images in frontmatter

### Step 2: Process Results

**If output shows:** `✅ All blog posts have featured images correctly configured!`
→ **STOP.** Report to user: "No featured image generation needed. All posts have properly configured featured images."

**If output lists posts needing attention:**
→ Note the count and proceed to Step 3.

### Step 3: Select Generation Method [REQUIRES USER INPUT]

**⛔ STOP AND WAIT FOR USER RESPONSE**

Present the following options to the user and wait for their choice:

---

🎨 **Featured Image Generation Method**

I found **[X] posts** needing featured images.

Which method would you prefer?

**1. AI Generation** (Creative & Premium)
- Unique, abstract designs (Mountains, Paths, Geometry)
- High engagement potential
- Slower (requires individual prompting)

**2. Programmatic Generation** (Consistent)
- Clean text-focused design
- Fast batch processing
- Consistent branding

Enter **1** or **2** (or type **'ai'** / **'prog'**):

---

**DO NOT PROCEED** until user responds with their choice.

### Step 4: Generate Images

Based on user's choice, follow either:
- **User chose 1 or 'ai':** Go to [AI Generation Method](#-method-1-ai-generation)
- **User chose 2 or 'prog':** Go to [Programmatic Generation Method](#-method-2-programmatic-generation)

---

## 🔗 Blog-Master Integration Mode

When this workflow is called from `/blog-master`, follow these steps for the **single post** being created.

### Integration Step 1: Get Post Details

Extract from the post being created:
- **Title:** From frontmatter
- **Slug:** The filename (without `.md`)
- **Category:** From frontmatter

### Integration Step 2: Ask User for Method [REQUIRES USER INPUT]

**⛔ STOP AND WAIT FOR USER RESPONSE**

Since you're actively working with the user on blog creation, ask:

---

🎨 **Featured Image for: "[Post Title]"**

How would you like to generate the featured image?

**1. AI Generation** - Creative, abstract, premium look (slower)
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
✅ Featured Image Generated

File: public/images/blog/[slug].webp
Size: [X] KB
Method: [AI/Programmatic]
Watermark: www.inspirationquoteshub.com ✓

Frontmatter updated with:
heroImage: "/images/blog/[slug].webp"

Proceeding to validation...
```

Then continue with `/blog-validator`.

---

## 🎨 Method 1: AI Generation

Use this method for high-impact posts or when you want unique, emotionally resonant designs.

### Step 1.1: Get Post Details

For each post, extract:
- **Title:** From frontmatter
- **Category:** From frontmatter
- **Slug:** Filename without `.md`

### Step 1.2: Use Optimized AI Prompt Template

**Master Prompt Template (Inspirational Quote Style):**

```
Create a premium, abstract featured image for a blog post titled "[POST TITLE]".

CRITICAL: The final output must be EXACTLY 1200 pixels wide x 630 pixels tall. 
Design the image at this exact aspect ratio (1.91:1) from the start. 
DO NOT squeeze or distort - use proper cropping if needed.

STYLE: Minimalist, high-end, abstract, aspirational.
LAYOUT: Horizontal 1200x630px OG image format. No text in the image itself (title will be overlaid conceptually or image stands alone).

VISUAL CONCEPTS:
- Use abstract visual metaphors for [CATEGORY_CONCEPT].
- Focus on themes of: Growth, ascent, clarity, horizons, light, structure, and balance.
- Avoid human faces or realistic stock photo looks. Use geometric abstraction or stylized landscapes (e.g., stylized mountains, stairs, paths, sun rays).

COLOR PALETTE:
- Primary: Deep Navy Blue (#0F172A) and Gold/Bronze (#D4AF37).
- Accents: White (#FFFFFF) for light/contrast, subtle Charcoal (#333333).
- The overall look should be dark mode compatible but hopeful (contrast of dark and light).

MOOD:
- Inspiring, sophisticated, calm, powerful, determined.

WATERMARK:
- Include the text "www.inspirationquoteshub.com" in the bottom right corner (20-30px from edges).
- Font: Clean, minimal sans-serif.
- Color: Low-opacity white or gold, subtle but readable.

SAFE ZONE:
- Keep main visual interest in the center (middle 50%).
- Leave space at edges.
```

### Category Visual Concepts & Color Palettes

| Category | Visual Concept | Symbols/Shapes | Context |
|----------|----------------|----------------|---------|
| `motivation-success` | Ascent, peaks, overcoming obstacles | Mountain silhouette, upward arrow, stairs, sunrise | Deep Blue + Gold |
| `discipline-focus` | Structure, consistency, unwavering path | Straight geometric lines, grid patterns, steady stairs, tunnel of light | Steel Blue + White |
| `wisdom-life` | Clarity, horizons, reflection | Calm water, open horizon, circle (enso), balanced stones | Soft Gold + Navy |
| `entrepreneurship` | Vision, strategy, building | Abstract skyscrapers, chess pieces, keys, bridges | Navy + Bronze |
| `positive-thinking` | Light, energy, expansion | Sun rays, blooming geometry, expanding circles | Bright Gold + White |
| `relationships` | Connection, balance, harmony | Interlocking rings, overlapping circles, bridge | Soft Blue + Gold |

### Step 1.3: Generate and Process

1. **Generate** image using the `generate_image` tool with the prompt above.
2. **Naming Rule Integration:**
   - Use strict slug format: `[slug].webp`
   - **NO numbers or years** in the filename (e.g., use `motivational-quotes.webp`, NOT `150-motivational-quotes.webp` or `quotes-2026.webp`).

3. **CRITICAL: Process, Crop & Optimize (The "Squeeze Prevention" Workflow)**
   
   Many AI generators create square images. **DO NOT simply resize them to 1200x630** as this causes vertical squeezing.
   
   **Use the `process-image.cjs` script which handles this correctly (cropping instead of resizing):**
   
   // turbo
   ```bash
   node scripts/process-image.cjs [generated_image_path] public/images/blog/[slug].webp --watermark
   ```
   
   *Note: Ensure the output path is `public/images/blog/`.*

4. **Verify Size**:
   // turbo
   ```bash
   ls -lh public/images/blog/[slug].webp
   ```
   
   **Target:** <100KB (ideally 40-80KB).

5. Update the frontmatter:
   // turbo
   ```bash
   node scripts/update-frontmatter.cjs [slug]
   ```

---

## 🔧 Method 2: Programmatic Generation

Use this method for consistent branding and fast batch processing.

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

*Note: You may need to adjust the script to use the new color palette (Navy/Gold) if using this method.*

### Step 2.3: Batch Generation

For multiple posts, run sequentially:

```bash
node scripts/generate-featured-image.cjs "Post Title 1" slug-1 --category motivation --update-frontmatter
node scripts/generate-featured-image.cjs "Post Title 2" slug-2 --category discipline --update-frontmatter
```

---

## 📐 Image Specifications

### Dimensions & Format

| Property | Value | Reason |
|----------|-------|--------|
| **Width** | 1200px | Open Graph standard |
| **Height** | 630px | 1.91:1 aspect ratio |
| **Format** | WebP | 30-50% smaller than PNG |
| **Quality** | 60-85% | Balance quality/size |
| **Max Size** | <100KB | Fast loading |
| **Watermark** | Required | Brand protection |

### Safe Zone Layout

**Critical:** Keep all important content in the **middle 50%** of the image.

```
+----------------------------------------------------------+
|              TOP 25% (157.5px)                           |
|              Background/gradient only                     |
+----------------------------------------------------------+
|                                                          |
|              MIDDLE 50% (315px) ← SAFE ZONE              |
|              ┌────────────────────────────────┐          |
|              │     POST TITLE                 │          |
|              │     (Readable, Centered)       │          |
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
| **Primary Accent** | Gold/Bronze | `#D4AF37` | Highlights, "Success" elements |
| **Secondary Base** | Charcoal | `#333333` | Contrast elements |
| **Light Tint** | Off-White | `#F8FAFC` | Text, light rays, clarity |
| **Watermark** | Low-opacity White | `#FFFFFF` (30-50%) | Branding |

---

## 🔄 Post-Generation Steps

### Step 1: Verify Image

// turbo
```bash
file public/images/blog/[slug].webp && ls -lh public/images/blog/[slug].webp
```

Expected output:
- Format: WebP
- Dimensions: 1200×630
- Size: <100KB

### Step 2: Verify Frontmatter Updated

Check that the blog post's frontmatter references the new image:

```yaml
---
heroImage: "/images/blog/[slug].webp"
---
```

### Step 3: Validation

### Technical Requirements
- [ ] Dimensions: Exactly 1200×630 pixels
- [ ] **ASPECT RATIO CHECK**: Image looks natural, NOT squeezed vertically.
- [ ] Format: WebP
- [ ] **File size: <100KB (CRITICAL)**
- [ ] Watermark visible: "www.inspirationquoteshub.com" (Bottom Right, 20-30px padding)

### Content Requirements
- [ ] Abstract, premium aesthetic (no cheesy stock photos)
- [ ] Fits the emotional tone of the quote category
- [ ] Professional color palette (Dark Blue, Gold, etc.)
- [ ] **Filename Check**: No numbers or years in filename.

---
