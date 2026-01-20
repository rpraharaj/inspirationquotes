---
description: Content outline generator workflow - transforms research into SEO-optimized content structure with heading hierarchy, word count allocation, and internal linking strategy.
---

// turbo-all

# 📐 Blog Outline Workflow

Transform research findings into a detailed, SEO-optimized content structure that guides the writing phase.

---

## 📋 Quick Reference

**Input:** Research Brief from `blog-drafts/[post-slug]/01-research-brief.md`
**Output:** Outline saved to `blog-drafts/[post-slug]/02-outline.md`
**Duration:** ~5-10 minutes
**Previous Step:** `/blog-research`
**Next Step:** `/blog-writer`

> **📚 Standards Reference:** See `/blog-quality-standards` for heading structure, SEO requirements, and word count guidelines.

---

## 🎯 Workflow Steps

### Step 1: Review Research Brief

Before creating the outline, verify the Research Brief contains:

- [ ] **Primary keyword** - clearly defined
- [ ] **Search intent** - understood
- [ ] **Target word count** - established (minimum 4,000 words)
- [ ] **Content format** - determined (guide/tutorial/listicle/review)
- [ ] **Questions to answer** - listed
- [ ] **Unique angle** - defined

If any are missing, return to `/blog-research` to complete them.

---

### Step 2: Determine Optimal Content Structure

Based on research, select the best structure for this content:

#### Structure Templates by Format

**📚 Comprehensive Guide**
```
Introduction (200-300 words)
├── H2: What is [Topic]? (300-400 words)
├── H2: Why [Topic] Matters (300-400 words)
├── H2: How [Topic] Works (400-500 words)
│   ├── H3: [Component 1]
│   ├── H3: [Component 2]
│   └── H3: [Component 3]
├── H2: [Main Value Section] (500-600 words)
│   ├── H3: [Subtopic 1]
│   ├── H3: [Subtopic 2]
│   └── H3: [Subtopic 3]
├── H2: Best Practices / Tips (400-500 words)
├── H2: Common Mistakes to Avoid (300-400 words)
├── H2: FAQ (300-500 words)
└── Conclusion (150-250 words)
```

**📝 How-To Tutorial**
```
Introduction (200-300 words)
├── H2: Prerequisites / What You'll Need (150-200 words)
├── H2: Step 1: [First Step] (300-400 words)
│   └── H3: [Sub-step if complex]
├── H2: Step 2: [Second Step] (300-400 words)
├── H2: Step 3: [Third Step] (300-400 words)
├── H2: Step 4: [Fourth Step] (300-400 words)
├── H2: Testing / Verification (200-300 words)
├── H2: Troubleshooting Common Issues (300-400 words)
├── H2: FAQ (300-500 words)
└── Conclusion (150-200 words)
```

**📋 Listicle (X Best/Top)**
```
Introduction (200-300 words)
├── H2: #1 [Item] (300-400 words)
│   ├── H3: Key Features
│   └── H3: Pros/Cons
├── H2: #2 [Item] (300-400 words)
├── H2: #3 [Item] (300-400 words)
├── H2: ... (continue for all items)
├── H2: How to Choose [Topic] (300-400 words)
├── H2: FAQ (300-500 words)
└── Conclusion (150-200 words)
```

**⚖️ Comparison / Vs Article**
```
Introduction (200-300 words)
├── H2: Quick Comparison Table (150-200 words)
├── H2: What is [Option A]? (300-400 words)
├── H2: What is [Option B]? (300-400 words)
├── H2: [Comparison Criteria 1] (300-400 words)
│   ├── H3: [Option A]
│   └── H3: [Option B]
├── H2: [Comparison Criteria 2] (300-400 words)
├── H2: [Comparison Criteria 3] (300-400 words)
├── H2: When to Use [Option A] vs [Option B] (200-300 words)
├── H2: FAQ (300-500 words)
└── Conclusion (150-200 words)
```

---

### Step 3: Create Heading Hierarchy

**Goal:** Design the H2/H3/H4 structure that captures search traffic.

> **See `/blog-quality-standards#10-heading-structure-rules`** for complete heading rules.

#### SEO-Optimized Heading Examples

**Primary Keyword:** "AI customer service agent"

| ❌ Generic Heading | ✅ SEO-Optimized Heading |
|-------------------|-------------------------|
| Introduction | (No H2 for intro - it's implied) |
| Overview | What Is an AI Customer Service Agent? |
| Benefits | 7 Benefits of AI Customer Service Agents |
| How It Works | How AI Customer Service Agents Work |
| Getting Started | How to Build Your First AI Customer Service Agent |
| Tips | Best Practices for AI Customer Service Agent Implementation |
| FAQ | AI Customer Service Agent FAQ |

#### Featured Snippet Optimization

Structure one section to capture Featured Snippets:

| Snippet Type | How to Structure |
|--------------|------------------|
| **Paragraph** | Clear definition in 40-60 words, right after H2 |
| **Numbered List** | Use ordered list immediately after H2 |
| **Bulleted List** | Use unordered list immediately after H2 |
| **Table** | Use markdown table immediately after H2 |

---

### Step 4: Allocate Word Counts

**Target: Minimum 4,000 words** (see `/blog-quality-standards#8-word-count-requirements`)

#### Minimum Structure for 4,000+ Words

| Section Type | Word Range |
|--------------|------------|
| Introduction | 200-300 words |
| Definition/What is | 300-400 words |
| Main Value Sections | 400-600 words each |
| How-To Steps | 300-400 words each |
| Best Practices/Tips | 400-500 words |
| Mistakes to Avoid | 300-400 words |
| FAQ Section | 300-500 words (5-7 questions) |
| Conclusion | 150-250 words |

#### Calculate Section Words

```
Example for 4,000+ word article:

Introduction:           250 words
H2 Section 1:           450 words
  - H3 Subsection A:    200 words
  - H3 Subsection B:    200 words
H2 Section 2:           500 words
H2 Section 3:           500 words
H2 Section 4:           450 words
H2 Section 5:           400 words
FAQ (5-7 questions):    450 words
Conclusion:             200 words
─────────────────────────────────
TOTAL:                  ~4,100 words ✓
```

---

### Step 5: Plan Section Content

For each section, define:

1. **Goal** - What should the reader learn/do?
2. **Key Points** - 3-5 bullet points to cover
3. **Supporting Elements** - Code, examples, data, visuals
4. **Internal Links** - Which existing posts to link to
5. **Keyword Focus** - Which keywords to naturally include

#### Section Planning Template

```markdown
### H2: [Section Title]

**Goal:** [What reader will learn]
**Words:** [target words]

**Key Points:**
1. [Main point 1]
2. [Main point 2]
3. [Main point 3]

**Supporting:**
- [ ] Code example: [description]
- [ ] Statistic: [from research brief]

**Internal Link:** [Post title] → anchor: "[text]"
**Keywords:** [list from research]
```

---

### Step 6: FAQ Section Planning

**Goal:** Answer questions from People Also Ask and research.

#### Select 5-7 FAQ Questions

From the Research Brief, select questions that:
- Are commonly asked (PAA, forums)
- Add value (not obvious from main content)
- Are relevant to search intent
- Can be answered concisely (50-100 words)

#### FAQ Format

```markdown
## Frequently Asked Questions

### [Question 1]?

[Concise answer in 50-100 words. Direct answer first, then brief explanation.]

### [Question 2]?

[Concise answer...]
```

---

### Step 7: Internal Link Mapping

> **See `/blog-quality-standards#6-internal-linking-requirements`** for complete rules.

**Minimum:** 3-5 internal links, spread throughout article.

```markdown
| Section | Link To | Anchor Text |
|---------|---------|-------------|
| Introduction | /blog/[slug] | "[descriptive anchor]" |
| H2: [Section] | /blog/[slug] | "[descriptive anchor]" |
| Conclusion | /blog/[slug] | "[descriptive anchor]" |
```

---

### Step 8: External Link Planning

> **See `/blog-quality-standards#7-external-linking-requirements`** for complete rules.

**Minimum:** 2-3 external links to authoritative sources.

From Research Brief statistics and sources:

| Context | URL | Type |
|---------|-----|------|
| [When citing this data] | [URL] | Reference |
| [When mentioning this tool] | [URL] | Official docs |

---

## 📄 Detailed Outline Template

After completing all steps, produce:

```markdown
# Content Outline: [Title]

**Based on Research Brief:** [Date]
**Target Word Count:** [X words] (minimum 4,000)
**Content Format:** [Guide/Tutorial/Listicle/Comparison]

---

## Metadata Planning

| Field | Value |
|-------|-------|
| Title | [50-60 chars, keyword front-loaded] |
| Meta Description | [150-160 chars, includes keyword and CTA] |
| URL Slug | [short-descriptive-slug] |
| Category | [from categories.ts] |
| Tags | [tag1, tag2, tag3] |
| Difficulty | [beginner/intermediate/advanced] |

---

## Structure

### Introduction
**Words:** 200-300
**Goal:** Hook reader, establish credibility, preview value
**Primary keyword in first 100 words:** ✓

---

### H2: [Section 1 Title - Include Primary Keyword]
**Words:** [target]
**Goal:** [what reader learns]

**Key Points:**
1. [Point 1]
2. [Point 2]
3. [Point 3]

**Internal Link:** → [/blog/slug] anchor: "[text]"

---

### H2: [Section 2 Title]
**Words:** [target]
**Goal:** [what reader learns]

#### H3: [Subsection 2.1]
**Words:** [target]

#### H3: [Subsection 2.2]
**Words:** [target]

---

[Continue pattern for all sections...]

---

### H2: Frequently Asked Questions
**Words:** 300-500
**Goal:** Capture PAA traffic

**Questions:**
1. [Question from PAA]?
2. [Question from PAA]?
3. [Question from research]?
4. [Question from research]?
5. [Question from research]?

---

### Conclusion
**Words:** 150-250
**Goal:** Summarize, reinforce value, drive action
**CTA:** [specific action]

---

## Link Map Summary

### Internal Links (3-5 required)
| Section | Anchor Text | Target URL |
|---------|-------------|------------|
| [Section] | [anchor] | /blog/[slug] |

### External Links (2-3 required)
| Context | URL | Type |
|---------|-----|------|
| [context] | [URL] | [reference/docs] |

---

## Featured Snippet Target

**Target Section:** H2: [section title]
**Snippet Type:** [paragraph/list/table]

---

## Word Count Summary

| Section | Target Words |
|---------|--------------|
| Introduction | [X] |
| H2: [Section 1] | [X] |
| H2: [Section 2] | [X] |
| H2: FAQ | [X] |
| Conclusion | [X] |
| **TOTAL** | **[X]** |

---

*Outline complete. Ready for `/blog-writer` phase.*
```

---

## ⚠️ Agent Instructions

When executing this workflow:

1. **Always reference Research Brief** - Outline must align with research
2. **Include primary keyword in at least one H2** - Critical for SEO
3. **Never skip heading levels** - H2 → H3 → H4 only
4. **Plan for Featured Snippets** - Structure at least one section
5. **Map all links before writing** - Makes writing phase smoother
6. **Be specific in section goals** - Vague goals lead to vague content

**Input Location:**
```
blog-drafts/[post-slug]/01-research-brief.md
```

**Output Location:** 
```
blog-drafts/[post-slug]/02-outline.md
```

**Next Step:** After completing Detailed Outline, proceed to `/blog-writer`.

---

*Last updated: 2026-01-09*
*Optimized: Removed duplicate human voice planning (now in /blog-writer only)*
