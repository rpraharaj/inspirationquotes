# Prompt #8: Find Security Vulnerabilities

**Category:** Debugging & Troubleshooting
**Best AI Tool:** Claude 4 Opus (most cautious and thorough)  
**Difficulty:** Intermediate
**Use Case:** Pre-deployment security review  

---

## 📋 Prompt Template

```
Act as a cybersecurity professional conducting a static analysis review.

CONTEXT:
- Language: [language]
- Focus: [SQLi, XSS, CSRF, etc.]
- Code: [paste code]

TASK - Scan for vulnerabilities:

Step 1: VULNERABILITY DETECTION
Identify lines that allow untrusted input to hit sensitive sinks.

Step 2: EXPLOIT DEMO
Describe how an attacker would trigger the issue.

Step 3: OWASP MITIGATION
Provide the standard fix.

OUTPUT FORMAT:

## Vulnerability: [Name]
**Severity:** [High/Medium/Low]
**Attack Vector:** [Description]
**Fixed Code:** [indented fixed version]
```

---

## ✅ When to Use This Prompt

- ✅ Pre-deployment security review  
- ✅ You want to ensure consistency and quality
- ✅ You need a structured output from the AI

## ❌ When NOT to Use

- ❌ You haven't reviewed the strict requirements
- ❌ You need a quick, throwaway answer (this prompt is detailed)

---

## 💡 Pro Tips

- **Context Matters:** Ensure you fill in all the bracketed placeholders like `[language]` or `[code]`.
- **Expert Note:** Always have a human security expert verify critical authentication/authorization code
- **Iterate:** If the first result isn't perfect, refine the **Constraints** section.

---

**Last Updated:** 2026-01-17
