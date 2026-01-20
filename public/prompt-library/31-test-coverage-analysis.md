# Prompt #31: Test Coverage Analysis

**Category:** Testing & QA
**Best AI Tool:** Claude 4 Sonnet
**Difficulty:** Intermediate
**Use Case:** Improving test coverage  

---

## 📋 Prompt Template

```
Act as a test automation lead.

CONTEXT:
- project code: [paste main logic]
- current tests: [paste existing test suite]
- framework: [e.g., Vitest / Go Test]

TASK - Close the coverage gap:

Step 1: BRANCH COVERAGE
Identify which if/else/switch paths are not being hit.

Step 2: ADDITIONAL TESTS
Write the missing scenarios to hit 100% path coverage.

OUTPUT FORMAT:

## Coverage Gaps
- [File/Line]: [Description of missing path]

## New Test Scenarios
[Complete test code for missing paths]
```

---

## ✅ When to Use This Prompt

- ✅ Improving test coverage  
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
