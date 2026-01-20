---
description: Quality gate workflow - comprehensive validation of blog posts against SEO, accessibility, performance, and content quality standards before publishing.
---

// turbo-all

# ✅ Blog Validator Workflow

Comprehensive quality assurance that validates blog posts against all standards before publishing.

---

## 📋 Quick Reference

**Input:** 
- Reviewed draft: `blog-drafts/[post-slug]/04-reviewed-draft.md`
- Research Brief: `blog-drafts/[post-slug]/01-research-brief.md` (for reference)

**Output:** 
- Validation Report: `blog-drafts/[post-slug]/06-validation-report.md`
- If PASS: Copy to `src/content/blog/[slug].md`

**Duration:** ~8-12 minutes
**Previous Step:** `/blog-reviewer`
**Next Step:** If PASS → Publishing phase

> **📚 Quick Reference:** `/blog-quality-checklist` | **Full Standards:** `/blog-quality-standards`

---

## 🎯 Validation Process

### Step 1: Load and Parse Draft

1. Read the reviewed draft from `blog-drafts/[post-slug]/04-reviewed-draft.md`
2. Parse frontmatter (YAML)
3. Parse content (Markdown)
4. Count words, headings, links

---

### Step 2: SEO Validation

> **Quick ref:** `/blog-quality-checklist#seo-checklist`

| Check | Requirement | Severity |
|-------|-------------|----------|
| **Title Length** | 50-60 characters | 🔴 Critical |
| **Title Keyword** | Primary keyword present | 🔴 Critical |
| **Meta Description Length** | 150-160 characters | 🔴 Critical |
| **Meta Description Keyword** | Primary keyword present | 🟡 Medium |
| **URL Slug** | Short, includes keyword, hyphens only | 🟡 Medium |
| **No Years in Slug** | Slug must NOT contain years (2024-2029) | 🔴 Critical |
| **H1 Count** | Exactly 1 (via frontmatter title) | 🔴 Critical |
| **No H1 in Body** | Content has no # headings | 🔴 Critical |
| **H2 Keyword** | Primary keyword in at least 1 H2 | 🟡 Medium |
| **Keyword in Intro** | Keyword in first 100 words | 🟡 Medium |
| **Keyword Density** | 1-2% (not stuffed) | 🟡 Medium |

#### Evergreen URL Validation

**CRITICAL:** Scan the filename/slug for years. If found → **IMMEDIATE FAIL**

```
FAIL if slug contains: 2024, 2025, 2026, 2027, 2028, 2029
Examples of FAILING slugs:
  ❌ ai-prompts-developers-2026.md
  ❌ best-chatgpt-prompts-2026.md
  ❌ ai-in-2026-timeline.md

Should be:
  ✅ ai-prompts-developers.md
  ✅ best-chatgpt-prompts.md
  ✅ ai-timeline-complete-guide.md
```

**Why this is critical:**
- URLs with years appear dated and reduce click-through rates
- Hurts long-term SEO value
- Requires redirects when content is updated

---

### Step 3: Content Quality Validation

> **Quick ref:** `/blog-quality-checklist#critical-requirements`

| Check | Requirement | Severity |
|-------|-------------|----------|
| **Word Count** | Minimum 4,000 words | 🔴 Critical |
| **Readability** | 8th grade level or below | 🟢 Low |
| **Internal Links** | 3-5 contextual links | 🟡 Medium |
| **External Links** | 2-3 authoritative sources | 🟡 Medium |
| **Heading Hierarchy** | H2 → H3 → H4, no skips | 🔴 Critical |
| **FAQ Section** | Present with Q&A format | 🟢 Low |
| **Tags** | 2-5 tags, no duplicates | 🟢 Low |

#### Word Count Validation

| Count | Status |
|-------|--------|
| ≥ 4,000 words | ✅ PASS |
| 3,500-3,999 words | ⚠️ WARN |
| < 3,500 words | ❌ FAIL |

---

### Step 4: Human Voice Validation

> **Quick ref:** `/blog-quality-checklist#human-voice-scoring` | **Banned phrases:** `/blog-quality-checklist#zero-tolerance`

| Check | Requirement | Severity |
|-------|-------------|----------|
| **No AI Clichés** | Zero instances of banned phrases | 🔴 Critical |
| **Personal Anecdotes** | At least 2-3 first-person experiences | 🔴 Critical |
| **Contractions Used** | Consistent use (don't, it's, we're) | 🟡 Medium |
| **Opinions Expressed** | At least 1-2 clear opinions | 🔴 Critical |
| **Sentence Variety** | Mix of short and medium sentences | 🟡 Medium |
| **Conversational Transitions** | No "Additionally," "Furthermore," "Moreover" | 🟡 Medium |

#### AI Pattern Detection

Scan content for these patterns and **FAIL if found**:

```
ZERO TOLERANCE - Automatic Fail:
- "In this comprehensive guide..."
- "Whether you're a [X] or a [Y]..."
- "It's important to note that..."
- "In conclusion..."
- "In today's rapidly evolving..."
- "This article will explore..."
```

#### Required Elements Checklist

- [ ] Opens with story, observation, or hook (not "In this article...")
- [ ] Contains 2-3 first-person experiences
- [ ] Expresses 1-2 opinions or "hot takes"
- [ ] Uses contractions consistently
- [ ] Includes moment of uncertainty
- [ ] Has 1-2 moments of light humor or wit

---

### Step 5: Information Currency Validation

> **Full requirements:** `/blog-quality-standards#3-information-currency-rules`

| Check | Requirement | Severity |
|-------|-------------|----------|
| **pubDate** | Matches current date from system context | 🔴 Critical |
| **Statistics** | From current year or previous year | 🔴 Critical |
| **Product References** | Current versions, not deprecated | 🔴 Critical |
| **External Links** | To maintained, current resources | 🟡 Medium |
| **Year References** | Use current year (e.g., "in 2026") | 🟡 Medium |

#### AI Model Version Validation (For AI/Tech Content)

> **Full requirements:** `/blog-quality-standards#4-ai-model-version-requirements`

**CRITICAL for AI-related content:** Verify all AI model references are current.

| Check | Requirement | Severity |
|-------|-------------|----------|
| **Model Names** | Use current version names | 🔴 Critical |
| **Version Numbers** | Match latest released versions | 🔴 Critical |
| **Context Windows** | Reflect current capabilities | 🟡 Medium |

**Quick check for outdated references (as of current date):**
- GPT-4, GPT-4o → Should be GPT-5.x
- Claude 3, Claude 3.5 → Should be Claude Opus/Sonnet/Haiku 4.x
- Gemini 1.x → Should be Gemini 2.x

If outdated references found, **search to verify current versions** before failing.

---

### Step 6: Accessibility Validation

| Check | Requirement | Severity |
|-------|-------------|----------|
| **Image Alt Text** | All images have descriptive alt | 🔴 Critical |
| **Link Text** | No "click here", descriptive anchors | 🟡 Medium |
| **Heading Structure** | Logical hierarchy | 🔴 Critical |

---

### Step 7: Technical Validation

| Check | Requirement | Severity |
|-------|-------------|----------|
| **Frontmatter Complete** | All required fields present | 🔴 Critical |
| **Schema Compliance** | Field names exactly match content.config.ts | 🔴 Critical |
| **Category Valid** | Must be a valid category from categories.ts | 🔴 Critical |
| **Author Valid** | String format (not array) | 🔴 Critical |
| **Date Format** | ISO format (YYYY-MM-DD) | 🔴 Critical |
| **heroImage Valid** | Path exists | 🟡 Medium |

#### ⛔ SCHEMA ERRORS THAT BREAK BUILD

These errors cause immediate build failure. Check for these first:

| Error | Wrong | Correct | Issue |
|-------|-------|---------|-------|
| Wrong date field | `date: 2026-01-11` | `pubDate: 2026-01-11` | Schema requires `pubDate` |
| Wrong category field | `categories: ["ai-news"]` | `category: "ai-news"` | Schema requires singular string |
| Wrong author field | `authors: ["Name"]` | `author: "AI Agents Kit"` | Schema requires string, not array |

If ANY of these schema errors are found → **IMMEDIATE FAIL** before other checks.

#### Required Frontmatter Fields

```yaml
# ⚠️ EXACT field names required - alternatives will break build
title: required          # String
description: required    # String  
pubDate: required        # Date (YYYY-MM-DD) - NOT "date"
category: required       # String - NOT "categories"
author: required         # String - NOT "authors"
```

#### Valid Categories

**Primary Categories:**
`ai-agents`, `ai-tools`, `ai-news`, `tutorials`, `chatgpt`, `prompt-engineering`, `ai-comparisons`, `ai-careers`, `generative-ai`, `open-source-ai`, `ai-ethics`, `ai-business`, `llms`, `ai-hardware`, `industry-ai`

**Legacy Categories:**
`prompts`, `mcp`, `tools`, `code-snippets`

#### Valid Authors

| Value | Notes |
|-------|-------|
| `AI Agents Kit` | Default author |
| `Vibe Coder` | Legacy alias |
| Custom string | Any name as string |

---

### Step 8: Link Validation

| Check | Requirement | Severity |
|-------|-------------|----------|
| **Internal Link Count** | 3-5 links | 🟡 Medium |
| **External Link Count** | 2-3 links | 🟡 Medium |
| **Anchor Text Quality** | Descriptive, not "click here" | 🟡 Medium |
| **No Broken Links** | All links resolve | 🔴 Critical |

---

### Step 9: Generate Validation Report

```markdown
# Blog Validation Report

**File:** `blog-drafts/[slug]/04-reviewed-draft.md`
**Validated:** YYYY-MM-DD HH:MM
**Status:** ✅ PASS / ❌ FAIL

---

## Summary

| Category | Passed | Failed | Warnings |
|----------|--------|--------|----------|
| SEO | X | X | X |
| Content | X | X | X |
| Human Voice | X | X | X |
| Information Currency | X | X | X |
| Accessibility | X | X | X |
| Technical | X | X | X |
| Links | X | X | X |
| **TOTAL** | **X** | **X** | **X** |

---

## ✅ Passed Checks

| Category | Check | Value |
|----------|-------|-------|
| SEO | Title Length | 54 chars ✅ |
| Content | Word Count | 4,250 words ✅ |
| ... | ... | ... |

---

## ❌ Failed Checks (if any)

| Category | Check | Issue | Severity | Fix |
|----------|-------|-------|----------|-----|
| [Category] | [Check] | [Issue] | 🔴/🟡 | [How to fix] |

---

## ⚠️ Warnings (if any)

| Category | Check | Issue | Recommendation |
|----------|-------|-------|----------------|
| [Category] | [Check] | [Issue] | [Recommendation] |

---

## 🔧 Required Actions (if FAIL)

1. **[CRITICAL]** [Action 1]
2. **[MEDIUM]** [Action 2]

---

## Next Steps

**If PASS:**
- [ ] Copy to `src/content/blog/[slug].md`
- [ ] Run: npm run dev (preview locally)
- [ ] Proceed to publishing phase

**If FAIL:**
- [ ] Fix all CRITICAL issues
- [ ] Address MEDIUM issues if possible
- [ ] Re-run `/blog-validator` after fixes
```

---

### Step 10: If PASS - Copy to Final Location

When validation passes:

```bash
# Copy reviewed draft to final location
cp blog-drafts/[slug]/04-reviewed-draft.md src/content/blog/[slug].md
```

---

## 🔄 Pass/Fail Logic

### FAIL Conditions (any of these = FAIL)

- Any 🔴 Critical check fails
- More than 3 🟡 Medium checks fail
- Frontmatter is invalid/incomplete

### PASS Conditions

- All 🔴 Critical checks pass
- Maximum 3 🟡 Medium issues (warnings acceptable)

### After FAIL

1. List specific issues with fixes
2. Fix issues in `04-reviewed-draft.md`
3. Re-run `/blog-validator`
4. Repeat until PASS

### After PASS

1. Copy file to `src/content/blog/[slug].md`
2. Proceed to publishing phase:
   - `npm run dev` (local preview)
   - `npm run build` (build test)
   - `npm run deploy` (deploy)
   - Submit to Google Search Console

---

## 📊 Validation Checklist Summary

### SEO (11 checks)
- [ ] Title: 50-60 characters
- [ ] Title: Contains primary keyword
- [ ] Description: 150-160 characters
- [ ] Description: Contains keyword
- [ ] Slug: Short, keyword-included
- [ ] Slug: No years (2024-2029) in filename
- [ ] H1: Only via frontmatter
- [ ] No H1 in body content
- [ ] Primary keyword in at least 1 H2
- [ ] Keyword in first 100 words
- [ ] Keyword density: 1-2%

### Content (7 checks)
- [ ] Word count: minimum 4,000 words
- [ ] Readability: 8th grade or below
- [ ] 3-5 internal links
- [ ] 2-3 external links
- [ ] Heading hierarchy valid
- [ ] FAQ section present
- [ ] Tags: 2-5 items, no duplicates

### Human Voice (6 checks)
- [ ] Zero banned AI phrases
- [ ] 2-3 personal anecdotes
- [ ] 1-2 opinions expressed
- [ ] Contractions used
- [ ] Sentence variety present
- [ ] Conversational tone

### Accessibility (3 checks)
- [ ] All images have descriptive alt text
- [ ] Link text is descriptive
- [ ] Heading structure is logical

### Technical (5 checks)
- [ ] Frontmatter complete
- [ ] Category is valid
- [ ] Author is valid
- [ ] Date format correct
- [ ] heroImage path valid

---

## ⚠️ Agent Instructions

When executing this workflow:

1. **Be thorough** - Check every item
2. **Be specific** - Give exact fixes, not vague suggestions
3. **Prioritize** - Critical issues first
4. **On PASS** - Copy file to `src/content/blog/[slug].md`
5. **Re-validate** - After fixes, run full validation again

**Input Location:**
```
blog-drafts/[post-slug]/04-reviewed-draft.md   ← File to validate
blog-drafts/[post-slug]/01-research-brief.md   ← Reference for keywords
```

**Output Location:** 
```
blog-drafts/[post-slug]/06-validation-report.md
src/content/blog/[slug].md                     ← Only on PASS
```

**PASS → Next Step:** Publishing phase
**FAIL → Action:** Fix issues and re-run `/blog-validator`

---

*Last updated: 2026-01-11*
*Optimized: Added explicit schema error detection (pubDate/category/author field validation)*
