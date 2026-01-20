# Prompt #20: React Component Review

**Category:** Code Review & Quality
**Best AI Tool:** GPT-5
**Difficulty:** Intermediate
**Use Case:** Frontend performance optimization  

---

## 📋 Prompt Template

```
Act as a React performance specialist and state management expert.

CONTEXT:
- Component: [paste code]
- State Source: [e.g., Redux / Context / Local]
- Expected Load: [e.g., List of 500 items]

TASK - Optimize the UI logic:

Step 1: RE-RENDER SCAN
Identify missing memoization (useMemo/useCallback) or expensive calculations.

Step 2: HOOKS AUDIT
Check dependency arrays and custom hook logic.

Step 3: PROP DRILLING CHECK
Suggest alternative state flows (Context/Zustand) if applicable.

OUTPUT FORMAT:

## Performance Bottlenecks
- [Render trigger]: [Solution]

## Hook Audit
[Corrected hook usage]

## Optimized Component
[Indented code block]
```

---

## ✅ When to Use This Prompt

- ✅ Frontend performance optimization  
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
