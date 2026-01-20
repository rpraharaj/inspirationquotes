# Prompt #2: Debug This TypeError/NoneType Error

**Category:** Debugging & Troubleshooting
**Best AI Tool:** GPT-5 (best at reasoning through type systems)  
**Difficulty:** Intermediate
**Use Case:** Type-related bugs that aren't immediately obvious  

---

## 📋 Prompt Template

```
You are a senior [language] debugging specialist focusing on type safety.

CONTEXT:
- Error: '[exact error text]'
- Code causing error: [paste 20-30 lines including error line + context]
- Stack trace: [paste complete trace]
- Expected type: [e.g., Dict[str, Any]]
- Actual type received: [e.g., NoneType or str]
- Source of value: [e.g., API response, database query, user input]

TASK - Analyze this type mismatch:

Step 1: ROOT CAUSE IDENTIFICATION
Trace where the incorrect type originates:
- Is it from external input (API, DB, user)?
- Is it from internal function logic?
- Is there a missing validation step?

Step 2: WHY THIS HAPPENED
Explain the failure scenario:
- What condition causes [Expected] to be [Actual] instead?
- Is this an edge case or common scenario?
- Why didn't existing checks catch this?

Step 3: DEFENSIVE FIXES
Provide 3 solutions with increasing robustness.

OUTPUT FORMAT:

## Root Cause
[Where the NoneType/wrong type originates]

## Failure Scenario
[What specific condition triggers this]

## Solution 1: Immediate Fix (5 minutes)
**What to change:** [Add type checking at point of error]
**Code:** [Show before/after with defensive check]

## Solution 2: Proper Validation (15 minutes - Recommended)
**What to change:** [Validate at data entry point]
**Code:** [Show input validation approach]

## Solution 3: Type Safety Enhancement (30 minutes)
**What to change:** [Implement type system improvements]
**Code:** [Show type-safe version with hints/runtime validation]

## Prevention Strategy
To avoid this in future:
- [Specific type checking pattern to adopt]
- [Tool recommendation: mypy, TypeScript strict, etc.]
```

---

## ✅ When to Use This Prompt

- ✅ Type-related bugs that aren't immediately obvious  
- ✅ You want to ensure consistency and quality
- ✅ You need a structured output from the AI

## ❌ When NOT to Use

- ❌ You haven't reviewed the strict requirements
- ❌ You need a quick, throwaway answer (this prompt is detailed)

---

## 💡 Pro Tips

- **Context Matters:** Ensure you fill in all the bracketed placeholders like `[language]` or `[code]`.
- **Expert Note:** Always include both expected AND actual types - helps AI understand the mismatch
- **Iterate:** If the first result isn't perfect, refine the **Constraints** section.

---

**Last Updated:** 2026-01-17
