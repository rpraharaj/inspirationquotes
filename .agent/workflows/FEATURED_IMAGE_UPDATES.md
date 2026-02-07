# Featured Image Workflow Updates - Feb 2026

## Problem Solved

AI image generators always create **1024x1024 square images**, even when asked for landscape. When cropped to 1200x630, content gets cut off or squeezed.

## Solution Implemented

Updated `/featured-image-quotes.md` with a **"Center-Strip Composition with Text"** strategy.

### Key Changes

#### 1. **Safe Zone Prompting**
- Explicitly tells AI to generate a **SQUARE (1024x1024)** image
- Divides the square into 3 zones:
  - **Top 25% (0-256px):** Empty background (will be cropped)
  - **Middle 50% (256-768px):** SAFE ZONE - all content here
  - **Bottom 25% (768-1024px):** Empty background (will be cropped)

#### 2. **Text Placement Instructions**
The AI prompt now includes detailed text requirements:

**POST TITLE:**
- Position: CENTER of safe zone (vertically centered)
- Font: Bold, modern sans-serif (Inter, Montserrat, Poppins)
- Size: Large and prominent
- Color: High contrast (White on dark, Dark on light)
- Alignment: Center-aligned
- Max width: 80% of image width

**WATERMARK:**
- Text: "www.inspirationquoteshub.com"
- Position: Bottom of safe zone (centered horizontally)
- Font: Clean sans-serif
- Size: Small but readable (14-18pt)
- Color: Low-opacity white or gold
- Style: Subtle, elegant

#### 3. **Visual Metaphor Guidance**
- Background should complement text, not compete
- Abstract, minimalist designs
- Theme-specific color palettes
- High contrast for text readability

#### 4. **Practical Example**
Added a complete filled-out example for "150 Friendship Quotes" showing:
- Exact text to include
- Color choices (Teal & Gold)
- Visual metaphor (interlocking rings)
- Font specifications

## How to Use

### For a New Quote Post:

1. **Extract post details:**
   - Title: "150 Success Quotes for Entrepreneurs"
   - Theme: Success / Achievement
   - Slug: `success-quotes`

2. **Fill the prompt template** (see workflow for full template)
   - Replace `[POST_TITLE]` with actual title
   - Replace `[THEME/CATEGORY]` with theme
   - Choose colors from the category table
   - Specify visual metaphor

3. **Generate with AI:**
   ```
   generate_image tool with the filled prompt
   ```

4. **Process the image:**
   ```bash
   node scripts/process-image.cjs [generated_image_path] public/images/blog/success-quotes.webp
   ```

5. **Verify:**
   - Dimensions: 1200x630 ✓
   - File size: <100KB ✓
   - Text is readable ✓
   - No squeezing ✓

## Expected Results

✅ **Post title clearly visible** in the center
✅ **Watermark present** at bottom-center of safe zone
✅ **Contextual visual** matching the quote theme
✅ **No vertical squeezing** - natural proportions
✅ **File size <100KB** for fast loading
✅ **Professional, premium look** suitable for social sharing

## Category-Specific Guidance

The workflow includes a table with 8 quote themes:
- Success / Achievement → Mountain peaks, gold stairs
- Friendship / Connection → Interlocking rings, bridges
- Love / Relationships → Merging paths, roses
- Breakups / Healing → Kintsugi, rising sun
- Discipline / Focus → Geometric lines, compass
- Wisdom / Life → Tree silhouette, balanced stones
- Courage / Strength → Pillars, shields, anchors
- Positive Thinking → Sunburst, blooming flowers

Each has specific:
- Visual concepts for center strip
- Color palettes
- Emotional tones

## Technical Details

### The "Magic Crop" Process:
1. AI generates 1024x1024 square with content in middle 50%
2. `process-image.cjs` detects square dimensions
3. Script extracts center 1200x630 area
4. Top/bottom 25% (empty background) is discarded
5. Middle 50% (with text & visuals) becomes final image
6. No squeezing, no distortion ✓

### File Processing:
- Input: 1024x1024 PNG/WebP from AI
- Output: 1200x630 WebP <100KB
- Crop: Center extraction (no resize)
- Quality: 75-85% WebP compression

## Next Steps

When creating featured images:
1. Use `/featured-image-quotes` workflow
2. Follow the prompt template exactly
3. Include post title and watermark in AI prompt
4. Process with the script
5. Verify dimensions and text readability

---

**Last Updated:** 2026-02-07
**Workflow File:** `.agent/workflows/featured-image-quotes.md`
