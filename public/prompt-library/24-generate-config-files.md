# Prompt #24: Generate Config Files

**Category:** Code Generation & Scaffolding
**Best AI Tool:** GPT-5
**Difficulty:** Intermediate
**Use Case:** Project configuration  

---

## 📋 Prompt Template

```
Act as a DevOps engineer specializing in infrastructure as code.

CONTEXT:
- File Type: [e.g., Dockerfile / K8s Manifest / ESLint]
- stack: [e.g., Node.js + Redis]
- Requirements: [e.g., Non-root user, Multi-stage build]

TASK - Generate optimized config:

Step 1: PRODUCTION HARDENING
Add security headers, non-root users, or limited permissions.

Step 2: LAYER OPTIMIZATION
Reduce image size or group build commands.

OUTPUT FORMAT:

## Optimized [File Type]
[Configuration block]

## Best Practices Followed
- [Security feature 1]
- [Optimization 1]
```

---

## ✅ When to Use This Prompt

- ✅ Project configuration  
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
