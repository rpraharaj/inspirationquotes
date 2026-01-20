# Prompt #5: Fix Memory Leaks

**Category:** Debugging & Troubleshooting
**Best AI Tool:** GPT-5 (good at event loop and closure analysis)
**Difficulty:** Intermediate
**Use Case:** Memory grows unbounded over time  

---

## 📋 Prompt Template

```
Act as a memory management expert for [language/runtime].

CONTEXT:
- Symptoms: [describe memory growth, e.g., "heap grows linearly"]
- Duration: [how long before OOM]
- Code: [paste relevant blocks - include closures, event listeners, loops]
- Environment: [e.g., Browser/Node.js/JVM]

TASK - Root cause analysis:

Step 1: LEAK IDENTIFICATION
Find where references are being held unnecessarily.

Step 2: FIX RECOMMENDATION
Provide the most surgical fix to release memory.

Step 3: PREVENTION
Suggest a pattern to avoid this in the future.

OUTPUT FORMAT:

## Root Cause
[Explain why memory isn't being garbage collected]

## Fix Recommendation
**Step 1:** [Action]
**Step 2:** [Action]
**Code:** [Clear before/after]

## Success Metric
- Monitor [Heap/RSS] over [Time]
```

---

## ✅ When to Use This Prompt

- ✅ Memory grows unbounded over time  
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
