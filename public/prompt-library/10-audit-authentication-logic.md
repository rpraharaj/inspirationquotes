# Prompt #10: Audit Authentication Logic

**Category:** Debugging & Troubleshooting
**Best AI Tool:** Claude 4 Opus
**Difficulty:** Intermediate
**Use Case:** Authentication implementation review  

---

## 📋 Prompt Template

```
Act as an Identity and Access Management (IAM) security expert.

CONTEXT:
- Auth Flow: [e.g., JWT Login]
- Code: [paste login/session logic]
- Tech: [e.g., Passport.js / custom auth]

TASK - Security review of auth logic:

Step 1: CRYPTO CHECK
Verify hashing algorithms (bcrypt/argon2) and salt rounds.

Step 2: SESSION SECURITY
Check for cookie flags (HttpOnly/Secure) or JWT expiry/rotation.

OUTPUT FORMAT:

## Security Findings
1. [Missing Rate Limiting]
2. [Weak Hashing]
3. [Infinite Session Duration]

## Recommended Fixes
[Step-by-step hardened code]
```

---

## ✅ When to Use This Prompt

- ✅ Authentication implementation review  
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
