# Prompt #28: Regex Pattern Generator

**Category:** Code Generation & Scaffolding
**Best AI Tool:** GPT-5 (detects ReDoS vulnerabilities)  
**Difficulty:** Intermediate
**Use Case:** Input validation  

---

## 📋 Prompt Template

```
Act as a regex development specialist.

CONTEXT:
- target: [e.g., Extracting ISO 8601 dates from logs]
- language: [e.g., Python / JS / Go]
- format: [e.g., YYYY-MM-DDTHH:mm:ssZ]

TASK - Create a robust regex:

Step 1: PATTERN LOGIC
Define the capturing groups and character classes needed.

Step 2: EDGE CASE VALIDATION
Ensure it handles leap years, single digits, or optional fields.

Step 3: SECURITY CHECK (ReDoS)
Ensure the pattern avoids catastrophic backtracking loops.

OUTPUT FORMAT:

## Regex Pattern
[Indented regex string]

## Explanation
- [Component 1]: [Purpose]
- [Component 2]: [Purpose]

## Test Results
- ✅ Matches: [3 positive examples]
- ❌ Rejects: [3 negative examples]

## Security Note
- [Safe/Unsafe] for user input (Time Complexity)
```

---

## ✅ When to Use This Prompt

- ✅ Input validation  
- ✅ You want to ensure consistency and quality
- ✅ You need a structured output from the AI

## ❌ When NOT to Use

- ❌ You haven't reviewed the strict requirements
- ❌ You need a quick, throwaway answer (this prompt is detailed)

---

## 💡 Pro Tips

- **Context Matters:** Ensure you fill in all the bracketed placeholders like `[language]` or `[code]`.
- **Expert Note:** Always test regex patterns thoroughly. AI sometimes creates patterns that match 99% correctly and fail on edge cases.
- **Iterate:** If the first result isn't perfect, refine the **Constraints** section.

---

**Last Updated:** 2026-01-17
