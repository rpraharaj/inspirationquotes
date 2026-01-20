---
heroImage: "/images/featured/prompt-template-code.webp"
title: "Prompt Template Code: 10 Python Patterns for Dynamic Prompts (2026)"
description: "Master 10 prompt template patterns in Python. From f-strings to Jinja2—create dynamic, reusable prompts for any LLM with copy-paste code snippets."
pubDate: 2025-11-10
author: "AI Agents Kit"
category: "code-snippets"
tags: ["prompt engineering", "python", "code patterns", "llm", "templates", "langchain"]
featured: false
readingTime: 23
---

# Prompt Template Code: 10 Python Patterns for Dynamic Prompts (2026)

Hardcoding prompts is fine for experiments. But the moment you need different versions for different users, contexts, or tasks—suddenly you're copying and pasting strings everywhere.

I learned this the hard way. My first LLM application had prompts scattered across 15 files with slight variations. Updating them was a nightmare.

The solution? **Prompt templates**—reusable structures that separate your prompt logic from your data.

In this guide, I'll share 10 Python patterns for building dynamic prompts. Each pattern includes complete, copy-paste code that works with any LLM—whether you're using OpenAI, Anthropic, or local models.

---

## What Are Prompt Templates?

A prompt template is a string with placeholders that get filled in at runtime. Instead of hardcoding values, you inject them dynamically.

**Without templates:**
```python
# Hardcoded - hard to maintain
prompt = "Write a blog post about artificial intelligence for beginners."
```

**With templates:**
```python
# Dynamic - reusable and flexible
template = "Write a {content_type} about {topic} for {audience}."
prompt = template.format(
    content_type="blog post",
    topic="artificial intelligence", 
    audience="beginners"
)
```

### Why Use Prompt Templates?

| Benefit | Description |
|---------|-------------|
| **Reusability** | One template, many use cases |
| **Maintainability** | Update logic in one place |
| **Testability** | Test templates separately from data |
| **Versioning** | Track template changes over time |
| **Collaboration** | Non-coders can modify prompt text |

Let's dive into the patterns. For prompt engineering fundamentals, see our [prompt engineering guide](/blog/prompt-engineering-beginners-guide).

### Choosing the Right Pattern

Not all patterns fit all situations. Here's my decision framework:

| Situation | Recommended Pattern |
|-----------|-------------------|
| Quick prototyping | Pattern 1: f-strings |
| User-provided templates | Pattern 2: <a href="https://docs.python.org/3/library/string.html#template-strings" target="_blank" rel="noopener">string.Template</a> |
| LangChain project | Pattern 3: PromptTemplate |
| Complex conditional logic | Pattern 4: <a href="https://jinja.palletsprojects.com/en/3.1.x/templates/" target="_blank" rel="noopener">Jinja2</a> |
| Production with validation | Pattern 6: Multi-Section Builder |
| Chat APIs (OpenAI/Claude) | Pattern 7: Chat Message Templates |
| Consistent output format | Pattern 8: [Few-Shot Templates](/blog/zero-shot-vs-few-shot-prompting) |

The overhead increases as you go down the list, but so does flexibility. I typically start with f-strings, then upgrade when I hit a limitation—usually when I need conditionals or when non-engineers need to edit prompts.

---

## Pattern 1: Basic f-String Templates

**What it does:** The simplest approach using Python's built-in f-strings.

**Best for:** Quick scripts, small projects, when you have direct control over variables.

f-strings (formatted string literals) were introduced in Python 3.6 and quickly became the preferred way to build strings dynamically. For prompt templates, they offer zero learning curve and immediate productivity.

**The advantages:**
- **Native Python:** No external dependencies, no new syntax to learn
- **IDE support:** Full autocomplete and type checking on variables
- **Immediate evaluation:** Easy to debug by printing intermediate templates
- **Expression support:** You can include any Python expression inside `{}`

**The limitations:**
- **No loops or conditionals:** You can't iterate over lists or conditionally include sections within the template itself
- **Security with user input:** f-strings evaluate expressions, which can be dangerous with untrusted input
- **Multiline complexity:** Large templates become harder to read and maintain

**When to upgrade:** If you find yourself building templates with `if` statements around string concatenation, or managing dozens of template variants, move to Pattern 4 (Jinja2) or Pattern 6 (Multi-Section). These patterns handle complexity that f-strings can't express elegantly.

```python
def create_prompt(topic: str, style: str = "informative", length: str = "medium") -> str:
    """Create a simple prompt using f-string formatting."""
    return f"""You are a helpful writing assistant.

Write a {length} {style} article about {topic}.

Requirements:
- Use clear, accessible language
- Include practical examples
- Structure with headers and bullet points

Begin your article now:"""

# Usage
prompt = create_prompt(
    topic="machine learning basics",
    style="beginner-friendly",
    length="comprehensive"
)
print(prompt)
```

**Pro tip:** Wrap f-string templates in functions to make them reusable and to provide default values.

### With Validation

```python
from typing import Literal

def create_prompt_validated(
    topic: str,
    style: Literal["formal", "casual", "technical"] = "casual",
    word_count: int = 500
) -> str:
    """Template with type hints and validation."""
    if word_count < 100 or word_count > 5000:
        raise ValueError("word_count must be between 100 and 5000")
    
    style_instructions = {
        "formal": "Use professional language and avoid contractions.",
        "casual": "Write conversationally, as if explaining to a friend.",
        "technical": "Include technical details and precise terminology."
    }
    
    return f"""Write about {topic}.

Style: {style_instructions[style]}
Target length: approximately {word_count} words.

Start writing:"""
```

---

## Pattern 2: Python string.Template

**What it does:** Uses Python's built-in `string.Template` for safe substitution.

**Best for:** When templates come from untrusted sources (user input, files).

```python
from string import Template

# Define template with $variable syntax
ANALYSIS_TEMPLATE = Template("""
Analyze the following ${content_type}:

"${content}"

Provide:
1. A brief summary (2-3 sentences)
2. Key insights (3-5 bullet points)
3. Recommended actions

Focus on: ${focus_area}
""")

def analyze_content(content: str, content_type: str = "text", focus_area: str = "main themes"):
    """Safe template substitution that handles missing keys gracefully."""
    return ANALYSIS_TEMPLATE.safe_substitute(
        content=content,
        content_type=content_type,
        focus_area=focus_area
    )

# Usage
prompt = analyze_content(
    content="Our Q4 sales dropped 15% despite increased marketing spend...",
    content_type="business report",
    focus_area="areas for improvement"
)
```

### safe_substitute vs substitute

```python
template = Template("Hello, $name! Welcome to $company.")

# substitute() raises KeyError if variable is missing
try:
    template.substitute(name="Alice")  # KeyError: 'company'
except KeyError as e:
    print(f"Missing: {e}")

# safe_substitute() leaves missing variables unchanged
result = template.safe_substitute(name="Alice")
print(result)  # "Hello, Alice! Welcome to $company."
```

---

## Pattern 3: LangChain PromptTemplate

**What it does:** LangChain's structured template system with validation and metadata.

**Best for:** LangChain projects, production applications, when you need robust template management.

```python
from langchain.prompts import PromptTemplate

# Define template with input variables
code_review_template = PromptTemplate(
    input_variables=["language", "code", "focus"],
    template="""You are an expert {language} developer performing a code review.

Review this code:
```{language}
{code}
```

Focus your review on: {focus}

Provide:
1. Issues found (if any)
2. Suggestions for improvement
3. Positive observations
4. Overall assessment (1-10)

Be constructive and specific in your feedback."""
)

# Format the template
prompt = code_review_template.format(
    language="python",
    code="def add(a, b): return a + b",
    focus="best practices and type hints"
)
```

### With Validation

```python
from langchain.prompts import PromptTemplate
from pydantic import BaseModel, validator

class CodeReviewInput(BaseModel):
    language: str
    code: str
    focus: str = "general quality"
    
    @validator('code')
    def code_not_empty(cls, v):
        if not v.strip():
            raise ValueError('Code cannot be empty')
        return v
    
    @validator('language')
    def valid_language(cls, v):
        valid_languages = ['python', 'javascript', 'typescript', 'java', 'go']
        if v.lower() not in valid_languages:
            raise ValueError(f'Language must be one of: {valid_languages}')
        return v.lower()

def review_code(input_data: CodeReviewInput) -> str:
    template = PromptTemplate(
        input_variables=["language", "code", "focus"],
        template="Review this {language} code:\n```\n{code}\n```\nFocus: {focus}"
    )
    return template.format(**input_data.dict())
```

For more LangChain patterns, see our [LangChain tutorial](/blog/langchain-agents-tutorial).

---

## Pattern 4: Jinja2 Templates

**What it does:** Full-featured templating with loops, conditionals, and macros.

**Best for:** Complex prompts, template inheritance, team collaboration.

```python
from jinja2 import Template, Environment, BaseLoader

# Complex template with conditionals and loops
REPORT_TEMPLATE = """
Generate a {{ report_type }} report for {{ company_name }}.

{% if include_summary %}
## Executive Summary
Provide a 2-3 sentence overview of key findings.
{% endif %}

## Key Metrics to Analyze
{% for metric in metrics %}
- {{ metric }}
{% endfor %}

{% if comparison_period %}
Compare results against {{ comparison_period }}.
{% endif %}

## Output Format
{{ output_format | default("Structured with clear headings and bullet points.") }}
"""

def generate_report_prompt(
    company_name: str,
    report_type: str = "quarterly",
    metrics: list = None,
    include_summary: bool = True,
    comparison_period: str = None,
    output_format: str = None
) -> str:
    template = Template(REPORT_TEMPLATE)
    return template.render(
        company_name=company_name,
        report_type=report_type,
        metrics=metrics or ["revenue", "growth", "customer satisfaction"],
        include_summary=include_summary,
        comparison_period=comparison_period,
        output_format=output_format
    )

# Usage
prompt = generate_report_prompt(
    company_name="Acme Corp",
    report_type="annual",
    metrics=["revenue", "profit margin", "market share", "customer churn"],
    comparison_period="last year"
)
```

### Jinja2 Custom Filters

```python
from jinja2 import Environment

def create_jinja_env():
    env = Environment()
    
    # Custom filter to format lists nicely
    def format_list(items, style="bullets"):
        if style == "bullets":
            return "\n".join(f"• {item}" for item in items)
        elif style == "numbered":
            return "\n".join(f"{i+1}. {item}" for i, item in enumerate(items))
        return ", ".join(items)
    
    env.filters['format_list'] = format_list
    return env

env = create_jinja_env()
template = env.from_string("""
Topics to cover:
{{ topics | format_list('numbered') }}
""")

result = template.render(topics=["Introduction", "Core Concepts", "Examples"])
```

---

## Pattern 5: Conditional Prompts

**What it does:** Dynamically adjusts prompt content based on conditions.

**Best for:** Multi-purpose templates, audience-specific content, A/B testing.

Conditional prompts solve a common problem: you have one core task but many variations. Different users need different instruction depth. Different contexts require different output formats. Different experiments need different system prompts.

**Real-world use cases:**

**Audience adaptation.** A customer support bot needs different responses for technical users versus general consumers. Technical users want API error codes and debugging steps. General users want plain-language explanations and reassurance. Rather than maintaining two separate prompts, a conditional template adapts automatically.

**Feature flags.** You're A/B testing a new instruction format. Conditional prompts let you route 50% of users to the new format without duplicating your entire prompt library. When the experiment concludes, you flip a flag and serve the winner to everyone.

**Context-aware assistance.** An AI coding assistant behaves differently in a code review versus a debugging session versus a documentation request. Conditional prompts let one assistant handle all three modes without confusion about their current role.

**Tenant customization.** In multi-tenant SaaS applications, different customers want different AI behaviors. Conditional prompts let you inject tenant-specific instructions, compliance requirements, or brand voice guidelines without maintaining n copies of every prompt.

The pattern below shows the building blocks. Start simple—a single condition. Add complexity only as your use cases demand it.

```python
from dataclasses import dataclass
from typing import Optional, Literal

@dataclass
class PromptConfig:
    task: str
    audience: Literal["beginner", "intermediate", "expert"] = "intermediate"
    include_examples: bool = True
    tone: Literal["formal", "casual", "technical"] = "casual"
    max_length: Optional[int] = None

def build_conditional_prompt(config: PromptConfig) -> str:
    """Build a prompt with conditional sections."""
    
    sections = []
    
    # Base instruction
    sections.append(f"Complete the following task: {config.task}")
    
    # Audience-specific instructions
    audience_instructions = {
        "beginner": "Explain concepts simply, avoid jargon, and define any technical terms.",
        "intermediate": "Assume basic familiarity with the subject.",
        "expert": "Use technical language freely and focus on advanced details."
    }
    sections.append(f"\nAudience level: {audience_instructions[config.audience]}")
    
    # Tone
    tone_instructions = {
        "formal": "Use professional, polished language.",
        "casual": "Write conversationally and engagingly.",
        "technical": "Prioritize precision and technical accuracy."
    }
    sections.append(f"\nTone: {tone_instructions[config.tone]}")
    
    # Conditional example request
    if config.include_examples:
        sections.append("\nInclude practical examples to illustrate key points.")
    
    # Conditional length constraint
    if config.max_length:
        sections.append(f"\nKeep your response under {config.max_length} words.")
    
    return "\n".join(sections)

# Usage
prompt = build_conditional_prompt(PromptConfig(
    task="Explain how neural networks learn",
    audience="beginner",
    include_examples=True,
    tone="casual",
    max_length=500
))
```

---

## Pattern 6: Multi-Section Templates

**What it does:** Compose prompts from reusable building blocks.

**Best for:** Large prompts, consistency across applications, modular design.

```python
from dataclasses import dataclass, field
from typing import List, Optional

@dataclass
class PromptSection:
    title: str
    content: str
    order: int = 0

class PromptBuilder:
    """Compose prompts from reusable sections."""
    
    def __init__(self):
        self.sections: List[PromptSection] = []
    
    def add_section(self, title: str, content: str, order: int = None) -> 'PromptBuilder':
        if order is None:
            order = len(self.sections)
        self.sections.append(PromptSection(title, content, order))
        return self  # Enable chaining
    
    def add_role(self, role: str) -> 'PromptBuilder':
        return self.add_section("Role", f"You are {role}.", order=0)
    
    def add_context(self, context: str) -> 'PromptBuilder':
        return self.add_section("Context", context, order=1)
    
    def add_task(self, task: str) -> 'PromptBuilder':
        return self.add_section("Task", task, order=2)
    
    def add_constraints(self, constraints: List[str]) -> 'PromptBuilder':
        content = "\n".join(f"- {c}" for c in constraints)
        return self.add_section("Constraints", content, order=3)
    
    def add_output_format(self, format_desc: str) -> 'PromptBuilder':
        return self.add_section("Output Format", format_desc, order=4)
    
    def build(self) -> str:
        sorted_sections = sorted(self.sections, key=lambda s: s.order)
        parts = []
        for section in sorted_sections:
            parts.append(f"## {section.title}\n{section.content}")
        return "\n\n".join(parts)

# Usage with chaining
prompt = (
    PromptBuilder()
    .add_role("a senior Python developer with 10 years of experience")
    .add_context("You are reviewing code for a production system.")
    .add_task("Review the following code and provide feedback.")
    .add_constraints([
        "Be constructive, not critical",
        "Prioritize security issues",
        "Suggest specific improvements"
    ])
    .add_output_format("Use markdown with clear headings.")
    .build()
)
```

---

## Pattern 7: Chat Message Templates

**What it does:** Create structured message lists for chat-based APIs.

**Best for:** OpenAI, Anthropic, and other chat-completion APIs.

```python
from typing import List, Dict, Literal
from dataclasses import dataclass

MessageRole = Literal["system", "user", "assistant"]

@dataclass
class Message:
    role: MessageRole
    content: str

class ChatPromptBuilder:
    """Build chat-style prompts with system, user, and assistant messages."""
    
    def __init__(self, system_prompt: str = None):
        self.messages: List[Message] = []
        if system_prompt:
            self.add_system(system_prompt)
    
    def add_system(self, content: str) -> 'ChatPromptBuilder':
        self.messages.append(Message("system", content))
        return self
    
    def add_user(self, content: str) -> 'ChatPromptBuilder':
        self.messages.append(Message("user", content))
        return self
    
    def add_assistant(self, content: str) -> 'ChatPromptBuilder':
        self.messages.append(Message("assistant", content))
        return self
    
    def add_example(self, user_msg: str, assistant_msg: str) -> 'ChatPromptBuilder':
        """Add a user/assistant exchange as an example."""
        return self.add_user(user_msg).add_assistant(assistant_msg)
    
    def build(self) -> List[Dict[str, str]]:
        return [{"role": m.role, "content": m.content} for m in self.messages]

# Usage
messages = (
    ChatPromptBuilder("You are a helpful coding assistant.")
    .add_example(
        "How do I read a file in Python?",
        "Use `open()` with a context manager:\n```python\nwith open('file.txt') as f:\n    content = f.read()\n```"
    )
    .add_user("How do I write JSON to a file?")
    .build()
)

# Ready for OpenAI or Anthropic API
# response = client.chat.completions.create(model="gpt-5", messages=messages)
```

For API integration details, see our [OpenAI API tutorial](/blog/openai-api-tutorial) or [Claude API tutorial](/blog/claude-api-tutorial).

---

## Pattern 8: Few-Shot Templates

**What it does:** Include examples that teach the model the expected format.

**Best for:** Classification, formatting tasks, style matching.

```python
from dataclasses import dataclass
from typing import List

@dataclass
class Example:
    input: str
    output: str

class FewShotTemplate:
    """Create prompts with dynamic few-shot examples."""
    
    def __init__(
        self, 
        task_description: str,
        input_prefix: str = "Input",
        output_prefix: str = "Output"
    ):
        self.task_description = task_description
        self.input_prefix = input_prefix
        self.output_prefix = output_prefix
        self.examples: List[Example] = []
    
    def add_example(self, input_text: str, output_text: str) -> 'FewShotTemplate':
        self.examples.append(Example(input_text, output_text))
        return self
    
    def format(self, query: str) -> str:
        parts = [self.task_description, ""]
        
        # Add examples
        for i, ex in enumerate(self.examples, 1):
            parts.append(f"Example {i}:")
            parts.append(f"{self.input_prefix}: {ex.input}")
            parts.append(f"{self.output_prefix}: {ex.output}")
            parts.append("")
        
        # Add the actual query
        parts.append("Now complete this:")
        parts.append(f"{self.input_prefix}: {query}")
        parts.append(f"{self.output_prefix}:")
        
        return "\n".join(parts)

# Usage: Sentiment classification
sentiment_classifier = (
    FewShotTemplate(
        "Classify the sentiment of the following text as positive, negative, or neutral.",
        input_prefix="Text",
        output_prefix="Sentiment"
    )
    .add_example("I love this product! Best purchase ever.", "positive")
    .add_example("This is the worst experience I've had.", "negative")
    .add_example("The package arrived on Tuesday.", "neutral")
)

prompt = sentiment_classifier.format("The movie was okay, nothing special.")
```

---

## Pattern 9: Partial Templates

**What it does:** Pre-fill some variables, leaving others for later.

**Best for:** Multi-stage pipelines, shared configurations.

```python
from functools import partial
from typing import Callable

def create_template(
    role: str,
    task: str,
    context: str = "",
    constraints: str = "",
    output_format: str = ""
) -> str:
    """A template function that can be partially applied."""
    parts = [f"You are {role}.", f"\nTask: {task}"]
    
    if context:
        parts.append(f"\nContext: {context}")
    if constraints:
        parts.append(f"\nConstraints: {constraints}")
    if output_format:
        parts.append(f"\nOutput format: {output_format}")
    
    return "".join(parts)

# Create a partial template with role pre-filled
code_assistant_template = partial(
    create_template,
    role="an expert Python developer",
    output_format="Provide code with comments explaining each step."
)

# Use the partial template - only need to provide task and context
prompt1 = code_assistant_template(
    task="Write a function to parse JSON files",
    context="The files may be malformed"
)

prompt2 = code_assistant_template(
    task="Create a REST API endpoint",
    context="Using FastAPI"
)
```

### Class-Based Partial Templates

```python
class PartialTemplate:
    """A template that supports progressive variable binding."""
    
    def __init__(self, template: str, **defaults):
        self.template = template
        self.defaults = defaults
    
    def partial(self, **kwargs) -> 'PartialTemplate':
        """Create a new template with additional defaults."""
        new_defaults = {**self.defaults, **kwargs}
        return PartialTemplate(self.template, **new_defaults)
    
    def format(self, **kwargs) -> str:
        """Format the template with all variables."""
        all_vars = {**self.defaults, **kwargs}
        return self.template.format(**all_vars)

# Usage
base_template = PartialTemplate(
    "As a {role}, {task}. Output in {format}.",
)

# Create specialized versions
analyst_template = base_template.partial(role="data analyst", format="bullet points")
writer_template = base_template.partial(role="technical writer", format="markdown")

# Use them
prompt1 = analyst_template.format(task="analyze this sales data")
prompt2 = writer_template.format(task="document this API")
```

---

## Pattern 10: Prompt Chaining

**What it does:** Connect multiple prompts where output flows to input.

**Best for:** Complex workflows, multi-step reasoning, content pipelines.

```python
from typing import Callable, List, Any
from dataclasses import dataclass

@dataclass
class PromptStep:
    name: str
    template: str
    transform_output: Callable[[str], Any] = None

class PromptChain:
    """Chain prompts together, passing outputs as inputs."""
    
    def __init__(self, llm_call: Callable[[str], str]):
        self.llm_call = llm_call
        self.steps: List[PromptStep] = []
        self.results: dict = {}
    
    def add_step(
        self, 
        name: str, 
        template: str,
        transform: Callable[[str], Any] = None
    ) -> 'PromptChain':
        self.steps.append(PromptStep(name, template, transform))
        return self
    
    def run(self, initial_input: str) -> dict:
        """Execute the chain and return all intermediate results."""
        self.results = {"input": initial_input}
        
        for step in self.steps:
            # Format template with all previous results
            prompt = step.template.format(**self.results)
            
            # Call LLM
            response = self.llm_call(prompt)
            
            # Transform if needed
            if step.transform_output:
                response = step.transform_output(response)
            
            self.results[step.name] = response
            print(f"✓ Completed: {step.name}")
        
        return self.results

# Example: Research → Outline → Draft pipeline
def mock_llm(prompt: str) -> str:
    """Mock LLM for demonstration."""
    return f"[Response to: {prompt[:50]}...]"

chain = (
    PromptChain(mock_llm)
    .add_step(
        "research",
        "Research the topic: {input}\n\nProvide 5 key facts."
    )
    .add_step(
        "outline", 
        "Based on this research:\n{research}\n\nCreate an article outline."
    )
    .add_step(
        "draft",
        "Using this outline:\n{outline}\n\nWrite the first paragraph."
    )
)

results = chain.run("The future of AI agents")
print(results["draft"])
```

For more on chaining, see our [chain-of-thought prompting guide](/blog/chain-of-thought-prompting).

---

## Best Practices

### 1. Keep Templates Separate from Code

```python
# prompts/templates.py
TEMPLATES = {
    "summarize": "Summarize this in {length} words: {text}",
    "translate": "Translate to {language}: {text}",
    "analyze": "Analyze the {aspect} of: {text}"
}

# main.py
from prompts.templates import TEMPLATES
prompt = TEMPLATES["summarize"].format(length=100, text=article)
```

### 2. Version Your Templates

```python
SUMMARY_TEMPLATE_V1 = "Summarize: {text}"
SUMMARY_TEMPLATE_V2 = "Provide a {length}-word summary of: {text}"
SUMMARY_TEMPLATE = SUMMARY_TEMPLATE_V2  # Current version
```

### 3. Add Template Validation

```python
def validate_template(template: str, required_vars: List[str]) -> bool:
    """Check that template contains all required variables."""
    import re
    found_vars = set(re.findall(r'\{(\w+)\}', template))
    missing = set(required_vars) - found_vars
    if missing:
        raise ValueError(f"Template missing variables: {missing}")
    return True
```

### 4. Test Templates Independently

```python
def test_summary_template():
    result = SUMMARY_TEMPLATE.format(length=100, text="test content")
    assert "100" in result
    assert "test content" in result
```

---

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

## Frequently Asked Questions

### Which pattern should I start with?
Start with **Pattern 1 (f-strings)** for simple projects. Move to **Pattern 3 (LangChain)** or **Pattern 4 (Jinja2)** when you need more structure.

### Can these work with any LLM?
Yes! These patterns create prompt strings—they work with OpenAI, Anthropic, Google, local models, and any other LLM API.

### How do I handle very long prompts?
Use **Pattern 6 (Multi-Section)** to break prompts into manageable pieces, or **Pattern 10 (Chaining)** to split across multiple calls.

### What's the difference between Jinja2 and f-strings?
F-strings are simpler but limited to Python expressions. Jinja2 supports loops, conditionals, inheritance, and custom filters—better for complex templates.

### How do I version control prompt templates?
Store templates in a `prompts/` directory as separate files (`.txt` or `.jinja2`). Track changes in git like any code. For production, consider a prompt registry that ties specific template versions to deployments.

### Should I use f-strings or Jinja2 for new projects?
Start with f-strings. Move to Jinja2 when you need conditionals, loops, or when non-developers need to edit prompts. The migration is straightforward—both use `{variable}` syntax.

### How do I prevent injection in user-provided template values?
Always sanitize user input before template substitution. For Jinja2, use `autoescape=True`. For f-strings, validate expected formats (e.g., reject input containing `{` or `}`).

---

## Conclusion

You now have 10 patterns for building dynamic prompts in Python:

1. **f-String Templates** - Quick and simple
2. **string.Template** - Safe substitution
3. **LangChain PromptTemplate** - Structured with validation
4. **Jinja2 Templates** - Full-featured templating
5. **Conditional Prompts** - Adaptive content
6. **Multi-Section Templates** - Modular design
7. **Chat Message Templates** - For chat APIs
8. **Few-Shot Templates** - Learning by example
9. **Partial Templates** - Pre-filled configurations
10. **Prompt Chaining** - Multi-step workflows

**Start simple. Add complexity only when needed.**

My recommendation: bookmark this page. When you start a new project, pick Pattern 1. When you hit its limits, come back and choose the next pattern up. This incremental approach saves time and keeps your codebase clean.

For more on prompt engineering, check out our [complete prompt engineering guide](/blog/prompt-engineering-beginners-guide) or learn about [system prompts](/blog/system-prompts-explained).

---

*Last updated: January 2026*
