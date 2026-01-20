# Prompt #26: Database Schema Generation

**Category:** Code Generation & Scaffolding
**Best AI Tool:** Claude 4 Sonnet
**Difficulty:** Intermediate
**Use Case:** New database design  

---

## 📋 Prompt Template

```
Act as a Database Administrator (DBA).

CONTEXT:
- Entities: [User, Order, Product]
- Relations: [One-to-many, Many-to-many]
- Scale: [e.g., 50 million records/year]
- Database: [PostgreSQL / MongoDB]

TASK - Design the schema:

Step 1: NORMALIZATION
Ensure 3rd Normal Form (3NF) or justify denormalization for read speed.

Step 2: INDEXING STRATEGY
Recommend B-Tree index on foreign keys and Gin index on JSONB.

OUTPUT FORMAT:

## SQL Schema
[DDL commands]

## ERD Description
[Text-based table relations]

## Performance Notes
[Indexing and partitioning plan]
```

---

## ✅ When to Use This Prompt

- ✅ New database design  
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
