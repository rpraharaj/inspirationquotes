---
description: Automated workflow to pick the next blog post from content-ideas.md, create it using /blog-master, and update status
---

// turbo-all

# 📋 Blog From Plan Workflow

Automatically creates blog posts from the content plan by:
1. Reading the content-ideas.md file
2. Identifying unpublished blog posts (P1 priority first, then status = 📝)
3. Creating posts using the /blog-master workflow
4. Updating the content-ideas.md with the new status

**Supports batch creation!** Create multiple posts in one go.

---

## 🚀 Invocation

| Command | Behavior |
|---------|----------|
| `/blog-from-plan` | Creates **1** blog post (default) |
| `/blog-from-plan 3` | Creates the next **3** blog posts sequentially |
| `/blog-from-plan 5` | Creates the next **5** blog posts sequentially |
| `/blog-from-plan all` | Creates **all remaining P1** priority posts |
| `/blog-from-plan all-p2` | Creates all remaining **P1 and P2** priority posts |

### Examples

```bash
# Create just the next post
/blog-from-plan

# Create the next 3 posts in P1 priority order
/blog-from-plan 3

# Create all remaining P1 posts (be careful - could be many!)
/blog-from-plan all
```

---

## 📍 File Locations

| File | Path |
|------|------|
| **Content Ideas Database** | `blogpost-content-plan/content-ideas.md` |
| **Blog Master Workflow** | `.agent/workflows/blog-master.md` |
| **Published Posts** | `src/content/blog/[slug].md` |
| **Working Drafts** | `blog-drafts/[slug]/` |

---

## 🔄 Single Post Execution Flow

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
│              STEP 3: CONFIRM SELECTION                    │
│                                                          │
│   Display to user:                                       │
│                                                          │
│   📝 Next Blog Post to Create:                           │
│   ─────────────────────────────                          │
│   ID: [#]                                                │
│   Title: [Blog Post Topic]                               │
│   Category: [category name]                              │
│   Type: [content type]                                   │
│   Keywords: [primary keyword]                            │
│   Target Words: [word count]                             │
│   Priority: [P1/P2/P3]                                   │
│                                                          │
│   Proceed with creation? (Y/N)                           │
│                                                          │
└──────────────────────────┬───────────────────────────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
         ┌─────────┐             ┌─────────┐
         │   NO    │             │   YES   │
         └────┬────┘             └────┬────┘
              │                       │
              ▼                       ▼
      Ask user which               Continue
      post to create               to Step 4
      instead
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
│  Update status to:       │  │  STEP 6: UPDATE STATUS   │
│  🔍 Review               │  │  TO PUBLISHED            │
│                          │  │                          │
│  Fix issues and          │  │  In content-ideas.md:    │
│  re-run validation       │  │  Change Status to: ✅     │
│                          │  │                          │
│  Then continue to        │  │  Add to URL & Links table│
│  Step 6 when passed      │  │  at the top of document  │
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

## 🔁 Batch Mode Execution Flow

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
│              STEP 1: COUNT AVAILABLE POSTS                │
│                                                          │
│   Read content-ideas.md and count:                       │
│   • Posts with status = 📝                               │
│   • Filter by priority based on mode                     │
│                                                          │
│   Display summary:                                       │
│   ┌─────────────────────────────────────────────┐        │
│   │ 📊 Batch Mode Summary                       │        │
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
│   │ Proceed? (Y/N)                              │        │
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

## 🛑 Batch Mode: Handling Failures

If a post fails validation during batch mode:

```
┌─────────────────────────────────────────────────────────┐
│ ⚠️ Post 2/3 Failed Validation                          │
│ ─────────────────────────────                          │
│ ID: #7                                                 │
│ Title: LangChain Agents Tutorial                       │
│ Reason: Word count below minimum (3,200 < 4,000)       │
│                                                        │
│ Options:                                               │
│ 1. Fix and retry this post                             │
│ 2. Skip this post and continue with remaining          │
│ 3. Stop batch and fix manually                         │
│                                                        │
│ Choose (1/2/3):                                        │
└─────────────────────────────────────────────────────────┘
```

### Failure Behavior Options

| Choice | Behavior |
|--------|----------|
| **1. Fix and retry** | Agent attempts to fix the issue and re-validate |
| **2. Skip and continue** | Mark as 🔍 Review, continue to next post |
| **3. Stop batch** | End batch, provide summary of completed posts |

---

## 📊 Batch Mode: Progress Tracking

During batch execution, maintain a progress state:

```
┌─────────────────────────────────────────────────────────┐
│ 📊 Batch Progress                                       │
│ ═══════════════════════════════════════════════════    │
│ [████████████░░░░░░░░] 2/3 posts (67%)                 │
│                                                        │
│ ✅ #5  Multi-Agent Systems Explained     COMPLETE      │
│ ✅ #7  LangChain Agents Tutorial         COMPLETE      │
│ ⏳ #8  CrewAI Tutorial                   IN PROGRESS   │
│    └── Phase: Writing (3/5)                            │
│                                                        │
│ Time elapsed: 45 minutes                               │
│ Estimated remaining: ~25 minutes                       │
└─────────────────────────────────────────────────────────┘
```

---

## 📝 Status Values Reference

| Status | Meaning | When Set |
|--------|---------|----------|
| 📝 | Idea (not started) | Initial state |
| ✍️ Writing | Currently being written | Step 4 (before /blog-master) |
| 🔍 Review | Under review/fixing issues | If validation fails |
| ✅ | Published | Step 6 (after validation passes) |

---

## 📋 URL & Internal Links Table Update

When a post is published, add a row to the tracking table at the top of content-ideas.md:

```markdown
| ID | Status | URL | Links To (Post IDs) | Date Published |
|----|--------|-----|---------------------|----------------|
| [ID] | ✅ | /blog/[slug] | [comma-separated IDs] | [YYYY-MM-DD] |
```

The "Links To" column should contain IDs of posts that are internally linked within the new post.

---

## ⚠️ Agent Instructions

### Parsing Batch Arguments

```python
# Parse the argument after /blog-from-plan
argument = user_input.split()[1] if len(user_input.split()) > 1 else None

if argument is None:
    batch_count = 1
elif argument.isdigit():
    batch_count = int(argument)
elif argument == "all":
    # Count all P1 posts with status = 📝
    batch_count = count_available_posts(priority="P1")
elif argument == "all-p2":
    # Count all P1 and P2 posts with status = 📝
    batch_count = count_available_posts(priority=["P1", "P2"])
else:
    # Invalid argument
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
- Category → From the section heading (e.g., "AI Agents" from "## 1. AI Agents")
- Category slug → From the metadata under section (e.g., `ai-agents`)

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
or
```
| ✍️ |  →  | ✅ |
```

### Step 7: Changes Log Entry
Add at the bottom of the Changes Log table:
```markdown
| [Today's Date] | Published #[ID]: [Title] via /blog-from-plan workflow |
```

For batch mode, add one entry per post created.

---

## 🔧 Error Handling

### No Unpublished Posts Found
```
⚠️ No blog posts available to create.

All posts in content-ideas.md are either:
- ✅ Already published
- ✍️ Currently being written
- 🔍 Under review

To add new content ideas, update:
blogpost-content-plan/content-ideas.md
```

### Not Enough Posts for Batch
```
⚠️ Requested 5 posts, but only 3 P1 posts available.

Options:
1. Create all 3 available P1 posts
2. Include P2 posts to reach 5
3. Cancel and review content plan

Choose (1/2/3):
```

### Post Already In Progress
```
⚠️ Found post with ✍️ status:

ID: [#]
Title: [title]
Status: ✍️ Writing

This post appears to be in progress.
Options:
1. Continue with this post
2. Mark as 📝 and start fresh
3. Skip and select next P1 post

Choose an option:
```

### /blog-master Workflow Fails
```
❌ Blog creation failed during [phase name].

Error: [error details]

The content-ideas.md status remains: ✍️ Writing

To retry:
1. Fix the issue
2. Continue from where it stopped, or
3. Run /blog-from-plan again (will resume with same post)
```

---

## 📊 Example Executions

### Example 1: Single Post (Default)

```
> /blog-from-plan

📖 Reading content-ideas.md...

📝 Next Blog Post to Create:
─────────────────────────────
ID: 5
Title: Multi-Agent Systems Explained: How AI Agents Work Together
Category: ai-agents
Type: Deep Dive
Keywords: multi agent systems, ai agent collaboration
Target Words: 4000+
Priority: P1

Proceed with creation? (Y/N)
> Y

✍️ Updating status to "Writing"...

🚀 Executing /blog-master workflow...

[... blog-master workflow executes ...]

✅ Blog Post Created Successfully!
─────────────────────────────────
ID: 5
Title: Multi-Agent Systems Explained: How AI Agents Work Together
Status: ✅ Published
File: src/content/blog/multi-agent-systems-explained.md
URL: /blog/multi-agent-systems-explained

📝 Updated content-ideas.md:
- Status changed to ✅
- Added to URL & Links table
- Added to Changes Log

Run /blog-from-plan again to create the next post.
```

### Example 2: Batch Mode (3 Posts)

```
> /blog-from-plan 3

📖 Reading content-ideas.md...

📊 Batch Mode Summary
─────────────────────────────
Requested: 3 posts
Available P1 posts: 12
Available P2 posts: 25

Posts to create:
1. #5 - Multi-Agent Systems Explained (ai-agents)
2. #7 - LangChain Agents Tutorial (ai-agents)
3. #8 - CrewAI Tutorial (ai-agents)

Proceed with batch creation? (Y/N)
> Y

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 Creating Post 1/3
─────────────────────────────
ID: #5 | Multi-Agent Systems Explained
├── 📖 Research...     ✅ Complete
├── 📝 Outline...      ✅ Complete
├── ✍️ Writing...      ✅ Complete
├── 🔍 Review...       ✅ Complete
├── ✓ Validation...   ✅ PASSED
└── 📊 Status → ✅

✅ Post 1/3 Complete!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 Creating Post 2/3
─────────────────────────────
ID: #7 | LangChain Agents Tutorial
├── 📖 Research...     ✅ Complete
├── 📝 Outline...      ✅ Complete
├── ✍️ Writing...      ✅ Complete
├── 🔍 Review...       ✅ Complete
├── ✓ Validation...   ✅ PASSED
└── 📊 Status → ✅

✅ Post 2/3 Complete!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 Creating Post 3/3
─────────────────────────────
ID: #8 | CrewAI Tutorial
├── 📖 Research...     ✅ Complete
├── 📝 Outline...      ✅ Complete
├── ✍️ Writing...      ✅ Complete
├── 🔍 Review...       ✅ Complete
├── ✓ Validation...   ✅ PASSED
└── 📊 Status → ✅

✅ Post 3/3 Complete!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Batch Complete!
─────────────────────────────

Created: 3/3 posts

| # | Title                              | Status |
|---|---------------------------------------|--------|
| 5 | Multi-Agent Systems Explained         | ✅     |
| 7 | LangChain Agents Tutorial             | ✅     |
| 8 | CrewAI Tutorial                       | ✅     |

Files created:
• src/content/blog/multi-agent-systems-explained.md
• src/content/blog/langchain-agents-tutorial.md
• src/content/blog/crewai-tutorial.md

Next steps:
• npm run dev (preview all)
• npm run deploy
• Submit URLs to Google Search Console

Remaining P1 posts: 9
Run /blog-from-plan to continue.
```

### Example 3: Create All P1 Posts

```
> /blog-from-plan all

📖 Reading content-ideas.md...

📊 Batch Mode: ALL P1 Posts
─────────────────────────────
Available P1 posts: 12

⚠️ This will create 12 blog posts.
Estimated time: ~4-6 hours

Posts to create:
1. #5 - Multi-Agent Systems Explained
2. #7 - LangChain Agents Tutorial
3. #8 - CrewAI Tutorial
... and 9 more

Proceed? (Y/N)
> Y

[... batch execution begins ...]
```

---

## 🔗 Related Workflows

- `/blog-master` - The core blog creation orchestrator
- `/blog-research` - Deep topic research
- `/blog-outline` - Content structure planning
- `/blog-writer` - Draft creation
- `/blog-reviewer` - Quality enhancement
- `/blog-validator` - Quality gate

---

*Last updated: 2026-01-08*
