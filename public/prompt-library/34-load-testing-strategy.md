# Prompt #34: Load Testing Strategy

**Category:** Testing & QA
**Best AI Tool:** Claude 4 Opus
**Difficulty:** Intermediate
**Use Case:** Performance testing planning  

---

## 📋 Prompt Template

```
Act as a site reliability engineer (SRE).

CONTEXT:
- architecture: [describe services]
- users: [target concurrent load]
- critical paths: [e.g., Checkout, Search]

TASK - Design the stress test:

Step 1: WORKLOAD MODELING
Identify the ratio of read/write operations.

Step 2: FAILURE THRESHOLDS
Define when the system is considered "down" (e.g., latency > 500ms).

OUTPUT FORMAT:

## Test Plan
- [Tool]: [e.g., k6 / Locust]
- Scenarios: [Description]

## Thresholds (SLO/SLA)
- [Metric]: [Limit]
```

---

## ✅ When to Use This Prompt

- ✅ Performance testing planning  
- ✅ You want to ensure consistency and quality
- ✅ You need a structured output from the AI

## ❌ When NOT to Use

- ❌ You haven't reviewed the strict requirements
- ❌ You need a quick, throwaway answer (this prompt is detailed)

---

## 💡 Pro Tips

- **Context Matters:** Ensure you fill in all the bracketed placeholders like `[language]` or `[code]`.

- **Iterate:** If the first result isn't perfect, refine the **Constraints** section.

---

**Last Updated:** 2026-01-17
