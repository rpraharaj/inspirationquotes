# Enhancement Draft: Claude API Code Snippets

**Generated:** 2026-01-12
**Current Word Count:** 935 (visible to Google)
**Target Word Count:** 1500+
**Words to Add:** ~600

---

## Voice Analysis

The existing post has a conversational, direct voice with short-to-medium sentences. The author uses first-person ("I've built applications") and second-person ("you get that collection"). Technical but accessible—uses code examples liberally with brief explanations. The heading style is `##` for major sections, `###` for subsections, no emojis. Key phrases indicate practical experience: "trips people up", "saved me hours", "let's build something."

---

## Enhancement 1: Introduction Expansion - "What You'll Get" Section

**Location:** After line 22 (after "Let's build something with Claude.")
**Words Added:** ~100

### Content to Add:

### What You'll Learn

After working through these snippets, you'll know how to:

- **Set up authentication** correctly for both Python and TypeScript projects
- **Send messages** with system prompts, temperature control, and token tracking
- **Stream responses** for real-time UIs and better user experience
- **Implement tool use** (function calling) with the complete request-response cycle
- **Handle vision and images** including base64 encoding and multiple image analysis
- **Process long documents** using Claude's extended 200K+ token context window
- **Handle errors gracefully** with retry logic and proper exception handling

Each snippet is self-contained—copy, paste, and adapt to your needs.

---

## Enhancement 2: Claude Model Selection Guide

**Location:** After line 115 (after Snippet 5: All Claude 4 Models section, before "### Snippet 6: Temperature and Top-P")
**Words Added:** ~150

### Content to Add:

#### Choosing the Right Claude Model

Picking the right model saves money and improves response times. Here's my decision framework:

**Use Claude 4 Opus when:**
- Complex multi-step reasoning is required
- High-stakes outputs (legal documents, technical specifications)
- You need the absolute best quality and cost isn't a concern

**Use Claude 4 Sonnet for:**
- General development work (my default)
- Customer-facing chatbots
- Code generation and review
- Most production applications

**Use Claude 4 Haiku for:**
- High-volume, simple tasks (classification, extraction)
- Quick responses where speed matters more than depth
- Cost-sensitive applications with straightforward queries

The cost difference is significant: Opus costs roughly 5x more than Sonnet per token. Start with Sonnet and only upgrade if outputs aren't meeting requirements.

---

## Enhancement 3: Cost Optimization Tips Section

**Location:** After line 610 (after Snippet 23: Chunked Processing section, before "## TypeScript Examples")
**Words Added:** ~150

### Content to Add:

## Managing Claude API Costs

Claude's pricing is per-token, and costs add up quickly in production. Here's how to keep bills manageable:

**1. Set max_tokens appropriately**
Don't use 4096 when you only need 200 words. Lower limits mean faster responses and lower costs.

**2. Use Haiku for preprocessing**
For tasks like categorization, sentiment analysis, or simple extraction—Haiku at $0.25/M input tokens is dramatically cheaper than Sonnet.

**3. Cache repeated requests**
If users ask similar questions, cache responses. Claude's responses for identical prompts will be similar (at low temperatures).

**4. Truncate context intelligently**
You don't always need the full document. Chunk and summarize (Snippet 23) for long documents rather than sending everything.

**5. Monitor usage**
Every response includes `usage.input_tokens` and `usage.output_tokens`. Log these and set up alerts for unexpected spikes.

For high-volume applications, consider [API cost optimization strategies](/blog/ai-api-cost-optimization) in our dedicated guide.

---

## Enhancement 4: Common Errors and Solutions Section

**Location:** After line 792 (after Snippet 29: Retry with Backoff section, before "### Snippet 30: Async Error Handling")
**Words Added:** ~150

### Content to Add:

### Common Claude API Errors and Fixes

Beyond rate limits, here are errors you'll encounter and how to handle them:

**"Invalid API key provided"**
- Check that `ANTHROPIC_API_KEY` is set correctly (not `OPENAI_API_KEY`)
- Verify the key hasn't been revoked in the Anthropic Console
- Ensure no extra whitespace in your environment variable

**"max_tokens must be greater than 0"**
- You forgot to set `max_tokens`. Unlike OpenAI, Claude requires this parameter
- Set a sensible default like 1024 for most use cases

**"content: Must be a string or list"**
- Your message content format is wrong for multimodal (vision) requests
- For text-only: use a string. For images: use an array of content blocks

**"context length exceeded"**
- Your prompt plus expected response exceeds the model's limit
- Truncate input or use the chunking approach from Snippet 23

**Tool use validation errors**
- Double-check your `input_schema` matches what you're sending
- Ensure all `required` fields are provided in tool calls

---

## Enhancement 5: Expand FAQ Section

**Location:** After line 847 (after "that's roughly 500 pages of text." in the FAQ section)
**Words Added:** ~100

### Content to Add:

### How does Claude compare to GPT-5 for function calling?

Both are capable, but they work differently. Claude uses `input_schema` while OpenAI uses `parameters`. Claude returns tool calls in `message.content` as typed blocks; OpenAI uses `tool_calls` on the message object. The execution flow is similar, but you'll need to adjust your parsing code. I maintain separate helper functions for each API.

### Is there a way to test prompts without incurring costs?

Not officially—Anthropic doesn't offer a free tier. However, you can:
- Use the [Claude.ai](https://claude.ai) web interface for initial prompt testing
- Test with Haiku (cheapest) before moving to Sonnet/Opus
- Use caching aggressively during development

---

## New Internal Links

| Anchor Text | Target | Insert Location |
|-------------|--------|-----------------|
| System prompts guide | /blog/system-prompts-explained | Already present (line 202) |
| API cost optimization strategies | /blog/ai-api-cost-optimization | Cost Optimization section |
| OpenAI code snippets | /blog/openai-api-code-snippets | Already present (line 856) |
| Claude API tutorial | /blog/claude-api-tutorial | Already present (line 856) |
| API comparison | /blog/openai-vs-anthropic-vs-google-api | Already present (line 828) |

---

## New External Links

| Anchor Text | URL | Insert Location |
|-------------|-----|-----------------|
| Anthropic API Reference | https://docs.anthropic.com/en/api | Enhancement 4 or existing FAQ |
| Anthropic Console | https://console.anthropic.com | Enhancement 4 (key verification) |
| Claude Pricing | https://www.anthropic.com/pricing | Cost Optimization section |

---

## Summary

- Total words added: ~650
- New word count: ~1585
- Internal links: 2 new contextual links
- External links: 2-3 new to official docs
