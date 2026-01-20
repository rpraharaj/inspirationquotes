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
- Final: `src/content/blog/[slug].md`

**Previous Step:** `/blog-outline`
**Next Step:** `/blog-reviewer`

### ⚠️ CRITICAL: Date and Information Currency

**Use the CURRENT DATE from the system context for all date-related content.**

- **pubDate:** Use today's date from system context (e.g., `2026-01-07`)
- **Year references:** Use current year (e.g., "in 2026", "as of 2026")
- **Statistics:** Only use data from current year or previous year
- **Product info:** Reference current versions and features only
- **Predictions:** Frame appropriately for the current date

**The system provides the current date in the format:** `YYYY-MM-DDTHH:MM:SS+TZ`
Extract the date portion (YYYY-MM-DD) for pubDate.

---

## 🎯 Workflow Steps

### Step 1: Pre-Writing Setup

Verify you have:
- [ ] Research Brief with keywords and unique angle
- [ ] Detailed Outline with structure and word counts
- [ ] File slug determined (URL-friendly, includes primary keyword)

**File location:** `src/content/blog/[primary-keyword-slug].md`

---

### Step 2: Create Frontmatter

```yaml
---
title: "[50-60 chars, keyword near front]"
description: "[150-160 chars, benefit-focused with keyword]"
pubDate: YYYY-MM-DD
updatedDate: null
heroImage: "/blog-placeholder-2.jpg"
category: "[see categories.ts for valid options]"
tags: ["Tag 1", "Tag 2", "Tag 3"]
author: "Vibe Coder"
difficulty: "[beginner|intermediate|advanced]"
featured: false
series: null  # Optional: for multi-part tutorials
seriesOrder: null  # Optional: order within series (1, 2, 3...)
---
```

#### Field Requirements

| Field | Requirement |
|-------|-------------|
| **title** | 50-60 chars, keyword front-loaded |
| **description** | 150-160 chars, includes CTA |
| **category** | Must be valid category from categories.ts |
| **author** | Name ("Vibe Coder") or ID ("default") - must match authors.ts |
| **series** | Optional - use for multi-part tutorials |
| **seriesOrder** | Optional - order within series (1, 2, 3...) |

> **Note:** Author can be specified by name ("Vibe Coder", "Guest Author", "Alex Chen") or by ID ("default", "guest", "tech-lead"). Both are valid.

---

### Step 3: Write Introduction (150-200 words)

**Formula:**
1. **Hook** - Compelling stat, question, or bold statement
2. **Problem** - What challenge does reader face
3. **Promise** - What they'll learn by reading
4. **Credibility** - Why you're qualified (optional)

**Requirements:**
- [ ] Primary keyword in first 100 words
- [ ] No H1 or H2 (just paragraph text)
- [ ] Grabs attention immediately

### ⚠️ AI Model Version Verification (For AI/Tech Content)

**When writing about AI tools, models, or platforms, ALWAYS verify current model versions:**

This is CRITICAL because AI model versions change rapidly (often monthly).

**Before drafting any AI-related content:**

1. **Search for latest model releases:**
   ```
   "[tool name] latest model [current month year]"
   "GPT latest version January 2026"
   "Claude latest model 2026"
   "Gemini latest release 2026"
   ```

2. **Key models to verify:**
   | Provider | Search Query | Common Updates |
   |----------|--------------|----------------|
   | **OpenAI** | "OpenAI GPT latest model [month year]" | GPT-5.x versions, ChatGPT features |
   | **Anthropic** | "Claude latest model [month year]" | Claude Opus/Sonnet/Haiku versions |
   | **Google** | "Gemini latest model [month year]" | Gemini 2.x versions, integrations |
   | **Meta** | "Llama latest model [month year]" | Llama 3.x versions |

3. **What to verify:**
   - Current model version numbers (e.g., GPT-5.2, Claude Opus 4.5)
   - New features released in the past month
   - Deprecated/retired model versions
   - Pricing changes
   - Context window sizes

**DO NOT use older model names like GPT-4, Claude 3, etc. unless specifically discussing historical context.**

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

#### E-E-A-T Signals

| Signal | How to Demonstrate |
|--------|-------------------|
| Experience | Real examples, "When I implemented..." |
| Expertise | Technical depth, accurate terminology |
| Authoritativeness | Cite sources, official docs |
| Trustworthiness | Update dates, balanced perspective |

#### Formatting

- **Bullet points** for lists of features, benefits
- **Numbered lists** for sequential steps
- **Tables** for comparisons
- **Code blocks** with syntax highlighting
- **Bold** for key terms
- **Blockquotes** for callouts

---

## 🎭 CRITICAL: Human Voice Guidelines

**All content MUST sound 100% human-written.** AI-sounding content fails to connect with readers and undermines trust. Follow these rules strictly:

### Voice & Tone Requirements

| Aspect | Requirement | Example |
|--------|-------------|---------|
| **Tone** | Professional but warm | Like explaining to a smart colleague |
| **Perspective** | Generic first-person | "I've seen...", "In my experience..." |
| **Style** | Conversational, not academic | Write like you talk (but polished) |

### ❌ AI-Sounding Patterns to AVOID

| Pattern | Why It's Bad | Better Alternative |
|---------|--------------|-------------------|
| "In this comprehensive guide..." | Formulaic, overused | "Let's dig into..." or just start |
| "Whether you're a [X] or a [Y]..." | AI cliché | Be specific about who this is for |
| "By the end of this article..." | Obvious, unnecessary | Let the value be self-evident |
| "It's important to note that..." | Filler phrase | Just state the thing |
| "significantly," "incredibly," "transforming" | Vague intensifiers | Use specific, concrete language |
| "In conclusion..." | AI tells, humans show | Just write the conclusion |

### ✅ Human Voice Techniques

#### 1. Start with a Story or Observation
```markdown
❌ "AI agents are transforming how businesses operate."

✅ "Last week, I watched an AI agent handle something that would've taken me an hour."
```

#### 2. Add Personal Experience (Generic First-Person)
```markdown
❌ "Organizations often struggle with implementation."

✅ "I've seen companies burn through budgets trying to do everything at once."
```

#### 3. Express Opinions & Hot Takes
```markdown
❌ "There are advantages and disadvantages to consider."

✅ "Honestly? This is the biggest shift I've seen since smartphones."
```

#### 4. Use Contractions
```markdown
❌ "It is essential to consider that they do not require..."

✅ "Here's the thing—they don't need hand-holding."
```

#### 5. Vary Sentence Length Dramatically
```markdown
❌ "AI agents can complete complex tasks. They reduce operational costs. They improve consistency."

✅ "AI agents handle tedium well. Really well. The multi-step, cross-system stuff that makes humans want to quit? They're built for it."
```

#### 6. Include Uncertainty & Nuance
```markdown
❌ "The future will see increased adoption of specialized agents."

✅ "Where this goes? Honestly, even the experts are guessing. But my bet is on specialized agents."
```

#### 7. Add Humor (Sparingly)
```markdown
❌ "AI agents operate continuously without breaks."

✅ "They don't call in sick, never ask for a raise, and won't eat your lunch from the office fridge."
```

#### 8. Use Conversational Transitions
```markdown
❌ "Additionally," "Furthermore," "Moreover,"

✅ "Here's the thing..." / "That said..." / "But wait—" / "Anyway..." / "Now,"
```

### Voice Checklist (REQUIRED)

Before completing any draft, verify:

- [ ] **Personal anecdotes**: At least 2-3 first-person experiences
- [ ] **Opinions expressed**: At least 1-2 clear opinions or "hot takes"
- [ ] **Contractions used**: Consistently throughout (don't → don't, it's → it's)
- [ ] **Sentence variety**: Mix of short (5 words) and medium (15-20 words) sentences
- [ ] **No AI clichés**: Zero instances of phrases from the "AVOID" list above
- [ ] **Conversational transitions**: Used instead of "Additionally," "Furthermore," etc.
- [ ] **Admission of uncertainty**: At least one "I don't know for sure" moment
- [ ] **Light humor**: 1-2 moments of wit or self-deprecation
- [ ] **Questions asked naturally**: Rhetorical questions that feel genuine

### Opening Sentence Test

**Read your first sentence aloud.** Would a human actually start a conversation this way?

| ❌ Fails Test | ✅ Passes Test |
|---------------|----------------|
| "Artificial intelligence is revolutionizing..." | "Last month, something made me stop and think." |
| "In today's rapidly evolving..." | "Here's a confession: I didn't get AI agents at first." |
| "This comprehensive guide will..." | "Let's talk about something that's changing everything." |

### The "Read Aloud" Rule

**Every paragraph must sound natural when read aloud.** If it sounds like a textbook, a press release, or a corporate memo—rewrite it.

---

### Step 5: Write FAQ Section (200-300 words)

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

---

### Step 6: Write Conclusion (100-150 words)

**Formula:**
1. **Summary** - 2-3 key takeaways
2. **Reinforcement** - Restate value
3. **CTA** - Clear next step

**CTA Options:**
- Read related article
- Subscribe to newsletter
- Try a tool/product
- Leave a comment

---

### Step 7: Add Internal Links (3-5 required)

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

**Format Options:**

*Option 1: Markdown (simpler, attributes auto-handled)*
```markdown
According to [Gartner's 2024 AI Report](https://gartner.com/report), 75% of enterprises...
```

*Option 2: HTML (explicit control over attributes)*
```markdown
According to <a href="https://gartner.com/report" target="_blank" rel="noopener noreferrer">Gartner's 2024 AI Report</a>, 75% of enterprises...
```

> **Note:** Both formats work. Markdown links are cleaner; use HTML when you need explicit `rel` attributes (e.g., for sponsored links).

**Rules:**
- All external links: `target="_blank"` + `rel="noopener noreferrer"`
- Affiliate links: add `rel="sponsored"`
- Only authoritative sources

---

### Step 9: Final Polish

#### Read-Through Checklist
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

---

## 📄 Complete File Template

```markdown
---
title: "Your Title (50-60 chars)"
description: "Meta description (150-160 chars)"
pubDate: 2026-01-07
updatedDate: null
heroImage: "/blog-placeholder-2.jpg"
category: "ai-news"
tags: ["Tag 1", "Tag 2"]
author: "Vibe Coder"
difficulty: "intermediate"
featured: false
---

[Introduction with hook, problem, promise - keyword in first 100 words]

## [H2: Section Title with Keyword]

[Content with examples, data, E-E-A-T signals...]

### [H3: Subsection if needed]

[More detailed content...]

## [H2: Another Section]

[Content...]

## Frequently Asked Questions

### [Question]?

[Concise answer...]

## Conclusion

[Summary, reinforcement, clear CTA...]
```

---

## ⚠️ Agent Instructions

1. **Follow the outline exactly** - Structure was carefully planned
2. **Write naturally** - Don't keyword stuff
3. **Include E-E-A-T signals** - Demonstrate expertise
4. **Format for scannability** - Short paragraphs, lists, headers
5. **Verify all links work** - Test before saving

**Input Location:**
```
blog-drafts/[post-slug]/01-research-brief.md
blog-drafts/[post-slug]/02-outline.md
```

**Output Location:** 
```
blog-drafts/[post-slug]/03-draft-v1.md     ← Working draft
src/content/blog/[slug].md                 ← Final publishable file
```

> **Note:** Save a copy to blog-drafts for reference, then save the final version to src/content/blog.

**Next Step:** After saving draft, proceed to `/blog-validator`.

---

*Last updated: 2026-01-07*
