# Enhancement Draft: Build a GitHub MCP Server: Automate PR Reviews with AI (2026)

**Generated:** 2026-01-12
**Slug:** mcp-github-server
**Current Word Count:** 633 (visible to Google)
**Target Word Count:** 1500+
**Words to Add:** ~900

---

## Voice Analysis

**Detected characteristics:**
- First-person narrative ("I've been using", "I've seen")
- Conversational but technical tone
- Short-to-medium sentences
- Uses rhetorical questions to engage
- Bold text for emphasis
- Tables for structured information
- H2/H3 headings without emojis
- Code blocks with inline comments
- Practical, hands-on approach

---

## Enhancement 1: Introduction Expansion

**Location:** After line 19 (after "I've been using this setup for my own projects, and it's genuinely changed how I work with code reviews.")
**Words Added:** ~150

### Content to Add:

**What you'll build in this tutorial:**
- A fully functional MCP server that exposes GitHub operations to Claude
- PR review automation that analyzes diffs and suggests improvements
- Code search capabilities across your repositories
- Issue management tools for creating and triaging issues

**Real-world applications:** Teams use GitHub MCP servers to automate repetitive reviews, catch common bugs before human review, and let developers ask natural language questions about their codebase. One pattern I've found particularly valuable is asking Claude to "review this PR focusing on security" before I do my own pass—it catches things I'd miss.

---

## Enhancement 2: Understanding GitHub's API Before We Build

**Location:** After line 64 (after "3. Save the token securely"), before "---"
**Words Added:** ~180

### Content to Add:

### Understanding the API Limits

Before building, you should understand GitHub's rate limits. The REST API allows 5,000 requests per hour for authenticated users. For MCP servers that might analyze multiple PRs in sequence, this matters.

A few practical considerations:

- **PR diff size:** Large PRs can consume significant tokens when passed to Claude. Consider chunking diffs by file or limiting to the first N files.
- **Search quotas:** Code search has stricter limits (30 requests per minute). Build in delays for search-heavy workflows.
- **Caching opportunity:** Repository structure and file content don't change frequently. Cache what you can.

The architecture we're building handles these concerns through careful request management.

---

## Enhancement 3: Code Explanation - GitHub Client

**Location:** After line 299 (after the GitHubClient class code block ends)
**Words Added:** ~120

### Content to Add:

**Key implementation details:**

- **Async by default:** All methods use `httpx.AsyncClient` for non-blocking I/O. This matters when Claude calls multiple tools in sequence.
- **Token in header:** The `Bearer` token format works with both classic tokens and fine-grained personal access tokens (PATs).
- **Base64 decoding:** GitHub returns file contents as base64-encoded strings. The `get_file_content` method handles this automatically.

> ⚠️ **Common issue:** Getting 401 errors? Check that your token hasn't expired and has the correct scopes. GitHub tokens can be revoked if pushed to a public repository, even briefly.

---

## Enhancement 4: Code Explanation - PR Review Tools

**Location:** After line 460 (after the PRReviewTools class code block ends)
**Words Added:** ~130

### Content to Add:

**How the security scanner works:**

The `review_pr_security` method implements a pattern-matching approach for common security issues. It's not a replacement for dedicated security tools, but it catches low-hanging fruit before Claude even needs to analyze the code.

The security patterns list is intentionally conservative—false positives are frustrating. You'll want to customize this for your codebase. For example, if you work in security tooling, `password` appears legitimately.

**Pro tip:** Extend the sensitive_files list with your project's configuration patterns. Files like `production.yaml` or `secrets.tf` deserve extra scrutiny.

---

## Enhancement 5: Troubleshooting Section

**Location:** After line 798 (after "Can I use this with GitHub Enterprise?" FAQ entry), before "---"
**Words Added:** ~250

### Content to Add:

## Troubleshooting Common Issues

### MCP Server Won't Connect to Claude

**What you see:** Claude Desktop shows "Server disconnected" or the tools don't appear.

**Why it happens:** Usually a Python environment or path issue. Claude can't find your server script.

**How to fix it:**
1. Verify the `cwd` path in your Claude config is absolute, not relative
2. Ensure the virtual environment is activated (check that `python -m github_mcp.server` works from the terminal)
3. Check Claude Desktop's logs: Help → Open Logs folder
4. Restart Claude Desktop after config changes

### Rate Limit Errors from GitHub

**What you see:** `RateLimitError` or 403 responses.

**Why it happens:** You've exceeded the 5,000 requests/hour limit for authenticated users.

**How to fix it:**
1. Add the rate limiting handler shown in the Security Considerations section
2. Reduce the frequency of code search operations
3. Cache PR data when possible—it doesn't change during a review session

### PR Diff Too Large for Claude

**What you see:** Claude truncates the diff or times out.

**Why it happens:** Some PRs change thousands of lines, exceeding context limits.

**How to fix it:**
1. Filter to specific file types: `file_filter=".py"` in `get_pr_code_changes`
2. Analyze files one at a time instead of the full diff
3. Ask Claude to summarize the PR first, then dive into specific files

---

## Enhancement 6: Expanded FAQ

**Location:** After line 798, within the FAQ section
**Words Added:** ~180

### Content to Add:

### How do I debug when Claude calls the wrong tool?

Start by adding verbose logging. In `call_tool()`, log the tool name and arguments at the start of each call. Often the issue is in Claude's understanding of your tool descriptions—make them more specific.

### What's the latency impact of MCP versus direct API calls?

MCP adds roughly 50-100ms of overhead per tool call (for the JSON-RPC protocol). For interactive use, this is imperceptible. For batch operations processing hundreds of PRs, consider calling the GitHub API directly from a script instead.

### Can I test the MCP server without Claude?

Yes! The MCP SDK includes a test client. You can also call your server functions directly as Python async functions—the MCP layer is just the transport.

### How do I add support for GitHub Actions workflows?

Add a new tool that calls the Actions API endpoint (`/repos/{owner}/{repo}/actions/runs`). The pattern is identical to the PR tools—define the API call, wrap it in a tool, add it to the server.

---

## New Internal Links

| Anchor Text | Target | Insert Location |
|-------------|--------|-----------------|
| MCP architecture overview | /blog/what-is-mcp | Line 25, when explaining "MCP server acts as a bridge" |
| AI code review patterns | /blog/ai-code-review-guide | Line 305, when discussing PR review automation |
| Claude's tool use capabilities | /blog/claude-api-tutorial | Line 17, when mentioning Claude |
| async Python patterns for AI | /blog/async-python-tutorial | Line 151, in async client discussion |

---

## New External Links

| Anchor Text | URL | Insert Location |
|-------------|-----|-----------------|
| GitHub REST API documentation | https://docs.github.com/en/rest | Line 25, architecture section |
| Anthropic's MCP specification | https://modelcontextprotocol.io/docs | Line 25, MCP explanation |
| GitHub rate limiting guide | https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api | New "Understanding API Limits" section |
| Creating GitHub tokens | https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token | Line 58, token creation section |

---

## Summary

- **Total words added:** ~910
- **New word count:** ~1543 (visible to Google)
- **New internal links:** 4
- **New external links:** 4
- **New sections added:** 2 (Understanding API Limits, Troubleshooting)
- **FAQ questions added:** 4
