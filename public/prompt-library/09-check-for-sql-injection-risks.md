# Prompt #9: Check for SQL Injection Risks

**Category:** Debugging & Troubleshooting
**Best AI Tool:** Claude 4 Sonnet
**Difficulty:** Intermediate
**Use Case:** Before deploying user-facing database features  

---

## 📋 Prompt Template

```
Act as a database security specialist.

CONTEXT:
- DB Driver: [e.g., pg-node / mysql2]
- Input Source: [e.g., req.body.username]
- Code: [paste code]

TASK - Audit for SQL Injection:

Step 1: INPUT TRACING
Follow the input from source to the final query execution.

Step 2: PARAMETERIZATION CHECK
Verify if variables are escaped or using bound parameters.

OUTPUT FORMAT:

## Risk Level: [Critical/Safe]
**Finding:** [Direct string concatenation found at Line X]
**Secure Rewrite:** [Properly parameterized query]
```

---

## ✅ When to Use This Prompt

- ✅ Before deploying user-facing database features  
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
