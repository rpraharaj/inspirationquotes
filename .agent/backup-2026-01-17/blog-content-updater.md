---
description: Batch update low-content blog posts with enhanced prose, internal/external links following Google guidelines
---

# Blog Content Updater Workflow

This standalone workflow updates code-heavy blog posts that have thin content issues (low word count visible to Google). It operates in batch mode, generating enhancement drafts for review before applying changes.

## Prerequisites

- `blogpost-content-plan/low-content-blogs.md` must exist with identified posts
- `blogpost-content-plan/update-progress.json` tracks completion status
- Blog posts are in `src/content/blog/`

---

## Workflow Execution

### Step 1: Initialize Progress Tracking

Check if `blogpost-content-plan/update-progress.json` exists. If not, create it by scanning `low-content-blogs.md` for all posts with issues.

The progress file structure:
```json
{
  "lastUpdated": "ISO-date",
  "totalPosts": 21,
  "completed": 0,
  "posts": {
    "slug": {
      "status": "pending|in-progress|review|completed",
      "priority": "severe|moderate|mild",
      "wordsBefore": number,
      "wordsNeeded": number,
      "wordsAfter": number|null,
      "draftFile": "path-to-draft|null",
      "completedAt": "ISO-date|null"
    }
  }
}
```

### Step 2: Select Posts for Batch Processing

Ask user how many posts to process in this batch:
- **Recommended:** 3-5 posts per batch for manageable review
- Posts are selected by priority order (severe → moderate → mild)
- Only select posts with status "pending"

### Step 3: Analyze and Generate Enhancements (Per Post)

For each selected post, perform these sub-steps:

#### 3a. Read and Analyze Current Post

1. Read the full blog post from `src/content/blog/{slug}.md`
2. Extract:
   - Current frontmatter (title, description, category, tags)
   - Content structure (headings, sections)
   - Existing internal links
   - Existing external links
   - Writing style characteristics (tone, sentence length, formatting patterns)
   - Code block locations and languages

3. Calculate current word count (visible to Google, excluding code)

#### 3b. Read Enhancement Recommendations

Read the specific recommendations for this post from `blogpost-content-plan/low-content-blogs.md`:
- Sections to add
- Content to expand
- Internal links to add
- External links to add
- Word count targets per section

#### 3c. Generate Enhancement Draft

Create enhancements that:

**CRITICAL - Voice Matching Rules:**
1. Analyze the first 3 paragraphs of existing prose for voice characteristics:
   - Sentence length (short/medium/long)
   - Use of "I", "we", "you" 
   - Technical depth level
   - Formatting patterns (bold, bullets, callouts)
2. Match these characteristics in all generated content
3. Do NOT use phrases like "Let's dive in", "In this section", or other filler
4. Use the same heading style (## vs ###, with/without emoji)

**Enhancement Types to Generate:**

| Type | Location | Content |
|------|----------|---------|
| **Introduction Expansion** | After first paragraph | What You'll Learn, Use Cases |
| **Code Explanations** | Before/after code blocks | Purpose, Key Points, Pitfalls |
| **New Sections** | Logical placement | Troubleshooting, Best Practices, FAQs |
| **Internal Links** | Within relevant paragraphs | Contextual links with descriptive anchor text |
| **External Links** | Near related content | Links to official documentation |

#### 3d. Create Draft File

Save the enhancement draft to:
`blogpost-content-plan/enhancement-drafts/{slug}-enhancements.md`

Draft file format:
```markdown
# Enhancement Draft: {title}

**Generated:** {date}
**Current Word Count:** {words} (visible to Google)
**Target Word Count:** 1500+
**Words to Add:** {needed}

---

## Voice Analysis

{summary of detected voice characteristics}

---

## Enhancement 1: {type}

**Location:** {where to insert - after line X or section Y}
**Words Added:** {count}

### Content to Add:

{the actual content}

---

## Enhancement 2: {type}
...

---

## New Internal Links

| Anchor Text | Target | Insert Location |
|-------------|--------|-----------------|
| {text} | /blog/{slug} | {paragraph/section} |

---

## New External Links

| Anchor Text | URL | Insert Location |
|-------------|-----|-----------------|
| {text} | {url} | {paragraph/section} |

---

## Summary

- Total words added: {sum}
- New word count: {before + added}
- New internal links: {count}
- New external links: {count}
```

#### 3e. Update Progress

Update `update-progress.json`:
- Set status to "review"
- Set draftFile path

### Step 4: Present Drafts for Review

After generating all drafts in the batch:

1. List all generated draft files with summary stats
2. Instruct user to review drafts in: `blogpost-content-plan/enhancement-drafts/`
3. User can:
   - Approve draft as-is → proceed to apply
   - Edit draft file → then approve
   - Reject draft → mark as pending, skip this round

Ask user which drafts to approve (comma-separated slugs or "all").

### Step 5: Apply Approved Enhancements

For each approved draft:

#### 5a. Parse Draft File

Read the enhancement draft and extract:
- Each enhancement with its location
- New internal links with insertion points
- New external links with insertion points

#### 5b. Apply to Blog Post

**IMPORTANT: Make changes carefully to preserve existing content**

1. Read the original blog post
2. For each enhancement:
   - Find the specified insertion location
   - Insert the new content
   - Maintain proper spacing and formatting
3. For new links:
   - Find the specified paragraph
   - Insert links contextually within existing sentences OR
   - Add as new sentences if more appropriate
4. Update frontmatter:
   - Set `updatedDate: {today's date in YYYY-MM-DD}`

#### 5c. Validate Changes

After applying:
1. Recalculate visible word count
2. Verify target (1500+) is met
3. Check all internal links resolve to existing posts
4. Ensure no markdown syntax errors

If validation fails, report issues and do not mark as complete.

### Step 6: Update Progress and Documentation

#### 6a. Update Progress JSON

```json
{
  "status": "completed",
  "wordsAfter": {new count},
  "completedAt": "{ISO date}"
}
```

#### 6b. Update low-content-blogs.md

Find the post in the implementation checklist and mark as complete:

Change:
```markdown
- [ ] {slug} - Add ~{X} words
```

To:
```markdown
- [x] {slug} - ✅ Updated {date} (now {words} words)
```

#### 6c. Regenerate Analytics

Run:
```bash
npm run build-analytics
```

To update the dashboard with new word counts.

### Step 7: Report Summary

Display batch completion summary:
```
=== BATCH COMPLETE ===

Posts Updated: X/Y approved

| Post | Before | After | Links Added |
|------|--------|-------|-------------|
| slug | 633    | 1520  | 4 internal, 3 external |

Remaining posts with issues: Z

Next batch: Run /blog-content-updater again
```

---

## Quality Guidelines

### Content Quality Rules

1. **Value First**: Every added sentence must provide new information
2. **No Filler**: Avoid phrases like:
   - "In this section, we will..."
   - "Let's take a look at..."
   - "As we mentioned earlier..."
3. **Specific > Generic**: Use concrete examples, not abstract descriptions
4. **Expert Context**: Add information only an expert would know
5. **Actionable**: Include practical tips readers can immediately use

### Link Quality Rules

**Internal Links:**
- Use descriptive anchor text (NOT "click here" or "this article")
- Link to genuinely related content
- Aim for 3-8 per post
- Place naturally within paragraphs

**External Links:**
- Prefer official documentation (.io, .dev, .org)
- Link to primary sources, not aggregators
- Use rel="noopener" for security (automatic in Astro)
- Avoid competitors' blog posts

### Code Explanation Rules

**Before Code Block:**
- 1-2 sentences explaining WHAT the code does
- 1 sentence explaining WHEN to use this pattern

**After Code Block:**
- "Key Points" or "Important" callout with 2-3 bullets
- Common error and how to fix it (if applicable)
- Link to related pattern or deeper explanation

---

## Troubleshooting

### Draft Generation Issues

**Problem:** Generated content doesn't match voice
**Solution:** Manually edit the draft file before approving

**Problem:** Wrong insertion location
**Solution:** Edit the "Location" field in the draft to specify exact line number or heading

### Application Issues

**Problem:** Word count still below target after applying
**Solution:** Draft file may need more enhancements - add manually or regenerate

**Problem:** Internal link target doesn't exist
**Solution:** Remove the link or find alternative target post

---

## Example Execution

```
User: /blog-content-updater

Agent: Checking progress...
Found 21 posts with thin content issues.
Completed: 0 | Remaining: 21

How many posts to process in this batch? [default: 5]

User: 5

Agent: Selecting 5 highest priority posts:
1. mcp-github-server (633 words, severe)
2. mcp-enterprise-security (684 words, severe)
3. ai-function-calling-snippets (715 words, severe)
4. langchain-code-snippets (718 words, severe)
5. prompt-template-code (750 words, severe)

Analyzing and generating enhancements...

[Progress: 1/5] mcp-github-server
- Analyzing current content and voice...
- Reading enhancement recommendations...
- Generating draft enhancements...
- Draft saved: enhancement-drafts/mcp-github-server-enhancements.md

[Progress: 2/5] mcp-enterprise-security
...

=== DRAFTS GENERATED ===

Please review the drafts in: blogpost-content-plan/enhancement-drafts/

| Post | Words Now | Words Added | New Links |
|------|-----------|-------------|-----------|
| mcp-github-server | 633 | +892 | 4+3 |
| mcp-enterprise-security | 684 | +834 | 4+3 |
...

Which drafts to approve? [all | comma-separated slugs | none]

User: all

Agent: Applying approved enhancements...

[1/5] Applying to mcp-github-server...
- Inserted 5 enhancements
- Added 4 internal links
- Added 3 external links
- Updated frontmatter
- Validating... ✅ Now 1525 words visible

...

=== BATCH COMPLETE ===
Successfully updated 5 posts.
Remaining: 16 posts

Run `npm run build-analytics` to update dashboard.
```
