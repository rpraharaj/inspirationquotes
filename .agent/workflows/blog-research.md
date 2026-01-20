---
description: Deep-dive topic research workflow - comprehensive keyword analysis, SERP research, competitor review, and content gap identification for blog posts.
---

// turbo-all

# 🔍 Blog Research Workflow

Comprehensive research phase that forms the foundation for high-quality, SEO-optimized blog content.

---

## 📋 Quick Reference

**Input:** Topic or keyword from user
**Output:** Research Brief saved to `blog-drafts/[post-slug]/01-research-brief.md`
**Duration:** ~10-20 minutes (optimized with parallel execution)
**Next Step:** `/blog-outline`

### ⚡ Speed Optimization: Parallel Execution

This workflow uses **parallel research execution** to reduce time without sacrificing quality.

**Tasks that CAN run in parallel:**

| Parallel Group 1 | Parallel Group 2 | Parallel Group 3 |
|------------------|------------------|------------------|
| Keyword Research | SERP Analysis | AI Model Lookup |
| Secondary Keywords | Competitor Review | Question Mining |

**Tasks that MUST run sequentially:**
- Step 1 (Topic Validation) → Must complete first
- Step 8 (Unique Angle) → Requires all prior research
- Step 9 (Internal Linking) → After topic is clear

**Agent guidance:** Fire off parallel searches simultaneously, then synthesize results.

### ⚠️ CRITICAL: Information Currency

**ALL research must use the CURRENT DATE as the reference point.**

- The current date is provided in the system context (e.g., `2026-01-07`)
- All statistics, data, and facts MUST be from the most recent sources available
- When searching, prioritize results from the current year and previous year
- Explicitly reject outdated information (>2 years old for fast-moving topics like AI)
- Include "2025" or "2026" in search queries to get latest results
- Always verify the publication date of sources

**Search Query Tips for Latest Info:**
```
"[topic] 2026" OR "[topic] 2025"
"[topic] latest" OR "[topic] current"
"[topic] statistics 2025"
```

### 🤖 AI Model Version Research (For AI/Tech Topics)

**When researching AI tools, platforms, or technology, ALWAYS gather current model information:**

This section is MANDATORY for any content involving AI tools, LLMs, or AI platforms.

#### ⚡ SPEED OPTIMIZATION: Use AI Model Cache First

**Before searching, check the AI Model Cache:**
```
.agent/ai-models-current.json
```

This cache contains pre-verified current model versions, updated weekly. Use this as your starting point:

1. **Read the cache file** for baseline model information
2. **Check `lastUpdated` date** - if within 7 days, trust the cache
3. **Only search if:** cache is stale OR topic involves a specific tool not in cache

**Cache includes:**
- OpenAI: GPT-5, GPT-5-Turbo, DALL-E 3, Sora
- Anthropic: Claude 4 Opus/Sonnet/Haiku, context windows, pricing
- Google: Gemini 3 family, Imagen 3, Veo 2
- Meta: Llama 4 family, open source options
- Outdated references to flag (GPT-4 → GPT-5, Claude 3 → Claude 4, etc.)

**If cache is stale or topic requires verification, search:**

```
"OpenAI GPT latest model [current month year]"
"Claude Anthropic latest model [current month year]"
"Google Gemini latest model [current month year]"
"[specific tool] what AI model does it use [year]"
```

**Information to capture in Research Brief:**

| Category | What to Capture |
|----------|-----------------|
| **Model Versions** | Current version numbers (e.g., GPT-5, Claude 4 Opus) |
| **Release Dates** | When current versions were released |
| **Key Features** | New capabilities in latest versions |
| **Deprecated Models** | Which old versions are retired |
| **Context Windows** | Current context window sizes |
| **Pricing** | Current pricing tiers |

**Add a "Current AI Models" section to Research Brief:**

```markdown
## Current AI Models (as of [current date])

> Source: .agent/ai-models-current.json (verified [date])

### OpenAI
- Latest: GPT-5, GPT-5-Turbo
- ChatGPT uses: GPT-5
- Context window: 128K tokens

### Anthropic
- Latest: Claude 4 (Opus, Sonnet, Haiku)
- Context window: 200K (expandable to 1M)

### Google
- Latest: Gemini 3 (Ultra, Pro, Flash)
- Available in: Google AI Studio, Vertex AI

### Meta
- Latest: Llama 4 (open source)
- Available: Hugging Face, Ollama, local deployment
```

---

## 🎯 Workflow Steps

### Step 1: Validate and Clarify Topic

Before starting research, ensure the topic is:

- [ ] **Specific enough** to target (not too broad)
- [ ] **Aligned with site categories** (see `src/config/categories.ts` for valid options)
- [ ] **Has search potential** (people are actually searching for this)

**If topic is too broad**, ask user to narrow down. Example:
- ❌ Too broad: "AI"
- ✅ Better: "AI agents for customer service automation"
- ✅ Best: "How to build an AI customer service agent with Claude"

---

### Step 2: Primary Keyword Research

**Goal:** Identify the ONE primary keyword to optimize for.

#### 2.1 Web Search for Keyword Data

**🎯 Optimized Query (Focused Results):**
```
"[topic] keyword volume difficulty" site:ahrefs.com OR site:semrush.com
```

**Search optimization tips:**
- Include specific terms: "volume", "difficulty", "CPC"
- Limit to 2-3 authoritative sites (not 5+)
- Request concise answers when possible

**Gather (prioritize quality over quantity):**
- [ ] Primary keyword + monthly volume
- [ ] Keyword difficulty (if available)
- [ ] 2-3 secondary keywords maximum

#### 2.2 Keyword Selection Criteria

Choose a primary keyword that:
| Criterion | Ideal |
|-----------|-------|
| Length | 2-5 words (long-tail preferred) |
| Intent | Clear search intent |
| Competition | Low to medium (for new sites) |
| Relevance | Directly matches content topic |

**Example Primary Keywords:**
- "AI customer service agent" ✅
- "how to build AI chatbot" ✅
- "AI" ❌ (too broad)
- "artificial intelligence machine learning deep learning neural networks" ❌ (too long)

---

### Step 3: Secondary & LSI Keyword Research

**Goal:** Identify supporting keywords to naturally incorporate.

#### 3.1 Generate Related Keywords

Search for: `"[primary keyword] related searches"` or use Google autocomplete.

Gather 5-10 secondary keywords:
- [ ] Long-tail variations of primary keyword
- [ ] Related questions (how, what, why, when)
- [ ] Industry-specific terms
- [ ] Synonyms and alternate phrasings

#### 3.2 LSI (Latent Semantic Indexing) Keywords

These are semantically related terms that Google expects to see. Search for top-ranking content and note commonly used terms.

**Example for "AI customer service agent":**
- Primary: AI customer service agent
- Secondary: chatbot for customer support, automated customer service, AI help desk
- LSI: natural language processing, response time, customer satisfaction, ticketing system

---

### Step 4: Search Intent Analysis

**Goal:** Understand WHY people are searching for this keyword.

#### 4.1 Classify Search Intent

| Intent Type | User Goal | Content Format |
|-------------|-----------|----------------|
| **Informational** | Learn something | Guide, tutorial, explainer |
| **Navigational** | Find specific page/brand | Brand-focused, comparison |
| **Transactional** | Buy/take action | Product pages, pricing |
| **Commercial** | Research before buying | Reviews, comparisons, "best of" |

#### 4.2 SERP Analysis for Intent

Search the primary keyword and analyze top 10 results:

- [ ] What content TYPE is ranking? (blog, product page, video)
- [ ] What content FORMAT is ranking? (listicle, guide, tutorial, review)
- [ ] Are there Featured Snippets? What format? (paragraph, list, table)
- [ ] Is there a Knowledge Panel?
- [ ] What's in "People Also Ask"?

**Document the intent:**
```
Intent: [Informational/Navigational/Transactional/Commercial]
Dominant Format: [Guide/Listicle/Tutorial/Review/Comparison]
Featured Snippet: [Yes/No] - [Type if yes]
```

---

### Step 5: Competitor Content Analysis

**Goal:** Understand what's already ranking and identify gaps.

#### 5.1 Analyze Top 5 Ranking Articles

For each of the top 5 organic results, document:

| # | Title | URL | Word Count | Format | Unique Strength | Gap/Weakness |
|---|-------|-----|------------|--------|-----------------|--------------|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

#### 5.2 Content Gap Analysis

Identify what competitors are missing:
- [ ] **Outdated information** - Can you provide more current data?
- [ ] **Missing depth** - Can you cover subtopics they skip?
- [ ] **No practical examples** - Can you add real-world applications?
- [ ] **Poor formatting** - Can you make content more scannable?
- [ ] **Missing visuals** - Can you add diagrams, screenshots?
- [ ] **No expert insights** - Can you add authoritative perspective?

---

### Step 6: Question Mining

**Goal:** Gather questions real users are asking about this topic.

#### 6.1 Sources to Mine

Search and document questions from:

1. **Google "People Also Ask"**
   - Search primary keyword
   - Expand PAA boxes
   - Document 5-10 relevant questions

2. **Google Autocomplete**
   - Type primary keyword + "how", "what", "why", "when", "is", "can"
   - Note suggestions

3. **AnswerThePublic / AlsoAsked** (if available)
   - Generate question map

4. **Reddit / Quora / Forums**
   - Search: `site:reddit.com "[topic]"`
   - Look for highly upvoted questions
   - Note common pain points

#### 6.2 Prioritize Questions

Select 5-8 questions to answer in the content:

| Question | Source | Priority | Section Fit |
|----------|--------|----------|-------------|
| [Question 1] | PAA | High | FAQ |
| [Question 2] | Reddit | Medium | Main content |
| ... | ... | ... | ... |

---

### Step 7: Data & Statistics Gathering

**Goal:** Find 3-5 high-quality statistics (not exhaustive research)

#### 7.1 Focused Statistics Search

**🎯 Optimized Query:**
```
"[topic] statistics 2025 Gartner|McKinsey|Forrester" -blog -reddit
```

**Search optimization:**
- Include authoritative source names (Gartner, McKinsey, etc.)
- Exclude low-quality sources with `-blog -reddit`
- Target 3-5 statistics, not 15+
- Prioritize official reports and primary sources

**Quick credibility check:**
- Source = authoritative? Data = recent (<2 years)? ✅ Use it
- Unknown blog post? ❌ Skip

**Compact format:**
```
"[Stat]" - [Source], [Year], [URL]
```

---

### Step 8: Define Unique Angle

**Goal:** Determine how YOUR content will be different and better.

#### 8.1 Differentiation Options

Consider how to differentiate:

| Angle Type | Description | Example |
|------------|-------------|---------|
| **Experience-based** | Share personal/real implementation | "How we built..." |
| **More comprehensive** | Cover more aspects than competitors | Ultimate guide |
| **More practical** | Step-by-step with code/examples | Hands-on tutorial |
| **More current** | Latest developments, 2025 updates | State of [topic] in 2025 |
| **Unique perspective** | Different take or framework | Contrarian view |
| **Specific audience** | Tailored to specific use case | For startups, for enterprise |

#### 8.2 Document Your Angle

```
Unique Angle: [One sentence describing differentiation]
Why This Works: [Why this angle will resonate with searchers]
E-E-A-T Signal: [How this demonstrates Experience/Expertise/Authority/Trust]
```

---

### Step 9: Internal Linking Opportunities

**Goal:** Identify existing content to link TO and FROM.

#### ⚡ SPEED OPTIMIZATION: Use Internal Link Index

**Use the pre-built Internal Link Index for instant lookup:**
```
blogpost-content-plan/internal-link-index.json
```

The index provides:
- **byCategory**: All posts organized by category with suggested anchor texts
- **byKeyword**: Posts mapped to common keywords
- **topAnchorSuggestions**: Ready-to-use anchors by difficulty level

#### 9.1 Find Related Existing Content

1. **Check the index first** - Look up your topic category and keywords
2. **Select 3-5 posts** to link TO from the new post (use suggested anchors)
3. **Note 1-3 posts** that should link TO this new post after publishing

**If topic isn't well-covered in index**, review `src/content/blog/` directly.

**Document:**
```
Link TO (from new post):
1. [Post Title] - /blog/[slug] - Anchor: "[from index or custom]"
2. ...

Link FROM (update after publishing):
1. [Post Title] - /blog/[slug] - Section to add link
2. ...
```

> **After publishing:** Remember to update the index with the new post!

---

## 📄 Research Brief Template

After completing all steps, compile into this format:

```markdown
# Research Brief: [Topic Title]

**Created:** YYYY-MM-DD
**Primary Keyword:** [keyword]
**Search Intent:** [intent type]
**Target Audience:** [who is this for]

---

## 1. Keyword Strategy

### Primary Keyword
- **Keyword:** [primary keyword]
- **Search Intent:** [informational/navigational/transactional/commercial]
- **Estimated Volume:** [if known]
- **Difficulty:** [low/medium/high]

### Secondary Keywords
1. [keyword 1]
2. [keyword 2]
3. [keyword 3]
4. [keyword 4]
5. [keyword 5]

### LSI Keywords
[comma-separated list of semantic terms]

---

## 2. Content Specifications

| Spec | Target |
|------|--------|
| Word Count | Minimum 4,000 words (no maximum - be comprehensive) |
| Format | [Guide/Tutorial/Listicle/Review] |
| Reading Level | 8th grade or below |
| Estimated Read Time | [X minutes] |

---

## 3. SERP Analysis

### Top Competing Content

| Rank | Title | Word Count | Format | Key Strength | Gap |
|------|-------|------------|--------|--------------|-----|
| 1 | [Title] | [count] | [format] | [strength] | [gap] |
| 2 | [Title] | [count] | [format] | [strength] | [gap] |
| 3 | [Title] | [count] | [format] | [strength] | [gap] |
| 4 | [Title] | [count] | [format] | [strength] | [gap] |
| 5 | [Title] | [count] | [format] | [strength] | [gap] |

### Featured Snippet Opportunity
- **Exists:** [Yes/No]
- **Current Format:** [paragraph/list/table]
- **Target Format:** [how we'll capture it]

---

## 4. Questions to Answer

### From People Also Ask
1. [Question 1]
2. [Question 2]
3. [Question 3]

### From Forums/Reddit
1. [Question 1]
2. [Question 2]

### Key Topic Questions
1. [What/How/Why question 1]
2. [What/How/Why question 2]

---

## 5. Data & Statistics

| Statistic | Source | Year |
|-----------|--------|------|
| [Fact/figure] | [Source] | [YYYY] |
| [Fact/figure] | [Source] | [YYYY] |
| [Fact/figure] | [Source] | [YYYY] |

---

## 6. Unique Angle & Voice Strategy

### 6.1 Content Differentiation

**Differentiation:** [One sentence describing how this content will be unique]

**Key Value Proposition:** [What reader will get that they can't get elsewhere]

### 6.2 Human Voice Strategy (CRITICAL)

**Voice Tone:** Professional but warm, conversational
**Perspective:** Generic first-person ("I've seen...", "In my experience...")

#### Personal Experience Opportunities

Identify moments to include authentic first-person experiences:

| Topic Area | Potential Experience to Share |
|------------|------------------------------|
| [Main topic] | [Personal observation or story] |
| [Challenge area] | [Time when this was difficult/surprising] |
| [Future/predictions] | [What you've learned or gotten wrong before] |

#### Opinion/Hot Take Opportunities

| Topic | Potential Opinion |
|-------|-------------------|
| [Debatable aspect] | [Strong but defensible stance] |
| [Industry trend] | [Prediction or critique] |

#### Uncertainty to Acknowledge

- [Complex topic where even experts disagree]
- [Area where you're still learning/unsure]

### 6.3 E-E-A-T Demonstration

| E-E-A-T Signal | How We'll Demonstrate |
|----------------|----------------------|
| **Experience** | Personal stories, first-person observations |
| **Expertise** | Technical accuracy, depth of coverage |
| **Authoritativeness** | Citing official sources, linking to docs |
| **Trustworthiness** | Balanced perspective, admitting limitations |

---

## 7. Internal Linking Strategy

### Link TO (from this post)
1. [Existing Post Title] → Anchor: "[anchor text]"
2. [Existing Post Title] → Anchor: "[anchor text]"
3. [Existing Post Title] → Anchor: "[anchor text]"

### Link FROM (update later)
1. [Existing Post Title] → Add link in section: [section name]

---

## 8. Content Requirements Checklist

- [ ] Cover all PAA questions
- [ ] Include at least 2 statistics with sources
- [ ] Demonstrate E-E-A-T via [specific method]
- [ ] Target featured snippet with [paragraph/list/table] format
- [ ] Include [specific element competitors are missing]

---

*Research completed. Ready for `/blog-outline` phase.*
```

---

## ⚠️ Agent Instructions

> **📚 Quick Reference:** `/blog-quality-checklist` (compact rules) | **Full Details:** `/blog-quality-standards`

When executing this workflow:

1. **Use web search extensively** - This phase requires real-time data
2. **Be thorough** - Research quality determines content quality
3. **Document everything** - The Research Brief is the foundation for all subsequent phases
4. **Verify sources** - Only cite credible, authoritative sources
5. **Identify gaps** - The unique angle is critical for ranking
6. **AI Model Versions** - For AI/tech content, check `.agent/ai-models-current.json` first, then verify if needed
7. **Internal Links** - Check `blogpost-content-plan/internal-link-index.json` for fast lookup
8. **Execute in parallel** - Fire off keyword, SERP, and question mining searches simultaneously

### ⚡ Speed Optimization Checklist

- [ ] Read AI model cache before searching (for AI topics)
- [ ] Check internal link index before reviewing all posts
- [ ] Run keyword + SERP + question mining in parallel
- [ ] Use cache data as baseline, search only to verify/update

**Support Files:**
```
.agent/ai-models-current.json          ← AI model versions cache
blogpost-content-plan/internal-link-index.json  ← Internal linking lookup
```

**Output Location:** 
```
blog-drafts/[post-slug]/01-research-brief.md
```

Example: `blog-drafts/claude-ai-code-review-guide/01-research-brief.md`

**Next Step:** After completing Research Brief, proceed to `/blog-outline`.

---

*Last updated: 2026-01-10*
*Optimized: Added parallel execution, AI model cache, internal link index references*
*Note: This workflow is the PRIMARY source for AI model version verification. /blog-writer trusts the Research Brief; /blog-validator does a final check.*
