# 💰 Model Selection & Cost Optimization Guide

**Choosing the right Claude model for each task can save you up to 82% on API costs** while maintaining quality where it matters.

## Model Overview (Claude 4.5 Generation)

| Model | Context Window | Speed | Cost/1M Input | Cost/1M Output | Best For |
|-------|---------------|-------|---------------|----------------|----------|
| **Claude 4.5 Opus** | 200K tokens | Slow | $15 | $75 | Complex reasoning, accuracy-critical tasks |
| **Claude 4.5 Sonnet** | 200K tokens | Fast | $3 | $15 | Balanced quality and speed |
| **Claude 4.0 Haiku** | 200K tokens | Very Fast | $0.25 | $1.25 | Simple tasks, high-volume operations |

## Task-Based Model Selection

### Engineering Tasks

| Task | Agent | Recommended Model | Typical Cost | Reasoning |
|------|-------|-------------------|--------------|-----------|
| **Code Review (<1K lines)** | Frontend/Backend Developer | Sonnet 4.5 | $0.60-$1.50 | Balance for iterative work |
| **Code Review (>1K lines)** | Frontend/Backend Developer | Opus 4.5 | $3-$6 | Deep analysis needed |
| **Architecture Design** | Backend Architect | Opus 4.5 + Extended Thinking | $6-$12 | Multi-faceted trade-offs |
| **API Implementation** | Backend Architect | Sonnet 4.5 | $0.45-$0.90 | Well-defined task |
| **UI Component** | Frontend Developer | Sonnet 4.5 | $0.30-$0.60 | Quality + speed balance |
| **Bug Diagnosis** | Frontend/Backend Developer | Sonnet 4.5 | $0.75-$1.50 | Good debugging with speed |
| **Refactoring** | Frontend/Backend Developer | Sonnet 4.5 | $0.90-$1.80 | Code understanding needed |
| **Security Audit** | Backend Architect | Opus 4.5 | $6-$12 | Can't miss issues |
| **Database Optimization** | Backend Architect | Opus 4.5 | $3.75-$7.50 | Deep query understanding |
| **Mobile App Review** | Mobile App Builder | Sonnet 4.5 | $0.90-$1.80 | Platform guidelines |

### Product & Analytics Tasks

| Task | Agent | Recommended Model | Typical Cost | Reasoning |
|------|-------|-------------------|--------------|-----------|
| **Data Analysis (Simple)** | Analytics Reporter | Sonnet 4.5 | $0.60-$1.20 | Standard analysis |
| **Data Analysis (Complex)** | Analytics Reporter | Opus 4.5 + Extended Thinking | $6-$15 | Multi-variate patterns |
| **User Research Synthesis** | Feedback Synthesizer | Opus 4.5 | $9-$18 | Large qualitative data |
| **Sprint Planning** | Sprint Prioritizer | Sonnet 4.5 | $0.60-$1.20 | Structured prioritization |
| **Trend Research** | Trend Researcher | Opus 4.5 | $6-$15 | Strategic synthesis |
| **Experiment Design** | Growth Hacker | Sonnet 4.5 | $0.45-$0.90 | Statistical rigor |

### Marketing & Content Tasks

| Task | Agent | Recommended Model | Typical Cost | Reasoning |
|------|-------|-------------------|--------------|-----------|
| **Social Media Copy** | TikTok/Instagram/X | Haiku 4.0 | $0.05-$0.10 | Simple, high-volume |
| **Blog Post (Standard)** | Content Creator | Sonnet 4.5 | $0.90-$1.80 | Quality, fast turnaround |
| **Long-Form Content** | Content Creator | Opus 4.5 | $3-$6 | Depth and coherence |
| **SEO Optimization** | Content Creator | Sonnet 4.5 | $0.60-$1.20 | Balance of creativity + SEO |
| **Content Editing** | Content Creator | Haiku 4.0 | $0.10-$0.20 | Quick iterations |

### Operations & Support Tasks

| Task | Agent | Recommended Model | Typical Cost | Reasoning |
|------|-------|-------------------|--------------|-----------|
| **Customer Support** | Support Responder | Haiku 4.0 | $0.05-$0.15 | Fast, empathetic |
| **Complex Escalation** | Support Responder | Sonnet 4.5 | $0.60-$1.20 | Nuance required |
| **Legal/Compliance** | Legal Compliance | Opus 4.5 | $3-$12 | Accuracy critical |
| **System Documentation** | Backend Architect | Opus 4.5 + Extended Thinking | $9-$18 | Comprehensive docs |

### Design & Testing Tasks

| Task | Agent | Recommended Model | Typical Cost | Reasoning |
|------|-------|-------------------|--------------|-----------|
| **Test Case Generation** | API Tester | Sonnet 4.5 | $0.30-$0.75 | Structured output |
| **Performance Analysis** | Performance Benchmarker | Opus 4.5 | $4.50-$9 | Deep bottleneck understanding |
| **Design System Docs** | UI Designer | Sonnet 4.5 | $0.75-$1.50 | Technical accuracy |
| **UX Research Analysis** | UX Researcher | Opus 4.5 | $7.50-$15 | Pattern recognition |
| **Pitch Deck** | Visual Storyteller | Opus 4.5 | $4.50-$9 | Narrative quality critical |

## When to Use Extended Thinking

Extended Thinking adds 20-40 seconds latency but dramatically improves reasoning quality.

### ✅ Always Use Extended Thinking For:

- Architecture decisions with multiple trade-offs
- Complex data analysis with unclear patterns
- Legal/compliance reviews
- Strategic planning (roadmaps, competitive strategy)
- Multi-step problem solving
- System design documentation
- Cost-benefit analysis
- Root cause analysis

### ❌ Don't Use Extended Thinking For:

- Code generation (already excellent without it)
- Simple CRUD operations
- Social media content
- Quick bug fixes
- Routine support responses
- Content editing/proofreading
- Test case generation
- Simple data queries

## Cost Optimization Strategies

### Strategy 1: Prompt Caching (Save 90%)

**How it works:** Cache agent definitions in system prompts to avoid re-processing them.

**Before:**
```
# Every request processes full agent definition
Cost per interaction: $3.00
```

**After (with caching):**
```
# Agent definition cached, only new content processed
Cost per interaction: $0.30
Savings: 90%
```

**Enable for:**
- Long agent definitions
- Large codebases in context
- Frequently accessed documentation
- Repetitive workflows

**Implementation:**
```python
# Use Claude's prompt caching
response = client.messages.create(
    model="claude-4.5-sonnet",
    system=[
        {
            "type": "text",
            "text": agent_definition,
            "cache_control": {"type": "ephemeral"}  # Cache this
        }
    ],
    messages=[...],
)
```

---

### Strategy 2: Model Cascading (Save 87%)

**How it works:** Start with cheap model, escalate only if needed.

**Example Workflow:**
```
Step 1: Haiku for initial draft ($0.10)
├─ IF quality sufficient → Done
└─ IF quality insufficient → Step 2

Step 2: Sonnet for refinement ($0.60)
├─ IF quality sufficient → Done
└─ IF critical task → Step 3

Step 3: Opus for final review ($3.00)

Average cost: $0.40 vs. always Opus ($3) = 87% savings
```

**Best for:**
- Content creation (social → blog → white paper)
- Code generation (prototype → production → critical)
- Support responses (standard → escalation → legal)

---

### Strategy 3: Batch Processing (Save 70%)

**How it works:** Process multiple items in one request instead of separate requests.

**Before (10 separate requests):**
```
10 code reviews × $0.50 each = $5.00
```

**After (1 batch request):**
```
1 request with 10 code snippets = $1.50
Savings: 70%
```

**Implementation:**
```markdown
"Review these 10 code snippets for security issues:

1. [Code snippet 1]
2. [Code snippet 2]
...
10. [Code snippet 10]

Provide security analysis for each."
```

**Best for:**
- Code reviews
- Content editing
- Data analysis
- Test generation

---

### Strategy 4: Smart Context Management (Save 99%)

**How it works:** Don't include unnecessary context in prompts.

**❌ Bad (Wasteful):**
```
# Send entire 50K line codebase for simple bug fix
Cost: $15 for 50K tokens
```

**✅ Good (Efficient):**
```
# Send relevant 500 lines + context description
Cost: $0.15 for 500 tokens
Savings: 99%
```

**Best Practices:**
- Include only relevant files, not entire project
- Summarize large documents instead of including full text
- Use MCP to fetch only needed data
- Reference previous context instead of re-sending

---

## Real-World Monthly Cost Examples

### Solo Developer

| Workflow | Volume | Model Strategy | Monthly Cost |
|----------|--------|----------------|--------------|
| Code reviews | 50/month | Sonnet | $45 |
| Architecture decisions | 4/month | Opus + ET | $40 |
| Bug fixes | 100/month | Sonnet | $50 |
| Documentation | 10/month | Sonnet | $15 |
| **Total** | | **Optimized** | **$150** |

**vs. Always using Opus:** $900/month  
**Savings: 83%**

---

### Small Team (5 people)

| Workflow | Volume | Model Strategy | Monthly Cost |
|----------|--------|----------------|--------------|
| Code reviews | 200/month | Sonnet | $180 |
| Customer support | 1,000/month | Haiku + Sonnet escalations | $60 |
| Content creation | 20 blogs, 100 social | Sonnet + Haiku | $50 |
| Data analysis | 4 deep dives/month | Opus + ET | $60 |
| Architecture reviews | 8/month | Opus + ET | $80 |
| **Total** | | **Optimized** | **$430** |

**vs. Always using Opus:** $2,400/month  
**Savings: 82%**

---

### Agency (20 people)

| Workflow | Volume | Model Strategy | Monthly Cost |
|----------|--------|----------------|--------------|
| Code reviews | 800/month | Sonnet | $720 |
| Client support | 5,000/month | Haiku + Sonnet | $300 |
| Content creation | 80 blogs, 500 social | Mixed | $200 |
| Analytics | 20 reports/month | Opus + Sonnet | $200 |
| Design reviews | 100/month | Sonnet | $150 |
| DevOps automation | 200 builds/month | Sonnet | $180 |
| **Total** | | **Optimized** | **$1,750** |

**vs. Always using Opus:** $9,600/month  
**Savings: 82%**

---

## Cost Optimization Checklist

### Before Each Request

- [ ] **Is this task simple enough for Haiku?** (social media, simple edits)
- [ ] **Can I use Sonnet instead of Opus?** (most coding, standard content)
- [ ] **Do I need Extended Thinking?** (only for complex reasoning)
- [ ] **Can I batch multiple items?** (code reviews, edits, analyses)
- [ ] **Am I including only necessary context?** (not entire codebase)
- [ ] **Is prompt caching enabled?** (agent definitions, documentation)

### Weekly Review

- [ ] **Track API costs** — Monitor spending by task type
- [ ] **Identify expensive patterns** — Which workflows cost most?
- [ ] **Test model downgrades** — Could Sonnet replace Opus anywhere?
- [ ] **Review cached prompts** — Are we caching effectively?
- [ ] **Measure quality** — Is cost optimization affecting output quality?

### Monthly Optimization

- [ ] **Calculate savings** — Compare to baseline (always-Opus scenario)
- [ ] **Share strategies** — Team adoption of optimization practices
- [ ] **Adjust guidelines** — Update task-model mappings based on results
- [ ] **Plan improvements** — Identify next optimization opportunities

---

## Model Selection Decision Tree

```
Start: What type of task?
├─ Simple/Repetitive (social media, simple edits)
│  └─ Use: Haiku 4.0 ($0.25/$1.25)
│
├─ Standard Complexity (most coding, content, analysis)
│  └─ Use: Sonnet 4.5 ($3/$15)
│
└─ Complex/Critical (architecture, legal, deep analysis)
   ├─ Requires multi-step reasoning?
   │  ├─ Yes → Use: Opus 4.5 + Extended Thinking ($15/$75 + ET)
   │  └─ No → Use: Opus 4.5 ($15/$75)
   │
   └─ Can't afford mistakes? (security, legal, compliance)
      └─ Use: Opus 4.5 ($15/$75)
```

---

## Frequently Asked Questions

### Q: When should I always use Opus regardless of cost?

**A:** Use Opus for:
- Legal/compliance reviews (mistakes too costly)
- Security audits (can't miss vulnerabilities)
- Production architecture decisions (long-term impact)
- Financial analysis and forecasting (accuracy critical)
- Medical/healthcare applications (safety critical)

### Q: Can I use Haiku for coding?

**A:** Yes, for:
- Simple CRUD operations
- Boilerplate generation
- Test fixture creation
- Config file edits
- Documentation formatting

**No, for:**
- Complex algorithms
- Architecture decisions
- Security-sensitive code
- Performance-critical code

### Q: How much does Extended Thinking cost?

**A:** Extended Thinking uses more input tokens (the "thinking" process) but produces the same output. Typical overhead:
- Simple task: +2K tokens input (~$0.03 more for Opus)
- Complex task: +10K tokens input (~$0.15 more for Opus)

**Worth it when:** The improved reasoning quality prevents errors or saves iteration time.

### Q: What's the ROI on prompt caching?

**A:** Massive for repeated agent use:
- **Without caching:** $3/interaction
- **With caching:** $0.30/interaction
- **ROI:** 900% on 2nd+ use

**Best for:** Daily agent use, CI/CD automation, customer support.

---

**Back to:** [Main README](./README.md) | [Agent Selection Guide](./AGENT-SELECTION-GUIDE.md) | [MCP Integration Guide](./MCP-INTEGRATION-GUIDE.md)
