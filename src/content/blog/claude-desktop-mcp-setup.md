---
heroImage: "/images/featured/claude-desktop-mcp-setup.webp"
title: "Claude Desktop MCP Setup: Complete Configuration Guide"
description: "Step-by-step guide to configuring MCP servers in Claude Desktop. Learn how to set up file access, search, databases, and more. Beginner-friendly for 2026."
pubDate: 2026-01-01
category: "mcp"
author: "AI Agents Kit"
tags: ["mcp", "claude desktop", "configuration", "setup guide", "tutorial"]
featured: false
readingTime: 17
---

The first time I configured MCP in Claude Desktop, I spent way too long staring at a JSON file wondering if I was doing it right. The documentation existed, but it was scattered across different sources, and I kept running into small issues that killed frustrating amounts of time.

This guide is what I wish I'd had. It walks you through setting up MCP in Claude Desktop from scratch—installing dependencies, finding the config file, adding your first server, testing that it works, and troubleshooting when it doesn't. Whether you're on Mac or Windows, by the end of this tutorial, you'll have Claude connected to external tools and ready to actually do things.

Let's get you set up.

## What You'll Need

Before we dive into configuration, make sure you have these ready:

### Required

**Claude Desktop** - The app, not the web interface. MCP only works with the desktop application. If you don't have it yet, we'll install it in the next section.

**A text editor** - You'll be editing a JSON configuration file. VS Code, Sublime Text, Notepad++, or even the default text editors work fine. Just don't use a word processor like Microsoft Word—those add formatting that breaks JSON.

**Administrator access** - You'll need permission to install software and edit files in application directories.

### Needed for Most Servers

**Node.js** - Many MCP servers are built with Node.js and require it to run. The LTS (Long Term Support) version is recommended. If you're only using desktop extensions, you might not need this.

### Optional

**Docker** - Required only for Docker-based MCP server deployments. Most basic setups don't need it.

**API keys** - Servers that connect to external services (like Brave Search or GitHub) need API credentials. We'll cover these when relevant.

Don't worry if some of this seems unfamiliar. We'll walk through each step.

## Installing Claude Desktop

If you already have Claude Desktop installed, skip to checking for updates. If not, here's how to get it:

### Download and Install

1. **Visit claude.ai** and look for the desktop download option
2. **Select your operating system** (macOS or Windows—Linux isn't officially supported yet)
3. **Download the installer** and run it
4. **Follow the installation wizard** - accept the license, choose install location
5. **Launch Claude Desktop** when installation completes

### Sign In

You'll need a Claude account to use the desktop app:

1. **Enter your email** and complete authentication
2. **Verify your account** if prompted
3. **You should see the main Claude chat interface** once signed in

### Check for Updates

MCP support is actively developed, so running the latest version matters. To check:

**On Mac:**
1. Click "Claude" in the menu bar
2. Select "Check for Updates"
3. Install any available updates

**On Windows:**
1. Open Settings (gear icon or menu)
2. Look for "Updates" section
3. Check and install updates

I recommend enabling automatic updates if the option's available. MCP features are regularly improved.

## Setting Up Node.js

Many MCP servers require Node.js to run. If you're only using Claude's built-in desktop extensions, you might not need this—but I'd install it anyway for flexibility.

### Why Node.js?

Node.js is a JavaScript runtime that lets you run JavaScript code outside a browser. Many MCP servers are written in JavaScript/TypeScript and distributed as npm packages that need Node.js to execute.

### Installation Steps

**On Mac:**

The easiest method is through the official installer:

1. Go to <a href="https://nodejs.org" target="_blank" rel="noopener">nodejs.org</a>
2. Download the LTS version (recommended for most users)
3. Open the downloaded .pkg file
4. Follow the installation wizard
5. Verify installation by opening Terminal and running:

```bash
node --version
```

You should see a version number like `v20.x.x` or similar.

**On Windows:**

1. Go to <a href="https://nodejs.org" target="_blank" rel="noopener">nodejs.org</a>
2. Download the LTS Windows Installer
3. Run the installer and accept defaults
4. **Important:** Check the option to "Automatically install necessary tools" if offered
5. Verify by opening Command Prompt and running:

```bash
node --version
```

### If You Have Issues

If `node --version` doesn't work:
- **Restart your terminal** - The PATH updates after installation
- **Restart your computer** if terminal restart doesn't help
- **Check PATH** - Make sure Node.js is in your system PATH

For detailed understanding of [what MCP is](/blog/what-is-mcp-explained), check out our comprehensive explainer.

## Finding Your Configuration File

Claude Desktop stores MCP configuration in a JSON file. The location depends on your operating system.

### Configuration File Locations

**macOS:**
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Windows:**
```
%APPDATA%\Claude\claude_desktop_config.json
```

### The Easy Way: Developer Settings

Claude Desktop can open this file for you:

1. **Open Claude Desktop**
2. **Go to Settings:**
   - Mac: Click "Claude" in the menu bar → "Settings"
   - Windows: Click the settings gear icon
3. **Click the "Developer" tab** in the left sidebar
4. **Click "Edit Config"**

This opens your configuration file in your default text editor. If the file doesn't exist yet, it creates one.

### The Manual Way

If you prefer finding it manually:

**On Mac:**
1. Open Finder
2. Press `Cmd+Shift+G` to "Go to Folder"
3. Paste: `~/Library/Application Support/Claude/`
4. Look for `claude_desktop_config.json`

**On Windows:**
1. Open File Explorer
2. Paste in the address bar: `%APPDATA%\Claude\`
3. Look for `claude_desktop_config.json`

### If the File Doesn't Exist

That's fine—it's created on demand. Either:
- Use the "Edit Config" button in Developer Settings (it creates the file)
- Create it manually as an empty JSON object: `{}`

## Understanding the Config File

Before adding servers, let's understand what this file contains.

### Basic Structure

The configuration file is JSON format. An empty config looks like:

```json
{}
```

A config with MCP servers looks like:

```json
{
  "mcpServers": {
    "server-name-1": {
      "command": "node",
      "args": ["/path/to/server/index.js"]
    },
    "server-name-2": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/allowed/path"]
    }
  }
}
```

### Key Components

**`mcpServers`** - The main object containing all your MCP server configurations. Everything goes inside this.

**Server name** (like `"server-name-1"`) - A unique identifier you choose. This is what shows up in Claude's interface.

**`command`** - The executable to run. Common values:
- `"node"` - For Node.js-based servers
- `"npx"` - For npm-packaged servers (auto-installs)
- `"python"` or `"python3"` - For Python servers
- Path to an executable

**`args`** - Array of command-line arguments passed to the command

**`cwd`** (optional) - Working directory for the server

**`env`** (optional) - Environment variables the server needs

### Example: Multiple Servers

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/Documents"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

## Configuring Your First MCP Server

Let's set up a real server. We'll use the Filesystem server—it's official, well-maintained, and immediately useful.

### Step 1: Open the Configuration File

Use Settings → Developer → "Edit Config" or navigate to the file manually.

### Step 2: Add the Server Configuration

If your file is empty, replace it with:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/your-username/Documents"
      ]
    }
  }
}
```

**Important:** Replace `/Users/your-username/Documents` with an actual path on your system.

**On Windows**, use forward slashes or escaped backslashes:
```json
"C:/Users/YourName/Documents"
```
or
```json
"C:\\Users\\YourName\\Documents"
```

### Step 3: Save and Restart

1. **Save the configuration file**
2. **Completely quit Claude Desktop** (not just close the window):
   - Mac: Claude menu → Quit Claude
   - Windows: Right-click tray icon → Quit
3. **Reopen Claude Desktop**

### Step 4: Verify It's Working

1. Go to Settings → Developer
2. You should see "filesystem" listed with a "running" status
3. In a new chat, try: "What files are in my Documents folder?"
4. Claude should use the filesystem tool and list your files

If it works—congratulations! You've set up MCP.

### What If It Doesn't Work?

Don't panic. Jump to the Troubleshooting section below. The most common issues are path problems and JSON syntax errors.

## Using Desktop Extensions

Claude Desktop now supports extensions—a simplified way to install MCP servers without editing JSON manually.

### Accessing Extensions

1. Open Claude Desktop
2. Go to Settings
3. Click the "Extensions" tab
4. Click "Browse extensions"

### Installing an Extension

1. Browse available extensions
2. Click "Install" on one you want
3. Configure any required settings (like file paths or API keys)
4. The extension activates automatically

### When to Use Extensions vs Manual Config

**Use extensions when:**
- The server you want is available as an extension
- You prefer a GUI over editing config files
- You want automatic updates

**Use manual configuration when:**
- The server isn't available as an extension
- You need custom configuration options
- You're running your own custom server
- You want precise control over paths and settings

Both methods work well. Extensions are just a convenience layer over the same underlying config.

For a list of popular servers to try, see our guide on the [best MCP servers for Claude](/blog/best-mcp-servers-claude).

## Verifying Your Setup

### Check Server Status

Go to Settings → Developer in Claude Desktop. You should see:
- List of configured servers
- Status for each (running, error, stopped)
- Logs button for debugging

### Test the Tools

In a new conversation, try using your server's capabilities:

**For Filesystem:**
- "List files in [your configured path]"
- "Read the contents of [a file in that path]"

**For GitHub (if configured):**
- "What are my recent repositories?"
- "Show issues in [repo name]"

**For Search servers:**
- "Search the web for [query]"

If Claude responds using the tools (you'll see tool-use indicators), your setup is working.

### Quick Verification Command

A simple test for any server:

"What MCP tools do you have available?"

Claude should list the tools from your configured servers.

## Troubleshooting

Things go wrong. Here's how to fix the common issues.

### Finding the Logs

Log files help diagnose problems:

**macOS:**
```
~/Library/Logs/Claude/mcp.log
~/Library/Logs/Claude/mcp-server-[servername].log
```

**Windows:**
```
%APPDATA%\Claude\logs\mcp.log
%APPDATA%\Claude\logs\mcp-server-[servername].log
```

Open these in a text editor to see error messages.

### Common Issues

**1. Server shows "Error" status**

**Cause:** Usually a path problem or missing dependency

**Fix:**
- Check the path in your config—does it exist?
- Make sure Node.js is installed if using npx
- Check the server's log file for specific errors

**2. JSON Syntax Error**

**Cause:** Invalid JSON in config file

**Fix:**
- Validate your JSON at jsonlint.com
- Check for missing commas between server entries
- Ensure all quotes are straight quotes `"`, not curly quotes `"`
- Make sure paths use forward slashes or escaped backslashes

**3. "Command not found"**

**Cause:** The executable (node, npx, python) isn't in PATH

**Fix:**
- Restart your computer after installing Node.js
- Use the full path to the executable
- For Mac: `/usr/local/bin/node` or `/opt/homebrew/bin/node`
- For Windows: `C:\\Program Files\\nodejs\\node.exe`

**4. Server runs but Claude doesn't use it**

**Cause:** Server initialization failed silently, or tools aren't being presented

**Fix:**
- Check mcp.log for errors
- Restart Claude Desktop completely
- Make sure the server name is unique
- Ask Claude "What tools do you have?" to see if it recognizes the server

**5. Permission denied errors**

**Cause:** The configured path isn't accessible

**Fix:**
- Verify you have read access to the path
- On Mac, check System Preferences → Security & Privacy for app permissions
- Try a different directory

### Nuclear Option

If nothing works:

1. Completely quit Claude Desktop
2. Delete the config file (back it up first)
3. Delete the logs folder
4. Restart Claude Desktop
5. Start fresh with the config

## Advanced Configuration

Once you have the basics working, here are advanced options.

### Multiple Servers

You can run many MCP servers simultaneously:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/Documents"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxx"
      }
    },
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your_api_key"
      }
    },
    "custom-server": {
      "command": "python3",
      "args": ["/path/to/your/custom_server.py"],
      "cwd": "/path/to/your"
    }
  }
}
```

### Environment Variables

Servers that need API keys or tokens use the `env` option:

```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["server.js"],
      "env": {
        "API_KEY": "your_secret_key",
        "DEBUG": "true"
      }
    }
  }
}
```

**Security note:** Config files aren't encrypted. Anyone with access to your computer can read these credentials. For sensitive keys, consider using environment variable references or more secure methods.

### Custom Working Directory

If a server needs to run from a specific directory:

```json
{
  "mcpServers": {
    "my-server": {
      "command": "python3",
      "args": ["server.py"],
      "cwd": "/path/to/server/directory"
    }
  }
}
```

### Running Your Own Server

If you've built a custom MCP server (see our [Python MCP server tutorial](/blog/build-mcp-server-python)), add it like this:

```json
{
  "mcpServers": {
    "my-custom-server": {
      "command": "python3",
      "args": ["/absolute/path/to/your/server.py"]
    }
  }
}
```

Always use absolute paths to avoid issues.

## Frequently Asked Questions

### Can I use MCP with Claude on the web?

No, MCP only works with Claude Desktop. The web interface doesn't support local servers.

### Do servers run when Claude Desktop is closed?

No. Servers are started and stopped with Claude Desktop. They don't run as background services.

### How many servers can I run at once?

There's no hard limit, but more servers mean more resource usage. I wouldn't recommend more than 10-15 on typical hardware.

### Can I share my config file with others?

The structure is shareable, but watch out for:
- Paths that are specific to your system
- API keys or tokens (never share these)
- Permissions that might differ between systems

### Is this secure?

MCP servers run on your local machine with your user permissions. They can access whatever you configure them to access. Only run servers from sources you trust, and be thoughtful about what directories you expose.

### What if I want to disable a server temporarily?

Either remove it from the config (save a backup), or you can add a `"disabled": true` flag (check if your Claude version supports this).

## You're All Set

If you've followed this guide, Claude Desktop should now be connected to at least one MCP server. You've learned:

- How to install the prerequisites
- Where to find and edit the configuration file
- How to add and configure MCP servers
- How to verify everything works
- How to troubleshoot common issues

From here, I'd recommend:
1. **Try the Filesystem server first** if you haven't—it's immediately useful
2. **Explore more servers** from our [best MCP servers guide](/blog/best-mcp-servers-claude)
3. **Consider building your own** if you have specific needs

MCP transforms Claude from a capable chatbot into an AI assistant that can actually interact with your files, systems, and tools. That's a significant upgrade, and you now have the knowledge to configure it.

Happy configuring!
