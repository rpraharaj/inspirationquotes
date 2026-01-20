# Prompt #46: Architecture Anti-Pattern Check

**Category:** Architecture & Design
**Best AI Tool:** Claude 4 Opus
**Difficulty:** Intermediate
**Use Case:** Architecture review  

---

## 📋 Prompt Template

```
Act as a software quality consultant.

CONTEXT:
- Architecture: [describe, e.g., "All components share one big database"]
- Symptom: [e.g., One service change breaks another]

TASK - Detect anti-patterns:

Step 1: SMELL DETECTION
Identify God Objects, Tight Coupling, or Circular Deps.

Step 2: RESOLUTION PLAN
Suggest how to break the dependencies.

OUTPUT FORMAT:

## Anti-Pattern Detection
- [Pattern]: [Risk]

## Decoupling Strategy
[Path forward]
```

---

## ✅ When to Use This Prompt

- ✅ Architecture review  
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
