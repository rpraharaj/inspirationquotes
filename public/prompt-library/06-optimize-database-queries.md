# Prompt #6: Optimize Database Queries

**Category:** Debugging & Troubleshooting
**Best AI Tool:** Claude 4 Sonnet (strong SQL knowledge)  
**Difficulty:** Intermediate
**Use Case:** Slow database operations  

---

## 📋 Prompt Template

```
You are a database performance expert specializing in [database: PostgreSQL/MySQL/etc.].

CONTEXT:
- Database: [PostgreSQL 14 / MySQL 8.0 / etc.]
- Table size: [X million rows]
- Query execution time: [Y seconds - target: Z seconds]
- Slow query: [paste complete SQL]
- Current indexes: [list all indexes on relevant tables]
- EXPLAIN output: [paste if available]
- Query frequency: [how often this runs]

TASK - Optimize this query:

Step 1: ANALYZE CURRENT PERFORMANCE
- Identify full table scans
- Find missing or unused indexes
- Detect inefficient JOINs
- Check for N+1 query patterns

Step 2: PROPOSE OPTIMIZATIONS
Provide 3-4 optimization strategies ranked by impact.

Step 3: INDEX STRATEGY
Recommend specific indexes with justification.

OUTPUT FORMAT:

## Performance Analysis
**Current bottlenecks:** [What's slow and why]
**EXPLAIN insights:** [Key findings from query plan]

## Optimization 1: [Strategy Name] (Expected: 70% faster)
**Change:** [What to modify in the query]
**Optimized Query:**
[Paste improved SQL]
**Why faster:** [Explanation]
**Trade-offs:** [Any downsides]

## Optimization 2-3: [Same structure]

## Recommended Indexes
**Index 1:** CREATE INDEX idx_name ON table(column1, column2);
**Justification:** [Why this index helps]
**Impact:** [Estimated improvement]

## Additional Recommendations
- Query caching strategy
- Denormalization opportunities (if applicable)
- Partitioning considerations (for very large tables)
```

---

## ✅ When to Use This Prompt

- ✅ Slow database operations  
- ✅ You want to ensure consistency and quality
- ✅ You need a structured output from the AI

## ❌ When NOT to Use

- ❌ You haven't reviewed the strict requirements
- ❌ You need a quick, throwaway answer (this prompt is detailed)

---

## 💡 Pro Tips

- **Context Matters:** Ensure you fill in all the bracketed placeholders like `[language]` or `[code]`.
- **Expert Note:** Always include EXPLAIN output - it shows exactly where the bottleneck is
- **Iterate:** If the first result isn't perfect, refine the **Constraints** section.

---

**Last Updated:** 2026-01-17
