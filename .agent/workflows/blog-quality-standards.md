---
description: Central quality standards reference - human voice rules, SEO requirements, information currency, and E-E-A-T signals. Single source of truth for all blog workflows.
---

# 📋 Blog Quality Standards

**Single source of truth** for all blog content quality requirements. All blog workflows reference this document for consistent standards.

> **For Agents:** Before executing any blog workflow, review the relevant sections of this document. Do NOT reproduce these lists inline—reference this document instead.

---

## 📚 Table of Contents

1. [Human Voice Requirements](#1-human-voice-requirements)
2. [AI Banned Phrases](#2-ai-banned-phrases)
3. [Information Currency Rules](#3-information-currency-rules)
4. [AI Model Version Requirements](#4-ai-model-version-requirements)
5. [E-E-A-T Signals](#5-e-e-a-t-signals)
6. [Internal Linking Requirements](#6-internal-linking-requirements)
7. [External Linking Requirements](#7-external-linking-requirements)
8. [Word Count Requirements](#8-word-count-requirements)
9. [SEO On-Page Requirements](#9-seo-on-page-requirements)
10. [Heading Structure Rules](#10-heading-structure-rules)
11. [Featured Image Requirements](#11-featured-image-requirements)

---

## 1. Human Voice Requirements

### Voice & Tone

| Aspect | Requirement |
|--------|-------------|
| **Tone** | Professional but warm—like explaining to a smart colleague |
| **Perspective** | Generic first-person ("I've seen...", "In my experience...") |
| **Style** | Conversational, not academic. Write like you talk (but polished) |

### Required Elements Checklist

Every blog post MUST include:

- [ ] **Personal opening** - Start with story/observation, NOT "In this guide..."
- [ ] **First-person experiences** - At least 2-3 "I've seen...", "When I..." moments
- [ ] **Opinions expressed** - At least 1-2 clear stances or "hot takes"
- [ ] **Uncertainty admitted** - At least 1 "I'm not sure...", "Even experts disagree..."
- [ ] **Contractions used** - Consistent use of don't, it's, they're, etc.
- [ ] **Conversational transitions** - "Here's the thing...", "That said...", NOT "Additionally,"
- [ ] **Light humor** - 1-2 witty observations or self-deprecating moments
- [ ] **Sentence variety** - Mix of short (5 words) and medium (15-20 words)

### Human Voice Scoring (For Review & Validation)

| Element | Score 0 | Score 1 | Score 2 | Minimum |
|---------|---------|---------|---------|---------|
| **Personal anecdotes** | None | 1-2 | 3+ | 2 |
| **Opinions/hot takes** | None | 1 | 2+ | 1 |
| **Contractions** | Formal | Mixed | Natural | 2 |
| **Sentence variety** | Uniform | Some | Dynamic | 2 |
| **Uncertainty shown** | None | Some | Authentic | 1 |
| **Light humor** | None | Present | Well-placed | 1 |

**Minimum Total Score: 10/12** (posts scoring below this FAIL validation)

### Good vs Bad Examples

#### Opening Sentences

| ❌ Fails Test | ✅ Passes Test |
|---------------|----------------|
| "Artificial intelligence is revolutionizing..." | "Last month, something made me stop and think." |
| "In today's rapidly evolving..." | "Here's a confession: I didn't get AI agents at first." |
| "This comprehensive guide will..." | "Let's talk about something that's changing everything." |

#### Transitions

| ❌ Avoid | ✅ Use Instead |
|----------|----------------|
| "Additionally," | "Also," or just start the sentence |
| "Furthermore," | "And," or restructure |
| "Moreover," | Remove or rephrase naturally |
| "In conclusion..." | Just write the conclusion |

---

## 2. AI Banned Phrases

### ZERO TOLERANCE - Automatic Validation Failure

These phrases MUST NOT appear anywhere in the content:

```
❌ "In this comprehensive guide..."
❌ "Whether you're a [X] or a [Y]..."
❌ "By the end of this article..."
❌ "It's important to note that..."
❌ "In today's rapidly evolving..."
❌ "This article will explore..."
❌ "In conclusion..." (just write the conclusion)
```

### WARNING - Minimize or Rephrase

These patterns should be avoided or replaced:

| Pattern | Problem | Better Alternative |
|---------|---------|-------------------|
| "significantly" (without data) | Vague intensifier | Be specific with numbers |
| "incredibly" | AI cliché | Use concrete descriptor |
| "transforming" (vague) | Overused | Describe HOW |
| "leveraging" | Corporate-speak | "using" |
| "utilize" | Unnecessarily formal | "use" |
| "in order to" | Wordy | "to" |

---

## 3. Information Currency Rules

### The Golden Rule

**All content must use the CURRENT DATE from the system context as the reference point.**

The system provides the current date in format: `YYYY-MM-DDTHH:MM:SS+TZ`

### Date Requirements

| Element | Requirement |
|---------|-------------|
| **pubDate** | Use today's date from system context |
| **Year references** | Use current year (e.g., "in 2026", "as of 2026") |
| **Statistics** | Must be from current year or previous year |
| **Product info** | Reference current versions only |

### Source Age Limits

| Topic Type | Maximum Source Age |
|------------|-------------------|
| AI/Tech topics | 1 year max |
| General topics | 2-3 years max |
| Historical context | Properly labeled as historical |

### Search Query Tips

When researching, include date qualifiers:
```
"[topic] 2026" OR "[topic] 2025"
"[topic] statistics 2025"
"[topic] latest research"
```

---

## 4. AI Model Version Requirements

### When This Applies

For ANY content mentioning AI models, tools, or platforms.

### Required Searches

Before writing AI-related content, search for latest versions:

```
"OpenAI GPT latest model [current month year]"
"Claude Anthropic latest model [current month year]"
"Google Gemini latest model [current month year]"
"[specific tool] what AI model does it use [year]"
```

### What to Capture

| Category | What to Verify |
|----------|---------------|
| **Model Versions** | Current version numbers (e.g., GPT-5.2, Claude Opus 4.5) |
| **Release Dates** | When current versions were released |
| **Context Windows** | Current context window sizes |
| **Pricing** | Current pricing tiers |
| **Key Features** | New capabilities in latest versions |
| **Deprecated Models** | Which old versions are retired |

### Outdated Model Names to Flag

**FAIL if found without historical context:**
- GPT-4, GPT-4o, GPT-4-turbo → Should reference GPT-5.x
- Claude 3, Claude 3.5 → Should reference Claude Opus/Sonnet/Haiku 4.x
- Gemini 1.x → Should reference Gemini 3.x
- "Claude's 100K context window" → Now 200K+ (verify current)

### Verification Points in Workflow

| Phase | Requirement |
|-------|-------------|
| **/blog-research** | PRIMARY verification - gather all model info |
| **/blog-validator** | FINAL check - catch any outdated references |

---

## 5. E-E-A-T Signals

### What E-E-A-T Means

| Signal | Meaning | How to Demonstrate |
|--------|---------|-------------------|
| **Experience** | First-hand experience with topic | Personal stories, "When I implemented..." |
| **Expertise** | Deep knowledge of subject | Technical depth, accurate terminology |
| **Authoritativeness** | Recognized credibility | Cite sources, link to official docs |
| **Trustworthiness** | Reliable, honest content | Update dates, balanced perspective, admit uncertainty |

### Minimum Requirements Per Post

- [ ] At least 2 first-person experience references
- [ ] Technical accuracy verified via fact-checking
- [ ] 2-3 links to authoritative external sources
- [ ] Balanced perspective (acknowledge limitations/alternatives)
- [ ] Admission of uncertainty on complex/debatable topics

---

## 6. Internal Linking Requirements

### Quantity

- **Minimum:** 3 internal links per post
- **Maximum:** 5-7 internal links (avoid over-linking)
- **Distribution:** Spread throughout article, not clustered

### Quality Rules

| Rule | Requirement |
|------|-------------|
| **Placement** | Within paragraph text, not standalone |
| **Anchor Text** | Descriptive, keyword-rich (NEVER "click here") |
| **Relevance** | Link must add value for reader |
| **Context** | Natural fit within the sentence |

### Format

```markdown
Learn more about [descriptive anchor text](/blog/related-post-slug).
```

---

## 7. External Linking Requirements

### Quantity

- **Minimum:** 2-3 external links per post
- **Maximum:** 5-6 external links
- **Distribution:** Spread throughout article, not clustered

### Required Format (Google-Compliant)

**⚠️ IMPORTANT:** ALL external links MUST use HTML format, NOT markdown.

**REQUIRED HTML Format:**
```html
<a href="https://example.com/page" target="_blank" rel="noopener">Descriptive anchor text</a>
```

**Why HTML, NOT Markdown?**
- Ensures `target="_blank"` keeps users on your site
- Guarantees `rel="noopener"` for security (prevents tab hijacking)
- Google expects external links to open in new tabs for good UX
- More control over link behavior

### Required Attributes

| Attribute | Purpose | Required? |
|-----------|---------|-----------|
| `target="_blank"` | Opens link in new tab | ✅ ALWAYS |
| `rel="noopener"` | Security (prevent tabnapping) | ✅ ALWAYS |
| `rel="nofollow"` | Don't pass PageRank | Only for untrusted sources |
| `rel="sponsored"` | Paid/affiliate links | Only for affiliate links |
| `rel="ugc"` | User-generated content | Only for user-submitted links |

### Good vs Bad Examples

| ❌ WRONG (Markdown) | ✅ CORRECT (HTML) |
|---------------------|-------------------|
| `[OpenAI](https://openai.com)` | `<a href="https://openai.com" target="_blank" rel="noopener">OpenAI</a>` |
| `[Learn more](https://example.com)` | `<a href="https://example.com" target="_blank" rel="noopener">Complete guide on Example</a>` |

### Anchor Text Best Practices

| ❌ BAD Anchor Text | ✅ GOOD Anchor Text |
|-------------------|---------------------|
| "click here" | "OpenAI's official documentation" |
| "this article" | "Google's Search Quality Guidelines" |
| "read more" | "the complete API reference" |
| Raw URL | Descriptive, keyword-rich text |

### Source Quality Hierarchy

Prioritize sources in this order:

| Priority | Source Type | Example |
|----------|-------------|---------|
| **1** | Official documentation | AWS docs, Google Cloud docs, GitHub repos |
| **2** | Primary sources | Company announcements, product pages |
| **3** | Research/reports | Gartner, McKinsey, academic papers |
| **4** | Authoritative media | TechCrunch, The Verge, Ars Technica |
| **5** | Expert blogs | Well-known industry thought leaders |

### Sources to AVOID

- ❌ Low-quality content farms
- ❌ Outdated articles (>1 year for AI/tech, >2 years for other topics)
- ❌ Heavily affiliate-monetized sites
- ❌ Unverifiable personal blogs
- ❌ Sites with excessive ads/popups
- ❌ Sources without publication dates
- ❌ Competitor blogs (link to official sources instead)

### E-E-A-T Considerations

External links **boost E-E-A-T** when they:
- Cite authoritative sources
- Link to official documentation
- Reference primary research
- Support claims with evidence

**Do NOT use `nofollow` on legitimate editorial links** to authoritative sources—Google expects natural outbound linking.

---

## 8. Word Count Requirements

### Minimum Word Count

**Minimum: 4,000 words** (no maximum cap)

### Word Count Validation

| Count | Status |
|-------|--------|
| ≥ 4,000 words | ✅ PASS |
| 3,500-3,999 words | ⚠️ WARN - Close to minimum |
| < 3,500 words | ❌ FAIL - Content too thin |

### Guidelines

- Be comprehensive, not padded
- Each section should serve a purpose
- Follow Google's helpful content guidelines
- Longer is better ONLY if it adds value

---

## 9. SEO On-Page Requirements

### Title Tag

| Check | Requirement |
|-------|-------------|
| Length | 50-60 characters |
| Keyword | Primary keyword near the front |
| Format | Compelling, click-worthy |

### Meta Description

| Check | Requirement |
|-------|-------------|
| Length | 150-160 characters |
| Keyword | Include primary keyword |
| CTA | Include call-to-action |

### URL Slug

| Check | Requirement |
|-------|-------------|
| Format | Short, descriptive, hyphens only |
| Keyword | Include primary keyword |
| Case | All lowercase |
| **No Years** | **Never include year (2024, 2025, 2026, etc.)** |

**⚠️ CRITICAL - Evergreen URL Rule:**

Do NOT include years in URL slugs. Years make content appear dated and reduce long-term SEO value.

| ❌ BAD (Dated) | ✅ GOOD (Evergreen) |
|----------------|---------------------|
| `ai-prompts-developers-2026` | `ai-prompts-developers` |
| `best-chatgpt-prompts-2026` | `best-chatgpt-prompts` |
| `ai-skills-to-learn-2026` | `ai-skills-to-learn` |
| `ai-in-2026-timeline` | `ai-timeline-complete-guide` |

**Why this matters for SEO:**
- Content appears outdated when the year passes
- Reduced click-through rates in search results
- Unnecessary URL changes and redirects later
- Limits evergreen content potential

### Keyword Placement

| Location | Requirement |
|----------|-------------|
| First 100 words | Primary keyword must appear |
| At least 1 H2 | Primary keyword included |
| Density | 1-2% (natural, not stuffed) |

---

## 10. Heading Structure Rules

### Hierarchy

| Level | Usage |
|-------|-------|
| **H1** | Title ONLY (set via frontmatter) - NEVER in body |
| **H2** | Major sections |
| **H3** | Subsections under H2 |
| **H4** | Rarely used - only for complex nested content |

### Rules

- **NEVER** skip levels (H2 → H4 is WRONG, must be H2 → H3 → H4)
- **NEVER** use H1 in body content
- Include primary keyword in at least one H2
- Use descriptive, specific heading text

### Valid vs Invalid

```markdown
## Section                    ✅ Valid
### Subsection                ✅ Valid
#### Detail                   ✅ Valid

# Title in Body               ❌ INVALID (H1 in body)
## Section → #### Detail      ❌ INVALID (skipped H3)
```

---

## 11. Featured Image Requirements

### When This Applies

**EVERY blog post** must have a featured image (Open Graph image) for social sharing.

### Technical Specifications

| Property | Requirement | Why |
|----------|-------------|-----|
| **Dimensions** | Exactly 1200×630 pixels | Open Graph standard |
| **Aspect Ratio** | 1.91:1 | Optimal for all social platforms |
| **Format** | WebP | 30-50% smaller than PNG/JPG |
| **Quality** | 85% | Balance between quality and file size |
| **Max File Size** | <100KB | Fast page load, passing Core Web Vitals |
| **Target File Size** | <50KB | Optimal performance |

### Design Theme (AI Agents Kit Brand)

| Element | Requirement |
|---------|-------------|
| **Color Scheme** | Black & white only (no colors) |
| **Background** | Gradient from #000000 (pure black) to #171717 (dark gray) |
| **Title Text** | White (#FFFFFF), bold, centered |
| **Accent Elements** | Light gray (#A3A3A3) icons/decorations |
| **Watermark** | "www.aiagentskit.com" in subtle gray (#525252) |
| **Style** | Minimalist, professional, premium |

### Safe Zone Layout

**Critical:** Keep all important content in the **middle 50%** of the image.

```
+----------------------------------------------------------+
|              TOP 25% (157.5px)                           |
|              Background gradient only                     |
|              (May be cropped on some platforms)           |
+----------------------------------------------------------+
|                                                          |
|              MIDDLE 50% (315px) ← SAFE ZONE              |
|              ┌────────────────────────────────┐          |
|              │     POST TITLE HERE            │          |
|              │     (Bold, White, Centered)    │          |
|              │                                │          |
|              │     www.aiagentskit.com        │          |
|              │     [Subtle category icons]    │          |
|              └────────────────────────────────┘          |
|                                                          |
+----------------------------------------------------------+
|              BOTTOM 25% (157.5px)                        |
|              Gradient + Accent line                      |
+----------------------------------------------------------+
```

### Frontmatter Integration

The blog post frontmatter MUST include:

```yaml
---
heroImage: "/images/featured/[slug].webp"
---
```

Where `[slug]` matches the blog post filename.

### File Location

| File Type | Path |
|-----------|------|
| **Image file** | `public/images/featured/[slug].webp` |
| **Blog post** | `src/content/blog/[slug].md` |

**⚠️ IMPORTANT - No Years in Filenames:**

Never include years in the `[slug]` portion of filenames:

| ❌ BAD | ✅ GOOD |
|--------|----------|
| `ai-prompts-2026.webp` | `ai-prompts.webp` |
| `chatgpt-guide-2026.webp` | `chatgpt-guide.webp` |

This ensures consistency with evergreen URL slugs and prevents images from appearing dated.

### Watermark Requirements

| Requirement | Details |
|-------------|---------|
| **Text** | "www.aiagentskit.com" (exact format) |
| **Placement** | Centered, below the title with minimal gap |
| **Color** | Light gray (#A3A3A3) for readability |
| **Size** | Subtle but readable at preview sizes |
| **Visibility** | Must be visible in social media previews |

### Generation Methods

Two approved methods (see `/featured-image` workflow for details):

| Method | When to Use | Output |
|--------|-------------|--------|
| **AI Generation** | High-impact posts, unique creative needs | Custom-designed image with icons/illustrations |
| **Programmatic** | Standard posts, batch processing | Text-focused design with consistent branding |

Both methods MUST produce images that meet all technical and design requirements.

### Validation Checklist

Before marking a blog post as complete, verify:

- [ ] Image file exists at `public/images/featured/[slug].webp`
- [ ] Dimensions are exactly 1200×630 pixels
- [ ] File format is WebP
- [ ] File size is <100KB (ideally <50KB)
- [ ] Black & white theme used (no colors)
- [ ] Title is readable and in middle 50% safe zone
- [ ] Watermark "www.aiagentskit.com" is visible
- [ ] Frontmatter includes correct `heroImage` path
- [ ] Path in frontmatter matches actual file location

### Common Issues to Avoid

| ❌ FAIL | ✅ PASS |
|---------|---------|
| Using colors (blue, red, etc.) | Black & white gradient only |
| Title at top/bottom edges | Title in middle 50% safe zone |
| Missing watermark | www.aiagentskit.com visible |
| PNG/JPG format | WebP format |
| File size >100KB | File size <100KB |
| Wrong path in frontmatter | Path matches file location exactly |
| No image for post | Every post has a featured image |

### Social Platform Testing

After generation, test the image preview on:

- **Facebook:** https://developers.facebook.com/tools/debug/
- **Twitter:** https://cards-dev.twitter.com/validator
- **LinkedIn:** https://www.linkedin.com/post-inspector/

The image should:
- Display correctly on all platforms
- Show title readable at small sizes
- Display watermark clearly
- Not have any critical elements cropped

### Integration with Blog Workflows

| Workflow | Responsibility |
|----------|---------------|
| `/blog-master` | Calls `/featured-image` at Phase 4.5 |
| `/featured-image` | Generates image and updates frontmatter |
| `/blog-validator` | Validates all requirements in this section |

---

## 📊 Quick Reference Card

### Mandatory Minimums

| Element | Minimum |
|---------|---------|
| Word count | 4,000 |
| Internal links | 3 |
| External links | 2 |
| Personal anecdotes | 2 |
| Human voice score | 10/12 |
| Featured image | 1 (required for every post) |

### Zero Tolerance

- AI banned phrases
- H1 in body content
- Skipped heading levels
- Outdated AI model names
- "Click here" anchor text
- Empty alt text on images
- Missing featured image
- Featured image not meeting specs (wrong size, format, or missing watermark)
- **Years in URL slugs or image filenames (2024, 2025, 2026, etc.)**

---

*Last updated: 2026-01-17*
*Referenced by: /blog-research, /blog-outline, /blog-writer, /blog-reviewer, /blog-validator*