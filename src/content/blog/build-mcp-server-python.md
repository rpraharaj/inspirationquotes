---
heroImage: "/images/featured/build-mcp-server-python.webp"
title: "Build Your First MCP Server: Complete Python Tutorial"
description: "Learn how to build an MCP server from scratch using Python and FastMCP. Step-by-step tutorial with code examples for beginners. Updated for 2026."
pubDate: 2025-10-28
updatedDate: 2026-01-07
category: "mcp"
author: "AI Agents Kit"
tags: ["mcp", "python", "tutorial", "mcp server", "fastmcp", "ai development"]
featured: false
readingTime: 17
---

The first time I connected my own MCP server to Claude, something clicked. Suddenly, the AI wasn't just answering questions—it was reading my files, running calculations I defined, and doing exactly what I needed. That's when I realized: building MCP servers isn't just for experts. It's surprisingly accessible.

If you've been curious about creating your own MCP integrations but felt intimidated by the technical complexity, I have good news. Using Python and a framework called FastMCP, you can have a working MCP server running in under 30 minutes.

In this tutorial, we'll build a complete MCP server from scratch. You'll learn how to create tools the AI can call, resources it can read, and prompts it can use. By the end, you'll have a solid foundation for building any MCP integration you can imagine.

Let's get into it.

## What We're Building

Before we write any code, let's be clear about what we're creating. Our MCP server will be a simple but fully functional example that demonstrates all three MCP primitives:

**Tools** - We'll create functions that Claude (or any MCP-compatible AI) can call. Think of these as actions: "calculate this," "process that," "do something."

**Resources** - We'll expose data that the AI can read. This could be information about your system, configurations, or any data you want to make available.

**Prompts** - We'll create reusable prompt templates that help the AI accomplish specific tasks consistently.

The specific server we're building is a simple "notes" server. It will let an AI assistant:
- Create and retrieve notes (tools)
- Read the list of saved notes (resources)
- Use a note-taking prompt template (prompts)

This is deliberately simple so you can focus on understanding MCP concepts, not getting lost in application-specific complexity. Once you understand the pattern, you can build servers for anything—databases, APIs, file systems, business tools.

## Prerequisites and Setup

### What You'll Need

Before we start, make sure you have:

- **Python 3.9 or higher** - The MCP SDK requires modern Python
- **pip** - Python's package installer (comes with Python)
- **Basic Python knowledge** - You should be comfortable with functions, decorators, and type hints
- **A terminal** - We'll run commands here
- **A code editor** - VS Code, PyCharm, or whatever you prefer

If you haven't used Python's type hints before, don't worry—I'll explain them as we go. They're pretty intuitive.

### Setting Up Your Environment

First, let's create a project directory and set up a virtual environment. This keeps our dependencies isolated:

```bash
# Create a new project directory
mkdir my-mcp-server
cd my-mcp-server

# Create a virtual environment
python -m venv venv

# Activate it (on Mac/Linux)
source venv/bin/activate

# Activate it (on Windows)
venv\Scripts\activate
```

Now install FastMCP, the framework we'll use to build our server:

```bash
pip install fastmcp
```

FastMCP is a high-level framework that handles all the complexity of the MCP protocol—JSON-RPC communication, session management, message formatting. We just need to write the Python functions that define what our server can do.

You might also want to install a couple of optional but helpful packages:

```bash
pip install python-dotenv  # For environment variables
```

That's it for setup. Let's understand what we're building before we write it.

## Understanding MCP Server Architecture

If you're not familiar with [what MCP is](/blog/what-is-mcp-explained), here's a quick refresher on the architecture our server fits into.

### The Three Primitives

Every MCP server can expose three types of capabilities:

**Tools** are functions the AI can execute. When you define a tool, you're saying "here's something you can do." Tools have inputs (arguments), do something, and return outputs. For example:
- "Add these two numbers together"
- "Create a file with this content"
- "Send an email to this address"

**Resources** are data the AI can read. They're like read-only access points to information. Resources have URIs (unique identifiers) and return content. For example:
- "Here's the content of this document"
- "Here are all the items in this list"
- "Here's the current configuration"

**Prompts** are reusable conversation templates. They help the AI approach specific tasks consistently. Prompts can accept arguments to customize the template. For example:
- "Here's how to write a formal email to someone"
- "Here's a template for analyzing a dataset"

### How Servers Communicate

Under the hood, MCP uses JSON-RPC 2.0—a simple protocol for sending structured requests and responses. But you don't need to think about that. FastMCP handles all the protocol details.

What you need to know is that MCP servers can run in two modes:

**STDIO mode** - The server communicates through standard input/output. This is what Claude Desktop uses when running local MCP servers.

**HTTP mode** - The server runs as an HTTP endpoint. This is useful for remote or shared servers.

We'll focus on STDIO mode since it's what you'll use most often with Claude Desktop.

## Building Your First Tool

Now the fun part—let's write some code.

Create a new file called `server.py` in your project directory:

```python
from fastmcp import FastMCP

# Initialize the MCP server
mcp = FastMCP("notes-server")
```

That's it to start. We've created an MCP server named "notes-server". Now let's add a tool.

### The @mcp.tool Decorator

In FastMCP, you define tools using the `@mcp.tool` decorator. Here's a simple example:

```python
from fastmcp import FastMCP

mcp = FastMCP("notes-server")

# Simple in-memory storage for notes
notes: dict[str, str] = {}

@mcp.tool
def add_note(name: str, content: str) -> str:
    """Add a new note with the given name and content.
    
    Args:
        name: The name/title of the note
        content: The content of the note
    """
    notes[name] = content
    return f"Note '{name}' added successfully."
```

Let's break down what's happening:

1. **The decorator `@mcp.tool`** tells FastMCP "this function is a tool the AI can call"

2. **Type hints (`name: str, content: str`)** tell FastMCP what arguments the tool expects. The AI will see these and know what to provide.

3. **The docstring** becomes the tool's description. The AI reads this to understand what the tool does and how to use it.

4. **The return value** goes back to the AI as the tool's output.

FastMCP is smart about this. It automatically infers:
- The tool name from the function name (`add_note`)
- The description from the docstring
- The input schema from the type hints

Let's add another tool to retrieve notes:

```python
@mcp.tool
def get_note(name: str) -> str:
    """Retrieve a note by its name.
    
    Args:
        name: The name of the note to retrieve
    """
    if name in notes:
        return notes[name]
    return f"Note '{name}' not found."
```

And one more to list all notes:

```python
@mcp.tool
def list_notes() -> str:
    """List all available notes."""
    if not notes:
        return "No notes saved yet."
    return "Saved notes: " + ", ".join(notes.keys())
```

Now our AI can add notes, get notes, and list notes. Three tools, and each one is just a simple Python function.

## Adding Resources to Your Server

Resources are different from tools. They're data the AI can read, not actions it can take. Think of resources as "what information do you want to expose?"

### The @mcp.resource Decorator

Here's how to add resources using FastMCP:

```python
@mcp.resource("notes://all")
def all_notes_resource() -> str:
    """All saved notes as a formatted list."""
    if not notes:
        return "No notes available."
    return "\n".join([f"## {name}\n{content}" for name, content in notes.items()])
```

The string passed to `@mcp.resource` is the URI—a unique identifier for this resource. The AI will reference this URI to access the data.

Resources can be dynamic—they return current data at the time they're accessed:

```python
@mcp.resource("notes://count")
def notes_count_resource() -> str:
    """The current number of saved notes."""
    return f"{len(notes)} notes saved"
```

You can also create resources with parameters using URI templates:

```python
@mcp.resource("notes://{name}")
def specific_note_resource(name: str) -> str:
    """A specific note by name."""
    if name in notes:
        return notes[name]
    return f"Note '{name}' not found."
```

This creates a pattern where `notes://shopping-list` or `notes://meeting-notes` would access different notes dynamically.

### Static vs Dynamic Resources

Some resources are static—they don't change. Others are dynamic—they reflect current state.

Our notes resources are dynamic. Every time the AI reads `notes://all`, it gets the current list of notes, including any that were just added.

For static resources (like configuration information that doesn't change), the pattern is the same—just return the static data.

## Creating Prompts

Prompts are the third primitive. They're templates that help the AI approach specific tasks consistently.

### The @mcp.prompt Decorator

Here's how to add a prompt:

```python
@mcp.prompt
def note_taking_assistant(topic: str) -> str:
    """A prompt for helping organize notes on a specific topic.
    
    Args:
        topic: The topic to create notes about
    """
    return f"""You are a note-taking assistant helping organize information about {topic}.

When the user provides information:
1. Identify the key points
2. Suggest a note name
3. Use the add_note tool to save it

When the user asks about existing notes:
1. Use list_notes to see what's available
2. Use get_note to retrieve specific notes
3. Summarize the relevant information

Be organized and concise. Group related information together."""
```

Prompts are useful for:
- Establishing consistent behavior for specific tasks
- Providing context and instructions
- Setting up multi-step workflows

When an AI uses this prompt, it gets the returned text as instructions. The prompt can reference the tools you've defined, helping the AI know what actions are available.

## The Complete Server Code

Here's everything together in one file. This is a complete, working MCP server:

```python
from fastmcp import FastMCP

# Initialize the MCP server
mcp = FastMCP("notes-server")

# Simple in-memory storage for notes
notes: dict[str, str] = {}

# ============ TOOLS ============

@mcp.tool
def add_note(name: str, content: str) -> str:
    """Add a new note with the given name and content.
    
    Args:
        name: The name/title of the note
        content: The content of the note
    """
    notes[name] = content
    return f"Note '{name}' added successfully."

@mcp.tool
def get_note(name: str) -> str:
    """Retrieve a note by its name.
    
    Args:
        name: The name of the note to retrieve
    """
    if name in notes:
        return notes[name]
    return f"Note '{name}' not found."

@mcp.tool
def list_notes() -> str:
    """List all available notes."""
    if not notes:
        return "No notes saved yet."
    return "Saved notes: " + ", ".join(notes.keys())

@mcp.tool
def delete_note(name: str) -> str:
    """Delete a note by its name.
    
    Args:
        name: The name of the note to delete
    """
    if name in notes:
        del notes[name]
        return f"Note '{name}' deleted."
    return f"Note '{name}' not found."

# ============ RESOURCES ============

@mcp.resource("notes://all")
def all_notes_resource() -> str:
    """All saved notes as a formatted list."""
    if not notes:
        return "No notes available."
    return "\n".join([f"## {name}\n{content}" for name, content in notes.items()])

@mcp.resource("notes://count")
def notes_count_resource() -> str:
    """The current number of saved notes."""
    return f"{len(notes)} notes saved"

# ============ PROMPTS ============

@mcp.prompt
def note_taking_assistant(topic: str) -> str:
    """A prompt for helping organize notes on a specific topic.
    
    Args:
        topic: The topic to create notes about
    """
    return f"""You are a note-taking assistant helping organize information about {topic}.

When the user provides information:
1. Identify the key points
2. Suggest a note name  
3. Use the add_note tool to save it

When the user asks about existing notes:
1. Use list_notes to see what's available
2. Use get_note to retrieve specific notes
3. Summarize the relevant information

Be organized and concise."""

# ============ RUN SERVER ============

if __name__ == "__main__":
    mcp.run()
```

That's about 80 lines of code for a complete MCP server with four tools, two resources, and a prompt. Not bad.

If you're interested in building more complex AI systems, learning to [build AI agents](/blog/build-first-ai-agent-python) is a natural next step after mastering MCP servers.

## Running and Testing Your Server

### Running Locally

To run your server, simply execute the Python file:

```bash
python server.py
```

You should see output indicating the server is running. By default, it runs in STDIO mode, waiting for MCP protocol messages.

For development, you might want to run in a mode that shows more debugging information:

```bash
python server.py --debug
```

### Testing with Claude Desktop

The real test is connecting your server to Claude Desktop. Here's how:

1. **Locate Claude Desktop's config file**
   - Mac: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`

2. **Add your server configuration**

```json
{
  "mcpServers": {
    "notes-server": {
      "command": "python",
      "args": ["/full/path/to/your/server.py"],
      "cwd": "/full/path/to/your/project"
    }
  }
}
```

Make sure to use the full absolute path to your server script.

3. **Restart Claude Desktop**

4. **Verify the connection**

In Claude Desktop, you should now see your server's tools available. Try asking:
- "Add a note called 'test' with the content 'Hello world'"
- "List my notes"
- "Get the note called 'test'"

If everything is configured correctly, Claude will use your tools to perform these actions.

## Debugging and Troubleshooting

Things don't always work on the first try. Here are common issues and how to fix them.

### Server Won't Start

**Problem:** Running `python server.py` throws an error

**Solutions:**
- Check Python version: `python --version` should be 3.9 or higher
- Make sure FastMCP is installed: `pip install fastmcp`
- Check for syntax errors in your code

### Claude Desktop Doesn't See the Server

**Problem:** Server isn't appearing in Claude Desktop

**Solutions:**
- Double-check the path in your config file—it must be absolute, not relative
- Make sure you restarted Claude Desktop after editing the config
- Check the config file for JSON syntax errors
- Try running the server manually to see if there are errors

### Tools Aren't Working

**Problem:** Claude sees the tools but they don't work correctly

**Solutions:**
- Check your tool's return type—it should return a string
- Add logging to see what's happening: `print(f"Adding note: {name}")` 
- Check for exceptions in your tool functions

### Using MCP Inspector

The <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer">MCP documentation</a> provides an Inspector tool for debugging. It lets you:
- See what tools, resources, and prompts your server exposes
- Manually call tools and see responses
- Debug protocol-level issues

For serious development, this tool is invaluable.

## Next Steps: Making It Production-Ready

Our simple notes server works, but it's not production-ready. Here are improvements to consider:

### Add Error Handling

Tools should handle errors gracefully:

```python
@mcp.tool
def add_note(name: str, content: str) -> str:
    """Add a new note."""
    try:
        if not name or not content:
            return "Error: Name and content are required."
        notes[name] = content
        return f"Note '{name}' added successfully."
    except Exception as e:
        return f"Error adding note: {str(e)}"
```

### Persist Data

Our notes disappear when the server stops. For real applications, save to a file or database:

```python
import json
from pathlib import Path

NOTES_FILE = Path("notes.json")

def load_notes():
    if NOTES_FILE.exists():
        return json.loads(NOTES_FILE.read_text())
    return {}

def save_notes():
    NOTES_FILE.write_text(json.dumps(notes, indent=2))
```

### Security Considerations

MCP servers can have significant access to your system. Consider:

- **Input validation** - Don't trust inputs blindly
- **Rate limiting** - For production servers, limit how often tools can be called
- **Authentication** - For remote servers, implement proper auth
- **Principle of least privilege** - Only expose what's necessary

### Deployment Options

For sharing your server:
- **Local use** - STDIO mode with Claude Desktop (what we built)
- **Remote access** - HTTP mode with proper authentication
- **Container deployment** - Package as a Docker container

Our [Claude API tutorial](/blog/claude-api-tutorial) covers some related concepts if you want to explore programmatic access to Claude alongside MCP.

## Frequently Asked Questions

### Can I use MCP with AI models other than Claude?

Yes. MCP is an open standard now supported by OpenAI, Google, Microsoft, and others. Servers built with FastMCP work with any MCP-compatible client.

### Is FastMCP the only way to build MCP servers?

No. You can use the low-level MCP SDK directly, but FastMCP makes things much simpler. There are also SDKs for TypeScript, Java, and C#.

### Can my server access the internet?

Absolutely. Your tools can do anything Python can do—make HTTP requests, call APIs, read files, access databases. Just be mindful of security.

### How do I add async support?

FastMCP supports async functions. Just use `async def` instead of `def` for your tools:

```python
@mcp.tool
async def fetch_data(url: str) -> str:
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()
```

## Wrapping Up

You've just built a complete MCP server. It has tools, resources, and prompts. It can connect to Claude Desktop. And it's about 80 lines of Python.

This is the foundation for much more powerful integrations. The pattern is always the same:
1. Initialize your MCP server
2. Define tools for actions
3. Define resources for data
4. Define prompts for templates
5. Run and connect

From here, you could build MCP servers that:
- Connect to your company's APIs
- Access databases
- Control smart home devices
- Manage files and documents
- Integrate with any service you use

The possibilities are pretty much endless. What matters is that you now understand the pattern.

If you're interested in learning more, our guide on [what MCP is](/blog/what-is-mcp-explained) covers the broader context, and the <a href="https://gofastmcp.com" target="_blank" rel="noopener noreferrer">FastMCP documentation</a> has many more advanced examples.

Now go build something useful. The AI is waiting to be connected.
