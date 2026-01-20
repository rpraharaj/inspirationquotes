---
title: "Build a Front-end Developer Skill for Claude: Complete Tutorial (2026)"
description: "Create a powerful Claude Agent Skill for front-end development. Includes complete SKILL.md for React, TypeScript, accessibility checks, and performance validation. Ready to deploy."
pubDate: 2026-01-14
updatedDate: 2026-01-14
heroImage: "/images/featured/frontend-developer-skill-claude.webp"
category: "ai-agents"
tags: ["Claude Skills", "Front-end Development", "React", "TypeScript", "Accessibility", "Code Review", "Tutorial"]
author: "Raj Praharaj"
readTime: "18 min read"
---

I'll be honest—my first attempt at getting Claude to review front-end code was... messy. I'd paste in a React component, ask for feedback, and get back generic advice that missed half the important stuff. No accessibility checks, no bundle size warnings, nothing about whether my responsive breakpoints made sense.

Then I built a dedicated Front-end Developer Skill, and the difference was night and day.

Now when I ask Claude to review a component, it automatically checks for proper TypeScript usage, WCAG compliance, performance patterns, responsive design, and all the other front-end-specific concerns I actually care about. No more explaining what to look for every single time.

This tutorial walks you through building the exact Skill I use daily. You'll get the complete SKILL.md file, deployment instructions for every Claude platform, and examples of how it works in practice.

Let's build this thing.

## What This Skill Does

The Front-end Developer Skill transforms Claude into a specialist reviewer for modern web applications. Here's what it checks automatically:

**Component Structure**
- React/Vue component best practices
- Proper JSX/template structure
- Component composition patterns
- State management approaches

**TypeScript Quality**
- Type safety (avoiding `any`)
- Interface vs type usage
- Proper typing for props and state
- Generic type patterns

**Accessibility (WCAG 2.1 AA)**
- Semantic HTML elements
- ARIA attributes where needed
- Keyboard navigation support
- Color contrast requirements
- Alt text for images

**Performance**
- Unnecessary re-renders
- Memo/useMemo/useCallback usage
- Bundle size implications
- Lazy loading opportunities

**Responsive Design**
- Mobile-first approach
- Breakpoint consistency
- Flexbox/Grid usage
- Touch target sizes

**Security**
- XSS vulnerability patterns
- Unsafe innerHTML usage
- External link security
- Input sanitization

This isn't a generic code reviewer—it's specifically tuned for front-end concerns.

## The Complete Skill File

Here's the full SKILL.md. I'll break down the key sections afterward:

```markdown
---
name: frontend-developer
description: Review front-end code for React/Vue components, TypeScript quality, accessibility (WCAG), performance, responsive design, and security. Use when reviewing web UI code, components, or when user mentions front-end, accessibility, or performance concerns.
---

# Front-end Developer Skill

## Review Process

When reviewing  front-end code, follow this systematic approach:

### 1. Component Structure Review

**React/Vue Patterns:**
- Single Responsibility: Does the component do one thing well?
- Component composition: Breaking down complex components?
- Props drilling: More than 2-3 levels = consider context/state management
- Side effects: Properly isolated in useEffect/lifecycle hooks?

**Red flags:**
- Components over 300 lines
- Mixing business logic with presentation
- Prop drilling beyond 2-3 levels
- State management in presentational components

### 2. TypeScript Quality Check

**Type Safety:**
- Avoiding `any` - suggest proper types
- Using `unknown` over `any` for truly generic cases
- Proper interface/type usage for props
- Discriminated unions for complex state

**Common issues:**
```typescript
// ❌ BAD
const handleClick = (e: any) => { }
const props: any = { }

// ✅ GOOD
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { }
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}
```

### 3. Accessibility (WC AG 2.1 AA)

**Critical checks:**
- [ ] Semantic HTML (button vs div with click handler)
- [ ] Form labels properly associated
- [ ] ARIA attributes correct and necessary
- [ ] Keyboard navigation works (tab order, Enter/Space)
- [ ] Color contrast meets 4.5:1 (text) or 3:1 (UI components)
- [ ] Alt text for images (or empty alt="" for decorative)
- [ ] Focus indicators visible
- [ ] No motion without user consent

**Common fixes:**
```jsx
// ❌ BAD - Not accessible
<div onClick={handleClick}>Submit</div>
<img src="logo.png" />
<label>Email</label><input type="email" />

// ✅ GOOD - Accessible
<button onClick={handleClick}>Submit</button>
<img src="logo.png" alt="Company logo" />
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

### 4. Performance Patterns

**What to check:**
- Expensive calculations in render → useMemo
- Functions passed as props → useCallback
- Large lists → virtualization (react-window)
- Images → lazy loading, responsive images
- Re-renders → React.memo for expensive components

**Bundle size awareness:**
- Heavy libraries (moment.js → date-fns)
- Importing entire libraries vs tree-shaking
- Code splitting opportunities

**Example optimizations:**
```jsx
// ❌ Creates new function every render
<Child onClick={() => handleClick(id)} />

// ✅ Memoized
const handleChildClick = useCallback(() => handleClick(id), [id]);
<Child onClick={handleChildClick} />
```

### 5. Responsive Design

**Check for:**
- Mobile-first media queries
- Consistent breakpoints (don't mix px values randomly)
- Touch targets ≥ 44x44px
- Viewport meta tag set correctly
- Fluid typography (clamp, calc)
- Flexbox/Grid for layouts (avoid float/position hacks)

**Breakpoint standards:**
```css
/* Consistent scale */
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

### 6. Security Checks

**XSS Prevention:**
- Avoid dangerouslySetInnerHTML unless necessary
- If needed, sanitize with DOMPurify
- Validate/sanitize user input
- Proper encoding for URLs

**External links:**
```jsx
// ✅ Secure external links
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
```

### 7. CSS/Styling Best Practices

**If using Tailwind:**
- Consistent spacing scale
- Avoiding arbitrary values (prefer theme)
- Responsive variants properly used

**If using CSS-in-JS:**
- Avoiding inline styles (except dynamic values)
- Proper theming setup
- CSS custom properties for themes

**General:**
- Consistent naming (BEM if vanilla CSS)
- Specificity issues
- !important usage (usually a code smell)

## Output Format

Structure review as:

**✅ Strengths:**
- What's done well
- Good patterns used

**🔴 Critical Issues:**
- Accessibility violations
- Security vulnerabilities
- Major performance problems

**🟡 Improvements:**
- TypeScript type improvements
- Performance optimizations
- Better patterns

**📱 Responsive/Mobile:**
- Mobile-specific concerns
- Breakpoint issues

**🎨 Styling Notes:**
- CSS/styling improvements
- Consistency issues

## Component-Specific Patterns

### Forms
- Controlled vs uncontrolled (prefer controlled for validation)
- Error handling and display
- Form validation (client + server)
- Accessibility (labels, error announcements)

### Modals/Dialogs
- Focus trap
- Escape key to close
- Focus return on close
- ARIA dialog role
- Backdrop click to close (with confirmation if dirty)

### Lists/Tables
- Key prop (stable IDs, not index)
- Virtualization for 100+ items
- Loading states
- Empty states
- Sorting/filtering accessibility

## Framework-Specific

### React
- Hooks rules (only at top level)
- Effect cleanup
- Dependency arrays complete
- Key prop usage

### Vue
- Reactivity caveats (Vue 3 vs 2)
- Composition API vs Options
- Proper emit usage
- V-for key attribute

### Next.js/Remix
- Server vs client components
- Data fetching patterns
- Route prefetching
- Image optimization (next/image)

## Modern Standards (2026)

- React 19+ concurrent features
- TypeScript 5+ satisfies operator
- Container queries where supported
- View Transitions API for navigation
- Popover API for overlays
- CSS :has() selector
- CSS nesting
```

That's the complete Skill. Let me break down why each section matters.

## Understanding the Structure

###  The Frontmatter

```yaml
name: frontend-developer
description: Review front-end code for React/Vue components...
```

The `description` is crucial—it's how Claude decides when to activate this Skill. I made it specific enough to trigger on front-end contexts but broad enough to catch variations in how someone might ask for help.

If you're curious about how the discovery system works, check out the [architecture section in the Claude Skills guide](/blog/claude-agent-skills-guide#how-claude-skills-work).

### The Systematic Review Process

I structured this as numbered sections because Claude works through them sequentially. When I tried a flatter structure, Claude would skip important checks. The numbered flow keeps it consistent.

The hierarchy (Component → TypeScript → Accessibility → Performance → etc.) reflects priority. Accessibility comes before performance because broken accessibility is a critical failure, while performance is an optimization.

### Code Examples in the Skill

Notice I included both ❌ BAD and ✅ GOOD examples directly in the Skill. This is intentional. Without examples, Claude sometimes suggests changes but doesn't show concrete alternatives. The examples make it actionable.

### Framework-Specific Sections

The "Framework-Specific" section lets Claude adapt based on what it sees in the code. If it detects Next.js imports, it knows to check for server component patterns. If it sees Vue composition API, it knows to check those specific patterns.

## Deploying the Skill

Here's how to get this running on each Claude platform.

### Option 1: Claude.ai (Easiest)

1. Copy the complete SKILL.md content above
2. Create a file named `SKILL.md` and paste it
3. ZIP the file: `zip frontend-developer.zip SKILL.md`
4. Go to Claude.ai → Settings → Features → Upload Skills
5. Upload `frontend-developer.zip`

Done. The Skill is now active in your Claude.ai conversations.

**Limitation:** Skills on claude.ai are personal—each team member has to upload separately. There's no centralized management yet.

### Option 2: Claude API (For Developers)

First, create the Skill file locally, then upload via the API:

```bash
# Create skill directory
mkdir frontend-developer-skill
cd frontend-developer-skill

# Create SKILL.md (paste the content from above)
nano SKILL.md

# Zip it
zip -r ../frontend-developer.zip .

# Upload via API
curl -X POST https://api.anthropic.com/v1/skills \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: code-execution-2025-08-25,skills-2025-10-02" \
  -F "file=@frontend-developer.zip" \
  -F "name=frontend-developer"
```

Then use it in API calls:

```python
import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-4-sonnet",
    max_tokens=4096,
    betas=["code-execution-2025-08-25", "skills-2025-10-02"],
    messages=[{
        "role": "user", 
        "content": "Review this React component: [paste component code]"
    }],
    container={
        "skill_ids": ["frontend-developer"]  # Activates the Skill
    }
)
```

Skills uploaded via API are workspace-wide—all team members can use them.

### Option 3: Claude Code (Version Control Friendly)

For Claude Code, Skills live in  filesystem directories:

```bash
# Personal Skill (available in all projects)
mkdir -p ~/.claude/skills/frontend-developer
cd ~/.claude/skills/frontend-developer
nano SKILL.md  # Paste the content

# OR project-specific Skill (committed to repo)
mkdir -p .claude/skills/frontend-developer
cd .claude/skills/frontend-developer
nano SKILL.md  # Paste the content
git add .claude/skills/
git commit -m "Add frontend developer Skill"
```

Claude Code auto-discovers Skills in these directories. No upload, no ZIP—just create the file and it works.

I prefer the project-specific approach (`.claude/skills/`) because it version-controls the Skill alongside the codebase. When the project's standards evolve, the Skill evolves with it.

## Testing the Skill

Let's see this in action. Here's a deliberately flawed React component:

```jsx
const UserCard = (props) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="card" onClick={() => setExpanded(!expanded)}>
      <img src={props.avatar} />
      <div className="name">{props.name}</div>
      <div className="email">{props.email}</div>
      {expanded && (
        <div className="details" dangerouslySetInnerHTML={{__html: props.bio}} />
      )}
    </div>
  );
};
```

With the Skill active, here's what Claude returns:

**✅ Strengths:**
- Clean component structure
- Conditional rendering for expanded state

**🔴 Critical Issues:**
1. **Accessibility violation:** `<div onClick>` instead of a button. Screen readers won't identify this as interactive, and keyboard users can't focus/activate it.
2. **Security vulnerability:** `dangerouslySetInnerHTML` without sanitization opens XSS risk.
3. **Missing alt text:** Image has no alt attribute.
4. **No TypeScript typing:** Props are untyped.

**🟡 Improvements:**
1. **Use semantic HTML:**
   ```jsx
   <button 
     className="card" 
     onClick={() => setExpanded(!expanded)}
     aria-expanded={expanded}
   >
   ```
2. **Add image alt:**
   ```jsx
   <img src={props.avatar} alt={`${props.name}'s profile picture`} />
   ```
3. **Sanitize HTML or avoid it:**
   ```jsx
   import DOMPurify from 'dompurify';
   <div className="details" 
     dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.bio)}} 
   />
   ```
4. **Add TypeScript types:**
   ```tsx
   interface UserCardProps {
     avatar: string;
     name: string;
     email: string;
     bio: string;
   }
   
   const UserCard: React.FC<UserCardProps> = (props) => {
   ```

See the difference? Instead of generic "use better practices," I get specific, actionable fixes.

## Customizing for Your Stack

The Skill I showed works for React, but you'll want to adapt it for your specific setup. Here's how:

### Adding Vue-Specific Checks

Add this to the "Framework-Specific" section:

```markdown
### Vue Specific
- Computed properties vs methods (prefer computed for derived state)
- Watch vs computed (prefer computed when possible)
- Keep setup() function under 100 lines (extract composables)
- Proper ref/reactive usage (reactive for objects, ref for primitives)
```

### Adding Tailwind-Specific Patterns

If you use Tailwind extensively, add:

```markdown
### Tailwind CSS
- Using design tokens (colors.blue.500) over arbitrary (text-[#3b82f6])
- Consistent spacing scale (p-4, p-6, not p-[17px])
- Responsive prefix order: sm: md: lg: xl:
- Group/peer utilities  for hover states
- @apply usage (minimize—defeats purpose of utility-first)
```

### Adding Next.js Patterns

For Next.js projects:

```markdown
### Next.js
- Server Components default in App Router
- Use 'use client' only when needed (interactivity, hooks, browser APIs)
- Image optimization with next/image
- Font optimization with next/font
- Metadata API for SEO
- Dynamic imports for client-heavy components
```

I keep different versions of this Skill for different project types. My Next.js version is more opinionated about server components; my Vue version checks composition API patterns.

## Common Issues and Fixes

### "Skill Isn't Triggering"

If Claude isn't using your Skill when you expect:

1. **Check your description**—it needs to mention the trigger keywords. I added "front-end, accessibility, performance" explicitly.
2. **Be specific in your request**—"Review this component" is vague. Try "Review this React component for accessibility and performance."
3. **Verify deployment**—On claude.ai, check Settings → Features to confirm upload.

### "Too Generic/Missing My Standards"

Add your team's specific patterns to the Skill. For example, if you enforce specific prop naming:

```markdown
### Prop Naming Conventions
- Boolean props: prefix with `is`, `has`, `should`
  - ✅ `isDisabled`, `hasError`, `shouldAutoFocus`
  - ❌ `disabled`, `error`, `autoFocus`
- Event handlers: prefix with `on`
  - ✅ `onClick`, `onSubmit`, `onValueChange`
  - ❌ `click`, `submit`, `handleChange`
```

The Skill becomes your team's living style guide.

### "Output is Too Verbose"

Modify the "Output Format" section:

```markdown
## Output Format

Keep it concise. Structure as:

**Critical:** 
- Only accessibility/security issues

**Quick wins:**
- High-impact, low-effort improvements

Skip verbose explanations unless the issue is subtle.
```

Claude will adapt its output length based on what you specify here.

## Next Steps

You've now got a working Front-end Developer Skill. Here's what to do next:

1. **Test it on real code**—Paste in a few of your components and see what it catches
2. **Customize for your stack**—Add your framework specifics and team conventions
3. **Share with your team**—If using Claude API, they'll get it automatically. If claude.ai, share the ZIP
4. **Iterate**—As you find gaps (missing checks, wrong priorities), update the SKILL.md

### Related Skills to Build

Using the same pattern, you can create:
- **Back-end Developer Skill** (API patterns, database queries, auth)
- **Code Review Skill** (general, not framework-specific)
- **Performance Audit Skill** (bundle analysis, Core Web Vitals)
- **Accessibility Specialist Skill** (deeper WCAG checks)

Check out the [Claude Agent Skills guide](/blog/claude-agent-skills-guide) for the full framework on how Skills work and best practices for creating them.

## Frequently Asked Questions

### Can I use this Skill with Vue or Svelte?

Yes, but you'll want to customize it. The core concepts (accessibility, TypeScript, performance) apply universally. Just modify the framework-specific sections to match Vue's composition API or Svelte's reactivity model.

### Does this work with JavaScript or only TypeScript?

It works with both. For JavaScript projects, Claude will skip the TypeScript-specific checks and focus on the other areas. I'd still recommend migrating to TypeScript eventually—the type safety catches so many bugs.

### Will this Skill catch all accessibility issues?

No automated tool catches everything. This Skill finds common WCAG violations (missing alt text, poor semantics, keyboard issues), but you still need manual testing with screen readers and real users. Think of it as a first pass, not a replacement for proper a11y testing.

### Can I combine this with other Skills?

Absolutely. Skills aren't mutually exclusive. You could have this Front-end Skill active alongside a Testing Skill or Documentation Skill. Claude will use whichever is relevant to your request.

### How do I update the Skill after deploying?

- **Claude.ai:** Upload a new ZIP with the same name—it overwrites
- **Claude API:** Upload via same API endpoint—it versions automatically
- **Claude Code:** Just edit the SKILL.md file—changes take effect on next use

I update mine every few months as standards evolve or I find edge cases it misses.

## Conclusion

Building this Skill took me maybe an hour, but it's saved me countless hours since. Every component review is faster, more thorough, and more consistent.

The beautiful thing about Skills is they get better over time. As I encounter new patterns or realize I'm repeatedly explaining something, I add it to the Skill. It evolves with my work.

Start with the Skill I provided, customize it for your stack, and watch it become an indispensable part of your development workflow. You'll wonder how you ever managed without it.

If you haven't already, grab the complete [Claude Agent Skills guide](/blog/claude-agent-skills-guide) to understand the full platform—this tutorial is just scratching the surface of what's possible.

Happy coding!

---

*Last updated: January 14, 2026*
