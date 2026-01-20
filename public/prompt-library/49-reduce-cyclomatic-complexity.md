# Prompt #49: Reduce Cyclomatic Complexity

**Category:** Refactoring & Optimization
**Best AI Tool:** Claude 4 Sonnet  
**Difficulty:** Intermediate
**Use Case:** Simplifying complex functions  

---

## 📋 Prompt Template

```
Act as a senior reviewer.

CONTEXT:
- Code: [paste deeply nested function]
- Threshold: [e.g., Complexity < 5]

TASK - Simplify:

Step 1: FLATTENING LOGIC
Extract guard clauses and helper functions.

Step 2: MODULAR REWRITE
Break the logic into atomic parts.

OUTPUT FORMAT:

## Re-architected Logic
[Flattered code block]

## Complexity Score
[Before vs After]
```

---

## ✅ When to Use This Prompt

- ✅ Simplifying complex functions  
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
