# Prompt #35: Generate API Documentation

**Category:** Documentation & Learning
**Best AI Tool:** Claude 4 Sonnet (produces clean, structured docs)  
**Difficulty:** Intermediate
**Use Case:** API documentation  

---

## 📋 Prompt Template

```
Act as a technical documentarian for developers.

CONTEXT:
- Routes/Controllers: [paste code]
- Auth: [e.g., Bearer Token]
- Target: OpenAPI Spec or Markdown.

TASK - Build the reference:

Step 1: PARAMETER AUDIT
Define types, optional vs required, and constraints for all inputs.

Step 2: EXAMPLE RESPONSES
Generate mock JSON for Success and Error (400, 401, 500).

OUTPUT FORMAT:

## API Specification
[Standardized Markdown table/section]

## Usage Examples
[Curl / JS Fetch examples]
```

---

## ✅ When to Use This Prompt

- ✅ API documentation  
- ✅ You want to ensure consistency and quality
- ✅ You need a structured output from the AI

## ❌ When NOT to Use

- ❌ You haven't reviewed the strict requirements
- ❌ You need a quick, throwaway answer (this prompt is detailed)

---

## 💡 Pro Tips

- **Context Matters:** Ensure you fill in all the bracketed placeholders like `[language]` or `[code]`.

- **Iterate:** If the first result isn't perfect, refine the **Constraints** section.

---

**Last Updated:** 2026-01-17
