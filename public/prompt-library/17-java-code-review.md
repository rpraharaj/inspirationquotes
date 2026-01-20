# Prompt #17: Java Code Review

**Category:** Code Review & Quality
**Best AI Tool:** Claude 4 Opus
**Difficulty:** Intermediate
**Use Case:** General Coding

---

## 📋 Prompt Template

```
Act as a staff engineer specializing in Java and Spring Boot.

CONTEXT:
- Target Code: [paste code]
- Java Version: [e.g., Java 21]
- Framework: [e.g., Spring Boot 3 / Jakarta EE]

TASK - Solid review:

Step 1: DESIGN PATTERN CHECK
Identify if the correct pattern (Factory, Singleton, Stream) is applied.

Step 2: RESOURCE MANAGEMENT
Audit for try-with-resources and proper closure of streams/connections.

Step 3: MODERN JAVA (17/21)
Recommend using Records, Switch Expressions, or Virtual Threads (if applicable).

OUTPUT FORMAT:

## SOLID Principles Audit
- [S/O/L/I/D status]

## Resource Management
[Findings on leak prevention]

## Refactored Java [Version]
[Improved code block]
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
