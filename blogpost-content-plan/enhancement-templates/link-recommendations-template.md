# Enhancement Template: Link Recommendations

Use this template to add contextual internal and external links to blog posts.

---

## Internal Link Guidelines

### Anchor Text Rules

**DO:**
```markdown
For more on this pattern, see the [prompt engineering guide](/blog/prompt-engineering-beginners-guide).
```

**DON'T:**
```markdown
For more, click [here](/blog/prompt-engineering-beginners-guide).
Read more [in this article](/blog/prompt-engineering-beginners-guide).
```

### Placement Options

**Option A: Inline within existing paragraph**
```markdown
The way you configure [system prompts](/blog/system-prompts-explained) 
significantly affects the model's output consistency.
```

**Option B: End of section**
```markdown
For a deeper dive into these patterns, explore our 
[LangChain agents tutorial](/blog/langchain-agents-tutorial).
```

**Option C: "Related" callout**
```markdown
> 📚 **Related:** [Vector Databases Explained](/blog/vector-databases-explained) | 
> [Embeddings Guide](/blog/embeddings-explained)
```

---

## External Link Guidelines

### Quality Criteria

| ✅ Link To | ❌ Avoid |
|------------|----------|
| Official documentation (.io, .dev) | Competitor blog posts |
| GitHub repositories | Medium articles |
| Academic papers | Affiliate/marketing content |
| Primary announcements | Outdated resources |
| Standards organizations | Personal blogs (usually) |

### Anchor Text for External Links

```markdown
According to [OpenAI's documentation](https://platform.openai.com/docs/...), 
the recommended approach is...

The official [Anthropic API reference](https://docs.anthropic.com/...) 
provides detailed specifications.

This pattern follows recommendations from the 
[LangChain team](https://python.langchain.com/docs/...).
```

### Placement for External Links

**Option A: Supporting a claim**
```markdown
Token limits vary by model—GPT-4-turbo supports up to 128K tokens 
([source](https://platform.openai.com/docs/models)).
```

**Option B: Official reference**
```markdown
For complete API parameters, see the 
[official reference](https://docs.anthropic.com/en/api/messages).
```

**Option C: Further reading**
```markdown
The [OWASP LLM Security Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) 
covers additional security considerations.
```

---

## Link Density Guidelines

| Post Length | Internal Links | External Links |
|-------------|----------------|----------------|
| < 1000 words | 2-4 | 1-2 |
| 1000-2000 words | 4-6 | 2-4 |
| 2000-3000 words | 6-8 | 3-5 |
| > 3000 words | 8-10 | 4-6 |

---

## Common Link Targets by Topic

### MCP Posts
**Internal:**
- `/blog/what-is-mcp`
- `/blog/mcp-database-tutorial`
- `/blog/mcp-enterprise-security`
- `/blog/claude-api-tutorial`

**External:**
- https://modelcontextprotocol.io/docs
- https://docs.anthropic.com/
- https://github.com/anthropics/mcp-servers

### LangChain Posts
**Internal:**
- `/blog/langchain-agents-tutorial`
- `/blog/build-rag-chatbot-tutorial`
- `/blog/vector-databases-explained`
- `/blog/embeddings-explained`

**External:**
- https://python.langchain.com/docs/
- https://github.com/langchain-ai/langchain
- https://www.langchain.com/langsmith

### OpenAI API Posts
**Internal:**
- `/blog/openai-api-tutorial`
- `/blog/gpt-models-comparison`
- `/blog/function-calling-guide`
- `/blog/ai-error-handling-snippets`

**External:**
- https://platform.openai.com/docs/
- https://cookbook.openai.com/
- https://openai.com/pricing

### Claude/Anthropic Posts
**Internal:**
- `/blog/claude-api-tutorial`
- `/blog/claude-vs-gpt`
- `/blog/system-prompts-explained`
- `/blog/what-is-mcp`

**External:**
- https://docs.anthropic.com/
- https://www.anthropic.com/claude
- https://github.com/anthropics/anthropic-cookbook

### RAG Posts
**Internal:**
- `/blog/build-rag-chatbot-tutorial`
- `/blog/vector-databases-explained`
- `/blog/embeddings-explained`
- `/blog/langchain-code-snippets`

**External:**
- https://www.pinecone.io/learn/
- https://weaviate.io/developers/weaviate
- https://docs.trychroma.com/

### Prompt Engineering Posts
**Internal:**
- `/blog/prompt-engineering-beginners-guide`
- `/blog/chain-of-thought-prompting`
- `/blog/system-prompts-explained`
- `/blog/zero-shot-vs-few-shot-prompting`

**External:**
- https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering
- https://platform.openai.com/docs/guides/prompt-engineering
- https://learnprompting.org/

---

## Link Verification Checklist

Before adding links:
- [ ] Internal links point to existing posts (check slug exists)
- [ ] External links are still active (not 404)
- [ ] External links point to current documentation (not deprecated)
- [ ] Anchor text describes the destination accurately
- [ ] Links are distributed throughout the content (not clustered)
