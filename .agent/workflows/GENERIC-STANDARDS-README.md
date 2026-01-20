# Generic Blog Quality Standards - Usage Guide

## 📄 What Is This?

`blog-quality-standards-GENERIC.md` is a **universal, reusable version** of the blog quality standards used for AI Agents Kit. You can copy this to any website project and customize it for your brand.

## 🎯 Key Differences from AI Agents Kit Version

### Removed Site-Specific Elements:
- ❌ AI Agents Kit branding requirements (black & white theme)
- ❌ www.aiagentskit.com watermark requirements
- ❌ Specific category lists (ai-agents, ai-tools, etc.)
- ❌ Specific author names (AI Agents Kit, Vibe Coder)
- ❌ Fixed 4,000-word minimum (now customizable)

### Added Generic Guidance:
- ✅ Flexible brand color schemes
- ✅ Customizable featured image design
- ✅ Adjustable word count targets
- ✅ Comprehensive customization guide
- ✅ Implementation notes section

### Kept Universal Best Practices:
- ✅ Human voice requirements and scoring
- ✅ AI banned phrases (SEO anti-patterns)
- ✅ Information currency rules
- ✅ E-E-A-T signals
- ✅ Internal/external linking requirements
- ✅ SEO on-page optimization
- ✅ Heading structure rules
- ✅ **No years in URL slugs** (NEW!)

## 🚀 How to Use This Template

### 1. Copy to Your Project

```bash
# Copy the generic version to your new project
cp blog-quality-standards-GENERIC.md /path/to/your/project/.agent/workflows/blog-quality-standards.md
```

### 2. Customize for Your Brand

Open the file and search for these sections to customize:

#### Section 8: Word Count Requirements
```markdown
**Minimum: 2,500-3,000 words** (adjust based on your content strategy)
```
**Action:** Set your target based on niche competitiveness

#### Section 9: SEO On-Page Requirements
Already good to go! No changes needed unless you have specific requirements.

#### Section 11: Featured Image Requirements
```markdown
### Design Guidelines
| Element | Recommendation |
|---------|----------------|
| **Color Scheme** | Use your brand colors consistently |
| **Brand Elements** | Include logo or brand mark |
```
**Action:** 
- Define your brand colors
- Specify logo requirements
- Set watermark text (your domain)

#### Frontmatter Schema
```yaml
---
title: required
description: required
pubDate: required (or "date" - be consistent)
category: required (string or array?)
author: required
# Add your custom fields
---
```
**Action:** Document your exact frontmatter structure

### 3. Define Your Categories

Add a section like:

```markdown
#### Valid Categories
**Your Site Categories:**
`marketing`, `tutorials`, `guides`, `news`, `reviews`
```

### 4. Set Author Format

Define valid author names:

```markdown
#### Valid Authors
| Value | Notes |
|-------|-------|
| `Your Brand Name` | Default author |
| Custom string | Any name as string |
```

## 📊 What Stays Universal

These standards work for **any website** and should NOT be changed:

### ✅ Keep As-Is:
1. **Human Voice Requirements** - Google rewards authentic content
2. **AI Banned Phrases** - These are SEO anti-patterns
3. **Information Currency** - Always use current data
4. **E-E-A-T Signals** - Core to Google's ranking algorithm
5. **External Link Format** - HTML with `target="_blank" rel="noopener"`
6. **Heading Hierarchy** - Never skip levels (H2→H3→H4)
7. **No Years in URLs** - Evergreen URLs perform better long-term

## 🎨 Example Customizations

### For a SaaS Product Blog:
- Word count: 2,000-2,500 (product-focused)
- Categories: `features`, `updates`, `tutorials`, `case-studies`
- Featured images: Product screenshots with brand overlay

### For a Tech News Site:
- Word count: 1,500-2,000 (news-focused)
- Categories: `news`, `analysis`, `reviews`, `opinion`
- Featured images: News-style headers with publication branding

### For a Developer Blog:
- Word count: 3,000-4,000 (in-depth tutorials)
- Categories: `tutorials`, `guides`, `snippets`, `deep-dives`
- Featured images: Code-themed graphics with syntax highlighting aesthetic

## 📝 Maintenance

Update your customized version when:
- Your brand guidelines change
- Google algorithm updates affect SEO best practices
- You expand to new content types
- Analytics show certain standards need adjustment

## 🔗 Related Files

If you're setting up a complete blog workflow system, you'll also want to copy and customize:
- `blog-validator.md` - Quality gate validation
- `blog-quality-checklist.md` - Quick reference for validation
- `blog-writer.md` - Content creation workflow
- `blog-reviewer.md` - Content review workflow

---

**Created:** 2026-01-17  
**Purpose:** Portable, reusable blog quality standards for any website  
**Source:** Based on AI Agents Kit production standards
