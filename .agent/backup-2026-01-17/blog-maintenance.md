---
description: Maintenance workflow to refresh AI model cache and update internal link index after publishing new posts
---

# 🔧 Blog Maintenance Workflow

Maintenance tasks for keeping the speed optimization support files up to date.

---

## 📋 When to Run

| Task | Trigger |
|------|---------|
| **Refresh AI Model Cache** | Weekly (every Monday) OR after major AI announcements |
| **Update Internal Link Index** | After publishing any new blog post |

---

## 🤖 Task 1: Refresh AI Model Cache

**File:** `.agent/ai-models-current.json`
**Frequency:** Weekly

### Steps

1. **Check current date against `lastUpdated`**
   - If within 7 days and no major announcements, skip
   - If older than 7 days OR major announcement, proceed

2. **Search for latest model information:**
   ```
   "OpenAI GPT latest model [current month year]"
   "Claude Anthropic latest model [current month year]"
   "Google Gemini latest model [current month year]"
   "Meta Llama latest model [current month year]"
   ```

3. **Update the cache file:**
   - Update `lastUpdated` to today's date
   - Update `nextRefreshDue` to 7 days from now
   - Update model versions if changed
   - Update `outdatedReferences` section if new transitions

4. **Verification:**
   - Ensure JSON is valid
   - All major providers covered
   - Deprecated models list is accurate

---

## 🔗 Task 2: Update Internal Link Index

**File:** `blogpost-content-plan/internal-link-index.json`
**Frequency:** After each new post is published

### Steps

1. **Get new post information:**
   - Slug
   - Title
   - Category
   - Primary keyword
   - 2-3 suggested anchor texts

2. **Add to `byCategory` section:**
   ```json
   {"slug": "new-post-slug", "title": "New Post Title", "anchors": ["anchor 1", "anchor 2", "anchor 3"]}
   ```

3. **Add to `byKeyword` section:**
   - Add slug to relevant keyword arrays
   - Create new keyword entries if needed

4. **Update metadata:**
   - Increment `totalPosts` count
   - Update `lastUpdated` date

### Quick Add Template

```json
// Add to appropriate category in byCategory:
{"slug": "[slug]", "title": "[title]", "anchors": ["[anchor1]", "[anchor2]", "[anchor3]"]}

// Add slug to relevant keywords in byKeyword:
"[keyword]": [...existing..., "[slug]"]
```

---

## 📊 Maintenance Checklist

### Weekly (Monday)

- [ ] Check AI Model Cache age
- [ ] Search for major AI announcements from past week
- [ ] Update cache if needed
- [ ] Verify JSON validity

### After Each Publish

- [ ] Add new post to Internal Link Index (`byCategory`)
- [ ] Add new post to relevant keywords (`byKeyword`)
- [ ] Update `totalPosts` count
- [ ] Consider adding to `topAnchorSuggestions` if noteworthy

### Monthly

- [ ] Review Internal Link Index for accuracy
- [ ] Remove any deleted posts
- [ ] Add new suggested anchors for popular posts
- [ ] Audit `byKeyword` for missing mappings

---

## ⚠️ Agent Instructions

1. **For AI Model Cache:** Only update if cache is stale OR major announcement confirmed
2. **For Internal Link Index:** Always update after successful publish
3. **JSON Validation:** Always verify files are valid JSON after updates
4. **Backup:** If making major changes, keep backup of previous version

---

*Last updated: 2026-01-10*
*Purpose: Keep speed optimization support files current*
