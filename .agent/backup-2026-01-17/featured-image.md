---
description: Generate professional OG images for blog posts with black & white branding, watermark, and Google compliance. Can run standalone for batch processing or integrated with /blog-master.
---

# 📸 Featured Image Workflow

Generate professional Open Graph (OG) images for blog posts that align with Google guidelines and AI Agents Kit's minimalist black & white branding.

---

## 📋 Quick Reference

**Output:** `public/images/featured/[slug].webp`
**Dimensions:** 1200×630 pixels (1.91:1 aspect ratio)
**Format:** WebP, <100KB
**Watermark:** www.aiagentskit.com
**Theme:** Minimalist Black & White

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
- Posts missing image files in `public/images/featured/`
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

**1. AI Generation** (Creative)
- Unique, creative designs with icons/illustrations
- More visual appeal
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

**1. AI Generation** - Creative, unique design (slower)
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

File: public/images/featured/[slug].webp
Size: [X] KB
Method: [AI/Programmatic]
Watermark: www.aiagentskit.com ✓

Frontmatter updated with:
heroImage: "/images/featured/[slug].webp"

Proceeding to validation...
```

Then continue with `/blog-validator`.

---

## 🎨 Method 1: AI Generation

Use this method for high-impact posts or when you want unique, creative designs.

### Step 1.1: Get Post Details

For each post, extract:
- **Title:** From frontmatter
- **Category:** From frontmatter
- **Slug:** Filename without `.md`

### Step 1.2: Use Category-Specific Prompt

**Master Prompt Template (Black & White Theme):**

```
Create a featured image for a tech blog (1200x630 pixels):

DESIGN REQUIREMENTS:
- Background: Clean gradient from #000000 (black) to #171717 (dark gray)
- Title: "[POST TITLE]" in bold white (#FFFFFF) text, centered
- Keep ALL text and important elements in the CENTER 50% (vertical)
- Leave TOP 25% and BOTTOM 25% with just background (safe zone for social crops)
- Add subtle [CATEGORY] themed outline icons in light gray (#A3A3A3)
- Add watermark "www.aiagentskit.com" CENTERED, immediately below the title
  with MINIMAL gap, in light gray (#A3A3A3) color, subtle but readable
- Style: Minimalist, professional, black & white only
- NO colors other than black, white, and grayscale
```

### Category Icon Suggestions

| Category | Suggested Icons |
|----------|-----------------|
| `ai-agents` | Bot silhouette, network nodes, autonomous arrows |
| `ai-tools` | Wrench outline, gear, settings cog |
| `llms` | Brain outline, neural network pattern, text blocks |
| `prompt-engineering` | Terminal cursor, code brackets, sparkle |
| `tutorials` | Numbered steps 1-2-3, checkmark, arrow path |
| `ai-news` | Newspaper outline, megaphone, bell icon |
| `chatgpt` | Chat bubble outlines, conversation pattern |
| `mcp` | Plug icon, connection lines, protocol diagram |
| `code-snippets` | Curly braces `{}`, code window frame |
| `vibe-coding` | Magic wand, sparkles, paint brush |
| `ai-comparisons` | Balance scale, vs symbol, split comparison |
| `ai-careers` | Briefcase, ascending chart, trophy |
| `generative-ai` | Image frame, waveform, creation spark |
| `open-source-ai` | Open bracket, community nodes, fork symbol |
| `ai-ethics` | Balance scale, shield, question mark |
| `ai-business` | Chart bars, building, handshake |
| `ai-hardware` | CPU chip, GPU card, circuit pattern |
| `industry-ai` | Factory, hospital cross, legal scales |

### Step 1.3: Generate and Process

1. Generate image using the `generate_image` tool with the prompt above
2. Save the generated image to a temporary location
3. Process the image:
   // turbo
   ```bash
   node scripts/process-image.cjs [input-path] public/images/featured/[slug].webp
   ```

4. Update the frontmatter:
   // turbo
   ```bash
   node scripts/update-frontmatter.cjs [slug]
   ```

5. Verify output meets requirements

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

**Example:**
```bash
node scripts/generate-featured-image.cjs "Claude 4 Released: What Developers Need to Know" claude-4-released --category ai-news --update-frontmatter
```

### Step 2.3: Batch Generation

For multiple posts, run sequentially:

```bash
# Example batch
node scripts/generate-featured-image.cjs "Claude 4 Released" claude-4-released --category ai-news --update-frontmatter
node scripts/generate-featured-image.cjs "Best AI Agent Frameworks" best-ai-agent-frameworks-compared --category ai-agents --update-frontmatter
node scripts/generate-featured-image.cjs "Build Your First AI Agent" build-first-ai-agent-python --category tutorials --update-frontmatter
```

The script automatically:
- Creates black & white gradient background
- Centers the title with proper word wrapping
- Adds corner accent elements
- Adds gradient accent line at bottom
- Adds "www.aiagentskit.com" watermark
- Converts to WebP format
- Verifies file size <100KB
- **Updates frontmatter** when `--update-frontmatter` flag is used

---

## 📐 Image Specifications

### Dimensions & Format

| Property | Value | Reason |
|----------|-------|--------|
| **Width** | 1200px | Open Graph standard |
| **Height** | 630px | 1.91:1 aspect ratio |
| **Format** | WebP | 30-50% smaller than PNG |
| **Quality** | 85% | Balance quality/size |
| **Max Size** | <100KB | Fast loading |
| **Target Size** | <50KB | Optimal performance |

### Safe Zone Layout

```
+----------------------------------------------------------+
|              TOP 25% (157.5px)                           |
|              Background gradient only                     |
|              (May be cropped on some platforms)           |
+----------------------------------------------------------+
|                                                          |
|              MIDDLE 50% (315px)                          |
|              ┌────────────────────────────────┐          |
|              │     POST TITLE HERE            │          |
|              │     (Bold, White, Centered)    │          |
|              │                                │          |
|              │     [Subtle category icons]    │          |
|              └────────────────────────────────┘          |
|                                                          |
+----------------------------------------------------------+
|              BOTTOM 25% (157.5px)                        |
|              Gradient + Accent line                      |
|                          www.aiagentskit.com  ←watermark |
+----------------------------------------------------------+
```

### Color Palette (Black & White Theme)

| Element | Color | Hex |
|---------|-------|-----|
| **Background Dark** | Pure Black | `#000000` |
| **Background Light** | Dark Gray | `#171717` |
| **Text Primary** | White | `#FFFFFF` |
| **Text Muted** | Light Gray | `#A3A3A3` |
| **Accent Elements** | Medium Gray | `#404040` |
| **Watermark** | Subtle Gray | `#525252` |
| **Accent Line** | Gradient White→Gray | `#FFFFFF` → `#404040` |

---

## 🔄 Post-Generation Steps

### Step 1: Verify Image

// turbo
```bash
file public/images/featured/[slug].webp && ls -lh public/images/featured/[slug].webp
```

Expected output:
- Format: WebP
- Dimensions: 1200×630
- Size: <100KB

### Step 2: Verify Frontmatter Updated

Check that the blog post's frontmatter references the new image:

```yaml
---
heroImage: "/images/featured/[slug].webp"
---
```

> **Note:** If using `--update-frontmatter` flag, this is done automatically.

### Step 3: Verify OG Meta Tags (Optional)

After building, check that OG tags are present:

```bash
npm run build && grep -A2 "og:image" dist/blog/[slug]/index.html
```

---

## ✅ Validation Checklist

### Technical Requirements
- [ ] Dimensions: Exactly 1200×630 pixels
- [ ] Format: WebP
- [ ] File size: <100KB (ideally <50KB)
- [ ] Watermark visible: "www.aiagentskit.com"

### Content Requirements
- [ ] Title is readable at small sizes
- [ ] Title is in the middle 50% (safe zone)
- [ ] No text at top/bottom 25%
- [ ] Black & white theme (no colors)

### Integration Requirements
- [ ] Image saved to `public/images/featured/[slug].webp`
- [ ] Blog frontmatter updated with correct path
- [ ] Build succeeds: `npm run build`

### Social Preview Testing

Test with these tools:
- **Facebook:** https://developers.facebook.com/tools/debug/
- **Twitter:** https://cards-dev.twitter.com/validator
- **LinkedIn:** https://www.linkedin.com/post-inspector/

---

## 🛠️ Troubleshooting

### Image Too Large (>100KB)

Reduce quality in processing:

```javascript
await sharp(inputPath)
    .resize(1200, 630)
    .webp({ quality: 70 })  // Reduce from 85 to 70
    .toFile(outputPath);
```

### Text Not Centered

The script auto-wraps long titles. If still not centered:
- Shorten the title
- Adjust font size in script (reduce from 72 to 60)

### Watermark Not Visible

Ensure watermark color (#525252) has sufficient contrast against the background gradient.

### Canvas Module Errors

```bash
# Reinstall canvas with build tools
npm uninstall canvas
npm install canvas
```

On Mac, you may need:
```bash
brew install pkg-config cairo pango libpng jpeg giflib librsvg
```

### Frontmatter Not Updated

If automatic frontmatter update fails, manually update:
```bash
node scripts/update-frontmatter.cjs [slug]
```

Or edit the post directly:
```yaml
heroImage: "/images/featured/[slug].webp"
```

---

## 📁 File Locations

| Purpose | Path |
|---------|------|
| **Workflow** | `.agent/workflows/featured-image.md` |
| **Generator Script** | `scripts/generate-featured-image.cjs` |
| **Processor Script** | `scripts/process-image.cjs` |
| **Scanner Script** | `scripts/scan-missing-images.cjs` |
| **Frontmatter Updater** | `scripts/update-frontmatter.cjs` |
| **Output Directory** | `public/images/featured/` |
| **Reference Guide** | `image-creation-guide.md` |

---

## ⚠️ Agent Instructions

### Critical Rules

1. **NEVER auto-run generation method selection** - Always ask user and wait for response
2. **ALWAYS use scanner script** - Don't use inline node scripts for detection
3. **ALWAYS update frontmatter** - Use `--update-frontmatter` flag or run update script

### For Standalone Invocation (`/featured-image [N]`)

1. Parse the number parameter (or "all")
2. Run: `node scripts/scan-missing-images.cjs --count [N]`
3. If none missing, report and **STOP**
4. **ASK user** for generation method (AI or Programmatic) - **WAIT FOR RESPONSE**
5. Generate images for the requested number of posts
6. Verify frontmatter is updated for each processed post
7. Report summary with file sizes and paths

### For /blog-master Integration

1. **ASK user** for generation method - **WAIT FOR RESPONSE**
2. Generate image for the current post
3. Verify frontmatter is updated
4. Report completion
5. Proceed to `/blog-validator`

### Always Remember

- **Black & white theme only** - No colors
- **Watermark required** - www.aiagentskit.com
- **Safe zone** - Keep title in middle 50%
- **Size limit** - Must be <100KB
- **Frontmatter sync** - Image file AND frontmatter must both be correct

---

*Last updated: 2026-01-11*
*Theme: Minimalist Black & White with watermark*
