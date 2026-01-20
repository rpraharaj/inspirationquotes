# Prompt #13: Refactoring Suggestions

**Category:** Code Review & Quality
**Best AI Tool:** Claude 4 Sonnet
**Difficulty:** Intermediate
**Use Case:** Technical debt reduction  

---

## 📋 Prompt Template

```
Act as a software architect focused on clean code.

CONTEXT:
- Focus: [Maintainability / Performance / Readability]
- Code: [paste code]
- Language Style: [e.g., Functional / OOP]

TASK - Refactor for quality:

Step 1: SMELL DETECTION
Identify exactly which clean code principles are violated.

Step 2: REFACTORED VERSION
Provide a cleaner, more modular version.

OUTPUT FORMAT:

## Current Debt
[List what makes this code hard to change]

## The Refactor
[Cleaner code block]

## Benefits
- [Improved Testability]
- [Reduced Cognitive Load]
```

---

## ✅ When to Use This Prompt

- ✅ Technical debt reduction  
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
