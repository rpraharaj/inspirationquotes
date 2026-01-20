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
**Duration:** ~15-30 minutes depending on topic complexity
**Next Step:** `/blog-outline`

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

**Required searches at start of research:**

```
"OpenAI GPT latest model [current month year]"
"Claude Anthropic latest model [current month year]"
"Google Gemini latest model [current month year]"
"[specific tool] what AI model does it use [year]"
```

**Information to capture in Research Brief:**

| Category | What to Capture |
|----------|-----------------|
| **Model Versions** | Current version numbers (e.g., GPT-5.2, Claude Opus 4.5) |
| **Release Dates** | When current versions were released |
| **Key Features** | New capabilities in latest versions |
| **Deprecated Models** | Which old versions are retired |
| **Context Windows** | Current context window sizes |
| **Pricing** | Current pricing tiers |

**Add a "Current AI Models" section to Research Brief:**

```markdown
## Current AI Models (as of [current date])

### OpenAI
- Latest: GPT-5.2 (Dec 2025), GPT-5.2-Codex
- ChatGPT uses: [current model]
- Context window: [current size]

### Anthropic
- Latest: Claude Opus 4.5, Claude Sonnet 4.5, Claude Haiku 4.5
- Context window: 200K (expandable to 1M)

### Google
- Latest: Gemini 2.0
- Available in: [platforms]

### Tool Integrations
- Jasper uses: [models]
- Writesonic uses: [models]
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

Search for: `"[topic] + site:ahrefs.com OR site:semrush.com OR site:moz.com"`

Gather:
- [ ] **Primary keyword** - Main phrase to target
- [ ] **Search volume** (if available) - Monthly searches
- [ ] **Keyword difficulty** (if available) - Competition level
- [ ] **CPC** (if available) - Commercial value indicator

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

**Goal:** Find credible data to support claims and boost E-E-A-T.

#### 7.1 Search for Statistics

Search: `"[topic] statistics 2025"` or `"[topic] research study"`

Gather:
- [ ] **Industry statistics** (market size, growth rates, adoption)
- [ ] **Research findings** (academic studies, surveys)
- [ ] **Case study results** (real company examples)
- [ ] **Expert quotes** (thought leaders, practitioners)

#### 7.2 Credibility Check

For each statistic, verify:
- [ ] Source is authoritative (not random blog)
- [ ] Data is recent (within last 2 years preferred)
- [ ] Statistic is directly relevant to topic
- [ ] Source link is working and citable

**Document format:**
```
Statistic: "[fact or figure]"
Source: [Organization/Publication]
Year: [YYYY]
URL: [link]
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

#### 9.1 Find Related Existing Content

Review existing blog posts at `src/content/blog/`:

- [ ] List 3-5 existing posts to link TO from this new post
- [ ] List 1-3 existing posts that should link TO this new post (update later)

**Document:**
```
Link TO (from new post):
1. [Post Title] - /blog/[slug] - Anchor text idea
2. ...

Link FROM (update after publishing):
1. [Post Title] - /blog/[slug] - Section to add link
2. ...
```

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

When executing this workflow:

1. **Use web search extensively** - This phase requires real-time data
2. **Be thorough** - Research quality determines content quality
3. **Document everything** - The Research Brief is the foundation for all subsequent phases
4. **Verify sources** - Only cite credible, authoritative sources
5. **Identify gaps** - The unique angle is critical for ranking

**Output Location:** 
```
blog-drafts/[post-slug]/01-research-brief.md
```

Example: `blog-drafts/claude-ai-code-review-guide/01-research-brief.md`

**Template:** Use `blog-drafts/_templates/research-brief-template.md` as starting point.

**Next Step:** After completing Research Brief, proceed to `/blog-outline`.

---

*Last updated: 2026-01-07*
