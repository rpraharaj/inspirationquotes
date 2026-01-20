# Prompt #32: Integration Test Generation

**Category:** Testing & QA
**Best AI Tool:** Claude 4 Opus
**Difficulty:** Intermediate
**Use Case:** API integration testing  

---

## 📋 Prompt Template

```
Act as a full-stack developer.

CONTEXT:
- Endpoint: [paste code]
- DB: [e.g., PostgreSQL]
- External Auth: [e.g., Auth0 / Supabase]

TASK - Design the integration flow:

Step 1: ENVIRONMENT SETUP
Suggest mocks for external services while keeping the DB interaction real.

Step 2: SUCCESS & FAILURE FLOWS
Draft tests for 200 OK, 4xx Validation, and 5xx Database errors.

OUTPUT FORMAT:

## Setup & Tear-down
[Implementation for DB migration/seeding]

## Integration Suite
[Indented test code]
```

---

## ✅ When to Use This Prompt

- ✅ API integration testing  
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
