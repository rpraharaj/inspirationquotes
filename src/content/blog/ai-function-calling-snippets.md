---
heroImage: "/images/featured/ai-function-calling-snippets.webp"
title: "AI Function Calling Code: Tool Use Snippets for LLMs"
description: "Copy-paste Python code for LLM function calling with OpenAI, Claude, and Gemini. Includes tool definitions, parallel execution, and common tool patterns."
pubDate: 2025-12-13
category: code-snippets
author: Raj Praharaj
tags:
  - Function Calling
  - Tool Use
  - LLM
  - OpenAI
  - Claude
  - Python
  - Streaming
  - MCP
readingTime: 28 min read
---

Function calling changed everything about what you can build with LLMs. Before it existed, getting AI to take real actions was a mess of prompt engineering and regex parsing. Now? You define a function schema, and the model tells you exactly what to call with structured arguments. No parsing nightmares, no "I hope the model formatted this correctly."

I use function calling in almost every AI project now—from simple chatbots that check the weather to complex agents that orchestrate entire workflows. The patterns here are the ones I reach for constantly, refined through building dozens of production features.

Every snippet is copy-paste ready and tested with the latest API versions.

## Understanding Function Calling

Function calling (also called "tool use") lets LLMs request the execution of predefined functions. The model doesn't actually run code—it requests a function call, you execute it, and you return the result.

The flow works like this:

1. You define functions the model can use (name, description, parameters)
2. You send a message along with available functions
3. The model decides if it needs a function and returns a function call request
4. You execute the function with the provided arguments
5. You return the result to the model
6. The model incorporates the result into its response

**When to use function calling:**
- Accessing real-time data (weather, stocks, databases)
- Taking actions (sending emails, creating records)
- Structured data extraction
- Building AI agents that interact with systems

For a comparison with the Model Context Protocol approach, see our guide on [MCP vs function calling](/blog/mcp-vs-function-calling).

### Choosing Your Integration Approach

Function calling isn't the only way to connect LLMs to external systems. Here's when to use each approach:

| Approach | Best For | Trade-offs |
|----------|----------|------------|
| **Function calling** | Structured tool use within a conversation | Vendor-specific, tightly coupled to your code |
| **MCP (Model Context Protocol)** | Reusable tools across applications, enterprise deployments | More infrastructure, separate server process |
| **Output parsing** | Simple extractions, when you just need structured data | Fragile, model-dependent formatting |
| **ReAct agents** | Complex reasoning chains, when the model needs to plan | Higher latency, harder to debug |

**My recommendation:** Start with function calling for its simplicity. Move to [MCP](/blog/what-is-mcp) when you're building tools you'll reuse across projects or need to share across a team. The concepts transfer directly—MCP tools are essentially function definitions with a standard transport layer.

## OpenAI Function Calling

OpenAI's function calling is the most mature implementation. GPT-5 handles complex multi-function scenarios reliably. For the official documentation, see the <a href="https://platform.openai.com/docs/guides/function-calling" target="_blank" rel="noopener">OpenAI Function Calling Guide</a>.

### Understanding the Schema Design

The function schema is the most important part of your implementation. A well-designed schema leads to reliable function calls; a vague schema leads to frustration and hallucinated arguments.

**Key principles for schema design:**

- **Specific descriptions:** Don't write "Gets weather." Write "Retrieves current weather conditions including temperature, humidity, and conditions for a specified city." The model uses this text to decide when to call the function.
- **Parameter constraints:** Use `enum` for fixed options, `minimum`/`maximum` for numbers, and clear descriptions for each parameter. The more constraints you provide, the more reliable the outputs.
- **Required vs optional:** Only mark parameters as required if they're truly necessary. Optional parameters with good defaults reduce friction.

The JSON Schema format follows the <a href="https://json-schema.org/specification" target="_blank" rel="noopener">JSON Schema specification</a>. You don't need to master the full spec, but understanding `type`, `properties`, `required`, `enum`, and `description` covers 95% of use cases.

### Basic Function Definition

Functions are defined as JSON schemas:

```python
from openai import OpenAI

client = OpenAI()

# Define a weather function
weather_function = {
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Get the current weather for a location. Use this when the user asks about weather conditions.",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "City and state/country, e.g., 'San Francisco, CA' or 'London, UK'"
                },
                "unit": {
                    "type": "string",
                    "enum": ["celsius", "fahrenheit"],
                    "description": "Temperature unit preference"
                }
            },
            "required": ["location"]
        }
    }
}

# Define multiple functions
tools = [
    weather_function,
    {
        "type": "function",
        "function": {
            "name": "search_web",
            "description": "Search the web for current information",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "Search query"
                    }
                },
                "required": ["query"]
            }
        }
    }
]
```

### Single Function Call

```python
import json

def get_weather(location: str, unit: str = "celsius") -> dict:
    """Your actual weather API implementation."""
    # This would call a real weather API
    return {
        "location": location,
        "temperature": 22 if unit == "celsius" else 72,
        "unit": unit,
        "conditions": "sunny"
    }

def run_conversation(user_message: str):
    """Complete function calling flow."""
    
    messages = [{"role": "user", "content": user_message}]
    
    # First API call - may request function
    response = client.chat.completions.create(
        model="gpt-5-turbo",
        messages=messages,
        tools=tools
    )
    
    message = response.choices[0].message
    
    # Check if model wants to call a function
    if message.tool_calls:
        # Add the assistant's response to messages
        messages.append(message)
        
        # Execute each function call
        for tool_call in message.tool_calls:
            function_name = tool_call.function.name
            arguments = json.loads(tool_call.function.arguments)
            
            # Route to appropriate function
            if function_name == "get_weather":
                result = get_weather(**arguments)
            elif function_name == "search_web":
                result = search_web(**arguments)
            else:
                result = {"error": f"Unknown function: {function_name}"}
            
            # Add function result to messages
            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": json.dumps(result)
            })
        
        # Second API call - get final response
        final_response = client.chat.completions.create(
            model="gpt-5-turbo",
            messages=messages,
            tools=tools
        )
        
        return final_response.choices[0].message.content
    
    # No function call needed
    return message.content

# Usage
response = run_conversation("What's the weather like in Tokyo?")
print(response)
```

### Parallel Function Calling

GPT-5 can request multiple functions simultaneously:

```python
def run_parallel_functions(user_message: str):
    """Handle parallel function calls."""
    
    messages = [{"role": "user", "content": user_message}]
    
    response = client.chat.completions.create(
        model="gpt-5-turbo",
        messages=messages,
        tools=tools,
        parallel_tool_calls=True  # Enabled by default
    )
    
    message = response.choices[0].message
    
    if message.tool_calls:
        messages.append(message)
        
        # Execute all function calls (potentially in parallel)
        import concurrent.futures
        
        def execute_tool(tool_call):
            function_name = tool_call.function.name
            arguments = json.loads(tool_call.function.arguments)
            
            if function_name == "get_weather":
                return tool_call.id, get_weather(**arguments)
            elif function_name == "search_web":
                return tool_call.id, search_web(**arguments)
            return tool_call.id, {"error": "Unknown function"}
        
        # Execute in parallel
        with concurrent.futures.ThreadPoolExecutor() as executor:
            results = list(executor.map(execute_tool, message.tool_calls))
        
        # Add all results
        for tool_call_id, result in results:
            messages.append({
                "role": "tool",
                "tool_call_id": tool_call_id,
                "content": json.dumps(result)
            })
        
        # Get final response
        final = client.chat.completions.create(
            model="gpt-5-turbo",
            messages=messages,
            tools=tools
        )
        
        return final.choices[0].message.content
    
    return message.content

# Example: "What's the weather in Tokyo and New York?"
# Model will call get_weather twice in parallel
```

### Forcing Function Use

Sometimes you want to guarantee the model calls a specific function:

```python
# Force any function call
response = client.chat.completions.create(
    model="gpt-5-turbo",
    messages=messages,
    tools=tools,
    tool_choice="required"  # Must call at least one function
)

# Force a specific function
response = client.chat.completions.create(
    model="gpt-5-turbo",
    messages=messages,
    tools=tools,
    tool_choice={
        "type": "function",
        "function": {"name": "get_weather"}
    }
)

# Disable function calling for this request
response = client.chat.completions.create(
    model="gpt-5-turbo",
    messages=messages,
    tools=tools,
    tool_choice="none"
)
```

For more OpenAI patterns, see our [OpenAI API tutorial](/blog/openai-api-tutorial).

## Claude Tool Use

Anthropic's Claude calls these "tools" rather than functions, but the concept is identical. Claude 4 has excellent tool use capabilities. Check the official <a href="https://docs.anthropic.com/claude/docs/tool-use" target="_blank" rel="noopener">Anthropic Tool Use documentation</a> for the latest features.

### Tool Definition

```python
from anthropic import Anthropic

client = Anthropic()

tools = [
    {
        "name": "get_weather",
        "description": "Get the current weather for a location. Call this when users ask about weather.",
        "input_schema": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "City and country, e.g., 'Tokyo, Japan'"
                },
                "unit": {
                    "type": "string",
                    "enum": ["celsius", "fahrenheit"],
                    "description": "Temperature unit"
                }
            },
            "required": ["location"]
        }
    },
    {
        "name": "search_database",
        "description": "Search the product database",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string"},
                "category": {"type": "string"},
                "max_results": {"type": "integer", "default": 10}
            },
            "required": ["query"]
        }
    }
]
```

### Single Tool Use

```python
def run_claude_tools(user_message: str):
    """Claude tool use flow."""
    
    messages = [{"role": "user", "content": user_message}]
    
    response = client.messages.create(
        model="claude-4-sonnet",
        max_tokens=1024,
        tools=tools,
        messages=messages
    )
    
    # Check stop reason
    if response.stop_reason == "tool_use":
        # Extract tool use blocks
        tool_uses = [
            block for block in response.content
            if block.type == "tool_use"
        ]
        
        # Add assistant response
        messages.append({"role": "assistant", "content": response.content})
        
        # Execute tools and collect results
        tool_results = []
        for tool_use in tool_uses:
            result = execute_tool(tool_use.name, tool_use.input)
            tool_results.append({
                "type": "tool_result",
                "tool_use_id": tool_use.id,
                "content": json.dumps(result)
            })
        
        # Add tool results
        messages.append({"role": "user", "content": tool_results})
        
        # Get final response
        final = client.messages.create(
            model="claude-4-sonnet",
            max_tokens=1024,
            tools=tools,
            messages=messages
        )
        
        return extract_text(final.content)
    
    return extract_text(response.content)

def execute_tool(name: str, inputs: dict):
    """Execute a tool by name."""
    if name == "get_weather":
        return get_weather(**inputs)
    elif name == "search_database":
        return search_database(**inputs)
    return {"error": f"Unknown tool: {name}"}

def extract_text(content) -> str:
    """Extract text from Claude response content."""
    return "".join(
        block.text for block in content
        if hasattr(block, "text")
    )
```

### Multi-Turn Tool Use

Claude can use tools across multiple conversation turns:

```python
def chat_with_tools(conversation: list):
    """Multi-turn conversation with tools."""
    
    while True:
        response = client.messages.create(
            model="claude-4-sonnet",
            max_tokens=1024,
            tools=tools,
            messages=conversation
        )
        
        # Add response to conversation
        conversation.append({
            "role": "assistant",
            "content": response.content
        })
        
        # If not a tool use, return the response
        if response.stop_reason != "tool_use":
            return extract_text(response.content)
        
        # Execute all tools
        tool_results = []
        for block in response.content:
            if block.type == "tool_use":
                result = execute_tool(block.name, block.input)
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": json.dumps(result)
                })
        
        # Add results for next iteration
        conversation.append({
            "role": "user",
            "content": tool_results
        })
```

For more Claude patterns, see our [Claude API tutorial](/blog/claude-api-tutorial).

## Gemini Function Calling

Google's Gemini also supports function calling with a similar pattern:

```python
import google.generativeai as genai
from google.generativeai.types import FunctionDeclaration, Tool

genai.configure(api_key="your-api-key")

# Define functions
get_weather_func = FunctionDeclaration(
    name="get_weather",
    description="Get the weather for a location",
    parameters={
        "type": "object",
        "properties": {
            "location": {
                "type": "string",
                "description": "City name"
            }
        },
        "required": ["location"]
    }
)

# Create tool with functions
weather_tool = Tool(function_declarations=[get_weather_func])

# Create model with tools
model = genai.GenerativeModel(
    "gemini-3-pro",
    tools=[weather_tool]
)

def run_gemini_functions(prompt: str):
    """Gemini function calling flow."""
    
    chat = model.start_chat()
    response = chat.send_message(prompt)
    
    # Check for function calls
    for part in response.parts:
        if hasattr(part, "function_call"):
            func_call = part.function_call
            
            # Execute function
            result = execute_function(func_call.name, dict(func_call.args))
            
            # Send result back
            response = chat.send_message(
                genai.protos.Content(
                    parts=[genai.protos.Part(
                        function_response=genai.protos.FunctionResponse(
                            name=func_call.name,
                            response={"result": result}
                        )
                    )]
                )
            )
    
    return response.text
```

## Common Tool Patterns

Here are reusable tool patterns for common use cases.

### Web Search Tool

```python
def create_search_tool():
    """Web search tool using a search API."""
    return {
        "type": "function",
        "function": {
            "name": "search_web",
            "description": "Search the web for current information. Use for facts, news, or anything needing up-to-date data.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "Search query"
                    },
                    "num_results": {
                        "type": "integer",
                        "description": "Number of results (1-10)",
                        "default": 5
                    }
                },
                "required": ["query"]
            }
        }
    }

def search_web(query: str, num_results: int = 5) -> list:
    """Execute web search."""
    # Use your preferred search API (Serp, Tavily, etc.)
    import requests
    
    response = requests.get(
        "https://api.search.example/search",
        params={"q": query, "num": num_results},
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    
    return response.json()["results"]
```

### Database Query Tool

```python
def create_database_tool():
    """SQL query tool with safety constraints."""
    return {
        "type": "function",
        "function": {
            "name": "query_database",
            "description": "Execute a read-only SQL query. Only SELECT queries allowed.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "SQL SELECT query"
                    },
                    "limit": {
                        "type": "integer",
                        "description": "Max rows to return",
                        "default": 100
                    }
                },
                "required": ["query"]
            }
        }
    }

def query_database(query: str, limit: int = 100) -> dict:
    """Execute safe database query."""
    
    # Safety: Only allow SELECT
    query_upper = query.strip().upper()
    if not query_upper.startswith("SELECT"):
        return {"error": "Only SELECT queries allowed"}
    
    # Prevent dangerous operations
    dangerous = ["DROP", "DELETE", "UPDATE", "INSERT", "ALTER", "TRUNCATE"]
    if any(kw in query_upper for kw in dangerous):
        return {"error": "Query contains forbidden keywords"}
    
    # Add LIMIT if not present
    if "LIMIT" not in query_upper:
        query = f"{query} LIMIT {limit}"
    
    # Execute (use your database connection)
    import sqlite3
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute(query)
    
    columns = [desc[0] for desc in cursor.description]
    rows = cursor.fetchall()
    
    return {
        "columns": columns,
        "rows": rows,
        "row_count": len(rows)
    }
```

### API Call Tool

```python
def create_api_tool():
    """Generic HTTP API call tool."""
    return {
        "type": "function",
        "function": {
            "name": "call_api",
            "description": "Make an HTTP request to an API endpoint",
            "parameters": {
                "type": "object",
                "properties": {
                    "url": {
                        "type": "string",
                        "description": "API endpoint URL"
                    },
                    "method": {
                        "type": "string",
                        "enum": ["GET", "POST"],
                        "description": "HTTP method"
                    },
                    "body": {
                        "type": "object",
                        "description": "Request body for POST requests"
                    }
                },
                "required": ["url", "method"]
            }
        }
    }

def call_api(url: str, method: str, body: dict = None) -> dict:
    """Execute API call with safety checks."""
    import requests
    
    # Whitelist allowed domains
    allowed_domains = ["api.example.com", "api.trusted.io"]
    from urllib.parse import urlparse
    
    domain = urlparse(url).netloc
    if domain not in allowed_domains:
        return {"error": f"Domain not allowed: {domain}"}
    
    try:
        if method == "GET":
            response = requests.get(url, timeout=10)
        else:
            response = requests.post(url, json=body, timeout=10)
        
        return {
            "status_code": response.status_code,
            "data": response.json()
        }
    except Exception as e:
        return {"error": str(e)}
```

### File Operations Tool

```python
def create_file_tool():
    """Safe file reading tool."""
    return {
        "type": "function",
        "function": {
            "name": "read_file",
            "description": "Read contents of a file",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string",
                        "description": "File path relative to workspace"
                    }
                },
                "required": ["path"]
            }
        }
    }

def read_file(path: str) -> dict:
    """Read file with safety constraints."""
    import os
    
    # Prevent directory traversal
    if ".." in path or path.startswith("/"):
        return {"error": "Invalid path"}
    
    # Restrict to workspace directory
    workspace = "/app/workspace"
    full_path = os.path.join(workspace, path)
    
    # Ensure path is within workspace
    if not os.path.abspath(full_path).startswith(workspace):
        return {"error": "Path outside workspace"}
    
    if not os.path.exists(full_path):
        return {"error": "File not found"}
    
    try:
        with open(full_path, "r") as f:
            content = f.read()
        return {"content": content, "size": len(content)}
    except Exception as e:
        return {"error": str(e)}
```

## Parallel and Multi-Tool Patterns

### Tool Chaining

When one tool's output feeds another:

```python
def chained_tool_flow(user_message: str):
    """Handle tools that depend on each other."""
    
    messages = [{"role": "user", "content": user_message}]
    max_iterations = 5
    iteration = 0
    
    while iteration < max_iterations:
        iteration += 1
        
        response = client.chat.completions.create(
            model="gpt-5-turbo",
            messages=messages,
            tools=tools
        )
        
        message = response.choices[0].message
        
        # No more tool calls - return final answer
        if not message.tool_calls:
            return message.content
        
        messages.append(message)
        
        # Execute all tool calls
        for tool_call in message.tool_calls:
            result = execute_tool(
                tool_call.function.name,
                json.loads(tool_call.function.arguments)
            )
            
            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": json.dumps(result)
            })
    
    return "Max iterations reached"
```

## Error Handling in Tool Use

Robust error handling for function calling:

```python
def safe_tool_execution(tool_call) -> dict:
    """Execute tool with comprehensive error handling."""
    
    function_name = tool_call.function.name
    
    # Parse arguments safely
    try:
        arguments = json.loads(tool_call.function.arguments)
    except json.JSONDecodeError as e:
        return {
            "error": "Invalid JSON arguments",
            "details": str(e)
        }
    
    # Validate required parameters
    tool_schema = get_tool_schema(function_name)
    required = tool_schema.get("required", [])
    missing = [p for p in required if p not in arguments]
    if missing:
        return {"error": f"Missing required parameters: {missing}"}
    
    # Execute with timeout
    import concurrent.futures
    
    try:
        with concurrent.futures.ThreadPoolExecutor() as executor:
            future = executor.submit(
                execute_tool, function_name, arguments
            )
            result = future.result(timeout=30)
            return result
    except concurrent.futures.TimeoutError:
        return {"error": "Tool execution timed out"}
    except Exception as e:
        return {"error": f"Execution failed: {str(e)}"}
```

### Retry Patterns with Exponential Backoff

When tools fail, you don't always want to give up immediately. Here's a retry pattern I've found reliable in production:

```python
import time
import random

def execute_with_retry(tool_call, max_retries: int = 3) -> dict:
    """Retry failed tools with exponential backoff."""
    
    base_delay = 1.0  # Initial delay in seconds
    
    for attempt in range(max_retries + 1):
        result = safe_tool_execution(tool_call)
        
        # Success - return immediately
        if "error" not in result:
            return result
        
        # Check if error is retryable
        error = result.get("error", "")
        retryable_errors = [
            "rate limit",
            "timeout",
            "connection",
            "temporary",
            "503",
            "429"
        ]
        
        is_retryable = any(err in error.lower() for err in retryable_errors)
        
        if not is_retryable or attempt == max_retries:
            return result
        
        # Calculate delay with jitter
        delay = base_delay * (2 ** attempt) + random.uniform(0, 1)
        print(f"Retry {attempt + 1}/{max_retries} after {delay:.2f}s: {error}")
        time.sleep(delay)
    
    return result
```

### Graceful Degradation Strategies

Sometimes the best response to a tool failure is to gracefully fall back. Here's a pattern that keeps your agent running even when tools fail:

```python
def execute_with_fallback(tool_call, fallback_tools: dict) -> dict:
    """Try primary tool, fall back to alternatives on failure."""
    
    primary_result = safe_tool_execution(tool_call)
    
    if "error" not in primary_result:
        return primary_result
    
    # Check for fallback
    function_name = tool_call.function.name
    fallback_fn = fallback_tools.get(function_name)
    
    if fallback_fn:
        try:
            arguments = json.loads(tool_call.function.arguments)
            fallback_result = fallback_fn(**arguments)
            return {
                "result": fallback_result,
                "source": "fallback",
                "primary_error": primary_result["error"]
            }
        except Exception as e:
            pass  # Fall through to return error
    
    # Return original error with context
    return {
        **primary_result,
        "fallback_attempted": fallback_fn is not None
    }

# Example fallback configuration
fallback_tools = {
    "get_weather": lambda location, **kwargs: {
        "location": location,
        "status": "Weather service unavailable",
        "suggestion": "Try again in a few minutes"
    },
    "search_web": lambda query, **kwargs: {
        "query": query,
        "results": [],
        "message": "Search temporarily unavailable"
    }
}
```

### Logging and Debugging Best Practices

I can't stress this enough—good logging saves hours of debugging. Here's a structured logging pattern that's made my life easier:

```python
import logging
import uuid
from datetime import datetime

# Configure structured logging
logger = logging.getLogger("function_calling")

def log_tool_execution(tool_call, result, execution_time: float):
    """Log tool execution with structured data."""
    
    log_data = {
        "trace_id": str(uuid.uuid4()),
        "timestamp": datetime.utcnow().isoformat(),
        "function": tool_call.function.name,
        "execution_time_ms": round(execution_time * 1000, 2),
        "success": "error" not in result,
        "error": result.get("error") if "error" in result else None
    }
    
    # Log at appropriate level
    if log_data["success"]:
        logger.info("Tool execution completed", extra=log_data)
    else:
        logger.error("Tool execution failed", extra=log_data)
    
    return log_data

def traced_tool_execution(tool_call) -> tuple[dict, dict]:
    """Execute tool with full tracing."""
    
    start_time = time.time()
    result = safe_tool_execution(tool_call)
    execution_time = time.time() - start_time
    
    log_data = log_tool_execution(tool_call, result, execution_time)
    
    return result, log_data
```

## Streaming with Function Calls

Streaming responses while handling function calls is one of the trickier patterns to get right. The challenge? Function call arguments arrive in chunks, so you need to accumulate them before executing. Here's how to handle it elegantly.

### Server-Sent Events (SSE) with Tools

This pattern lets you stream text responses while still supporting function calls—the best of both worlds:

```python
import json
from openai import OpenAI

client = OpenAI()

def stream_with_functions(user_message: str, tools: list):
    """Stream responses, handling function calls mid-stream."""
    
    messages = [{"role": "user", "content": user_message}]
    
    response = client.chat.completions.create(
        model="gpt-5-turbo",
        messages=messages,
        tools=tools,
        stream=True
    )
    
    # Accumulators for streamed content
    content_chunks = []
    tool_calls_data = {}  # id -> {name, arguments}
    
    for chunk in response:
        delta = chunk.choices[0].delta
        
        # Handle text content
        if delta.content:
            content_chunks.append(delta.content)
            yield {"type": "content", "data": delta.content}
        
        # Handle tool calls (streamed in chunks)
        if delta.tool_calls:
            for tc in delta.tool_calls:
                tc_id = tc.id or list(tool_calls_data.keys())[-1]
                
                if tc_id not in tool_calls_data:
                    tool_calls_data[tc_id] = {
                        "id": tc_id,
                        "name": tc.function.name if tc.function else None,
                        "arguments": ""
                    }
                
                if tc.function:
                    if tc.function.name:
                        tool_calls_data[tc_id]["name"] = tc.function.name
                    if tc.function.arguments:
                        tool_calls_data[tc_id]["arguments"] += tc.function.arguments
    
    # If we accumulated tool calls, execute them
    if tool_calls_data:
        for tc_id, tc_data in tool_calls_data.items():
            yield {"type": "tool_start", "name": tc_data["name"]}
            
            try:
                args = json.loads(tc_data["arguments"])
                result = execute_tool(tc_data["name"], args)
                yield {"type": "tool_result", "name": tc_data["name"], "result": result}
            except Exception as e:
                yield {"type": "tool_error", "name": tc_data["name"], "error": str(e)}
```

### UI Feedback Patterns

When streaming, users need visual feedback about what's happening. Here's a pattern I use for building responsive chat UIs:

```python
import asyncio
from typing import AsyncGenerator

async def stream_with_ui_feedback(
    user_message: str,
    tools: list
) -> AsyncGenerator[dict, None]:
    """Provide rich UI feedback during streaming."""
    
    # Signal start
    yield {"type": "status", "message": "Thinking..."}
    
    messages = [{"role": "user", "content": user_message}]
    current_tool = None
    
    async for event in async_stream_with_functions(messages, tools):
        match event["type"]:
            case "content":
                # Switch status if needed
                if current_tool:
                    yield {"type": "status", "message": "Responding..."}
                    current_tool = None
                yield event
                
            case "tool_start":
                current_tool = event["name"]
                # Friendly tool names for UI
                friendly_names = {
                    "get_weather": "Checking weather",
                    "search_web": "Searching the web",
                    "query_database": "Looking up information"
                }
                status = friendly_names.get(current_tool, f"Using {current_tool}")
                yield {"type": "status", "message": f"{status}..."}
                yield {"type": "tool_indicator", "name": current_tool, "state": "running"}
                
            case "tool_result":
                yield {"type": "tool_indicator", "name": event["name"], "state": "complete"}
                
            case "tool_error":
                yield {"type": "tool_indicator", "name": event["name"], "state": "error"}
                yield {"type": "status", "message": "Encountered an issue, continuing..."}
    
    yield {"type": "status", "message": "Complete"}
```

### Partial Response Handling

One thing that bit me early on: users can disconnect mid-stream, and you need to handle that gracefully:

```python
class StreamingSession:
    """Manage a streaming session with cancellation support."""
    
    def __init__(self):
        self.cancelled = False
        self.accumulated_content = ""
        self.completed_tool_calls = []
    
    def cancel(self):
        """Cancel the streaming session."""
        self.cancelled = True
    
    async def stream(self, messages: list, tools: list):
        """Stream with cancellation support."""
        
        response = await client.chat.completions.create(
            model="gpt-5-turbo",
            messages=messages,
            tools=tools,
            stream=True
        )
        
        async for chunk in response:
            if self.cancelled:
                # Clean up and return partial results
                yield {
                    "type": "cancelled",
                    "partial_content": self.accumulated_content,
                    "completed_tools": self.completed_tool_calls
                }
                return
            
            delta = chunk.choices[0].delta
            if delta.content:
                self.accumulated_content += delta.content
                yield {"type": "content", "data": delta.content}
        
        # Stream completed normally
        yield {"type": "complete"}
```

## Function Calling vs MCP: When to Use Which

I get asked this question constantly. Both function calling and the [Model Context Protocol (MCP)](/blog/what-is-mcp) let LLMs interact with external systems, but they solve different problems.

### The Core Difference

**Function calling** is request-scoped: You define tools fresh for each API call. The model sees them, potentially uses them, and then they're gone.

**MCP** is connection-scoped: Tools persist across a session. You set up a connection once, and the model can use those tools throughout an entire conversation—or across multiple conversations.

Here's how I think about it:

```
Function Calling = Building blocks, assembled per request
MCP = Infrastructure, persistent and shared
```

### When to Use Function Calling

Stick with function calling when:

- **You're building a single application.** If your tools only serve one codebase, function calling keeps things simple. No separate server to run.

- **Tools change based on context.** Maybe you show different functions to different users, or adjust available tools based on conversation state. Function calling gives you that per-request flexibility.

- **You want minimal infrastructure.** Function calling is just JSON in your API call. No additional processes, no connection management, no new dependencies.

- **You're prototyping.** For quick experiments, function calling gets you from idea to working demo faster.

### When to Switch to MCP

Consider MCP (see our [MCP guide](/blog/what-is-mcp)) when:

- **You're sharing tools across applications.** Build a database tool once, use it in Claude Desktop, your web app, and your CLI tool. That's MCP's sweet spot.

- **Enterprise deployment.** Teams need centralized tool management, access control, and audit logging? MCP provides the infrastructure for that.

- **Complex tool ecosystems.** When you have 20+ tools that need versioning, monitoring, and consistent behavior across contexts.

- **Long-running sessions.** Heavy tools that benefit from persistent connections and cached state.

### Performance Considerations

I've benchmarked both approaches, and here's what I found:

| Aspect | Function Calling | MCP |
|--------|-----------------|-----|
| **Latency (first call)** | Lower—no connection setup | Higher—requires handshake |
| **Latency (subsequent)** | Same each call | Faster—connection reuse |
| **Token cost** | Higher—tools sent every request | Lower—tools defined once |
| **Cold start** | Instant | Varies by server |

For most applications under 10 tools, function calling wins on simplicity and matches MCP on performance. Beyond that, MCP's token savings add up.

### Migration Path

Here's the good news: migrating from function calling to MCP isn't a rewrite. The tool definitions are nearly identical. You're essentially moving your function schemas to a separate process and adding transport.

```python
# Function calling tool
{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Get weather for a location",
        "parameters": {...}
    }
}

# MCP tool (almost identical)
{
    "name": "get_weather",
    "description": "Get weather for a location", 
    "inputSchema": {...}  # Same as parameters
}
```

I usually recommend: start with function calling, build your tools, prove they work, then migrate to MCP when you need the scaling benefits.

For a deeper comparison, check out our [MCP vs function calling guide](/blog/mcp-vs-function-calling).

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

## Frequently Asked Questions

### What's the difference between function calling and MCP?

Function calling is request-scoped—you define tools for each API request. MCP is connection-scoped—tools persist across a session. Function calling is simpler; MCP is more powerful for complex agent architectures.

### Can the model call functions that don't exist?

Yes, and this is a real issue called "hallucinated function calls." Always validate that the function name exists before executing. The patterns above include this check.

### How do I limit which functions the model can use?

Only include the functions you want available in the `tools` parameter. You can also use `tool_choice` to force or prevent specific function calls.

### Are function call responses counted in token limits?

Yes, both the tool definitions and results count toward your context window. Large tool schemas or verbose results can significantly impact token usage.

### How should I handle sensitive operations?

Implement human-in-the-loop for sensitive tools. Show the user what the model wants to do and wait for confirmation before executing.

### Can I use function calling with streaming?

Yes, all providers support streaming with function calling. Tool call arguments are streamed in chunks that you accumulate before parsing.

### How many functions can I define at once?

There's no hard limit, but practical constraints matter. More than 15-20 functions significantly increases token usage and can confuse the model. Group related functions logically and only include those relevant to the current task.

### Do I need to define functions every request?

Yes, function definitions are sent with each API call. They're not persisted on the server. This is actually beneficial—you can dynamically adjust available tools per request.

### Can functions call other functions?

The model can request multiple function calls in sequence (tool chaining), where the output of one informs the next. The model handles the orchestration; you just execute whatever it requests.

### What happens if my function takes too long?

The API call remains open while you execute the function. Implement timeouts (30 seconds is reasonable) and return error objects if functions fail. The model can adapt its response based on the error.

## Wrapping Up

Function calling transforms LLMs from text generators to capable agents. The patterns here give you:

- **OpenAI**: Basic, parallel, and forced function calling
- **Claude**: Tool definitions and multi-turn use
- **Gemini**: Function declarations and execution
- **Common tools**: Web search, database, API, file operations
- **Safety**: Input validation and timeout handling

These are the building blocks for AI applications that do real work in the world. Start with the basic patterns, add safety checks, and build up to complex multi-tool agents.

For a complete agent implementation, see our guide on [building your first AI agent](/blog/build-first-ai-agent-python).
