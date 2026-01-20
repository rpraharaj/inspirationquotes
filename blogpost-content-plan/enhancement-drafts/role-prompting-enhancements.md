# Enhancement Draft: Role Prompting: Make AI Act as Any Expert (2026)

**Generated:** 2026-01-12
**Current Word Count:** 1,167 (visible to Google)
**Target Word Count:** 1,500+
**Words to Add:** ~350

---

## Voice Analysis

The post uses a first-person conversational voice with short, punchy sentences. The author shares personal experience ("There's a trick I use...") and directly addresses readers ("Let me show you"). Technical depth is moderate with tables for categorization. The tone is confident but approachable, using contractions and informal phrases. Headings use ## and ### without emoji.

---

## Enhancement 1: Role Prompting Psychology Section

**Location:** After line 61 (after "3. It Creates Consistency" section)
**Words Added:** ~115

### Content to Add:

### 4. It Leverages Cognitive Biases

Role prompting works partly because of how our brains process information. When you establish a persona, the AI's responses become more persuasive through the authority bias—we naturally give more weight to expert opinions. The responses also gain what psychologists call "source credibility," making the same information feel more trustworthy.

This psychological effect extends to you, the user. When ChatGPT responds as a "senior consultant," you engage with its suggestions differently than generic advice. You probe deeper, ask follow-up questions, and treat the interaction more like a genuine consultation. The role creates a mental framework that improves the entire conversation.

---

## Enhancement 2: Combining Roles Section Expansion

**Location:** After line 240 (after "Technique 1: Hybrid Roles" example)
**Words Added:** ~110

### Content to Add:

**More Hybrid Role Examples:**

The key to hybrid roles is choosing complementary traits that don't conflict. Here are combinations that work well:

- **Technical + Creative:** "A software engineer who writes poetry" produces beautifully documented code
- **Expert + Beginner-friendly:** "A PhD physicist who teaches middle school" explains complex topics accessibly  
- **Analytical + Empathetic:** "A therapist with an MBA" balances emotional intelligence with practical business advice
- **Industry + Cross-disciplinary:** "A marketing expert who studied behavioral economics" adds scientific rigor to campaigns

Avoid combinations that contradict: "A detail-oriented rapid writer" or "A formal comedian" create confusion rather than synergy.

---

## Enhancement 3: Role Prompt Testing Tips

**Location:** After line 373 (before "Role Prompting FAQs" section)
**Words Added:** ~150

### Content to Add:

## Testing Your Role Prompts

Before using a role prompt in production or for important work, validate it:

**Test for Consistency**

Run your role prompt three times with the same follow-up question. Check whether:
- The tone remains stable across responses
- Knowledge claims stay within the role's expertise
- The depth of answers matches your expectations

**Stress Test Edge Cases**

Push the role to its limits by asking questions at the boundaries of its expertise. A "marketing expert" role should decline to give medical advice. If it doesn't, add explicit constraints.

**A/B Compare Outputs**

Compare role-prompted responses against zero-shot responses. If there's no meaningful quality difference for your specific task, skip the role—it's adding complexity without value.

**Document What Works**

Keep a personal library of tested role prompts. Note which roles consistently produce good results and which need refinement. Over time, you'll build a reliable roster of AI personas for different tasks.

---

## New Internal Links

| Anchor Text | Target | Insert Location |
|-------------|--------|-----------------|
| prompt engineering beginner's guide | /blog/prompt-engineering-beginners-guide | Already exists (line 415) |
| system prompts guide | /blog/system-prompts-explained | Already exists (line 415) |
| few-shot prompting | /blog/zero-shot-vs-few-shot-prompting | Add in FAQ section about using roles with examples |
| prompt templates | /blog/prompt-template-code | Add in templates section |

---

## New External Links

| Anchor Text | URL | Insert Location |
|-------------|-----|-----------------|
| Anthropic's character design guide | https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering | Add in "Advanced Role Prompting Techniques" intro |
| OpenAI's prompting best practices | https://platform.openai.com/docs/guides/prompt-engineering | Add in "The Role Prompting Formula" section |

---

## Summary

- Total words added: ~375
- New word count: 1,542 (estimated)
- New internal links: 2 (+ 2 existing)
- New external links: 2
