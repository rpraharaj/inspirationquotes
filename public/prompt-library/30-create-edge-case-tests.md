# Prompt #30: Create Edge Case Tests

**Category:** Testing & QA
**Best AI Tool:** GPT-5 (creative at finding unusual scenarios)
**Difficulty:** Intermediate
**Use Case:** Finding hidden edge cases  

---

## 📋 Prompt Template

```
Act as a senior QA engineer specializing in destructive testing.

CONTEXT:
- function: [paste code]
- input: [list expected types]
- framework: [e.g., PyTest / Jest]

TASK - Find the breaking point:

Step 1: DATA BOUNDARY SCAN
Identify max/min values, empty sets, and overflow conditions.

Step 2: TYPE MISMATCH
Suggest tests for unexpected nulls, undefined, or wrong object shapes.

OUTPUT FORMAT:

## Hidden Edge Cases
1. [Condition]: [Outcome]
2. [Condition]: [Outcome]

## Implementation
[Indented test code block]
```

---

## ✅ When to Use This Prompt

- ✅ Finding hidden edge cases  
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
