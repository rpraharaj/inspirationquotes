---
title: "Build a GitHub MCP Server: Automate PR Reviews with AI (2026)"
description: "Build a custom GitHub MCP server to automate PR reviews with Claude. Step-by-step tutorial with complete Python code for repository management and code review."
pubDate: 2026-01-11
author: "AI Agents Kit"
category: "mcp"
tags: ["mcp", "github", "automation", "pr review", "claude", "python", "tutorial"]
featured: false
readingTime: 22
---

# Build a GitHub MCP Server: Automate PR Reviews with AI (2026)

What if Claude could review your pull requests, analyze your codebase, and manage GitHub issues—all through natural language?

That's exactly what we're building in this tutorial: a custom MCP server that connects Claude to GitHub's API. By the end, you'll be able to ask Claude to review PRs, search code, and automate repository workflows.

I've been using this setup for my own projects, and it's genuinely changed how I work with code reviews.

---

## What is a GitHub MCP Server?

An MCP server acts as a bridge between Claude and external services. A GitHub MCP server specifically exposes GitHub's functionality as tools that Claude can call.

```
┌─────────────┐      MCP       ┌──────────────┐    REST API   ┌────────────┐
│   Claude    │◄──────────────►│ GitHub MCP   │◄─────────────►│  GitHub    │
│  (Desktop)  │    JSON-RPC    │   Server     │               │    API     │
└─────────────┘                └──────────────┘               └────────────┘
```

### What You Can Build

| Tool Category | Example Capabilities |
|---------------|---------------------|
| **Code Review** | Analyze PRs, suggest improvements, spot bugs |
| **Repository** | Search code, analyze structure, get file contents |
| **Issues** | Create, update, search, and triage issues |
| **Workflows** | Monitor CI/CD, analyze build failures |

For MCP basics, see our [MCP database tutorial](/blog/mcp-database-tutorial). For enterprise deployment, check the [MCP security guide](/blog/mcp-enterprise-security).

---

## Prerequisites

Before starting, ensure you have:

- **Python 3.10+** installed
- **Claude Desktop** (macOS or Windows)
- **GitHub Personal Access Token** with appropriate scopes
- Basic familiarity with Python and GitHub's API

### Create a GitHub Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with these scopes:
   - `repo` (full repository access)
   - `read:org` (read organization data)
   - `read:user` (read user data)
3. Save the token securely

---

## Part 1: Setting Up the Project

### Project Structure

```
github-mcp-server/
├── github_mcp/
│   ├── __init__.py
│   ├── server.py       # Main MCP server
│   ├── github_client.py # GitHub API wrapper
│   ├── tools/
│   │   ├── __init__.py
│   │   ├── pr_tools.py    # PR review tools
│   │   ├── repo_tools.py  # Repository tools
│   │   └── issue_tools.py # Issue management
│   └── prompts/
│       └── review_prompts.py
├── requirements.txt
├── .env
└── README.md
```

### Install Dependencies

```bash
# Create project
mkdir github-mcp-server && cd github-mcp-server

# Create virtual environment
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows

# Install packages
pip install mcp httpx python-dotenv pydantic

# Create requirements file
cat > requirements.txt << EOF
mcp>=1.0.0
httpx>=0.25.0
python-dotenv>=1.0.0
pydantic>=2.5.0
EOF
```

### Environment Configuration

```bash
# .env file
GITHUB_TOKEN=ghp_your_personal_access_token_here
GITHUB_DEFAULT_OWNER=your-username
GITHUB_DEFAULT_REPO=your-default-repo
```

---

## Part 2: Implementing GitHub API Tools

### GitHub Client Wrapper

```python
# github_mcp/github_client.py
import httpx
import os
from typing import Optional, Dict, Any, List
from dotenv import load_dotenv

load_dotenv()

class GitHubClient:
    """Async GitHub API client."""
    
    BASE_URL = "https://api.github.com"
    
    def __init__(self, token: Optional[str] = None):
        self.token = token or os.getenv("GITHUB_TOKEN")
        if not self.token:
            raise ValueError("GitHub token required")
        
        self.headers = {
            "Authorization": f"Bearer {self.token}",
            "Accept": "application/vnd.github.v3+json",
            "X-GitHub-Api-Version": "2022-11-28"
        }
    
    async def _request(
        self, 
        method: str, 
        endpoint: str, 
        **kwargs
    ) -> Dict[str, Any]:
        """Make an API request."""
        async with httpx.AsyncClient() as client:
            url = f"{self.BASE_URL}{endpoint}"
            response = await client.request(
                method, 
                url, 
                headers=self.headers,
                **kwargs
            )
            response.raise_for_status()
            return response.json()
    
    async def get(self, endpoint: str, params: Dict = None) -> Dict:
        return await self._request("GET", endpoint, params=params)
    
    async def post(self, endpoint: str, json: Dict = None) -> Dict:
        return await self._request("POST", endpoint, json=json)
    
    async def patch(self, endpoint: str, json: Dict = None) -> Dict:
        return await self._request("PATCH", endpoint, json=json)
    
    # Repository methods
    async def get_repo(self, owner: str, repo: str) -> Dict:
        return await self.get(f"/repos/{owner}/{repo}")
    
    async def get_file_content(
        self, 
        owner: str, 
        repo: str, 
        path: str,
        ref: str = "main"
    ) -> str:
        """Get decoded file content."""
        data = await self.get(
            f"/repos/{owner}/{repo}/contents/{path}",
            params={"ref": ref}
        )
        import base64
        return base64.b64decode(data["content"]).decode("utf-8")
    
    async def search_code(
        self, 
        query: str, 
        owner: str = None, 
        repo: str = None
    ) -> List[Dict]:
        """Search for code across repositories."""
        q = query
        if owner and repo:
            q += f" repo:{owner}/{repo}"
        
        result = await self.get("/search/code", params={"q": q})
        return result.get("items", [])
    
    # Pull Request methods
    async def get_pr(self, owner: str, repo: str, pr_number: int) -> Dict:
        return await self.get(f"/repos/{owner}/{repo}/pulls/{pr_number}")
    
    async def get_pr_files(
        self, 
        owner: str, 
        repo: str, 
        pr_number: int
    ) -> List[Dict]:
        return await self.get(f"/repos/{owner}/{repo}/pulls/{pr_number}/files")
    
    async def get_pr_diff(
        self, 
        owner: str, 
        repo: str, 
        pr_number: int
    ) -> str:
        """Get PR diff as text."""
        async with httpx.AsyncClient() as client:
            url = f"{self.BASE_URL}/repos/{owner}/{repo}/pulls/{pr_number}"
            headers = {**self.headers, "Accept": "application/vnd.github.v3.diff"}
            response = await client.get(url, headers=headers)
            response.raise_for_status()
            return response.text
    
    async def create_pr_comment(
        self,
        owner: str,
        repo: str,
        pr_number: int,
        body: str
    ) -> Dict:
        return await self.post(
            f"/repos/{owner}/{repo}/issues/{pr_number}/comments",
            json={"body": body}
        )
    
    async def create_pr_review(
        self,
        owner: str,
        repo: str,
        pr_number: int,
        body: str,
        event: str = "COMMENT"  # APPROVE, REQUEST_CHANGES, COMMENT
    ) -> Dict:
        return await self.post(
            f"/repos/{owner}/{repo}/pulls/{pr_number}/reviews",
            json={"body": body, "event": event}
        )
    
    # Issue methods
    async def list_issues(
        self, 
        owner: str, 
        repo: str,
        state: str = "open",
        labels: str = None
    ) -> List[Dict]:
        params = {"state": state}
        if labels:
            params["labels"] = labels
        return await self.get(f"/repos/{owner}/{repo}/issues", params=params)
    
    async def create_issue(
        self,
        owner: str,
        repo: str,
        title: str,
        body: str,
        labels: List[str] = None
    ) -> Dict:
        data = {"title": title, "body": body}
        if labels:
            data["labels"] = labels
        return await self.post(f"/repos/{owner}/{repo}/issues", json=data)
    
    async def update_issue(
        self,
        owner: str,
        repo: str,
        issue_number: int,
        **updates
    ) -> Dict:
        return await self.patch(
            f"/repos/{owner}/{repo}/issues/{issue_number}",
            json=updates
        )
```

---

## Part 3: PR Review Automation

This is where it gets interesting. We'll create tools that let Claude analyze and review pull requests.

### PR Review Tools

```python
# github_mcp/tools/pr_tools.py
from typing import List, Dict, Any
from ..github_client import GitHubClient

class PRReviewTools:
    """Tools for reviewing and analyzing pull requests."""
    
    def __init__(self, client: GitHubClient):
        self.client = client
    
    async def get_pr_summary(
        self, 
        owner: str, 
        repo: str, 
        pr_number: int
    ) -> Dict[str, Any]:
        """Get a comprehensive PR summary for review."""
        pr = await self.client.get_pr(owner, repo, pr_number)
        files = await self.client.get_pr_files(owner, repo, pr_number)
        
        # Categorize file changes
        file_summary = {
            "added": [],
            "modified": [],
            "removed": [],
            "renamed": []
        }
        
        total_additions = 0
        total_deletions = 0
        
        for f in files:
            filename = f["filename"]
            status = f["status"]
            
            if status in file_summary:
                file_summary[status].append(filename)
            
            total_additions += f.get("additions", 0)
            total_deletions += f.get("deletions", 0)
        
        return {
            "title": pr["title"],
            "description": pr["body"] or "(No description)",
            "author": pr["user"]["login"],
            "state": pr["state"],
            "created_at": pr["created_at"],
            "updated_at": pr["updated_at"],
            "base_branch": pr["base"]["ref"],
            "head_branch": pr["head"]["ref"],
            "mergeable": pr.get("mergeable"),
            "files_changed": len(files),
            "additions": total_additions,
            "deletions": total_deletions,
            "file_summary": file_summary,
            "url": pr["html_url"]
        }
    
    async def get_pr_code_changes(
        self,
        owner: str,
        repo: str,
        pr_number: int,
        file_filter: str = None
    ) -> List[Dict]:
        """Get detailed code changes for review."""
        files = await self.client.get_pr_files(owner, repo, pr_number)
        
        if file_filter:
            files = [f for f in files if file_filter in f["filename"]]
        
        changes = []
        for f in files:
            change = {
                "filename": f["filename"],
                "status": f["status"],
                "additions": f.get("additions", 0),
                "deletions": f.get("deletions", 0),
                "patch": f.get("patch", "(Binary file or too large)")
            }
            changes.append(change)
        
        return changes
    
    async def review_pr_security(
        self,
        owner: str,
        repo: str,
        pr_number: int
    ) -> Dict:
        """Security-focused review of PR changes."""
        files = await self.client.get_pr_files(owner, repo, pr_number)
        
        security_patterns = [
            ("password", "Potential hardcoded password"),
            ("api_key", "Potential hardcoded API key"),
            ("secret", "Potential secret in code"),
            ("TODO", "Unfinished work (TODO comment)"),
            ("FIXME", "Known issue (FIXME comment)"),
            ("eval(", "Use of eval() - security risk"),
            ("exec(", "Use of exec() - security risk"),
            ("subprocess.call", "Shell command execution"),
            ("os.system", "Shell command execution"),
        ]
        
        findings = []
        
        for f in files:
            patch = f.get("patch", "")
            filename = f["filename"]
            
            for pattern, description in security_patterns:
                if pattern.lower() in patch.lower():
                    findings.append({
                        "file": filename,
                        "pattern": pattern,
                        "description": description
                    })
        
        sensitive_files = [
            f["filename"] for f in files
            if any(x in f["filename"].lower() for x in [
                ".env", "secret", "credential", "key", "password",
                "config.json", "settings.py"
            ])
        ]
        
        return {
            "security_findings": findings,
            "sensitive_files_changed": sensitive_files,
            "total_findings": len(findings),
            "needs_security_review": len(findings) > 0 or len(sensitive_files) > 0
        }
    
    async def submit_review(
        self,
        owner: str,
        repo: str,
        pr_number: int,
        review_body: str,
        action: str = "COMMENT"
    ) -> Dict:
        """Submit a review to the PR."""
        valid_actions = ["APPROVE", "REQUEST_CHANGES", "COMMENT"]
        if action not in valid_actions:
            raise ValueError(f"Action must be one of: {valid_actions}")
        
        return await self.client.create_pr_review(
            owner, repo, pr_number, review_body, action
        )
```

---

## Part 4: Building the MCP Server

Now let's wire everything together into an MCP server.

```python
# github_mcp/server.py
import asyncio
import os
from dotenv import load_dotenv
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

from .github_client import GitHubClient
from .tools.pr_tools import PRReviewTools

load_dotenv()

# Initialize
server = Server("github-mcp-server")
github = GitHubClient()
pr_tools = PRReviewTools(github)

# Default repository (can be overridden per-call)
DEFAULT_OWNER = os.getenv("GITHUB_DEFAULT_OWNER", "")
DEFAULT_REPO = os.getenv("GITHUB_DEFAULT_REPO", "")

@server.list_tools()
async def list_tools() -> list[types.Tool]:
    """List all available GitHub tools."""
    return [
        types.Tool(
            name="get_pr_summary",
            description="Get a summary of a pull request including files changed, additions/deletions, and metadata",
            inputSchema={
                "type": "object",
                "properties": {
                    "owner": {"type": "string", "description": "Repository owner (optional, uses default)"},
                    "repo": {"type": "string", "description": "Repository name (optional, uses default)"},
                    "pr_number": {"type": "integer", "description": "Pull request number"}
                },
                "required": ["pr_number"]
            }
        ),
        types.Tool(
            name="get_pr_code_changes",
            description="Get the actual code changes (diff/patch) for a pull request",
            inputSchema={
                "type": "object",
                "properties": {
                    "owner": {"type": "string"},
                    "repo": {"type": "string"},
                    "pr_number": {"type": "integer"},
                    "file_filter": {"type": "string", "description": "Optional filter to only show files containing this string"}
                },
                "required": ["pr_number"]
            }
        ),
        types.Tool(
            name="review_pr_security",
            description="Perform a security-focused review of a pull request, checking for potential secrets, dangerous functions, and sensitive files",
            inputSchema={
                "type": "object",
                "properties": {
                    "owner": {"type": "string"},
                    "repo": {"type": "string"},
                    "pr_number": {"type": "integer"}
                },
                "required": ["pr_number"]
            }
        ),
        types.Tool(
            name="submit_pr_review",
            description="Submit a review comment to a pull request",
            inputSchema={
                "type": "object",
                "properties": {
                    "owner": {"type": "string"},
                    "repo": {"type": "string"},
                    "pr_number": {"type": "integer"},
                    "review_body": {"type": "string", "description": "The review comment text"},
                    "action": {"type": "string", "enum": ["COMMENT", "APPROVE", "REQUEST_CHANGES"], "description": "Review action"}
                },
                "required": ["pr_number", "review_body"]
            }
        ),
        types.Tool(
            name="search_code",
            description="Search for code across repositories",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "Search query"},
                    "owner": {"type": "string", "description": "Limit to this owner's repos"},
                    "repo": {"type": "string", "description": "Limit to this repository"}
                },
                "required": ["query"]
            }
        ),
        types.Tool(
            name="get_file_content",
            description="Get the content of a file from a repository",
            inputSchema={
                "type": "object",
                "properties": {
                    "owner": {"type": "string"},
                    "repo": {"type": "string"},
                    "path": {"type": "string", "description": "File path in the repository"},
                    "ref": {"type": "string", "description": "Branch or commit ref (default: main)"}
                },
                "required": ["path"]
            }
        ),
        types.Tool(
            name="list_issues",
            description="List issues in a repository",
            inputSchema={
                "type": "object",
                "properties": {
                    "owner": {"type": "string"},
                    "repo": {"type": "string"},
                    "state": {"type": "string", "enum": ["open", "closed", "all"], "default": "open"},
                    "labels": {"type": "string", "description": "Comma-separated labels to filter by"}
                }
            }
        ),
        types.Tool(
            name="create_issue",
            description="Create a new issue in a repository",
            inputSchema={
                "type": "object",
                "properties": {
                    "owner": {"type": "string"},
                    "repo": {"type": "string"},
                    "title": {"type": "string", "description": "Issue title"},
                    "body": {"type": "string", "description": "Issue body/description"},
                    "labels": {"type": "array", "items": {"type": "string"}, "description": "Labels to apply"}
                },
                "required": ["title", "body"]
            }
        ),
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[types.TextContent]:
    """Execute a GitHub tool."""
    
    # Apply defaults for owner/repo if not provided
    owner = arguments.get("owner") or DEFAULT_OWNER
    repo = arguments.get("repo") or DEFAULT_REPO
    
    try:
        if name == "get_pr_summary":
            result = await pr_tools.get_pr_summary(
                owner, repo, arguments["pr_number"]
            )
        
        elif name == "get_pr_code_changes":
            result = await pr_tools.get_pr_code_changes(
                owner, repo,
                arguments["pr_number"],
                arguments.get("file_filter")
            )
        
        elif name == "review_pr_security":
            result = await pr_tools.review_pr_security(
                owner, repo, arguments["pr_number"]
            )
        
        elif name == "submit_pr_review":
            result = await pr_tools.submit_review(
                owner, repo,
                arguments["pr_number"],
                arguments["review_body"],
                arguments.get("action", "COMMENT")
            )
        
        elif name == "search_code":
            result = await github.search_code(
                arguments["query"],
                arguments.get("owner"),
                arguments.get("repo")
            )
        
        elif name == "get_file_content":
            content = await github.get_file_content(
                owner, repo,
                arguments["path"],
                arguments.get("ref", "main")
            )
            result = {"path": arguments["path"], "content": content}
        
        elif name == "list_issues":
            result = await github.list_issues(
                owner, repo,
                arguments.get("state", "open"),
                arguments.get("labels")
            )
        
        elif name == "create_issue":
            result = await github.create_issue(
                owner, repo,
                arguments["title"],
                arguments["body"],
                arguments.get("labels")
            )
        
        else:
            return [types.TextContent(type="text", text=f"Unknown tool: {name}")]
        
        # Format result
        import json
        return [types.TextContent(
            type="text",
            text=json.dumps(result, indent=2, default=str)
        )]
        
    except Exception as e:
        return [types.TextContent(
            type="text",
            text=f"Error: {str(e)}"
        )]

async def main():
    async with stdio_server() as (read_stream, write_stream):
        await server.run(read_stream, write_stream)

if __name__ == "__main__":
    asyncio.run(main())
```

---

## Part 5: Configuring Claude Desktop

Add your server to Claude Desktop's configuration:

```json
{
  "mcpServers": {
    "github": {
      "command": "python",
      "args": ["-m", "github_mcp.server"],
      "cwd": "/path/to/github-mcp-server",
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here",
        "GITHUB_DEFAULT_OWNER": "your-username",
        "GITHUB_DEFAULT_REPO": "your-repo"
      }
    }
  }
}
```

### Test the Integration

Restart Claude Desktop and try these prompts:

> "Review PR #42 and summarize the changes"

> "Check PR #42 for any security issues"

> "Show me all open issues labeled 'bug'"

> "Search for usages of 'deprecated_function' in the codebase"

---

## Security Considerations

### Token Scope Management

Only grant the scopes you need:

| Scope | Needed For |
|-------|------------|
| `repo` | Full repository access (required) |
| `read:org` | Organization data (optional) |
| `read:user` | User profile data (optional) |

### Rate Limiting

GitHub has API rate limits. Handle them gracefully:

```python
async def _request(self, method: str, endpoint: str, **kwargs):
    response = await client.request(method, url, headers=self.headers, **kwargs)
    
    # Check rate limits
    remaining = int(response.headers.get("X-RateLimit-Remaining", 0))
    if remaining < 10:
        import logging
        logging.warning(f"GitHub rate limit low: {remaining} remaining")
    
    if response.status_code == 403 and "rate limit" in response.text.lower():
        reset_time = int(response.headers.get("X-RateLimit-Reset", 0))
        raise Exception(f"Rate limited. Resets at {reset_time}")
    
    response.raise_for_status()
    return response.json()
```

### Audit Logging

Log all actions for security review:

```python
import logging

logging.basicConfig(
    filename='github_mcp_audit.log',
    format='%(asctime)s - %(levelname)s - %(message)s'
)

@server.call_tool()
async def call_tool(name: str, arguments: dict):
    logging.info(f"Tool called: {name} with args: {arguments}")
    # ... execute tool ...
```

---

## Frequently Asked Questions

### Can Claude actually modify my repository?
Only if you give it tools that make changes (like `submit_review` or `create_issue`). Read-only tools are safe.

### What about private repositories?
Works the same—just ensure your token has access to the private repos you want to query.

### How do I add more tools?
Follow the pattern: add a method to `GitHubClient`, create a tool definition in `list_tools()`, and handle it in `call_tool()`.

### Can I use this with GitHub Enterprise?
Yes! Just change `BASE_URL` in `GitHubClient` to your enterprise instance URL.

---

## Conclusion

You've built a custom GitHub MCP server that enables:

1. **PR Review Automation** - Summarize changes, spot security issues, submit reviews
2. **Code Search** - Find patterns and usages across repositories
3. **Issue Management** - List, create, and update issues
4. **File Access** - Read any file from any branch

This foundation can be extended with workflow monitoring, release management, and more sophisticated code analysis.

**Next steps:**
- Add CI/CD workflow monitoring
- Implement code coverage analysis
- Build automated triage for issues

For more MCP patterns, see our [MCP database tutorial](/blog/mcp-database-tutorial) or learn about [MCP enterprise security](/blog/mcp-enterprise-security).

---

*Last updated: January 2026*
