# Author Consistency System

This document explains the safeguards in place to ensure all blog posts use the correct author: **"Inspiration Quotes Hub"**

---

## 🛡️ Safeguards in Place

### 1. **Schema Default Value**
**File:** `src/content.config.ts`

The Astro content schema has a default value for the author field:

```typescript
author: z.string().default('Inspiration Quotes Hub')
```

**What this does:**
- Any new blog post created without an author field will automatically get "Inspiration Quotes Hub"
- Provides type safety and validation at build time

---

### 2. **Workflow Templates**
**File:** `.agent/workflows/blog-templates.md`

The blog template used by all blog creation workflows includes:

```yaml
author: "Inspiration Quotes Hub"
```

**What this does:**
- Ensures all AI-generated blog posts use the correct author
- Referenced by `/blog-master`, `/blog-writer`, and other workflows

---

### 3. **Validation Script**
**File:** `scripts/validate-authors.js`

Run with: `npm run validate:authors`

**What this does:**
- Checks all blog posts in `src/content/blog/`
- Validates that each post has `author: "Inspiration Quotes Hub"`
- Reports any missing or incorrect author fields
- Exit code 0 = all valid, Exit code 1 = errors found

**Example output:**
```bash
🔍 Validating author field in 120 blog posts...

✅ All blog posts have the correct author!

   Author: "Inspiration Quotes Hub"
   Posts validated: 120
```

---

### 4. **Fix Script**
**File:** `scripts/update-authors.js`

Run with: `npm run fix:authors`

**What this does:**
- Automatically updates all blog posts to use the correct author
- Handles both incorrect authors and missing author fields
- Safe to run multiple times (idempotent)

**Example output:**
```bash
Found 120 blog posts to check...

✅ Updated: some-post.md
   "Rajesh Praharaj" → "Inspiration Quotes Hub"

==================================================
✨ Update Complete!
==================================================
📊 Summary:
   • Total posts checked: 120
   • Posts updated: 84
   • Already correct: 36
   • Target author: "Inspiration Quotes Hub"
```

---

## 🔄 Recommended Workflow

### For New Blog Posts
1. Use the `/blog-master` workflow - it automatically uses the correct author
2. If creating manually, the schema default will apply
3. Run `npm run validate:authors` before committing

### For Existing Blog Posts
1. Run `npm run validate:authors` to check
2. If errors found, run `npm run fix:authors` to auto-fix
3. Verify with `npm run validate:authors` again

### Before Deployment
Add to your CI/CD pipeline or pre-commit hook:
```bash
npm run validate:authors
```

This will fail the build if any posts have incorrect authors.

---

## 📝 Manual Override (If Needed)

If you ever need to use a different author for a specific post:

```yaml
---
title: "Post Title"
author: "Guest Author Name"  # Override the default
---
```

The schema allows this, but the validation script will flag it.

---

## 🔍 Troubleshooting

### Issue: Validation fails after creating a new post

**Solution:**
```bash
npm run fix:authors
```

### Issue: Want to check a single file

**Solution:**
```bash
grep "^author:" src/content/blog/your-post.md
```

### Issue: Schema default not working

**Solution:**
- Ensure you're using Astro's content collections
- Check that `src/content.config.ts` is properly imported
- Restart the dev server: `npm run dev`

---

## 📊 Current Status

As of **2026-02-08**:
- ✅ All 120 blog posts validated
- ✅ Schema default set to "Inspiration Quotes Hub"
- ✅ Workflow templates updated
- ✅ Validation and fix scripts in place

---

## 🎯 Summary

**You have 4 layers of protection:**

1. **Schema default** - Automatic for new posts
2. **Workflow templates** - AI workflows use correct author
3. **Validation script** - Check for consistency
4. **Fix script** - Auto-correct any issues

**To maintain consistency:**
- Run `npm run validate:authors` regularly
- Use `/blog-master` workflow for new posts
- Add validation to your CI/CD pipeline

---

*Last updated: 2026-02-08*
