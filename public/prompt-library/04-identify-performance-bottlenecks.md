# Prompt #4: Identify Performance Bottlenecks

**Category:** Debugging & Troubleshooting
**Best AI Tool:** Claude 4 Opus (most thorough analysis)
**Difficulty:** Intermediate
**Use Case:** When your function works but is too slow  

---

## 📋 Prompt Template

```
Act as a performance engineer specializing in [language].

CONTEXT:
- Target function: [paste code]
- Scale: processing [e.g., 1 million records]
- Current speed: [X ms/sec]
- Target speed: [Y ms/sec]
- Hardware/Runtime: [e.g., Node.js 20 on 2vCPU]

TASK - Identify and resolve bottlenecks:

Step 1: HOT PATH ANALYSIS
Identify the exact operations consuming the most CPU cycles or memory.

Step 2: OPTIMIZATION STRATEGIES
Provide 3 specific optimizations:
1. Low-hanging fruit (quick wins)
2. Algorithmic change (highest impact)
3. Micro-optimization (edge case gains)

Step 3: BENCHMARKING
Suggest how to measure the improvement.

OUTPUT FORMAT:

## Bottleneck Analysis
[Identify the slowest parts of the code]

## Optimization 1: [Short Title]
**Change:** [Description]
**Expected Gain:** [e.g., 20%]
**Code:** [indented example]

## Optimization 2 & 3: [Same structure]

## Verification
- [ ] Measure before/after with [Tool]
- [ ] Stress test with [Input Size]
```

---

## ✅ When to Use This Prompt

- ✅ When your function works but is too slow  
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
