# Enhancement Template: FAQ Section

Use this template to add or expand FAQ sections in blog posts.

---

## Section Header

```markdown
## Frequently Asked Questions
```

Or for schema markup compatibility:
```markdown
## FAQ
```

---

## Question Template

```markdown
### {Question}?

{Detailed answer - 40-80 words}

{Optional: Example or code snippet}

{Optional: Link to deeper resource}
```

---

## Question Style Guidelines

**DO:**
- Start with "How", "What", "Why", "Can", "Should"
- Use the same language readers would use when searching
- Answer directly in the first sentence
- Provide context and examples

**DON'T:**
- Use overly technical jargon in questions
- Start questions with "This section covers..."
- Give one-line answers (need substance for SEO)
- Repeat information from the main content

---

## Complete Example

```markdown
## Frequently Asked Questions

### How do I handle errors when the API is temporarily unavailable?

Implement a retry mechanism with exponential backoff. Start with a 1-second delay, then double it after each failure (2s, 4s, 8s). Cap the maximum delay at 60 seconds and set a retry limit of 3-5 attempts. This approach handles transient failures gracefully without overwhelming the service.

For complete error handling patterns, see our [error handling guide](/blog/ai-error-handling-snippets).

### Can I use this with streaming responses?

Yes! The patterns shown work with both synchronous and streaming APIs. For streaming, you'll need to handle the response as an async iterator and process chunks as they arrive. Streaming improves perceived latency—users see output appearing immediately rather than waiting for the complete response.

### What's the cost of running these API calls?

Costs vary by model. GPT-4 costs approximately $0.03/1K input tokens and $0.06/1K output tokens. Claude 3 Opus is similar. For cost-effective development, use smaller models (GPT-4-mini, Claude 3 Haiku) during testing and switch to larger models for production. Always monitor usage in your provider's dashboard.

### How do I test locally without hitting the real API?

Use environment-based mocking. Create a mock client that returns predefined responses when `MOCK_API=true` is set. For more sophisticated testing, use libraries like `responses` (Python) or `nock` (Node.js) to intercept HTTP requests. This speeds up tests and reduces API costs.

### Should I use function calling or plain prompts?

Use function calling when you need structured, predictable output—especially for tool use or data extraction. Plain prompts work better for open-ended generation like writing or summarization. Function calling adds ~50-100 tokens overhead, so consider cost for high-volume applications.
```

---

## Word Count Guidelines

| Component | Target Words |
|-----------|--------------|
| Per question answer | 50-80 words |
| Total section (5 questions) | 250-400 words |

---

## Common Questions by Post Type

**API Tutorial Posts:**
- How do I handle rate limits?
- What's the best model to use?
- How much does this cost?
- Can I use this in production?
- How do I test without real API calls?

**Code Snippet Posts:**
- Can I use this with [other framework]?
- What's the difference between [pattern A] and [pattern B]?
- Why would I use this instead of [alternative]?
- How do I customize this for [use case]?
- Is this pattern suitable for production?

**Prompt Engineering Posts:**
- How long should my prompts be?
- Does this work with all AI models?
- How do I measure if my prompts are working?
- Can I combine multiple techniques?
- How do I debug prompts that aren't working?

**Agent/Automation Posts:**
- Is this safe to run automatically?
- How do I monitor agent behavior?
- What happens if the agent makes a mistake?
- How do I limit what the agent can access?
- Can multiple agents work together?
