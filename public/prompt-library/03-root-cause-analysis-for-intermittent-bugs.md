# Prompt #3: Root Cause Analysis for Intermittent Bugs

**Category:** Debugging & Troubleshooting
**Best AI Tool:** GPT-5 (strongest logical reasoning for complex scenarios)  
**Difficulty:** Intermediate
**Use Case:** Race conditions, async issues, environment-specific bugs  

---

## 📋 Prompt Template

```
You are a production debugging specialist expert in diagnosing intermittent, environment-specific bugs.

CONTEXT:
- Symptom: [What fails - be specific]
- Frequency: [X times per hour/day/week]
- Occurrence pattern: [Random / Time-based / Load-based / User-specific]
- Impact: [System behavior when bug occurs]
- Error logs (last 5 occurrences): [paste with timestamps]

ENVIRONMENT COMPARISON:
Production: [PM2 cluster, 4 workers | Redis cluster | PostgreSQL pool: 20]
Local: [nodemon single process | In-memory cache | Direct DB connection]
Traffic: [Production: 10K req/hour | Local: 10 req/hour]

TASK - Systematic diagnosis:

Step 1: PATTERN DETECTION
Analyze error logs for patterns:
- Are errors clustered in time?
- Do errors correlate with specific inputs?
- Are certain servers/workers more affected?

Step 2: HYPOTHESIS GENERATION
For each possible cause, provide:
- Root cause theory
- Why it only happens in production
- Expected symptoms (match actual?)
- Probability estimate (%)

Step 3: DIAGNOSTIC STRATEGY
For each hypothesis, specify how to confirm/rule out.

OUTPUT FORMAT:

## Pattern Analysis
[Your findings from error logs]

## Top 5 Hypotheses (Ranked by Probability)

### 1. [Cause Name] - 60% probability
**Theory:** [What's happening]
**Why production only:** [Environment factor]
**Evidence for:** [What supports this]
**To diagnose:** [Specific logging to add or test to run]
**To reproduce locally:** [Steps to simulate production condition]

### 2-5. [Same structure]

## Immediate Actions
1. Add these logs (to narrow down next occurrence): [specific log statements]
2. Monitor these metrics: [list metrics]

## Long-term Prevention
[Architectural changes to prevent this class of issues]
```

---

## ✅ When to Use This Prompt

- ✅ Race conditions, async issues, environment-specific bugs  
- ✅ You want to ensure consistency and quality
- ✅ You need a structured output from the AI

## ❌ When NOT to Use

- ❌ You haven't reviewed the strict requirements
- ❌ You need a quick, throwaway answer (this prompt is detailed)

---

## 💡 Pro Tips

- **Context Matters:** Ensure you fill in all the bracketed placeholders like `[language]` or `[code]`.
- **Expert Note:** Include exact timestamps and environment details - patterns emerge from data
- **Iterate:** If the first result isn't perfect, refine the **Constraints** section.

---

**Last Updated:** 2026-01-17
