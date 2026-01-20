---
description: Quality enhancement workflow - reviews drafts for content improvement, humanization, fact-checking, and citation enhancement before validation.
---

// turbo-all

# 🔍 Blog Reviewer Workflow

The quality enhancement "editor pass" that transforms good drafts into great ones through content improvement, humanization, fact-checking, and citation enhancement.

---

## 📋 Quick Reference

**Input:** Draft from `blog-drafts/[post-slug]/03-draft-v1.md`
**Output:** 
- Reviewed draft: `blog-drafts/[post-slug]/04-reviewed-draft.md`
- Review report: `blog-drafts/[post-slug]/05-review-report.md`
- Final: `src/content/blog/[slug].md`

**Duration:** ~30 minutes (Deep review)
**Previous Step:** `/blog-writer`
**Next Step:** `/blog-validator`
**Mode:** Fully automated

### ⚠️ CRITICAL: Information Currency

**ALL fact-checking and citations must use the CURRENT DATE as the reference point.**

- The current date is provided in the system context (e.g., `2026-01-07`)
- Update ANY statistics or data that are more than 1-2 years old
- When searching for sources, include current year in queries
- Prioritize sources from the current year and previous year
- Flag and update outdated information during fact-checking
- All external links should be to current, maintained resources

**Search Query Tips:**
```
"[topic] 2026" OR "[topic] 2025"
"[topic] statistics 2025"
"[topic] latest research"
```

---

## 🎯 Workflow Purpose

This workflow performs four comprehensive review passes:

| Pass | Purpose | What It Does |
|------|---------|--------------|
| **Pass 1** | Content Enhancement | Expand thin sections, improve examples, strengthen hook/CTA |
| **Pass 2** | Humanization | Remove AI patterns, add anecdotes, inject personality |
| **Pass 3** | Fact-Checking | Verify claims, correct errors, update outdated info |
| **Pass 4** | Citation & Links | Add authoritative external links, cite sources |

---

## 🔄 Four Review Passes

### Pass 1: Content Enhancement

**Goal:** Improve content quality, depth, and engagement.

#### 1.1 Section Analysis

For each section, evaluate:

| Check | Question | Action if Needed |
|-------|----------|------------------|
| **Depth** | Does word count match outline target? | Expand with more detail |
| **Examples** | Are there concrete, relatable examples? | Add 1-2 examples |
| **Value** | Does this section deliver on its heading? | Strengthen or rewrite |
| **Transitions** | Does it flow well from previous section? | Improve transition |

#### 1.2 Enhancement Checklist

- [ ] **Introduction hook** - Is it compelling and personal? (NOT generic)
- [ ] **Thin sections** - Any section significantly under target word count?
- [ ] **Missing examples** - Are abstract concepts illustrated with examples?
- [ ] **Coverage gaps** - Are all research brief questions answered?
- [ ] **Transitions** - Do sections flow naturally?
- [ ] **Conclusion CTA** - Is the call-to-action specific and actionable?

#### 1.3 Common Enhancements

| Issue | Enhancement |
|-------|-------------|
| Generic opening | Replace with personal story or surprising observation |
| Abstract explanation | Add concrete example or analogy |
| Thin section | Expand with more detail, sub-points, or data |
| Weak transition | Add connecting sentence that links themes |
| Vague conclusion | Add specific next steps and internal link |

---

### Pass 2: Humanization

**Goal:** Ensure content sounds 100% human-written with authentic voice.

#### 2.1 AI Pattern Scan

Scan entire document for these patterns. **All must be removed/rewritten:**

```
CRITICAL - MUST REMOVE:
- "In this comprehensive guide..."
- "Whether you're a [X] or a [Y]..."
- "By the end of this article..."
- "It's important to note that..."
- "In today's rapidly evolving..."
- "This article will explore..."
- "In conclusion..."

WARNING - MINIMIZE/REPHRASE:
- "Additionally," → "Also," or just start sentence
- "Furthermore," → "And," or restructure
- "Moreover," → Remove or rephrase
- "significantly" (without data) → Be specific
- "incredibly" → Replace with specific descriptor
- "transforming" (vague) → Describe HOW
```

#### 2.2 Human Voice Scoring

Score each element and ensure minimum thresholds:

| Element | Score 0 | Score 1 | Score 2 | Minimum |
|---------|---------|---------|---------|---------|
| **Personal anecdotes** | None | 1-2 | 3+ | 2 |
| **Opinions/hot takes** | None | 1 | 2+ | 1 |
| **Contractions** | Formal | Mixed | Natural | 2 |
| **Sentence variety** | Uniform | Some | Dynamic | 2 |
| **Uncertainty shown** | None | Some | Authentic | 1 |
| **Light humor** | None | Present | Well-placed | 1 |

**Minimum total score: 10/12** (if below, add missing elements)

#### 2.3 Humanization Techniques

If element is missing, add using these techniques:

| Missing Element | How to Add |
|-----------------|------------|
| Personal anecdote | "Last week, I saw...", "I've noticed that...", "When I first..." |
| Opinion/hot take | "Honestly, I think...", "My bet is...", "Here's where I disagree..." |
| Uncertainty | "I'm not 100% sure...", "Even experts disagree...", "Take this with skepticism..." |
| Humor | Self-deprecating moment, witty observation, unexpected comparison |
| Sentence variety | Add 3-5 word sentences. Then longer ones. Mix dramatically. |
| Contractions | Find/replace: "do not"→"don't", "it is"→"it's", "they are"→"they're" |

#### 2.4 The "Read Aloud" Test

Read each section aloud mentally. Flag and rewrite any paragraph that sounds like:
- A textbook
- A press release
- A corporate memo
- A Wikipedia article

**It should sound like:** A conversation with a smart colleague.

---

### Pass 3: Fact-Checking (Deep)

**Goal:** Verify all claims, correct errors, and ensure accuracy.

#### 3.1 Claims to Verify

Identify and verify all:

| Claim Type | Verification Method |
|------------|---------------------|
| **Statistics/numbers** | Web search for original source (MUST be current year or last year) |
| **Product features** | Check official product pages (current version) |
| **Company information** | Verify on company website (live, current info) |
| **Technical claims** | Cross-reference official documentation (latest version) |
| **Quotes** | Verify attribution and accuracy |
| **Dates/timelines** | Confirm current accuracy (update if outdated) |
| **Comparisons** | Verify both sides are accurate AND current |

**IMPORTANT: Reject sources older than 2 years for fast-moving topics (AI, tech, etc.)**

#### 3.1b AI Model Version Verification

**For any content mentioning AI models/tools, perform a dedicated model version check:**

```
1. SEARCH for latest model releases:
   "[provider] latest model [current month year]"
   Examples:
   - "OpenAI GPT latest model January 2026"
   - "Claude Anthropic latest model January 2026"
   - "Google Gemini latest model 2026"

2. VERIFY model names in the content:
   ❌ Outdated: GPT-4, GPT-4o, Claude 3, Claude 3.5, Gemini 1.5
   ✅ Current: Check search results for actual current versions

3. UPDATE all model references to current versions:
   - Model version numbers (GPT-5.x, Claude Opus 4.x, etc.)
   - Context window sizes (may have expanded)
   - New features launched since last update
   - Retired/deprecated model names

4. FLAG for special attention:
   🔄 Model Updated - Old model name replaced with current
```

**Common AI Model Updates to Check:**

| Provider | What Changes Often |
|----------|-------------------|
| **OpenAI** | GPT version numbers, ChatGPT features, API pricing |
| **Anthropic** | Claude Opus/Sonnet/Haiku versions, context windows |
| **Google** | Gemini versions, integration announcements |
| **Meta** | Llama versions, licensing changes |
| **Tool Integrations** | Which models tools like Jasper, Writesonic use |

#### 3.2 Verification Process

For each claim:

```
1. IDENTIFY the claim
2. SEARCH for verification (use search_web tool with current year)
   - Include "2026" or "2025" in search queries
   - Check publication date of sources
3. EVALUATE source quality AND currency
   - Reject sources >2 years old for tech/AI topics
4. MARK as:
   ✅ Verified - Source found and confirms claim (with current data)
   ⚠️ Corrected - Claim was inaccurate OR outdated, now fixed
   ❌ Removed - Claim cannot be verified, removed
   📌 Needs Citation - Claim verified but needs source link
   🔄 Updated - Old data replaced with current statistics
```

#### 3.3 Correction Protocol

When errors are found:

| Error Type | Action |
|------------|--------|
| **Outdated statistic** | Update to current data with source |
| **Wrong product name** | Correct to official name |
| **Incorrect feature** | Fix based on official docs |
| **Misattributed quote** | Correct attribution or remove |
| **Outdated information** | Update or note as historical |

#### 3.4 Fact-Check Report Template

```markdown
### Fact-Check Report

#### Verified Claims ✅
1. [Claim text] - Source: [URL]
2. [Claim text] - Source: [URL]

#### Corrected Claims ⚠️
1. [Original] → [Corrected] - Source: [URL]

#### Removed Claims ❌
1. [Claim] - Reason: [Could not verify]

#### Needs Citation 📌
1. [Claim] - Suggested source type: [docs/research/official]
```

---

### Pass 4: Citation & External Links

**Goal:** Add high-quality external links for all claims needing citation.

#### 4.1 Link Requirements

| Requirement | Standard |
|-------------|----------|
| **Minimum links** | 3-5 per post |
| **Format** | `target="_blank"` + `rel="noopener noreferrer"` |
| **Anchor text** | Descriptive (never "click here") |
| **Placement** | Near the claim they support |

#### 4.2 Source Quality Hierarchy

Prioritize sources in this order:

| Priority | Source Type | Example |
|----------|-------------|---------|
| **1** | Official documentation | AWS docs, Google Cloud docs |
| **2** | Primary sources | Company announcements, product pages |
| **3** | Research/reports | Gartner, McKinsey, academic papers |
| **4** | Authoritative media | TechCrunch, Wired, Ars Technica |
| **5** | Expert blogs | Well-known industry thought leaders |

#### 4.3 Sources to AVOID

- Low-quality content farms
- **Outdated articles (>1 year old for AI/tech, >2 years for other topics)**
- Heavily affiliate-monetized sites
- Unverifiable personal blogs
- Sites with many ads/popups
- Sources without publication dates
- Archived/discontinued documentation

#### 4.4 Link Search Process

For each claim needing citation:

```
1. IDENTIFY the claim needing source
2. SEARCH for authoritative source (use search_web)
3. VERIFY source is high-quality and current
4. ADD link with descriptive anchor text
5. ENSURE proper formatting:
   - Markdown: [anchor text](URL)
   - Or HTML: <a href="URL" target="_blank" rel="noopener noreferrer">anchor</a>
```

#### 4.5 What to Link

| Content Type | Should Link To |
|--------------|----------------|
| Statistics | Original research/report |
| Product features | Official product page |
| Technical concepts | Official documentation |
| Company claims | Company's official announcement |
| "According to..." | The original source |
| Controversial claims | Multiple supporting sources |

---

## 📄 Output: Review Report

After completing all four passes, generate:

```markdown
# Blog Review Report: [Post Title]

**Draft:** blog-drafts/[slug]/03-draft-v1.md
**Reviewed:** YYYY-MM-DD HH:MM
**Status:** ✅ Complete

---

## Summary

| Pass | Status | Key Changes |
|------|--------|-------------|
| Content Enhancement | ✅ | [X sections expanded, Y transitions improved] |
| Humanization | ✅ | [X patterns removed, Y anecdotes added, score: X/12] |
| Fact-Checking | ✅ | [X verified, Y corrected, Z removed] |
| External Links | ✅ | [X citations added] |

---

## Pass 1: Content Enhancement

### Changes Made
- **[Section name]** - [What was enhanced and why]
- **Introduction** - [Changes to hook]
- **Conclusion** - [Changes to CTA]

### Word Count
- Before: [X] words
- After: [Y] words
- Change: [+/-Z] words

---

## Pass 2: Humanization

### AI Patterns Removed
| Original | Replaced With |
|----------|---------------|
| "[banned phrase]" | "[replacement]" |

### Voice Elements Added
- **Anecdote:** [Location] - "[Brief description]"
- **Opinion:** [Location] - "[Brief description]"
- **Uncertainty:** [Location] - "[Brief description]"

### Human Voice Score
| Element | Score |
|---------|-------|
| Personal anecdotes | X/2 |
| Opinions | X/2 |
| Contractions | X/2 |
| Sentence variety | X/2 |
| Uncertainty | X/2 |
| Light humor | X/2 |
| **TOTAL** | **X/12** ✅ |

---

## Pass 3: Fact-Checking

### Verified Claims ✅
1. [Claim] - Source: [URL]

### Corrected Claims ⚠️
1. [Original] → [Corrected] - Source: [URL]

### Removed Claims ❌
(None / List if any)

---

## Pass 4: External Links Added

| Anchor Text | URL | Context |
|-------------|-----|---------|
| [text] | [URL] | [Why linked] |

---

## Output Files

- ✅ Reviewed draft: `blog-drafts/[slug]/04-reviewed-draft.md`
- ✅ Final published: `src/content/blog/[slug].md`
- ✅ This report: `blog-drafts/[slug]/05-review-report.md`

---

*Review complete. Ready for `/blog-validator` phase.*
```

---

## ⚠️ Agent Instructions

When executing this workflow:

1. **Read the full draft** before starting any pass
2. **Execute passes in order** - Each pass builds on previous
3. **Use web search** for fact-checking and finding citations
4. **Document all changes** in the review report
5. **Save three files:**
   - `blog-drafts/[slug]/04-reviewed-draft.md` - The enhanced draft
   - `blog-drafts/[slug]/05-review-report.md` - Detailed change log
   - `src/content/blog/[slug].md` - Updated final file

**Critical Checks:**
- Human Voice Score must be ≥10/12
- All verifiable claims must be checked
- Minimum 3 external links must be added
- Zero banned AI phrases in final output

**Next Step:** After saving files, proceed to `/blog-validator`.

---

*Last updated: 2026-01-07*
