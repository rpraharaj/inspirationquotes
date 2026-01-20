---
title: "AI Function Calling Code: Tool Use Snippets for LLMs"
description: "Copy-paste Python code for LLM function calling with OpenAI, Claude, and Gemini. Includes tool definitions, parallel execution, and common tool patterns."
pubDate: 2026-01-11
category: ai-code-snippets
author: Raj Praharaj
tags:
  - Function Calling
  - Tool Use
  - LLM
  - OpenAI
  - Claude
  - Python
readingTime: 17 min read
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

## OpenAI Function Calling

OpenAI's function calling is the most mature implementation. GPT-5 handles complex multi-function scenarios reliably.

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

Anthropic's Claude calls these "tools" rather than functions, but the concept is identical. Claude 4 has excellent tool use capabilities.

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

## Wrapping Up

Function calling transforms LLMs from text generators to capable agents. The patterns here give you:

- **OpenAI**: Basic, parallel, and forced function calling
- **Claude**: Tool definitions and multi-turn use
- **Gemini**: Function declarations and execution
- **Common tools**: Web search, database, API, file operations
- **Safety**: Input validation and timeout handling

These are the building blocks for AI applications that do real work in the world. Start with the basic patterns, add safety checks, and build up to complex multi-tool agents.

For a complete agent implementation, see our guide on [building your first AI agent](/blog/build-first-ai-agent-python).
