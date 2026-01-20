---
description: Content drafting workflow - transforms research and outline into a complete, high-quality blog post with proper frontmatter, E-E-A-T signals, and SEO optimization.
---

// turbo-all

# ✍️ Blog Writer Workflow

Transform the research brief and detailed outline into a complete, publication-ready blog post draft.

---

## 📋 Quick Reference

**Input:** 
- Research Brief: `blog-drafts/[post-slug]/01-research-brief.md`
- Outline: `blog-drafts/[post-slug]/02-outline.md`

**Output:** 
- Draft: `blog-drafts/[post-slug]/03-draft-v1.md`

**Duration:** ~15-25 minutes
**Previous Step:** `/blog-outline`
**Next Step:** `/blog-reviewer`

> **📚 Quick Reference:** `/blog-quality-checklist` | **Templates:** `/blog-templates`

---

## ⚠️ CRITICAL: Pre-Writing Requirements

### 1. Date and Information Currency

**Use the CURRENT DATE from the system context for all date-related content.**

- **pubDate:** Use today's date from system context (e.g., `2026-01-09`)
- **Year references:** Use current year (e.g., "in 2026", "as of 2026")
- **Statistics:** Only use data from Research Brief (already verified)

### 2. AI Model Versions (For AI/Tech Content)

**Trust the Research Brief.** The `/blog-research` phase already verified current AI model versions. Use the model information from the Research Brief—do NOT use outdated model names from memory.

---

## 🎯 Workflow Steps

### ⚡ INCREMENTAL GENERATION (Token Optimized)

**Generate section-by-section with minimal context, not all at once.**

**Pattern:**
1. Load only: Title, keyword, category
2. For each section: Load section goal → Generate → Save → Clear
3. Combine sections into final draft

**Context savings:** ~4,000 tokens (avoid loading full research + outline upfront)

---

### Step 1: Pre-Writing Setup

**Load minimal context:**
- [ ] Title + primary keyword  
- [ ] Category + slug
- [ ] Section headlines from outline (not full details)

**Read from files as needed during writing.**

---

### Step 2: Create Frontmatter

⚠️ **CRITICAL: Use the EXACT schema below. Incorrect field names will cause build failures.**

```yaml
---
title: "[50-60 chars, keyword near front]"
description: "[150-160 chars, benefit-focused with keyword]"
pubDate: YYYY-MM-DD                          # ⚠️ REQUIRED - Use 'pubDate', NOT 'date'
updatedDate: YYYY-MM-DD                      # Optional - Same date for new posts
category: "[see valid categories below]"     # ⚠️ REQUIRED - Singular, NOT 'categories'
keywords: ["keyword1", "keyword2", "keyword3"]
heroImage: "../../assets/images/[slug].webp"
author: "AI Agents Kit"                      # ⚠️ String, NOT array
readTime: 15                                 # Estimated reading time in minutes
tags: ["Tag 1", "Tag 2"]                     # Optional
difficulty: "[beginner|intermediate|advanced]"  # Optional
featured: false                              # Optional
series: null                                 # Optional: for multi-part tutorials
seriesOrder: null                            # Optional: order within series
---
```

#### ⛔ COMMON FRONTMATTER ERRORS (WILL BREAK BUILD)

| ❌ WRONG | ✅ CORRECT | Reason |
|----------|------------|--------|
| `date: 2026-01-11` | `pubDate: 2026-01-11` | Schema requires `pubDate` |
| `categories: ["ai-news"]` | `category: "ai-news"` | Schema requires singular `category` |
| `authors: ["Name"]` | `author: "AI Agents Kit"` | Schema requires string, not array |

#### Valid Categories (from `content.config.ts`)

```
ai-agents | ai-tools | ai-news | tutorials | chatgpt | prompt-engineering |
ai-comparisons | ai-careers | generative-ai | open-source-ai | ai-ethics |
ai-business | llms | ai-hardware | industry-ai | prompts | mcp | tools | code-snippets
```

> **See `/blog-quality-standards#9-seo-on-page-requirements`** for title and description requirements.

---

### Step 3: Write Introduction (200-300 words)

**Formula:** Hook → Problem → Promise (+ Credibility)  
**Must include:** Primary keyword (first 100 words), personal hook, paragraph text only (no H1/H2)

> **See:** `/blog-templates` for introduction examples

**Quick check:** 200-300 words, keyword present, sounds human

---

### Step 4: Write Main Sections

For each H2 section from outline:

1. **Section intro** (1-2 sentences) - Context
2. **Main content** - Explain, examples, data
3. **Takeaway** (1 sentence) - Summary

#### Writing Quality Rules

| Rule | Requirement |
|------|-------------|
| Active voice | 80%+ active |
| Paragraphs | 2-3 sentences max |
| Readability | 8th grade level |
| Specificity | Concrete details, not vague claims |

#### E-E-A-T Integration

> **See `/blog-quality-standards#5-e-e-a-t-signals`** for complete requirements.

| Signal | How to Demonstrate |
|--------|-------------------|
| Experience | Real examples, "When I implemented..." |
| Expertise | Technical depth, accurate terminology |
| Authoritativeness | Cite sources, official docs |
| Trustworthiness | Update dates, balanced perspective |

#### Formatting Best Practices

- **Bullet points** for lists of features, benefits
- **Numbered lists** for sequential steps
- **Tables** for comparisons
- **Code blocks** with syntax highlighting
- **Bold** for key terms (sparingly)
- **Blockquotes** for callouts

---

## 🎭 CRITICAL: Human Voice Guidelines

> **Quick Reference:** `/blog-quality-checklist#human-voice-scoring` | **Full Details:** `/blog-quality-standards`

**All content MUST sound 100% human-written.** This is non-negotiable.

### Quick Voice Checklist

While writing, ensure you include:

- [ ] **Personal opening** - Story or observation, NOT "In this guide..."
- [ ] **2-3 first-person experiences** - "I've seen...", "When I first..."
- [ ] **1-2 opinions** - Clear stances, "hot takes"
- [ ] **1 uncertainty admission** - "I'm not 100% sure...", "Even experts disagree..."
- [ ] **Contractions throughout** - don't, it's, they're, we've
- [ ] **1-2 humor moments** - Witty observations, self-deprecation
- [ ] **Sentence variety** - Mix short (5 words) and medium (15-20)
- [ ] **Conversational transitions** - "Here's the thing...", "That said..."

### Opening Sentence Test

**Read your first sentence aloud.** Would a human actually start a conversation this way?

| ❌ Fails | ✅ Passes |
|----------|----------|
| "Artificial intelligence is revolutionizing..." | "Last month, something made me stop and think." |
| "In today's rapidly evolving..." | "Here's a confession: I didn't get AI agents at first." |

### Banned Phrases (Zero Tolerance)

**DO NOT use these phrases anywhere:**

```
❌ "In this comprehensive guide..."
❌ "Whether you're a [X] or a [Y]..."
❌ "By the end of this article..."
❌ "It's important to note that..."
❌ "In today's rapidly evolving..."
❌ "In conclusion..."
```

### The "Read Aloud" Rule

**Every paragraph must sound natural when read aloud.** If it sounds like a textbook, press release, or corporate memo—rewrite it.

---

### Step 5: Write FAQ Section (300-500 words)

```markdown
## Frequently Asked Questions

### [Question from PAA]?

[Direct answer first. Then 1-2 sentences explanation. 50-100 words total.]

### [Question 2]?

[Answer...]
```

**Rules:**
- Start with the answer, not context
- Be concise (50-100 words per answer)
- Be definitive, not wishy-washy
- Include 5-7 questions

---

### Step 6: Write Conclusion (150-250 words)

**Formula:**
1. **Summary** - 2-3 key takeaways
2. **Reinforcement** - Restate value
3. **CTA** - Clear next step

**CTA Options:**
- Read related article (internal link)
- Subscribe to newsletter
- Try a tool/product
- Leave a comment

---

### Step 7: Add Internal Links (3-5 required)

> `/blog-quality-checklist#link-requirements` | Examples: `/blog-templates#link-formats`

**Format:**
```markdown
Learn more about [descriptive anchor text](/blog/related-post-slug).
```

**Rules:**
- Descriptive anchor text (never "click here")
- Natural placement in sentences
- Spread throughout article

---

### Step 8: Add External Links (2-3 required)

> `/blog-quality-checklist#link-requirements` | Examples: `/blog-templates#link-formats`

**Format:**
```markdown
According to [Gartner's 2026 AI Report](https://gartner.com/report), 75% of enterprises...
```

**Rules:**
- All external links: `target="_blank"` + `rel="noopener noreferrer"` (auto-handled by Astro for markdown links)
- Affiliate links: add `rel="sponsored"`
- Only authoritative sources

---

### Step 9: Final Polish

#### Content Checklist
- [ ] Content flows logically
- [ ] Smooth transitions between sections
- [ ] Consistent terminology and tone
- [ ] Every section adds value

#### Technical Checklist
- [ ] No H1 in body (H1 is title via frontmatter)
- [ ] Heading hierarchy: H2 → H3 → H4
- [ ] Code blocks have language specified
- [ ] Images have alt text

#### SEO Checklist
- [ ] Keyword in first 100 words
- [ ] Keyword in at least one H2
- [ ] 3-5 internal links
- [ ] 2-3 external authoritative links

#### Human Voice Final Check
- [ ] Zero banned phrases
- [ ] Personal anecdotes present
- [ ] Opinions expressed
- [ ] Passes "read aloud" test

---

## ⚡ Early Error Detection: Quick Checks

**Purpose:** Catch critical issues DURING writing, not after validation. This saves time by avoiding full re-writes later.

### Quick Check 0: After Frontmatter (Step 2) ⛔ MANDATORY
```
✓ Uses 'pubDate' (not 'date')?
✓ Uses 'category' as string (not 'categories' array)?
✓ Uses 'author' as string (not 'authors' array)?
✓ Date format is YYYY-MM-DD?
✓ Category is from valid list in content.config.ts?
```
⚠️ **Frontmatter errors break the build entirely. Always verify before continuing.**

### Quick Check 1: After Introduction (Step 3)
```
✓ Word count: 200-300 words?
✓ Primary keyword in first 100 words?
✓ Starts with personal hook (not "In this guide...")?
✓ No H1 or H2 tags used?
```

### Quick Check 2: After Each Major Section (Step 4)
```
✓ Section meets target word count from outline?
✓ At least 1 concrete example or data point?
✓ Smooth transition from previous section?
✓ No AI clichés ("Additionally", "Furthermore")?
```

### Quick Check 3: Mid-Draft (After ~2000 words)
```
✓ Running word count on track for 4,000+ minimum?
✓ At least 2 internal links added so far?
✓ At least 1 personal anecdote included?
✓ Heading hierarchy correct (H2 → H3 → H4)?
```

### Quick Check 4: Before Final Polish (End of Step 8)
```
✓ Total word count ≥ 4,000 words?
✓ 3-5 internal links present?
✓ 2-3 external links present?
✓ FAQ section has 5-7 questions?
✓ Conclusion has clear CTA with internal link?
```

**If any quick check fails:** Fix immediately before continuing. Don't wait for validation.

---

## 📄 Complete File Template

```markdown
---
title: "Your Title (50-60 chars)"
description: "Meta description (150-160 chars)"
pubDate: 2026-01-11
updatedDate: 2026-01-11
category: "ai-news"
keywords: ["primary keyword", "secondary keyword", "tertiary keyword"]
heroImage: "../../assets/images/your-post-slug.webp"
author: "AI Agents Kit"
readTime: 15
tags: ["Tag 1", "Tag 2"]
difficulty: "intermediate"
featured: false
---

[Introduction with PERSONAL hook, problem, promise - keyword in first 100 words]

## [H2: Section Title with Keyword]

[Content with examples, data, E-E-A-T signals...]

### [H3: Subsection if needed]

[More detailed content...]

## [H2: Another Section]

[Content...]

## Frequently Asked Questions

### [Question]?

[Concise answer...]

### [Question]?

[Concise answer...]

## Conclusion

[Summary, reinforcement, clear CTA with internal link...]
```

---

## ⚠️ Agent Instructions

1. **Follow the outline exactly** - Structure was carefully planned
2. **Write naturally** - Don't keyword stuff
3. **Include E-E-A-T signals** - Demonstrate expertise
4. **Format for scannability** - Short paragraphs, lists, headers
5. **Use human voice throughout** - Zero AI patterns
6. **Run quick checks** - Catch issues during writing, not after

### ⚡ Speed Optimization: Use Support Files

**Internal Link Index:**
```
blogpost-content-plan/internal-link-index.json
```
Use this for instant internal link lookup instead of scanning all posts.

**AI Model Cache:**
```
.agent/ai-models-current.json
```
If writing about AI models, reference this for accurate current versions.

**Input Location:**
```
blog-drafts/[post-slug]/01-research-brief.md
blog-drafts/[post-slug]/02-outline.md
```

**Output Location:** 
```
blog-drafts/[post-slug]/03-draft-v1.md     ← Save draft here ONLY
```

> **Note:** Do NOT save to `src/content/blog/` yet. The final file is copied there after validation passes.

**Next Step:** After saving draft, proceed to `/blog-reviewer`.

---

*Last updated: 2026-01-11*
*Optimized: Added critical frontmatter schema guidance, Quick Check 0 for schema validation, updated templates with correct field names*
