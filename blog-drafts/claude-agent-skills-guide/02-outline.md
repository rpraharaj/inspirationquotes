# Detailed Outline: Claude Agent Skills Guide (Hub Page)

**Created:** 2026-01-14
**Based on:** 01-research-brief.md
**Target Word Count:** 4,500-5,500 words

---

## Structure Overview

| Section | Word Count | Purpose |
|---------|------------|---------|
| Introduction | 200-250 | Hook, define Skills, preview content |
| Section 1: What Are Claude Skills | 500-600 | Canonical definition, key concepts |
| Section 2: Architecture (How Skills Work) | 700-800 | Technical deep dive, three levels |
| Section 3: Pre-Built Skills | 400-500 | Out-of-box capabilities |
| Section 4: Creating Custom Skills | 800-900 | Core hub section, SKILL.md tutorial |
| Section 5: Platform Guide | 600-700 | API, Claude Code, SDK, claude.ai |
| Section 6: Skills vs Alternatives | 600-700 | Comparison tables |
| Section 7: Best Practices & Security | 500-600 | Guidance and governance |
| Section 8: Limitations | 400-500 | Honest assessment |
| Section 9: Getting Started | 300-400 | Quick start paths |
| FAQ | 400-500 | 8 questions for snippets |
| Conclusion | 150-200 | Summary and CTA |
| **TOTAL** | **5,550-6,150** | |

---

## Detailed Section Breakdown

### Introduction (200-250 words)
**Anchor:** N/A (top of page)

- **Hook:** What if Claude could remember your exact workflow, execute complex processes, and transform into a domain expert—without repeating instructions?
- Define Claude Agent Skills in one clear sentence
- Explain hub page purpose (comprehensive reference)
- Preview what readers will learn
- Set expectation: concepts to implementation

**Internal Links:** None in intro

---

### Section 1: What Are Claude Agent Skills? (500-600 words)
**Anchor:** `#what-are-claude-skills`

#### 1.1 The Definition
- Clear, quotable definition (target featured snippet)
- "Agent Skills are modular capabilities that extend Claude's functionality"
- Package: instructions, metadata, optional resources (scripts, templates)
- Claude uses them automatically when relevant

#### 1.2 The Mental Model
- "Specialized toolkit" analogy
- Like creating an onboarding guide for a new team member
- Claude navigates Skills like referencing sections of a guide

#### 1.3 Key Characteristics
- **Reusable:** Create once, use across conversations
- **Filesystem-based:** Exist as directories, not conversation history
- **Context-efficient:** Progressive disclosure (load only what's needed)
- **Bundled:** Scripts, templates, reference materials included

#### 1.4 Skills vs Prompts Quick Comparison

| Aspect | Skills | Prompts |
|--------|--------|---------|
| Persistence | Cross-conversation | Single conversation |
| Reusability | Create once, auto-recognized | Re-type each time |
| Token efficiency | Progressive loading | Full context load |
| Code execution | Yes (bundled scripts) | No |

**Internal Links:**
- Link to "AI agents" → `/blog/what-are-ai-agents`
- Link to Claude Agents Library → `/blog/claude-agents-library`

---

### Section 2: How Claude Skills Work - The Architecture (700-800 words)
**Anchor:** `#how-skills-work`

#### 2.1 The Filesystem Model (150-200 words)
- Skills exist as directories on Claude's VM
- Claude has filesystem access, bash commands, code execution
- Navigate Skills like files on a computer
- Why this matters: enables progressive disclosure

#### 2.2 Three Levels of Loading (400-500 words)

##### Level 1: Metadata (Always Loaded)
- YAML frontmatter in SKILL.md
- `name` and `description` fields
- Included in system prompt at startup
- Lightweight: many Skills, no context penalty

```yaml
---
name: pdf-processing
description: Extract text and tables from PDF files...
---
```

##### Level 2: Instructions (Loaded When Triggered)
- Main body of SKILL.md
- Procedural knowledge, workflows, best practices
- Claude reads via bash when request matches description
- Only then enters context window

##### Level 3: Resources and Code (Loaded As Needed)
- Additional markdown files (FORMS.md, REFERENCE.md)
- Executable scripts (Python, Bash)
- Reference materials (schemas, templates)
- Accessed only when referenced

#### 2.3 Example: Loading a PDF Skill (150-200 words)
1. Startup: Metadata in system prompt
2. User request: "Extract text from this PDF"
3. Claude reads SKILL.md via bash
4. Claude skips FORMS.md (not needed for extraction)
5. Claude executes task using loaded instructions

**Code Example:** Directory structure
```
pdf-skill/
├── SKILL.md          (main instructions)
├── FORMS.md          (form-filling guide)
├── REFERENCE.md      (API reference)
└── scripts/
    └── fill_form.py  (utility script)
```

---

### Section 3: Pre-Built Agent Skills (400-500 words)
**Anchor:** `#pre-built-skills`

#### 3.1 Available Pre-Built Skills

| Skill | ID | Capabilities |
|-------|-----|-------------|
| **PowerPoint** | `pptx` | Create presentations, edit slides, analyze content |
| **Excel** | `xlsx` | Create spreadsheets, analyze data, generate charts |
| **Word** | `docx` | Create documents, edit content, format text |
| **PDF** | `pdf` | Generate formatted PDFs and reports |

#### 3.2 Where Pre-Built Skills Work
- Claude API: Yes (with beta headers)
- Claude.ai: Yes (automatic)
- Claude Code: No (custom only)
- Claude Agent SDK: No (custom only)

#### 3.3 Using Pre-Built Skills
- Brief API usage example (headers required)
- Just ask in claude.ai (no setup needed)

#### 3.4 When to Go Custom
- Pre-built doesn't cover your workflow
- Need domain-specific logic
- Want to bundle your own scripts

**Internal Links:**
- Link to Claude API tutorial → `/blog/claude-api-tutorial`

---

### Section 4: Creating Custom Skills (800-900 words)
**Anchor:** `#custom-skills`

#### 4.1 The SKILL.md File Structure (300-350 words)

**Required Fields Table:**

| Field | Requirements |
|-------|-------------|
| `name` | Max 64 chars, lowercase, hyphens, no reserved words |
| `description` | Non-empty, max 1024 chars, what + when to use |

**Basic Template:**
```markdown
---
name: your-skill-name
description: Brief description of what this Skill does and when to use it
---

# Your Skill Name

## Instructions
[Clear, step-by-step guidance for Claude to follow]

## Examples
[Concrete examples of using this Skill]
```

#### 4.2 Optional Components (200-250 words)
- Additional markdown files (specialized guides)
- Scripts folder (Python, Bash utilities)
- Resources (schemas, templates, examples)
- When to add each type

**Extended Directory Structure:**
```
my-custom-skill/
├── SKILL.md           (required - main instructions)
├── ADVANCED.md        (optional - advanced usage)
├── REFERENCE.md       (optional - detailed reference)
├── scripts/
│   ├── validate.py    (optional - utility scripts)
│   └── process.sh
└── templates/
    └── output.md      (optional - output templates)
```

#### 4.3 Design Principles (200-250 words)
- Write clear, specific descriptions (Claude uses for discovery)
- Structure instructions like onboarding guide
- Use progressive complexity (basic → advanced)
- Test and iterate

#### 4.4 Custom Skill Categories (100-150 words)
Brief mention of the types of Skills you can create:
- Development Skills (code review, documentation)
- Productivity Skills (data analysis, reporting)
- Content Skills (writing, editing)
- Workflow Skills (multi-step automation)

---

### Section 5: Where Skills Work - Platform Guide (600-700 words)
**Anchor:** `#platform-support`

#### 5.1 Quick Reference Table

| Platform | Pre-Built | Custom | Sharing Scope | Network |
|----------|-----------|--------|---------------|---------|
| Claude API | ✅ | ✅ Upload | Workspace | ❌ None |
| Claude Code | ❌ | ✅ Filesystem | Personal/Project | ✅ Full |
| Agent SDK | ❌ | ✅ Filesystem | Per-agent | Varies |
| Claude.ai | ✅ | ✅ ZIP upload | Individual | Varies |

#### 5.2 Claude API (150-175 words)
- Required beta headers:
  - `code-execution-2025-08-25`
  - `skills-2025-10-02`
  - `files-api-2025-04-14`
- Use `skill_id` in container parameter
- Custom Skills via `/v1/skills` endpoints
- Workspace-wide sharing

#### 5.3 Claude Code (100-125 words)
- Filesystem-based (no upload)
- Locations:
  - `~/.claude/skills/` (personal)
  - `.claude/skills/` (project)
- Auto-discovered when Claude runs
- Share via Claude Code Plugins

#### 5.4 Claude Agent SDK (100-125 words)
- Place in `.claude/skills/` directory
- Enable via `allowed_tools` config (include "Skill")
- Auto-discovered at runtime

#### 5.5 Claude.ai (150-175 words)
- Pre-built: Automatic, no setup
- Custom: Settings > Features > Upload ZIP
- Plans: Pro, Max, Team, Enterprise
- Individual scope (not team-shared)
- Code execution must be enabled

**Internal Links:**
- Link to Claude API code snippets → `/blog/claude-api-code-snippets`
- Link to Claude Desktop setup → `/blog/claude-desktop-mcp-setup`

---

### Section 6: Skills vs Prompts vs Custom GPTs (600-700 words)
**Anchor:** `#skills-vs-alternatives`

#### 6.1 Comprehensive Comparison Table

| Feature | Claude Skills | System Prompts | Custom GPTs |
|---------|--------------|----------------|-------------|
| **Persistence** | ✅ Cross-conversation | ❌ Single conversation | ✅ Cross-conversation |
| **Code Execution** | ✅ Bundled scripts | ❌ None | ⚠️ Limited (actions) |
| **Token Efficiency** | ✅ Progressive loading | ❌ Full context load | ⚠️ Moderate |
| **Reusability** | ✅ Create once, auto-use | ❌ Re-type each time | ✅ Shareable |
| **Filesystem Access** | ✅ Read/write files | ❌ None | ⚠️ Code Interpreter |
| **Version Control** | ✅ Files in repos | ❌ None | ❌ None |
| **Enterprise Governance** | ✅ API workspace sharing | ❌ N/A | ⚠️ Team features |
| **Distribution** | API/Filesystem | N/A | GPT Store |

#### 6.2 When to Use Each (200-250 words)

**Use Skills When:**
- Repeatable workflows across conversations
- Need code execution or file operations
- Building domain-specific specialization
- Enterprise/team standardization

**Use Prompts When:**
- One-off, ad-hoc tasks
- Conversational exploration
- Quick iterations
- Context-specific refinements

**Use Custom GPTs When:**
- Consumer-facing distribution
- GPT Store publishing
- Simple customization needs
- OpenAI ecosystem preference

#### 6.3 Hybrid Approaches (100-150 words)
- Skills for foundation, prompts for context
- Skills aren't mutually exclusive with prompting
- Use Skills for standard procedures, prompts for specific cases

**Internal Links:**
- Link to prompt engineering → `/blog/prompt-engineering-beginners-guide`
- Link to MCP servers → `/blog/best-mcp-servers-claude`

---

### Section 7: Best Practices & Security (500-600 words)
**Anchor:** `#best-practices`

#### 7.1 Writing Effective Skills (200-225 words)
- Clear, specific descriptions (Claude uses for discovery)
- Include "when to use" in description
- Modular instruction design
- Progressive complexity patterns
- Concrete examples in SKILL.md
- Test across different requests

#### 7.2 Security Considerations (200-225 words)
- **Only use Skills from trusted sources**
- Audit all bundled files before use
- Check for unexpected network calls
- Review file access patterns
- External sources are risky (fetched content)
- Treat Skills like installing software

#### 7.3 Organizational Governance (100-150 words)
- Establish Skill review processes
- Use version control for Skill files
- Plan sharing scope (API vs claude.ai)
- Document Skill purposes and owners
- Regular audits for outdated Skills

---

### Section 8: Limitations & Constraints (400-500 words)
**Anchor:** `#limitations`

#### 8.1 Cross-Surface Availability (100-125 words)
- Skills don't sync between platforms
- Upload separately to each surface
- Claude.ai Skills ≠ API Skills ≠ Claude Code Skills

#### 8.2 Sharing Scope (100-125 words)

| Platform | Sharing Scope |
|----------|---------------|
| Claude.ai | Individual user only |
| Claude API | Workspace-wide |
| Claude Code | Personal or project-based |

No centralized admin management in claude.ai

#### 8.3 Runtime Environment (150-175 words)

| Platform | Network | Packages |
|----------|---------|----------|
| Claude API | ❌ No network access | Pre-installed only |
| Claude.ai | Varies (admin settings) | Varies |
| Claude Code | ✅ Full access | Local install preferred |

- Plan Skills for offline execution (API)
- Bundle dependencies in Skill folder
- Check code execution docs for available packages

#### 8.4 Planning for Constraints (50-75 words)
- Design for lowest common denominator if multi-platform
- Test on target platforms
- Document platform-specific limitations

---

### Section 9: Getting Started - Quick Start Paths (300-400 words)
**Anchor:** `#getting-started`

#### 9.1 By User Type

| If You're A... | Start Here |
|----------------|------------|
| **Claude.ai User** | Try pre-built Skills → Upload simple custom Skill |
| **API Developer** | Use pre-built via API → Create custom via `/v1/skills` |
| **Claude Code User** | Create SKILL.md in `.claude/skills/` |
| **Enterprise Team** | Evaluate sharing scope → Plan governance |

#### 9.2 Your First Custom Skill (5 Steps) (150-200 words)
1. **Identify a repeatable workflow** you explain to Claude often
2. **Create a folder** with clear name (lowercase, hyphens)
3. **Write SKILL.md** with name, description, instructions
4. **Test the Skill** with various requests
5. **Iterate** based on Claude's behavior

#### 9.3 Next Steps
- Explore pre-built Skills in claude.ai
- Read the official quickstart tutorial
- Check back for hands-on Skill tutorials (future posts)

**External Links:**
- Link to Anthropic quickstart → official docs
- Link to Skills cookbook → official docs

---

### FAQ Section (400-500 words)
**Anchor:** `#faq`

**8 Questions (50-60 words each):**

1. **What are Claude Agent Skills?**
   - Definition paragraph for featured snippet

2. **How do Claude Skills differ from prompts?**
   - Persistence, reusability, code execution comparison

3. **Can I create custom Skills for Claude?**
   - Yes, how to create SKILL.md

4. **Which platforms support Claude Skills?**
   - API, Claude Code, SDK, claude.ai with differences

5. **Are Claude Skills secure to use?**
   - Security considerations, audit recommendations

6. **Do Claude Skills cost extra?**
   - Included with plans that support code execution

7. **Can I share Claude Skills with my team?**
   - Sharing scope by platform

8. **What programming languages can Skills use?**
   - Python, Bash for scripts; any for reference files

---

### Conclusion (150-200 words)
**Anchor:** N/A

- Summary: Skills transform Claude from generalist to specialist
- Highlight key takeaways (reusability, efficiency, power)
- Position this as THE reference to bookmark
- CTA: Start with pre-built, graduate to custom
- Mention related resources

**Internal Links:**
- Final link to Claude Agents Library

---

## External Links Required

1. Anthropic official docs: Agent Skills overview
2. Anthropic engineering blog: "Equipping agents for the real world"
3. Claude Help Center: Skills support articles
4. Anthropic quickstart tutorial
5. Skills cookbook (optional)

---

*Outline completed. Ready for writing phase.*
