# Prompt #12: Security Audit

**Category:** Code Review & Quality
**Best AI Tool:** Claude 4 Opus (most security-conscious)  
**Difficulty:** Intermediate
**Use Case:** Before deploying user-facing features  

---

## 📋 Prompt Template

```
You are a security consultant performing a penetration test code review.

CONTEXT:
- Code under audit: [paste code]
- Data sensitivity: [Check all that apply]
  [ ] Handles authentication  
  [ ] Processes user input
  [ ] Accesses databases
  [ ] Stores PII
  [ ] Handles payments
  [ ] Manages sessions

SECURITY SCAN:
Check for OWASP Top 10 vulnerabilities and provide findings.

OUTPUT FORMAT:

## Vulnerabilities Found: [count]

### 🔴 CRITICAL: [Vulnerability Name]
**OWASP Category:** [e.g., A03:2021 – Injection]
**Severity:** Critical
**Exploitability:** [Easy / Medium / Hard]
**Affected Lines:** [line numbers]

**Attack Scenario:**
[Step-by-step: how an attacker exploits this]

**Vulnerable Code:**
[The problematic code]

**Secure Fix:**
[Corrected code with parameterized queries/input validation/etc.]

**Additional Hardening:**
- [Related security measure 1]
- [Related security measure 2]

[Repeat for each vulnerability]

## Security Scorecard
Critical: [count] | High: [count] | Medium: [count] | Low: [count]

## Remediation Roadmap
**Immediate (Deploy blocker):**
1. [Critical fix 1]
2. [Critical fix 2]

**Short-term (This sprint):**
1. [High-severity fixes]

**Long-term (Technical debt):**
1. [Architectural improvements]

⚠️ CRITICAL: AI detects 60-70% of security issues. 
Always have human security expert review auth/payment/PII code before production.
```

---

## ✅ When to Use This Prompt

- ✅ Before deploying user-facing features  
- ✅ You want to ensure consistency and quality
- ✅ You need a structured output from the AI

## ❌ When NOT to Use

- ❌ You haven't reviewed the strict requirements
- ❌ You need a quick, throwaway answer (this prompt is detailed)

---

## 💡 Pro Tips

- **Context Matters:** Ensure you fill in all the bracketed placeholders like `[language]` or `[code]`.
- **Expert Note:** Test AI-suggested fixes in staging - security fixes can sometimes break functionality
- **Iterate:** If the first result isn't perfect, refine the **Constraints** section.

---

**Last Updated:** 2026-01-17
