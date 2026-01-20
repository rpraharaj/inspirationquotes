# Enhancement Template: Troubleshooting Section

Use this template to add a troubleshooting section to code-heavy posts.

---

## Section Header

Use H2 for main troubleshooting section:
```markdown
## Troubleshooting Common Issues
```

Or H3 if it's a subsection:
```markdown
### Common Errors and Fixes
```

---

## Issue Template

```markdown
### {Error Name or Symptom}

**What you see:**
```
{Error message or unexpected behavior}
```

**Why it happens:** {Technical explanation of the cause}

**How to fix it:**
1. {Step 1}
2. {Step 2}
3. {Verification step}

{Optional: Link to related documentation or guide}
```

---

## Complete Example

```markdown
## Troubleshooting Common Issues

### API Key Not Found Error

**What you see:**
```
AuthenticationError: API key not found. Set OPENAI_API_KEY environment variable.
```

**Why it happens:** The SDK looks for the API key in environment variables by default. This error occurs when the variable isn't set or is misspelled.

**How to fix it:**
1. Verify the variable name is exactly `OPENAI_API_KEY` (no typos)
2. Set it in your terminal: `export OPENAI_API_KEY="sk-..."`
3. For persistent setup, add it to your `.env` file
4. Restart your application to load the new environment

For secure API key management, see our [production deployment guide](/blog/production-ai-guide).

### Rate Limit Exceeded

**What you see:**
```
RateLimitError: Rate limit reached for gpt-4 in organization org-... 
```

**Why it happens:** You've exceeded the requests-per-minute or tokens-per-minute limit for your API tier.

**How to fix it:**
1. Implement exponential backoff (see code pattern above)
2. Add request queuing for high-volume applications
3. Consider upgrading your API tier for higher limits
4. Cache responses for repeated similar queries
```

---

## Word Count Guidelines

| Component | Target Words |
|-----------|--------------|
| Section intro | 10-20 words |
| Per issue | 80-120 words |
| Total section (3-4 issues) | 250-450 words |

---

## Common Issues to Cover

Select 3-4 most relevant to the post topic:

**API-Related Posts:**
- Authentication errors
- Rate limiting
- Timeout errors
- Invalid model errors
- Context length exceeded

**Code Integration Posts:**
- Import/dependency errors
- Version compatibility
- Environment setup
- Configuration issues

**AI/LLM Posts:**
- Unexpected output format
- Hallucination/accuracy issues
- Token counting problems
- Prompt injection concerns
