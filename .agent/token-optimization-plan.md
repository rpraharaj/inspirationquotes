# 🎯 Blog Master Token Optimization Plan

**Created:** 2026-01-17  
**Purpose:** Reduce token consumption in `/blog-master` workflow while maintaining quality

---

## 📊 Current State Analysis

### Workflow File Sizes

| Workflow | Lines | Est. Tokens* | Purpose |
|----------|-------|-------------|---------|
| `/blog-research` | 603 | ~4,500 | Research, keyword, SERP analysis |
| `/blog-master` | 610 | ~4,600 | Orchestrator |
| `/blog-quality-standards` | 587 | ~4,400 | **Reference doc** (loaded every time) |
| `/blog-outline` | 426 | ~3,200 | Structure planning |
| `/blog-writer` | 445 | ~3,300 | Content generation |
| `/blog-reviewer` | 348 | ~2,600 | 4-pass review |
| `/blog-validator` | 418 | ~3,100 | Quality gate |
| **TOTAL** | **~3,437** | **~25,700** | **Just workflow instructions** |

*Estimated at ~7.5 tokens per line for detailed markdown

### Current Token Consumption Sources

| Source | Est. Tokens | Frequency | Total Impact |
|--------|-------------|-----------|--------------|
| **Workflow instructions** | ~25,700 | 1x per invocation | **25,700** |
| **Quality standards (repeated)** | ~4,400 | Loaded in 5 workflows | **22,000** |
| **Web searches** | ~2,000-3,000 | 8-12 searches | **24,000** |
| **Draft content generation** | ~10,000+ | 1x (4,000 word post) | **10,000+** |
| **Review passes** | ~6,000+ | 4 passes | **6,000+** |
| **Validation** | ~3,000 | 1x full check | **3,000** |
| **Context switching** | ~2,000 | Between workflows | **2,000** |
| **ESTIMATED TOTAL** | | | **~92,700** |

---

## 🎯 Optimization Strategy: 3-Tier Approach

### Tier 1: Quick Wins (Immediate, Zero Quality Impact)
**Target:** 30-40% token reduction  
**Implementation:** 1-2 hours

### Tier 2: Structural Improvements (Moderate Changes)
**Target:** Additional 20-30% reduction  
**Implementation:** 3-4 hours

### Tier 3: Advanced Optimizations (Requires Testing)
**Target:** Additional 10-15% reduction  
**Implementation:** 4-6 hours

---

## 🚀 TIER 1: Quick Wins (30-40% reduction)

### 1.1 Consolidate Repeated References ⭐ HIGH IMPACT

**Problem:** `/blog-quality-standards` is referenced in 5 workflows, re-loading 4,400 tokens each time.

**Solution:** Create a **compact reference card** with essential rules only, keep full doc for deep reference.

#### Implementation:

**File:** `.agent/blog-quality-checklist.md` (NEW, 100-150 lines)

```markdown
# Blog Quality Checklist (Quick Reference)

## Critical Requirements
- Word count: ≥4,000 words
- Internal links: 3-5
- External links: 2-3 (HTML format with target="_blank")
- Human voice score: ≥10/12

## Zero Tolerance (Auto-Fail)
- "In this comprehensive guide..."
- "Whether you're a [X] or a [Y]..."  
- H1 in body content
- Outdated AI models (GPT-4 → should be GPT-5.x)

## Frontmatter Schema
- Use `pubDate` NOT `date`
- Use `category` (string) NOT `categories` (array)
- Use `author` (string) NOT `authors` (array)

Full reference: /blog-quality-standards
```

**Changes Required:**
- Create compact checklist file (~150 lines vs 587)
- Update 5 workflows to reference compact version
- Keep full `/blog-quality-standards` for `/blog-validator` only

**Token Savings:** ~17,600 tokens (4,400 × 4 workflows)

---

### 1.2 Remove Template Duplication ⭐ HIGH IMPACT

**Problem:** Same frontmatter template, section examples, and formats repeated across workflows.

**Solution:** Single template file with examples.

#### Implementation:

**File:** `.agent/blog-templates.md` (NEW, 150 lines)

Contains:
- Frontmatter template (1 version, not 4)
- Section structure examples
- FAQ format
- Link format examples

**Changes Required:**
- Extract all templates to single file
- Update `/blog-outline`, `/blog-writer`, `/blog-reviewer` to reference
- Remove duplicate examples

**Token Savings:** ~4,000 tokens

---

### 1.3 Streamline Workflow Instructions 🔧 MEDIUM IMPACT

**Problem:** Verbose explanations, redundant context, overly detailed examples.

**Current** `/blog-writer` Step 3 (Write Introduction):
```markdown
### Step 3: Write Introduction (200-300 words)

**Formula:**
1. **Hook** - Compelling stat, question, or bold statement (PERSONAL preferred)
2. **Problem** - What challenge does reader face
3. **Promise** - What they'll learn by reading
4. **Credibility** - Why you're qualified (optional)

**Requirements:**
- [ ] Primary keyword in first 100 words
- [ ] No H1 or H2 (just paragraph text)
- [ ] Grabs attention immediately
- [ ] Uses PERSONAL hook, not generic statement

**⚡ Quick Check After Introduction:**
- Count words: Should be 200-300
- Verify keyword appears
- Read aloud: Does it sound human?

---
```

**Optimized Version:**
```markdown
### Step 3: Introduction (200-300 words)

**Formula:** Hook → Problem → Promise (+ Credibility)

**Must include:**
- Primary keyword (first 100 words)
- Personal hook (NOT "In this guide...")
- Paragraph text only (no H1/H2)

Quick check: 200-300 words, keyword present, sounds human
```

**Apply to:** All 6 main workflows

**Token Savings:** ~6,000 tokens

---

### 1.4 Use Lookup Tables for Validation 🔧 MEDIUM IMPACT

**Problem:** `/blog-validator` explains every check in detail.

**Solution:** Transform to checklist format with severity codes.

**Current:**
```markdown
| Check | Requirement | Severity |
|-------|-------------|----------|
| **Title Length** | 50-60 characters | 🔴 Critical |
| **Title Keyword** | Primary keyword present | 🔴 Critical |
| **Meta Description Length** | 150-160 characters | 🔴 Critical |
...
```

**Optimized:**
```markdown
## SEO Checks
- Title: 50-60 chars, keyword front (🔴)
- Meta: 150-160 chars, keyword, CTA (🔴)
- Slug: short-keyword-slug format (🟡)
- H1: via frontmatter only, none in body (🔴)
- H2: ≥1 with keyword (🟡)
- Intro: keyword in first 100 words (🟡)
```

**Token Savings:** ~2,500 tokens

---

### **TIER 1 Total Savings:** ~30,100 tokens (32% reduction)

---

## 🔧 TIER 2: Structural Improvements (20-30% reduction)

### 2.1 Lazy Loading Pattern ⭐ HIGH IMPACT

**Problem:** All workflows load at start, even if not all are needed.

**Solution:** Load workflows only when phase starts.

#### Implementation:

Change `/blog-master` from:
```
- Load all 6 workflows at start
- Execute each phase
```

To:
```
- Load only current phase workflow
- Execute phase
- Unload workflow (clear context)
- Load next phase workflow
```

**How:** Agent reads only the specific workflow file when entering that phase.

**Token Savings:** ~18,000 tokens (only 1 workflow in context vs 6)

---

### 2.2 Parallel Search Optimization 🔧 MEDIUM IMPACT

**Problem:** Web searches return verbose results, many irrelevant.

**Solution:** More focused search queries with result filtering.

#### Implementation:

**Current search:**
```
search_web("AI customer service agents statistics 2025")
→ Returns 2,000-3,000 tokens of results
```

**Optimized search:**
```
search_web("AI customer service market size 2025 Gartner", max_results=3)
→ Returns 800-1,000 tokens, higher relevance
```

**Changes:**
- Add `max_results` parameter to searches
- More specific queries (include source names)
- Request concise answers from search tool

**Token Savings:** ~8,000 tokens

---

### 2.3 Incremental Content Generation 🔧 MEDIUM IMPACT

**Problem:** `/blog-writer` generates 4,000+ word post in one go, loading full outline + research in context.

**Solution:** Section-by-section generation with minimal context.

#### Implementation:

**Current:**
1. Load research brief (1,500 tokens)
2. Load outline (1,000 tokens)
3. Generate entire post (10,000+ tokens generated)

**Optimized:**
1. Load minimal context: title, keyword, category (200 tokens)
2. For each section:
   - Load section goal + word target (100 tokens)
   - Generate section (500-800 tokens)
   - Save section
   - Clear context
3. Combine sections at end

**Token Savings:** ~4,000 tokens

---

### 2.4 Review Pass Consolidation 🔧 MEDIUM IMPACT

**Problem:** `/blog-reviewer` runs 4 separate passes, re-reading full content each time.

**Solution:** Combine compatible passes, use section-by-section review.

#### Implementation:

**Current:** 4 passes
1. Content Enhancement
2. Humanization
3. Fact-Checking  
4. Citations

**Optimized:** 2 passes
1. Content + Humanization (compatible goals)
2. Fact-Check + Citations (both verify claims)

**Process:** Review section-by-section, not full-doc × 4

**Token Savings:** ~3,000 tokens

---

### **TIER 2 Total Savings:** ~33,000 tokens (36% additional reduction)

---

## 🧪 TIER 3: Advanced Optimizations (10-15% reduction)

### 3.1 Smart Caching System ⭐ HIGH IMPACT

**Problem:** Repeated searches for same information (e.g., "latest GPT model").

**Solution:** Cache common search results for 7 days.

#### Implementation:

**File:** `.agent/search-cache.json`

```json
{
  "lastUpdated": "2026-01-17",
  "caches": {
    "ai-models": {
      "query": "latest OpenAI GPT model January 2026",
      "result": "GPT-5.2 released Dec 2025, 200K context",
      "cached": "2026-01-15",
      "expiresIn": 7
    },
    "seo-stats": {
      "query": "average blog post length for SEO 2025",
      "result": "3,500-4,500 words for long-form",
      "cached": "2026-01-10",
      "expiresIn": 30
    }
  }
}
```

**Changes:**
- Before web search, check cache
- If < 7 days old, use cached result
- Update cache weekly via `/blog-maintenance`

**Token Savings:** ~6,000 tokens

---

### 3.2 Agent Memory Integration 🔧 MEDIUM IMPACT

**Problem:** Agent re-learns same patterns (e.g., "this user prefers programmatic images").

**Solution:** Store user preferences and workflow patterns.

#### Implementation:

**File:** `.agent/user-preferences.json`

```json
{
  "featuredImages": "programmatic",
  "targetWordCount": 4500,
  "preferredCategories": ["ai-agents", "tutorials"],
  "writingStyle": "technical-with-humor"
}
```

**Token Savings:** ~1,500 tokens

---

### 3.3 Validation Rule Compression 🔧 LOW IMPACT

**Problem:** `/blog-validator` has very long checklists.

**Solution:** Compress to regex patterns + severity codes.

#### Implementation:

Instead of detailed explanations, use:
```yaml
seo:
  - [title, /^.{50,60}$/, "critical"]
  - [keyword_in_title, primary_keyword, "critical"]
  - [meta, /^.{150,160}$/, "critical"]
```

**Token Savings:** ~2,000 tokens

---

### **TIER 3 Total Savings:** ~9,500 tokens (10% additional reduction)

---

## 📊 Total Potential Savings

| Tier | Savings | Effort | Quality Impact |
|------|---------|--------|----------------|
| **Tier 1** | ~30,100 tokens (32%) | 1-2 hours | ✅ None |
| **Tier 2** | ~33,000 tokens (36%) | 3-4 hours | ⚠️ Minimal (needs testing) |
| **Tier 3** | ~9,500 tokens (10%) | 4-6 hours | ⚠️ Low (needs validation) |
| **TOTAL** | **~72,600 tokens (78% reduction)** | **8-12 hours** | **Low to none** |

**New estimated token usage:** ~20,100 tokens (vs current ~92,700)

---

## 🎯 Recommended Implementation Order

### Phase 1: Immediate (Today) - Tier 1 Items 1.1, 1.2
**Time:** 1 hour  
**Savings:** ~21,600 tokens (23%)  
**Risk:** None

1. Create `.agent/blog-quality-checklist.md`
2. Create `.agent/blog-templates.md`
3. Update 5 workflows to reference new files

### Phase 2: This Week - Complete Tier 1
**Time:** 1 hour  
**Savings:** Additional ~8,500 tokens (9%)  
**Risk:** None

4. Streamline all workflow instructions
5. Compress validation tables

### Phase 3: Next Week - Tier 2 Implementation
**Time:** 3-4 hours  
**Savings:** ~33,000 tokens (36%)  
**Risk:** Low (requires testing with 1-2 test posts)

6. Implement lazy loading pattern
7. Optimize search queries
8. Test incremental content generation
9. Combine review passes

### Phase 4: Future Enhancement - Tier 3
**Time:** 4-6 hours  
**Savings:** ~9,500 tokens (10%)  
**Risk:** Medium (requires cache management, testing)

10. Build search cache system
11. Add user preference storage
12. Implement validation compression

---

## ✅ Success Criteria

**Tier 1 Success:**
- [ ] Token usage reduced by 25-35%
- [ ] All existing validations still pass
- [ ] Blog quality unchanged
- [ ] No new errors introduced

**Tier 2 Success:**
- [ ] Token usage reduced by 50-65% total
- [ ] Generated posts pass all quality checks
- [ ] Workflow execution time ≤ same or better
- [ ] Human voice quality maintained

**Tier 3 Success:**
- [ ] Token usage reduced by 70-80% total
- [ ] Cache hit rate >60% on common searches
- [ ] User preferences correctly applied
- [ ] No degradation in content quality

---

## 🚨 Risks & Mitigation

| Risk | Tier | Likelihood | Mitigation |
|------|------|------------|------------|
| Quality degradation | 2, 3 | Medium | Test with 2-3 full posts before deploying |
| Missing critical checks | 1 | Low | Reference full docs in compact checklist |
| Cache staleness | 3 | Medium | 7-day expiry, manual refresh option |
| Incremental generation breaks flow | 2 | Low | Keep full-context option as fallback |

---

## 💡 Additional Recommendations

### A. Monitoring
Create `.agent/metrics.json` to track:
- Token usage per workflow run
- Quality validation pass rate
- Time to complete each phase

### B. Rollback Plan
- Keep original workflows in `.agent/workflows/backup/`
- Version control all changes
- A/B test optimized vs original

### C. User Control
Add flag to `/blog-master`: `/blog-master [topic] --mode=full|optimized`
- `full`: Original workflow (high quality, high tokens)
- `optimized`: New workflow (same quality, low tokens)

---

## 🎬 Next Steps

**For User Review:**
1. Which tier would you like to start with?
2. Any specific concerns about changes?
3. Should we do A/B testing first?

**Recommended:** Start with **Phase 1 (Tier 1, items 1.1 + 1.2)** today for immediate 23% reduction with zero risk.

---

*Plan created: 2026-01-17*  
*Estimated savings: 70-80% token reduction*  
*Quality impact: Minimal to none with proper testing*
