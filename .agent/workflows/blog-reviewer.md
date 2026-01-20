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

**Duration:** ~15-25 minutes
**Previous Step:** `/blog-writer`
**Next Step:** `/blog-validator`

> **📚 Quick Reference:** `/blog-quality-checklist` | **Templates:** `/blog-templates`

---

## 🎯 Workflow Purpose

### ⚡ CONSOLIDATED REVIEW (Token Optimized)

**Two comprehensive passes instead of four** - same quality checks, less context overhead.

| Pass | Combined Focus | Time |
|------|---------------|------|
| **Pass 1** | Content Enhancement + Humanization | ~8 min |
| **Pass 2** | Fact-Checking + Citations | ~7 min |

**Why consolidate:**
- Pass 1 & 2 both improve written content (compatible goals)
- Pass 3 & 4 both verify claims (compatible goals)
- Reduces re-reading of full draft from 4× to 2×
- **Saves:** ~3,000 tokens

**Quality preserved:** All original checks still performed, just grouped efficiently.

---

## 🔄 Two Consolidated Passes

### Pass 1: Content Enhancement + Humanization

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

- [ ] **Introduction hook** - Is it compelling and PERSONAL? (NOT generic)
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

> **Quick Reference:** `/blog-quality-checklist#human-voice-scoring` | **Full rubric:** `/blog-quality-standards`

#### 2.1 AI Pattern Scan

Scan entire document for banned phrases. **All must be removed/rewritten:**

```
CRITICAL - MUST REMOVE (Zero Tolerance):
- "In this comprehensive guide..."
- "Whether you're a [X] or a [Y]..."
- "By the end of this article..."
- "It's important to note that..."
- "In today's rapidly evolving..."
- "This article will explore..."
- "In conclusion..."

WARNING - REPLACE:
- "Additionally," → "Also," or just start sentence
- "Furthermore," → "And," or restructure
- "Moreover," → Remove or rephrase
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

#### 2.3 Adding Missing Elements

If an element scores 0, add using these techniques:

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

### Pass 2: Fact-Checking + External Citations

**Goal:** Verify claims, correct errors, and ensure accuracy.

> **See:** `/blog-quality-checklist#information-currency`

#### 3.1 Claims to Verify

Identify and verify:

| Claim Type | Verification Method |
|------------|---------------------|
| **Statistics/numbers** | Web search for original source (current year preferred) |
| **Product features** | Check official product pages (current version) |
| **Company information** | Verify on company website |
| **Technical claims** | Cross-reference official documentation |
| **Quotes** | Verify attribution and accuracy |
| **Comparisons** | Verify both sides are accurate AND current |

#### 3.2 Verification Process

For each claim:

```
1. IDENTIFY the claim
2. SEARCH for verification (include current year in queries)
3. EVALUATE source quality AND currency
   - Reject sources >1-2 years old for AI/tech topics
4. MARK as:
   ✅ Verified - Source confirms claim
   ⚠️ Corrected - Claim was inaccurate/outdated, now fixed
   ❌ Removed - Cannot be verified
   🔄 Updated - Old data replaced with current
```

#### 3.3 Correction Protocol

| Error Type | Action |
|------------|--------|
| **Outdated statistic** | Update to current data with source |
| **Wrong product name** | Correct to official name |
| **Incorrect feature** | Fix based on official docs |
| **Outdated information** | Update or note as historical |

---

> **⚡ NOTE:** Pass 4 (Citations) is now performed during Pass 2 (Fact-Checking). Add external links while verifying claims for efficiency.

### Pass 4: Citation & External Links (CONSOLIDATED INTO PASS 2)

**Perform this during Pass 2 for efficiency.**

| Requirement | Standard |
|-------------|----------|
| **Minimum links** | 3-5 per post |
| **Anchor text** | Descriptive (never "click here") |
| **Placement** | Near the claim they support |

#### 4.2 What to Link

| Content Type | Should Link To |
|--------------|----------------|
| Statistics | Original research/report |
| Product features | Official product page |
| Technical concepts | Official documentation |
| Company claims | Company's official announcement |
| "According to..." | The original source |

#### 4.3 Link Search Process

```
1. IDENTIFY claim needing source
2. SEARCH for authoritative source (use search_web)
3. VERIFY source is high-quality and current
4. ADD link with descriptive anchor text
5. ENSURE proper formatting
```

---

## 📄 Output: Review Report

After completing all four passes, generate this report:

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
5. **Save two files:**
   - `blog-drafts/[slug]/04-reviewed-draft.md` - The enhanced draft
   - `blog-drafts/[slug]/05-review-report.md` - Detailed change log

**Critical Thresholds:**
- Human Voice Score must be ≥10/12
- All verifiable claims must be checked
- Minimum 3 external links (after this pass)
- Zero banned AI phrases in output

**Next Step:** After saving files, proceed to `/blog-validator`.

---

*Last updated: 2026-01-09*
*Optimized: Removed duplicate AI model verification (done in /blog-research, validated in /blog-validator), references /blog-quality-standards*
