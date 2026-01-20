# Content Outline: MCP Resources, Tools, and Prompts: Complete Reference

## Post Metadata
- **Slug:** mcp-resources-tools-prompts
- **Category:** mcp
- **Estimated Words:** 4,200
- **Target Keyword:** mcp resources tools prompts

---

## Content Structure

### Introduction (200 words)
**Hook:** The Model Context Protocol introduced three powerful primitives that let AI models interact with the real world—but most developers only use one of them well.

**Key Points:**
- MCP is now governed by Linux Foundation (AAIF)
- Three primitives: Resources, Tools, and Prompts
- Each serves a distinct purpose
- Understanding all three unlocks MCP's full potential

**Transition:** Let's explore each primitive in depth.

---

### H2: Understanding MCP Architecture (350 words)

**Purpose:** Set the foundation before diving into primitives.

**Content:**
- Host Applications (Claude Desktop, IDEs)
- MCP Clients (embedded in hosts)
- MCP Servers (expose capabilities)
- Communication: JSON-RPC 2.0 over STDIO or HTTP/SSE
- Bidirectional persistent connections

**Internal Link:** Link to /blog/what-is-mcp for basics

---

### H2: MCP Resources: Exposing Data to AI (600 words)

**Purpose:** Deep dive into the Resources primitive.

#### H3: What Are MCP Resources?
- Data exposure mechanism
- Read-only by design
- URIs for identification
- Types: files, database records, API responses

#### H3: Resource Types and Examples
- **Static resources:** Fixed files, documentation
- **Dynamic resources:** Live data, API endpoints
- **Template resources:** Parameterized URIs

#### H3: Implementing Resources
- Code example: Exposing a file resource
- Code example: Dynamic database resource
- Best practices for resource design

**Internal Link:** Link to /blog/mcp-database-tutorial

---

### H2: MCP Tools: AI-Controlled Actions (700 words)

**Purpose:** Deep dive into the Tools primitive.

#### H3: What Are MCP Tools?
- Action execution mechanism
- Model-controlled (AI decides when to use)
- Schema-defined inputs and outputs
- Require human approval for sensitive operations

#### H3: Tool Schema and Metadata
- JSON Schema for input parameters
- Description for AI understanding
- Return type specifications

#### H3: Building Effective Tools
- Code example: Database query tool
- Code example: API call tool
- Security: Human-in-the-loop pattern

#### H3: Tool Discovery and Invocation
- How AI models discover tools
- Invocation flow
- Error handling

**Internal Link:** Link to /blog/build-mcp-server-python

---

### H2: MCP Prompts: Structured AI Instructions (600 words)

**Purpose:** Deep dive into the Prompts primitive.

#### H3: What Are MCP Prompts?
- Reusable instruction templates
- User-controlled (triggered by user, not AI)
- Arguments for customization
- Slash command pattern

#### H3: Prompt Structure
- Name and description
- Arguments with types
- Message templates
- Embedded resources

#### H3: Creating Powerful Prompts
- Code example: Code review prompt
- Code example: Analysis prompt with context
- Dynamic prompt generation

**Internal Link:** Link to /blog/prompt-engineering-beginners-guide

---

### H2: Resources vs Tools vs Prompts: When to Use Each (500 words)

**Purpose:** Help developers choose the right primitive.

#### H3: Decision Matrix
| Need | Primitive | Example |
|------|-----------|---------|
| AI needs to read data | Resource | File contents, DB records |
| AI needs to take action | Tool | API calls, file writes |
| User needs structured workflow | Prompt | Code review, analysis |

#### H3: Combining Primitives
- Prompts that use resources
- Tools that return resources
- Real-world workflow examples

#### H3: Common Mistakes
- Using tools when resources suffice
- Overloading tools with read operations
- Ignoring prompt templates

---

### H2: Security Best Practices (400 words)

**Purpose:** Address security concerns.

#### H3: Tool Security
- Consent and authorization
- Input validation
- Sandboxing tool execution

#### H3: Resource Security
- Access control
- Sensitive data handling
- URI security

#### H3: Known Vulnerabilities
- Tool poisoning
- Cross-server shadowing
- Command injection
- Mitigation strategies

**External Link:** Official MCP security documentation

---

### H2: MCP Primitives in 2026 (350 words)

**Purpose:** Cover recent developments.

#### H3: Linux Foundation Governance
- AAIF (Agentic AI Foundation)
- Implications for adoption

#### H3: MCP Registry
- Discovery and sharing
- v0.1 API stabilization

#### H3: Protocol Updates
- OAuth support
- Streaming HTTP transport
- Batching
- Tool annotations

**Internal Link:** Link to /blog/mcp-server-directory

---

### FAQ Section (300 words)

1. **What's the difference between MCP resources and tools?**
Resources expose data for reading; tools execute actions that change state.

2. **Can AI models invoke prompts automatically?**
No, prompts are user-controlled and typically triggered via slash commands.

3. **How do I secure my MCP tools?**
Implement human-in-the-loop approval, validate inputs, and use proper access controls.

4. **What transport should I use for MCP servers?**
STDIO for local servers, HTTP/SSE for remote or distributed deployments.

5. **Can I use all three primitives in one server?**
Yes, most MCP servers expose a combination of resources, tools, and prompts.

---

### Conclusion (200 words)

**Summary:**
- Resources for data exposure
- Tools for action execution
- Prompts for structured workflows
- Each primitive serves a distinct purpose

**CTA:** Start building your own MCP server to leverage all three primitives.

**Internal Links:**
- Link to /blog/build-mcp-server-python
- Link to /blog/best-mcp-servers-claude

---

## Word Count Summary

| Section | Words |
|---------|-------|
| Introduction | 200 |
| MCP Architecture | 350 |
| Resources | 600 |
| Tools | 700 |
| Prompts | 600 |
| Comparison | 500 |
| Security | 400 |
| 2026 Developments | 350 |
| FAQ | 300 |
| Conclusion | 200 |
| **Total** | **4,200** |

---

## Internal Linking Plan

| Target Post | Anchor Text | Section |
|-------------|-------------|---------|
| /blog/what-is-mcp | "Model Context Protocol" | Architecture |
| /blog/build-mcp-server-python | "build your own MCP server" | Tools |
| /blog/mcp-database-tutorial | "connecting Claude to databases" | Resources |
| /blog/best-mcp-servers-claude | "popular MCP servers" | Conclusion |
| /blog/prompt-engineering-beginners-guide | "prompt engineering" | Prompts |
| /blog/mcp-server-directory | "MCP server directory" | 2026 |

## External Linking Plan

| Source | URL | Section |
|--------|-----|---------|
| Official MCP Docs | modelcontextprotocol.io | Throughout |
| FastMCP Framework | GitHub | Tools |
| AAIF Announcement | Linux Foundation | 2026 |
