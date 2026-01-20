# Research Brief: Claude Desktop MCP Setup: Complete Configuration Guide

## Post Metadata
- **Post ID:** #157
- **Category:** mcp
- **Type:** Guide
- **Intent:** Informational
- **Target Word Count:** 4000+
- **Priority:** P1
- **Date Created:** 2026-01-11

---

## Core Research Findings

### Prerequisites
- Claude Desktop (latest version)
- Node.js (LTS version for many servers)
- Text editor for JSON config
- Docker (optional for some servers)

### Config File Locations
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

### Setup Steps
1. Install Claude Desktop
2. Install Node.js if needed
3. Access Developer Settings
4. Edit claude_desktop_config.json
5. Restart Claude Desktop
6. Verify server status

### Desktop Extensions (New Method)
- Single-click installation
- Settings > Extensions > Browse
- No manual JSON needed for many servers

### Log Files
- **macOS:** `~/Library/Logs/Claude/`
- **Windows:** `%APPDATA%\Claude\logs`
- `mcp.log` for MCP-specific logging

### Common Servers to Configure
- Filesystem Server
- Brave Search
- GitHub
- Weather

---

## Internal Links
- /blog/what-is-mcp-explained
- /blog/build-mcp-server-python
- /blog/best-mcp-servers-claude
