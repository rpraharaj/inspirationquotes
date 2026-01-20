# Prompt #41: Design Scalable Architecture

**Category:** Architecture & Design
**Best AI Tool:** Claude 4 Opus  
**Difficulty:** Intermediate
**Use Case:** New project architecture  

---

## 📋 Prompt Template

```
I'm building a [type of application] for [scale expectations].

CONSTRAINTS:
- Budget: [$X/month for infrastructure]
- Team size: [number] developers
- Timeline: [MVP in X months]
- Technical expertise: [list current team skills]
- Scale targets: [concurrent users, requests/sec, data volume]

APPLICATION REQUIREMENTS:
- Core features: [list 3-5 main features]
- Performance: [response time requirements]
- Availability: [uptime requirement - e.g., 99.9%]
- Security: [data sensitivity level]

REQUEST:
Suggest 2-3 architecture options ranked by [priority: cost/speed/scalability/simplicity].

For each architecture option, provide:

OUTPUT FORMAT:

## Architecture Option 1: [Name] (Recommended for [use case])

###Component Breakdown
- Frontend: [technology + why]
- Backend: [technology +why]
- Database: [technology + why]
- Cache: [technology + why]
- Infrastructure: [cloud provider + services]

### Estimated Costs
- Development time: [X weeks]
- Monthly running cost at scale: [$Y]
- Initial setup cost: [$Z]

### Complexity Level
[Simple / Moderate / Complex]

### Team Skills Required
- [Skill 1: Required proficiency level]
- [Skill 2: Required proficiency level]

### Pros
- [Benefit 1]
- [Benefit 2]
- [Benefit 3]

### Cons
- [Trade-off 1]
- [Trade-off 2]

### Migration Path
If this architecture needs to change:
- [How to scale up if it succeeds]
- [How to scale down if needed]

## Architecture Options 2-3
[Same structure]

## Recommendation
Based on your constraints:
- [Recommended option]
- [Why this over others]
- [What you're optimizing for]
- [What you're sacrificing]
```

---

## ✅ When to Use This Prompt

- ✅ New project architecture  
- ✅ You want to ensure consistency and quality
- ✅ You need a structured output from the AI

## ❌ When NOT to Use

- ❌ You haven't reviewed the strict requirements
- ❌ You need a quick, throwaway answer (this prompt is detailed)

---

## 💡 Pro Tips

- **Context Matters:** Ensure you fill in all the bracketed placeholders like `[language]` or `[code]`.
- **Expert Note:** AI often over-engineers - bias toward simplicity for MVPs, complexity for growth phase
- **Iterate:** If the first result isn't perfect, refine the **Constraints** section.

---

**Last Updated:** 2026-01-17
