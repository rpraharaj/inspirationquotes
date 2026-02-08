---
description: Blog content templates - frontmatter, sections, links, and formatting examples. Single source of truth.
---

# 📄 Blog Templates

**Reusable templates for blog content creation. Referenced by multiple workflows.**

---

## 📋 Frontmatter Template

```yaml
---
title: "Title Here (50-60 chars, keyword near front)"
description: "Meta description (150-160 chars, keyword + benefit)"
pubDate: 2026-01-17              # Use current date
updatedDate: 2026-01-17          # Same as pubDate for new posts
category: "ai-agents"            # Singular, from valid list
keywords: ["primary keyword", "secondary keyword", "tertiary keyword"]
heroImage: "/images/featured/post-slug.webp"
author: "Inspiration Quotes Hub"
readTime: 15                     # Estimated minutes
tags: ["Tag 1", "Tag 2"]         # Optional
difficulty: "intermediate"       # beginner|intermediate|advanced
featured: false                  # Optional
series: null                     # Optional: for multi-part
seriesOrder: null                # Optional: order in series
---
```

---

## 📝 Introduction Template (200-300 words)

```markdown
[PERSONAL HOOK - Story, observation, or surprising fact. NOT "In this guide..."]

[PROBLEM - What challenge does the reader face?]

[PROMISE - What will they learn by reading this?]

[Optional: CREDIBILITY - Brief mention of experience/expertise]
```

**Example:**
```markdown
Last month, I watched a developer spend three hours debugging an AI agent that should have taken 15 minutes to set up. The issue? A single missing API parameter.

Building AI agents can feel overwhelming when you're starting out. Between prompt engineering, API integrations, and context management, it's easy to get lost in the details.

In this guide, you'll learn the exact step-by-step process to build your first AI agent—no previous experience needed. We'll cover everything from setup to deployment, with real code examples you can use today.
```

---

## 🏗️ Section Structure Template

```markdown
## [H2: Section Title with Keyword]

[1-2 sentence context/introduction]

[Main content - explanations, examples, data]

[Key takeaway or transition to next section]

### [H3: Subsection if Needed]

[Subsection content]
```

**Example:**
```markdown
## How AI Customer Service Agents Work

AI customer service agents are more than just chatbots—they're sophisticated systems that understand context, remember conversations, and can actually solve problems.

At their core, these agents combine three key components:

1. **Natural Language Processing (NLP)** - Understanding what customers actually mean
2. **Knowledge Base** - Access to your product docs, FAQs, and policies  
3. **Action Layer** - Ability to create tickets, update orders, or escalate issues

The magic happens when these pieces work together. When a customer asks "Where's my order?", the agent doesn't just search for keywords—it understands the intent, looks up the specific order, and provides a personalized answer.

### Integration with Existing Systems

Most AI agents connect to your existing tools via APIs...
```

---

## ❓ FAQ Section Template

```markdown
## Frequently Asked Questions

### [Question from research]?

[Direct answer first. Then 1-2 sentences of explanation. 50-100 words total.]

### [Question 2]?

[Answer...]

### [Question 3]?

[Answer...]
```

**Example:**
```markdown
## Frequently Asked Questions

### How much does it cost to build an AI customer service agent?

Costs range from $50-500/month depending on your needs. If you're using a platform like OpenAI or Anthropic, expect $50-100/month for a small business handling 1,000-5,000 conversations. Enterprise solutions with custom models can run $500+/month, but you get more control and better performance.

### Can AI agents replace human support teams?

Not entirely. AI agents excel at handling repetitive questions and simple tasks—think password resets, order tracking, and basic troubleshooting. But complex issues, emotional situations, and edge cases still need human expertise. The sweet spot is using AI for 60-80% of routine queries, freeing your team for high-value interactions.
```

---

## 🔗 Link Format Templates

### Internal Links (3-5 per post)

```markdown
Learn more about [descriptive anchor text](/blog/related-post-slug).

For a detailed guide, see our post on [specific topic](/blog/post-slug).

If you're interested in [related topic], check out [descriptive link](/blog/another-post).
```

**Good anchor text examples:**
- "building your first AI agent" ✅
- "Anthropic's Claude API" ✅
- "prompt engineering best practices" ✅
- "click here" ❌
- "this article" ❌

### External Links (2-3 per post)

```html
According to <a href="https://example.com/report" target="_blank" rel="noopener">Gartner's 2026 AI Report</a>, 75% of enterprises...

OpenAI's <a href="https://platform.openai.com/docs" target="_blank" rel="noopener">official API documentation</a> provides...

The <a href="https://github.com/repo/project" target="_blank" rel="noopener">open-source project on GitHub</a> offers...
```

**Requirements:**
- ✅ HTML format (NOT markdown)
- ✅ `target="_blank"` (opens in new tab)
- ✅ `rel="noopener"` (security)
- ✅ Descriptive anchor text

---

## 🎬 Conclusion Template (150-250 words)

```markdown
## Conclusion

[2-3 sentence summary of key takeaways]

[Reinforcement of main value/benefit]

[Clear CTA with internal link]

[Optional: Forward-looking statement]
```

**Example:**
```markdown
## Conclusion

Building an AI customer service agent doesn't have to be complicated. Start with a clear use case, choose the right platform for your needs, and iterate based on real customer feedback. The agents that succeed are the ones that solve specific problems, not try to do everything.

Whether you're handling 100 conversations a month or 10,000, there's an AI solution that fits your workflow. The key is starting small and scaling as you learn what works.

Ready to take the next step? Check out our [complete guide to choosing an AI platform](/blog/best-ai-platforms-compared) to find the right tools for your business.

The future of customer service is here—and it's more accessible than you think.
```

---

## 📊 Content Format Templates

### Comparison Table

```markdown
| Feature | Option A | Option B | Winner |
|---------|----------|----------|--------|
| Price | $99/mo | $149/mo | Option A |
| Features | 10 | 15 | Option B |
| Support | Email | 24/7 Chat | Option B |
```

### Numbered Steps (How-To)

```markdown
## How to Build Your First AI Agent

### Step 1: Set Up Your Development Environment

Install the required tools:
- Python 3.9+
- OpenAI API key
- Your favorite code editor

### Step 2: Create Your First Prompt

Start with a simple prompt template...
```

### Listicle Format

```markdown
## Top 5 AI Agent Platforms

### 1. OpenAI GPT-5 API

**Best for:** Developers who need maximum flexibility

**Key features:**
- 200K context window
- Function calling
- Streaming responses

**Pricing:** $0.01 per 1K tokens
```

### Code Block with Language

````markdown
```python
import openai

client = openai.OpenAI(api_key="your-key")

response = client.chat.completions.create(
    model="gpt-5-turbo",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"}
    ]
)

print(response.choices[0].message.content)
```
````

---

## 🎨 Formatting Best Practices

### Use These Elements

| Element | When to Use | Example |
|---------|-------------|---------|
| **Bullet points** | Lists of features, benefits | • Feature 1<br>• Feature 2 |
| **Numbered lists** | Sequential steps | 1. First<br>2. Second |
| **Tables** | Comparisons, specs | See tables above |
| **Bold** | Key terms (sparingly) | **important concept** |
| **Code blocks** | Code, commands | `` `code` `` |
| **Blockquotes** | Callouts, notes | > **Note:** Important info |

### Avoid These

- ❌ H1 in body content (only in frontmatter)
- ❌ Skipped heading levels (H2 → H4)
- ❌ Paragraphs >3-4 sentences
- ❌ Vague language ("very", "really", "quite")
- ❌ Passive voice overuse

---

## 📈 Word Count Targets by Section

| Section Type | Word Range |
|--------------|------------|
| Introduction | 200-300 |
| Definition/What is | 300-400 |
| Main sections | 400-600 each |
| How-to steps | 300-400 each |
| Best practices | 400-500 |
| Common mistakes | 300-400 |
| FAQ | 300-500 (5-7 questions) |
| Conclusion | 150-250 |

**Total minimum:** 4,000 words

---

## ✅ Quick Reference: Opening Hooks

### Good Hooks (Personal, Engaging)

```markdown
Last month, I watched something that changed how I think about AI agents.

Here's a confession: I used to think AI customer service was terrible.

Three years ago, this technology didn't exist. Today, it's everywhere.

I've built 47 AI agents. Here's what actually works.
```

### Bad Hooks (Generic, Boring)

```markdown
❌ Artificial intelligence is revolutionizing customer service.
❌ In this comprehensive guide, we'll explore...
❌ In today's rapidly evolving technological landscape...
❌ Whether you're a beginner or expert...
```

---

**Referenced by:** `/blog-outline`, `/blog-writer`, `/blog-reviewer`  
*Last updated: 2026-01-17*  
*Purpose: Single template source to eliminate duplication across workflows*
