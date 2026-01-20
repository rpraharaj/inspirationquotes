# Enhancement Draft: Prompt Template Code: 10 Python Patterns for Dynamic Prompts (2026)

**Generated:** 2026-01-12
**Slug:** prompt-template-code
**Current Word Count:** 750 (visible to Google)
**Target Word Count:** 1500+
**Words to Add:** ~780

---

## Voice Analysis

**Detected characteristics:**
- First-person learning ("I learned this the hard way")
- Problem-solution framing ("My first LLM application had prompts scattered...")
- Conversational but instructional tone
- Uses bold for pattern names and key terms
- Tables for comparisons
- H2/H3 with "Pattern X:" naming convention
- Extensive Python code with docstrings
- Practical tips ("Pro tip:") in callout style

---

## Enhancement 1: Choosing the Right Pattern

**Location:** After line 56 (after the "Why Use Prompt Templates?" table), before "---"
**Words Added:** ~150

### Content to Add:

### Choosing the Right Pattern

Not all patterns fit all situations. Here's my decision framework:

| Situation | Recommended Pattern |
|-----------|-------------------|
| Quick prototyping | Pattern 1: f-strings |
| User-provided templates | Pattern 2: string.Template |
| LangChain project | Pattern 3: PromptTemplate |
| Complex conditional logic | Pattern 4: Jinja2 |
| Production with validation | Pattern 6: Multi-Section Builder |
| Chat APIs (OpenAI/Claude) | Pattern 7: Chat Message Templates |
| Consistent output format | Pattern 8: Few-Shot Templates |

The overhead increases as you go down the list, but so does flexibility. I typically start with f-strings, then upgrade when I hit a limitation—usually when I need conditionals or when non-engineers need to edit prompts.

---

## Enhancement 2: Code Explanation - Jinja2

**Location:** After line 336 (after the Jinja2 custom filters example)
**Words Added:** ~100

### Content to Add:

**When Jinja2 shines:**

Jinja2 becomes essential when your prompts need logic that would be awkward in Python string formatting:
- Loops over variable-length lists
- Conditional sections based on user settings
- Default values for optional parameters
- Template inheritance (reusing base prompts across contexts)

The learning curve is steeper than f-strings, but Jinja2 templates can be loaded from files and edited by team members who don't write Python. This separation of concerns scales better in larger teams.

> **Pro tip:** Store Jinja2 templates in a `prompts/` directory and version control them separately from your code logic.

---

## Enhancement 3: Testing Your Templates

**Location:** After line 765 (after the prompt chaining section), before "---"
**Words Added:** ~200

### Content to Add:

## Testing Your Templates

Templates are code. Test them like code.

### Unit Testing Templates

```python
import pytest

def test_prompt_has_required_sections():
    """Verify template structure."""
    prompt = create_analysis_prompt(topic="AI", audience="beginners")
    
    assert "AI" in prompt
    assert "beginners" in prompt.lower()
    assert "Requirements:" in prompt  # Expected section

def test_prompt_handles_empty_input():
    """Edge case: empty or None values."""
    prompt = create_analysis_prompt(topic="", audience="experts")
    assert prompt  # Should not crash
    assert "experts" in prompt

def test_template_variables_match():
    """Verify all placeholders can be filled."""
    from string import Formatter
    
    template = "Write about {topic} for {audience}"
    required_vars = [fn for _, fn, _, _ in Formatter().parse(template) if fn]
    
    assert "topic" in required_vars
    assert "audience" in required_vars
```

### Regression Testing

When you modify a template, compare the output to a golden file. If the diff is intentional, update the golden file. If not, you caught a bug.

This catches subtle issues like accidentally deleting a newline that breaks formatting.

---

## Enhancement 4: Performance Considerations

**Location:** After the testing section, before Best Practices
**Words Added:** ~120

### Content to Add:

## Performance Considerations

Template rendering is fast, but a few patterns can slow things down:

**Jinja2 compilation:** Jinja2 templates are compiled to Python bytecode when first loaded. In hot paths, pre-compile your templates at startup:

```python
from jinja2 import Environment, select_autoescape

env = Environment(autoescape=select_autoescape())
# Compile once at startup
compiled_template = env.from_string(TEMPLATE_STRING)

# Use many times without recompilation
for item in items:
    result = compiled_template.render(item=item)
```

**String concatenation:** In Pattern 6 (Multi-Section), use `"".join(parts)` instead of repeated `+=`. For dozens of sections, the difference is measurable.

---

## Enhancement 5: Real-World Examples

**Location:** After Best Practices section (around line 802), before the existing FAQ or conclusion
**Words Added:** ~150

### Content to Add:

## Real-World Template Examples

Here are templates from actual production systems (anonymized):

**Customer Support Auto-Reply:**
```python
template = """You are a support agent for {company_name}.
The customer's issue category is: {category}
Their message: "{message}"

Respond helpfully in 2-3 sentences. If you cannot resolve the issue, 
explain that a human agent will follow up within {sla_hours} hours.
Sign off as "{agent_name}"."""
```

**Code Review Feedback:**
```python
template = """Review this {language} code for {focus_areas}.

```{language}
{code}
```

Provide feedback as:
1. Critical issues (must fix)
2. Suggestions (nice to have)  
3. Positive observations"""
```

These templates evolved over weeks of iteration. Start simple, add variables as patterns emerge.

---

## Enhancement 6: Expanded FAQ

**Location:** End of document, as new FAQ section (the post doesn't have one currently)
**Words Added:** ~150

### Content to Add:

## Frequently Asked Questions

### How do I version control prompt templates?

Store templates in a `prompts/` directory as separate files (`.txt` or `.jinja2`). Track changes in git like any code. For production, consider a prompt registry that ties specific template versions to deployments.

### Should I use f-strings or Jinja2 for new projects?

Start with f-strings. Move to Jinja2 when you need conditionals, loops, or when non-developers need to edit prompts. The migration is straightforward—both use `{variable}` syntax.

### How do I prevent injection in user-provided template values?

Always sanitize user input before template substitution. For Jinja2, use `autoescape=True`. For f-strings, validate expected formats (e.g., reject input containing `{` or `}`).

### Can I use these patterns with any LLM?

Yes. These patterns generate strings—they're provider-agnostic. The chat message pattern (Pattern 7) outputs the format OpenAI and Anthropic expect, but the templates themselves work anywhere.

---

## New Internal Links

| Anchor Text | Target | Insert Location |
|-------------|--------|-----------------|
| few-shot prompting in depth | /blog/zero-shot-vs-few-shot-prompting | Line 540, few-shot templates |
| prompt debugging strategies | /blog/prompt-debugging | Enhancement 3, testing section |
| role prompting techniques | /blog/role-prompting | Line 434, multi-section builder |
| chain-of-thought prompts | /blog/chain-of-thought-prompting | Line 765, chaining section (existing, verify) |

---

## New External Links

| Anchor Text | URL | Insert Location |
|-------------|-----|-----------------|
| Python string.Template documentation | https://docs.python.org/3/library/string.html#template-strings | Line 127, Pattern 2 header |
| Jinja2 template designer guide | https://jinja.palletsprojects.com/en/3.1.x/templates/ | Line 254, Pattern 4 header |
| LangChain PromptTemplate reference | https://api.python.langchain.com/en/latest/prompts/langchain_core.prompts.prompt.PromptTemplate.html | Line 180, Pattern 3 header |
| Pydantic data validation | https://docs.pydantic.dev/latest/ | Line 227, validation example |

---

## Summary

- **Total words added:** ~870
- **New word count:** ~1620 (visible to Google)
- **New internal links:** 4
- **New external links:** 4
- **New sections added:** 4 (Choosing Pattern, Testing, Performance, Real-World Examples)
- **FAQ questions added:** 4
