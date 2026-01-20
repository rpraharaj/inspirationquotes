---
title: "Claude API Code Snippets: Python and TypeScript Examples (2026)"
description: "30 copy-paste Claude API code snippets for Python and TypeScript. Messages, tool use, streaming, vision, and error handling examples."
pubDate: 2026-01-11
updatedDate: 2026-01-11
category: "ai-code-snippets"
keywords: ["Claude API code snippets", "Anthropic API examples", "Claude Python code", "Claude TypeScript"]
heroImage: "../../assets/images/claude-api-code-snippets.webp"
author: "AI Agents Kit"
readTime: 18
tags: ["Claude", "Anthropic", "Python", "TypeScript", "Code Snippets"]
difficulty: "intermediate"
featured: false
---

Anthropic's Claude API is different from OpenAI's, and that trips people up. The message format, the tool use syntax, even how you handle streaming—it's just different enough to cause friction when you're switching between them.

I've built applications with both APIs, and I kept a collection of working Claude snippets that saved me hours of documentation diving. Now you get that collection.

Thirty code examples, covering Python and TypeScript, organized by what you're actually trying to do. All updated for Claude 4 as of January 2026.

Let's build something with Claude.

## Setup & Authentication

First things first: getting connected to the Anthropic API.

### Snippet 1: Install and Import (Python)

```python
# Install the library
# pip install anthropic

import anthropic
```

The official `anthropic` package is all you need for Python.

### Snippet 2: Client Initialization

```python
import os
import anthropic

# Option 1: Environment variable (recommended)
client = anthropic.Anthropic()  # Reads ANTHROPIC_API_KEY automatically

# Option 2: Explicit key (testing only)
client = anthropic.Anthropic(api_key="sk-ant-your-key-here")

# Option 3: With custom settings
client = anthropic.Anthropic(
    api_key=os.environ.get("ANTHROPIC_API_KEY"),
    timeout=60.0,
    max_retries=2
)
```

Unlike OpenAI, Claude uses `ANTHROPIC_API_KEY` as the environment variable name.

### Snippet 3: TypeScript Setup

```typescript
// npm install @anthropic-ai/sdk

import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();  // Reads ANTHROPIC_API_KEY

// Or with explicit key
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
```

The TypeScript SDK has great type definitions. Your editor will thank you.

## Basic Messages

The core of the Claude API: sending and receiving messages.

### Snippet 4: Simple Message

```python
message = client.messages.create(
    model="claude-4-sonnet",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "What is machine learning?"}
    ]
)

print(message.content[0].text)
```

Note the difference from OpenAI: it's `message.content[0].text`, not `message.choices[0].message.content`.

### Snippet 5: All Claude 4 Models

```python
# Claude 4 family (as of January 2026)
models = {
    "claude-4-opus": "Most capable, highest cost",
    "claude-4-sonnet": "Best balance of speed and capability",
    "claude-4-haiku": "Fastest, most affordable"
}

# Use Sonnet for most tasks
response = client.messages.create(
    model="claude-4-sonnet",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello!"}]
)
```

Sonnet is my default. Opus for complex reasoning, Haiku for high-volume simple tasks.

### Snippet 6: Temperature and Top-P

```python
# Creative writing
creative = client.messages.create(
    model="claude-4-sonnet",
    max_tokens=1024,
    temperature=0.9,  # Higher = more creative
    messages=[{"role": "user", "content": "Write a haiku about coding"}]
)

# Precise answers
precise = client.messages.create(
    model="claude-4-sonnet",
    max_tokens=1024,
    temperature=0.1,  # Lower = more focused
    top_p=0.9,
    messages=[{"role": "user", "content": "What is 15 * 23?"}]
)
```

Claude's temperature range is 0-1 (not 0-2 like GPT).

### Snippet 7: Response Metadata

```python
message = client.messages.create(
    model="claude-4-sonnet",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Explain quantum computing"}]
)

# Access all response data
print(f"Model: {message.model}")
print(f"Stop reason: {message.stop_reason}")
print(f"Input tokens: {message.usage.input_tokens}")
print(f"Output tokens: {message.usage.output_tokens}")
print(f"Content: {message.content[0].text}")
```

Token usage is always returned—useful for cost tracking.

## System Prompts & Instructions

Claude handles system prompts differently than OpenAI—they're a top-level parameter.

### Snippet 8: System Prompt

```python
message = client.messages.create(
    model="claude-4-sonnet",
    max_tokens=1024,
    system="You are a helpful coding assistant. Be concise. Use code examples when relevant.",
    messages=[
        {"role": "user", "content": "How do I read a file in Python?"}
    ]
)
```

The `system` parameter is separate from the `messages` list. This is different from OpenAI!

### Snippet 9: Multi-Part System Prompt

```python
system_prompt = """You are a senior software engineer with expertise in Python.

Guidelines:
- Be direct and concise
- Show code examples
- Point out potential issues
- Suggest best practices

Format:
- Use markdown for code blocks
- Include comments in code"""

message = client.messages.create(
    model="claude-4-sonnet",
    max_tokens=2048,
    system=system_prompt,
    messages=[{"role": "user", "content": "Review this code: def add(a,b): return a+b"}]
)
```

Detailed [system prompts](/blog/system-prompts-explained) get better results than vague instructions.

### Snippet 10: Multi-Turn with System

```python
messages = [
    {"role": "user", "content": "My name is Alex."},
    {"role": "assistant", "content": "Nice to meet you, Alex!"},
    {"role": "user", "content": "What's my name?"}
]

message = client.messages.create(
    model="claude-4-sonnet",
    max_tokens=1024,
    system="You have a great memory for names.",
    messages=messages
)

print(message.content[0].text)  # "Your name is Alex."
```

Alternating user/assistant messages maintain conversation history.

## Streaming Responses

Streaming shows output as it generates. Essential for responsive UIs.

### Snippet 11: Basic Streaming

```python
with client.messages.stream(
    model="claude-4-sonnet",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Tell me a story"}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

The context manager handles cleanup automatically.

### Snippet 12: Streaming with Events

```python
with client.messages.stream(
    model="claude-4-sonnet",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Explain recursion"}]
) as stream:
    for event in stream:
        if event.type == "content_block_delta":
            print(event.delta.text, end="", flush=True)
        elif event.type == "message_stop":
            print("\n--- Stream complete ---")
```

Events give you more control over the streaming process.

### Snippet 13: Collect Streamed Response

```python
full_response = ""

with client.messages.stream(
    model="claude-4-sonnet",
    max_tokens=1024,
    messages=[{"role": "user", "content": "List programming tips"}]
) as stream:
    for text in stream.text_stream:
        full_response += text
        print(text, end="", flush=True)

print(f"\n\nTotal length: {len(full_response)}")
```

Collect chunks when you need both streaming display and the complete text.

## Tool Use / Function Calling

Claude's tool use is powerful. Here's how to integrate external functions.

### Snippet 14: Define a Tool

```python
tools = [
    {
        "name": "get_weather",
        "description": "Get current weather for a location",
        "input_schema": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "City and country, e.g., 'London, UK'"
                }
            },
            "required": ["location"]
        }
    }
]

message = client.messages.create(
    model="claude-4-sonnet",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "What's the weather in Tokyo?"}]
)
```

Note: it's `input_schema`, not `parameters` like OpenAI.

### Snippet 15: Handle Tool Use Response

```python
message = client.messages.create(
    model="claude-4-sonnet",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "Weather in Paris?"}]
)

# Check if Claude wants to use a tool
if message.stop_reason == "tool_use":
    for block in message.content:
        if block.type == "tool_use":
            print(f"Tool: {block.name}")
            print(f"Input: {block.input}")
            print(f"ID: {block.id}")
```

The `stop_reason` tells you when Claude wants to call a tool.

### Snippet 16: Complete Tool Use Flow

```python
def get_weather(location: str) -> str:
    # Your actual API call would go here
    return f"Sunny, 72°F in {location}"

# Initial request
message = client.messages.create(
    model="claude-4-sonnet",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "Weather in NYC?"}]
)

# Process tool use
if message.stop_reason == "tool_use":
    tool_use = next(b for b in message.content if b.type == "tool_use")
    
    # Execute the tool
    result = get_weather(tool_use.input["location"])
    
    # Send result back to Claude
    final_message = client.messages.create(
        model="claude-4-sonnet",
        max_tokens=1024,
        tools=tools,
        messages=[
            {"role": "user", "content": "Weather in NYC?"},
            {"role": "assistant", "content": message.content},
            {
                "role": "user",
                "content": [
                    {
                        "type": "tool_result",
                        "tool_use_id": tool_use.id,
                        "content": result
                    }
                ]
            }
        ]
    )
    
    print(final_message.content[0].text)
```

This is the full cycle: request → tool call → execute → return result.

### Snippet 17: Multiple Tools

```python
tools = [
    {
        "name": "calculator",
        "description": "Perform math calculations",
        "input_schema": {
            "type": "object",
            "properties": {
                "expression": {"type": "string"}
            },
            "required": ["expression"]
        }
    },
    {
        "name": "search",
        "description": "Search the web",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string"}
            },
            "required": ["query"]
        }
    }
]

message = client.messages.create(
    model="claude-4-sonnet",
    max_tokens=1024,
    tools=tools,
    tool_choice={"type": "auto"},  # Let Claude decide
    messages=[{"role": "user", "content": "What's 25% of Bitcoin's current price?"}]
)
```

`tool_choice` can be `auto`, `any`, or a specific tool name.

## Vision & Multimodal

Claude 4 can analyze images. Here's how to use vision capabilities.

### Snippet 18: Analyze Image from URL

```python
message = client.messages.create(
    model="claude-4-sonnet",
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "source": {
                        "type": "url",
                        "url": "https://example.com/image.jpg"
                    }
                },
                {
                    "type": "text",
                    "text": "What's in this image?"
                }
            ]
        }
    ]
)

print(message.content[0].text)
```

The content field becomes an array with image and text blocks.

### Snippet 19: Base64 Encoded Image

```python
import base64

def encode_image(path: str) -> str:
    with open(path, "rb") as f:
        return base64.standard_b64encode(f.read()).decode("utf-8")

image_data = encode_image("photo.jpg")

message = client.messages.create(
    model="claude-4-sonnet",
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": "image/jpeg",
                        "data": image_data
                    }
                },
                {"type": "text", "text": "Describe this image in detail"}
            ]
        }
    ]
)
```

Use base64 for local images without public URLs.

### Snippet 20: Multiple Images

```python
message = client.messages.create(
    model="claude-4-sonnet",
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "Compare these two images:"},
                {
                    "type": "image",
                    "source": {"type": "url", "url": "https://example.com/img1.jpg"}
                },
                {
                    "type": "image",
                    "source": {"type": "url", "url": "https://example.com/img2.jpg"}
                }
            ]
        }
    ]
)
```

Claude can analyze multiple images in a single request.

## Extended Context & Long Documents

Claude 4 supports 200K tokens (expandable to 1M). Here's how to use it effectively.

### Snippet 21: Long Document Analysis

```python
def read_document(path: str) -> str:
    with open(path, "r") as f:
        return f.read()

document = read_document("long_report.txt")

message = client.messages.create(
    model="claude-4-sonnet",
    max_tokens=4096,
    messages=[
        {
            "role": "user",
            "content": f"""Analyze this document and provide:
1. Executive summary (3 sentences)
2. Key findings (bullet points)
3. Recommendations

Document:
{document}"""
        }
    ]
)
```

Claude handles long documents better than most models—use that advantage.

### Snippet 22: PDF Processing (with extraction)

```python
import fitz  # PyMuPDF

def extract_pdf_text(path: str) -> str:
    doc = fitz.open(path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

pdf_content = extract_pdf_text("report.pdf")

message = client.messages.create(
    model="claude-4-sonnet",
    max_tokens=2048,
    messages=[
        {"role": "user", "content": f"Summarize this PDF:\n\n{pdf_content}"}
    ]
)
```

Extract text first, then send to Claude for analysis.

### Snippet 23: Chunked Processing for Very Long Documents

```python
def chunk_text(text: str, chunk_size: int = 50000) -> list:
    return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]

def analyze_document_in_chunks(document: str) -> str:
    chunks = chunk_text(document)
    summaries = []
    
    for i, chunk in enumerate(chunks):
        message = client.messages.create(
            model="claude-4-haiku",  # Faster for chunked work
            max_tokens=500,
            messages=[
                {"role": "user", "content": f"Summarize this section:\n\n{chunk}"}
            ]
        )
        summaries.append(message.content[0].text)
    
    # Combine summaries
    combined = "\n\n".join(summaries)
    
    final = client.messages.create(
        model="claude-4-sonnet",
        max_tokens=1024,
        messages=[
            {"role": "user", "content": f"Create a unified summary from these section summaries:\n\n{combined}"}
        ]
    )
    
    return final.content[0].text
```

For documents exceeding context limits, chunk and combine.

## TypeScript Examples

Everything above works in TypeScript too. Here are the TS-specific patterns.

### Snippet 24: Basic TypeScript Message

```typescript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

async function chat(prompt: string): Promise<string> {
  const message = await client.messages.create({
    model: 'claude-4-sonnet',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }]
  });

  return message.content[0].type === 'text' 
    ? message.content[0].text 
    : '';
}

// Usage
const response = await chat('Hello, Claude!');
console.log(response);
```

TypeScript's type checking ensures you handle responses correctly.

### Snippet 25: Streaming in TypeScript

```typescript
async function streamResponse(prompt: string): Promise<void> {
  const stream = await client.messages.stream({
    model: 'claude-4-sonnet',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }]
  });

  for await (const event of stream) {
    if (event.type === 'content_block_delta' && 
        event.delta.type === 'text_delta') {
      process.stdout.write(event.delta.text);
    }
  }
}

await streamResponse('Tell me a joke');
```

The async iterator pattern works naturally in TypeScript.

### Snippet 26: Tool Use in TypeScript

```typescript
const tools: Anthropic.Tool[] = [
  {
    name: 'get_time',
    description: 'Get current time in a timezone',
    input_schema: {
      type: 'object',
      properties: {
        timezone: { type: 'string' }
      },
      required: ['timezone']
    }
  }
];

const message = await client.messages.create({
  model: 'claude-4-sonnet',
  max_tokens: 1024,
  tools,
  messages: [{ role: 'user', content: 'What time is it in London?' }]
});

// Type-safe tool use handling
if (message.stop_reason === 'tool_use') {
  const toolUse = message.content.find(
    (block): block is Anthropic.ToolUseBlock => block.type === 'tool_use'
  );
  
  if (toolUse) {
    console.log(`Tool: ${toolUse.name}`);
    console.log(`Input: ${JSON.stringify(toolUse.input)}`);
  }
}
```

Type guards make tool use handling safe and clear.

### Snippet 27: Express.js Integration

```typescript
import express from 'express';
import Anthropic from '@anthropic-ai/sdk';

const app = express();
const client = new Anthropic();

app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    const response = await client.messages.create({
      model: 'claude-4-sonnet',
      max_tokens: 1024,
      messages: [{ role: 'user', content: message }]
    });

    res.json({ 
      response: response.content[0].type === 'text' 
        ? response.content[0].text 
        : null 
    });
  } catch (error) {
    res.status(500).json({ error: 'API call failed' });
  }
});

app.listen(3000);
```

A minimal Express endpoint for Claude integration.

## Error Handling

Production code needs robust error handling. Here are the patterns.

### Snippet 28: Basic Error Handling

```python
from anthropic import (
    APIError,
    APIConnectionError,
    RateLimitError,
    AuthenticationError
)

try:
    message = client.messages.create(
        model="claude-4-sonnet",
        max_tokens=1024,
        messages=[{"role": "user", "content": "Hello"}]
    )
except AuthenticationError:
    print("Invalid API key")
except RateLimitError:
    print("Rate limit exceeded - wait and retry")
except APIConnectionError:
    print("Network error - check connection")
except APIError as e:
    print(f"API error: {e.message}")
```

Specific exceptions help you respond appropriately.

### Snippet 29: Retry with Backoff

```python
import time
from anthropic import RateLimitError

def call_with_retry(messages, max_retries=3):
    for attempt in range(max_retries):
        try:
            return client.messages.create(
                model="claude-4-sonnet",
                max_tokens=1024,
                messages=messages
            )
        except RateLimitError:
            wait = 2 ** attempt
            print(f"Rate limited. Waiting {wait}s...")
            time.sleep(wait)
    
    raise Exception("Max retries exceeded")
```

Exponential backoff is standard for rate limit handling.

### Snippet 30: Async Error Handling

```python
import asyncio
from anthropic import AsyncAnthropic, RateLimitError

async_client = AsyncAnthropic()

async def safe_call(prompt: str) -> str:
    try:
        message = await async_client.messages.create(
            model="claude-4-sonnet",
            max_tokens=1024,
            messages=[{"role": "user", "content": prompt}]
        )
        return message.content[0].text
    except RateLimitError:
        await asyncio.sleep(2)
        return await safe_call(prompt)  # Retry once
    except Exception as e:
        return f"Error: {str(e)}"

# Usage
result = await safe_call("Hello!")
```

Async patterns for high-concurrency applications.

## Frequently Asked Questions

### Claude or OpenAI—which API should I use?

Both are excellent. Claude tends to follow instructions more precisely and handles long context better. GPT-5 has stronger tool use integration. I use Claude for document analysis and writing, GPT-5 for complex agentic workflows. See our [API comparison](/blog/openai-vs-anthropic-vs-google-api) for deeper analysis.

### How do I count tokens before making a request?

Anthropic doesn't provide an official tokenizer, but Claude uses a similar token count to OpenAI. Estimate ~4 characters per token for English text. The API returns exact token usage in every response.

### Can I use both Python and TypeScript in the same project?

Yes, but pick one for your API calls. Both SDKs are well-maintained. TypeScript gives you better type safety, Python has more ML library ecosystem.

### What's the difference between Opus, Sonnet, and Haiku?

Opus: Most capable, best for complex reasoning ~ $15/M input tokens
Sonnet: Best balance, great for most tasks ~ $3/M input tokens  
Haiku: Fastest, cheapest, good for simple tasks ~ $0.25/M input tokens

Start with Sonnet. Upgrade to Opus for hard problems, downgrade to Haiku for high-volume simple tasks.

### How do I handle the 200K context window?

Claude 4 supports 200K tokens by default. For even longer contexts (up to 1M), use the extended context feature. For most applications, 200K is plenty—that's roughly 500 pages of text.

## Start Building with Claude

Thirty snippets covering every major Claude API capability. Bookmark this, come back when you need working code.

Claude's API is different from OpenAI's, but once you learn the patterns, it's just as productive. The tool use flow is particularly elegant, and the extended context is genuinely useful for document-heavy applications.

Ready to go deeper? Check our [full Claude API tutorial](/blog/claude-api-tutorial) for comprehensive coverage, or compare with [OpenAI code snippets](/blog/openai-api-code-snippets) if you're working with both.

Now go build something.
