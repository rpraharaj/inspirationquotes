---
description: Blog quality standards for InspirationalQuotes - human voice, SEO, E-E-A-T, and quote-specific excellence.
---

# 📋 Blog Quality Standards for InspirationalQuotes

**Single source of truth** for blog content quality requirements for our quotes website.

> **For Agents:** Before executing any blog workflow, review the relevant sections of this document. Do NOT reproduce these lists inline—reference this document instead.

---

## 📚 Table of Contents

1. [Human Voice Requirements](#1-human-voice-requirements)
2. [AI Banned Phrases](#2-ai-banned-phrases)
3. [Information Currency Rules](#3-information-currency-rules)
4. [Quote Attribution Requirements](#4-quote-attribution-requirements)
5. [E-E-A-T Signals](#5-e-e-a-t-signals)
6. [Internal Linking Requirements](#6-internal-linking-requirements)
7. [External Linking Requirements](#7-external-linking-requirements)
8. [Word Count Requirements](#8-word-count-requirements)
9. [SEO On-Page Requirements](#9-seo-on-page-requirements)
10. [Heading Structure Rules](#10-heading-structure-rules)
11. [Keyword Strategy Requirements](#11-keyword-strategy-requirements)
12. [Section Structure Requirements](#12-section-structure-requirements)
13. [Featured Image Requirements](#13-featured-image-requirements)
14. [Quote Collections Requirements](#14-quote-collections-requirements)

---

## 1. Human Voice Requirements

### Voice & Tone

| Aspect | Requirement |
|--------|-------------|
| **Tone** | Warm, inspiring, and conversational—like sharing wisdom with a friend |
| **Perspective** | First-person when sharing experiences (\"I've found...\", \"These quotes helped me...\") |
| **Style** | Reflective yet accessible. Balance depth with clarity |

### Required Elements Checklist

Every blog post MUST include:

- [ ] **Personal opening** - Start with a story, moment of reflection, or personal connection to the topic
- [ ] **First-person experiences** - At least 2-3 \"I've found...\", \"When I needed inspiration...\" moments
- [ ] **Relatable context** - Explain WHEN/WHY someone might need these quotes
- [ ] **Emotional connection** - Address feelings, struggles, or aspirations readers may have
- [ ] **Contractions used** - Consistent use of don't, it's, they're, etc.
- [ ] **Conversational transitions** - \"Here's what I've learned...\", \"That said...\", NOT \"Additionally,\"
- [ ] **Authentic storytelling** - 1-2 personal anecdotes about quotes' impact
- [ ] **Sentence variety** - Mix of short (5 words) and medium (15-20 words)

### Human Voice Scoring (For Review & Validation)

| Element | Score 0 | Score 1 | Score 2 | Minimum |
|---------|---------|---------|---------|---------|
| **Personal anecdotes** | None | 1-2 | 3+ | 2 |
| **Emotional context** | None | 1 | 2+ | 1 |
| **Contractions** | Formal | Mixed | Natural | 2 |
| **Sentence variety** | Uniform | Some | Dynamic | 2 |
| **Relatable situations** | None | Some | Well-placed | 1 |
| **Quote impact stories** | None | Present | Compelling | 1 |

**Minimum Total Score: 10/12** (posts scoring below this FAIL validation)

### Good vs Bad Examples

#### Opening Sentences

| ❌ Fails Test | ✅ Passes Test |
|---------------|----------------|
| \"This article contains 50 motivational quotes...\" | \"Last year, during my toughest week, one quote changed everything.\" |
| \"In this comprehensive collection...\" | \"We all need a reminder sometimes that we're stronger than we think.\" |
| \"Quotes are important for motivation...\" | \"There's something magical about finding the right words at the right moment.\" |

#### Context & Storytelling

| ❌ Avoid | ✅ Use Instead |
|----------|----------------|
| \"Here are 50 quotes about success.\" | \"When I was struggling with self-doubt, these quotes reminded me of what's possible.\" |
| \"These quotes will inspire you.\" | \"I keep coming back to these words whenever I need to refocus on my goals.\" |
| \"Famous people said these quotes.\" | \"What I love about these quotes is how they capture universal truths in just a few words.\" |

---

## 2. AI Banned Phrases

### ZERO TOLERANCE - Automatic Validation Failure

These phrases MUST NOT appear anywhere in the content:

```
❌ \"In this comprehensive collection...\"
❌ \"Whether you're seeking motivation or inspiration...\"
❌ \"By the end of this article...\"
❌ \"It's important to note that...\"
❌ \"In today's fast-paced world...\"
❌ \"This article will explore...\"
❌ \"In conclusion...\" (just write the conclusion)
❌ \"Quotes have the power to...\" (too generic)
```

### WARNING - Minimize or Rephrase

These patterns should be avoided or replaced:

| Pattern | Problem | Better Alternative |
|---------|---------|-------------------|
| \"incredibly inspiring\" | Overused cliché | Be specific about WHY it's inspiring |
| \"powerful words\" | Vague intensifier | Describe the specific impact |
| \"life-changing\" (without context) | Hyperbolic | Share HOW it changed something |
| \"utilize\" | Unnecessarily formal | \"use\" |
| \"in order to\" | Wordy | \"to\" |

---

## 3. Information Currency Rules

### The Golden Rule

**All content must use the CURRENT DATE from the system context as the reference point.**

The system provides the current date in format: `YYYY-MM-DDTHH:MM:SS+TZ`

### Date Requirements

| Element | Requirement |
|---------|-------------|
| **pubDate** | Use today's date from system context |
| **Year references** | Use current year (e.g., \"in 2026\", \"as of 2026\") |
| **Quote context** | Verify quotes are correctly attributed with current research |
| **Cultural references** | Use contemporary examples readers understand |

### Source Age Limits for Quote Attribution

| Topic Type | Maximum Source Age |
|------------|-------------------|
| Quote verification | Use most authoritative/recent source |
| Author biographies | Check for updates within 1 year |
| Historical context | Properly labeled as historical |

### Search Query Tips

When researching quotes and authors:
```
\"[quote text] author verification\"
\"[author name] biography [current year]\"
\"[quote] original source\"
\"did [author] really say [quote]\"
```

---

## 4. Quote Attribution Requirements

### CRITICAL - Accuracy First

**Single most important rule:** NEVER attribute a quote incorrectly.

### Verification Requirements

For EVERY quote in an article:

- [ ] **Verify authorship** - Search \"[quote text] + author\" to confirm
- [ ] **Check misattributions** - Search \"[quote] + misattributed\" or \"fake\"
- [ ] **Find original source** - When possible, link to speech/book/interview
- [ ] **Use \"Unknown\" when uncertain** - Better than wrong attribution

### Common Misattribution Pitfalls

| Issue | Solution |
|-------|----------|
| **Quote appears on many sites with different authors** | Research primary sources; use \"Unknown\" if unverifiable |
| **Quote sounds like someone famous** | Verify before attributing; many are falsely attributed to Einstein, Gandhi, etc. |
| **Quote is paraphrased** | Note if it's a paraphrase, not exact wording |
| **Quote is from a movie/show, not the actor** | Attribute to character name or work, not actor |

### Format Standards

**For verified quotes:**
```markdown
> "Quote text here."
> — Author Name
```

**For quotes with context:**
```markdown
> "Quote text here."
> — Author Name, *Book Title* (Year)
```

**For uncertain attribution:**
```markdown
> "Quote text here."
> — Unknown (often attributed to Author Name)
```

### E-E-A-T for Quote Content

| Signal | How to Demonstrate |
|--------|-------------------|
| **Expertise** | Show knowledge of quote origins and context |
| **Authoritativeness** | Link to authoritative sources for attribution |
| **Trustworthiness** | Admit when attribution is uncertain or disputed |

---

## 5. E-E-A-T Signals

### What E-E-A-T Means for Quote Blogs

| Signal | Meaning | How to Demonstrate |
|--------|---------|-------------------|
| **Experience** | Personal connection with quotes | \"This quote helped me when...\", \"I discovered this while...\" |
| **Expertise** | Understanding of quote context | Accurate attribution, historical context, thematic connections |
| **Authoritativeness** | Credible curation | Link to original sources, cite authoritative biographies |
| **Trustworthiness** | Honest presentation | Verify attributions, admit uncertainty, avoid fake quotes |

### Minimum Requirements Per Post

- [ ] At least 2 first-person experiences with quotes
- [ ] All quotes verified for correct attribution
- [ ] 2-3 links to authoritative external sources (author bios, quote databases, original works)
- [ ] Context provided for quotes (when/why author said it, if known)
- [ ] Admission when attribution is uncertain or disputed

---

## 6. Internal Linking Requirements

### Quantity

- **Minimum:** 3 internal links per post
- **Maximum:** 5 internal links
- **Distribution:** Spread throughout different sections (not clustered)
- **Placement:** Distribute across multiple H2 sections for natural flow

### Quality Rules

| Rule | Requirement |
|------|-------------|
| **Placement** | Within paragraph text, not standalone |
| **Anchor Text** | Descriptive, topic-focused (NEVER \"click here\") |
| **Relevance** | Link to related quote collections or topics |
| **Context** | Natural fit within the sentence |

### Internal Link Targets

**CRITICAL:** Only link to **published blog posts** in the `/blog/` directory.

**DO NOT link to:**
- ❌ `/quotes/` paths (these don't exist)
- ❌ Unpublished posts
- ❌ Draft content

**Valid link targets:**
- ✅ Published blog posts: `/blog/[slug]/`
- ✅ Related quote collection posts that are live
- ✅ Thematic blog posts that are published

### Verification Before Linking

Before adding an internal link:
1. Verify the target post exists in `src/content/blog/`
2. Confirm the post is published (not draft)
3. Use the correct slug from the filename
4. Use the `/blog/[slug]/` format with trailing slash

### Format Examples

**✅ CORRECT:**
```markdown
If you're looking for more wisdom on this topic, explore our [perseverance quotes](/blog/perseverance-quotes/).

For more inspiration, check out our collection of [quotes about strength](/blog/strength-quotes/).
```

**❌ WRONG:**
```markdown
[perseverance quotes](/quotes/perseverance-quotes)     ❌ Wrong path - don't use /quotes/
[some post](/blog/unpublished-post/)                  ❌ Post doesn't exist yet
```

---

## 7. External Linking Requirements

### Quantity

- **Minimum:** 3 external links per post
- **Maximum:** 5 external links
- **Distribution:** Spread throughout different sections (not clustered)
- **Placement:** Distribute across multiple H2 sections to high authority sites

### Required Format (Google-Compliant)

**⚠️ IMPORTANT:** ALL external links MUST use HTML format, NOT markdown.

**REQUIRED HTML Format:**
```html
<a href="https://example.com/page" target="_blank" rel="noopener">Descriptive anchor text</a>
```

### Required Attributes

| Attribute | Purpose | Required? |
|-----------|---------|-----------|
| `target="_blank"` | Opens link in new tab | ✅ ALWAYS |
| `rel="noopener"` | Security (prevent tabnapping) | ✅ ALWAYS |
| `rel="nofollow"` | Don't pass PageRank | Only for untrusted sources |

### Good vs Bad Examples

| ❌ WRONG (Markdown) | ✅ CORRECT (HTML) |
|---------------------|-------------------|
| `[Maya Angelou biography](https://example.com)` | `<a href="https://example.com" target="_blank" rel="noopener">Maya Angelou's official biography</a>` |
| `[Source](https://example.com)` | `<a href="https://example.com" target="_blank" rel="noopener">Original speech transcript</a>` |

### Source Quality for Quotes

Prioritize sources in this order:

| Priority | Source Type | Example |
|----------|-------------|---------|
| **1** | Original works | Books, speeches, interviews (primary sources) |
| **2** | Authoritative quote databases | Quote Investigator, Wikiquote (with citations) |
| **3** | Official biographies | Author websites, publisher pages |
| **4** | Academic sources | Universities, scholarly articles |
| **5** | Reputable media | Major publications, verified interviews |

### Sources to AVOID

- ❌ Quote aggregator sites without sources
- ❌ Pinterest or social media as primary sources
- ❌ Sites with known misattributions
- ❌ Low-quality blogs without verification
- ❌ Sites without publication dates or authors

---

## 8. Word Count Requirements

### Minimum Word Count

**Minimum: 2,000-2,500 words** for quote collection posts

> **Note:** For in-depth author profiles or thematic explorations, consider 3,000+ words

### Word Count Validation

| Count | Status |
|-------|--------|
| ≥ 2,500 | ✅ PASS |
| 2,000-2,499 | ⚠️ WARN - Consider adding more context |
| < 2,000 | ❌ FAIL - Content too thin |

### Content Depth Guidelines

- Provide CONTEXT for quotes (when/why they were said)
- Include author background
- Explain thematic connections
- Share personal reflections on quotes' meanings
- Discuss how quotes apply to modern situations

---

## 9. SEO On-Page Requirements

### Title Tag

| Check | Requirement |
|-------|-------------|
| Length | 50-60 characters |
| Keyword | Primary keyword near the front |
| Format | Compelling, emotionally resonant |

**Examples:**
- ✅ "50 Inspiring Courage Quotes When You Need Strength"
- ✅ "Maya Angelou Quotes to Lift Your Spirit"
- ❌ "Courage Quotes - Inspirational Quotes About Courage"

### Meta Description

| Check | Requirement |
|-------|-------------|
| Length | 150-160 characters |
| Keyword | Include primary keyword |
| CTA | Include emotional hook or benefit |

**Examples:**
- ✅ "Discover 50 powerful courage quotes that will remind you of your inner strength. Perfect for tough moments when you need inspiration to keep going."

### URL Slug

| Check | Requirement |
|-------|-------------|
| Format | Short, descriptive, hyphens only |
| Keyword | Include primary keyword |
| Case | All lowercase |
| **No Years** | **Never include year (2024, 2025, 2026, etc.)** |
| **No Numbers** | **Never include numeric prefixes (50, 100, 150, etc.)** |

**⚠️ CRITICAL - Evergreen URL Rule:**

Do NOT include years OR numbers in URL slugs. Quotes are timeless.

| ❌ BAD (Dated/Numbered) | ✅ GOOD (Evergreen) |
|-------------------------|---------------------|
| `courage-quotes-2026` | `courage-quotes` |
| `best-quotes-2026` | `best-motivational-quotes` |
| `101-motivational-success-quotes` | `motivational-success-quotes` |
| `50-inspirational-quotes` | `inspirational-quotes` |
| `150-discipline-quotes` | `discipline-quotes` |

**Rationale:**
- Numbers (like "101" or "150") make URLs look dated and promotional
- If you update the post to 200 quotes, the "150" in the URL becomes inaccurate
- Clean, keyword-focused slugs are more SEO-friendly and professional
- Timeless URLs rank better long-term


### Keyword Placement

| Location | Requirement |
|----------|-------------|
| First 100 words | Primary keyword must appear naturally |
| At least 1 H2 | Primary keyword included |
| Density | 1-2% (natural, not stuffed) |

---

## 10. Heading Structure Rules

### Hierarchy

| Level | Usage |
|-------|-------|
| **H1** | Title ONLY (set via frontmatter) - NEVER in body |
| **H2** | Major sections (quote categories, themes) - ONLY heading level used |
| **H3** | ❌ NOT USED in quote posts |
| **H4** | ❌ NOT USED in quote posts |

### Minimum H2 Requirement

- **Minimum:** 7 H2 headings per post
- **Purpose:** Ensures comprehensive topic coverage and SEO structure
- **Organization:** Each H2 represents a major subtopic or theme

### Semantic Keyword Requirements for Headers

**CRITICAL:** Each H2 heading MUST include semantic keywords related to the main keyword.

**Example - Main Keyword: "motivational quotes"**

| ✅ Good H2 (Semantic Keywords) | ❌ Bad H2 (Generic) |
|-------------------------------|---------------------|
| "Motivational Quotes for Success and Achievement" | "Quotes About Success" |
| "Inspiring Words to Boost Motivation" | "More Quotes" |
| "Uplifting Quotes for Daily Inspiration" | "Additional Motivational Sayings" |
| "Empowering Motivation for Overcoming Challenges" | "Quotes for Hard Times" |

**Semantic Keyword Strategy:**
- Use variations of the main keyword (motivation → motivational, motivating, inspired)
- Include related terms (inspiration, empowerment, encouragement, uplift)
- Mix specific applications (success, goals, challenges, daily life)

### Rules

- **NEVER** use H1 in body content
- **NEVER** use H3 or H4 headings in quote posts
- **ALWAYS** include semantic keywords in every H2
- Include primary keyword in at least 2-3 H2 headings
- Use descriptive, benefit-focused heading text
- Ensure H2s cover different aspects of the topic
- Use **ONLY H2 headings** for all sections

### Valid Structure for Quote Posts

```markdown
## Motivational Quotes for Success and Achievement               ✅ Valid H2

> "Quote text here."
> — Author Name

Context or personal reflection about this quote.

## Inspiring Words to Overcome Life's Challenges                  ✅ Valid H2

> "Quote text here."
> — Author Name

Context or personal reflection about this quote.

## Uplifting Quotes for Daily Motivation                          ✅ Valid H2

## Empowering Motivation for Goal Achievement                     ✅ Valid H2

## Encouraging Quotes for Personal Growth                         ✅ Valid H2

## Powerful Words to Ignite Your Inner Strength                   ✅ Valid H2

## Inspirational Quotes for Career Success                        ✅ Valid H2
```

**❌ Invalid Structure (Using H3s):**
```markdown
## Motivational Quotes
### Quote by Author      ❌ WRONG - No H3s allowed
```

---

## 11. Keyword Strategy Requirements

### Keyword Coverage Mandate

**CRITICAL:** Every post MUST cover short-tail, medium-tail, and long-tail keywords for the topic.

### Keyword Types Explained

| Keyword Type | Word Count | Search Volume | Competition | Example |
|--------------|------------|---------------|-------------|----------|
| **Short-tail** | 1-2 words | High | High | "motivational quotes" |
| **Medium-tail** | 2-3 words | Medium | Medium | "quotes for success" |
| **Long-tail** | 4+ words | Low-Medium | Low | "motivational quotes for students studying" |

### Distribution Requirements

| Element | Short-tail | Medium-tail | Long-tail |
|---------|------------|-------------|-----------|
| **Title** | ✅ Primary focus | Optional | Optional |
| **H2 Headings** | 2-3 H2s | 3-4 H2s | 2-3 H2s |
| **First paragraph** | ✅ Required | ✅ Required | Optional |
| **Throughout content** | Natural placement | Natural placement | Natural placement |
| **Meta description** | ✅ Required | Optional | Optional |

### Keyword Research Requirements

Before writing, identify:

- [ ] **1 primary short-tail keyword** (e.g., "courage quotes")
- [ ] **3-5 medium-tail variations** (e.g., "quotes about courage", "courage and strength quotes")
- [ ] **5-7 long-tail keywords** (e.g., "courage quotes for difficult times", "quotes about finding courage within")

### Natural Integration Rules

**DO:**
- Weave keywords naturally into conversational text
- Use variations and synonyms
- Focus on user intent behind keywords
- Place keywords in H2s with semantic variations

**DON'T:**
- Keyword stuff or repeat exact phrases unnaturally
- Force keywords where they don't fit
- Sacrifice readability for keyword placement
- Use keywords in every paragraph

### Example Keyword Integration

**Topic:** Motivational Quotes

**Short-tail (Primary):** "motivational quotes"

**Medium-tail:**
- "quotes for motivation"
- "motivational quotes for success"
- "inspirational motivational quotes"

**Long-tail:**
- "motivational quotes for students studying hard"
- "short motivational quotes for daily inspiration"
- "motivational quotes to overcome challenges at work"

**H2 Examples with Integrated Keywords:**
```markdown
## Motivational Quotes for Success and Achievement (medium-tail)
## Short Motivational Quotes for Daily Inspiration (long-tail)
## Inspirational Motivational Quotes to Overcome Challenges (medium + long-tail)
## Powerful Words of Motivation for Students (long-tail variation)
```

---

## 12. Section Structure Requirements

### Standard Section Format

**MANDATORY:** Each H2 section MUST follow this structure:

1. **Short paragraph** (3-5 sentences) written in human tone
2. **Minimum 15 quotes** related to the section theme

### Paragraph Requirements

| Element | Requirement |
|---------|-------------|
| **Length** | 3-5 sentences (50-100 words) |
| **Tone** | Conversational, warm, human voice |
| **Purpose** | Introduce the theme, share personal connection, or provide context |
| **Keywords** | Naturally include relevant keywords from the section |
| **Connection** | Bridge between heading and quotes that follow |

### Quote Requirements Per Section

- **Minimum:** 15 quotes per H2 section
- **Format:** Use blockquote format with proper attribution
- **Numbering:** Continue sequential numbering throughout the post
- **Variety:** Mix well-known and lesser-known quotes

### Section Structure Example

**Note:** Use ONLY H2 headings. Do NOT use H3s for individual quotes.

```markdown
## Motivational Quotes for Overcoming Challenges

Life throws obstacles in our path, but it's how we respond that defines us. When I'm facing a difficult situation, I turn to these quotes to remind myself that challenges are opportunities in disguise. The wisdom shared by those who've walked through fire before us can light our way forward. These quotes have helped me push through some of my toughest moments.

> "The only way out is through."
> — Robert Frost

This quote reminds us that avoiding problems only prolongs them. Facing challenges head-on is often the fastest path to resolution.

> "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't."
> — Rikki Rogers

True power emerges when we push past our perceived limitations.

> "You are braver than you believe, stronger than you seem, and smarter than you think."

> — A.A. Milne

This beloved quote from Winnie the Pooh reminds us of the potential we all carry within.

[... continues with 12 more quotes to reach minimum 15 ...]
```

### Validation Checklist Per Section

- [ ] H2 heading includes semantic keywords
- [ ] Opening paragraph is 3-5 sentences in human tone
- [ ] Section contains minimum 15 quotes
- [ ] All quotes properly formatted with attribution
- [ ] Context provided for at least 50% of quotes
- [ ] Section flows naturally with personal voice

---

## 13. Featured Image Requirements

### Technical Specifications

| Property | Requirement | Why |
|----------|-------------|-----|
| **Dimensions** | Exactly 1200×630 pixels | Open Graph standard |
| **Aspect Ratio** | 1.91:1 | Optimal for all social platforms |
| **Format** | WebP | Best balance of quality and size |
| **Quality** | 75-85% | Balance between quality and file size |
| **Max File Size** | <100KB | Fast page load, passing Core Web Vitals |
| **Target File Size** | <50KB | Optimal performance |

### Design Guidelines for InspirationalQuotes

| Element | Requirement |
|---------|-------------|
| **Primary Colors** | Black & white palette with accent colors (deep blue #1E3A8A, gold #F59E0B) |
| **Typography** | Clean, readable fonts - emphasis on quote text preview |
| **Watermark** | **www.inspirationquoteshub.com** in bottom right corner (20-30px from edges) |
| **Visual Style** | Elegant, minimalist, timeless aesthetic |
| **Quote Preview** | Optionally include a featured quote from the post |
| **Visual Elements** | Wide mountain ranges, upward arrows, ascending steps (success/progress themes) |

### 🚨 CRITICAL: AI Image Generation & Cropping Workflow

**PROBLEM:** AI image generators often create **square images (e.g., 640×640)** which must be **CROPPED, NOT RESIZED** to 1200×630 to avoid squeezing/distortion.

#### ❌ WRONG Approach (Causes Squeezing):
```bash
# This SQUEEZES a 640x640 square into 1200x630 - DON'T DO THIS!
cwebp -resize 1200 630 input_640x640.png -o output.webp
```
**Result:** Vertically compressed, distorted image

#### ✅ CORRECT Approach (Proper Cropping):

**Step 1: Check source image dimensions**
```bash
sips -g pixelWidth -g pixelHeight generated_image.png
```
Expected output example: `640x640` (square)

**Step 2: Resize to larger dimension while maintaining aspect ratio**
```bash
sips -z 1200 1200 generated_image.png --out /tmp/resized.png
```

**Step 3: Center-crop to exact 1200×630**
```bash
sips -c 630 1200 /tmp/resized.png --out /tmp/cropped.png
```

**Step 4: Verify dimensions are exact**
```bash
sips -g pixelWidth -g pixelHeight /tmp/cropped.png
```
Expected output: `pixelWidth: 1200`, `pixelHeight: 630`

**Step 5: Convert to WebP (NO resizing)**
```bash
cwebp -q 75 /tmp/cropped.png -o public/images/blog/[slug].webp
```

**Step 6: Verify file size**
```bash
ls -lh public/images/blog/[slug].webp
```
Target: <100KB (ideally 40-60KB)

### AI Image Generation Prompt Requirements

When generating images with AI, include these critical instructions:

```
CRITICAL: The final output must be EXACTLY 1200 pixels wide x 630 pixels tall. 
Design the image at this exact aspect ratio (1.91:1) from the start. 
DO NOT squeeze or distort - use proper cropping if needed.

ASPECT RATIO CRITICAL:
- Design must be in 1.91:1 landscape aspect ratio (1200x630)
- DO NOT create a square or different ratio and then squeeze it
- Make the mountain peaks, text, and all elements fit naturally in this wide panoramic format
- If using mountain imagery, make it a wide mountain range, not a tall single peak

WATERMARK (CRITICAL):
- "www.inspirationquoteshub.com" in bottom right corner (20-30px from edges)
- Subtle but readable
- Light gray or white color (#E5E7EB) for contrast
- Small, professional size
```

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
|              │  [Optional: Featured Quote]    │          |
|              │  www.inspirationquoteshub.com  │          |
|              └────────────────────────────────┘          |
|                                                          |
+----------------------------------------------------------+
|              BOTTOM 25% (157.5px)                        |
|              Background/gradient                         |
+----------------------------------------------------------+
```

### Frontmatter Integration

```yaml
---
heroImage: "/images/blog/[slug].webp"
---
```

### File Location & Naming

| File Type | Path | Naming Rules |
|-----------|------|--------------|
| **Image file** | `public/images/blog/[slug].webp` | Lowercase, hyphens, **NO numbers/years** |
| **Blog post** | `src/content/blog/[slug].md` | Lowercase, hyphens, **NO numbers/years** |

**⚠️ CRITICAL - URL & Filename Slug Rules:**

**DO NOT include:**
- ❌ Numbers at the beginning (e.g., `101-motivational-quotes`)
- ❌ Years anywhere (e.g., `quotes-2026`)
- ❌ Dates (e.g., `feb-2026-quotes`)

**Examples:**

| ❌ WRONG | ✅ CORRECT |
|----------|------------|
| `101-motivational-success-quotes.md` | `motivational-success-quotes.md` |
| `50-inspirational-quotes.md` | `inspirational-quotes.md` |
| `courage-quotes-2026.md` | `courage-quotes.md` |

**Rationale:** 
- Numbers/years make URLs dated and less evergreen
- URLs should be timeless, just like the quote content
- Better for SEO and long-term searchability

### Validation Checklist

- [ ] **Source image checked** - Verified original dimensions before processing
- [ ] **Properly cropped** - Used crop workflow, NOT resize (if source wasn't 1200×630)
- [ ] **Exact dimensions** - Verified final image is exactly 1200×630 pixels
- [ ] **Correct watermark** - Shows "www.inspirationquoteshub.com" in bottom right
- [ ] **File format** - WebP format confirmed
- [ ] **File size** - <100KB (ideally <50KB) confirmed with `ls -lh`
- [ ] **No squeezing** - Image elements look natural and proportional (not vertically compressed)
- [ ] **Slug naming** - No numbers or years in filename
- [ ] **Branding present** - Watermark visible and readable
- [ ] **Safe zone** - Title and key elements in middle 50% safe zone
- [ ] **Frontmatter** - Correct image path in blog post frontmatter

### Common Mistakes to Avoid

| Mistake | Problem | Solution |
|---------|---------|----------|
| **Resizing square to rectangle** | Squeezes/distorts image | Crop, don't resize |
| **Wrong watermark domain** | Shows incorrect branding | Use "www.inspirationquoteshub.com" |
| **Numbers in slug** | URLs look dated | Remove all numbers and years |
| **File size >100KB** | Hurts page speed | Reduce quality with `-q 60-75` |
| **Skipping dimension check** | May not catch source issues | Always verify source dimensions first |



---

## 14. Quote Collections Requirements

### Quantity Standards

**CRITICAL:** Minimum quote requirement per post

-   **Minimum:** 150 quotes per post
-   **Target:** 150-200 quotes for comprehensive coverage
-   **Distribution:** Minimum 15 quotes per H2 section (with 7+ sections minimum)

| Post Type | Minimum Quotes | Recommended |
|-----------|----------------|-------------|
| **Standard collection** | 150 quotes | 150-180 quotes |
| **Comprehensive guide** | 180+ quotes | 200+ quotes |
| **Author-specific** | 150 quotes | 150-200 quotes |

### Quote Distribution Across Sections

With **minimum 7 H2 sections** and **minimum 15 quotes per section:**

-   7 sections × 15 quotes = **105 quotes minimum from main sections**
-   Additional quotes in introduction/other sections: **45+ quotes**
-   **Total: 150+ quotes**

### Quote Presentation Format

**Standard Format (No H3 headings):**
```markdown
## [Section Title with Semantic Keywords]

[3-5 sentence intro paragraph in human tone]

> "[Quote text]"
> — Author Name

[1-2 sentences of context, interpretation, or personal reflection]

> "[Next quote text]"
> — Author Name

[1-2 sentences of context, interpretation, or personal reflection]

[... continue with minimum 15 quotes per section ...]
```

**Example:**
```markdown
## Motivational Quotes for Overcoming Life's Challenges

When life knocks you down, these quotes remind you of your inner strength. I've turned to these words during my toughest moments, and they've helped me see obstacles as opportunities. The wisdom here comes from people who've faced incredible challenges and emerged stronger.

> "The only impossible journey is the one you never begin."
> — Tony Robbins

Starting is often the hardest part. We can spend years planning, but nothing changes until we take that first step.

> "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't."
> — Rikki Rogers

This quote reminds me that true power emerges when we push past our perceived limitations.

[... continues with 13+ more quotes ...]
```

### Quote Organization

**MUST organize quotes by:**
-   Themes/subtopics using H2 headings (minimum 7 sections)
-   Emotional context (hope, courage, resilience, etc.)
-   Situation/application (for work, relationships, personal growth, etc.)
-   **NO H3 headings** - all quotes under H2 sections directly

### Context Requirements

For each quote, provide AT LEAST ONE of:
-   Historical context (when/why it was said)
-   Personal reflection on its meaning
-   How it applies to modern situations
-   Why it resonates with you
-   Connection to the section theme

---

## 📊 Quick Reference Card

### Mandatory Minimums

| Element | Minimum |
|---------|---------|
| **Word count** | 2,000-2,500 |
| **Internal links** | 3 (spread across sections, `/blog/` paths only) |
| **External links** | 3 (to high authority sites, spread across sections) |
| **Personal anecdotes** | 2 |
| **Human voice score** | 10/12 |
| **Quote verification** | 100% (all quotes verified) |
| **Quotes per post** | 150 minimum |
| **H2 headings** | 7 minimum (with semantic keywords) |
| **Quotes per H2 section** | 15 minimum |
| **Keyword coverage** | Short-tail + Medium-tail + Long-tail |
| **Featured image** | 1 (required for every post) |

### Zero Tolerance

- AI banned phrases
- Incorrect quote attributions
- Unverified quotes
- H1 in body content
- **H3 or H4 headings in quote posts**
- "Click here" anchor text
- **Internal links to `/quotes/` paths**
- **Internal links to unpublished posts**
- Missing featured image
- Featured image not meeting specs
- **Years in URL slugs or image filenames**

---

## 🎯 Key Differentiators for Quote Blogs

### What Makes Quote Content E-E-A-T Compliant

1. **Experience:** Share personal stories of how quotes impacted you
2. **Expertise:** Demonstrate knowledge of authors, context, and accurate attribution
3. **Authoritativeness:** Link to primary sources and authoritative biographies
4. **Trustworthiness:** Verify every quote; admit when attribution is uncertain

### Emotional Resonance Requirements

Quote blogs must create emotional connection:
- Address readers' feelings and struggles
- Explain WHEN these quotes are needed (during hardship, celebration, transitions)
- Share relatable situations where quotes provide comfort or motivation
- Use warm, empathetic language

### Storytelling Elements

Every quote post should include:
- Personal story in introduction
- Context for why these quotes matter NOW
- At least 2-3 examples of when/how to use these quotes
- Reflection on universal human experiences

---

## 📝 Implementation Notes

**This is a living document.** Update it as:
- Google algorithm updates change best practices
- New quote verification tools emerge
- Audience feedback suggests improvements
- Cultural context evolves

**Last updated:** 2026-02-05  
**Version:** 1.1 (InspirationalQuotes Custom)  
**Based on:** Universal Blog Quality Standards Template

### Changelog

**v1.1 (2026-02-05)**
- ✅ Added critical AI image generation & cropping workflow (Section 13)
- ✅ Added step-by-step guide to avoid image squeezing (crop vs resize)
- ✅ Updated watermark requirement to "www.inspirationquoteshub.com"
- ✅ Added no-numbers rule for URL slugs and filenames
- ✅ Added common mistakes table to Featured Image section
- ✅ Enhanced validation checklist with dimension verification
- ✅ Added AI image generation prompt template

**v1.0 (2026-02-05)**
- Initial version for InspirationalQuotes website
- Adapted from universal blog quality standards
- Added quote-specific requirements (150 quotes, 7 H2s, etc.)


---

## 🔍 Quote-Specific Best Practices

### Avoid These Common Mistakes

1. **Don't just list quotes** - Add context and reflection
2. **Don't mix themes randomly** - Organize by coherent subtopics
3. **Don't use quotes without verification** - Always verify attribution
4. **Don't ignore emotional context** - Explain when/why quotes matter
5. **Don't write clinically** - Share personal connection to the wisdom

### Excellence Indicators

A great quote post:
- Makes readers feel understood
- Provides quotes they'll actually save/share
- Teaches them something new about familiar quotes
- Creates emotional resonance through authentic storytelling
- Demonstrates expertise through accurate attribution and context
