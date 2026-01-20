---
description: Google-SEO-compliant blog writing SOP - a repeatable framework covering research, writing, optimization, publishing, and updating phases.
---

# 📝 Blog Writing SOP (Standard Operating Procedure)

A comprehensive, repeatable framework for creating Google-SEO-compliant blog posts that rank, engage, and convert.

---

## 📋 Quick Reference Checklist

Before publishing ANY blog post, ensure you've completed ALL phases:

- [ ] **Phase 1**: Research Complete
- [ ] **Phase 2**: Writing Complete
- [ ] **Phase 3**: Optimization Complete
- [ ] **Phase 4**: Publishing Complete
- [ ] **Phase 5**: Update Plan Scheduled

### ⚠️ Critical Requirements

- [ ] **Human Voice**: Content sounds 100% human-written (score ≥10/12)
- [ ] **Information Currency**: All data from current year or previous year
- [ ] **Word Count**: Minimum 4,000 words

---

## Phase 1: Research 🔍

### 1.1 Keyword Research

- [ ] **Primary Keyword**: Identify ONE main keyword to target
- [ ] **Search Intent**: Determine intent (informational, navigational, transactional, commercial)
- [ ] **Keyword Metrics**: Check volume, difficulty, and CPC
- [ ] **Long-tail Variations**: Identify 3-5 related long-tail keywords
- [ ] **LSI Keywords**: List semantically related terms to naturally include

### 1.2 Competitor Analysis

- [ ] **SERP Analysis**: Review top 10 results for primary keyword
- [ ] **Content Gap Analysis**: Identify what competitors miss
- [ ] **Content Type**: Note the format ranking (listicles, guides, tutorials, etc.)
- [ ] **Word Count Range**: Determine optimal length based on ranking content
- [ ] **Featured Snippets**: Identify if snippets exist and their format

### 1.3 Topic Research

- [ ] **User Questions**: Gather questions from "People Also Ask", forums, Reddit
- [ ] **Expert Sources**: Identify authoritative sources to reference
- [ ] **Data/Statistics**: Find recent, credible data to support claims
- [ ] **Unique Angle**: Define your differentiated perspective or value

### Research Phase Deliverables

```
📁 Research Notes
├── Primary keyword: [keyword]
├── Search intent: [intent type]
├── Secondary keywords: [list]
├── Target word count: Minimum 4,000 words (no max)
├── Content format: [format type]
├── Key questions to answer: [list]
└── Unique angle: [description]
```

---

## Phase 2: Writing ✍️

### 2.1 Content Structure

- [ ] **Outline First**: Create detailed H2/H3 outline before writing
- [ ] **Hook Introduction**: First 100 words must grab attention and state value
- [ ] **Logical Flow**: Sections flow naturally from one to the next
- [ ] **Scannable Format**: Use short paragraphs (2-3 sentences max)

### 2.2 Heading Structure

- [ ] **H1 (Title)**: Set via frontmatter `title` field only
- [ ] **No H1 in Body**: Content starts with H2 headings
- [ ] **Heading Hierarchy**: H2 → H3 → H4 (never skip levels)
- [ ] **Keyword in H2**: Primary keyword appears in at least one H2
- [ ] **Descriptive Headings**: Headings clearly describe section content

### 2.3 Content Quality

- [ ] **E-E-A-T Signals**: Demonstrate Experience, Expertise, Authoritativeness, Trustworthiness
- [ ] **Original Insights**: Include unique perspectives, not just rehashed content
- [ ] **Actionable Content**: Provide clear steps, tips, or takeaways
- [ ] **Readability**: Write at 8th-grade reading level or below
- [ ] **Active Voice**: Use active voice predominantly (80%+)

### 2.4 Formatting Best Practices

- [ ] **Bullet Points/Lists**: Break up long sections with lists
- [ ] **Bold Key Terms**: Highlight important concepts sparingly
- [ ] **Code Blocks**: Use proper syntax highlighting for code
- [ ] **Tables**: Use tables for comparisons or structured data
- [ ] **Visual Breaks**: Add images/callouts every 300-400 words

### 2.5 Human Voice Requirements (CRITICAL)

**All content MUST sound 100% human-written.** AI-sounding content fails regardless of other quality factors.

#### Required Elements

- [ ] **Personal opening**: Start with story/observation, NOT "In this guide..."
- [ ] **First-person experiences**: At least 2-3 "I've seen...", "When I..." moments
- [ ] **Opinions expressed**: At least 1-2 clear stances or hot takes
- [ ] **Uncertainty admitted**: At least 1 "I'm not sure...", "Even experts disagree..."
- [ ] **Contractions used**: Consistent use of don't, it's, they're, etc.
- [ ] **Conversational transitions**: "Here's the thing...", "That said...", NOT "Additionally,"
- [ ] **Light humor**: 1-2 witty observations or self-deprecating moments
- [ ] **Sentence variety**: Mix of short (5 words) and medium (15-20 words)

#### Banned Phrases (ZERO TOLERANCE)

These phrases FAIL validation immediately:

- ❌ "In this comprehensive guide..."
- ❌ "Whether you're a [X] or a [Y]..."
- ❌ "By the end of this article..."
- ❌ "It's important to note that..."
- ❌ "In today's rapidly evolving..."
- ❌ "This article will explore..."
- ❌ "In conclusion..." (just write the conclusion)

#### The "Read Aloud" Test

Every paragraph must sound natural when read aloud. If it sounds like a textbook, press release, or corporate memo—rewrite it.

### Writing Phase Deliverables

```markdown
---
title: "Descriptive, Compelling Title (50-60 chars)"
description: "Benefit-focused meta description (150-160 chars)"
pubDate: YYYY-MM-DD
updatedDate: null  # Set when content is updated
heroImage: "/blog-placeholder-2.jpg"  # Path to hero image
category: "ai-news"  # See categories.ts for all valid options
tags: ["tag1", "tag2", "tag3"]
author: "Vibe Coder"  # Author name (must match config/authors.ts)
difficulty: "beginner"  # beginner | intermediate | advanced
featured: false  # Set true for featured posts
series: "optional-series-name"  # Optional: for multi-part tutorials
seriesOrder: 1  # Optional: order within series
---

[Well-structured content following outline]
```

---

## Phase 3: Optimization 🚀

### 3.1 On-Page SEO

- [ ] **Title Tag**: 50-60 characters, primary keyword near the front
- [ ] **Meta Description**: 150-160 characters, includes keyword & CTA
- [ ] **URL Slug**: Short, descriptive, includes primary keyword
- [ ] **Primary Keyword**: Appears in first 100 words
- [ ] **Keyword Density**: Natural usage (1-2%), no stuffing

### 3.2 Image Optimization

- [ ] **Format**: WebP format for all images
- [ ] **File Size**: Under 100KB per image (use compression)
- [ ] **Dimensions**: Specify width and height attributes
- [ ] **Alt Text**: Descriptive, keyword-relevant where appropriate
- [ ] **File Names**: Descriptive, hyphenated names (e.g., `seo-checklist-2024.webp`)

### 3.3 Internal Linking

- [ ] **Contextual Links**: 3-5 internal links to relevant content
- [ ] **Anchor Text**: Descriptive, keyword-rich (never "click here")
- [ ] **Link to Pillar Content**: Connect to main topic clusters
- [ ] **Update Old Posts**: Add links FROM existing posts TO this new post

### 3.4 External Linking

- [ ] **Authoritative Sources**: Link to 2-3 high-quality external sources
- [ ] **Proper Attributes**: All external links have `rel="noopener noreferrer"` + `target="_blank"`
- [ ] **Sponsored Links**: Use `rel="sponsored"` for affiliate/paid links
- [ ] **No Broken Links**: Verify all links work before publishing

### 3.5 Technical SEO

- [ ] **Schema Markup**: ✅ Auto-generated by BlogPost layout (see `/json-ld-schema` workflow)
- [ ] **Canonical URL**: Properly set (auto-handled by layout)
- [ ] **Mobile-Friendly**: Content renders properly on mobile
- [ ] **Core Web Vitals**: No layout shifts, fast LCP

> **Note**: JSON-LD structured data (BlogPosting + BreadcrumbList schemas) is automatically
> generated when using the `BlogPost.astro` layout. No manual schema is needed.
> See `/json-ld-schema` for details on the schema system.

### Optimization Checklist Summary

| Element | Requirement | ✓ |
|---------|-------------|---|
| Title Tag | 50-60 chars, keyword front-loaded | [ ] |
| Meta Description | 150-160 chars, compelling CTA | [ ] |
| URL Slug | Short, keyword-included | [ ] |
| H1 | Set via frontmatter only | [ ] |
| H2s | Include primary keyword at least once | [ ] |
| Images | WebP, alt text, compressed | [ ] |
| Internal Links | 3-5 contextual links | [ ] |
| External Links | 2-3 authoritative sources | [ ] |

---

## Phase 4: Publishing 📤

### 4.1 Pre-Publish Checks

- [ ] **Spell Check**: Run grammar/spell checker
- [ ] **Fact Check**: Verify all statistics and claims
- [ ] **Link Test**: Click every link to verify it works
- [ ] **Preview**: View on desktop, tablet, and mobile
- [ ] **Reading Time**: Verify estimated reading time is reasonable

### 4.2 Technical Checks

- [ ] **Frontmatter Valid**: All required fields present
- [ ] **Build Success**: Local build completes without errors
- [ ] **Images Load**: All images display correctly
- [ ] **Schema Valid**: Test with Rich Results Test
- [ ] **PageSpeed**: Run PageSpeed Insights, aim for 90+

### 4.3 Post-Publish Actions

- [ ] **Index Request**: Submit URL to Google Search Console
- [ ] **Sitemap**: Verify post appears in sitemap
- [ ] **Social Sharing**: Share on relevant social platforms
- [ ] **Email Newsletter**: Include in next newsletter (if applicable)

### Publishing Command Sequence

```bash
# 1. Local Preview
npm run dev

# 2. Build Test
npm run build

# 3. Preview Production Build
npm run preview

# 4. Deploy
npm run deploy
```

---

## Phase 5: Updating & Maintenance 🔄

### 5.1 Update Schedule

| Content Type | Update Frequency |
|--------------|------------------|
| Evergreen content | Every 6-12 months |
| Time-sensitive topics | Every 3-6 months |
| Statistics/data-heavy | Annually at minimum |
| Trending topics | As needed |

### 5.2 Update Triggers

- [ ] **Outdated Information**: Facts, stats, or links are stale
- [ ] **Ranking Decline**: Position dropped significantly
- [ ] **Traffic Decline**: 20%+ decrease in organic traffic
- [ ] **New Developments**: Industry changes require updates
- [ ] **User Feedback**: Comments indicate confusion or errors

### 5.3 Update Process

- [ ] **Review Performance**: Check Search Console for impressions, clicks, position
- [ ] **Analyze SERP Changes**: See if competitor content has evolved
- [ ] **Refresh Content**: Update outdated sections
- [ ] **Add New Value**: Include new insights, data, or sections
- [ ] **Update `updatedDate`**: Set in frontmatter to current date
- [ ] **Resubmit to GSC**: Request re-indexing after major updates

### 5.4 Content Audit

Quarterly, review all blog posts for:

- [ ] Underperforming content (consolidate or improve)
- [ ] Thin content (expand or remove)
- [ ] Outdated content (update or archive)
- [ ] Broken links (fix or remove)
- [ ] Orphan pages (add internal links)

---

## ❌ Common SEO Mistakes to Avoid

### Critical Errors (Immediate Impact)

| ❌ Mistake | ✅ Correct Approach |
|-----------|---------------------|
| **Keyword stuffing** | Use keywords naturally (1-2% density) |
| **Duplicate title tags** | Every page needs a unique title |
| **Missing meta descriptions** | Always write compelling descriptions |
| **Multiple H1 tags** | Only ONE H1 per page (via frontmatter) |
| **Empty alt text on images** | Descriptive alt text on ALL images |
| **Missing canonical URLs** | Set canonical to prevent duplicates |
| **Thin content (<300 words)** | Comprehensive content (1,000+ words for most topics) |

### Technical Mistakes (Performance Impact)

| ❌ Mistake | ✅ Correct Approach |
|-----------|---------------------|
| **Unoptimized images** | WebP format, compressed, with dimensions |
| **Missing schema markup** | Include Article/BlogPosting schema |
| **No internal linking** | 3-5 relevant internal links per post |
| **Ignoring mobile UX** | Test and optimize for mobile first |
| **Slow page speed** | Aim for 90+ PageSpeed score |
| **Broken links** | Regularly audit and fix broken links |

### Content Mistakes (Ranking Impact)

| ❌ Mistake | ✅ Correct Approach |
|-----------|---------------------|
| **Ignoring search intent** | Match content format to user intent |
| **No unique value** | Provide original insights, not rehashed content |
| **Wall of text** | Use formatting (lists, headers, images) |
| **Clickbait titles** | Accurate, descriptive titles that deliver |
| **Outdated content** | Regular content audits and updates |
| **"Click here" anchor text** | Descriptive, contextual anchor text |

### Publishing Mistakes (Indexing Impact)

| ❌ Mistake | ✅ Correct Approach |
|-----------|---------------------|
| **Not submitting to GSC** | Request indexing for new content |
| **Orphan pages** | Ensure all pages have internal links |
| **Blocking search engines** | Check robots.txt and noindex tags |
| **Inconsistent URLs** | Standardize trailing slashes and casing |
| **No sitemap** | Auto-generate and update sitemap |

---

## 📈 Performance Benchmarks

### Target Metrics

| Metric | Target | Tool |
|--------|--------|------|
| PageSpeed (Mobile) | 90+ | PageSpeed Insights |
| PageSpeed (Desktop) | 95+ | PageSpeed Insights |
| Core Web Vitals (LCP) | < 2.5s | PageSpeed Insights |
| Core Web Vitals (FID) | < 100ms | PageSpeed Insights |
| Core Web Vitals (CLS) | < 0.1 | PageSpeed Insights |
| Time on Page | > 3 minutes | Google Analytics |
| Bounce Rate | < 60% | Google Analytics |
| Organic CTR | > 3% | Search Console |

---

## 🛠️ Essential Tools Reference

### Research Tools

- **Keyword Research**: Google Keyword Planner, Ubersuggest, Ahrefs
- **Competitor Analysis**: Ahrefs, SEMrush, SimilarWeb
- **Content Ideas**: AnswerThePublic, AlsoAsked, Reddit, Quora

### Optimization Tools

- **SEO Audit**: Screaming Frog, Sitebulb, Ahrefs
- **PageSpeed**: Google PageSpeed Insights, GTmetrix
- **Schema Testing**: Google Rich Results Test
- **Mobile Testing**: Google Mobile-Friendly Test

### Monitoring Tools

- **Rankings**: Google Search Console, Ahrefs, SEMrush
- **Analytics**: Google Analytics 4
- **Uptime**: Cloudflare Analytics

---

## 📁 Blog Post File Template

When creating a new blog post, use this flat file structure:

```
src/content/blog/
├── your-post-slug.md              # Your new blog post
├── another-post.md
└── ...

public/
├── blog-placeholder-1.jpg         # Shared placeholder images
├── blog-placeholder-2.jpg
└── ...
```

> **Note**: This project uses flat markdown files directly in `src/content/blog/`, not nested folders.

### Frontmatter Template

```yaml
---
title: "Your Compelling Title Here (50-60 characters)"
description: "A benefit-focused meta description that encourages clicks (150-160 characters)"
pubDate: 2026-01-15
updatedDate: null  # Set when content is updated
heroImage: "/blog-placeholder-2.jpg"
category: "ai-news"  # See src/config/categories.ts for valid options
tags: ["Primary Tag", "Secondary Tag", "Tertiary Tag"]  # Array of tag strings
author: "Vibe Coder"  # Author name from src/config/authors.ts
difficulty: "beginner"  # OPTIONAL: beginner | intermediate | advanced
featured: false  # OPTIONAL: Set true for featured posts on homepage
series: "My Tutorial Series"  # OPTIONAL: For multi-part tutorials
seriesOrder: 1  # OPTIONAL: Order within the series (1, 2, 3...)
---
```

### Available Categories

**Primary Categories (from content plan):**

| Slug | Name | Description |
|------|------|-------------|
| `ai-agents` | AI Agents | Autonomous AI, agent architectures, multi-agent systems |
| `ai-tools` | AI Tools | Reviews and guides for AI tools |
| `ai-news` | AI News | Breaking news, model releases, industry updates |
| `tutorials` | Tutorials | Step-by-step guides, hands-on projects |
| `chatgpt` | ChatGPT | Everything ChatGPT - prompts, tips, updates |
| `prompt-engineering` | Prompt Engineering | Prompting techniques, templates, optimization |
| `ai-comparisons` | AI Comparisons | Head-to-head comparisons of AI tools/models |
| `ai-careers` | AI Careers | Jobs, skills, certifications, career transitions |
| `generative-ai` | Generative AI | AI image, video, audio generation |
| `open-source-ai` | Open Source AI | Open models, Hugging Face, Ollama, local LLMs |
| `ai-ethics` | AI Ethics | Responsible AI, bias, alignment, regulations |
| `ai-business` | AI Business | Enterprise AI, ROI, implementation strategies |
| `llms` | LLMs | Language models, architectures, technical concepts |
| `ai-hardware` | AI Hardware | GPUs, TPUs, AI PCs, edge computing |
| `industry-ai` | Industry AI | AI applications in specific industries |

**Legacy Categories:**

| Slug | Name | Description |
|------|------|-------------|
| `prompts` | Prompts | Curated prompts collection |
| `mcp` | MCP | Model Context Protocol |
| `tools` | Tools | General AI tools |
| `code-snippets` | Code Snippets | Quick code examples |

### Available Authors

| Author Name | Role |
|-------------|------|
| `Vibe Coder` | AI Engineer & Developer (default) |
| `Guest Author` | Guest Contributor |
| `Alex Chen` | Technical Lead |

---

## ⚠️ Agent Instructions

**MANDATORY**: Before writing or editing ANY blog content:

1. Review this SOP completely
2. Complete ALL applicable checklist items
3. Cross-reference with `/seo-guidelines` for technical requirements
4. Run `/performance` checks before publishing
5. Verify accessibility with `/accessibility` workflow

**NEVER**:
- Skip the research phase
- Publish without completing optimization checklist
- Use placeholder or empty alt text
- Ignore search intent mismatch
- Forget to update the sitemap submission

---

*Last updated: 2026-01-06*
