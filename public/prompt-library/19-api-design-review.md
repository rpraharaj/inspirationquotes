# Prompt #19: API Design Review

**Category:** Code Review & Quality
**Best AI Tool:** Claude 4 Opus
**Difficulty:** Intermediate
**Use Case:** API development  

---

## 📋 Prompt Template

```
Act as an API architect specializing in REST and OpenAPI.

CONTEXT:
- Endpoints: [list routes]
- Response Schema: [paste sample JSON]
- Users: [Internal / Public / 3rd Party]

TASK - Audit the interface:

Step 1: VERB & NAMING CONSISTENCY
Check for semantic resource naming (nouns, not verbs) and idempotent methods.

Step 2: HYPERMEDIA & LINKING
Suggest HATEOAS or better relationship linking.

Step 3: VERSIONING & PAGINATION
Audit the lifecycle strategy.

OUTPUT FORMAT:

## API Consistency Report
- [Finding 1]
- [Finding 2]

## Revised Schema
[Standardized response structure]

## Versioning Strategy
[Suggested approach]
```

---

## ✅ When to Use This Prompt

- ✅ API development  
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
