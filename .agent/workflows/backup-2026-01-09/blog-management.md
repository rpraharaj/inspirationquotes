---
description: Master documentation for the blog workflow orchestration system - explains how all blog-related workflows work together to create high-quality, SEO-optimized content.
---

# 📚 Blog Management System

A comprehensive, modular workflow system for creating high-quality, SEO-optimized blog posts. This document serves as the master plan and documentation for the entire blog workflow ecosystem.

---

## 🎯 System Overview

### Purpose

This system provides an **end-to-end automated workflow** for creating blog content that:
- **Sounds 100% human-written** (authentic voice, NOT AI-sounding)
- Ranks well on Google (SEO-optimized)
- Provides genuine value to readers (E-E-A-T compliant)
- Follows consistent quality standards
- Integrates with existing workflows (SEO, accessibility, performance)

### The Problem It Solves

| Without System | With System |
|----------------|-------------|
| AI-sounding, generic content | Authentic human voice with personality |
| Inconsistent content quality | Standardized excellence |
| Missed SEO opportunities | Comprehensive optimization |
| Manual research for each post | Structured research process |
| Quality issues found after publishing | Pre-publish validation |
| Context lost between sessions | Clear handoffs & documentation |

---

## 🏗️ System Architecture

### Workflow Registry

| Workflow | File | Purpose | Status |
|----------|------|---------|--------|
| **Blog From Plan** | `/blog-from-plan` | Auto-pick next post from content-ideas.md | ✅ Created |
| **Blog Master** | `/blog-master` | Entry point & orchestrator | ✅ Created |
| **Blog Research** | `/blog-research` | Topic research & analysis | ✅ Created |
| **Blog Outline** | `/blog-outline` | Content structure generator | ✅ Created |
| **Blog Writer** | `/blog-writer` | Content drafting | ✅ Created |
| **Blog Reviewer** | `/blog-reviewer` | Quality enhancement & fact-check | ✅ Created |
| **Blog Validator** | `/blog-validator` | Quality gate & validation | ✅ Created |
| **Blog Writing SOP** | `/blog-writing-sop` | Optimization & publishing | ✅ Exists |
| **SEO Guidelines** | `/seo-guidelines` | Technical SEO reference | ✅ Exists |
| **Accessibility** | `/accessibility` | WCAG compliance | ✅ Exists |
| **Performance** | `/performance` | Page speed optimization | ✅ Exists |
| **JSON-LD Schema** | `/json-ld-schema` | Structured data | ✅ Exists |

### Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   USER INPUT: "Write a blog about [TOPIC]"                              │
│                                                                         │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                         /blog-master                                    │
│                    (Master Orchestrator)                                │
│                                                                         │
│   • Receives topic from user                                            │
│   • Validates input                                                     │
│   • Orchestrates sub-workflows in sequence                              │
│   • Manages state between phases                                        │
│   • Returns final deliverable to user                                   │
│                                                                         │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
                  ┌───────────────┴───────────────┐
                  │                               │
                  ▼                               │
┌─────────────────────────────────┐               │
│                                 │               │
│       PHASE 1: RESEARCH         │               │
│         /blog-research          │               │
│                                 │               │
│   INPUT:                        │               │
│   • Topic/keyword from user     │               │
│                                 │               │
│   PROCESS:                      │               │
│   • Keyword analysis            │               │
│   • SERP analysis               │               │
│   • Competitor review           │               │
│   • Search intent detection     │               │
│   • Question mining             │               │
│   • Data gathering              │               │
│                                 │               │
│   OUTPUT:                       │               │
│   • Research Brief (markdown)   │               │
│   • Primary keyword             │               │
│   • Secondary keywords          │               │
│   • Target word count           │               │
│   • Content format              │               │
│   • Questions to answer         │               │
│   • Unique angle                │               │
│                                 │               │
└────────────────┬────────────────┘               │
                 │                                │
                 │ Research Brief                 │
                 ▼                                │
┌─────────────────────────────────┐               │
│                                 │               │
│       PHASE 2: OUTLINE          │               │
│         /blog-outline           │               │
│                                 │               │
│   INPUT:                        │               │
│   • Research Brief from Phase 1 │               │
│                                 │               │
│   PROCESS:                      │               │
│   • Analyze top-ranking content │               │
│   • Identify H2/H3 structure    │               │
│   • Plan featured snippets      │               │
│   • Map internal links          │               │
│   • Allocate word counts        │               │
│   • Plan FAQ section            │               │
│                                 │               │
│   OUTPUT:                       │               │
│   • Detailed Outline (markdown) │               │
│   • Section-by-section plan     │               │
│   • Word count per section      │               │
│   • Internal link targets       │               │
│   • Snippet opportunities       │               │
│                                 │               │
└────────────────┬────────────────┘               │
                 │                                │
                 │ Detailed Outline               │
                 ▼                                │
┌─────────────────────────────────┐               │
│                                 │               │
│       PHASE 3: WRITING          │               │
│         /blog-writer            │               │
│                                 │               │
│   INPUT:                        │               │
│   • Research Brief              │               │
│   • Detailed Outline            │               │
│                                 │               │
│   PROCESS:                      │               │
│   • Write frontmatter           │               │
│   • Craft compelling intro      │               │
│   • Expand each section         │               │
│   • Add E-E-A-T signals         │               │
│   • Format for readability      │               │
│   • Include calls-to-action     │               │
│                                 │               │
│   OUTPUT:                       │               │
│   • Complete Draft (.md file)   │               │
│   • Ready for review            │               │
│                                 │               │
└────────────────┬────────────────┘               │
                 │                                │
                 │ Complete Draft                 │
                 ▼                                │
┌─────────────────────────────────┐               │
│                                 │               │
│       PHASE 4: REVIEW           │               │
│         /blog-reviewer          │               │
│                                 │               │
│   INPUT:                        │               │
│   • Complete Draft              │               │
│   • Research Brief (reference)  │               │
│                                 │               │
│   PROCESS:                      │               │
│   Pass 1: Content Enhancement   │               │
│   • Expand thin sections        │               │
│   • Improve examples/analogies  │               │
│   • Strengthen hook and CTA     │               │
│                                 │               │
│   Pass 2: Humanization          │               │
│   • Remove AI patterns          │               │
│   • Add personal anecdotes      │               │
│   • Inject opinions/humor       │               │
│                                 │               │
│   Pass 3: Fact-Checking (Deep)  │               │
│   • Verify all claims           │               │
│   • Correct inaccuracies        │               │
│   • Update outdated info        │               │
│                                 │               │
│   Pass 4: Citations             │               │
│   • Add external links          │               │
│   • Cite authoritative sources  │               │
│                                 │               │
│   OUTPUT:                       │               │
│   • Reviewed Draft              │               │
│   • Review Report               │               │
│                                 │               │
└────────────────┬────────────────┘               │
                 │                                │
                 │ Reviewed Draft                 │
                 ▼                                │
┌─────────────────────────────────┐               │
│                                 │               │
│       PHASE 5: VALIDATION       │               │
│         /blog-validator         │               │
│                                 │               │
│   INPUT:                        │               │
│   • Reviewed Draft              │               │
│   • Research Brief (reference)  │               │
│                                 │               │
│   PROCESS:                      │               │
│   Cross-reference against:      │               │
│   • /seo-guidelines             │               │
│   • /accessibility              │               │
│   • /performance                │               │
│   • /blog-writing-sop           │               │
│   • /json-ld-schema             │               │
│                                 │               │
│   Validate:                     │               │
│   • Title (50-60 chars)         │               │
│   • Meta description (150-160)  │               │
│   • H1/H2/H3 structure          │               │
│   • Keyword usage               │               │
│   • Alt text on images          │               │
│   • Internal/external links     │               │
│   • Frontmatter completeness    │               │
│   • Readability score           │               │
│   • Word count targets          │               │
│                                 │               │
│   OUTPUT:                       │               │
│   • Validation Report           │               │
│   • PASS or FAIL status         │               │
│   • Specific issues list        │               │
│   • Fix recommendations         │               │
│                                 │               │
└────────────────┬────────────────┘               │
                 │                                │
         ┌───────┴───────┐                        │
         │               │                        │
         ▼               ▼                        │
    ┌─────────┐    ┌─────────┐                    │
    │  FAIL   │    │  PASS   │                    │
    └────┬────┘    └────┬────┘                    │
         │              │                         │
         │              ▼                         │
         │    ┌─────────────────────┐             │
         │    │                     │             │
         │    │  PHASE 6: PUBLISH   │             │
         │    │  /blog-writing-sop  │             │
         │    │  (Existing workflow)│             │
         │    │                     │             │
         │    │  • Final checks     │             │
         │    │  • Build & preview  │             │
         │    │  • Deploy           │             │
         │    │  • Submit to GSC    │             │
         │    │  • Post-publish     │             │
         │    │                     │             │
         │    └─────────────────────┘             │
         │                                        │
         │    Fix issues and re-run               │
         └────────────────────────────────────────┘
```

---

## ⏰ Information Currency Requirements (CRITICAL)

**ALL content must use the CURRENT DATE as the reference point.** This is NON-NEGOTIABLE. Outdated information fails validation.

### Why This Matters

- Outdated statistics undermine credibility
- Google values fresh, current content
- Readers expect accurate, up-to-date information
- Stale data can be actively harmful (especially for AI/tech topics)

### Currency Standards

| Topic Type | Maximum Age | Notes |
|------------|-------------|-------|
| **AI/Tech** | 1 year | Fast-moving field, prioritize current year |
| **Industry trends** | 1-2 years | Markets change quickly |
| **General/Evergreen** | 2-3 years | Some stability acceptable |
| **Historical/Reference** | N/A | Historical context is fine if labeled |

### Agent Instructions

1. **Extract current date** from system context (format: `YYYY-MM-DDTHH:MM:SS+TZ`)
2. **Use date portion** (YYYY-MM-DD) for `pubDate` in frontmatter
3. **Include year in searches** (e.g., "AI agents 2026")
4. **Verify source dates** - reject outdated sources
5. **Update old statistics** during fact-checking pass
6. **Reference current year** in content (e.g., "as of 2026", "in 2026")

---

## 🎭 Human Voice Requirements (CRITICAL)

**ALL blog content MUST sound 100% human-written.** This is NON-NEGOTIABLE. AI-sounding content fails validation regardless of SEO, word count, or other factors.

### Why This Matters

- AI-sounding content undermines reader trust
- Google's helpful content system penalizes generic, AI-generated content
- authentic voice creates connection and authority
- Human readers can detect AI writing and disengage

### Human Voice Checklist

Every blog post MUST include:

| Required Element | Minimum Count | Example |
|------------------|---------------|---------|
| **Personal anecdotes** | 2-3 | "Last week, I watched...", "I've seen companies..." |
| **Opinions/hot takes** | 1-2 | "Honestly, I think...", "My bet is on..." |
| **Uncertainty admissions** | 1+ | "I'm not 100% sure...", "Even experts disagree..." |
| **Contractions** | Consistent | don't, it's, they're, we're |
| **Conversational transitions** | Throughout | "Here's the thing...", "That said...", "Anyway—" |
| **Light humor** | 1-2 | Witty observations, self-deprecating moments |

### Banned Phrases (ZERO TOLERANCE)

These phrases cause AUTOMATIC FAILURE:

```
❌ "In this comprehensive guide..."
❌ "Whether you're a [X] or a [Y]..."
❌ "By the end of this article..."
❌ "It's important to note that..."
❌ "In today's rapidly evolving..."
❌ "This article will explore..."
❌ "Additionally," / "Furthermore," / "Moreover,"
❌ "In conclusion..."
```

### Voice Tone Standards

| Aspect | Requirement |
|--------|-------------|
| **Tone** | Professional but warm—like explaining to a smart colleague |
| **Perspective** | Generic first-person ("I've seen...", "In my experience...") |
| **Style** | Conversational, not academic. Write like you talk (but polished) |
| **Sentence variety** | Mix short (5 words) with medium (15-20 words) |
| **Imperfection** | Include moments of uncertainty, self-correction, tangents |

### The "Read Aloud" Test

Every paragraph must sound natural when read aloud. If it sounds like:
- A textbook → Rewrite
- A press release → Rewrite
- A corporate memo → Rewrite
- A conversation with a smart friend → ✅ Good

---

## 📋 Detailed Workflow Specifications

### 1. `/blog-master` - Master Orchestrator

**File:** `.agent/workflows/blog-master.md`

**Purpose:** The single entry point for the entire blog creation process. Receives a topic from the user and orchestrates all sub-workflows.

**Invocation:**
```
/blog-master Write a comprehensive guide about AI agents for customer service
```

**Responsibilities:**
1. Parse and validate user input (topic)
2. Invoke `/blog-research` with the topic
3. Pass research output to `/blog-outline`
4. Pass outline to `/blog-writer`
5. Invoke `/blog-validator` on completed draft
6. Handle pass/fail scenarios
7. Guide user to `/blog-writing-sop` for publishing

**State Management:**
- Maintains context between workflow phases
- Tracks which phase has been completed
- Stores intermediate outputs for reference

**Success Criteria:**
- All 4 phases complete successfully
- Validation passes with no critical errors
- Draft is ready for publishing phase

---

### 2. `/blog-research` - Research Workflow

**File:** `.agent/workflows/blog-research.md`

**Purpose:** Conduct comprehensive research on the given topic to inform content creation.

**Input:**
```
Topic: "AI agents for customer service"
```

**Research Areas:**

| Area | Actions | Tools/Methods |
|------|---------|---------------|
| **Keyword Analysis** | Identify primary keyword, long-tail variations, LSI keywords | Web search, keyword tools |
| **SERP Analysis** | Review top 10 results, note formats, identify gaps | Web search |
| **Search Intent** | Classify as informational/navigational/transactional/commercial | Analysis |
| **Competitor Review** | Analyze what top articles cover/miss | Web search |
| **Question Mining** | Gather PAA questions, Reddit/forum questions | Web search |
| **Data Gathering** | Find statistics, studies, expert quotes | Web search |
| **Unique Angle** | Define differentiated perspective | Creative analysis |

**Output: Research Brief**
```markdown
# Research Brief: [Topic]

## Primary Keyword
- Keyword: [keyword]
- Search Intent: [informational/navigational/transactional/commercial]
- Estimated Difficulty: [low/medium/high]

## Secondary Keywords
1. [keyword 1]
2. [keyword 2]
3. [keyword 3]

## Target Content Specifications
- Word Count: Minimum 4,000 words (no max - be comprehensive)
- Content Format: [comprehensive guide/listicle/tutorial/etc.]
- Tone: [professional/conversational/technical]

## Top Ranking Content Analysis
| Rank | Title | Word Count | Format | Key Strength | Gap |
|------|-------|------------|--------|--------------|-----|
| 1 | [Title] | [count] | [format] | [strength] | [gap] |
| ... | ... | ... | ... | ... | ... |

## Questions to Answer
1. [Question from PAA/forums]
2. [Question from PAA/forums]
3. [Question from PAA/forums]

## Key Data/Statistics to Include
- [Statistic 1 with source]
- [Statistic 2 with source]

## Unique Angle
[Description of how this content will be different/better]

## Internal Link Opportunities
- [Existing blog post 1 to link to]
- [Existing blog post 2 to link to]
```

---

### 3. `/blog-outline` - Outline Generator

**File:** `.agent/workflows/blog-outline.md`

**Purpose:** Transform research into a detailed, SEO-optimized content structure.

**Input:**
- Research Brief from `/blog-research`

**Process:**
1. Analyze successful content structures from SERP
2. Design H2/H3 heading hierarchy
3. Identify featured snippet opportunities
4. Plan FAQ section for PAA optimization
5. Map internal linking strategy
6. Allocate word counts per section

**Output: Detailed Outline**
```markdown
# Content Outline: [Title]

## Metadata
- Target Word Count: [total]
- Estimated Read Time: [X minutes]
- Primary Keyword Location: [title, H2#1, intro]
- Featured Snippet Target: [paragraph/list/table]

## Structure

### Introduction (150-200 words)
**Goal:** Hook reader, establish value proposition, preview content
- Open with compelling hook/statistic
- State the problem/opportunity
- Promise what reader will learn
- Include primary keyword in first 100 words

### H2: [Section Title with Keyword] (300-400 words)
**Goal:** [Section objective]
**Subsections:**
- H3: [Subsection 1]
- H3: [Subsection 2]
**Key Points:**
- [Point 1]
- [Point 2]
**Internal Link:** [Link to existing blog post]

### H2: [Section Title] (250-350 words)
...

### H2: Frequently Asked Questions (200-300 words)
**Goal:** Capture PAA queries, provide quick answers
**Questions:**
1. [PAA Question 1]
2. [PAA Question 2]
3. [PAA Question 3]

### Conclusion (100-150 words)
**Goal:** Summarize, reinforce key takeaway, CTA
- Summarize main points
- Reinforce primary keyword
- Clear call-to-action
```

---

### 4. `/blog-writer` - Content Drafting

**File:** `.agent/workflows/blog-writer.md`

**Purpose:** Transform the outline into a complete, high-quality draft.

**Input:**
- Research Brief
- Detailed Outline

**Writing Guidelines:**

| Aspect | Requirement |
|--------|-------------|
| **Voice** | Active voice (80%+) |
| **Readability** | 8th grade level or below (Flesch-Kincaid) |
| **Paragraphs** | 2-3 sentences max |
| **E-E-A-T** | Demonstrate Experience, Expertise, Authority, Trust |
| **Formatting** | Lists, bold keywords, code blocks where appropriate |
| **Engagement** | Questions, examples, analogies |

**Frontmatter Requirements:**
```yaml
---
title: "Compelling Title (50-60 characters)"
description: "Benefit-focused meta description (150-160 characters)"
pubDate: YYYY-MM-DD
updatedDate: null
heroImage: "/blog-placeholder-2.jpg"
category: "ai-news"  # Must be valid category
tags: ["tag1", "tag2", "tag3"]
author: "Vibe Coder"
difficulty: "beginner"  # beginner | intermediate | advanced
featured: false
---
```

**Output:**
- Complete `.md` file saved to `blog-drafts/[slug]/03-draft-v1.md`
- Ready for review phase

---

### 5. `/blog-reviewer` - Quality Enhancement

**File:** `.agent/workflows/blog-reviewer.md`

**Purpose:** Enhance draft quality through content improvement, humanization, fact-checking, and citation.

**Input:**
- Draft file from `/blog-writer`
- Research Brief (for reference)

**Four Review Passes:**

| Pass | Purpose | Actions |
|------|---------|---------|
| **1. Content Enhancement** | Improve depth and engagement | Expand thin sections, add examples, strengthen hook/CTA |
| **2. Humanization** | Ensure 100% human voice | Remove AI patterns, add anecdotes/opinions/humor |
| **3. Fact-Checking** | Verify accuracy | Check all claims, correct errors, update outdated info |
| **4. Citations** | Add authoritative links | Search for sources, add 3-5 high-quality external links |

**Humanization Scoring:**

| Element | Score 0-2 | Minimum |
|---------|-----------|---------|
| Personal anecdotes | None (0), 1-2 (1), 3+ (2) | 2 |
| Opinions/hot takes | None (0), 1 (1), 2+ (2) | 1 |
| Contractions | Formal (0), Mixed (1), Natural (2) | 2 |
| Sentence variety | Uniform (0), Some (1), Dynamic (2) | 2 |
| Uncertainty shown | None (0), Some (1), Authentic (2) | 1 |
| Light humor | None (0), Present (1), Well-placed (2) | 1 |

**Minimum total score: 10/12**

**Output:**
- Reviewed draft: `blog-drafts/[slug]/04-reviewed-draft.md`
- Review report: `blog-drafts/[slug]/05-review-report.md`
- Updated final: `src/content/blog/[slug].md`

---

### 6. `/blog-validator` - Quality Gate

**File:** `.agent/workflows/blog-validator.md`

**Purpose:** Comprehensive validation against all quality standards before publishing.

**Input:**
- Reviewed draft file
- Research Brief (for cross-reference)

**Validation Checklist:**

#### SEO Checks (Reference: `/seo-guidelines`)
| Check | Requirement | Pass/Fail |
|-------|-------------|-----------|
| Title length | 50-60 characters | [ ] |
| Title keyword | Primary keyword present | [ ] |
| Meta description length | 150-160 characters | [ ] |
| Meta description keyword | Primary keyword present | [ ] |
| URL slug | Short, includes keyword | [ ] |
| H1 count | Exactly 1 (via frontmatter) | [ ] |
| H2 keyword | Primary keyword in at least 1 H2 | [ ] |
| Keyword in intro | Keyword in first 100 words | [ ] |
| Keyword density | 1-2% (not stuffed) | [ ] |

#### Content Quality Checks (Reference: `/blog-writing-sop`)
| Check | Requirement | Pass/Fail |
|-------|-------------|-----------|
| Word count | Meets target from research | [ ] |
| Readability | 8th grade level or below | [ ] |
| Internal links | 3-5 contextual links | [ ] |
| External links | 2-3 authoritative sources | [ ] |
| Heading hierarchy | H2 → H3 → H4 (no skips) | [ ] |

#### Accessibility Checks (Reference: `/accessibility`)
| Check | Requirement | Pass/Fail |
|-------|-------------|-----------|
| Image alt text | All images have descriptive alt | [ ] |
| Link text | No "click here" - descriptive text | [ ] |
| Heading structure | Logical hierarchy | [ ] |

#### Technical Checks
| Check | Requirement | Pass/Fail |
|-------|-------------|-----------|
| Frontmatter complete | All required fields present | [ ] |
| Category valid | Matches defined categories | [ ] |
| Author valid | Matches authors.ts | [ ] |
| Links work | No broken links | [ ] |
| Images exist | All referenced images exist | [ ] |

**Output: Validation Report**
```markdown
# Blog Validation Report

**File:** `src/content/blog/[slug].md`
**Validated:** YYYY-MM-DD HH:MM

## Summary
- **Status:** ✅ PASS / ❌ FAIL
- **Checks Passed:** X/Y
- **Critical Issues:** [count]
- **Warnings:** [count]

## Detailed Results

### ✅ Passed Checks
| Category | Check | Value |
|----------|-------|-------|
| SEO | Title length | 54 chars ✅ |
| ... | ... | ... |

### ❌ Failed Checks
| Category | Check | Issue | Severity | Fix |
|----------|-------|-------|----------|-----|
| SEO | H2 keyword | Missing primary keyword | 🟡 Medium | Add keyword to H2 |
| ... | ... | ... | ... | ... |

## Recommended Actions
1. [Specific action to fix issue 1]
2. [Specific action to fix issue 2]

## Next Steps
- [ ] Fix all critical issues
- [ ] Re-run `/blog-validator` after fixes
- [ ] Proceed to `/blog-writing-sop` Phase 4 (Publishing)
```

---

## 🔄 Workflow Interaction Model

### Data Flow Between Workflows

```
┌───────────────┐     topic      ┌───────────────┐
│               │ ─────────────▶ │               │
│  /blog-master │                │ /blog-research│
│               │ ◀───────────── │               │
└───────────────┘  Research Brief└───────────────┘
        │
        │ Research Brief
        ▼
┌───────────────┐
│               │
│ /blog-outline │
│               │
└───────┬───────┘
        │ Outline
        ▼
┌───────────────┐
│               │  Research Brief + Outline
│ /blog-writer  │ ◀─────────────────────────
│               │
└───────┬───────┘
        │ Draft File
        ▼
┌───────────────┐
│               │
│/blog-validator│
│               │
└───────┬───────┘
        │ Validation Report
        ▼
    PASS/FAIL
```

### Inter-Workflow Dependencies

| Workflow | Depends On | Provides To |
|----------|------------|-------------|
| `/blog-master` | User input | All sub-workflows |
| `/blog-research` | Topic from master | `/blog-outline`, `/blog-writer` |
| `/blog-outline` | Research Brief | `/blog-writer` |
| `/blog-writer` | Research Brief + Outline | `/blog-validator` |
| `/blog-validator` | Draft file | Publishing decision |

---

## 🎮 Usage Examples

### Example 1: Full Blog Creation

```
User: /blog-master Write a comprehensive guide about using Claude AI for code review

Agent: Starting blog creation workflow for "using Claude AI for code review"...

[Phase 1: Research]
- Conducting keyword analysis...
- Analyzing SERP results...
- Mining questions from PAA and forums...
✅ Research Brief complete

[Phase 2: Outline]
- Designing content structure...
- Planning sections and word counts...
✅ Detailed Outline complete

[Phase 3: Writing]
- Drafting frontmatter...
- Writing introduction...
- Expanding sections...
✅ Draft saved to src/content/blog/claude-ai-code-review-guide.md

[Phase 4: Validation]
- Checking SEO requirements...
- Validating accessibility...
- Verifying technical requirements...
✅ Validation PASSED (18/18 checks)

✅ Blog post ready for publishing!
Next: Follow /blog-writing-sop Phase 4 for final publishing steps.
```

### Example 2: Validation Failed

```
[Phase 4: Validation]
❌ Validation FAILED (15/18 checks)

Issues found:
1. 🔴 CRITICAL: Missing alt text on hero image
2. 🟡 MEDIUM: No internal links found (need 3-5)
3. 🟡 MEDIUM: Primary keyword missing from H2 headings

Please fix these issues and run /blog-validator again.
```

### Example 3: Individual Workflow Usage

```
User: /blog-research AI agents for customer service

Agent: Starting research phase...
[Outputs Research Brief]

User: /blog-outline
(Uses the Research Brief from previous step)

User: /blog-validator src/content/blog/my-draft.md
(Validates an existing draft file)
```

---

## 📁 File Structure

After implementation, the workflow directory will contain:

```
.agent/workflows/
├── blog-management.md      # This documentation (master plan)
├── blog-master.md          # Master orchestrator workflow
├── blog-research.md        # Research workflow
├── blog-outline.md         # Outline generator workflow
├── blog-writer.md          # Content drafting workflow
├── blog-validator.md       # Validation workflow
├── blog-writing-sop.md     # Existing SOP (optimization/publishing)
├── seo-guidelines.md       # Existing SEO reference
├── accessibility.md        # Existing accessibility reference
├── performance.md          # Existing performance reference
├── json-ld-schema.md       # Existing schema reference
├── code-standards.md       # Existing code standards
├── design-system.md        # Existing design system
└── website-principles.md   # Existing principles
```

---

## 🚧 Implementation Plan

### Phase 1: Core Workflows (Priority)
| Order | Workflow | Complexity | Est. Time |
|-------|----------|------------|-----------|
| 1 | `/blog-research` | Medium | First |
| 2 | `/blog-outline` | Medium | Second |
| 3 | `/blog-writer` | High | Third |
| 4 | `/blog-validator` | Medium | Fourth |
| 5 | `/blog-master` | Low | Last (ties everything together) |

### Phase 2: Testing
- Test each workflow individually
- Test full pipeline with sample topic
- Validate integration with existing workflows

### Phase 3: Refinement
- Gather feedback from usage
- Optimize prompts and processes
- Add additional checks as needed

---

## ✅ Success Metrics

A successfully implemented system will:

| Metric | Target |
|--------|--------|
| Time to publish | Reduced by 50%+ |
| SEO compliance | 100% on first validation |
| Content consistency | Identical quality standards across all posts |
| Error rate | Zero critical SEO errors |
| Google ranking | Top 10 for target keywords within 90 days |

---

## 🔧 Maintenance

### Regular Updates
- Review and update workflows quarterly
- Incorporate new SEO best practices
- Add new validation checks as Google updates guidelines

### Feedback Loop
- Track which validation checks fail most often
- Improve upstream workflows to prevent common issues
- Document edge cases and solutions

---

## ⚠️ Agent Instructions

When implementing or using this system:

1. **Always start with `/blog-master`** for new posts
2. **Never skip phases** - each builds on the previous
3. **Re-run validation** after any fixes
4. **Reference existing workflows** - don't duplicate SEO/accessibility rules
5. **Save all intermediate outputs** - enables debugging and iteration

---

*Document Version: 1.1*
*Created: 2026-01-07*
*Last Updated: 2026-01-07*

### Version History
- **v1.1** (2026-01-07): Added author name/ID clarification, series/seriesOrder fields, heroImage validation, tags validation, image optimization checks, phase mapping, and improved external link documentation.
- **v1.0** (2026-01-07): Initial workflow system creation.

