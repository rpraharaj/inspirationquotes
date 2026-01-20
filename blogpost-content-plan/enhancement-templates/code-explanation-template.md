# Enhancement Template: Code Explanation

Use this template to add explanatory prose before and after code blocks.

---

## Before Code Block

### Template A: Technical Context

```markdown
The following {language} code implements {what_it_does}. This pattern works well when {use_case}, and I've found it particularly useful for {personal_experience_note}.
```

### Template B: Problem-Solution

```markdown
{Problem statement in 1 sentence}. The solution involves {approach}:
```

### Template C: Quick Reference

```markdown
Here's how to {action}:
```

---

## After Code Block

### Template A: Key Points Callout

```markdown
**Key points:**
- {Specific detail about implementation}
- {Important parameter or configuration}
- {Performance or security consideration}
```

### Template B: Common Error Warning

```markdown
> ⚠️ **Common issue:** {Error description}. This happens when {cause}. Fix it by {solution}.
```

### Template C: Related Pattern Link

```markdown
For {related capability}, see the [{related pattern name}](/blog/{slug}).
```

---

## Complete Example

**Before:**
```markdown
Rate limiting prevents your application from overwhelming the API. The exponential backoff pattern below increases wait time after each retry, reducing server load while ensuring eventual success:
```

**Code block goes here**

**After:**
```markdown
**Key points:**
- Start with a 1-second delay and double after each retry
- Cap the maximum delay at 60 seconds to avoid excessive waits
- Log retry attempts for debugging and monitoring

> ⚠️ **Common issue:** Hitting rate limits frequently? Check if you're making parallel requests. Use a semaphore to limit concurrent API calls.

For handling other API errors, see the [error handling patterns](/blog/ai-error-handling-snippets).
```

---

## Word Count Guidelines

| Position | Target Words | Purpose |
|----------|--------------|---------|
| Before code | 15-40 words | Set context and purpose |
| After code | 30-80 words | Explain key points, pitfalls |

**Combined per code block: 50-120 additional words**
