# 🔗 MCP Integration Guide

**Claude's Model Context Protocol (MCP)** transforms agents from conversation partners into fully integrated system actors. This guide shows you exactly how to set up and use MCP with your agents.

## What is MCP?

MCP lets Claude agents:
- ✅ Read and write files in your project
- ✅ Query databases directly
- ✅ Make API calls to external services
- ✅ Browse the web for real-time research
- ✅ Create PRs and manage repositories
- ✅ Access CRM data, Slack channels, and more

**Instead of just talking about code, agents can actually work with your code.**

## Quick Start

### 1. Basic MCP Setup (claude_desktop_config.json)

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/your/project"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
    }
  }
}
```

###2. Verify Installation

In Claude, ask:
```
What MCP servers do you have access to?
```

Expected response should list: `filesystem`, `github`, `postgres`

## 7 Production-Ready MCP + Agent Patterns

### Pattern 1: Full-Stack Development with Code Analysis

**Setup:**
- **Agents:** Frontend Developer + Backend Architect
- **MCP Servers:** Filesystem, GitHub
- **Goal:** Implement a new feature with proper architecture

**Workflow:**

```markdown
Step 1: Load Frontend Developer agent
"Using the filesystem MCP, analyze our React components in /src/components 
and identify reusable patterns for the new dashboard feature."

Step 2: Load Backend Architect agent
"Review the API routes in /src/api using filesystem MCP. Design a new 
endpoint for dashboard data that follows our existing patterns."

Step 3: Implementation
"Create the new API endpoint as an artifact, then write it to 
/src/api/dashboard.ts using filesystem MCP. Generate the frontend 
component and write to /src/components/Dashboard.tsx."

Step 4: Code Review
"Using GitHub MCP, create a PR for these changes with a descriptive 
title and checklist in the description."
```

**Result:** Complete feature implementation with automated PR creation.  
**Time Savings:** 2-3 hours per feature

---

### Pattern 2: Data-Driven Product Decisions

**Setup:**
- **Agents:** Analytics Reporter + Feedback Synthesizer + Sprint Prioritizer
- **MCP Servers:** Postgres (analytics DB), Filesystem (support tickets)
- **Goal:** Prioritize features based on data

**Workflow:**

```markdown
Step 1: Analytics Reporter with Database MCP
"Query the analytics database for user engagement metrics:
- Feature usage by segment (past 30 days)
- Drop-off points in key flows
- Most-used vs. least-used features
Export findings as CSV to /data/analytics-report.csv"

Step 2: Feedback Synthesizer with Filesystem MCP
"Read support tickets from /data/support-tickets/*.json and:
1. Categorize by feature area
2. Identify top 10 pain points
3. Calculate frequency and severity
Output to /data/feedback-synthesis.md"

Step 3: Sprint Prioritizer
"Using data from analytics-report.csv and feedback-synthesis.md, 
apply RICE scoring to these feature candidates:
[paste feature list]
Create prioritized backlog as artifact."
```

**Result:** Data-driven prioritization in 30 minutes vs. 2-day analysis cycle.  
**Time Savings:** 90%+

---

### Pattern 3: Real-Time Competitive Intelligence

**Setup:**
- **Agent:** Trend Researcher
- **MCP Servers:** Browser (web access), Filesystem (storage)
- **Goal:** Monitor competitor product changes

**Workflow:**

```markdown
Step 1: Web Research
"Using browser MCP, visit these competitor product pages:
- competitor1.com/features
- competitor2.com/pricing
- competitor3.com/blog

Extract their feature lists, pricing tiers, and recent announcements."

Step 2: Analysis & Storage
"Compare findings to our feature set in /docs/our-features.md.
Identify:
1. Features they have that we don't
2. Pricing strategies different from ours
3. Recent product direction changes

Save analysis to /research/competitor-analysis-2026-01.md"

Step 3: Strategic Insights
"Generate a 1-page executive summary with:
- Key competitive gaps
- Opportunities we're missing
- Recommended responses
Export as artifact."
```

**Result:** Weekly competitive intelligence automation.  
**Time Savings:** 5 hours → 30 minutes (83%)

---

### Pattern 4: Automated Customer Support with Context

**Setup:**
- **Agent:** Support Responder
- **MCP Servers:** Database (customer DB), Filesystem (help docs)
- **Goal:** Provide contextual support responses

**Workflow:**

```markdown
Step 1: Customer Context
"Using database MCP, query customer_id: 12345's:
- Subscription tier
- Account age
- Recent support tickets
- Product usage patterns"

Step 2: Knowledge Base Search
"Search /docs/help-articles/ using filesystem MCP for articles about 
[customer's issue: login problems]"

Step 3: Draft Response
"Draft a support response that:
1. Acknowledges their Premium status
2. References their previous ticket from last week
3. Provides solution steps from help article #234
4. Offers proactive upgrade tip based on usage pattern
Tone: Empathetic, professional"
```

**Result:** Support response time: 10 minutes → 2 minutes with better personalization.  
**Time Savings:** 80%

---

### Pattern 5: Automated DevOps Workflows

**Setup:**
- **Agents:** DevOps Automator + Performance Benchmarker
- **MCP Servers:** GitHub, Filesystem
- **Goal:** Automated PR reviews and deployment validation

**Workflow:**

```markdown
Step 1: PR Review
"Using GitHub MCP, fetch PR #456. Analyze:
1. Code changes for security issues
2. Test coverage impact
3. Performance implications
4. Breaking change risk

Comment on PR with findings and approval/request changes."

Step 2: Pre-Deployment Check
"Before deployment, using filesystem MCP:
1. Read /k6-scripts/load-test.js
2. Verify test coverage in /coverage/coverage-summary.json
3. Check for database migrations in /migrations/

Generate deployment checklist as artifact."

Step 3: Post-Deployment
"After deployment, query metrics endpoint and compare to baseline:
- Response time p95
- Error rate
- Throughput

If degradation > 10%, draft rollback PR using GitHub MCP."
```

**Result:** Deployment safety improved, manual review time reduced 60%.

---

### Pattern 6: Content Creation with Research

**Setup:**
- **Agents:** Content Creator + Trend Researcher
- **MCP Servers:** Browser (research), Filesystem (content storage)
- **Goal:** Write SEO-optimized blog posts with current data

**Workflow:**

```markdown
Step 1: Research Phase
"Using browser MCP, research the topic 'Claude 4.5 features':
1. Visit docs.anthropic.com for official features
2. Check Hacker News and Reddit for community reactions
3. Review 3 competitor blog posts on the topic

Compile key findings and unique angles."

Step 2: Outline Creation
"Create blog post outline:
- Target keyword: 'Claude 4.5 new features'
- Word count: 2000
- Include data from research
- Identify content gaps competitors missed

Output outline to /blog-outlines/claude-4-5-features.md"

Step 3: Draft Writing
"Write complete blog post following outline. Include:
- All researched facts with sources
- Unique insights not in competitor posts
- Code examples as artifacts
- SEO-optimized meta description

Save draft to /blog-drafts/claude-4-5-features.md"
```

**Result:** Research + draft time: 6 hours → 2 hours with better data accuracy.  
**Time Savings:** 67%

---

### Pattern 7: Continuous Code Quality Improvement

**Setup:**
- **Agents:** Frontend Developer + Backend Architect + Test Results Analyzer
- **MCP Servers:** Filesystem, GitHub
- **Goal:** Identify and fix code quality issues systematically

**Workflow:**

```markdown
Step 1: Codebase Analysis (Weekly)
"Using filesystem MCP, analyze our codebase:
- Files > 300 lines (complexity risk)
- Functions with high cyclomatic complexity
- Duplicate code patterns
- Missing tests (compare /src vs /tests)

Generate report: /reports/code-quality-week-03.md"

Step 2: Prioritization
"From the quality report, prioritize top 5 refactoring opportunities by:
- Bug risk (high complexity)
- Developer velocity impact (duplicates)
- Test coverage gaps (critical paths)

Create GitHub issues using GitHub MCP with proper labels."

Step 3: Automated Improvements
"For priority #1 (duplicate auth logic):
1. Read all files with the pattern
2. Design a shared utility module
3. Generate refactored code as artifacts
4. Create PR via GitHub MCP with before/after comparison"
```

**Result:** Proactive code quality improvement, technical debt visible and trackable.  
**Time Savings:** Technical debt discovery: manual → automated

---

## Best MCP + Agent Combinations (Reference)

| Agent | Primary MCP Servers | Use Case | Time Savings |
|-------|---------------------|----------|--------------|
| **Backend Architect** | Database, Filesystem | Schema analysis, optimization | 70% |
| **Frontend Developer** | Filesystem, GitHub | Component development, PR review | 60% |
| **DevOps Automator** | GitHub, Filesystem | CI/CD automation | 65% |
| **Analytics Reporter** | Database (read-only) | Dashboard generation | 80% |
| **AI Engineer** | Filesystem, Database | RAG system building | 75% |
| **Support Responder** | Database (CRM), Filesystem | Contextual responses | 50% |
| **Trend Researcher** | Browser | Market research | 70% |
| **Content Creator** | Browser, Filesystem | Content production | 60% |
| **Test Results Analyzer** | Filesystem, GitHub | Quality tracking | 55% |
| **Legal Compliance** | Filesystem | Document review | 40% |

## Advanced MCP Configuration

### Multi-Environment Setup

```json
{
  "mcpServers": {
    "dev-db": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", 
               "postgresql://localhost/dev_db"]
    },
    "staging-db": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", 
               "postgresql://staging.example.com/db"]
    },
    "production-db-readonly": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", 
               "postgresql://prod-replica.example.com/db?sslmode=require"]
    }
  }
}
```

### Security Best Practices

✅ **DO:**
- Use read-only database credentials for production
- Restrict filesystem MCP to specific directories
- Store API tokens in environment variables
- Use separate GitHub tokens with minimal permissions
- Regularly rotate MCP server credentials

❌ **DON'T:**
- Give write access to production databases
- Allow filesystem access to entire system
- Hardcode tokens in config files
- Use admin-level API credentials
- Share MCP configs with tokens

### Performance Optimization

1. **Limit filesystem access** to relevant directories only
2. **Use database connection pooling** for MCP servers
3. **Cache frequently accessed data** when possible
4. **Monitor MCP server logs** for performance issues
5. **Set query limits** to prevent runaway database queries

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MCP server not recognized | Verify `npx` is in PATH; restart Claude after config changes |
| Permission denied errors | Check file/directory permissions; use absolute paths |
| Database connection fails | Test connection string separately; verify network access |
| Slow agent responses | Reduce filesystem scope; use database query limits |
| Token/auth errors | Regenerate API tokens; check environment variable syntax |
| "Command not found" | Ensure Node.js and npm are installed; try `npm install -g` |

## Popular MCP Servers

| Server | Purpose | Installation |
|--------|---------|--------------|
| **Filesystem** | File operations | Built-in |
| **GitHub** | Repository operations | `@modelcontextprotocol/server-github` |
| **Postgres** | Database queries | `@modelcontextprotocol/server-postgres` |
| **Browser** | Web browsing | Coming soon |
| **Slack** | Team communication | `@modelcontextprotocol/server-slack` |
| **Memory** | Long-term context | `@modelcontextprotocol/server-memory` |

**Find more:** [Anthropic MCP Documentation](https://docs.anthropic.com/claude/docs/model-context-protocol)

## Next Steps

1. **Start simple** — Set up filesystem MCP first
2. **Test with one agent** — Try Pattern 1 (Full-Stack Development)
3. **Monitor usage** — Watch API costs and time savings
4. **Scale gradually** — Add more MCP servers as needed
5. **Customize workflows** — Adapt patterns to your specific needs

---

**Back to:** [Main README](./README.md) | [Agent Selection Guide](./AGENT-SELECTION-GUIDE.md) | [Model Selection Guide](./MODEL-SELECTION-GUIDE.md)
