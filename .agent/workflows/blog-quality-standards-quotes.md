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
11. [Featured Image Requirements](#11-featured-image-requirements)
12. [Quote Collections Requirements](#12-quote-collections-requirements)

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
- **Maximum:** 7 internal links (avoid over-linking)
- **Distribution:** Spread throughout article, not clustered

### Quality Rules

| Rule | Requirement |
|------|-------------|
| **Placement** | Within paragraph text, not standalone |
| **Anchor Text** | Descriptive, topic-focused (NEVER \"click here\") |
| **Relevance** | Link to related quote collections or topics |
| **Context** | Natural fit within the sentence |

### Internal Link Targets

Link to:
- Related quote collections (e.g., link from "success quotes" to "perseverance quotes")
- Author-specific collections
- Thematic quote pages
- Related blog posts

### Format

```markdown
If you're looking for more wisdom on this topic, explore our collection of [perseverance quotes](/quotes/perseverance-quotes).
```

---

## 7. External Linking Requirements

### Quantity

- **Minimum:** 2-3 external links per post
- **Maximum:** 5 external links
- **Distribution:** Spread throughout article, not clustered

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

**⚠️ CRITICAL - Evergreen URL Rule:**

Do NOT include years in URL slugs. Quotes are timeless.

| ❌ BAD (Dated) | ✅ GOOD (Evergreen) |
|----------------|---------------------|
| `courage-quotes-2026` | `courage-quotes` |
| `best-quotes-2026` | `best-motivational-quotes` |

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
| **H2** | Major sections (quote categories, themes) |
| **H3** | Subsections under H2 (individual quotes or sub-themes) |
| **H4** | Rarely used - only for complex nested content |

### Rules

- **NEVER** skip levels (H2 → H4 is WRONG)
- **NEVER** use H1 in body content
- Include primary keyword in at least one H2
- Use descriptive, benefit-focused heading text

### Valid Structure for Quote Posts

```markdown
## Quotes About [Subtopic 1]               ✅ Valid H2
### Quote by [Author Name]                 ✅ Valid H3
### Quote by [Author Name]                 ✅ Valid H3

## Quotes About [Subtopic 2]               ✅ Valid H2
### Quote by [Author Name]                 ✅ Valid H3

## Why These Quotes Matter                 ✅ Valid H2
```

---

## 11. Featured Image Requirements

### Technical Specifications

| Property | Requirement | Why |
|----------|-------------|-----|
| **Dimensions** | Exactly 1200×630 pixels | Open Graph standard |
| **Aspect Ratio** | 1.91:1 | Optimal for all social platforms |
| **Format** | WebP | Best balance of quality and size |
| **Quality** | 80-85% | Balance between quality and file size |
| **Max File Size** | <100KB | Fast page load, passing Core Web Vitals |
| **Target File Size** | <50KB | Optimal performance |

### Design Guidelines for InspirationalQuotes

| Element | Requirement |
|---------|-------------|
| **Primary Colors** | Black & white palette with accent colors |
| **Typography** | Clean, readable fonts - emphasis on quote text preview |
| **Watermark** | Include InspirationalQuotes logo/branding |
| **Visual Style** | Elegant, minimalist, timeless aesthetic |
| **Quote Preview** | Optionally include a featured quote from the post |

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
|              │  [Watermark/Logo]              │          |
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
heroImage: "/images/featured/[slug].webp"
---
```

### File Location

| File Type | Path |
|-----------|------|
| **Image file** | `public/images/featured/[slug].webp` |
| **Blog post** | `src/content/blog/[slug].md` |

### Validation Checklist

- [ ] Image file exists at correct path
- [ ] Dimensions are exactly 1200×630 pixels
- [ ] File format is WebP
- [ ] File size is <100KB (ideally <50KB)
- [ ] Branding elements present
- [ ] Title readable in middle 50% safe zone
- [ ] Frontmatter includes correct image path

---

## 12. Quote Collections Requirements

### Quantity Standards

| Post Type | Minimum Quotes |
|-----------|----------------|
| **Standard collection** | 30-50 quotes |
| **Comprehensive guide** | 50-100 quotes |
| **Author-specific** | 20-40 quotes |

### Quote Presentation Format

**Standard Format:**
```markdown
### [Number]. "[Quote text]"

> "[Quote text in block quote format]"
> — Author Name

[1-2 sentences of context, interpretation, or personal reflection]
```

**Example:**
```markdown
### 1. "The only impossible journey is the one you never begin."

> "The only impossible journey is the one you never begin."
> — Tony Robbins

This quote reminds me that starting is often the hardest part. We can spend years planning and preparing, but nothing changes until we take that first step.
```

### Quote Organization

**MUST organize quotes by:**
- Themes/subtopics (use H2 headings)
- Emotional context (hope, courage, resilience, etc.)
- Author (for author-specific collections)
- Situation/application (for work, relationships, personal growth, etc.)

### Context Requirements

For each quote, provide AT LEAST ONE of:
- Historical context (when/why it was said)
- Personal reflection on its meaning
- How it applies to modern situations
- Why it resonates with you

---

## 📊 Quick Reference Card

### Mandatory Minimums

| Element | Minimum |
|---------|---------|
| Word count | 2,000-2,500 |
| Internal links | 3 |
| External links | 2 |
| Personal anecdotes | 2 |
| Human voice score | 10/12 |
| Quote verification | 100% (all quotes verified) |
| Quotes per collection | 30 (standard) |
| Featured image | 1 (required for every post) |

### Zero Tolerance

- AI banned phrases
- Incorrect quote attributions
- Unverified quotes
- H1 in body content
- Skipped heading levels
- \"Click here\" anchor text
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
**Version:** 1.0 (InspirationalQuotes Custom)  
**Based on:** Universal Blog Quality Standards Template

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
