# Prompt #11: Comprehensive Code Review

**Category:** Code Review & Quality
**Best AI Tool:** Claude 4 Opus (most thorough, catches subtle issues)  
**Difficulty:** Intermediate
**Use Case:** Pre-pull-request self-review  

---

## 📋 Prompt Template

```
You are a principal software engineer conducting a comprehensive code review.

CONTEXT:
- Code to review: [paste code - include line numbers if possible]
- Purpose: [What this code does]
- Usage frequency: [Once at startup / Every request / Background job]
- Team experience: [Junior / Mixed / Senior]

REVIEW PRIORITY ORDER:

1. CRITICAL (Must fix before merge)
   - Bugs, security vulnerabilities, performance issues >100ms

2. IMPORTANT (Should fix)
   - Maintainability problems, readability issues, missing error handling

3. SUGGESTIONS (Nice-to-have)
   - Idiomatic improvements, minor optimizations

OUTPUT FORMAT:

## 🔴 CRITICAL ISSUES (Merge Blockers)

Found: [count]

### Issue #1: [Title]
**Lines:** [line numbers]
**Category:** [Bug / Security / Performance]
**Problem:** [Describe the issue]
**Impact:** [What breaks / How severe]
**Fix:** [Show corrected code]
**Effort:** [5min / 15min / 30min / 1hr]

## 🟡 IMPORTANT ISSUES

Found: [count]
[Same structure as Critical]

## 🟢 SUGGESTIONS

Found: [count]
[Same structure, lighter weight]

## Summary
- Critical: [count] - Must fix
- Important: [count] - Should fix
- Suggestions: [count]
- **Merge recommendation:** [Ready after fixes / Needs refactoring / Good to go]
- **Total fix time:** [estimated hours for Critical + Important]

## ✅ Positive Aspects
[Always list 2-3 things the code does well]
```

---

## ✅ When to Use This Prompt

- ✅ Pre-pull-request self-review  
- ✅ You want to ensure consistency and quality
- ✅ You need a structured output from the AI

## ❌ When NOT to Use

- ❌ You haven't reviewed the strict requirements
- ❌ You need a quick, throwaway answer (this prompt is detailed)

---

## 💡 Pro Tips

- **Context Matters:** Ensure you fill in all the bracketed placeholders like `[language]` or `[code]`.
- **Expert Note:** Prioritized feedback is more actionable - fix Critical first, then Important
- **Iterate:** If the first result isn't perfect, refine the **Constraints** section.

---

**Last Updated:** 2026-01-17
