---
description: Compact quality checklist - essential rules for blog creation workflows. Reference full standards at /blog-quality-standards
---

# 📋 Blog Quality Checklist (Quick Reference)

**Quick validation rules for blog content creation. For full details, see `/blog-quality-standards`.**

---

## 🔴 Critical Requirements (Auto-Fail if Missing)

| Requirement | Standard | Check |
|-------------|----------|-------|
| **Word count** | ≥4,000 words | Count total |
| **Internal links** | 3-5 links | Count markdown links to `/blog/` |
| **External links** | 2-3 links (HTML format) | Count `<a href` tags |
| **Human voice score** | ≥10/12 | Score using rubric below |
| **Frontmatter schema** | Exact field names | See schema section |
| **No AI clichés** | Zero banned phrases | Scan for patterns below |
| **Featured image** | Required for every post | Check frontmatter + file exists |

---

## ⚠️ Zero Tolerance - Banned Phrases

**If ANY of these appear → FAIL immediately:**

```
❌ "In this comprehensive guide..."
❌ "Whether you're a [X] or a [Y]..."
❌ "By the end of this article..."
❌ "It's important to note that..."
❌ "In today's rapidly evolving..."
❌ "This article will explore..."
❌ "In conclusion..." (just write conclusion)
```

**Warning patterns (minimize):**
- "Additionally," → use "Also," or restructure
- "Furthermore," → use "And," or remove
- "Moreover," → remove or rephrase
- "significantly" without data → be specific
- "leveraging" → use "using"

---

## 📝 Human Voice Scoring Rubric

Score each element. **Minimum total: 10/12**

| Element | Score 0 | Score 1 | Score 2 | Min |
|---------|---------|---------|---------|-----|
| Personal anecdotes | None | 1-2 | 3+ | 2 |
| Opinions/hot takes | None | 1 | 2+ | 1 |
| Contractions | Formal | Mixed | Natural | 2 |
| Sentence variety | Uniform | Some | Dynamic | 2 |
| Uncertainty shown | None | Some | Authentic | 1 |
| Light humor | None | Present | Well-placed | 1 |

**Required elements:**
- ✅ Personal opening (NOT "In this guide...")
- ✅ 2-3 first-person experiences ("I've seen...", "When I...")
- ✅ 1-2 opinions expressed
- ✅ 1 uncertainty admission ("I'm not sure...", "Even experts disagree...")
- ✅ Consistent contractions (don't, it's, they're)
- ✅ 1-2 humor moments

---

## 🏗️ Frontmatter Schema (Exact Field Names)

**⚠️ CRITICAL - Wrong field names break build:**

```yaml
---
title: "50-60 chars, keyword near front"
description: "150-160 chars, keyword + CTA"
pubDate: 2026-01-17           # ⚠️ NOT "date"
category: "ai-agents"          # ⚠️ NOT "categories" (string, not array)
author: "AI Agents Kit"        # ⚠️ NOT "authors" (string, not array)
heroImage: "/images/featured/slug.webp"
keywords: ["keyword1", "keyword2", "keyword3"]
readTime: 15
---
```

**Valid categories:**
`ai-agents`, `ai-tools`, `ai-news`, `tutorials`, `chatgpt`, `prompt-engineering`, `ai-comparisons`, `ai-careers`, `generative-ai`, `open-source-ai`, `ai-ethics`, `ai-business`, `llms`, `ai-hardware`, `industry-ai`, `prompts`, `mcp`, `tools`, `code-snippets`

---

## 🔗 Link Requirements

### Internal Links (3-5 required)
```markdown
Learn more about [descriptive anchor text](/blog/related-post-slug).
```
- Descriptive anchors (NEVER "click here")
- Natural placement in sentences
- Spread throughout article

### External Links (2-3 required)
```html
<a href="https://example.com" target="_blank" rel="noopener">Descriptive text</a>
```
- **MUST use HTML format** (not markdown)
- **MUST include:** `target="_blank"` and `rel="noopener"`
- Link to authoritative sources only
- Descriptive anchor text (not URLs)

---

## 📐 Heading Structure Rules

| Rule | Requirement |
|------|-------------|
| **H1** | Title ONLY (via frontmatter) - NEVER in body |
| **H2** | Major sections |
| **H3** | Subsections under H2 |
| **Hierarchy** | Never skip levels (H2 → H3 → H4) |
| **SEO** | Primary keyword in ≥1 H2 |

**Invalid:**
```markdown
# Title in Body          ❌ H1 in body
## Section → #### Detail ❌ Skipped H3
```

---

## 📊 SEO On-Page Checklist

| Element | Requirement |
|---------|-------------|
| Title length | 50-60 characters |
| Title keyword | Primary keyword near front |
| Meta description | 150-160 characters |
| Meta keyword | Include primary keyword |
| URL slug | short-keyword-slug (NO years like 2026) |
| Keyword in intro | First 100 words |
| Keyword in H2 | At least 1 H2 |
| Keyword density | 1-2% (natural) |

**⚠️ CRITICAL:** Never use years (2024, 2025, 2026, etc.) in URL slugs. Use evergreen slugs that won't appear dated.

---

## 🆕 Information Currency

**Use CURRENT DATE from system context as reference:**

| Element | Requirement |
|---------|-------------|
| pubDate | Today's date from system |
| Year references | Current year (e.g., "in 2026") |
| Statistics | Current year or previous year |
| AI models | Latest versions (verify via search) |

**Outdated AI model names (FAIL if found):**
- GPT-4, GPT-4o → Should be GPT-5.x
- Claude 3, Claude 3.5 → Should be Claude 4.x (Opus/Sonnet/Haiku)
- Gemini 1.x → Should be Gemini 2.x+

---

## 🎯 E-E-A-T Signals (Minimum Requirements)

- [ ] 2+ first-person experience references
- [ ] Technical accuracy verified
- [ ] 2-3 authoritative external sources
- [ ] Balanced perspective (acknowledge limitations)
- [ ] Uncertainty admitted on complex topics

---

## 🖼️ Featured Image Requirements

| Property | Requirement |
|----------|-------------|
| Dimensions | 1200×630 pixels |
| Format | WebP |
| File size | <100KB |
| Theme | Black & white only |
| Watermark | www.aiagentskit.com |
| Location | `public/images/featured/[slug].webp` |
| Frontmatter | `heroImage: "/images/featured/[slug].webp"` |

---

## ✅ Quick Validation Steps

1. **Word count:** ≥4,000? ✓
2. **Frontmatter:** Uses `pubDate`, `category` (string), `author` (string)? ✓
3. **AI patterns:** Zero banned phrases? ✓
4. **Human voice:** Score ≥10/12? ✓
5. **Links:** 3-5 internal (markdown), 2-3 external (HTML)? ✓
6. **Headings:** No H1 in body, no skipped levels? ✓
7. **SEO:** Keyword in title, meta, intro, ≥1 H2? ✓
8. **Featured image:** Exists and meets specs? ✓

---

**📚 Full Reference:** `/blog-quality-standards`  
**Referenced by:** All blog workflows

*Last updated: 2026-01-17*  
*Purpose: Compact checklist to reduce token usage while maintaining quality*
