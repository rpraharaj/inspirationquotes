---
description: Generate and view the Blog Analytics Dashboard with post metrics, SEO scores, and link analysis
---

# Blog Analytics Dashboard Workflow

This workflow generates comprehensive analytics for all blog posts and serves an interactive dashboard for content management.

## Prerequisites

- Node.js installed
- Blog posts exist in `src/content/blog/`

## Quick Start (Recommended)

// turbo
1. **Generate analytics and serve dashboard in one command:**
```bash
npm run serve-dashboard
```

This will:
- Scan all 180+ blog posts
- Calculate word counts, internal/external links, SEO scores
- Generate `blogpost-content-plan/blog-analytics.json`
- Serve the dashboard at http://localhost:3333/internal-link-dashboard.html

## Manual Steps

### Step 1: Generate Analytics Data

// turbo
Run the analytics builder script:
```bash
npm run build-analytics
```

**Output:** Creates/updates `blogpost-content-plan/blog-analytics.json` with:
- Post metadata (title, category, tags, dates)
- Word counts (excluding code blocks)
- Internal links (outgoing + incoming)
- External links with domains
- SEO scores (0-100) with detailed breakdown
- Orphan page detection (posts with no incoming links)
- Hub page detection (posts with 10+ outgoing links)

### Step 2: Serve the Dashboard

// turbo
Start the local server:
```bash
npx serve blogpost-content-plan -l 3333
```

### Step 3: Open Dashboard

Open in browser: http://localhost:3333/internal-link-dashboard.html

## Dashboard Features

### Tab 1: Overview
- **Summary Cards:** Total posts, words, links, avg SEO score
- **SEO Distribution Chart:** Excellent/Good/Needs Work/Poor breakdown
- **Category Distribution:** Posts per category with bar chart
- **Quick Stats:** Top orphan pages and hub pages

### Tab 2: Posts & Filters
Advanced filtering options:
- Search by title or slug
- Filter by category
- Filter by SEO status (Excellent 80+, Good 60-79, Needs Work 40-59, Poor <40)
- Filter by status (Orphan, Hub, Featured, Missing Image, No FAQ)
- Range filters: Word count, internal links, external links
- Filter by difficulty level
- Filter by featured image presence
- Filter by FAQ section presence

### Data Table Features
- Sortable columns (click headers)
- Expandable rows (click ▶) showing:
  - Incoming links (who links to this post)
  - Outgoing links (what this post links to)
  - External links with domains
  - SEO score breakdown (9 factors, 100 points total)
- CSV export for filtered data

## SEO Score Breakdown (100 points)

| Factor | Max Points | Scoring |
|--------|------------|---------|
| Title Length | 15 | 50-60 chars = 15, 40-50 or 60-70 = 10, else = 5 |
| Meta Description | 15 | 150-160 chars = 15, 120-150 or 160-180 = 10, else = 5 |
| Word Count | 20 | ≥4000 = 20, ≥3500 = 15, ≥2500 = 10, ≥1500 = 5, else = 2 |
| Internal Links (To) | 15 | ≥5 = 15, ≥3 = 12, ≥2 = 8, 1 = 5, 0 = 0 |
| External Links | 10 | ≥3 = 10, 2 = 8, 1 = 5, 0 = 0 |
| Featured Image | 10 | Present = 10, Missing = 0 |
| FAQ Section | 5 | Present = 5, Missing = 0 |
| Category | 5 | Present = 5, Missing = 0 |
| Tags | 5 | 3-5 tags = 5, 2 = 3, 1 = 2, 0 = 0 |

## Files Involved

| File | Purpose |
|------|---------|
| `scripts/build-blog-analytics.cjs` | Node.js script that scans posts and generates JSON |
| `blogpost-content-plan/blog-analytics.json` | Generated analytics data (auto-updated) |
| `blogpost-content-plan/internal-link-dashboard.html` | Interactive HTML dashboard |

## Common Use Cases

### 1. Find Orphan Pages to Fix
1. Open dashboard → Tab 1 (Overview)
2. Check "Orphan Pages" section
3. These posts have zero incoming internal links
4. Add internal links from related posts to improve discoverability

### 2. Identify Low SEO Score Posts
1. Open dashboard → Tab 2 (Posts & Filters)
2. Filter by SEO Score: "Needs Work" or "Poor"
3. Click ▶ to expand each post and see specific issues
4. Prioritize fixes: word count, internal links, meta description

### 3. Check Category Distribution
1. Open dashboard → Tab 1 (Overview)
2. View "Posts by Category" chart
3. Identify underrepresented categories for future content

### 4. Export Data for Analysis
1. Open dashboard → Tab 2 (Posts & Filters)
2. Apply any desired filters
3. Click "Export CSV" button
4. Open in Excel/Google Sheets for further analysis

## Troubleshooting

### Dashboard shows old data
Re-run the analytics generator:
```bash
npm run build-analytics
```
Then refresh the browser.

### Port 3333 already in use
Kill existing process or use a different port:
```bash
npx serve blogpost-content-plan -l 3334
```

### Posts showing wrong category
Check the frontmatter uses `category:` (singular) not `categories:` (plural):
```yaml
# Correct
category: "ai-tools"

# Wrong (won't be recognized)
categories:
  - ai-tools
```

## Maintenance

- **After publishing new posts:** Run `npm run build-analytics` to update the JSON
- **Dashboard is developer-only:** Not deployed to production website
- **Data freshness:** Analytics JSON includes timestamp of last generation
