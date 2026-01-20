---
title: "MCP Server Directory: 50+ Ready-to-Use Integrations (2026)"
description: "The complete MCP server directory with 50+ ready-to-use integrations for Claude. Organized by category with installation guides and recommendations."
pubDate: 2026-01-03
category: "mcp"
keywords: ["MCP server directory", "MCP servers list", "Model Context Protocol integrations", "Claude MCP servers", "best MCP servers 2026"]
heroImage: "/images/featured/mcp-server-directory.webp"
author: "AI Agents Kit"
readTime: 22
tags: ["MCP", "Claude", "Integrations", "AI Tools"]
difficulty: "beginner"
featured: true
---

When I first discovered MCP servers about two months ago, I spent an embarrassing amount of time hunting through GitHub repos, random blog posts, and X threads just to figure out what was available. The Model Context Protocol ecosystem had exploded, but finding a comprehensive list? That was like searching for a specific grain of sand on a very large beach.

So I built this directory. Not because the world needed another list—it's because the world needed an *organized* list.

Here's what you're getting: 50+ MCP servers, organized by what they actually do, with installation commands you can copy-paste, and honest recommendations about which ones are worth your time. Whether you're a developer looking to supercharge your coding workflow or someone who just wants Claude to read their Google Drive, you'll find what you need here.

Let's dive into the MCP server directory that I wish existed when I started.

## What Is MCP and Why This Directory Matters

If you're new to this, [MCP (Model Context Protocol)](/blog/what-is-mcp-explained) is an open standard created by Anthropic that lets AI systems like Claude connect to external tools and data sources. Think of it as a universal adapter that allows Claude to actually *do things* instead of just talking about them.

MCP servers are the magic behind this. Each server is a small program that exposes specific capabilities—reading files, querying databases, browsing the web, managing your tasks. When you install an MCP server for Claude Desktop, you're essentially giving Claude new superpowers.

Here's the thing: as of early 2026, there are over 500 community-built MCP servers floating around. That's incredible for the ecosystem, but terrible for you trying to find the good ones. Quality varies wildly. Some servers are polished, well-documented, and actively maintained. Others were someone's weekend project that hasn't been updated since November 2024.

This directory does the curation work for you. I've tested dozens of these, read through the GitHub issues, and organized everything by use case. You'll find:

- **Official servers** maintained by Anthropic (always start here)
- **Community favorites** with strong adoption and active maintenance
- **Specialized tools** for specific workflows
- **Quick-start recommendations** based on what you're trying to do

One important note: this directory focuses on servers compatible with Claude Desktop as of January 2026. Claude.ai web users—you'll need Claude Desktop for most of these. It's free, so grab it if you haven't.

## Official Anthropic MCP Servers

Let's start with the foundation. Anthropic maintains several official MCP servers in the <a href="https://github.com/modelcontextprotocol/servers" target="_blank" rel="noopener">modelcontextprotocol/servers</a> repository. These are your safest bet—they're well-documented, regularly updated, and work reliably with Claude Desktop.

### The Core Six

| Server | What It Does | Install Command |
|--------|--------------|-----------------|
| **filesystem** | Read, write, and navigate local files | `npx @modelcontextprotocol/server-filesystem /path/to/allow` |
| **fetch** | Make HTTP requests to any URL | `npx @modelcontextprotocol/server-fetch` |
| **puppeteer** | Browser automation and web scraping | `npx @modelcontextprotocol/server-puppeteer` |
| **postgres** | Query PostgreSQL databases | `npx @modelcontextprotocol/server-postgres` |
| **github** | Manage repos, issues, PRs, and files | `npx @modelcontextprotocol/server-github` |
| **slack** | Send messages and read channels | `npx @modelcontextprotocol/server-slack` |

My recommendation? Start with **filesystem** and **fetch**. They're the foundation of most useful Claude workflows. The filesystem server lets Claude read your project files, and fetch lets it pull data from any API or website.

### When to Use Official vs Community Servers

Here's my honest take: always prefer official servers when they exist. They're maintained by the people who know MCP best, and they won't suddenly break after a random Tuesday update.

That said, Anthropic can't build everything. For specialized tools like Notion, Todoist, or industry-specific integrations, you'll need community servers. The key is checking:

1. **Last update date** - Anything older than 3 months? Be cautious.
2. **GitHub stars** - Not everything, but servers with 100+ stars usually work.
3. **Open issues** - Check if people are reporting problems.
4. **Documentation** - If the README is sparse, expect headaches.

Now let's explore what the community has built.

## Productivity & Workflow Servers

These servers connect Claude to the apps you use every day. If you're spending hours moving between Notion, Slack, and your calendar, these integrations can save serious time.

### Featured Productivity Servers

**1. Notion MCP**
- **Purpose:** Read and write pages, query databases, create content
- **GitHub:** Various implementations (check mcp.so for latest)
- **Best for:** Knowledge workers managing docs and databases
- **Setup complexity:** Medium (requires API key from Notion)

**2. Google Drive MCP**
- **Purpose:** Search, read, and organize Drive files
- **Best for:** Teams using Google Workspace
- **Setup complexity:** Medium (OAuth required)

**3. Todoist MCP**
- **Purpose:** Create, update, and manage tasks
- **Best for:** Task management power users
- **Setup complexity:** Easy (API token only)

**4. Linear MCP**
- **Purpose:** Manage issues, projects, and cycles
- **Best for:** Engineering teams using Linear
- **Setup complexity:** Easy

**5. Calendar MCP (Google/Outlook)**
- **Purpose:** View, create, and manage events
- **Best for:** Scheduling and meeting management
- **Setup complexity:** Medium (OAuth)

**6. Discord MCP**
- **Purpose:** Send messages, read channels, manage servers
- **Best for:** Community managers and Discord power users
- **Setup complexity:** Medium (bot token required)

### My Top Pick for Productivity

Honestly? The **Notion MCP** has changed how I work. I use Notion for everything—project notes, research, client briefs—and being able to tell Claude "find that document about X and summarize it" is genuinely useful.

Here's a sample configuration for your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["mcp-server-notion"],
      "env": {
        "NOTION_API_KEY": "your-notion-integration-token"
      }
    }
  }
}
```

The catch? You need to set up a Notion integration first (Notion Settings → Integrations → Create Integration) and share specific pages with it. Not as seamless as I'd like, but the payoff is worth the five-minute setup.

## Development & Code Servers

This is where MCP really shines. Developers have built some incredibly useful integrations for code-related workflows.

### Essential Developer Servers

**1. GitHub MCP (Official)**
- **Purpose:** Complete GitHub integration—repos, PRs, issues, file management
- **Install:** `npx @modelcontextprotocol/server-github`
- **Why it's essential:** Claude can read your codebase, review PRs, create issues
- **Setup:** Requires `GITHUB_PERSONAL_TOKEN` environment variable

**2. GitLab MCP**
- **Purpose:** Same as GitHub but for GitLab users
- **Best for:** Enterprise teams on GitLab
- **Note:** Community maintained, less polished than official GitHub

**3. Docker MCP**
- **Purpose:** Manage containers, images, networks
- **Best for:** DevOps workflows
- **Caution:** Be careful with production environments

**4. Kubernetes MCP**
- **Purpose:** Interact with K8s clusters
- **Best for:** Teams managing Kubernetes deployments
- **Setup complexity:** High (kubeconfig required)

**5. npm/pip MCP**
- **Purpose:** Search packages, check dependencies
- **Best for:** Developers researching libraries
- **Setup complexity:** Easy

**6. Sentry MCP**
- **Purpose:** Access error tracking and debugging info
- **Best for:** Teams using Sentry for monitoring
- **Pro tip:** Great for debugging production issues

**7. VS Code MCP**
- **Purpose:** Integrate with VS Code workspace
- **Best for:** Developers who live in VS Code
- **Note:** Still experimental in early 2026

**8. Vercel MCP**
- **Purpose:** Manage deployments, check logs
- **Best for:** Frontend developers on Vercel
- **Setup complexity:** Easy (API token)

### The Developer Starter Pack

If you're a developer just getting started with MCP, here's my recommended combo:

1. **filesystem** (official) - Read your codebase
2. **github** (official) - Manage repos and PRs
3. **fetch** (official) - Hit APIs for testing
4. **Docker MCP** - Container management

This covers 80% of what I do daily. Add database servers as needed.

## Data & Database Servers

Claude plus database access equals powerful data analysis without writing SQL (well, Claude writes the SQL for you).

### Database Server Options

**1. PostgreSQL MCP (Official)**
- **Install:** `npx @modelcontextprotocol/server-postgres`
- **Best for:** Most production databases
- **Setup:** Connection string in env

**2. MySQL MCP**
- **Purpose:** Query MySQL/MariaDB databases
- **Community maintained**
- **Similar setup to Postgres

**3. SQLite MCP**
- **Purpose:** Local database queries
- **Best for:** Development, local apps, testing
- **Pro:** No server required

**4. MongoDB MCP**
- **Purpose:** NoSQL document database queries
- **Best for:** Teams using MongoDB
- **Note:** Query syntax differs from SQL servers

**5. Redis MCP**
- **Purpose:** Key-value store operations
- **Best for:** Caching, session management
- **Use case:** Debugging production Redis

**6. Supabase MCP**
- **Purpose:** Full Supabase access (DB + Auth + Storage)
- **Best for:** Supabase-based applications
- **Nice feature:** Includes auth and storage, not just DB

**7. Pinecone MCP**
- **Purpose:** Vector database operations
- **Best for:** RAG applications, semantic search
- **Links to:** [Vector databases explained](/blog/vector-databases-explained)

**8. GraphQL MCP**
- **Purpose:** Query any GraphQL API
- **Best for:** Modern API consumption
- **Flexible:** Works with any GraphQL endpoint

### Choosing the Right Database Server

Here's my decision tree:

- **Production Postgres?** → Official PostgreSQL MCP
- **Local development?** → SQLite MCP (simple, fast)
- **Building RAG apps?** → Pinecone or similar vector DB
- **Using Supabase?** → Supabase MCP (all-in-one)

⚠️ **Security warning:** Be extremely careful connecting MCP to production databases. Always use read-only credentials when possible. Claude can execute queries, which means it can also accidentally delete things.

## File & Content Management Servers

Beyond the official filesystem server, there are specialized options for different file types and storage systems.

### File Management Options

**1. Filesystem MCP (Official)**
- **Install:** `npx @modelcontextprotocol/server-filesystem /path/to/allow`
- **Key feature:** You specify exactly which directories Claude can access
- **Security:** Won't access files outside allowed paths

**2. S3 MCP**
- **Purpose:** Read/write to AWS S3 buckets
- **Best for:** Cloud file storage workflows
- **Requires:** AWS credentials configured

**3. PDF MCP**
- **Purpose:** Extract text, analyze PDFs
- **Best for:** Document processing workflows
- **Use case:** Summarize contracts, extract data from reports

**4. Image MCP**
- **Purpose:** Basic image processing
- **Best for:** Bulk image operations
- **Note:** Claude 4 has native vision, but this helps with processing

**5. Markdown MCP**
- **Purpose:** Parse and manipulate markdown files
- **Best for:** Documentation workflows
- **Links with:** Filesystem for full doc management

**6. Obsidian MCP**
- **Purpose:** Access Obsidian vault contents
- **Best for:** Obsidian users wanting AI in their PKM
- **Setup:** Point to vault directory

### Security Considerations for File Access

I want to be direct about this: file access MCP servers are powerful, which means they're also potentially dangerous. Here's how to use them safely:

1. **Limit directory access** - Only allow specific folders, never your entire home directory
2. **Avoid sensitive directories** - Don't point at `.ssh`, credential files, or secrets
3. **Use read-only when possible** - Some servers support read-only modes
4. **Audit what Claude does** - Check logs if you're paranoid (healthy paranoia here)

## Search & Research Servers

Give Claude the ability to search the web and access current information. Essential for research tasks and staying up-to-date.

### Search Server Options

**1. Brave Search MCP**
- **Purpose:** Web search via Brave's privacy-focused engine
- **Setup:** Requires Brave Search API key (free tier available)
- **My take:** Best balance of quality and privacy

**2. Exa MCP**
- **Purpose:** AI-native semantic search
- **Best for:** Research-heavy workflows
- **Different from Google:** Understands meaning, not just keywords

**3. Perplexity MCP**
- **Purpose:** AI-powered research with citations
- **Best for:** Fact-checking, deep research
- **Note:** Requires Perplexity API access

**4. YouTube MCP**
- **Purpose:** Search videos, fetch transcripts
- **Best for:** Video research, content summarization
- **Killer feature:** Full transcript access

**5. Wikipedia MCP**
- **Purpose:** Direct Wikipedia access
- **Best for:** Factual queries, definitions
- **Simple but useful**

**6. Serper MCP**
- **Purpose:** Google Search API wrapper
- **Best for:** When you specifically need Google results
- **Requires:** Serper API key

### Combining Search for Comprehensive Research

Here's a power move: combine multiple search servers. Have Claude check both Brave and Exa for comprehensive coverage, then use YouTube for video sources. Different search engines have different strengths.

My research setup:
- `brave-search` for general web queries
- `youtube` for tutorials and video content
- `exa` for semantic/conceptual searches

## AI & Machine Learning Servers

These servers let Claude work with other AI systems. Sounds meta, but it's useful for specialized tasks that benefit from different models.

### AI Integration Servers

**1. Hugging Face MCP**
- **Purpose:** Access thousands of open models
- **Best for:** Specialized ML tasks
- **Use case:** Run sentiment analysis, embeddings, classification

**2. Replicate MCP**
- **Purpose:** Run any model from Replicate's catalog
- **Best for:** Image generation, specialized models
- **Payment:** Pay-per-use to Replicate

**3. OpenAI MCP**
- **Purpose:** Access GPT models from Claude
- **Sounds weird?** Useful for comparing outputs or using specialized GPTs
- **Rare use case** but available

**4. Embeddings MCP**
- **Purpose:** Generate and manage vector embeddings
- **Best for:** [RAG applications](/blog/build-rag-chatbot-tutorial)
- **Often paired with:** Vector database servers

**5. Stability MCP**
- **Purpose:** Image generation via Stability AI
- **Best for:** Creating images within Claude conversations
- **Quality:** Competitive with DALL-E

### When to Use AI Servers with Claude

Honestly? You probably don't need these unless you're building something specific. Claude 4 is extremely capable on its own. 

Use cases where these make sense:
- **Embeddings** - Building RAG or semantic search systems
- **Image generation** - Adding visual content to workflows
- **Specialized models** - Tasks that benefit from fine-tuned models

## Creative & Media Servers

For creative professionals who want AI assistance in their workflows.

### Creative Server Options

**1. DALL-E MCP**
- **Purpose:** Generate images from descriptions
- **Best for:** Quick concept art, illustrations
- **Requires:** OpenAI API key

**2. Midjourney MCP**
- **Purpose:** Interface with Midjourney (via Discord API)
- **Best for:** Higher quality art generation
- **Setup:** Complex (Discord bot required)

**3. Figma MCP**
- **Purpose:** Read and modify Figma designs
- **Best for:** Designers working in Figma
- **Still experimental**

**4. Canva MCP**
- **Purpose:** Create and edit Canva designs
- **Best for:** Quick graphic creation
- **API access:** Requires Canva for Teams

**5. YouTube MCP**
- **Purpose:** Already covered, but essential for video creators
- **For creators:** Research topics, analyze competition

### Creative Workflow Example

Here's how I use creative servers:

1. Research topic with `brave-search` and `youtube`
2. Generate concept images with `stability` or `dall-e`
3. Draft content with Claude
4. Pull reference designs from `figma` (if applicable)

It's not a replacement for creative tools, but it speeds up the ideation phase significantly.

## Business & Enterprise Servers

Professional tools for business workflows. Enterprise users, pay attention here.

### Business Integration Servers

**1. Salesforce MCP**
- **Purpose:** Access CRM data, manage contacts and deals
- **Best for:** Sales and account management teams
- **Setup:** Requires Salesforce API access

**2. HubSpot MCP**
- **Purpose:** Marketing, sales, and CRM operations
- **Best for:** Teams using HubSpot ecosystem
- **Good for:** Lead management, email campaigns

**3. Stripe MCP**
- **Purpose:** View transactions, manage subscriptions
- **Best for:** Finance and ops teams
- **Caution:** Be extremely careful with payment data

**4. Zapier MCP**
- **Purpose:** Trigger Zapier workflows from Claude
- **Best for:** Automation fans
- **Power move:** Chain multiple automations

**5. Jira MCP**
- **Purpose:** Manage issues, sprints, projects
- **Best for:** Engineering and product teams
- **Similar to:** Linear MCP

**6. Google Analytics MCP**
- **Purpose:** Access web analytics data
- **Best for:** Marketing teams, reporting
- **Insight:** Ask Claude to analyze trends

### Enterprise Security Considerations

If you're in an enterprise environment, talk to your security team before deploying MCP servers. Some considerations:

- **Data access** - MCP servers can access sensitive business data
- **Audit logging** - Ensure you can track what Claude accessed
- **Credential management** - Use secrets managers, not env files
- **Network isolation** - Consider where servers run

For more on enterprise deployment, check the <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener">Anthropic enterprise documentation</a>.

## How to Install MCP Servers

Let's get practical. Here's how to actually install and configure MCP servers for [Claude Desktop](/blog/claude-desktop-mcp-setup).

### Prerequisites

Before you start:
1. **Claude Desktop** - Download from claude.ai (free)
2. **Node.js** - Version 18+ recommended
3. **A terminal** - Mac Terminal, Windows PowerShell, or Linux shell

### Step 1: Find Your Config File

Claude Desktop reads MCP config from:

- **Mac:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux:** `~/.config/Claude/claude_desktop_config.json`

If the file doesn't exist, create it.

### Step 2: Add Server Configuration

Here's a template showing multiple servers:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "@modelcontextprotocol/server-filesystem",
        "/Users/yourname/Documents",
        "/Users/yourname/Projects"
      ]
    },
    "fetch": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-fetch"]
    },
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

### Step 3: Restart Claude Desktop

After editing the config:
1. Quit Claude Desktop completely
2. Reopen Claude Desktop
3. Look for the hammer icon (🔨) in the bottom-left
4. Click it to see available tools from your servers

### Step 4: Test Your Installation

Try a simple command:
- For filesystem: "List the files in my Documents folder"
- For fetch: "Fetch the content from httpbin.org/json"
- For github: "List my GitHub repositories"

### Troubleshooting Common Issues

**Server not appearing?**
- Check JSON syntax (trailing commas break it)
- Verify the command exists (`npx` should work)
- Check Claude Desktop logs

**Permission errors?**
- Ensure the server has access to required paths
- Check API token permissions

**"Module not found" errors?**
- Run `npm cache clean --force`
- Delete `node_modules` and reinstall

## Choosing the Right Servers for Your Workflow

With 50+ options, where do you start? Here's my guidance based on common use cases.

### By Role

**Writers & Content Creators:**
- filesystem (docs access)
- brave-search (research)
- notion (notes/drafts)
- youtube (video research)

**Software Developers:**
- github (code management)
- filesystem (project files)
- postgres/sqlite (database)
- docker (containers)

**Researchers:**
- brave-search + exa (web search)
- youtube (video content)
- pdf (document analysis)
- notion (notes)

**Business Users:**
- slack (communication)
- calendar (scheduling)
- salesforce/hubspot (CRM)
- google-drive (files)

### Recommended Starter Packs

**Beginner Pack (3 servers):**
1. `filesystem` - Local file access
2. `fetch` - Web requests
3. `brave-search` - Web search

**Developer Pack (5 servers):**
1. `filesystem` - Code access
2. `github` - Repo management
3. `postgres` - Database
4. `docker` - Containers
5. `fetch` - APIs

**Productivity Pack (4 servers):**
1. `notion` - Notes/docs
2. `slack` - Team communication
3. `calendar` - Scheduling
4. `todoist` - Tasks

Start small. Each server adds complexity and uses context window. I'd say 5-7 servers is a sweet spot for most people.

## Frequently Asked Questions

### How many MCP servers can I run at once?

There's no hard limit, but practical limits exist. Each active server uses some context window capacity for its tool definitions. I run about 8 regularly without issues. If you notice Claude struggling, try reducing active servers.

### Are MCP servers safe to use?

The official Anthropic servers are well-tested and safe. Community servers vary. Always review the source code for community servers before trusting them with sensitive data. Never give MCP servers access to credentials, SSH keys, or production databases without careful consideration.

### How do I update an MCP server?

For npm-based servers, they update automatically when you restart Claude Desktop (npx fetches the latest). For manual installations, pull the latest from GitHub and rebuild. Check server repos for update instructions.

### Can I build my own MCP server?

Absolutely! That's the beauty of the open protocol. Check out our guide on [building your first MCP server](/blog/build-first-mcp-server) for a complete tutorial. SDKs are available for Python, TypeScript, Java, and Go.

### Do MCP servers work with Claude.ai web?

As of January 2026, MCP servers only work with Claude Desktop, not the Claude.ai web interface. Anthropic has hinted at web support coming, but no timeline yet.

### What's the difference between official and community servers?

Official servers (in the modelcontextprotocol/servers repo) are maintained by Anthropic. They're well-documented, regularly updated, and work reliably. Community servers are maintained by individuals—quality varies. Check last update date, stars, and issues before trusting community servers.

### Where can I find more MCP servers?

Best directories as of 2026:
- <a href="https://mcp.so" target="_blank" rel="noopener">mcp.so</a> - Community directory
- <a href="https://github.com/search?q=mcp-server" target="_blank" rel="noopener">GitHub search</a> - Raw search
- <a href="https://mcpmarket.com" target="_blank" rel="noopener">MCP Market</a> - Growing marketplace

## Your MCP Server Journey Starts Here

We've covered 50+ servers across 8 categories—from official Anthropic fundamentals to specialized business tools. The MCP ecosystem is growing fast, and this directory will help you navigate it without the hours of research I went through.

My advice? Start with the official servers. Master filesystem, fetch, and one or two others that match your workflow. Once you're comfortable, explore the community servers that solve your specific problems.

MCP is still early. By the end of 2026, I expect we'll have 1,000+ quality servers covering nearly every imaginable integration. The companies building tools today are racing to add MCP support—it's becoming the standard for AI-to-tool connectivity.

Want to go deeper? [Learn how to build your own MCP server](/blog/build-first-mcp-server) and contribute to this growing ecosystem. The best server for your unique workflow might be one you create yourself.

Happy integrating.
