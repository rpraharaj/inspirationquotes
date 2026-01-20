---
heroImage: "/images/featured/streaming-llm-responses.webp"
title: "Streaming LLM Responses: Code for Real-Time AI Output"
description: "Copy-paste Python code for streaming responses from OpenAI, Claude, and Gemini APIs. Includes async patterns, error handling, and frontend integration with SSE."
pubDate: 2025-08-20
category: code-snippets
author: Raj Praharaj
tags:
  - LLM
  - Streaming
  - OpenAI
  - Claude
  - Python
  - API
readingTime: 21 min read
---

There's nothing worse than staring at a blank screen waiting for an LLM to finish thinking. I've watched users give up on AI features simply because the 3-second wait felt like an eternity. Streaming changes that completely—text appearing word by word feels interactive, even when the total response time is the same.

Every major LLM API supports streaming, but the implementation details vary enough to be annoying. OpenAI uses Server-Sent Events, Claude has its own event types, and Gemini does things slightly differently. I've standardized these patterns across dozens of projects, and this is the reference I keep coming back to.

Here's everything you need to implement streaming LLM responses—from basic synchronous calls to async patterns to full frontend integration.

## Why Streaming Matters

Before diving into code, let's understand why streaming is worth the extra complexity.

**Perceived latency vs actual latency.** When you stream tokens as they're generated, users see output within 100-200ms. Compare that to waiting 2-3 seconds for a complete response. The total time might be identical, but the experience feels completely different.

**Progressive disclosure.** Long responses become readable immediately. Users can start processing the first paragraph while the model generates the conclusion. For code generation especially, this is huge—developers can start reading and evaluating before the response completes.

**Early termination.** If the response is heading in the wrong direction, users can stop it immediately rather than waiting for a response they'll discard anyway.

**When to stream (and when not to):**
- ✅ Chat interfaces, conversational UIs
- ✅ Code generation, long-form content
- ✅ Any user-facing real-time interaction
- ❌ Background processing, batch jobs
- ❌ Short responses (one-liners)
- ❌ When you need the full response before processing

### Time-to-First-Token: The Metric That Matters

When measuring streaming performance, focus on **time-to-first-token (TTFT)**—the delay between sending your request and seeing the first character appear. Here's what to expect from major providers:

| Provider | Typical TTFT | Total Response Time (500 tokens) |
|----------|--------------|----------------------------------|
| OpenAI GPT-5 | 150-300ms | 3-5 seconds |
| <a href="https://www.anthropic.com/claude" target="_blank" rel="noopener">Claude 4</a> | 200-400ms | 4-6 seconds |
| Gemini 3 | 100-250ms | 2-4 seconds |

Without streaming, users wait the full 3-6 seconds staring at nothing. With streaming, they see output within a fraction of a second. The psychological difference is dramatic—streaming makes AI feel responsive even when generation takes the same total time.

## OpenAI Streaming

<a href="https://platform.openai.com/docs/api-reference/streaming" target="_blank" rel="noopener">OpenAI's API</a> streams using Server-Sent Events (SSE). The Python SDK makes this straightforward with the `stream=True` parameter.

### Synchronous Streaming

```python
from openai import OpenAI

client = OpenAI()  # Uses OPENAI_API_KEY env var

def stream_chat(prompt: str) -> str:
    """Stream a chat completion and return the full response."""
    full_response = ""
    
    stream = client.chat.completions.create(
        model="gpt-5-turbo",
        messages=[{"role": "user", "content": prompt}],
        stream=True
    )
    
    for chunk in stream:
        if chunk.choices[0].delta.content:
            content = chunk.choices[0].delta.content
            print(content, end="", flush=True)
            full_response += content
    
    print()  # Newline after streaming
    return full_response

# Usage
response = stream_chat("Explain quantum computing in simple terms")
```

### Async Streaming

For async applications (FastAPI, asyncio-based services), use the async client:

```python
from openai import AsyncOpenAI
import asyncio

async_client = AsyncOpenAI()

async def stream_chat_async(prompt: str) -> str:
    """Async streaming chat completion."""
    full_response = ""
    
    stream = await async_client.chat.completions.create(
        model="gpt-5-turbo",
        messages=[{"role": "user", "content": prompt}],
        stream=True
    )
    
    async for chunk in stream:
        if chunk.choices[0].delta.content:
            content = chunk.choices[0].delta.content
            print(content, end="", flush=True)
            full_response += content
    
    return full_response

# Usage
asyncio.run(stream_chat_async("What is machine learning?"))
```

### Streaming with Function Calling

When using tools/functions, streaming works slightly differently—you receive function calls in chunks:

```python
def stream_with_tools(prompt: str, tools: list) -> dict:
    """Stream a completion that may include tool calls."""
    
    stream = client.chat.completions.create(
        model="gpt-5-turbo",
        messages=[{"role": "user", "content": prompt}],
        tools=tools,
        stream=True
    )
    
    content = ""
    tool_calls = []
    current_tool_call = {}
    
    for chunk in stream:
        delta = chunk.choices[0].delta
        
        # Handle regular content
        if delta.content:
            content += delta.content
            print(delta.content, end="", flush=True)
        
        # Handle tool calls
        if delta.tool_calls:
            for tool_call in delta.tool_calls:
                if tool_call.id:
                    # New tool call starting
                    if current_tool_call:
                        tool_calls.append(current_tool_call)
                    current_tool_call = {
                        "id": tool_call.id,
                        "function": {"name": "", "arguments": ""}
                    }
                
                if tool_call.function:
                    if tool_call.function.name:
                        current_tool_call["function"]["name"] = tool_call.function.name
                    if tool_call.function.arguments:
                        current_tool_call["function"]["arguments"] += tool_call.function.arguments
    
    if current_tool_call:
        tool_calls.append(current_tool_call)
    
    return {"content": content, "tool_calls": tool_calls}
```

### Error Handling for Streams

Streams can fail mid-response. Here's a robust pattern:

```python
from openai import APIError, APIConnectionError, RateLimitError

def stream_with_retry(prompt: str, max_retries: int = 3) -> str:
    """Stream with automatic retry on failure."""
    
    for attempt in range(max_retries):
        try:
            full_response = ""
            stream = client.chat.completions.create(
                model="gpt-5-turbo",
                messages=[{"role": "user", "content": prompt}],
                stream=True
            )
            
            for chunk in stream:
                if chunk.choices[0].delta.content:
                    content = chunk.choices[0].delta.content
                    full_response += content
                    yield content
            
            return  # Success, exit
            
        except RateLimitError:
            wait = 2 ** attempt
            print(f"\nRate limited, waiting {wait}s...")
            time.sleep(wait)
        except APIConnectionError as e:
            print(f"\nConnection error: {e}. Retrying...")
        except APIError as e:
            print(f"\nAPI error: {e}")
            raise
    
    raise Exception("Max retries exceeded")
```

### Handling Mid-Stream Failures

Streams can fail partway through—network hiccups, server overload, or Claude's context window filling up. Here's how to handle these gracefully:

**Connection drops** are the most common failure mode. The client stops receiving chunks, but the server might still be generating. Your options:

1. **Retry from scratch** — Simplest approach. Show the user a "regenerating" message and start over.
2. **Resume with context** — Pass the partial response back to the model: "Continue this response: [partial text]"
3. **Fail gracefully** — Display the partial response with a note that generation was interrupted.

**Timeout handling** requires careful thought. If you timeout after receiving partial content:
- You've already incurred token costs for the partial generation
- The user has seen some output that might now disappear
- The model might complete successfully on retry

My recommendation: for user-facing streams, set a generous timeout (30-60 seconds) and let the stream complete. For background processing, fail fast and retry with exponential backoff.

For more OpenAI patterns, see our [OpenAI API tutorial](/blog/openai-api-tutorial).

## Claude/Anthropic Streaming

Anthropic's Claude API has its own streaming format with message events. The async interface is particularly well-designed.

### Basic Streaming

```python
from anthropic import Anthropic

client = Anthropic()  # Uses ANTHROPIC_API_KEY env var

def stream_claude(prompt: str) -> str:
    """Stream a Claude response."""
    full_response = ""
    
    with client.messages.stream(
        model="claude-4-sonnet",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    ) as stream:
        for text in stream.text_stream:
            print(text, end="", flush=True)
            full_response += text
    
    print()
    return full_response

# Usage
response = stream_claude("Explain the benefits of TypeScript")
```

### Async Streaming with Events

Claude's streaming provides rich event types for different stages:

```python
from anthropic import AsyncAnthropic

async_client = AsyncAnthropic()

async def stream_claude_with_events(prompt: str):
    """Stream Claude with access to all event types."""
    
    async with async_client.messages.stream(
        model="claude-4-sonnet",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    ) as stream:
        async for event in stream:
            match event.type:
                case "message_start":
                    print(f"Starting message: {event.message.id}")
                case "content_block_start":
                    print(f"Content block started")
                case "content_block_delta":
                    if hasattr(event.delta, 'text'):
                        print(event.delta.text, end="", flush=True)
                case "content_block_stop":
                    print(f"\nContent block complete")
                case "message_stop":
                    print("Message complete")
        
        # Get final message object
        final = await stream.get_final_message()
        return final

# Usage
import asyncio
asyncio.run(stream_claude_with_events("Write a haiku about Python"))
```

### Tool Use with Streaming

Claude's tool use during streaming:

```python
async def stream_claude_tools(prompt: str, tools: list):
    """Stream Claude response with tool use."""
    
    async with async_client.messages.stream(
        model="claude-4-sonnet",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}],
        tools=tools
    ) as stream:
        text_content = ""
        tool_use_blocks = []
        
        async for event in stream:
            if event.type == "content_block_delta":
                if hasattr(event.delta, 'text'):
                    text_content += event.delta.text
                    print(event.delta.text, end="", flush=True)
                elif hasattr(event.delta, 'partial_json'):
                    # Tool input being streamed
                    pass
            elif event.type == "content_block_stop":
                # Check if this was a tool use block
                pass
        
        final = await stream.get_final_message()
        return final
```

For more Claude patterns, see our [Claude API tutorial](/blog/claude-api-tutorial).

## Google Gemini Streaming

Gemini's Python SDK supports streaming with a similar pattern:

```python
import google.generativeai as genai

genai.configure(api_key="your-api-key")
model = genai.GenerativeModel("gemini-3-pro")

def stream_gemini(prompt: str) -> str:
    """Stream a Gemini response."""
    full_response = ""
    
    response = model.generate_content(prompt, stream=True)
    
    for chunk in response:
        if chunk.text:
            print(chunk.text, end="", flush=True)
            full_response += chunk.text
    
    print()
    return full_response

# Usage
response = stream_gemini("Explain neural networks")
```

### Async Gemini Streaming

```python
async def stream_gemini_async(prompt: str) -> str:
    """Async Gemini streaming."""
    full_response = ""
    
    response = await model.generate_content_async(prompt, stream=True)
    
    async for chunk in response:
        if chunk.text:
            print(chunk.text, end="", flush=True)
            full_response += chunk.text
    
    return full_response
```

## Async Patterns with asyncio

When you need to stream from multiple sources or handle concurrent requests:

### Concurrent Streaming

```python
import asyncio

async def stream_multiple_llms(prompt: str):
    """Stream from multiple LLMs concurrently."""
    
    async def stream_openai():
        content = ""
        stream = await async_openai.chat.completions.create(
            model="gpt-5-turbo",
            messages=[{"role": "user", "content": prompt}],
            stream=True
        )
        async for chunk in stream:
            if chunk.choices[0].delta.content:
                content += chunk.choices[0].delta.content
        return ("openai", content)
    
    async def stream_claude():
        content = ""
        async with async_anthropic.messages.stream(
            model="claude-4-sonnet",
            max_tokens=1024,
            messages=[{"role": "user", "content": prompt}]
        ) as stream:
            async for text in stream.text_stream:
                content += text
        return ("claude", content)
    
    # Run both concurrently
    results = await asyncio.gather(stream_openai(), stream_claude())
    return dict(results)
```

### Stream Aggregation

Collect streamed content with metadata:

```python
from dataclasses import dataclass
from typing import AsyncIterator
import time

@dataclass
class StreamChunk:
    content: str
    timestamp: float
    token_count: int

async def stream_with_metadata(prompt: str) -> AsyncIterator[StreamChunk]:
    """Stream with metadata for each chunk."""
    token_count = 0
    
    stream = await async_client.chat.completions.create(
        model="gpt-5-turbo",
        messages=[{"role": "user", "content": prompt}],
        stream=True
    )
    
    async for chunk in stream:
        if chunk.choices[0].delta.content:
            content = chunk.choices[0].delta.content
            token_count += 1  # Approximate
            
            yield StreamChunk(
                content=content,
                timestamp=time.time(),
                token_count=token_count
            )
```

### Optimizing Streaming Performance

Beyond basic implementation, several techniques can improve streaming performance:

**Buffer sizing matters.** When using SSE, the server may buffer output before sending. Configure your web server (nginx, Cloudflare) to disable output buffering for streaming endpoints:

```nginx
location /chat/stream {
    proxy_buffering off;
    proxy_cache off;
}
```

**Connection pooling.** For high-throughput applications, reuse HTTP connections rather than creating new ones per request. The OpenAI and Anthropic SDKs handle this automatically.

**Token counting during streams.** If you need to track token usage in real-time, count tokens as they arrive:

```python
import tiktoken
encoder = tiktoken.encoding_for_model("gpt-5-turbo")

token_count = 0
async for chunk in stream:
    if chunk.content:
        token_count += len(encoder.encode(chunk.content))
```

This lets you implement real-time usage tracking or hard cutoffs at token limits.

## Frontend Integration

Getting streamed responses to a web frontend requires Server-Sent Events (SSE) or WebSockets.

### Server-Sent Events with FastAPI

SSE is the simplest option for one-way streaming:

```python
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from typing import AsyncIterator

app = FastAPI()

async def generate_stream(prompt: str) -> AsyncIterator[str]:
    """Generate SSE-formatted stream."""
    stream = await async_client.chat.completions.create(
        model="gpt-5-turbo",
        messages=[{"role": "user", "content": prompt}],
        stream=True
    )
    
    async for chunk in stream:
        if chunk.choices[0].delta.content:
            content = chunk.choices[0].delta.content
            # SSE format: data: {content}\n\n
            yield f"data: {content}\n\n"
    
    yield "data: [DONE]\n\n"

@app.post("/chat/stream")
async def chat_stream(prompt: str):
    return StreamingResponse(
        generate_stream(prompt),
        media_type="text/event-stream"
    )
```

### Frontend JavaScript

```javascript
// Consume SSE stream in browser
async function streamChat(prompt) {
    const response = await fetch('/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
    });
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const text = decoder.decode(value);
        const lines = text.split('\n');
        
        for (const line of lines) {
            if (line.startsWith('data: ')) {
                const content = line.slice(6);
                if (content === '[DONE]') {
                    console.log('Stream complete');
                    return;
                }
                // Append to UI
                document.getElementById('output').textContent += content;
            }
        }
    }
}
```

### Rendering Streamed Text Smoothly

Streaming creates unique UI challenges. Naive implementations look janky—text jumping around, markdown half-rendered, scroll position lost.

**Handle markdown incrementally.** Don't try to parse markdown on every chunk—it's expensive and causes flickering. Instead, stream raw text into a buffer and re-render markdown every 100-200ms:

```javascript
let buffer = '';
let renderScheduled = false;

function onChunk(text) {
    buffer += text;
    if (!renderScheduled) {
        renderScheduled = true;
        requestAnimationFrame(() => {
            renderMarkdown(buffer);
            renderScheduled = false;
        });
    }
}
```

**Maintain scroll position.** Auto-scroll to bottom only if the user was already at the bottom. If they've scrolled up to read earlier content, don't yank them back down.

**Show typing indicators.** A subtle animation or cursor after the last character signals that more content is coming.

### WebSocket Alternative

For bidirectional communication:

```python
from fastapi import WebSocket

@app.websocket("/chat/ws")
async def websocket_chat(websocket: WebSocket):
    await websocket.accept()
    
    while True:
        prompt = await websocket.receive_text()
        
        stream = await async_client.chat.completions.create(
            model="gpt-5-turbo",
            messages=[{"role": "user", "content": prompt}],
            stream=True
        )
        
        async for chunk in stream:
            if chunk.choices[0].delta.content:
                await websocket.send_text(chunk.choices[0].delta.content)
        
        await websocket.send_text("[DONE]")
```

### Building Conversational Streams

Real chat applications need to maintain conversation history while streaming. Here's the pattern:

**Accumulate during streaming.** Store each chunk as it arrives, then add the complete response to history:

```python
async def stream_with_memory(messages: list, new_prompt: str):
    messages.append({"role": "user", "content": new_prompt})
    
    assistant_content = ""
    async for chunk in stream_completion(messages):
        assistant_content += chunk
        yield chunk
    
    # Add complete response to history
    messages.append({"role": "assistant", "content": assistant_content})
```

**Memory truncation.** Long conversations exceed context limits. Implement a sliding window that keeps the system prompt plus recent messages, summarizing older context if needed.

For complete chat implementations, see our [building chat interfaces](/blog/build-chatbot-ui) tutorial.

## Frequently Asked Questions

### Does streaming use more tokens or cost more?

No. Streaming uses the same number of tokens as non-streaming requests. The response is just delivered incrementally instead of all at once. Pricing is identical.

### Can I use streaming with function calling/tools?

Yes, all major APIs support streaming with tools. The tool call data is streamed in chunks that you need to reassemble. See the OpenAI and Claude examples above.

### How do I handle errors mid-stream?

Wrap your stream consumer in try/catch and implement retry logic. If a stream fails partway through, you'll have partial content—decide whether to retry from scratch or present partial results.

### Which transport should I use: SSE or WebSocket?

Use SSE for simple streaming to the browser—it's simpler and works over HTTP. Use WebSocket when you need bidirectional communication (user can send messages while receiving).

### Does streaming work with async/await?

Yes, all modern LLM SDKs have async versions. Use `AsyncOpenAI`, `AsyncAnthropic`, etc. The async APIs are identical except you `await` the stream creation and use `async for` to iterate.

### What's the latency benefit of streaming?

First token typically arrives in 100-300ms. Without streaming, you'd wait for the entire response (often 2-5 seconds). The total generation time is the same, but perceived latency is dramatically lower.

## Wrapping Up

Streaming LLM responses transforms the user experience from "waiting for AI" to "watching AI think." The patterns here cover:

- **OpenAI**: Sync, async, and tool calling streams
- **Claude**: Event-based streaming with rich metadata
- **Gemini**: Simple and async patterns
- **Frontend**: SSE and WebSocket integration

Copy these patterns into your projects, adapt them to your frameworks, and your users will thank you for the responsive AI experience.

For complete application examples, check out our [RAG chatbot tutorial](/blog/build-rag-chatbot-tutorial) which uses streaming throughout.
