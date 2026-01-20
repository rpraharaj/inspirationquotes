# Enhancement Draft: AI Function Calling Code: Tool Use Snippets for LLMs

**Generated:** 2026-01-12
**Slug:** ai-function-calling-snippets
**Current Word Count:** 715 (visible to Google)
**Target Word Count:** 1500+
**Words to Add:** ~800

---

## Voice Analysis

**Detected characteristics:**
- First-person experience ("I use function calling in almost every AI project now")
- Confident, practical tone
- Conversational ("Before it existed, getting AI to take real actions was a mess")
- Short-to-medium sentences
- Numbered lists for processes
- Tables for structured comparisons
- H2/H3 headings without emojis
- Extensive Python code with comments
- Focuses on "patterns I reach for constantly"

---

## Enhancement 1: When to Use Function Calling vs Alternatives

**Location:** After line 43 (after the link to MCP vs function calling), before "## OpenAI Function Calling"
**Words Added:** ~180

### Content to Add:

### Choosing Your Integration Approach

Function calling isn't the only way to connect LLMs to external systems. Here's when to use each approach:

| Approach | Best For | Trade-offs |
|----------|----------|------------|
| **Function calling** | Structured tool use within a conversation | Vendor-specific, tightly coupled to your code |
| **MCP (Model Context Protocol)** | Reusable tools across applications, enterprise deployments | More infrastructure, separate server process |
| **Output parsing** | Simple extractions, when you just need structured data | Fragile, model-dependent formatting |
| **ReAct agents** | Complex reasoning chains, when the model needs to plan | Higher latency, harder to debug |

**My recommendation:** Start with function calling for its simplicity. Move to MCP when you're building tools you'll reuse across projects or need to share across a team. The concepts transfer directly—MCP tools are essentially function definitions with a standard transport layer.

---

## Enhancement 2: Code Explanation - OpenAI Functions

**Location:** After line 174 (after the single function call example ends)
**Words Added:** ~100

### Content to Add:

**Key points about the function loop:**

- **Always add the assistant message first:** Before adding tool results, append the original assistant message with `tool_calls`. This maintains conversation coherence.
- **Match tool_call_id exactly:** Each tool result must reference the exact ID from the request. Mismatched IDs cause the API to reject the response.
- **Handle unknown functions gracefully:** In production, log unknown function requests rather than crashing. They indicate a mismatch between your tools and what the model expects.

> ⚠️ **Common mistake:** Forgetting to include the assistant's tool_calls message before adding tool results. The conversation must show: user → assistant (with tool_calls) → tool results → assistant (final response).

---

## Enhancement 3: Code Explanation - Claude Tools

**Location:** After line 430 (after "For more Claude patterns, see our Claude API tutorial.")
**Words Added:** ~100

### Content to Add:

**Claude-specific considerations:**

Claude's tool use has a few differences from OpenAI worth noting:

- **Response structure:** Claude returns a list of content blocks, not a single message. You'll often have both text blocks and tool_use blocks in the same response.
- **Stop reasons matter:** Check `response.stop_reason == "tool_use"` rather than looking for tool calls. Claude explicitly tells you why it stopped.
- **Streaming with tools:** When streaming tool use responses, you receive tool_use deltas that you must accumulate before parsing the complete input.

These patterns work with Claude 3.5, Claude 4 Haiku, and Claude 4 Opus.

---

## Enhancement 4: Performance and Cost Considerations

**Location:** After line 756 (after the tool chaining code block), before "## Error Handling in Tool Use"
**Words Added:** ~180

### Content to Add:

## Performance and Cost Optimization

Function calling adds overhead to your API calls. Here's how to manage it.

### Token Costs

Every function definition consumes tokens. A typical function with description and parameters uses 100-200 tokens. With 10 functions defined, you're adding 1,000-2,000 tokens to every request before any content.

**Optimization strategies:**
- Only include functions relevant to the current context
- Use shorter, more precise descriptions (still clear, but concise)
- Consider separate "tool sets" for different conversation types

### Latency Patterns

Function calling adds two sources of latency:
1. **Decision time:** The model deciding whether to call a function (~50-200ms additional)
2. **Round trips:** Each function call requires a new API call

For time-sensitive applications, consider:
- Parallel function execution (shown in earlier examples)
- Caching function results when inputs repeat
- Pre-warming common function calls based on user context

---

## Enhancement 5: Troubleshooting Section

**Location:** After line 798 (after the error handling code block ends)
**Words Added:** ~200

### Content to Add:

## Troubleshooting Common Issues

### Function Not Being Called

**What you see:** You expect the model to call a function, but it responds with text instead.

**Why it happens:** The model decided your query didn't need the function, or the function description didn't clearly match the task.

**How to fix it:**
1. Make your function description more specific: instead of "Get weather," use "Get the current weather conditions for a location. Call this whenever the user asks about weather."
2. Use `tool_choice="required"` to force function usage
3. Check that required parameters aren't too restrictive

### Invalid JSON in Arguments

**What you see:** `json.JSONDecodeError` when parsing function arguments.

**Why it happens:** The model occasionally produces malformed JSON, especially with complex nested parameters.

**How to fix it:**
1. Always wrap JSON parsing in try/except (as shown in error handling section)
2. Simplify parameter schemas—flatten nested objects when possible
3. Use Pydantic for validation after parsing

### Model Returns Wrong Function

**What you see:** The model calls `search_database` when you expected `search_web`.

**Why it happens:** Function descriptions overlap or are ambiguous.

**How to fix it:**
1. Make function purposes mutually exclusive in descriptions
2. Add negative examples: "Use for web search. Do NOT use for database queries."
3. Reduce the number of similar functions

---

## Enhancement 6: Expanded FAQ

**Location:** At the end of the document (before existing FAQ if present, or as new section)
**Words Added:** ~150

### Content to Add:

## Frequently Asked Questions

### How many functions can I define at once?

There's no hard limit, but practical constraints matter. More than 15-20 functions significantly increases token usage and can confuse the model. Group related functions logically and only include those relevant to the current task.

### Do I need to define functions every request?

Yes, function definitions are sent with each API call. They're not persisted on the server. This is actually beneficial—you can dynamically adjust available tools per request.

### Can functions call other functions?

The model can request multiple function calls in sequence (tool chaining), where the output of one informs the next. The model handles the orchestration; you just execute whatever it requests.

### What happens if my function takes too long?

The API call remains open while you execute the function. Implement timeouts (30 seconds is reasonable) and return error objects if functions fail. The model can adapt its response based on the error.

---

## New Internal Links

| Anchor Text | Target | Insert Location |
|-------------|--------|-----------------|
| MCP tool integration | /blog/what-is-mcp | Enhancement 1, when comparing approaches |
| building AI agents | /blog/build-first-ai-agent-python | Line 42, when discussing agent use cases |
| ReAct pattern explained | /blog/react-pattern-explained | Enhancement 1, comparison table |
| API cost optimization | /blog/llm-cost-optimization | Enhancement 4, cost section |

---

## New External Links

| Anchor Text | URL | Insert Location |
|-------------|-----|-----------------|
| OpenAI function calling guide | https://platform.openai.com/docs/guides/function-calling | Line 48, OpenAI section header |
| Anthropic tool use documentation | https://docs.anthropic.com/en/docs/tool-use | Line 275, Claude section |
| Gemini function calling | https://ai.google.dev/gemini-api/docs/function-calling | Line 435, Gemini section |
| JSON Schema specification | https://json-schema.org/specification | Line 52, when discussing function schemas |

---

## Summary

- **Total words added:** ~810
- **New word count:** ~1525 (visible to Google)
- **New internal links:** 4
- **New external links:** 4
- **New sections added:** 3 (Choosing Approach, Performance, Troubleshooting)
- **FAQ questions added:** 4
