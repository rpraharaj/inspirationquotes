---
description: Generate professional OG images for blog posts with black & white branding, watermark, and Google compliance. Can run standalone for batch processing or integrated with /blog-master.
---

# 📸 Featured Image Workflow

Generate professional Open Graph (OG) images for blog posts that align with Google guidelines and AI Agents Kit's minimalist black & white branding.

---

## 📋 Quick Reference

**Output:** `public/images/featured/[slug].webp`
**Dimensions:** 1200×630 pixels (1.91:1 aspect ratio)
**Format:** WebP
**Size:** **MUST BE <100KB** (Critical Performance Requirement)
**Watermark:** AI Agents Kit
**Theme:** Modern Professional with Dynamic Color Palettes

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

### Step 1.2: Use Optimized AI Prompt Template

**Master Prompt Template (Professional Modern Style):**

```
Create a professional blog featured image for "[POST TITLE]".

STYLE: Modern, clean, professional with a tech/productivity aesthetic
LAYOUT: Horizontal 1200x630px OG image format

VISUAL ELEMENTS:
- Main title text: "[POST TITLE]" in bold, modern sans-serif font
- Subtitle (if applicable): "[SUBTITLE]" in smaller text below title
- Visual metaphor: Abstract geometric shapes or illustration representing [CATEGORY_CONCEPT]
  (e.g., for AI/tech: circuits, neural networks, data flows; for productivity: roadmaps, workflows, dashboards)
- Modern illustration style (NOT generic stock photo)

COLOR SCHEME (choose based on category):
- Professional color palette with vibrant accents:
  * **AI/Tech categories:** Blue (#2563EB) and white base with orange (#F97316) or teal (#14B8A6) accents
  * **Business/Strategy:** Navy (#1E3A8A) with gold (#F59E0B) or emerald (#10B981) accents  
  * **Tutorial/Guide:** Purple (#7C3AED) with cyan (#06B6D4) or lime (#84CC16) accents
  * **News/Updates:** Red (#DC2626) with blue (#3B82F6) accents
- Use gradient backgrounds (subtle, not overwhelming)
- Ensure high contrast for text readability

ICONS & SYMBOLS:
- Small, relevant icons representing key concepts (see category table below)
- Icons should be outline style or minimal line art
- Integrate seamlessly with the overall design

WATERMARK:
- "AI Agents Kit" in bottom right corner
- Subtle but readable
- Use a color that contrasts with background (often white or light gray)

SAFE ZONE COMPLIANCE:
- Keep ALL text and important elements in the CENTER 50% (vertical)
- Leave TOP 25% and BOTTOM 25% with just background/decorative elements
- This ensures content isn't cropped on social platforms

OVERALL FEEL:
- Professional and trustworthy
- Actionable and engaging
- Appeals to the target audience (developers, PMs, business users, etc.)
- NOT generic - unique visual identity
- Modern illustration/abstract style preferred over photorealistic
```

### Category Visual Concepts & Color Palettes

| Category | Visual Concept | Icons/Symbols | Recommended Colors |
|----------|----------------|---------------|--------------------|
| `ai-agents` | Autonomous systems, network orchestration | Bot silhouette, network nodes, autonomous arrows | Blue + Orange accents |
| `ai-tools` | Productivity enhancement, tool selection | Wrench, gear, settings cog, tool dashboard | Blue + Teal accents |
| `llms` | Neural networks, language processing | Brain outline, neural network pattern, text blocks | Purple + Cyan accents |
| `prompt-engineering` | Code/terminal interface, optimization | Terminal cursor, code brackets, sparkle, lightning | Blue + Orange (Product Manager style) |
| `tutorials` | Step-by-step learning path | Numbered steps 1-2-3, checkmark, arrow path | Purple + Lime accents |
| `ai-news` | Breaking updates, announcements | Newspaper, megaphone, bell icon, lightning bolt | Red + Blue accents |
| `chatgpt` | Conversational AI, chat interface | Chat bubbles,  conversation flow, message threads | Teal + Orange accents |
| `mcp` | Protocol connections, integrations | Plug icon, connection lines, protocol diagram | Navy + Gold accents |
| `code-snippets` | Code examples, programming | Curly braces `{}`, code window, syntax highlighting | Dark Blue + Cyan |
| `vibe-coding` | Creative coding, AI-assisted dev | Magic wand, sparkles, paint brush, stars | Purple + Pink accents |
| `ai-comparisons` | Head-to-head analysis, decision | Balance scale, vs symbol, split comparison arrows | Blue + Green |
| `ai-careers` | Professional growth, advancement | Briefcase, ascending chart, trophy, ladder | Navy + Gold accents |
| `generative-ai` | Creative content generation | Image frame, waveform, creation spark, palette | Purple + Teal accents |
| `open-source-ai` | Community, collaboration | Open bracket, community nodes, fork symbol | Emerald + Blue |
| `ai-ethics` | Responsibility, governance | Balance scale, shield, question mark, gavel | Navy + Silver/Gray |
| `ai-business` | ROI, enterprise solutions | Chart bars, building, handshake, growth arrow | Navy + Emerald or Gold |
| `ai-hardware` | Computing power, performance | CPU chip, GPU card, circuit pattern, processor | Blue + Orange technical |
| `industry-ai` | Sector-specific applications | Factory, hospital cross, legal scales, domain icons | Varies by industry |

### Step 1.3: Generate and Process

1. Generate image using the `generate_image` tool with the prompt above
2. Save the generated image with proper naming:
   - Use naming format: `[slug]_featured`
   - Example: `ai-agents-explained_featured`

3. **CRITICAL: Optimize the image to be under 100KB**
   
   Check the generated image size:
   // turbo
   ```bash
   ls -lh /path/to/generated/image.webp
   ```
   
   If the image is **100KB or larger**, optimize it immediately:
   // turbo
   ```bash
   cwebp -q 60 -resize 1200 630 /path/to/generated/image.webp -o public/images/featured/[slug].webp
   ```
   
   If still too large, reduce quality further:
   // turbo
   ```bash
   cwebp -q 50 -resize 1200 630 /path/to/generated/image.webp -o public/images/featured/[slug].webp
   ```
   
   **Target:** Aim for 40-80KB for optimal performance.

4. Verify the optimized image:
   // turbo
   ```bash
   file public/images/featured/[slug].webp && ls -lh public/images/featured/[slug].webp
   ```
   
   Expected output:
   - Format: WebP
   - Dimensions: 1200×630
   - Size: **<100KB** (ideally 40-80KB)

5. Update the frontmatter:
   // turbo
   ```bash
   node scripts/update-frontmatter.cjs [slug]
   ```

6. **MANDATORY VERIFICATION**: Confirm file size is under 100KB:
   ```bash
   SIZE=$(stat -f%z public/images/featured/[slug].webp 2>/dev/null || stat -c%s public/images/featured/[slug].webp 2>/dev/null)
   if [ $SIZE -gt 102400 ]; then echo "⚠️  ERROR: Image is $SIZE bytes (>100KB) - MUST OPTIMIZE"; else echo "✅ Image optimized: $SIZE bytes (<100KB)"; fi
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
- **Optimizes to ensure file size <100KB** (using quality: 85, adjusted if needed)
- **Updates frontmatter** when `--update-frontmatter` flag is used

**Post-Generation Optimization Check:**

After running the script, ALWAYS verify the file size:
// turbo
```bash
ls -lh public/images/featured/[slug].webp
```

If the output shows **100KB or larger**, re-optimize:
// turbo
```bash
cwebp -q 60 -resize 1200 630 public/images/featured/[slug].webp -o public/images/featured/[slug]_optimized.webp && mv public/images/featured/[slug]_optimized.webp public/images/featured/[slug].webp
```

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

### Professional Color Palettes

**Primary Palette (Most Categories):**
| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| **Base Blue** | Professional Blue | `#2563EB` | Primary color, backgrounds |
| **Accent Orange** | Vibrant Orange | `#F97316` | Highlights, CTAs, energy |
| **Accent Teal** | Modern Teal | `#14B8A6` | Alternative accent, fresh |
| **Text Primary** | White | `#FFFFFF` | Main title text |
| **Text Secondary** | Light Gray | `#E5E7EB` | Subtitle text |
| **Watermark** | Subtle White/Gray | `#F3F4F6` | "AI Agents Kit" branding |

**Secondary Palettes (Category-Specific):**
| Purpose | Primary | Accent 1 | Accent 2 | Best For |
|---------|---------|----------|----------|----------|
| **Tech/AI** | Blue `#2563EB` | Orange `#F97316` | Teal `#14B8A6` | AI, LLMs, Tools |
| **Business** | Navy `#1E3A8A` | Gold `#F59E0B` | Emerald `#10B981` | Strategy, ROI, Enterprise |
| **Creative** | Purple `#7C3AED` | Cyan `#06B6D4` | Pink `#EC4899` | Generative AI, Vibe Coding |
| **Learning** | Purple `#7C3AED` | Lime `#84CC16` | Blue `#3B82F6` | Tutorials, Guides |
| **News/Updates** | Red `#DC2626` | Blue `#3B82F6` | Orange `#F97316` | AI News, Announcements |

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
- [ ] **File size: <100KB (CRITICAL - Must Pass)**
  - [ ] Verified with `ls -lh` showing KB value
  - [ ] If >100KB, re-optimize with `cwebp -q 60`
  - [ ] Target range: 40-80KB for optimal performance
- [ ] Watermark visible: "www.aiagentskit.com"

### Content Requirements
- [ ] Title is readable at small sizes
- [ ] Title is in the middle 50% (safe zone)
- [ ] No text at top/bottom 25%
- [ ] Professional color palette (not overly bright or garish)
- [ ] Modern illustration style (not generic stock photos)
- [ ] Watermark "AI Agents Kit" visible in bottom corner

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

**This is a CRITICAL issue that MUST be resolved before publishing.**

**Method 1: Using cwebp (Recommended)**

// turbo
```bash
# Check current size
ls -lh public/images/featured/[slug].webp

# Optimize with quality 60 (good balance)
cwebp -q 60 -resize 1200 630 public/images/featured/[slug].webp -o public/images/featured/[slug]_opt.webp && mv public/images/featured/[slug]_opt.webp public/images/featured/[slug].webp

# If still too large, try quality 50
cwebp -q 50 -resize 1200 630 public/images/featured/[slug].webp -o public/images/featured/[slug]_opt.webp && mv public/images/featured/[slug]_opt.webp public/images/featured/[slug].webp

# Verify new size
ls -lh public/images/featured/[slug].webp
```

**Method 2: Using Sharp in Node Script**

```javascript
const sharp = require('sharp');

await sharp(inputPath)
    .resize(1200, 630, { fit: 'cover' })
    .webp({ 
        quality: 60,      // Start at 60
        effort: 6,        // Higher effort = better compression
        smartSubsample: true
    })
    .toFile(outputPath);

// If still too large, reduce quality to 50 or 40
```

**Quality Guidelines:**
- **Quality 75-85:** Premium (may exceed 100KB)
- **Quality 60:** Sweet spot (usually 40-80KB) ← **Recommended**
- **Quality 50:** High compression (30-60KB)
- **Quality 40:** Maximum compression (20-50KB, still acceptable)

**Real Examples:**
Recently optimized images:
- `30-ai-prompts-product-managers.webp`: 600KB → 40KB (q:60)
- `vibe-coding-starter-kit.webp`: 652KB → 42KB (q:75, cropped)
- `chatgpt-prompts-marketing-that-work.webp`: 480KB → 25KB (q:60)

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

- **Professional color palettes** - Use vibrant but tasteful colors (Blue + Orange/Teal works well)
- **Modern illustration style** - Abstract/geometric shapes, not stock photos
- **Watermark required** - "AI Agents Kit" in bottom corner
- **Safe zone** - Keep title and key elements in middle 50% (vertical)
- **🚨 Size limit - CRITICAL** - **MUST be <100KB** (Non-negotiable performance requirement)
  - Check every image: `ls -lh public/images/featured/[slug].webp`
  - Optimize if needed: `cwebp -q 60 -resize 1200 630 [input] -o [output]`
  - Target: 40-80KB for optimal performance
  - Never publish an image >100KB
- **Frontmatter sync** - Image file AND frontmatter must both be correct
- **Category-appropriate visuals** - Match visual metaphor to content topic

---

*Last updated: 2026-01-11*
*Theme: Minimalist Black & White with watermark*
