---
description: Master orchestrator workflow - the single entry point for creating blog posts, coordinates all sub-workflows from research to validation.
---

// turbo-all

# 🎯 Blog Master Workflow

**FULLY AUTOMATED** - The central orchestrator for blog creation. No confirmation prompts.

---

## ⚡ Automation Mode

This workflow runs in **fully automated mode**:
- ✅ No confirmation prompts - proceeds automatically
- ✅ All file operations auto-approved
- ✅ All terminal commands auto-run
- ✅ Auto-fix validation failures (up to 2 retries)

> **Note:** The `// turbo-all` annotation enables auto-running of all terminal commands.

## 📋 Quick Reference

**Input:** Topic or keyword from user
**Output:** Complete, validated blog post ready to publish
**Estimated Time:** 40-60 minutes (with speed optimizations)
**Sub-workflows:** `/blog-research` → `/blog-outline` → `/blog-writer` → `/blog-reviewer` → `/featured-image` → `/blog-validator`
**Final Step:** Publishing phase

> **📚 Quick Reference:** See `/blog-quality-checklist` for essential rules. Full details: `/blog-quality-standards`

> **⚡ Token Optimized:** This workflow uses compact references to reduce token usage by ~30% while maintaining quality.

### ⚡ Speed Optimizations Active

This workflow uses optimizations for faster generation without quality compromise:

| Optimization | Description | Time Saved |
|--------------|-------------|------------|
| **AI Model Cache** | Pre-verified model versions in `.agent/ai-models-current.json` | 3-5 min |
| **Internal Link Index** | Fast lookup in `blogpost-content-plan/internal-link-index.json` | 2-4 min |
| **Parallel Research** | Keyword, SERP, question mining run simultaneously | 5-10 min |
| **Quick Checks** | Early error detection during writing phase | 3-5 min |

**Support Files:**
```
.agent/ai-models-current.json          ← Current AI model versions (refresh weekly)
blogpost-content-plan/internal-link-index.json  ← Internal linking lookup
```

### Working Files Location

All intermediate files are saved to `blog-drafts/[post-slug]/`:

```
blog-drafts/
└── [post-slug]/                        ← Folder created for each post
    ├── 01-research-brief.md            ← From /blog-research
    ├── 02-outline.md                   ← From /blog-outline
    ├── 03-draft-v1.md                  ← From /blog-writer (working copy)
    ├── 04-reviewed-draft.md            ← From /blog-reviewer
    ├── 05-review-report.md             ← From /blog-reviewer
    └── 06-validation-report.md         ← From /blog-validator
```

The final publishable post goes to: `src/content/blog/[slug].md`

### 🚨 MANDATORY: File Creation Requirements

**ALL 6 INTERMEDIATE FILES MUST BE CREATED.** This is non-negotiable.

| File | When to Create | Why Required |
|------|----------------|--------------|
| `01-research-brief.md` | After research phase | Reference for future updates, SEO strategy |
| `02-outline.md` | After outline phase | Structure documentation, word count planning |
| `03-draft-v1.md` | After writing phase | Version control, rollback capability |
| `04-reviewed-draft.md` | After review phase | Track changes, audit trail |
| `05-review-report.md` | After review phase | Document improvements made |
| `06-validation-report.md` | After validation phase | Quality assurance record |

**DO NOT skip file creation to save time.** These files are essential for:
- Debugging if issues arise
- Updating content in the future
- Tracking the evolution of content
- Auditing quality and process compliance

**Agent MUST verify all 6 files exist before marking a post as complete.**

### Phase Mapping to blog-writing-sop

| Blog Master Phase | Maps to SOP Phase |
|-------------------|-------------------|
| Phase 1: Research (`/blog-research`) | SOP Phase 1: Research |
| Phase 2: Outline (`/blog-outline`) | SOP Phase 2: Writing (prep) |
| Phase 3: Writing (`/blog-writer`) | SOP Phase 2: Writing |
| Phase 4: Review (`/blog-reviewer`) | SOP Phase 3: Optimization (enhancement) |
| Phase 5: Validation (`/blog-validator`) | SOP Phase 3: Optimization (quality gate) |
| Phase 6: Publish (`/blog-writing-sop`) | SOP Phase 4 & 5: Publishing & Updating |

### ⚠️ Critical Requirements

> **All requirements are defined in `/blog-quality-standards`.** See that document for details.

| Requirement | Priority | Verification Point |
|-------------|----------|--------------------|
| **Human Voice** | 🔴 Critical | `/blog-reviewer` + `/blog-validator` |
| **Information Currency** | 🔴 Critical | `/blog-research` (primary) |
| **AI Model Currency** | 🔴 Critical | `/blog-research` (primary) + `/blog-validator` (final check) |
| **Word Count** | 🔴 Critical | `/blog-validator` |
| **E-E-A-T Signals** | 🔴 Critical | `/blog-writer` + `/blog-reviewer` |
| **SEO Optimization** | 🟡 High | `/blog-validator` |
| **Accessibility** | 🟡 High | `/blog-validator` |

**Key Optimization Notes:**
- AI model versions: Check cache first (`.agent/ai-models-current.json`), verify if stale
- Internal links: Use index first (`blogpost-content-plan/internal-link-index.json`)
- Research: Run keyword/SERP/question mining in parallel
- Writing: Run quick checks after each major section
- Human voice is built into `/blog-writer`, enhanced in `/blog-reviewer`, validated in `/blog-validator`
- Each workflow references `/blog-quality-standards` instead of duplicating rules

---

## 🚀 How to Use

### Invocation

```
/blog-master [Your topic or keyword here]
```

**Examples:**
```
/blog-master AI agents for customer service
/blog-master How to use Claude for code review
/blog-master Best MCP servers for developers in 2025
/blog-master Prompt engineering techniques for beginners
```

---

## 🔄 Orchestration Flow

```
USER INPUT: Topic
       │
       ▼
┌──────────────────────────────────────────────────────────┐
│                    PHASE 1: RESEARCH                      │
│                      /blog-research                       │
│                                                          │
│   • Keyword analysis                                     │
│   • SERP analysis                                        │
│   • Competitor review                                    │
│   • Question mining                                      │
│   • Data gathering                                       │
│   • Unique angle definition                              │
│                                                          │
│   OUTPUT: Research Brief                                 │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│                    PHASE 2: OUTLINE                       │
│                      /blog-outline                        │
│                                                          │
│   • Structure planning                                   │
│   • H2/H3 hierarchy                                      │
│   • Word count allocation                                │
│   • Link mapping                                         │
│   • Featured snippet optimization                        │
│   • FAQ planning                                         │
│                                                          │
│   OUTPUT: Detailed Outline                               │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│                    PHASE 3: WRITING                       │
│                       /blog-writer                        │
│                                                          │
│   • Frontmatter creation                                 │
│   • Introduction with hook                               │
│   • Section content with E-E-A-T                         │
│   • FAQ section                                          │
│   • Conclusion with CTA                                  │
│   • Internal/external linking                            │
│                                                          │
│   OUTPUT: Draft saved to blog-drafts/[slug]/03-draft-v1.md│
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│                    PHASE 4: REVIEW                        │
│                    /blog-reviewer                         │
│                                                          │
│   Pass 1: Content Enhancement                            │
│   • Expand thin sections, improve examples               │
│   • Strengthen hook and CTA                              │
│                                                          │
│   Pass 2: Humanization                                   │
│   • Remove AI patterns, add anecdotes                    │
│   • Inject opinions, humor, uncertainty                  │
│                                                          │
│   Pass 3: Fact-Checking (Deep)                           │
│   • Verify all claims via web search                     │
│   • Correct errors, update outdated info                 │
│                                                          │
│   Pass 4: Citations                                      │
│   • Add 3-5 high-quality external links                  │
│   • Cite authoritative sources                           │
│                                                          │
│   OUTPUT: Reviewed draft + Review report                 │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│                 PHASE 4.5: FEATURED IMAGE                 │
│                    /featured-image                        │
│                                                          │
│   • Ask user: AI generation or Programmatic?             │
│   • Generate 1200x630 black & white OG image             │
│   • Add www.aiagentskit.com watermark                    │
│   • Save to public/images/featured/[slug].webp           │
│   • Update frontmatter heroImage path                    │
│                                                          │
│   OUTPUT: Featured image + updated frontmatter           │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│                   PHASE 5: VALIDATION                     │
│                     /blog-validator                       │
│                                                          │
│   • SEO checks (title, description, keywords)            │
│   • Content checks (word count, readability, links)      │
│   • Human voice checks (anecdotes, opinions, tone)       │
│   • Accessibility checks (alt text, headings)            │
│   • Technical checks (frontmatter, categories)           │
│   • Featured image check (dimensions, size, watermark)   │
│                                                          │
│   OUTPUT: Validation Report (PASS/FAIL)                  │
└──────────────────────────┬───────────────────────────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
         ┌─────────┐             ┌─────────┐
         │  FAIL   │             │  PASS   │
         └────┬────┘             └────┬────┘
              │                       │
              ▼                       ▼
      Fix issues &              ┌───────────────────────┐
      Re-validate               │   PHASE 6: PUBLISH    │
                                │   /blog-writing-sop   │
                                │   (Phase 4 & 5)       │
                                │                       │
                                │   • Final checks      │
                                │   • Build & deploy    │
                                │   • Submit to GSC     │
                                └───────────────────────┘
```

---

## 📝 Step-by-Step Execution

### Step 1: Receive and Validate Topic

When user provides a topic:

1. **Check specificity**
   - ❌ Too broad: "AI" → Auto-reject and log warning
   - ✅ Good: "AI agents for customer service" → Proceed

2. **Check alignment with site categories**
   - See `src/config/categories.ts` for valid category options
   - Auto-select best matching category

3. **Log and proceed (NO confirmation needed)**
   ```
   🚀 Auto-starting blog creation:
   Topic: [user's topic]
   Category: [auto-selected category]
   ⚡ Proceeding to research phase...
   ```

---

### Step 2: Execute Research Phase

**Run:** `/blog-research`

**Actions:**
1. Conduct keyword research
2. Analyze SERP results
3. Review competitor content
4. Mine questions from PAA/forums
5. Gather supporting data
6. Define unique angle

**Checkpoint:**
```
✅ Research Phase Complete

Primary Keyword: [keyword]
Search Intent: [intent]
Target Word Count: [count]
Unique Angle: [angle]

Proceeding to Outline phase...
```

---

### Step 3: Execute Outline Phase

**Run:** `/blog-outline`

**Input:** Research Brief from Step 2

**Actions:**
1. Design heading hierarchy
2. Allocate word counts
3. Map internal links
4. Plan FAQ section
5. Identify snippet opportunities

**Checkpoint:**
```
✅ Outline Phase Complete

Structure:
- Introduction (150-200 words)
- [H2 sections listed]
- FAQ (200-300 words)
- Conclusion (100-150 words)

Total Planned: [X words]

Proceeding to Writing phase...
```

---

### Step 4: Execute Writing Phase

**Run:** `/blog-writer`

**Input:** Research Brief + Detailed Outline

**Actions:**
1. Create frontmatter
2. Write compelling introduction
3. Expand each section
4. Add E-E-A-T signals
5. Write FAQ
6. Write conclusion with CTA
7. Insert all links

**Checkpoint:**
```
✅ Writing Phase Complete

File saved: src/content/blog/[slug].md
Word count: [X words]
Internal links: [X]
External links: [X]

Proceeding to Validation phase...
```

---

### Step 5: Execute Featured Image Phase

**Run:** `/featured-image`

**Ask the user:**
```
🎨 Featured Image Generation

Which method would you prefer?

1. **AI Generation** (Creative)
   - Unique, creative designs with icons
   - More visual appeal
   - Requires prompting and processing

2. **Programmatic Generation** (Consistent)
   - Clean text-focused design  
   - Fast and automated
   - Consistent branding

Enter 1 or 2:
```

**For AI Generation:**
1. Use category-specific prompt from `docs/featured-image-prompts.md`
2. Generate image with Claude/GPT
3. Process with: `node scripts/process-image.cjs [input] public/images/featured/[slug].webp --watermark`
4. Update frontmatter

**For Programmatic Generation:**
```bash
node scripts/generate-featured-image.cjs "[Post Title]" [slug] --category [category]
```

**Checkpoint:**
```
✅ Featured Image Generated

File: public/images/featured/[slug].webp
Size: [X] KB
Method: [AI/Programmatic]
Watermark: www.aiagentskit.com ✓

Frontmatter updated:
heroImage: "/images/featured/[slug].webp"

Proceeding to validation...
```

---

### Step 6: Execute Validation Phase

**Run:** `/blog-validator`

**Input:** Draft file path

**Actions:**
1. Validate SEO requirements
2. Validate content quality
3. Validate accessibility
4. Validate technical requirements
5. Check all links

**If PASS:**
```
✅ Validation PASSED (X/Y checks)

Blog post is ready for publishing!

Next steps:
1. Run: npm run dev (preview locally)
2. Follow /blog-writing-sop Phase 4 for publishing
3. After deploy, submit to Google Search Console
```

**If FAIL:**
```
❌ Validation FAILED

Issues found:
1. [Issue 1] - [Fix required]
2. [Issue 2] - [Fix required]

After fixing, re-run validation:
/blog-validator src/content/blog/[slug].md
```

---

### Step 7: Publishing Handoff

After validation passes, guide user to existing SOP:

```
✅ Blog creation workflow complete!

Your post is at: src/content/blog/[slug].md

To publish, follow /blog-writing-sop Phase 4:

1. Pre-publish checks:
   - npm run dev (local preview)
   - Check desktop, tablet, mobile views

2. Build and deploy:
   - npm run build
   - npm run deploy

3. Post-publish:
   - Submit URL to Google Search Console
   - Verify in sitemap
   - Share on social media
```

---

## 🔧 State Management

Throughout execution, maintain state:

```
Blog Creation State:
├── Topic: [original topic]
├── Phase: [current phase]
├── Research Brief: [stored/reference]
├── Outline: [stored/reference]
├── Draft Path: [file location]
└── Validation: [PENDING/PASS/FAIL]
```

This allows:
- Resuming if interrupted
- Reference previous phases
- Clear handoffs between workflows

---

## ❓ Handling Edge Cases

### User Wants to Skip Phases

```
User: "I already have research, just write the post"

Agent: Skipping research phase. Using provided information:
- Primary keyword: [from user]
- Target word count: [from user]
- Key points: [from user]

⚠️ Note: Without research, the post may miss SEO opportunities.
⚡ Proceeding with provided context...
```

### Validation Keeps Failing

```
After 3 failed validations:

The same issues keep appearing. Let me help resolve them:

Issue: [specific issue]
Root cause: [analysis]
Fix: [detailed solution with example]

Would you like me to apply this fix directly?
```

### User Wants Different Direction

```
User: "The outline doesn't match what I wanted"

Agent: I can adjust the outline. What would you like to change?
1. Different structure/format
2. Different sections
3. Different angle
4. Different word count

Please specify, and I'll regenerate the outline.
```

---

## 📊 Success Metrics

A successful blog master execution achieves:

| Metric | Target |
|--------|--------|
| Validation pass | First or second attempt |
| Research depth | 5+ sources analyzed |
| Outline completeness | All sections planned |
| Draft quality | E-E-A-T signals present |
| SEO readiness | All critical checks pass |

---

## ⚠️ Agent Instructions

### ⚡ LAZY LOADING PATTERN (Token Optimized)

**DO NOT load all workflows at once.** Load only the workflow for the current phase.

**Execution Pattern:**
1. Load current phase workflow ONLY
2. Execute phase
3. Save phase output
4. **Clear workflow from context** (important!)
5. Load next phase workflow
6. Repeat

**Why:** Loading workflows on-demand instead of all 6 simultaneously saves ~18,000 tokens.

### Phase-by-Phase Workflow Loading

**Phase 1: Research**
- Load: `/blog-research`
- Execute research
- Save: `blog-drafts/[slug]/01-research-brief.md`
- **Clear `/blog-research` from context**

**Phase 2: Outline**
- Load: `/blog-outline`
- Input: Research brief
- Save: `blog-drafts/[slug]/02-outline.md`
- **Clear `/blog-outline` from context**

**Phase 3: Writing**
- Load: `/blog-writer`
- Input: Research brief + Outline
- References: `/blog-quality-checklist`, `/blog-templates`
- Save: `blog-drafts/[slug]/03-draft-v1.md`
- **Clear `/blog-writer` from context**

**Phase 4: Review**
- Load: `/blog-reviewer`  
- Input: Draft v1
- References: `/blog-quality-checklist`
- Save: `blog-drafts/[slug]/04-reviewed-draft.md` + review report
- **Clear `/blog-reviewer` from context**

**Phase 4.5: Featured Image**
- Load: `/featured-image`
- Input: Post title, slug, category
- Save: `public/images/featured/[slug].webp` + update frontmatter
- **Clear `/featured-image` from context**

**Phase 5: Validation**
- Load: `/blog-validator`
- Input: Reviewed draft
- References: `/blog-quality-checklist` (for quick checks), `/blog-quality-standards` (for comprehensive validation)
- Save: `blog-drafts/[slug]/06-validation-report.md`
- If PASS: Copy to `src/content/blog/[slug].md`
- **Clear `/blog-validator` from context**

**Phase 6: Publishing**
- Load: `/blog-writing-sop` (Phase 4 & 5 only)
- Guide user through deployment

### 🔧 Core Execution Rules

1. **Execute phases in order** - Never skip unless user requests
2. **One workflow in context at a time** - Critical for token savings
3. **Maintain file references** - Reference previous outputs by file path
4. **Handle failures gracefully** - Provide specific fixes
5. **Use support files** - Load these ONCE at start (keep in context):
   - `.agent/ai-models-current.json`
   - `blogpost-content-plan/internal-link-index.json`

### 📦 Persistent References (Keep Throughout)

These compact files can stay in context across all phases:
- `/blog-quality-checklist` (compact, ~1,800 tokens)
- `/blog-templates` (examples, ~2,200 tokens)

**Do NOT load:**
- `/blog-quality-standards` (large, only needed for validation phase)
- Individual workflows until their phase begins

### 🎯 Token Budget Per Phase

| Phase | Workflow Tokens | Support Files | Total |
|-------|----------------|---------------|-------|
| Research | ~4,500 | ~4,000 | ~8,500 |
| Outline | ~3,200 | ~4,000 | ~7,200 |
| Writing | ~3,300 | ~4,000 | ~7,300 |
| Review | ~2,600 | ~4,000 | ~6,600 |
| Featured Image | ~2,000 | ~4,000 | ~6,000 |
| Validation | ~3,100 + 4,400 | ~4,000 | ~11,500 |

**Peak usage:** ~11,500 tokens (validation phase)  
**vs. Old peak:** ~29,500 tokens (all workflows loaded)  
**Savings:** ~18,000 tokens (61% reduction in workflow overhead)

---

*Last updated: 2026-01-17*
*Optimized: Implemented lazy loading pattern (Tier 2B) - load workflows on-demand*
*Optimized: Added /featured-image workflow for OG images, updated phase numbering*
