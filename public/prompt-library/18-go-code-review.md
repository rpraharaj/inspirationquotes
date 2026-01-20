# Prompt #18: Go Code Review

**Category:** Code Review & Quality
**Best AI Tool:** Claude 4 Sonnet
**Difficulty:** Intermediate
**Use Case:** General Coding

---

## 📋 Prompt Template

```
Act as a Go maintainer specializing in concurrent systems.

CONTEXT:
- Target Code: [paste code]
- Concurrency Level: [e.g., High throughput / Background worker]

TASK - Idiomatic review:

Step 1: ERROR HANDLING
Check if errors are handled immediately and contextually.

Step 2: GOROUTINE SAFETY
Panic check: Are channels closed properly? Is data access synchronized?

Step 3: GO PROVERBS
Align code with "Clear is better than clever."

OUTPUT FORMAT:

## Go Idioms
- [Issue]: [Go Proverbs alignment]

## Concurrency Audit
[Safe/Unsafe findings]

## Idiomatic Go Code
[Optimized version]
```

---

## ✅ When to Use This Prompt

- ✅ When you need this specific task done
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
