---
description: Quality gate workflow - comprehensive validation of blog posts against SEO, accessibility, performance, and content quality standards before publishing.
---

// turbo-all

# ✅ Blog Validator Workflow

Comprehensive quality assurance that validates blog posts against all standards before publishing.

---

## 📋 Quick Reference

**Input:** 
- Reviewed draft: `src/content/blog/[slug].md`
- Research Brief: `blog-drafts/[post-slug]/01-research-brief.md` (for reference)

**Output:** Validation Report saved to `blog-drafts/[post-slug]/06-validation-report.md`
**Previous Step:** `/blog-reviewer`
**Next Step:** If PASS → `/blog-writing-sop` (Phase 4: Publishing)

### ⚠️ Critical Validation Areas

1. **SEO** - Title, description, keywords
2. **Content Quality** - Word count, readability, links
3. **Human Voice** - Anecdotes, opinions, tone (score ≥10/12)
4. **Information Currency** - All data from current/previous year
5. **Accessibility** - Alt text, headings, link text
6. **Technical** - Frontmatter, categories, formatting

---

## 🎯 Validation Process

### Step 1: Load and Parse Draft

1. Read the draft file from `src/content/blog/[slug].md`
2. Parse frontmatter (YAML)
3. Parse content (Markdown)
4. Count words, headings, links

---

### Step 2: SEO Validation

Reference: `/seo-guidelines`

| Check | Requirement | Severity |
|-------|-------------|----------|
| **Title Length** | 50-60 characters | 🔴 Critical |
| **Title Keyword** | Primary keyword present | 🔴 Critical |
| **Meta Description Length** | 150-160 characters | 🔴 Critical |
| **Meta Description Keyword** | Primary keyword present | 🟡 Medium |
| **URL Slug** | Short, includes keyword, hyphens only | 🟡 Medium |
| **H1 Count** | Exactly 1 (via frontmatter title) | 🔴 Critical |
| **No H1 in Body** | Content has no # headings | 🔴 Critical |
| **H2 Keyword** | Primary keyword in at least 1 H2 | 🟡 Medium |
| **Keyword in Intro** | Keyword in first 100 words | 🟡 Medium |
| **Keyword Density** | 1-2% (not stuffed) | 🟡 Medium |

#### Validation Logic

```
Title Length:
  - chars < 50: WARN "Too short, may not maximize SERP visibility"
  - chars > 60: FAIL "Will be truncated in search results"
  - 50-60: PASS

Meta Description:
  - chars < 150: WARN "Could include more compelling content"
  - chars > 160: FAIL "Will be truncated in search results"
  - 150-160: PASS

H1 in Body:
  - Regex: /^# [^#]/m found: FAIL "Remove H1 from body, use frontmatter title"
  - Not found: PASS
```

---

### Step 3: Content Quality Validation

Reference: `/blog-writing-sop`

| Check | Requirement | Severity |
|-------|-------------|----------|
| **Word Count** | Minimum 4,000 words (no max) | 🔴 Critical |
| **Readability** | 8th grade level or below | 🟢 Low |
| **Internal Links** | 3-5 contextual links | 🟡 Medium |
| **External Links** | 2-3 authoritative sources | 🟡 Medium |
| **Heading Hierarchy** | H2 → H3 → H4, no skips | 🔴 Critical |
| **FAQ Section** | Present with Q&A format | 🟢 Low |
| **Tags** | 2-5 tags, no duplicates | 🟢 Low |

#### Word Count Logic

```
Word Count Validation:
  - >= 4,000 words: PASS
  - 3,500-3,999 words: WARN "Close to minimum, consider expanding"
  - < 3,500 words: FAIL "Content too thin. Minimum 4,000 words required."

No maximum cap - comprehensive content is encouraged as long as:
  - Content remains valuable and not padded
  - Each section serves a purpose
  - Follows Google's helpful content guidelines
```

#### Heading Hierarchy Check

```
Valid:
  ## Section → ### Subsection → #### Detail

Invalid:
  ## Section → #### Detail (skipped H3) ❌
  # Title (H1 in body) ❌
```

---

### Step 3b: Human Voice Validation

**CRITICAL:** Content must sound 100% human-written. AI-sounding content fails validation.

| Check | Requirement | Severity |
|-------|-------------|----------|
| **No AI Clichés** | Zero instances of patterns from avoid list | 🔴 Critical |
| **Personal Anecdotes** | At least 2-3 first-person experiences | 🔴 Critical |
| **Contractions Used** | Consistent use (don't, it's, we're) | 🟡 Medium |
| **Opinions Expressed** | At least 1-2 clear opinions or hot takes | 🔴 Critical |
| **Sentence Variety** | Mix of short and medium sentences | 🟡 Medium |
| **Conversational Transitions** | No "Additionally," "Furthermore," "Moreover" | 🟡 Medium |

#### AI Pattern Detection

Scan content for these AI-sounding patterns and FAIL if found:

```
CRITICAL - Must have ZERO instances:
- "In this comprehensive guide..."
- "Whether you're a [X] or a [Y]..."
- "It's important to note that..."
- "In conclusion..."
- "In today's rapidly evolving..."
- "This article will explore..."

WARNING - Minimize or rephrase:
- "significantly" (unless with data)
- "incredibly" (vague intensifier)
- "transforming" without specifics
- "Additionally,"
- "Furthermore,"
- "Moreover,"
```

#### Human Voice Scoring

| Score | Criteria | Result |
|-------|----------|--------|
| 5/5 | All checks pass, reads naturally | ✅ PASS |
| 3-4/5 | Minor issues, mostly natural | ⚠️ WARN |
| 0-2/5 | Sounds AI-generated | ❌ FAIL |

#### Required Elements Checklist

- [ ] Opens with story, observation, or hook (not "In this article...")
- [ ] Contains 2-3 first-person experiences ("I've seen...", "In my experience...")
- [ ] Expresses 1-2 opinions or "hot takes"
- [ ] Uses contractions consistently
- [ ] Includes moment of uncertainty ("I'm not sure...", "Honestly, even experts...")
- [ ] Has 1-2 moments of light humor or wit
- [ ] Would pass the "read aloud" test

---

### Step 3c: Information Currency Validation

**CRITICAL:** All information must be current. Outdated content fails validation.

| Check | Requirement | Severity |
|-------|-------------|----------|
| **pubDate** | Matches current date from system context | 🔴 Critical |
| **Statistics** | From current year or previous year | 🔴 Critical |
| **Product References** | Current versions, not deprecated | 🔴 Critical |
| **External Links** | To maintained, current resources | 🟡 Medium |
| **Year References** | Use current year (e.g., "in 2026") | 🟡 Medium |

#### Currency Checks

```
For AI/Tech topics:
- Statistics must be from current or previous year
- Product features must reference current versions
- Reject sources >1 year old

For other topics:
- Statistics should be <2-3 years old
- Historical context is fine if labeled as such
```

#### Date Verification

```
Current date: [Extracted from system context]
pubDate in frontmatter: Must match current date

If year references in content:
- "in 2024" → FAIL (outdated)
- "in 2026" → PASS (current)
- "as of 2026" → PASS (current)
```

#### AI Model Version Validation (For AI/Tech Content)

**CRITICAL for AI-related content:** Verify all AI model references are current.

| Check | Requirement | Severity |
|-------|-------------|----------|
| **Model Names** | Use current version names (not deprecated) | 🔴 Critical |
| **Version Numbers** | Match latest released versions | 🔴 Critical |
| **Context Windows** | Reflect current capabilities | 🟡 Medium |
| **Feature References** | Describe current features, not old ones | 🟡 Medium |

**Outdated Model Names to Flag (as of January 2026):**

```
FAIL if found (without historical context):
- GPT-4, GPT-4o, GPT-4-turbo → Should be GPT-5.x
- Claude 3, Claude 3.5 → Should be Claude Opus/Sonnet/Haiku 4.x
- Gemini 1.x → Should be Gemini 2.x
- "Claude's 100K context window" → Now 200K (expandable to 1M)
```

**Validation Process:**

```
1. SCAN content for AI model/tool mentions
2. LIST all model version references found
3. SEARCH for latest versions:
   "[model name] latest version [current month year]"
4. COMPARE and FLAG any outdated references
5. FAIL if outdated model names found without historical context
```

**Example Validation:**

| Found in Content | Current Version | Status |
|------------------|-----------------|--------|
| "GPT-4o" | GPT-5.2 | ❌ FAIL - Update required |
| "Claude Opus 4.5" | Claude Opus 4.5 | ✅ PASS |
| "Gemini 2.0" | Gemini 2.0 | ✅ PASS |

---

### Step 4: Accessibility Validation

Reference: `/accessibility`

| Check | Requirement | Severity |
|-------|-------------|----------|
| **Image Alt Text** | All images have descriptive alt | 🔴 Critical |
| **Link Text** | No "click here", descriptive anchors | 🟡 Medium |
| **Heading Structure** | Logical hierarchy | 🔴 Critical |

#### Alt Text Check

```markdown
Valid:
![AI agent architecture diagram](/images/agent-arch.webp)

Invalid:
![](/images/agent-arch.webp) ❌ (empty alt)
![image](/images/agent-arch.webp) ❌ (non-descriptive)
```

---

### Step 5: Technical Validation

| Check | Requirement | Severity |
|-------|-------------|----------|
| **Frontmatter Complete** | All required fields present | 🔴 Critical |
| **Category Valid** | Must be a valid category from categories.ts | 🔴 Critical |
| **Author Valid** | Matches name or ID in authors.ts | 🔴 Critical |
| **Date Format** | ISO format (YYYY-MM-DD) | 🔴 Critical |
| **heroImage Valid** | Path exists and file is accessible | 🟡 Medium |
| **Links Work** | No 404s on internal/external links | 🟡 Medium |
| **Images Exist** | All referenced images exist | 🔴 Critical |
| **Images Optimized** | WebP format, under 100KB | 🟡 Medium |

#### Required Frontmatter Fields

```yaml
title: required
description: required
pubDate: required
category: required
author: required
```

#### Valid Categories

**Primary Categories (from content plan):**
- `ai-agents` - Autonomous AI, agent architectures, multi-agent systems
- `ai-tools` - Reviews and guides for AI tools
- `ai-news` - Breaking news, model releases, industry updates
- `tutorials` - Step-by-step guides, hands-on projects
- `chatgpt` - Everything ChatGPT - prompts, tips, updates
- `prompt-engineering` - Prompting techniques, templates, optimization
- `ai-comparisons` - Head-to-head comparisons of AI tools/models
- `ai-careers` - Jobs, skills, certifications, career transitions
- `generative-ai` - AI image, video, audio generation
- `open-source-ai` - Open models, Hugging Face, Ollama, local LLMs
- `ai-ethics` - Responsible AI, bias, alignment, regulations
- `ai-business` - Enterprise AI, ROI, implementation strategies
- `llms` - Language models, architectures, technical concepts
- `ai-hardware` - GPUs, TPUs, AI PCs, edge computing
- `industry-ai` - AI applications in specific industries

**Legacy Categories:**
- `prompts` - Curated prompts collection
- `mcp` - Model Context Protocol
- `tools` - General AI tools
- `code-snippets` - Quick code examples

#### Valid Authors

Author can be specified by **name** or **ID**:

| ID | Name |
|----|------|
| `default` | Vibe Coder |
| `guest` | Guest Author |
| `tech-lead` | Alex Chen |

#### Image Optimization Check

```
For each image (heroImage and inline images):
  - Format is WebP: PASS / WARN "Convert to WebP for better performance"
  - File size < 100KB: PASS / WARN "Compress image to under 100KB"
  - Dimensions specified (width/height): PASS / WARN "Add dimensions to prevent CLS"
```

---

### Step 6: Link Validation

| Check | Requirement | Severity |
|-------|-------------|----------|
| **Internal Link Count** | 3-5 links | 🟡 Medium |
| **External Link Count** | 2-3 links | 🟡 Medium |
| **External Link Attributes** | `target="_blank"` + `rel="noopener noreferrer"` | 🟡 Medium |
| **Anchor Text Quality** | Descriptive, not "click here" | 🟡 Medium |
| **No Broken Links** | All links resolve | 🔴 Critical |

---

### Step 7: Generate Validation Report

After all checks, compile the report:

```markdown
# Blog Validation Report

**File:** `src/content/blog/[slug].md`
**Validated:** YYYY-MM-DD HH:MM
**Status:** ✅ PASS / ❌ FAIL

---

## Summary

| Category | Passed | Failed | Warnings |
|----------|--------|--------|----------|
| SEO | X | X | X |
| Content | X | X | X |
| Accessibility | X | X | X |
| Technical | X | X | X |
| Links | X | X | X |
| **TOTAL** | **X** | **X** | **X** |

---

## ✅ Passed Checks

| Category | Check | Value |
|----------|-------|-------|
| SEO | Title Length | 54 chars ✅ |
| SEO | Meta Description | 155 chars ✅ |
| ... | ... | ... |

---

## ❌ Failed Checks

| Category | Check | Issue | Severity | Fix |
|----------|-------|-------|----------|-----|
| SEO | H2 Keyword | Missing primary keyword | 🟡 Medium | Add keyword to H2 heading |
| Accessibility | Image Alt | Empty alt on hero image | 🔴 Critical | Add descriptive alt text |
| ... | ... | ... | ... | ... |

---

## ⚠️ Warnings

| Category | Check | Issue | Recommendation |
|----------|-------|-------|----------------|
| Content | Word Count | 3,800 words (minimum: 4,000) | Expand content to meet minimum |
| ... | ... | ... | ... |

---

## 🔧 Required Actions

1. **[CRITICAL]** Add alt text to hero image
2. **[MEDIUM]** Add primary keyword to at least one H2
3. **[MEDIUM]** Add 2 more internal links (current: 1, required: 3-5)

---

## Next Steps

- [ ] Fix all CRITICAL issues
- [ ] Address MEDIUM issues if possible
- [ ] Re-run `/blog-validator` after fixes
- [ ] If PASS: Proceed to `/blog-writing-sop` Phase 4 (Publishing)
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
2. User/agent fixes the issues
3. Re-run `/blog-validator`
4. Repeat until PASS

### After PASS

Proceed to `/blog-writing-sop` Phase 4 (Publishing):
- Pre-publish checks
- Build and preview
- Deploy
- Submit to Google Search Console

---

## 📊 Validation Checklist Summary

### SEO (10 checks)
- [ ] Title: 50-60 characters
- [ ] Title: Contains primary keyword
- [ ] Description: 150-160 characters
- [ ] Description: Contains keyword
- [ ] Slug: Short, keyword-included
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

### Accessibility (3 checks)
- [ ] All images have descriptive alt text
- [ ] Link text is descriptive
- [ ] Heading structure is logical

### Technical (9 checks)
- [ ] Frontmatter complete
- [ ] Category is valid
- [ ] Author is valid (name or ID)
- [ ] Date format correct (YYYY-MM-DD)
- [ ] heroImage path valid and exists
- [ ] All links work
- [ ] All images exist
- [ ] Images are WebP format
- [ ] Images under 100KB

---

## ⚠️ Agent Instructions

When executing this workflow:

1. **Be thorough** - Check every item, don't skip
2. **Be specific** - Give exact fixes, not vague suggestions
3. **Prioritize** - Critical issues first
4. **Reference workflows** - Link to `/seo-guidelines`, `/accessibility` for details
5. **Re-validate** - After fixes, run full validation again

**Input Location:**
```
src/content/blog/[slug].md                      ← File to validate
blog-drafts/[post-slug]/01-research-brief.md    ← Reference for word count target
```

**Output Location:** 
```
blog-drafts/[post-slug]/04-validation-report.md
```

**PASS → Next Step:** `/blog-writing-sop` Phase 4 (Publishing)
**FAIL → Action:** Fix issues and re-run `/blog-validator`

---

*Last updated: 2026-01-07*
