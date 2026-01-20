---
description: Automated workflow to pick the next blog post from content-ideas.md, create it using /blog-master, and update status
---

// turbo-all

# 📋 Blog From Plan Workflow

**FULLY AUTOMATED** - Creates blog posts from the content plan without prompts.

1. Reads the content-ideas.md file
2. Identifies unpublished blog posts (P1 priority first, then status = 📝)
3. Creates posts using the /blog-master workflow
4. Updates the content-ideas.md with the new status

**Supports batch creation!** Create multiple posts in one go.

---

## ⚡ Automation Mode

This workflow runs in **fully automated mode**:
- ✅ No confirmation prompts - proceeds automatically
- ✅ All file operations auto-approved
- ✅ All terminal commands auto-run

> **Note:** The `// turbo-all` annotation enables auto-running of all terminal commands.

---

## 🚀 Invocation

| Command | Behavior |
|---------|----------|
| `/blog-from-plan` | Creates **1** blog post (default) |
| `/blog-from-plan 3` | Creates the next **3** blog posts sequentially |
| `/blog-from-plan 5` | Creates the next **5** blog posts sequentially |
| `/blog-from-plan all` | Creates **all remaining P1** priority posts |
| `/blog-from-plan all-p2` | Creates all remaining **P1 and P2** priority posts |

---

## 📍 File Locations

| File | Path |
|------|------|
| **Content Ideas Database** | `blogpost-content-plan/content-ideas.md` |
| **Blog Master Workflow** | `.agent/workflows/blog-master.md` |
| **Published Posts** | `src/content/blog/[slug].md` |
| **Working Drafts** | `blog-drafts/[slug]/` |
| **AI Model Cache** | `.agent/ai-models-current.json` |
| **Internal Link Index** | `blogpost-content-plan/internal-link-index.json` |

---

## 🔄 Single Post Execution Flow (Automated)

```
START
   │
   ▼
┌──────────────────────────────────────────────────────────┐
│              STEP 1: READ CONTENT PLAN                    │
│                                                          │
│   Read: blogpost-content-plan/content-ideas.md           │
│   Parse the category tables to find blog post ideas      │
│                                                          │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│           STEP 2: IDENTIFY NEXT POST TO CREATE            │
│                                                          │
│   Selection Priority:                                    │
│   1. Status = 📝 (Idea) — NOT ✅ or ✍️ or 🔍             │
│   2. Priority = P1 (Immediate) first                     │
│   3. Then P2, then P3                                    │
│   4. Within same priority, select smallest ID number     │
│                                                          │
│   Extract:                                               │
│   - Post ID (#)                                          │
│   - Blog Post Topic (title)                              │
│   - Keywords (primary, secondary, long-tail)             │
│   - Type (Listicle, How-to, etc.)                        │
│   - Target Word Count                                    │
│   - Category (from section heading)                      │
│                                                          │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│       STEP 3: LOG SELECTION (NO CONFIRMATION)             │
│                                                          │
│   Display to user (info only, no prompt):                │
│                                                          │
│   🚀 Auto-creating Blog Post:                            │
│   ─────────────────────────────                          │
│   ID: [#]                                                │
│   Title: [Blog Post Topic]                               │
│   Category: [category name]                              │
│   Type: [content type]                                   │
│   Keywords: [primary keyword]                            │
│   Target Words: [word count]                             │
│   Priority: [P1/P2/P3]                                   │
│                                                          │
│   ⚡ Proceeding automatically...                         │
│                                                          │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│             STEP 4: UPDATE STATUS TO WRITING              │
│                                                          │
│   In content-ideas.md:                                   │
│   Change Status from: 📝                                 │
│   To: ✍️ Writing                                         │
│                                                          │
│   This indicates work has started on the post.           │
│                                                          │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│             STEP 5: EXECUTE /blog-master                  │
│                                                          │
│   Pass to /blog-master workflow:                         │
│   - Topic: [Blog Post Topic from content-ideas.md]       │
│   - Category: [category slug]                            │
│   - Keywords: [extracted keywords]                       │
│   - Target Word Count: [from content-ideas.md]           │
│                                                          │
│   The /blog-master workflow will:                        │
│   1. Run /blog-research                                  │
│   2. Run /blog-outline                                   │
│   3. Run /blog-writer                                    │
│   4. Run /blog-reviewer                                  │
│   5. Run /blog-validator                                 │
│   6. Handle publishing handoff                           │
│                                                          │
└──────────────────────────┬───────────────────────────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
    ┌─────────────────┐       ┌─────────────────┐
    │  VALIDATION     │       │  VALIDATION     │
    │    FAILED       │       │    PASSED       │
    └────────┬────────┘       └────────┬────────┘
             │                         │
             ▼                         ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│  Auto-fix and retry:     │  │  STEP 6: UPDATE STATUS   │
│                          │  │  TO PUBLISHED            │
│  1. Identify issues      │  │                          │
│  2. Auto-fix if possible │  │  In content-ideas.md:    │
│  3. Re-run validation    │  │  Change Status to: ✅     │
│  4. If still failing,    │  │                          │
│     mark as 🔍 Review    │  │  Add to URL & Links table│
│                          │  │  at the top of document  │
└──────────────────────────┘  └──────────────────────────┘
                                       │
                                       ▼
┌──────────────────────────────────────────────────────────┐
│            STEP 7: UPDATE CHANGES LOG                     │
│                                                          │
│   Add entry to Changes Log section:                      │
│                                                          │
│   | [Today's Date] | Published #[ID]: [Title] via        │
│   |                | /blog-from-plan workflow |           │
│                                                          │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│          STEP 7.5: VERIFY ALL FILES CREATED               │
│                                                          │
│   🚨 MANDATORY FILE VERIFICATION                          │
│                                                          │
│   Before marking complete, verify these 6 files exist:   │
│                                                          │
│   blog-drafts/[slug]/                                    │
│   ├── 01-research-brief.md    ← ✅ Must exist            │
│   ├── 02-outline.md           ← ✅ Must exist            │
│   ├── 03-draft-v1.md          ← ✅ Must exist            │
│   ├── 04-reviewed-draft.md    ← ✅ Must exist            │
│   ├── 05-review-report.md     ← ✅ Must exist            │
│   └── 06-validation-report.md ← ✅ Must exist            │
│                                                          │
│   If ANY file is missing:                                │
│   1. DO NOT mark as complete                             │
│   2. Create the missing file(s)                          │
│   3. Re-verify all 6 files exist                         │
│   4. Then proceed to completion                          │
│                                                          │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│              STEP 8: COMPLETION REPORT                    │
│                                                          │
│   ✅ Blog Post Created Successfully!                      │
│   ─────────────────────────────────                      │
│   ID: [#]                                                │
│   Title: [Blog Post Topic]                               │
│   Status: ✅ Published                                    │
│   File: src/content/blog/[slug].md                       │
│   URL: /blog/[slug]                                      │
│                                                          │
│   Draft Files Created:                                   │
│   ├── blog-drafts/[slug]/01-research-brief.md ✅         │
│   ├── blog-drafts/[slug]/02-outline.md ✅                │
│   ├── blog-drafts/[slug]/03-draft-v1.md ✅               │
│   ├── blog-drafts/[slug]/04-reviewed-draft.md ✅         │
│   ├── blog-drafts/[slug]/05-review-report.md ✅          │
│   └── blog-drafts/[slug]/06-validation-report.md ✅      │
│                                                          │
│   The content-ideas.md has been updated.                 │
│                                                          │
│   Next steps:                                            │
│   - Preview: npm run dev                                 │
│   - Deploy: npm run deploy                               │
│   - Submit to Google Search Console                      │
│                                                          │
│   Run /blog-from-plan again to create the next post.     │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 🔁 Batch Mode Execution Flow (Automated)

When running `/blog-from-plan [count]` or `/blog-from-plan all`:

```
START: /blog-from-plan 3
   │
   ▼
┌──────────────────────────────────────────────────────────┐
│              STEP 0: PARSE BATCH PARAMETERS               │
│                                                          │
│   Parse argument:                                        │
│   • Number (e.g., "3") → Create exactly 3 posts          │
│   • "all" → Create all remaining P1 posts                │
│   • "all-p2" → Create all remaining P1 and P2 posts      │
│   • No argument → Create 1 post (default)                │
│                                                          │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│         STEP 1: LOG BATCH PLAN (NO CONFIRMATION)          │
│                                                          │
│   Read content-ideas.md and count available posts.       │
│                                                          │
│   Display summary (info only, no prompt):                │
│   ┌─────────────────────────────────────────────┐        │
│   │ 🚀 Batch Mode - Auto-Creating Posts         │        │
│   │ ─────────────────────────────               │        │
│   │ Requested: 3 posts                          │        │
│   │ Available P1 posts: 12                      │        │
│   │ Available P2 posts: 25                      │        │
│   │ Will create: 3 posts                        │        │
│   │                                             │        │
│   │ Posts to create:                            │        │
│   │ 1. #5 - Multi-Agent Systems Explained       │        │
│   │ 2. #7 - LangChain Agents Tutorial           │        │
│   │ 3. #8 - CrewAI Tutorial                     │        │
│   │                                             │        │
│   │ ⚡ Proceeding automatically...              │        │
│   └─────────────────────────────────────────────┘        │
│                                                          │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│              STEP 2: BATCH EXECUTION LOOP                 │
│                                                          │
│   FOR each post in batch:                                │
│                                                          │
│   ┌─────────────────────────────────────────────┐        │
│   │ 📝 Creating Post 1/3                        │        │
│   │ ─────────────────────────────               │        │
│   │ ID: #5                                      │        │
│   │ Title: Multi-Agent Systems Explained        │        │
│   │ Category: ai-agents                         │        │
│   │                                             │        │
│   │ ├── 📖 Research...     ✅ Complete          │        │
│   │ ├── 📝 Outline...      ✅ Complete          │        │
│   │ ├── ✍️ Writing...      ✅ Complete          │        │
│   │ ├── 🔍 Review...       ✅ Complete          │        │
│   │ ├── ✓ Validation...   ✅ PASSED            │        │
│   │ └── 📊 Status updated to ✅                 │        │
│   │                                             │        │
│   │ ✅ Post 1/3 Complete!                       │        │
│   └─────────────────────────────────────────────┘        │
│                                                          │
│   Repeat for remaining posts...                          │
│                                                          │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│              STEP 3: BATCH COMPLETION REPORT              │
│                                                          │
│   ┌─────────────────────────────────────────────┐        │
│   │ ✅ Batch Complete!                          │        │
│   │ ─────────────────────────────               │        │
│   │                                             │        │
│   │ Created: 3/3 posts                          │        │
│   │                                             │        │
│   │ │ # │ Title                    │ Status │   │        │
│   │ │───│──────────────────────────│────────│   │        │
│   │ │ 5 │ Multi-Agent Systems...   │ ✅     │   │        │
│   │ │ 7 │ LangChain Agents...      │ ✅     │   │        │
│   │ │ 8 │ CrewAI Tutorial...       │ ✅     │   │        │
│   │                                             │        │
│   │ Files created:                              │        │
│   │ • src/content/blog/multi-agent-systems.md   │        │
│   │ • src/content/blog/langchain-agents.md      │        │
│   │ • src/content/blog/crewai-tutorial.md       │        │
│   │                                             │        │
│   │ Next steps:                                 │        │
│   │ • npm run dev (preview all)                 │        │
│   │ • npm run deploy                            │        │
│   │ • Submit URLs to Google Search Console      │        │
│   │                                             │        │
│   │ Remaining P1 posts: 9                       │        │
│   │ Run /blog-from-plan again to continue.      │        │
│   └─────────────────────────────────────────────┘        │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 🛑 Batch Mode: Auto-Handling Failures

If a post fails validation during batch mode, **auto-fix and retry**:

```
┌─────────────────────────────────────────────────────────┐
│ ⚠️ Post 2/3 Failed Validation - Auto-Fixing             │
│ ─────────────────────────────                          │
│ ID: #7                                                 │
│ Title: LangChain Agents Tutorial                       │
│ Issue: Word count below minimum (3,200 < 4,000)        │
│                                                        │
│ 🔧 Auto-fix: Expanding content...                      │
│ ✅ Fixed: Word count now 4,150                         │
│ ✅ Re-validation: PASSED                               │
│                                                        │
│ Continuing to next post...                             │
└─────────────────────────────────────────────────────────┘
```

### Auto-Fix Behavior

| Issue | Auto-Fix Action |
|-------|-----------------|
| **Word count low** | Expand thin sections automatically |
| **Missing internal links** | Add links from existing posts |
| **Missing external links** | Search and add citations |
| **AI patterns detected** | Rewrite flagged phrases |
| **After 2 failed retries** | Mark as 🔍 Review and continue |

---

## 📊 Status Values Reference

| Status | Meaning | When Set |
|--------|---------|----------|
| 📝 | Idea (not started) | Initial state |
| ✍️ Writing | Currently being written | Step 4 (before /blog-master) |
| 🔍 Review | Under review/fixing issues | If validation fails after retries |
| ✅ | Published | Step 6 (after validation passes) |

---

## 📋 URL & Internal Links Table Update

When a post is published, add a row to the tracking table at the top of content-ideas.md:

```markdown
| ID | Status | URL | Links To (Post IDs) | Date Published |
|----|--------|-----|---------------------|----------------|
| [ID] | ✅ | /blog/[slug] | [comma-separated IDs] | [YYYY-MM-DD] |
```

---

## ⚠️ Agent Instructions

### ⚡ AUTOMATION RULES

**This workflow runs WITHOUT prompts.** Follow these rules:

1. **NO confirmation prompts** - Do not ask "Proceed? (Y/N)"
2. **Auto-approve all file operations** - Create, edit, delete files without asking
3. **Auto-run all commands** - The `// turbo-all` annotation enables this
4. **Auto-fix validation failures** - Attempt to fix issues automatically up to 2 times
5. **Only stop on unrecoverable errors** - Network failures, missing dependencies, etc.

### Parsing Batch Arguments

```python
# Parse the argument after /blog-from-plan
argument = user_input.split()[1] if len(user_input.split()) > 1 else None

if argument is None:
    batch_count = 1
elif argument.isdigit():
    batch_count = int(argument)
elif argument == "all":
    batch_count = count_available_posts(priority="P1")
elif argument == "all-p2":
    batch_count = count_available_posts(priority=["P1", "P2"])
else:
    show_error("Invalid argument. Use a number, 'all', or 'all-p2'")
```

### Step 1: Reading the Content Plan
```
Read the file: blogpost-content-plan/content-ideas.md
Parse each category table (## 1. AI Agents, ## 2. AI Tools, etc.)
```

### Step 2: Finding the Next Post(s)
```python
# Priority order for selection:
1. Filter rows where Status = "📝" (not ✅, not ✍️, not 🔍)
2. Sort by Priority: P1 first, then P2, then P3
3. Within same priority, sort by ID (lowest first)
4. Select first [batch_count] matching rows
```

### Step 3: Extracting Post Details
From each selected row, extract:
- `#` → Post ID
- `Blog Post Topic` → Title
- `Keywords` → Parse ST (short-tail), MT (medium-tail), LT (long-tail)
- `Type` → Content type (Listicle, How-to, Deep Dive, etc.)
- `Words` → Target word count
- `Priority` → Publishing priority
- Category → From section heading
- Category slug → From the metadata under section

### Step 4: Status Update Format
Replace the status in the table row:
```
| 📝 |  →  | ✍️ Writing |
```

### Step 5: Passing Context to /blog-master
When invoking /blog-master, provide:
```
Topic: [Exact title from Blog Post Topic column]
Category: [category slug from section metadata]
Primary Keywords: [ST keywords]
Secondary Keywords: [MT keywords]  
Long-tail Keywords: [LT keywords]
Content Type: [Type column value]
Target Word Count: [Words column value]
```

### Step 6: Final Status Update
After validation passes, replace:
```
| ✍️ Writing |  →  | ✅ |
```

### Step 7: Changes Log Entry
Add at the bottom of the Changes Log table:
```markdown
| [Today's Date] | Published #[ID]: [Title] via /blog-from-plan workflow |
```

---

## 🔧 Error Handling (Automated)

### No Unpublished Posts Found
```
⚠️ No blog posts available to create.

All posts in content-ideas.md are either:
- ✅ Already published
- ✍️ Currently being written
- 🔍 Under review

Workflow complete. No action taken.
```

### Not Enough Posts for Batch
```
⚠️ Requested 5 posts, but only 3 P1 posts available.

Auto-adjusting: Will create 3 posts instead.
⚡ Proceeding automatically...
```

### Post Already In Progress
```
Found post with ✍️ status: #5

Auto-action: Resume from where it stopped.
⚡ Proceeding automatically...
```

### /blog-master Workflow Fails
```
❌ Blog creation failed during [phase name].

Error: [error details]

Auto-action: Marking status as 🔍 Review
Continuing to next post in batch...
```

---

## 🔗 Related Workflows

- `/blog-master` - The core blog creation orchestrator (uses speed optimizations)
- `/blog-research` - Deep topic research (parallel execution + AI model cache)
- `/blog-outline` - Content structure planning
- `/blog-writer` - Draft creation (quick checks + internal link index)
- `/blog-reviewer` - Quality enhancement
- `/blog-validator` - Quality gate
- `/blog-quality-standards` - Central quality reference

### ⚡ Speed Optimization Support Files

These files are used by sub-workflows for faster execution:

```
.agent/ai-models-current.json          ← Pre-verified AI model versions (refresh weekly)
blogpost-content-plan/internal-link-index.json  ← Fast internal linking lookup
```

**After publishing:** Remember to update the internal link index with the new post!

---

*Last updated: 2026-01-10*
*Mode: Fully Automated (no confirmation prompts)*
*Optimized: References speed optimization support files*
