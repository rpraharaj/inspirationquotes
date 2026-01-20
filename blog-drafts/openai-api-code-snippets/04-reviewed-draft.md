---
title: "OpenAI API Code Snippets: 30 Ready-to-Use Examples (2026)"
description: "Copy-paste OpenAI API code snippets for Python. 30 working examples for chat completions, function calling, streaming, embeddings, and more."
pubDate: 2026-01-11
updatedDate: 2026-01-11
category: "ai-code-snippets"
keywords: ["OpenAI API code snippets", "ChatGPT API examples", "GPT-5 Python code", "OpenAI Python snippets"]
heroImage: "../../assets/images/openai-api-code-snippets.webp"
author: "AI Agents Kit"
readTime: 18
tags: ["OpenAI", "Python", "Code Snippets", "API"]
difficulty: "intermediate"
featured: false
---

I've lost count of how many times I've googled "OpenAI API example" just to copy a snippet I'd written before. Sound familiar? We spend way too much time hunting for code we know exists somewhere.

So I built this collection. Thirty code snippets for the OpenAI API, organized by what you're actually trying to do. Every example works with GPT-5 as of January 2026, uses current syntax, and is designed to copy-paste directly into your project.

No fluff. No lengthy explanations where you don't need them. Just working code with brief context on when to use it.

Let's start building.

## Getting Started: Setup & Authentication

Before any of the fun stuff, you need the basics in place. Here are the three snippets you'll use in every project.

### Snippet 1: Install and Import

```python
# Install the library
# pip install openai

from openai import OpenAI
```

That's it. The `openai` package is all you need. It includes everything—chat, embeddings, images, the works.

### Snippet 2: API Key Configuration

```python
import os
from openai import OpenAI

# Option 1: Environment variable (recommended)
client = OpenAI()  # Reads OPENAI_API_KEY automatically

# Option 2: Explicit API key (for testing only)
client = OpenAI(api_key="sk-your-api-key-here")

# Option 3: From .env file
from dotenv import load_dotenv
load_dotenv()
client = OpenAI()
```

**Pro tip:** Never hardcode API keys in production. Use environment variables or a secrets manager.

### Snippet 3: Basic Client with Custom Settings

```python
from openai import OpenAI
import httpx

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
    organization="org-your-org-id",  # Optional
    timeout=30.0,  # Request timeout in seconds
    max_retries=3,  # Automatic retry on failure
)
```

The client handles connection pooling and retries. Set `max_retries` higher if you're hitting rate limits occasionally.

## Chat Completions

The bread and butter of OpenAI API usage. Here's everything from basic calls to advanced configuration.

### Snippet 4: Simple Chat Completion

```python
response = client.chat.completions.create(
    model="gpt-5",
    messages=[
        {"role": "user", "content": "What is machine learning in one sentence?"}
    ]
)

print(response.choices[0].message.content)
```

This is the minimum viable API call. You'll use this pattern hundreds of times.

### Snippet 5: With System Prompt

```python
response = client.chat.completions.create(
    model="gpt-5",
    messages=[
        {
            "role": "system",
            "content": "You are a helpful coding assistant. Be concise and use code examples."
        },
        {"role": "user", "content": "How do I read a JSON file in Python?"}
    ]
)

print(response.choices[0].message.content)
```

The system prompt sets the AI's behavior. For more on crafting effective [system prompts](/blog/system-prompts-explained), check our dedicated guide.

### Snippet 6: Temperature and Top-P Control

```python
# Creative writing (higher temperature)
creative_response = client.chat.completions.create(
    model="gpt-5",
    messages=[{"role": "user", "content": "Write a haiku about Python"}],
    temperature=0.9,  # Higher = more creative (0-2)
    top_p=0.95
)

# Precise answers (lower temperature)
precise_response = client.chat.completions.create(
    model="gpt-5",
    messages=[{"role": "user", "content": "What is 2 + 2?"}],
    temperature=0.1,  # Lower = more deterministic
)
```

Use `temperature` for creativity control. Set it low (0.1-0.3) for factual tasks, higher (0.7-1.0) for creative work.

### Snippet 7: Max Tokens and Stop Sequences

```python
response = client.chat.completions.create(
    model="gpt-5",
    messages=[{"role": "user", "content": "List programming languages:"}],
    max_tokens=150,  # Limit response length
    stop=["\n\n", "10."],  # Stop at these sequences
)

# Check token usage
print(f"Prompt tokens: {response.usage.prompt_tokens}")
print(f"Completion tokens: {response.usage.completion_tokens}")
print(f"Total tokens: {response.usage.total_tokens}")
```

Setting `max_tokens` helps control costs. The `stop` parameter is useful for structured outputs.

### Snippet 8: JSON Response Format

```python
response = client.chat.completions.create(
    model="gpt-5",
    messages=[
        {
            "role": "system",
            "content": "Extract info and return valid JSON."
        },
        {
            "role": "user",
            "content": "John is 30 years old and lives in NYC."
        }
    ],
    response_format={"type": "json_object"}
)

import json
data = json.loads(response.choices[0].message.content)
print(data)  # {"name": "John", "age": 30, "city": "NYC"}
```

JSON mode guarantees valid JSON output. Your parsing code will thank you.

## Function Calling & Tools

This is where the API gets powerful. Function calling lets GPT-5 interact with your code. Check our [full OpenAI API tutorial](/blog/openai-api-tutorial) for deeper coverage.

### Snippet 9: Define a Function

```python
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get current weather for a location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "City and state, e.g., 'San Francisco, CA'"
                    },
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"],
                        "default": "fahrenheit"
                    }
                },
                "required": ["location"]
            }
        }
    }
]

response = client.chat.completions.create(
    model="gpt-5",
    messages=[{"role": "user", "content": "What's the weather in Tokyo?"}],
    tools=tools,
    tool_choice="auto"
)
```

The model decides when to call functions based on user input.

### Snippet 10: Parse and Execute Function Calls

```python
import json

def get_weather(location: str, unit: str = "fahrenheit") -> str:
    # Your actual weather API call would go here
    return f"72°F and sunny in {location}"

response = client.chat.completions.create(
    model="gpt-5",
    messages=[{"role": "user", "content": "What's the weather in Paris?"}],
    tools=tools,
    tool_choice="auto"
)

message = response.choices[0].message

if message.tool_calls:
    for tool_call in message.tool_calls:
        function_name = tool_call.function.name
        arguments = json.loads(tool_call.function.arguments)
        
        # Execute the function
        if function_name == "get_weather":
            result = get_weather(**arguments)
            print(f"Weather result: {result}")
```

This pattern—detect tool call, parse arguments, execute, return—is the core of AI agents.

### Snippet 11: Multiple Tools

```python
tools = [
    {
        "type": "function",
        "function": {
            "name": "search_web",
            "description": "Search the web for information",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string"}
                },
                "required": ["query"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "calculate",
            "description": "Perform mathematical calculations",
            "parameters": {
                "type": "object",
                "properties": {
                    "expression": {"type": "string"}
                },
                "required": ["expression"]
            }
        }
    }
]

response = client.chat.completions.create(
    model="gpt-5",
    messages=[{"role": "user", "content": "What's 25% of the current Bitcoin price?"}],
    tools=tools
)
```

Multiple tools let the model choose the right one for each task.

### Snippet 12: Parallel Function Calling

```python
response = client.chat.completions.create(
    model="gpt-5",
    messages=[
        {"role": "user", "content": "Get weather for NYC, LA, and Chicago"}
    ],
    tools=tools,
    parallel_tool_calls=True  # Enable parallel execution
)

message = response.choices[0].message
if message.tool_calls:
    # Multiple tool calls returned at once
    for tool_call in message.tool_calls:
        print(f"Calling: {tool_call.function.name}")
        print(f"Args: {tool_call.function.arguments}")
```

Parallel calls are faster when you need multiple function results.

## Streaming Responses

Streaming shows text as it's generated. Essential for responsive UIs.

### Snippet 13: Basic Streaming

```python
stream = client.chat.completions.create(
    model="gpt-5",
    messages=[{"role": "user", "content": "Tell me a short story"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

The `stream=True` flag turns the response into an iterator.

### Snippet 14: Streaming with Full Response Collection

```python
full_response = ""
stream = client.chat.completions.create(
    model="gpt-5",
    messages=[{"role": "user", "content": "Explain quantum computing"}],
    stream=True
)

for chunk in stream:
    content = chunk.choices[0].delta.content
    if content:
        full_response += content
        print(content, end="", flush=True)

print(f"\n\nCollected {len(full_response)} characters")
```

Collect chunks when you need both streaming display and the complete text.

### Snippet 15: Async Streaming

```python
import asyncio

async def stream_response():
    stream = await client.chat.completions.create(
        model="gpt-5",
        messages=[{"role": "user", "content": "Write a poem"}],
        stream=True
    )
    
    async for chunk in stream:
        if chunk.choices[0].delta.content:
            print(chunk.choices[0].delta.content, end="", flush=True)

# Run it
asyncio.run(stream_response())
```

Use async streaming in async frameworks like FastAPI or aiohttp.

## Multi-Turn Conversations

Managing conversation history is crucial for chatbots and assistants.

### Snippet 16: Message History

```python
conversation = [
    {"role": "system", "content": "You are a helpful assistant."}
]

def chat(user_message: str) -> str:
    conversation.append({"role": "user", "content": user_message})
    
    response = client.chat.completions.create(
        model="gpt-5",
        messages=conversation
    )
    
    assistant_message = response.choices[0].message.content
    conversation.append({"role": "assistant", "content": assistant_message})
    
    return assistant_message

# Usage
print(chat("My name is Alex."))
print(chat("What's my name?"))  # Will remember "Alex"
```

The model uses the full history to maintain context.

### Snippet 17: Context Window Management

```python
from tiktoken import encoding_for_model

def count_tokens(messages: list, model: str = "gpt-5") -> int:
    encoding = encoding_for_model(model)
    total = 0
    for message in messages:
        total += len(encoding.encode(message["content"]))
    return total

def trim_conversation(messages: list, max_tokens: int = 8000) -> list:
    """Keep system message + recent messages within token limit."""
    system_msg = messages[0] if messages[0]["role"] == "system" else None
    other_msgs = messages[1:] if system_msg else messages
    
    while count_tokens(messages) > max_tokens and len(other_msgs) > 2:
        other_msgs.pop(0)  # Remove oldest message
    
    return [system_msg] + other_msgs if system_msg else other_msgs
```

Trim old messages when approaching context limits.

### Snippet 18: Conversation with Memory Summary

```python
def summarize_and_continue(conversation: list) -> list:
    """Summarize old messages to save tokens."""
    if len(conversation) < 10:
        return conversation
    
    # Get messages to summarize (keep system + last 4)
    to_summarize = conversation[1:-4]
    
    summary_response = client.chat.completions.create(
        model="gpt-5",
        messages=[
            {"role": "system", "content": "Summarize this conversation briefly."},
            {"role": "user", "content": str(to_summarize)}
        ]
    )
    
    summary = summary_response.choices[0].message.content
    
    # Build new conversation
    new_conversation = [conversation[0]]  # System message
    new_conversation.append({
        "role": "system",
        "content": f"Previous conversation summary: {summary}"
    })
    new_conversation.extend(conversation[-4:])  # Recent messages
    
    return new_conversation
```

Summarization helps maintain context in long conversations without hitting token limits.

## Image Generation with DALL-E

DALL-E 3 is included with the OpenAI API. Here's how to generate images.

### Snippet 19: Generate an Image

```python
response = client.images.generate(
    model="dall-e-3",
    prompt="A serene Japanese garden with cherry blossoms, digital art",
    size="1024x1024",
    quality="standard",
    n=1
)

image_url = response.data[0].url
print(f"Image URL: {image_url}")

# Download the image
import requests
img_data = requests.get(image_url).content
with open("garden.png", "wb") as f:
    f.write(img_data)
```

DALL-E 3 supports sizes: 1024x1024, 1792x1024, 1024x1792.

### Snippet 20: Image Variations

```python
# Create variations of an existing image
with open("original.png", "rb") as image_file:
    response = client.images.create_variation(
        image=image_file,
        model="dall-e-2",  # Variations only work with DALL-E 2
        n=3,
        size="1024x1024"
    )

for i, img in enumerate(response.data):
    print(f"Variation {i+1}: {img.url}")
```

Note: Variations require DALL-E 2, not DALL-E 3.

### Snippet 21: Edit an Image (Inpainting)

```python
with open("image.png", "rb") as image, open("mask.png", "rb") as mask:
    response = client.images.edit(
        image=image,
        mask=mask,  # Transparent areas get edited
        prompt="A red sports car",
        size="1024x1024",
        n=1
    )

print(f"Edited image: {response.data[0].url}")
```

The mask should be a PNG with transparent areas where you want edits.

## Embeddings

Embeddings convert text to vectors for semantic search and similarity.

### Snippet 22: Create a Single Embedding

```python
response = client.embeddings.create(
    model="text-embedding-3-large",
    input="Machine learning is a subset of artificial intelligence."
)

embedding = response.data[0].embedding
print(f"Embedding dimension: {len(embedding)}")  # 3072 for large model
```

The `text-embedding-3-large` model produces 3072-dimensional vectors.

### Snippet 23: Batch Embeddings

```python
texts = [
    "Python is a programming language.",
    "JavaScript runs in browsers.",
    "Machine learning uses algorithms.",
]

response = client.embeddings.create(
    model="text-embedding-3-large",
    input=texts
)

embeddings = [item.embedding for item in response.data]
print(f"Created {len(embeddings)} embeddings")
```

Batch embedding is more efficient than individual calls.

### Snippet 24: Cosine Similarity for Search

```python
import numpy as np

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# Your document embeddings (pre-computed)
documents = [
    {"text": "Python tutorial", "embedding": [...]},
    {"text": "JavaScript guide", "embedding": [...]},
]

# Query embedding
query_response = client.embeddings.create(
    model="text-embedding-3-large",
    input="How to learn Python?"
)
query_embedding = query_response.data[0].embedding

# Find most similar
similarities = [
    (doc["text"], cosine_similarity(query_embedding, doc["embedding"]))
    for doc in documents
]
similarities.sort(key=lambda x: x[1], reverse=True)

print(f"Best match: {similarities[0][0]}")
```

This is the foundation of [semantic search and RAG systems](/blog/build-rag-chatbot-tutorial).

## Vision & Multimodal

GPT-5 can analyze images. Here's how to use vision capabilities.

### Snippet 25: Analyze an Image

```python
response = client.chat.completions.create(
    model="gpt-5",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "What's in this image?"},
                {
                    "type": "image_url",
                    "image_url": {"url": "https://example.com/image.jpg"}
                }
            ]
        }
    ],
    max_tokens=300
)

print(response.choices[0].message.content)
```

The message content becomes an array with text and image parts.

### Snippet 26: Multiple Images

```python
response = client.chat.completions.create(
    model="gpt-5",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "Compare these two images:"},
                {"type": "image_url", "image_url": {"url": "https://example.com/img1.jpg"}},
                {"type": "image_url", "image_url": {"url": "https://example.com/img2.jpg"}}
            ]
        }
    ]
)
```

You can include multiple images in a single request.

### Snippet 27: Base64 Encoded Image

```python
import base64

def encode_image(image_path: str) -> str:
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")

image_data = encode_image("local_image.jpg")

response = client.chat.completions.create(
    model="gpt-5",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "Describe this image:"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{image_data}"
                    }
                }
            ]
        }
    ]
)
```

Base64 is useful for local images without public URLs.

## Error Handling & Best Practices

Production code needs robust error handling. Here are patterns that save debugging time.

### Snippet 28: Retry Logic with Backoff

```python
import time
from openai import RateLimitError, APIError

def call_with_retry(messages, max_retries=3):
    for attempt in range(max_retries):
        try:
            return client.chat.completions.create(
                model="gpt-5",
                messages=messages
            )
        except RateLimitError:
            wait_time = 2 ** attempt  # Exponential backoff
            print(f"Rate limited. Waiting {wait_time}s...")
            time.sleep(wait_time)
        except APIError as e:
            print(f"API error: {e}")
            if attempt == max_retries - 1:
                raise
    raise Exception("Max retries exceeded")
```

Exponential backoff is the standard pattern for rate limit handling.

### Snippet 29: Comprehensive Error Handling

```python
from openai import (
    APIError,
    APIConnectionError,
    RateLimitError,
    AuthenticationError
)

try:
    response = client.chat.completions.create(
        model="gpt-5",
        messages=[{"role": "user", "content": "Hello"}]
    )
except AuthenticationError:
    print("Invalid API key. Check your credentials.")
except RateLimitError:
    print("Rate limit exceeded. Wait and retry.")
except APIConnectionError:
    print("Network error. Check your connection.")
except APIError as e:
    print(f"OpenAI API error: {e.message}")
except Exception as e:
    print(f"Unexpected error: {e}")
```

Handle specific exceptions for better error messages.

### Snippet 30: Token Counting Before Request

```python
import tiktoken

def estimate_tokens(messages: list, model: str = "gpt-5") -> int:
    """Estimate tokens before making API call."""
    encoding = tiktoken.encoding_for_model(model)
    
    num_tokens = 0
    for message in messages:
        num_tokens += 4  # Message overhead
        for key, value in message.items():
            num_tokens += len(encoding.encode(value))
    num_tokens += 2  # Reply priming
    
    return num_tokens

# Check before calling
messages = [{"role": "user", "content": "Your long prompt here..."}]
estimated = estimate_tokens(messages)
print(f"Estimated tokens: {estimated}")

if estimated > 100000:  # Near GPT-5 limit
    print("Warning: Approaching token limit!")
```

Pre-counting tokens helps avoid unexpected errors and costs.

## Frequently Asked Questions

### Which model should I use in 2026?

For most use cases, `gpt-5` is the best balance of capability and cost. Use `gpt-5-turbo` for faster responses at lower cost, or `gpt-5-mini` for high-volume, simpler tasks.

### How do I reduce API costs?

Three strategies: 1) Use `max_tokens` to limit responses, 2) Use cheaper models for simpler tasks, 3) Cache responses when inputs repeat. Token counting (Snippet 30) also helps predict costs.

### Can I use these snippets with async Python?

Yes! The OpenAI library supports async natively. Replace `client = OpenAI()` with `client = AsyncOpenAI()` and add `await` before API calls. See Snippet 15 for an example.

### How do I handle conversation history in production?

Store messages in a database or session storage. Use the trimming (Snippet 17) or summarization (Snippet 18) patterns to manage context length.

### What's the difference between function calling and tools?

They're the same thing—"tools" is the newer terminology. The API uses `tools` parameter but the concept is often called "function calling."

## Start Building with OpenAI

Thirty snippets, each solving a specific problem. Bookmark this page—you'll be back.

The best way to learn is by building. Pick a snippet that matches what you're working on, paste it in, modify it for your use case. That's how I learned, and it's the fastest path from "reading about APIs" to "shipping products."

Want more [coding-focused prompts](/blog/chatgpt-for-coding-developers-guide) or to understand the underlying [prompt engineering](/blog/prompt-engineering-beginners-guide) principles? We've got you covered.

Now go build something.
