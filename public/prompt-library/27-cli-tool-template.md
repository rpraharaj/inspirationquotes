# Prompt #27: CLI Tool Template

**Category:** Code Generation & Scaffolding
**Best AI Tool:** GPT-5
**Difficulty:** Intermediate
**Use Case:** Developer tooling  

---

## 📋 Prompt Template

```
Act as a developer tools engineer.

CONTEXT:
- Language: [e.g., Go / Node.js]
- Commands: [e.g., init, deploy, status]
- Options: [--verbose, --env]

TASK - Build the CLI structure:

Step 1: ARGUMENT PARSING
Implement the command/flag structure using standard libs (Cobra/Commander).

Step 2: UX & FEEDBACK
Add progress bars, spinner, and colored logs.

OUTPUT FORMAT:

## CLI Main Entry
[Core parser code]

## Command Logic
[Example command handler]

## Help Text
[Generated help output]
```

---

## ✅ When to Use This Prompt

- ✅ Developer tooling  
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
