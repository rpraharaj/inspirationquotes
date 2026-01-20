---
title: "Connect Claude to Your Database: MCP Database Tutorial (2026)"
description: "Learn to connect Claude AI to PostgreSQL and SQLite using MCP. Step-by-step tutorial with complete code—query your database using natural language."
pubDate: 2026-01-11
author: "AI Agents Kit"
category: "mcp"
tags: ["mcp", "claude", "database", "postgresql", "sqlite", "tutorial", "anthropic"]
featured: false
readingTime: 20
---

# Connect Claude to Your Database: MCP Database Tutorial (2026)

Imagine asking Claude: "What were our top 10 customers last quarter?" and getting an instant answer—pulled directly from your database. No writing SQL. No switching contexts.

That's exactly what the **Model Context Protocol (MCP)** enables. MCP lets Claude securely connect to your databases, file systems, and APIs through a standardized protocol.

In this tutorial, I'll walk you through connecting Claude to both SQLite and PostgreSQL databases. By the end, you'll be querying your data with natural language.

---

## What is MCP (Model Context Protocol)?

MCP is Anthropic's open standard for connecting AI assistants to external systems. Think of it as a bridge between Claude and the tools it needs to do useful work.

### How MCP Works

```
┌─────────────┐    JSON-RPC    ┌────────────┐    SQL    ┌──────────────┐
│   Claude    │◄──────────────►│ MCP Server │◄─────────►│   Database   │
│  (Client)   │                │  (Bridge)  │           │ (PostgreSQL) │
└─────────────┘                └────────────┘           └──────────────┘
```

**Key components:**

| Component | Role |
|-----------|------|
| **MCP Client** | Claude Desktop or your app |
| **MCP Server** | Middleware that exposes tools |
| **Tools** | Functions Claude can call (e.g., query_database) |
| **Resources** | Data sources Claude can read |

### Why Use MCP for Databases?

- **Natural language queries**: Ask questions without writing SQL
- **Secure access**: Control exactly what Claude can do
- **Standardized**: Works the same way across different databases
- **Local-first**: Your data stays on your machine

To understand how this fits into the larger AI ecosystem, see our guide on [what AI agents are](/blog/what-are-ai-agents).

---

## Prerequisites

Before we start, make sure you have:

- **Claude Desktop** installed (macOS or Windows)
- **Python 3.10+** with pip
- **Node.js 18+** (for some MCP servers)
- A database to connect (we'll create test databases below)

```bash
# Check your versions
python --version  # 3.10 or higher
node --version    # 18 or higher

# Install UV package manager (recommended for MCP)
pip install uv

# Or use npm for Node-based servers
npm install -g @modelcontextprotocol/server-sqlite
```

---

## Part 1: Connecting Claude to SQLite

SQLite is the easiest starting point—no server setup required.

### Step 1: Create a Test Database

First, let's create a sample database:

```python
# create_test_db.py
import sqlite3

# Create database
conn = sqlite3.connect('company.db')
cursor = conn.cursor()

# Create tables
cursor.execute('''
CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    department TEXT,
    salary REAL,
    hire_date DATE
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS departments (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    budget REAL
)
''')

# Insert sample data
employees = [
    ('Alice Johnson', 'Engineering', 95000, '2023-01-15'),
    ('Bob Smith', 'Marketing', 75000, '2022-06-01'),
    ('Carol Williams', 'Engineering', 110000, '2021-03-20'),
    ('David Brown', 'Sales', 85000, '2024-02-10'),
    ('Eve Davis', 'Marketing', 72000, '2023-08-05'),
]

cursor.executemany(
    'INSERT INTO employees (name, department, salary, hire_date) VALUES (?, ?, ?, ?)',
    employees
)

departments = [
    ('Engineering', 500000),
    ('Marketing', 250000),
    ('Sales', 350000),
]

cursor.executemany(
    'INSERT INTO departments (name, budget) VALUES (?, ?)',
    departments
)

conn.commit()
conn.close()
print("Database created: company.db")
```

Run it:
```bash
python create_test_db.py
```

### Step 2: Install the SQLite MCP Server

```bash
# Using npm (recommended)
npm install -g @modelcontextprotocol/server-sqlite

# Or using uvx
uvx install mcp-server-sqlite
```

### Step 3: Configure Claude Desktop

Open Claude Desktop and navigate to:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

Add this configuration:

```json
{
  "mcpServers": {
    "sqlite-company": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-sqlite",
        "--db-path",
        "/path/to/your/company.db"
      ]
    }
  }
}
```

**Important:** Replace `/path/to/your/company.db` with the actual path to your database.

### Step 4: Restart Claude Desktop

Quit and reopen Claude Desktop. You should see a database icon in the chat interface, indicating the MCP server is connected.

### Step 5: Query Your Database

Now try these prompts:

> "List all employees in the Engineering department"

> "What's the average salary by department?"

> "Who was hired in 2023?"

Claude will automatically generate SQL, execute it, and return the results in natural language.

---

## Part 2: Connecting Claude to PostgreSQL

PostgreSQL requires a bit more setup but works the same way.

### Step 1: Ensure PostgreSQL is Running

If you don't have PostgreSQL:

```bash
# macOS with Homebrew
brew install postgresql
brew services start postgresql

# Create a test database
createdb company_db
```

### Step 2: Create Tables and Data

```python
# setup_postgres.py
import psycopg2

conn = psycopg2.connect(
    dbname="company_db",
    user="your_username",  # Usually your system username
    host="localhost"
)
cursor = conn.cursor()

# Create tables
cursor.execute('''
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    price DECIMAL(10, 2),
    stock INTEGER
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER,
    order_date DATE,
    customer_name VARCHAR(100)
)
''')

# Insert sample data
products = [
    ('Laptop Pro', 'Electronics', 1299.99, 50),
    ('Wireless Mouse', 'Electronics', 49.99, 200),
    ('Standing Desk', 'Furniture', 599.99, 30),
    ('Monitor 27"', 'Electronics', 399.99, 75),
    ('Ergonomic Chair', 'Furniture', 449.99, 45),
]

for name, category, price, stock in products:
    cursor.execute(
        'INSERT INTO products (name, category, price, stock) VALUES (%s, %s, %s, %s)',
        (name, category, price, stock)
    )

conn.commit()
conn.close()
print("PostgreSQL database setup complete!")
```

### Step 3: Install PostgreSQL MCP Server

```bash
# Install the PostgreSQL MCP server
pip install mcp-server-postgres

# Or build from source
git clone https://github.com/modelcontextprotocol/servers.git
cd servers/src/postgres
pip install -e .
```

### Step 4: Configure Claude Desktop

Update your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "sqlite-company": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "/path/to/company.db"]
    },
    "postgres-products": {
      "command": "python",
      "args": ["-m", "mcp_server_postgres"],
      "env": {
        "DATABASE_URL": "postgresql://username:password@localhost/company_db"
      }
    }
  }
}
```

Replace the connection string with your actual PostgreSQL credentials.

### Step 5: Test the Connection

Restart Claude Desktop and try:

> "Show me all products under $500"

> "Which products are low in stock (less than 50 units)?"

> "What's the total value of Electronics inventory?"

---

## Part 3: Building a Custom Database MCP Server

Sometimes you need more control. Here's how to build your own MCP server.

### Step 1: Create the Server

```python
# custom_db_server.py
import asyncio
import sqlite3
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Initialize MCP server
server = Server("custom-database-server")

# Database connection
DB_PATH = "company.db"

def get_connection():
    return sqlite3.connect(DB_PATH)

@server.list_tools()
async def list_tools() -> list[types.Tool]:
    """List available database tools."""
    return [
        types.Tool(
            name="query_database",
            description="Execute a SELECT query on the database",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "SQL SELECT query to execute"
                    }
                },
                "required": ["query"]
            }
        ),
        types.Tool(
            name="list_tables",
            description="List all tables in the database",
            inputSchema={
                "type": "object",
                "properties": {}
            }
        ),
        types.Tool(
            name="describe_table",
            description="Get the schema of a specific table",
            inputSchema={
                "type": "object",
                "properties": {
                    "table_name": {
                        "type": "string",
                        "description": "Name of the table to describe"
                    }
                },
                "required": ["table_name"]
            }
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[types.TextContent]:
    """Handle tool calls."""
    conn = get_connection()
    cursor = conn.cursor()
    
    try:
        if name == "query_database":
            query = arguments["query"]
            
            # Security: Only allow SELECT queries
            if not query.strip().upper().startswith("SELECT"):
                return [types.TextContent(
                    type="text",
                    text="Error: Only SELECT queries are allowed."
                )]
            
            cursor.execute(query)
            columns = [desc[0] for desc in cursor.description]
            rows = cursor.fetchall()
            
            # Format results
            result = f"Columns: {', '.join(columns)}\n\n"
            for row in rows:
                result += " | ".join(str(val) for val in row) + "\n"
            
            return [types.TextContent(type="text", text=result)]
        
        elif name == "list_tables":
            cursor.execute(
                "SELECT name FROM sqlite_master WHERE type='table'"
            )
            tables = [row[0] for row in cursor.fetchall()]
            return [types.TextContent(
                type="text", 
                text=f"Tables: {', '.join(tables)}"
            )]
        
        elif name == "describe_table":
            table_name = arguments["table_name"]
            cursor.execute(f"PRAGMA table_info({table_name})")
            columns = cursor.fetchall()
            
            result = f"Schema for {table_name}:\n"
            for col in columns:
                result += f"  - {col[1]} ({col[2]})\n"
            
            return [types.TextContent(type="text", text=result)]
        
        else:
            return [types.TextContent(
                type="text", 
                text=f"Unknown tool: {name}"
            )]
    
    finally:
        conn.close()

async def main():
    async with stdio_server() as (read_stream, write_stream):
        await server.run(read_stream, write_stream)

if __name__ == "__main__":
    asyncio.run(main())
```

### Step 2: Install Dependencies

```bash
pip install mcp
```

### Step 3: Configure Claude Desktop

```json
{
  "mcpServers": {
    "custom-db": {
      "command": "python",
      "args": ["/path/to/custom_db_server.py"]
    }
  }
}
```

### Step 4: Add More Capabilities

You can extend the server with:

```python
@server.list_tools()
async def list_tools() -> list[types.Tool]:
    return [
        # ... existing tools ...
        types.Tool(
            name="get_statistics",
            description="Get summary statistics for a numeric column",
            inputSchema={
                "type": "object",
                "properties": {
                    "table": {"type": "string"},
                    "column": {"type": "string"}
                },
                "required": ["table", "column"]
            }
        ),
        types.Tool(
            name="export_to_csv",
            description="Export query results to a CSV file",
            inputSchema={
                "type": "object", 
                "properties": {
                    "query": {"type": "string"},
                    "filename": {"type": "string"}
                },
                "required": ["query", "filename"]
            }
        )
    ]
```

---

## Security Best Practices

Connecting AI to your database requires careful security considerations.

### 1. Read-Only Access

Create a read-only database user:

```sql
-- PostgreSQL
CREATE USER claude_reader WITH PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE company_db TO claude_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO claude_reader;
```

### 2. Query Validation

Always validate queries in your MCP server:

```python
def validate_query(query: str) -> bool:
    """Only allow safe SELECT queries."""
    query_upper = query.strip().upper()
    
    # Must start with SELECT
    if not query_upper.startswith("SELECT"):
        return False
    
    # Block dangerous keywords
    dangerous = ["INSERT", "UPDATE", "DELETE", "DROP", "ALTER", "CREATE", "TRUNCATE"]
    for keyword in dangerous:
        if keyword in query_upper:
            return False
    
    return True
```

### 3. Rate Limiting

Prevent runaway queries:

```python
from functools import wraps
import time

class RateLimiter:
    def __init__(self, max_calls: int, window_seconds: int):
        self.max_calls = max_calls
        self.window = window_seconds
        self.calls = []
    
    def is_allowed(self) -> bool:
        now = time.time()
        self.calls = [t for t in self.calls if now - t < self.window]
        if len(self.calls) >= self.max_calls:
            return False
        self.calls.append(now)
        return True

rate_limiter = RateLimiter(max_calls=10, window_seconds=60)
```

### 4. Audit Logging

Log all queries for security review:

```python
import logging
from datetime import datetime

logging.basicConfig(filename='mcp_queries.log', level=logging.INFO)

def log_query(query: str, result_count: int):
    logging.info(f"{datetime.now()} | Query: {query} | Results: {result_count}")
```

---

## Real-World Use Cases

### 1. Business Analytics

> "What was our month-over-month revenue growth for 2025?"

Claude generates the SQL, runs it, and explains the trends.

### 2. Customer Support

> "Find all orders for customer John Smith in the last 30 days"

Instant lookup without navigating admin panels.

### 3. Data Exploration

> "What are the most common values in the category column?"

Perfect for understanding new datasets quickly.

### 4. Report Generation

> "Create a summary of sales by region for Q4"

Claude can analyze and format data into readable reports.

For building more sophisticated AI applications with databases, see our [RAG chatbot tutorial](/blog/build-rag-chatbot-tutorial).

---

## Troubleshooting Common Issues

### "MCP server not found"

**Solution:** Check your config path:
```bash
# macOS - view config
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Verify JSON is valid
python -m json.tool ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

### "Connection refused"

**Solution:** Ensure your database is running:
```bash
# PostgreSQL
pg_isready -h localhost

# Check if listening
lsof -i :5432
```

### "Permission denied"

**Solution:** Check database user permissions:
```sql
-- PostgreSQL
\du  -- List users and roles
GRANT SELECT ON ALL TABLES IN SCHEMA public TO your_user;
```

### "Query timed out"

**Solution:** Optimize your queries or add limits:
```python
# Add timeout to cursor
cursor.execute("SET statement_timeout = '30s'")
```

---

## Frequently Asked Questions

### Does my data leave my computer?
No. MCP servers run locally. Your data never goes to Anthropic's servers—only the query results that you see in Claude.

### Can Claude modify my database?
Only if you give it write access. The examples above use read-only access for safety.

### Does this work with other databases?
Yes! MCP servers exist for MySQL, MongoDB, Redis, and more. The pattern is the same.

### How do I debug MCP issues?
Check Claude Desktop's developer tools (View → Developer → Toggle Developer Tools) for server logs.

---

## Conclusion

You've learned how to connect Claude to:

1. **SQLite** using the official MCP server
2. **PostgreSQL** with connection configuration
3. **Custom databases** by building your own MCP server

MCP transforms Claude from a chatbot into a powerful data assistant. Query your databases naturally, explore data without writing SQL, and build custom tools for your specific needs.

**Next steps:**
- Explore the [MCP server directory](https://github.com/modelcontextprotocol/servers)
- Learn about [vector databases](/blog/vector-databases-explained) for AI search
- Check out our [Claude API tutorial](/blog/claude-api-tutorial) for programmatic access

---

*Last updated: January 2026*
