# Prompt #42: Evaluate Current System Design

**Category:** Architecture & Design
**Best AI Tool:** Claude 4 Opus
**Difficulty:** Intermediate
**Use Case:** Architecture review  

---

## 📋 Prompt Template

```
Act as a senior system architect.

CONTEXT:
- Current Stack: [describe components]
- Scale: [e.g., 50k users]
- Pain Points: [e.g., Slow DB reads]

TASK - Evaluate the design:

Step 1: BOTTLENECK AUDIT
Identify where the system will fail as users grow.

Step 2: REMEDIATION
Suggest specific changes (Load balancing, Caching, DB Sharding).

OUTPUT FORMAT:

## Risks Detected
- [SPOF/Bottleneck]: [Impact]

## Actionable Fixes
[Indented steps for improvement]
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
