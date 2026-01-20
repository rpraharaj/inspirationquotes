# 📁 Blog Drafts

This folder contains working files for blog posts in progress.

## 📋 Folder Structure

```
blog-drafts/
├── [post-slug]/                    # One folder per blog post
│   ├── 01-research-brief.md        # Research phase output
│   ├── 02-outline.md               # Outline phase output
│   ├── 03-draft-v1.md              # First draft
│   ├── 04-reviewed-draft.md        # Reviewed/enhanced draft
│   ├── 05-review-report.md         # Review changes report
│   ├── 06-validation-report.md     # Validation results
│   └── assets/                     # Images for this post
│
└── _templates/                     # Blank templates
    ├── research-brief-template.md
    └── outline-template.md
```

## 🔄 Workflow Integration

These files are created automatically by the blog workflows:

| Workflow | Creates |
|----------|---------|
| `/blog-research` | `01-research-brief.md` |
| `/blog-outline` | `02-outline.md` |
| `/blog-writer` | `03-draft-v1.md` |
| `/blog-reviewer` | `04-reviewed-draft.md` + `05-review-report.md` + final in `src/content/blog/` |
| `/blog-validator` | `06-validation-report.md` |

## ⚠️ Important Notes

1. **Git Ignored**: All files except templates are ignored by git
2. **Final posts**: Published posts go to `src/content/blog/`, not here
3. **Clean up**: Delete folders after posts are published
4. **Resume work**: Reference these files to continue work on a post

## 🗑️ Cleanup

After publishing a post, you can delete its folder:
```bash
rm -rf blog-drafts/[post-slug]/
```

Or keep it for reference - it won't be committed to git.
