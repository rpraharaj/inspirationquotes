# Prompt #21: Generate CRUD Operations

**Category:** Code Generation & Scaffolding
**Best AI Tool:** Claude 4 Sonnet (structured, clean code)  
**Difficulty:** Intermediate
**Use Case:** API endpoints for new resources  

---

## 📋 Prompt Template

```
You are a backend architect specializing in [framework].

RESOURCE SPECIFICATION:
- Resource name: [e.g., "blog post"]
- Fields:
  - [field1]: [type] - [validation] - [e.g., "title: string, required, 3-200 chars"]
  - [field2]: [type] - [validation]
- Framework: [e.g., "Express.js 4.18 with Mongoose 7.x"]
- Database: [e.g., "MongoDB"]
- Validation: [e.g., "Joi"]
- Auth: [e.g., "JWT - verify user owns resource for updates/deletes"]

REQUIREMENTS:

CREATE (POST /api/[resources])
- Validate required fields
- Return 201 with created resource
- Handle duplicates (409)

READ LIST (GET /api/[resources])
- Pagination: page (default: 1), limit (default: 20, max: 100)
- Sorting: sort param (e.g., "-createdAt" for desc)
- Return format: { data: [], meta: { total, page, pages } }

READ SINGLE (GET /api/[resources]/:id)
- Return 404 if not found

UPDATE (PUT /api/[resources]/:id)
- Partial updates allowed
- Check authorization
- Return 200 with updated resource

DELETE (DELETE /api/[resources]/:id)
- Soft delete with deletedAt timestamp
- Check authorization
- Return 204

ERROR HANDLING:
- 400: Validation errors (field-specific messages)
- 401: Unauthorized
- 403: Forbidden
- 404: Not found
- 409: Duplicate/conflict
- 500: Server errors (log but return generic message)

OUTPUT FORMAT:

## File 1: routes/[resource].routes.js
[Complete route definitions with middleware]

## File 2: controllers/[resource].controller.js
[All CRUD functions with try-catch, validation, auth checks, proper status codes]

## File 3: models/[resource].model.js
[Schema with field definitions, validation, indexes, timestamps, soft delete]

## File 4: validators/[resource].validator.js
[Joi validation schemas for create and update]

## Usage Examples
[Curl examples for each operation]
```

---

## ✅ When to Use This Prompt

- ✅ API endpoints for new resources  
- ✅ You want to ensure consistency and quality
- ✅ You need a structured output from the AI

## ❌ When NOT to Use

- ❌ You haven't reviewed the strict requirements
- ❌ You need a quick, throwaway answer (this prompt is detailed)

---

## 💡 Pro Tips

- **Context Matters:** Ensure you fill in all the bracketed placeholders like `[language]` or `[code]`.
- **Expert Note:** Generated code handles 70-80% - you'll add business logic and edge cases
- **Iterate:** If the first result isn't perfect, refine the **Constraints** section.

---

**Last Updated:** 2026-01-17
