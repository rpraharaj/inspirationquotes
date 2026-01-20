---
title: "MCP Resources, Tools, and Prompts: Complete Reference"
description: "Master the three core MCP primitives—Resources for data exposure, Tools for AI actions, and Prompts for structured workflows. Complete developer reference with code examples."
pubDate: 2026-01-11
category: mcp
author: Raj Praharaj
tags:
  - MCP
  - Model Context Protocol
  - AI Development
  - Claude
  - AI Integration
readingTime: 17 min read
---

The Model Context Protocol has become the de facto standard for connecting AI models to external systems—but here's what I've noticed after building dozens of MCP servers: most developers only truly understand one of its three primitives. They'll nail Tools but completely overlook Resources, or they'll set up Prompts without realizing how much power they're leaving on the table.

I get it. When you first encounter MCP, you want to jump straight into making AI do things. But understanding the distinct purpose of Resources, Tools, and Prompts—and knowing when to use each—is what separates a functional integration from an elegant one.

In this reference guide, I'll break down each primitive with practical code examples, show you when to reach for each one, and share the security considerations that the official docs don't emphasize enough. Whether you're building your first MCP server or optimizing an existing integration, this is the reference I wish I'd had when I started.

## Understanding MCP Architecture

Before diving into the primitives, let's establish how MCP actually works. The protocol operates through a client-server architecture with three core components working together.

**Host Applications** are what users interact with—Claude Desktop, Cursor IDE, VS Code with MCP extensions, or your own custom AI application. The host manages the user interface, coordinates between multiple servers, and handles the overall workflow orchestration.

**MCP Clients** live inside host applications. Each client maintains a connection to one MCP server, translating between the host's internal format and MCP's protocol messages. Think of clients as the communication layer—they handle the wire protocol so your server doesn't have to.

**MCP Servers** are where you expose your capabilities. A server is a lightweight program that implements the MCP protocol and exposes Resources, Tools, and Prompts to connecting clients. Servers can wrap databases, APIs, local files, or any other data source or service.

Communication happens over JSON-RPC 2.0, with two transport options:
- **STDIO** for local servers running on the same machine
- **HTTP with Server-Sent Events (SSE)** for remote or distributed deployments

This architecture means your server doesn't need to know anything about the AI model it's serving—it just exposes capabilities through the three primitives, and MCP handles the rest.

For a foundational introduction to the protocol itself, see our guide on [what MCP is and how it works](/blog/what-is-mcp).

## MCP Resources: Exposing Data to AI

Resources are MCP's mechanism for exposing data to AI models. If you want Claude to read something—a file, a database record, an API response—you expose it as a Resource.

### What Are MCP Resources?

Resources are **read-only data exposures** identified by URIs. They let AI models access information without taking any actions. The key distinction: when an AI accesses a Resource, nothing changes. It's purely informational.

Every Resource has:
- A **URI** that uniquely identifies it (like `file:///path/to/document.md`)
- A **name** for human readability
- A **MIME type** describing the content format
- Optional **description** for context

This design means AI models can safely request Resources without worrying about side effects—a critical property for building reliable integrations.

### Resource Types and Examples

MCP supports three resource patterns, each serving different use cases:

**Static Resources** have fixed URIs that don't change. They're perfect for exposing documentation, configuration files, or reference data:

```python
@server.list_resources()
async def list_resources():
    return [
        Resource(
            uri="file:///config/settings.json",
            name="Application Settings",
            mimeType="application/json",
            description="Current application configuration"
        ),
        Resource(
            uri="docs://readme",
            name="Project README",
            mimeType="text/markdown"
        )
    ]
```

**Dynamic Resources** return fresh data on each request. Use these for live information like database contents, API states, or system metrics:

```python
@server.read_resource()
async def read_resource(uri: str):
    if uri == "db://users/active":
        users = await database.get_active_users()
        return ResourceContents(
            uri=uri,
            mimeType="application/json",
            text=json.dumps(users)
        )
```

**Template Resources** use parameterized URIs, letting AI models request specific items from a collection. The template syntax follows RFC 6570:

```python
@server.list_resource_templates()
async def list_templates():
    return [
        ResourceTemplate(
            uriTemplate="db://users/{user_id}",
            name="User by ID",
            description="Fetch a specific user's profile"
        )
    ]
```

### Best Practices for Resources

From building production MCP servers, here's what I've learned works well:

**Keep Resources focused.** Each Resource should represent one logical piece of data. If you're tempted to return a massive JSON blob with everything, that's a sign you need multiple Resources instead.

**Use descriptive URIs.** The AI model sees these URIs when deciding what to access. `db://customers/active` is far more useful than `resource://data-1`.

**Set appropriate MIME types.** This helps AI models understand how to interpret the content. Use `text/markdown` for documentation, `application/json` for structured data, and `text/plain` for general text.

For a practical example of Resources in action, see our tutorial on [connecting Claude to databases with MCP](/blog/mcp-database-tutorial).

## MCP Tools: AI-Controlled Actions

While Resources let AI read data, Tools let AI **do things**. Tools are the action primitives of MCP—they execute operations that can change state, call APIs, or perform computations.

### What Are MCP Tools?

Tools are **model-controlled functions** that AI models can invoke to interact with external systems. Unlike Resources, Tools can have side effects: creating files, sending messages, querying APIs, or modifying databases.

The "model-controlled" part is crucial. When you expose a Tool, you're giving the AI model permission to decide when and how to use it based on the user's request. The model reads your Tool's description, understands its purpose, and invokes it when appropriate.

Every Tool has:
- A **name** that the AI uses to invoke it
- A **description** explaining what it does (write this for the AI, not humans)
- An **input schema** defining required and optional parameters
- An **output format** for returning results

### Tool Schema and Metadata

Your Tool definitions are essentially instructions for the AI model. Here's a well-structured example:

```python
@server.list_tools()
async def list_tools():
    return [
        Tool(
            name="query_database",
            description="Execute a read-only SQL query against the application database. Use for fetching user data, analytics, or reports. Returns results as JSON.",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "SQL SELECT query to execute"
                    },
                    "limit": {
                        "type": "integer",
                        "description": "Maximum rows to return",
                        "default": 100
                    }
                },
                "required": ["query"]
            }
        )
    ]
```

Notice how the description explains not just what the Tool does, but when to use it. AI models rely heavily on these descriptions to choose the right Tool for a given task.

### Implementing Tools Safely

Here's where I see developers make the most mistakes. Tools can have real effects on your systems, so you need safety measures:

**Validate all inputs.** Never trust that the AI will only send valid parameters:

```python
@server.call_tool()
async def call_tool(name: str, arguments: dict):
    if name == "send_email":
        # Validate before doing anything
        if "to" not in arguments:
            raise ValueError("Email recipient required")
        if not is_valid_email(arguments["to"]):
            raise ValueError("Invalid email address")
        
        # Only proceed after validation
        return await send_email(
            to=arguments["to"],
            subject=arguments.get("subject", ""),
            body=arguments.get("body", "")
        )
```

**Implement human-in-the-loop for sensitive operations.** MCP recommends that hosts prompt users before executing Tools that could have significant effects. Your Tool can signal this need:

```python
Tool(
    name="delete_file",
    description="Permanently delete a file from the system",
    inputSchema={...},
    # Mark as requiring confirmation
    annotations={"requiresConfirmation": True}
)
```

**Sandbox tool execution.** Run Tools with minimal permissions. If your Tool only needs to read from one directory, don't give it filesystem-wide access.

For a complete walkthrough of building a secure MCP server with Tools, check out our [MCP server Python tutorial](/blog/build-mcp-server-python).

### Tool Discovery and Invocation Flow

When an AI model connects to your MCP server, the flow works like this:

1. **Discovery:** The model calls `tools/list` to see available Tools
2. **Selection:** Based on the user's request, the model chooses appropriate Tools
3. **Invocation:** The model calls `tools/call` with the Tool name and arguments
4. **Response:** Your server executes the Tool and returns results
5. **Integration:** The model incorporates results into its response

This all happens automatically—you just implement the Tool handlers, and MCP orchestrates the rest.

## MCP Prompts: Structured AI Instructions

Prompts are the third primitive, and honestly, the most underutilized. While Resources and Tools are about what AI can access and do, Prompts are about how users interact with those capabilities.

### What Are MCP Prompts?

MCP Prompts are **reusable instruction templates** that users can invoke to start structured workflows. Unlike Tools (which are AI-controlled), Prompts are **user-controlled**—typically triggered through slash commands or menu selections.

Think of Prompts as predefined ways to use your MCP server's capabilities. Instead of asking users to figure out the right way to phrase their request, you provide optimized templates that guide both the user and the AI.

Every Prompt has:
- A **name** for invocation (often as a slash command like `/review`)
- A **description** explaining what it does
- **Arguments** for customization
- **Message templates** that structure the actual prompt

### Prompt Structure and Implementation

Here's a Prompt that guides users through code review:

```python
@server.list_prompts()
async def list_prompts():
    return [
        Prompt(
            name="code-review",
            description="Review code for bugs, style issues, and improvements",
            arguments=[
                PromptArgument(
                    name="file_path",
                    description="Path to the file to review",
                    required=True
                ),
                PromptArgument(
                    name="focus",
                    description="What to focus on: security, performance, or style",
                    required=False
                )
            ]
        )
    ]

@server.get_prompt()
async def get_prompt(name: str, arguments: dict):
    if name == "code-review":
        file_path = arguments["file_path"]
        focus = arguments.get("focus", "general")
        
        code = await read_file(file_path)
        
        return GetPromptResult(
            messages=[
                PromptMessage(
                    role="user",
                    content=TextContent(
                        type="text",
                        text=f"""Please review the following code with a focus on {focus} issues:

```
{code}
```

Provide specific, actionable feedback with line numbers where applicable."""
                    )
                )
            ]
        )
```

When a user invokes `/code-review`, the host application prompts for the required arguments, then sends the fully-formed prompt to the AI model. The model doesn't decide whether to use this prompt—the user explicitly requested it.

### Prompts with Embedded Resources

One powerful pattern I use frequently: Prompts that reference Resources. This lets you inject context automatically:

```python
@server.get_prompt()
async def get_prompt(name: str, arguments: dict):
    if name == "analyze-database":
        return GetPromptResult(
            messages=[
                PromptMessage(
                    role="user",
                    content=TextContent(
                        type="text",
                        text="Analyze the database schema and suggest optimizations."
                    )
                )
            ],
            # Include schema as embedded resource
            resources=[
                EmbeddedResource(
                    type="resource",
                    resource=Resource(
                        uri="db://schema",
                        name="Database Schema",
                        mimeType="text/plain"
                    )
                )
            ]
        )
```

This pattern ensures the AI always has the context it needs without the user having to think about what information to provide.

For more on structuring effective prompts, see our [prompt engineering beginner's guide](/blog/prompt-engineering-beginners-guide).

## Resources vs Tools vs Prompts: When to Use Each

Now for the practical question: given a capability you want to expose, which primitive should you use?

### Decision Matrix

| You Want To... | Use | Example |
|----------------|-----|---------|
| Let AI read data | **Resource** | File contents, database records, API responses |
| Let AI perform actions | **Tool** | Send email, create file, execute query |
| Provide structured user workflow | **Prompt** | Code review template, analysis wizard |
| Expose read-only reference material | **Resource** | Documentation, configuration files |
| Enable state-changing operations | **Tool** | Update settings, deploy code, send notifications |
| Guide users through complex tasks | **Prompt** | Onboarding flows, multi-step analysis |

### Common Patterns That Combine Primitives

Real-world MCP servers typically use all three primitives together. Here are patterns I've found effective:

**The Dashboard Pattern:** Resources expose metrics, Tools trigger actions, Prompts guide analysis.

```
Resources: system://metrics, system://logs, system://health
Tools: restart_service, scale_deployment, clear_cache
Prompts: /diagnose (guides troubleshooting), /optimize (suggests improvements)
```

**The Development Pattern:** Resources provide context, Tools manipulate code, Prompts structure workflows.

```
Resources: repo://files/{path}, repo://git-diff, repo://tests
Tools: run_tests, apply_fix, create_pr
Prompts: /review, /refactor, /document
```

**The Data Pattern:** Resources expose data, Tools query and transform, Prompts analyze.

```
Resources: db://schema, db://tables, db://recent-queries
Tools: query_database, export_csv, create_visualization
Prompts: /analyze-trends, /generate-report
```

### Common Mistakes to Avoid

**Mistake 1: Using Tools for read-only operations.** If your "Tool" just returns data without side effects, it should probably be a Resource. Tools are for actions.

**Mistake 2: Forcing everything into Tools.** I've seen servers with 50+ Tools when they really needed 10 Tools, 30 Resources, and 10 Prompts. Use the right primitive for the job.

**Mistake 3: Ignoring Prompts entirely.** Prompts dramatically improve user experience. If users repeatedly ask for the same kind of analysis, make it a Prompt.

## Security Best Practices

MCP's power comes with real security considerations. Your server has access to resources the AI can read and actions it can take—both need protection.

### Tool Security

Tools are the highest-risk primitive because they can change state. Follow these principles:

**Principle of least privilege.** Each Tool should have exactly the permissions it needs and no more. A Tool that sends email doesn't need filesystem access.

**Input validation at every layer.** Don't assume the AI sends valid data. Validate types, ranges, and formats before doing anything:

```python
def validate_tool_input(name: str, arguments: dict):
    schema = get_tool_schema(name)
    validate(arguments, schema)  # JSON Schema validation
    
    # Additional semantic validation
    if name == "query_database":
        if "DROP" in arguments["query"].upper():
            raise SecurityError("Destructive queries not allowed")
```

**Audit logging.** Log every Tool invocation with the parameters and results. You'll want this when something goes wrong:

```python
@server.call_tool()
async def call_tool(name: str, arguments: dict):
    logger.info(f"Tool invoked: {name}", extra={
        "arguments": arguments,
        "timestamp": datetime.utcnow()
    })
    # ... execute tool ...
```

### Resource Security

Resources are lower risk but still need attention:

**Access control.** Not every Resource should be available to every user. Implement appropriate authorization:

```python
@server.read_resource()
async def read_resource(uri: str):
    user = get_current_user()
    if not user.can_access(uri):
        raise PermissionError(f"Access denied to {uri}")
    # ... return resource ...
```

**Sensitive data handling.** If Resources contain PII or secrets, consider filtering or masking before exposure.

### Known Vulnerabilities

The MCP ecosystem is young, and security researchers have identified several attack patterns:

**Tool poisoning:** Malicious servers could expose Tools with misleading descriptions, tricking AI models into harmful actions. Mitigation: Only connect to trusted servers.

**Cross-server shadowing:** Multiple servers could expose Tools with the same name, creating ambiguity. Mitigation: Use namespaced Tool names.

**Command injection:** Poorly validated Tool inputs could allow injection attacks. Mitigation: Never interpolate inputs directly into commands or queries.

For comprehensive security guidance, consult the [official MCP security documentation](https://modelcontextprotocol.io/docs/concepts/security).

## MCP Primitives in 2026

The MCP ecosystem has evolved significantly since its launch. Here's where things stand now.

### Linux Foundation Governance

In December 2025, Anthropic donated MCP to the Agentic AI Foundation (AAIF) under the Linux Foundation. This moves MCP from a single-company project to community governance, which has major implications:

- **Vendor neutrality:** OpenAI, Google, and other AI providers can participate without concerns about Anthropic control
- **Enterprise confidence:** Organizations see Linux Foundation governance as a sign of stability
- **Specification stability:** The protocol will evolve through community consensus

Adoption has accelerated since the donation—major players like OpenAI, Hugging Face, and LangChain now actively support MCP.

### MCP Registry

The MCP Registry launched in preview in September 2025 and is approaching general availability. It serves as a discovery mechanism for MCP servers, letting developers share and find integrations.

Key registry features:
- Server discovery and search
- Version management
- Trust indicators
- Installation guidance

Find available servers in our [MCP Server Directory](/blog/mcp-server-directory).

### Protocol Updates

The spring 2025 specification updates added several important features:

- **OAuth support:** Native authentication for HTTP transport
- **Tool annotations:** Metadata like `requiresConfirmation` for safety signals
- **Batching:** Multiple operations in single requests for efficiency
- **Streaming HTTP transport:** Better support for real-time data

These updates make MCP more suitable for production enterprise deployments while maintaining backward compatibility with existing servers.

## Frequently Asked Questions

### What's the difference between MCP Resources and Tools?

Resources expose data for reading—they're purely informational and never change state. Tools execute actions that can modify data, call APIs, or affect external systems. Use Resources when AI needs to access information; use Tools when AI needs to do something with that information.

### Can AI models invoke Prompts automatically?

No, Prompts are user-controlled. Users explicitly trigger them through slash commands, menu selections, or similar interfaces. This design ensures that structured workflows happen when users intend them to, not when the AI decides.

### How do I secure my MCP Tools?

Implement several layers: validate all inputs against expected schemas, use the principle of least privilege for permissions, log all invocations for auditing, and require human confirmation for sensitive operations using the `requiresConfirmation` annotation.

### What transport should I use for MCP servers?

Use STDIO for local servers running on the same machine as the host application—it's simpler and has lower latency. Use HTTP/SSE for remote servers, multi-user scenarios, or when you need the server accessible across a network.

### Can I use all three primitives in one MCP server?

Absolutely, and most production servers do. A database server might expose table schemas as Resources, provide query and modification Tools, and offer analysis Prompts that guide users through common data exploration workflows.

### How do Resources, Tools, and Prompts interact?

They complement each other. Prompts can include embedded Resources to provide context. Tools can return data that could also be exposed as Resources. The three primitives give you flexibility in how you structure your integration.

## Wrapping Up

MCP's three primitives—Resources, Tools, and Prompts—give you a complete vocabulary for connecting AI to external systems:

- **Resources** let AI read data without side effects
- **Tools** let AI take action when appropriate
- **Prompts** give users structured ways to leverage both

Understanding when to use each primitive is what separates functional integrations from elegant ones. Resources for reading, Tools for acting, Prompts for guiding—get this right, and your MCP server will feel natural to use.

Ready to put this into practice? Start with our [MCP server Python tutorial](/blog/build-mcp-server-python) for hands-on implementation, or browse our [MCP Server Directory](/blog/mcp-server-directory) to see how others have structured their integrations. The 75% of companies expected to adopt MCP by 2026 will need developers who understand these primitives deeply—now you're one of them.
