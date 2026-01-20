# Prompt #22: Create REST API Endpoint

**Category:** Code Generation & Scaffolding
**Best AI Tool:** GPT-5
**Difficulty:** Intermediate
**Use Case:** New API endpoints  

---

## 📋 Prompt Template

```
Act as a backend developer.

CONTEXT:
- Framework: [e.g., FastAPI / Express]
- Action: [e.g., Create User]
- Fields: [name: str, email: str, age: int]
- Logic: [Check if email exists, hash password, save to DB]

TASK - Build the endpoint:

Step 1: SCHEMA DEFINITION
Create the input validation schema (Pydantic/Zod).

Step 2: CONTROLLER LOGIC
Write the route handler with error boundaries.

Step 3: DOCS & TYPES
Include OpenAPI/Swagger annotations.

OUTPUT FORMAT:

## Schema
[Validation code]

## Endpoint Controller
[Route implementation]

## Error Handlers
[400/404/500 logic]
```

---

## ✅ When to Use This Prompt

- ✅ New API endpoints  
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
