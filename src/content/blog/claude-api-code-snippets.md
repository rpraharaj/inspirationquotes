---
title: "Claude API Snippets: Python & TypeScript Examples (2026)"
description: "Ready-to-use Claude API code snippets in Python and TypeScript. Vision, tool use, streaming, and production patterns."
pubDate: 2025-11-28
category: "code-snippets"
keywords: ["Claude API code snippets", "Anthropic API examples", "Claude Python code", "Claude TypeScript"]
heroImage: "/images/featured/claude-api-code-snippets.webp"
author: "AI Agents Kit"
readTime: 35
tags: ["Claude", "Anthropic", "Python", "TypeScript", "Code Snippets"]
difficulty: "intermediate"
featured: true
---

Anthropic's Claude API is different from OpenAI's, and that trips people up. The message format, the tool use syntax, even how you handle streaming—it's just different enough to cause friction when you're switching between them.

I've built applications with both APIs, and I kept a collection of working Claude snippets that saved me hours of documentation diving. Now you get that collection.

Thirty code examples, covering Python and TypeScript, organized by what you're actually trying to do. All updated for Claude 4 as of January 2026.

Let's build something with Claude.

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
    model="claude-3-5-sonnet-20240620",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "What is machine learning?"}
    ]
)

print(message.content[0].text)
```

Note the difference from OpenAI: it's `message.content[0].text`, not `message.choices[0].message.content`.

### Snippet 5: Claude 3.5 Family Models

```python
# Claude 3.5 family (Standard for 2026)
models = {
    "claude-3-5-sonnet-20240620": "Best balance. Smartest for coding.",
    "claude-3-opus-20240229": "Legacy complex reasoning",
    "claude-3-haiku-20240307": "Fastest, low latency"
}

# The new standard for most tasks
response = client.messages.create(
    model="claude-3-5-sonnet-20240620",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello!"}]
)
```

Claude 3.5 Sonnet has largely replaced Opus for most tasks, being both faster and smarter at coding.

#### Choosing the Right Claude Model

Picking the right model saves money and improves response times. Here's my decision framework:

**Use Claude 3.5 Sonnet for:**
- **Coding & Development:** It outperforms Opus on most benchmarks.
- **Complex Reasoning:** It handles nuance better than previous generations.
- **RAG Systems:** Excellent instruction following for context retrieval.
- **Production Apps:** The sweet spot of speed/intelligence.

**Use Claude 3 Opus for:**
- Extremely long-context tasks (writing a novel chapter with 100k context).
- Open-ended creative writing where "voice" is paramount.

**Use Claude 3 Haiku for:**
- High-volume classification.
- Simple data extraction.
- User-facing tasks requiring <500ms latency.

### Snippet 6: Temperature and Top-P

```python
# Creative writing
creative = client.messages.create(
    model="claude-3-5-sonnet-20240620",
    max_tokens=1024,
    temperature=0.9,  # Higher = more creative
    messages=[{"role": "user", "content": "Write a haiku about coding"}]
)

# Precise answers
precise = client.messages.create(
    model="claude-3-5-sonnet-20240620",
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
    model="claude-3-5-sonnet-20240620",
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
    model="claude-3-5-sonnet-20240620",
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
    model="claude-3-5-sonnet-20240620",
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
    model="claude-3-5-sonnet-20240620",
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
    model="claude-3-5-sonnet-20240620",
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
    model="claude-3-5-sonnet-20240620",
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
    model="claude-3-5-sonnet-20240620",
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
    model="claude-3-5-sonnet-20240620",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "What's the weather in Tokyo?"}]
)
```

Note: it's `input_schema`, not `parameters` like OpenAI.

### Snippet 15: Handle Tool Use Response

```python
message = client.messages.create(
    model="claude-3-5-sonnet-20240620",
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
    model="claude-3-5-sonnet-20240620",
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
        model="claude-3-5-sonnet-20240620",
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
    model="claude-3-5-sonnet-20240620",
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
    model="claude-3-5-sonnet-20240620",
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
    model="claude-3-5-sonnet-20240620",
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
    model="claude-3-5-sonnet-20240620",
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
    model="claude-3-5-sonnet-20240620",
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
    model="claude-3-5-sonnet-20240620",
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
        model="claude-3-5-sonnet-20240620",
        max_tokens=1024,
        messages=[
            {"role": "user", "content": f"Create a unified summary from these section summaries:\n\n{combined}"}
        ]
    )
    
    return final.content[0].text
```

For documents exceeding context limits, chunk and combine.

## Batch Processing Patterns

Anthropic introduced Message Batches to handle high-volume, non-time-sensitive workloads at 50% of the cost.

### Snippet 24: Creating a Batch

```python
# 1. Create your requests (JSONL format conceptually)
requests = [
    {
        "custom_id": "req_1",
        "params": {
            "model": "claude-3-5-sonnet-20240620",
            "max_tokens": 1024,
            "messages": [{"role": "user", "content": "Summarize file 1"}]
        }
    },
    {
        "custom_id": "req_2",
        "params": {
            "model": "claude-3-5-sonnet-20240620",
            "max_tokens": 1024,
            "messages": [{"role": "user", "content": "Summarize file 2"}]
        }
    }
]

# 2. Submit the batch
batch = client.messages.batches.create(
    requests=requests
)

print(f"Batch ID: {batch.id}")
```

### Snippet 25: Checking Batch Status

```python
import time

batch_id = "msgbatch_..."

while True:
    batch = client.messages.batches.retrieve(batch_id)
    print(f"Status: {batch.processing_status}")
    
    if batch.processing_status in ["ended", "expired", "canceled"]:
        break
        
    time.sleep(5)

# 3. Retrieve results
for result in client.messages.batches.results(batch_id):
    print(f"Custom ID: {result.custom_id}")
    print(f"Output: {result.result.message.content[0].text}")
```

Use Batches for nightly jobs, data enrichment pipelines, and large-scale evaluation. The 50% discount makes it a no-brainer for backend tasks.

## Advanced Tool Use

Claude 3.5 Sonnet excels at "parallel tool use"—calling multiple tools in a single turn.

### Snippet 26: Parallel Tool Calls

```python
tools = [
    {
        "name": "get_weather",
        "input_schema": {
            "type": "object",
            "properties": {"city": {"type": "string"}},
            "required": ["city"]
        }
    }
]

message = client.messages.create(
    model="claude-3-5-sonnet-20240620",
    max_tokens=1024,
    tools=tools,
    messages=[
        {"role": "user", "content": "What's the weather in Tokyo, London, and New York?"}
    ]
)

# Claude will return THREE tool use blocks in the same message
for content in message.content:
    if content.type == "tool_use":
        print(f"Calling tool: {content.name} with {content.input}")

# Output:
# Calling tool: get_weather with {'city': 'Tokyo'}
# Calling tool: get_weather with {'city': 'London'}
# Calling tool: get_weather with {'city': 'New York'}
```

This drastically reduces latency for complex queries requiring multiple data points.

### Integrating with MCP

The Model Context Protocol (MCP) is the standard for connecting AI models to data and tools. Instead of defining tools manually like in Snippet 26, you can connect Claude to established MCP servers for databases, file systems, and more. Check out our curated list of [best MCP servers for Claude](/blog/best-mcp-servers-claude) to supercharge your agent's capabilities without writing boilerplate tool definitions.

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

### Snippet 32: Accurate Token Counting

Never guess your costs. Use the tokenizer to know exactly what you'll spend.

```python
# pip install anthropic
from anthropic import Anthropic

client = Anthropic()

text = "The quick brown fox..."
token_count = client.count_tokens(text)

print(f"Token count: {token_count}")
# Cost estimation (based on $3.00/M input for Sonnet 3.5)
cost = (token_count / 1_000_000) * 3.00
print(f"Estimated cost: ${cost:.6f}")
```

### Snippet 33: Prompt Caching (90% Discount)

Claude 3.5 supports prompt caching, which reduces costs by up to 90% for repeated context (like long documents or few-shot examples).

```python
message = client.messages.create(
    model="claude-3-5-sonnet-20240620",
    max_tokens=1024,
    system=[
        {
            "type": "text", 
            "text": "You are an expert legal aide.",
            "cache_control": {"type": "ephemeral"}  # <--- Cache this block
        }
    ],
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": large_document_text,
                    "cache_control": {"type": "ephemeral"} # <--- Cache this large doc
                },
                {"type": "text", "text": "Summarize the liability clause."}
            ]
        }
    ]
)
```

The first request pays full price to write to cache. Subsequent requests for `large_document_text` pay a fraction of the cost to read from cache. This is a game-changer for RAG and long-document apps. For a deeper dive into building retrieval systems, see our [RAG chatbot tutorial](/blog/build-rag-chatbot-tutorial), which covers how to combine caching with vector search.

## TypeScript Examples

Everything above works in TypeScript too. Here are the TS-specific patterns.

### Snippet 27: Basic TypeScript Message

```typescript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

async function chat(prompt: string): Promise<string> {
  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20240620',
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

### Snippet 28: Streaming in TypeScript

```typescript
async function streamResponse(prompt: string): Promise<void> {
  const stream = await client.messages.stream({
    model: 'claude-3-5-sonnet-20240620',
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

### Snippet 29: Tool Use in TypeScript

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
  model: 'claude-3-5-sonnet-20240620',
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

### Snippet 30: Express.js Integration

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
      model: 'claude-3-5-sonnet-20240620',
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

### Snippet 31: Next.js Route Handler (App Router)

For modern Next.js apps, use the Edge runtime for lower latency.

```typescript
// app/api/chat/route.ts
import Anthropic from '@anthropic-ai/sdk';
import { AnthropicStream, StreamingTextResponse } from 'ai';

// Create an Anthropic client code
const anthropic = new Anthropic();

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20240620',
    stream: true,
    messages: messages,
    max_tokens: 1024,
  });

  // Convert the response into a friendly text-stream
  const stream = AnthropicStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
```

This snippet uses the Vercel AI SDK, which allows for extremely easy streaming from the server to the client.

## Error Handling

Production code needs robust error handling. Here are the patterns.

### Snippet 35: Basic Error Handling

```python
from anthropic import (
    APIError,
    APIConnectionError,
    RateLimitError,
    AuthenticationError
)

try:
    message = client.messages.create(
        model="claude-3-5-sonnet-20240620",
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

### Snippet 36: Retry with Backoff

```python
import time
from anthropic import RateLimitError

def call_with_retry(messages, max_retries=3):
    for attempt in range(max_retries):
        try:
            return client.messages.create(
                model="claude-3-5-sonnet-20240620",
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

### Common Claude API Errors and Fixes

Beyond rate limits, here are errors you'll encounter and how to handle them:

**"Invalid API key provided"**
- Check that `ANTHROPIC_API_KEY` is set correctly (not `OPENAI_API_KEY`)
- Verify the key hasn't been revoked in the <a href="https://console.anthropic.com" target="_blank" rel="noopener">Anthropic Console</a>
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

### Snippet 37: Async Error Handling

```python
import asyncio
from anthropic import AsyncAnthropic, RateLimitError

async_client = AsyncAnthropic()

async def safe_call(prompt: str) -> str:
    try:
        message = await async_client.messages.create(
            model="claude-3-5-sonnet-20240620",
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

## Advanced Data Extraction

Getting structured data out of messy inputs is Claude's superpower.

### Snippet 38: Generating Tool Schemas with Pydantic

Writing JSON schemas by hand is error-prone. Use Pydantic to generate them automatically.

```python
from pydantic import BaseModel, Field

class UserProfile(BaseModel):
    name: str = Field(..., description="Full name of the user")
    age: int = Field(..., description="Age in years")
    interests: list[str] = Field(..., description="List of hobbies")

# Generate the schema Claude needs
schema = UserProfile.model_json_schema()

tool_definition = {
    "name": "extract_user",
    "description": "Extract user details from text",
    "input_schema": schema
}

# Now use it in your call
message = client.messages.create(
    model="claude-3-5-sonnet-20240620",
    max_tokens=1024,
    tools=[tool_definition],
    messages=[{"role": "user", "content": "John Doe is a 34-year-old developer who loves hiking."}]
)
```

This ensures your schemas are always synced with your validating code.

### Snippet 39: Vision-to-JSON Pipeline

Extract structured data directly from images (invoices, receipts, forms).

```python
invoice_tool = {
    "name": "parse_invoice",
    "description": "Extract invoice details",
    "input_schema": {
        "type": "object",
        "properties": {
            "invoice_number": {"type": "string"},
            "total_amount": {"type": "number"},
            "date": {"type": "string"},
            "vendor": {"type": "string"}
        },
        "required": ["invoice_number", "total_amount"]
    }
}

# Assume 'image_data' is your base64 string
message = client.messages.create(
    model="claude-3-5-sonnet-20240620",
    max_tokens=1024,
    tools=[invoice_tool],
    tool_choice={"type": "tool", "name": "parse_invoice"},  # Force JSON output
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
                {"type": "text", "text": "Extract the invoice data."}
            ]
        }
    ]
)
```

By forcing the tool choice, you turn Claude into a deterministic OCR-to-JSON engine.

### Snippet 40: Claude vs OpenAI Migration Guide

Migrating from OpenAI? Here's the cheat sheet. The models share many concepts, but the implementation details differ enough to break your code if you just swap endpoints.

| Feature | OpenAI (GPT-4) | Anthropic (Claude 3.5) |
|---------|---------------|------------------------|
| **System Prompt** | Inside `messages` list: `{"role": "system"}` | Top-level parameter: `system="..."` |
| **Max Output** | `max_tokens` (often 4096) | `max_tokens` (required, up to 8192) |
| **Tool Definition** | `tools=[{"type": "function", ...}]` | `tools=[{"name": ..., "input_schema": ...}]` |
| **Tool Choice** | `tool_choice="auto"` | `tool_choice={"type": "auto"}` |
| **Vision** | `image_url` found inside `content` list | `source` block inside `content` list |
| **Caching** | N/A (as of Jan 2026) | `cache_control: {"type": "ephemeral"}` |
| **JSON Mode** | `response_format={"type": "json_object"}` | Use `tool_choice` or prompt engineering |

The biggest friction point I see developers hit is the `max_tokens` parameter. OpenAI defaults this if omitted; Claude throws an error. Always set it. Also, Claude's strict separation of system prompts from the user message history is a design choice that often leads to better instruction adherence, as the system prompt is treated with higher priority than recent conversation history.

## Frequently Asked Questions

### Claude or OpenAI—which API should I use?

Both are excellent. Claude tends to follow instructions more precisely and handles long context better. GPT-5 has stronger tool use integration. I use Claude for document analysis and writing, GPT-5 for complex agentic workflows. See our [API comparison](/blog/openai-vs-anthropic-vs-google-api) for deeper analysis.

### How do I count tokens before making a request?

Anthropic doesn't provide an official tokenizer, but Claude uses a similar token count to OpenAI. Estimate ~4 characters per token for English text. The API returns exact token usage in every response. See Snippet 32 for programmatic counting.

### Can I use both Python and TypeScript in the same project?

Yes, but pick one for your API calls. Both SDKs are well-maintained. TypeScript gives you better type safety, Python has more ML library ecosystem.

## Conclusion & Resources

You now have 40 production-ready patterns for the Claude API. From basic messages to complex tool use and efficient caching, these snippets form the backbone of modern AI engineering.

**Where to go next:**
- **Official Docs:** <a href="https://docs.anthropic.com/claude/reference" target="_blank" rel="noopener">Anthropic API Documentation</a> is your source of truth.
- **Recipes:** The <a href="https://github.com/anthropic-inc/anthropic-cookbook" target="_blank" rel="noopener">Anthropic Cookbook</a> has end-to-end examples.
- **Optimization:** Review our [API cost optimization guide](/blog/ai-api-cost-optimization) to save money.

Building with staying power means writing cleaner, more robust code. Copy these snippets, but understand *why* they work.

Now go build something amazing.



