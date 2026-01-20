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
**Duration:** ~10-15 minutes
**Previous Step:** `/blog-research`
**Next Step:** `/blog-writer`

---

## 🎯 Workflow Steps

### Step 1: Review Research Brief

Before creating the outline, review and confirm:

- [ ] **Primary keyword** is clearly defined
- [ ] **Search intent** is understood
- [ ] **Target word count** is established
- [ ] **Content format** is determined (guide/tutorial/listicle/review)
- [ ] **Questions to answer** are listed
- [ ] **Unique angle** is defined

If any of these are missing, return to `/blog-research` to complete them.

---

### Step 2: Determine Optimal Content Structure

Based on research, select the best structure for this content:

#### 2.1 Structure Templates by Format

**📚 Comprehensive Guide**
```
Introduction (150-200 words)
├── H2: What is [Topic]? (200-300 words)
├── H2: Why [Topic] Matters (200-300 words)
├── H2: How [Topic] Works (300-400 words)
│   ├── H3: [Component 1]
│   ├── H3: [Component 2]
│   └── H3: [Component 3]
├── H2: [Main Value Section] (400-500 words)
│   ├── H3: [Subtopic 1]
│   ├── H3: [Subtopic 2]
│   └── H3: [Subtopic 3]
├── H2: Best Practices / Tips (300-400 words)
├── H2: Common Mistakes to Avoid (200-300 words)
├── H2: FAQ (200-300 words)
└── Conclusion (100-150 words)
```

**📝 How-To Tutorial**
```
Introduction (150-200 words)
├── H2: Prerequisites / What You'll Need (100-150 words)
├── H2: Step 1: [First Step] (200-300 words)
│   └── H3: [Sub-step if complex]
├── H2: Step 2: [Second Step] (200-300 words)
├── H2: Step 3: [Third Step] (200-300 words)
├── H2: Step 4: [Fourth Step] (200-300 words)
├── H2: Testing / Verification (150-200 words)
├── H2: Troubleshooting Common Issues (200-300 words)
├── H2: FAQ (200-300 words)
└── Conclusion (100-150 words)
```

**📋 Listicle (X Best/Top)**
```
Introduction (150-200 words)
├── H2: #1 [Item] (200-300 words)
│   ├── H3: Key Features
│   └── H3: Pros/Cons
├── H2: #2 [Item] (200-300 words)
├── H2: #3 [Item] (200-300 words)
├── H2: ... (continue for all items)
├── H2: How to Choose [Topic] (200-300 words)
├── H2: FAQ (200-300 words)
└── Conclusion (100-150 words)
```

**⚖️ Comparison / Vs Article**
```
Introduction (150-200 words)
├── H2: Quick Comparison Table (100-150 words)
├── H2: What is [Option A]? (200-300 words)
├── H2: What is [Option B]? (200-300 words)
├── H2: [Comparison Criteria 1] (200-300 words)
│   ├── H3: [Option A]
│   └── H3: [Option B]
├── H2: [Comparison Criteria 2] (200-300 words)
├── H2: [Comparison Criteria 3] (200-300 words)
├── H2: When to Use [Option A] vs [Option B] (150-200 words)
├── H2: FAQ (200-300 words)
└── Conclusion (100-150 words)
```

---

### Step 3: Create Heading Hierarchy

**Goal:** Design the H2/H3/H4 structure that will capture search traffic.

#### 3.1 Heading Rules

| Rule | Requirement |
|------|-------------|
| **H1** | Title only (set via frontmatter) - NEVER in content |
| **H2** | Major sections - should include primary keyword at least once |
| **H3** | Subsections under H2 - use for detailed breakdowns |
| **H4** | Rarely used - only for complex nested content |
| **Hierarchy** | Never skip levels (H2 → H4 is wrong, must be H2 → H3 → H4) |

#### 3.2 SEO-Optimized Heading Examples

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

#### 3.3 Featured Snippet Optimization

Structure one section specifically to capture Featured Snippets:

| Snippet Type | How to Structure |
|--------------|------------------|
| **Paragraph** | Clear definition in 40-60 words, right after H2 |
| **Numbered List** | Use ordered list immediately after H2 |
| **Bulleted List** | Use unordered list immediately after H2 |
| **Table** | Use markdown table immediately after H2 |

**Example for paragraph snippet:**
```markdown
## What Is an AI Customer Service Agent?

An AI customer service agent is an automated software system that uses artificial intelligence to handle customer inquiries, provide support, and resolve issues without human intervention. These agents use natural language processing (NLP) to understand customer questions and machine learning to improve responses over time.
```

---

### Step 4: Allocate Word Counts

**Goal:** Distribute minimum 4,000+ words across sections strategically.

> **Important:** Minimum 4,000 words required. No maximum cap - be as comprehensive as needed to fully cover the topic while keeping content valuable.

#### 4.1 Word Count Distribution Guide (for 4,000+ words)

| Section Type | Typical Range | Notes |
|--------------|---------------|-------|
| Introduction | 200-300 words | Hook, problem, promise, credibility |
| Definition/What is | 300-400 words | Thorough explanation, keywords |
| Main Value Sections | 400-600 words each | Deepest content, most value |
| How-To Steps | 300-400 words each | Practical, actionable, with examples |
| Best Practices/Tips | 300-500 words | Quick wins, expert advice |
| Mistakes to Avoid | 250-400 words | Common pitfalls with solutions |
| Advanced Topics | 400-600 words | Deep dives for comprehensive coverage |
| FAQ Section | 300-500 words | 5-7 questions from PAA |
| Conclusion | 150-250 words | Summary, reinforcement, CTA |

#### 4.2 Minimum Structure for 4,000+ Words

For comprehensive coverage, plan at minimum:
- Introduction: 250 words
- 4-5 main H2 sections: 400-500 words each
- FAQ section: 400 words (5+ questions)
- Conclusion: 200 words

**Total:** ~2,650+ words (exceeds minimum)

#### 4.3 Calculate Section Words

Target: **Minimum 4,000 words**

```
Introduction:           250 words
H2 Section 1:           450 words
  - H3 Subsection A:    200 words
  - H3 Subsection B:    200 words
H2 Section 2:           500 words
H2 Section 3:           450 words
H2 Section 4:           400 words
H2 Section 5:           350 words
FAQ (5-7 questions):    400 words
Conclusion:             200 words
─────────────────────────────────
TOTAL:                  3,000+ words ✓
```

---

### Step 4b: Plan Human Voice Elements

**CRITICAL:** Plan where authentic voice elements will appear throughout the content.

#### Human Voice Requirements Checklist

For every outline, you MUST plan:

| Element | Requirement | Planned Location |
|---------|-------------|------------------|
| **Opening hook** | Personal story or observation (NOT "In this guide...") | Introduction |
| **Personal experience #1** | "I've seen...", "When I first..." | Section 1 or 2 |
| **Personal experience #2** | Another first-person observation | Middle sections |
| **Opinion/hot take** | Clear stance or prediction | Any value section |
| **Admission of uncertainty** | "I'm not 100% sure...", "Take this with skepticism..." | Complex topic or Future section |
| **Light humor** | Witty observation or self-deprecation | Natural fit anywhere |

#### Voice Planning Template

Add to each outline:

```markdown
## Human Voice Plan

### Opening
- Hook type: [Personal story / Surprising observation / Rhetorical question]
- Specific idea: "[Brief description of the hook]"

### Personal Experiences to Include
1. Location: [Section] - Topic: "[What experience relates to this]"
2. Location: [Section] - Topic: "[Another experience]"

### Opinion/Hot Take
- Location: [Section]
- Take: "[The opinion to express]"

### Uncertainty Admission
- Location: [Section, likely complex/future topics]
- Phrasing: "[How to express uncertainty authentically]"

### Humor/Wit Opportunities
- Location: [Where natural humor could fit]
- Idea: "[Brief description]"
```

#### Things to AVOID Planning

❌ **Don't plan these phrases:**
- "In this comprehensive guide..."
- "Whether you're a [X] or a [Y]..."
- "By the end of this article..."
- "It's important to note that..."
- Perfectly parallel bullet structures everywhere

---

### Step 5: Plan Section Content

For each section, define:

1. **Goal** - What should the reader learn/do?
2. **Key Points** - 3-5 bullet points to cover
3. **Supporting Elements** - Code, examples, data, visuals
4. **Internal Links** - Which existing posts to link to
5. **Keyword Focus** - Which keywords to naturally include

#### 5.1 Section Planning Template

```markdown
### H2: [Section Title]

**Goal:** [What reader will learn or be able to do after this section]

**Word Count:** [target words]

**Key Points:**
1. [Main point 1]
2. [Main point 2]
3. [Main point 3]

**Supporting Elements:**
- [ ] Code example: [description]
- [ ] Statistic: [from research brief]
- [ ] Visual: [diagram/screenshot description]

**Internal Link:** [Post title to link to] → anchor: "[text]"

**Keywords to Include:** [list from research]
```

---

### Step 6: FAQ Section Planning

**Goal:** Answer questions from People Also Ask and research.

#### 6.1 Select FAQ Questions

From the Research Brief, select 3-5 questions:

- [ ] Question must be commonly asked (PAA, forums)
- [ ] Question adds value (not obvious from main content)
- [ ] Question is relevant to search intent
- [ ] Answer can be concise (50-100 words ideal)

#### 6.2 FAQ Format

```markdown
## Frequently Asked Questions

### [Question 1]?

[Concise answer in 50-100 words. Start with direct answer, then brief explanation.]

### [Question 2]?

[Concise answer...]

### [Question 3]?

[Concise answer...]
```

**Schema Note:** FAQ schema will be auto-generated by BlogPost layout if content follows this format.

---

### Step 7: Internal Linking Strategy

**Goal:** Map exactly where to place internal links.

#### 7.1 Link Placement Rules

| Rule | Requirement |
|------|-------------|
| Quantity | 3-5 internal links minimum |
| Placement | Within paragraph text, not standalone |
| Anchor Text | Descriptive, keyword-rich (never "click here") |
| Relevance | Link must add value for reader |
| Distribution | Spread throughout article, not clustered |

#### 7.2 Link Map

```markdown
| Location | Link To | Anchor Text |
|----------|---------|-------------|
| Introduction | /blog/[slug] | "[descriptive anchor]" |
| H2: [Section] | /blog/[slug] | "[descriptive anchor]" |
| H2: [Section] | /blog/[slug] | "[descriptive anchor]" |
| Conclusion | /blog/[slug] | "[descriptive anchor]" |
```

---

### Step 8: External Link Planning

**Goal:** Identify authoritative external sources to cite.

#### 8.1 External Link Requirements

- Minimum **2-3 external links** per post
- Links must go to **authoritative sources** (official docs, research, major publications)
- All external links must have `rel="noopener noreferrer"` and `target="_blank"`
- Use `rel="sponsored"` for affiliate links

#### 8.2 External Links to Include

From Research Brief statistics and sources:

| Context | Link To | Type |
|---------|---------|------|
| [When citing this data] | [URL] | Reference |
| [When mentioning this tool] | [URL] | Official docs |
| [When citing this study] | [URL] | Research |

---

### Step 9: Call-to-Action Planning

**Goal:** Define what action the reader should take.

#### 9.1 CTA Placement

| Location | CTA Type |
|----------|----------|
| End of Introduction | Soft CTA (continue reading promise) |
| Mid-article | Contextual CTA (related resource) |
| Conclusion | Primary CTA (main action) |

#### 9.2 CTA Options

- Subscribe to newsletter
- Try a tool/product
- Read related article
- Download a resource
- Leave a comment
- Share on social

---

## 📄 Detailed Outline Template

After completing all steps, produce this outline:

```markdown
# Content Outline: [Title]

**Based on Research Brief:** [Date]
**Target Word Count:** [X words]
**Estimated Read Time:** [X minutes]
**Content Format:** [Guide/Tutorial/Listicle/Comparison]

---

## Metadata Planning

| Field | Value |
|-------|-------|
| Title | [50-60 chars, keyword front-loaded] |
| Meta Description | [150-160 chars, includes keyword and CTA] |
| URL Slug | [short-descriptive-slug] |
| Category | [see categories.ts for valid options] |
| Tags | [tag1, tag2, tag3] |
| Difficulty | [beginner/intermediate/advanced] |
| Featured | [true/false] |

---

## Structure

### Introduction
**Words:** 150-200
**Goal:** Hook reader, establish credibility, preview value

**Key Elements:**
- Opening hook: [compelling stat/question/statement]
- Problem statement: [what challenge does reader face]
- Promise: [what they'll learn/achieve]
- Primary keyword: [include within first 100 words]

**CTA:** [soft - what they'll learn by reading]

---

### H2: [Section 1 Title - Include Primary Keyword]
**Words:** [target]
**Goal:** [what reader learns]

**Key Points:**
1. [Point 1]
2. [Point 2]
3. [Point 3]

**Supporting:**
- [Code block/example/visual if needed]
- [Statistic: "..." - Source]

**Internal Link:** → [/blog/slug] anchor: "[text]"

**Keywords:** [secondary keywords to include]

---

### H2: [Section 2 Title]
**Words:** [target]
**Goal:** [what reader learns]

#### H3: [Subsection 2.1]
**Words:** [target]
**Key Points:**
1. [Point]
2. [Point]

#### H3: [Subsection 2.2]
**Words:** [target]
**Key Points:**
1. [Point]
2. [Point]

**Internal Link:** → [/blog/slug] anchor: "[text]"

---

### H2: [Section 3 Title]
**Words:** [target]
**Goal:** [what reader learns]

[Continue pattern for all sections...]

---

### H2: Frequently Asked Questions
**Words:** 200-300
**Goal:** Capture PAA traffic, provide quick answers

**Questions:**
1. **[Question from PAA]?**
   Answer focus: [key point in 50-100 words]

2. **[Question from PAA]?**
   Answer focus: [key point in 50-100 words]

3. **[Question from research]?**
   Answer focus: [key point in 50-100 words]

---

### Conclusion
**Words:** 100-150
**Goal:** Summarize, reinforce value, drive action

**Key Elements:**
- Summarize 2-3 key takeaways
- Reinforce primary keyword
- Clear CTA: [specific action]

**Internal Link:** → [/blog/slug] anchor: "[related resource]"

---

## Link Map Summary

### Internal Links (3-5 required)
| Section | Anchor Text | Target URL |
|---------|-------------|------------|
| [Section] | [anchor] | /blog/[slug] |
| [Section] | [anchor] | /blog/[slug] |
| [Section] | [anchor] | /blog/[slug] |

### External Links (2-3 required)
| Context | URL | Type |
|---------|-----|------|
| [context] | [URL] | [reference/docs/research] |
| [context] | [URL] | [reference/docs/research] |

---

## Featured Snippet Target

**Target Section:** H2: [section title]
**Snippet Type:** [paragraph/list/table]
**Optimization:**
[Specific instructions for how to structure the content to capture the snippet]

---

## Word Count Summary

| Section | Target Words |
|---------|--------------|
| Introduction | [X] |
| H2: [Section 1] | [X] |
| H2: [Section 2] | [X] |
| H2: [Section 3] | [X] |
| H2: FAQ | [X] |
| Conclusion | [X] |
| **TOTAL** | **[X]** |

---

*Outline complete. Ready for `/blog-writer` phase.*
```

---

## ⚠️ Agent Instructions

When executing this workflow:

1. **Always reference Research Brief** - The outline must align with research findings
2. **Include primary keyword in at least one H2** - Critical for SEO
3. **Never skip heading levels** - H2 → H3 → H4 only
4. **Plan for Featured Snippets** - Structure at least one section to capture them
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

**Template:** Use `blog-drafts/_templates/outline-template.md` as starting point.

**Next Step:** After completing Detailed Outline, proceed to `/blog-writer`.

---

*Last updated: 2026-01-07*
