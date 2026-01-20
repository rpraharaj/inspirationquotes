---
title: "AI Hallucinations: Why AI Makes Things Up (And What to Do About It)"
description: "Learn what AI hallucinations are, why ChatGPT and other LLMs confidently make things up, famous examples of AI gone wrong, and practical strategies to prevent false AI outputs."
pubDate: 2026-01-09
author: "AI Agents Kit"
category: "ai-ethics"
tags: ["ai hallucinations", "ai accuracy", "chatgpt problems", "llm limitations", "ai fact checking"]
image: "./images/ai-hallucinations-explained.png"
keywords: ["AI hallucinations", "why does AI make things up", "AI false information", "ChatGPT hallucinations", "prevent AI hallucinations"]
---

A few months ago, I was researching for an article and asked Claude to give me some statistics about AI adoption in healthcare. What I got back sounded perfect—specific percentages, studies cited, even author names. I almost published it.

Then, out of curiosity, I tried to find the original studies. They didn't exist. The authors didn't exist. Claude had invented an entire body of research that sounded completely plausible but was entirely fabricated.

This is what's called an AI hallucination, and if you've used ChatGPT, Claude, Gemini, or any large language model, you've probably encountered one—whether you realized it or not. These aren't rare glitches or bugs that will be patched in the next update. They're a fundamental part of how these models work.

In 2024, 47% of enterprise AI users admitted to making at least one major business decision based on hallucinated content. In the first quarter of 2025 alone, 12,842 AI-generated articles were removed from online platforms because they contained fabricated information. Merriam-Webster even named "slop"—low-quality AI-generated content—their word of the year for 2025.

This is a problem we all need to understand. Let's break down exactly what's happening when AI makes things up, why it happens, and what you can actually do about it.

## What Exactly Are AI Hallucinations?

AI hallucinations occur when a large language model generates false, nonsensical, or misleading information and presents it as if it were factual. The term is actually somewhat misleading—the AI isn't experiencing anything like human hallucinations. It's closer to what psychologists call confabulation: confidently constructing information that seems true but isn't.

Here's what makes this particularly dangerous: **the AI doesn't know it's wrong.**

When ChatGPT tells you that Thomas Edison invented the internet (an actual example of a hallucination), it delivers that information with the same confidence as when it correctly tells you Edison invented the phonograph. There's no hesitation, no uncertainty, no caveat. From the outside, truth and fabrication look identical.

This confidence is the core problem. If AI responses came with obvious warning signs—broken grammar, logical inconsistencies, visible uncertainty—we'd catch them easily. Instead, hallucinated content is often the most polished and convincing because the model is pattern-matching to what sounds authoritative and well-written.

The term "hallucination" might not even be the right word. Some researchers prefer "confabulation" because it better captures what's happening: the model isn't perceiving things that aren't there; it's generating plausible-sounding content without regard for truth. But "hallucination" has stuck, and it's what everyone uses, so we'll go with it.

What hallucinations are NOT:
- Bugs that will be fixed in the next version
- Rare edge cases that only happen with weird prompts
- Intentional deception by the AI
- Problems specific to certain models (all LLMs do this)

What hallucinations ARE:
- A fundamental consequence of how LLMs work
- More common in some situations than others
- Somewhat reducible with the right techniques
- Something you need to actively watch for

I can't stress this enough: hallucinations aren't a failure of implementation. They emerge from the very architecture that makes LLMs powerful. Understanding this changes how you use these tools.

## Why AI Makes Things Up (It's Not a Bug)

To understand why AI hallucinates, you need to understand what large language models actually do—and perhaps more importantly, what they don't do.

### How LLMs Actually Work

Here's the uncomfortable truth: large language models don't "know" anything in the way humans know things. They don't understand facts. They don't verify information. They don't have access to a database of truth.

What they do is predict the next word.

That's it. When you ask ChatGPT a question, it's not searching through a mental encyclopedia or reasoning through the problem. It's generating tokens (roughly words) one at a time, each time asking: "Given everything that came before this, what's the most statistically probable next token?"

This process is called autoregressive generation, and it works shockingly well for producing coherent, relevant text. But notice what's missing from that process: there's no step where the model checks whether what it's saying is true.

The model is essentially a very sophisticated autocomplete system. It's been trained on billions of words of text and has learned incredibly nuanced patterns about language. But it has no mechanism for distinguishing accurate predictions from plausible-sounding fabrications.

### The Pattern Matching Problem

LLMs learn patterns from massive amounts of text—books, websites, code, everything. They get incredibly good at recognizing what sounds correct, what language patterns typically appear together, what kind of response would be expected for a given prompt.

But sounding correct is not the same as being correct.

When you ask about a historical event, the model generates text that matches the patterns of how historians write about events. When you ask for code, it generates text that matches the patterns of how code is written. The model has no way to distinguish between "this is how accurate information is presented" and "this is how plausible-sounding information is presented."

In training, there are no labels for "true statement" and "false statement." The model learns that certain word sequences are probable given the context—not that they're factually accurate.

Here's an example that crystallizes the problem: if you ask an LLM about a historical figure, it will generate text in the style of how historical figures are typically described. If that particular figure isn't well-represented in the training data, the model will still generate confident-sounding descriptions—it's just filling in the pattern. The result might be partially accurate or entirely fabricated.

### No Concept of Truth

This is the part that I find genuinely unsettling: these models have no grounding in reality. They've never experienced the world. They have no way to verify whether the Battle of Waterloo happened in 1815 or 1915. Both would be generated as plausible continuations of certain prompts.

The model might get the date right because that's what appears most frequently in its training data. But it doesn't know it's right. If the training data contained mostly wrong dates, it would confidently give wrong dates.

Think of it this way: if you trained a model on a parallel universe's internet where the predominant belief was that the Earth is flat, the model would confidently tell you the Earth is flat—and would generate convincing-sounding explanations for why.

The model reflects patterns in data. It doesn't evaluate those patterns against reality. There's no internal fact-checker, no verification system, no epistemological framework.

### Why Longer Responses Have More Hallucinations

There's another factor that makes hallucinations worse: cascading errors.

Each token is generated based on everything that came before it. If the model introduces a small inaccuracy early in its response, that error becomes part of the context for all subsequent generation. The error compounds.

This is why you often see hallucinations grow worse as responses get longer. The model might start with mostly accurate information, make one small fabrication, and then build an elaborate structure on that false foundation.

I've seen this happen with complex questions: the first paragraph is fine, the second introduces a small error, and by the fifth paragraph, the AI is confidently describing events, people, and concepts that are entirely invented. Once you notice this pattern, you'll see it everywhere.

## When AI Hallucinations Went Wrong

Let's look at some real cases where AI hallucinations caused actual problems. These aren't hypotheticals—they're things that actually happened, with real consequences for real people.

### The Lawyer Who Cited Fake Cases

This is probably the most famous AI hallucination case. In 2023, a New York lawyer named Steven Schwartz used ChatGPT to research case law for a legal brief. The AI provided several apparently relevant cases with proper citations—case names, court decisions, and even quotes from judicial opinions.

There was just one problem: none of those cases existed. The opposing counsel couldn't find them. The judge couldn't find them. That's because ChatGPT had invented them entirely—fabricating case names, court decisions, and legal precedents that sounded completely plausible but were pure fiction.

Schwartz was sanctioned by the court. The case became a cautionary tale about using AI for research without verification. The irony is brutal: a lawyer trusted AI to do legal research, and the AI fabricated the very thing lawyers are trained to rely on—precedent.

### Google's Bard Launch Disaster

When Google launched Bard (now Gemini), they ran a demonstration asking about discoveries from the James Webb Space Telescope. Bard confidently claimed that JWST had taken the first pictures of a planet outside our solar system.

This is false. The first exoplanet images were captured years before JWST launched. The error was caught almost immediately and went viral, wiping billions off Alphabet's stock price in the aftermath.

One hallucination, billions in losses. That's the scale we're dealing with.

### Air Canada's Chatbot Promise

Air Canada deployed an AI chatbot for customer service. A customer asked about bereavement fares and received information about a refund policy that... didn't exist. The customer booked based on the chatbot's advice, then was denied the refund because the policy was fabricated.

The customer sued. Air Canada argued they shouldn't be liable for what their AI said. The court disagreed, ruling that the company was responsible for information provided by their chatbot, even if that information was hallucinated.

This case established something important: companies can't hide behind "the AI made it up" as a defense. If your AI tells customers something, you own that statement.

### Medical Misinformation

Research has documented cases of LLMs providing dangerously incorrect medical advice. In one documented example, an AI gave a dosage recommendation for children's ibuprofen that was significantly incorrect—the kind of error that could harm a child if followed.

Healthcare hallucinations are particularly concerning because they combine two factors: high stakes and user trust. If someone asks an AI about medication dosages, they might assume the response is reliable. That assumption can be dangerous.

### The 2025-2026 Legal System

As recently as January 2026, judges in Pennsylvania have reported identifying suspected AI hallucinations in court filings. Attorneys are submitting briefs with errors and fabrications that suggest AI generation without adequate human review.

This isn't ancient history. This is happening right now, after years of warnings about AI hallucinations. The pattern keeps repeating because people keep trusting AI outputs without verification.

### The Numbers

How common are hallucinations? It depends on the task:

- For simple factual questions, top models achieve hallucination rates as low as 0.7-0.9%
- For complex or specialized tasks, rates jump to 5-30% or higher
- In critical sectors (legal, medical, financial, scientific), average rates range from 2.1% to 18.7%

These aren't occasional glitches. For many use cases, you can expect errors in a substantial fraction of responses.

## The Different Types of AI Hallucinations

Not all AI fabrications look the same. Understanding the different types helps you spot them.

### Factual Fabrication

This is the classic hallucination: stating facts that are simply wrong. Edison inventing the internet. The Battle of Waterloo happening in 1820. A chemical compound having properties it doesn't have.

These are often the most dangerous because they're embedded in otherwise accurate content, making them hard to catch.

### Entity Invention

Sometimes AI doesn't just get facts wrong—it invents entire entities. Fake people with plausible-sounding names. Fake research papers with fake authors. Fake companies, fake products, fake events.

The lawyer case is an example: those weren't real cases with wrong details; they were entirely fabricated cases that never existed. The AI invented everything from scratch.

### Source Fabrication

Related to entity invention, but specifically about citations and references. The AI will often generate what looks like a real citation—author names, titles, publication names, even URLs—but when you check, the source doesn't exist.

I've personally encountered this many times. The citation format looks perfect. The journal name sounds real. But the paper was never written. This is particularly insidious because proper citations are supposed to signal credibility.

### Contradiction

Sometimes the AI contradicts itself within the same response. It might say X in paragraph two and not-X in paragraph five, with no awareness of the inconsistency.

This tends to happen more with longer responses and reflects the model's lack of global reasoning about what it's saying.

### Context Drift

In extended conversations, the model can lose track of earlier context and generate information that contradicts or ignores what was established before. This often manifests as subtle inconsistencies that accumulate over time.

### Multimodal Hallucinations

When AI systems process images and text together, they can hallucinate about visual content. Early Sora videos showed impossible physics. Vision models misread financial tables or fabricate details about images.

These are particularly tricky because you're often using AI specifically to analyze content you can't fully verify yourself.

## Which AI Models Hallucinate the Most?

All LLMs hallucinate to some degree—it's inherent to how they work. But some do it more than others, and the differences might surprise you.

### The Major Players

The leading models from OpenAI, Anthropic, and Google (GPT-5.x, Claude Opus 4.x, Gemini 3.x) generally perform better on factual tasks than their predecessors. They've been specifically trained for accuracy and have more sophisticated training techniques.

But "better" is relative. Even the best models still have meaningful hallucination rates on complex tasks. Progress is real, but it's slower than marketing materials suggest.

### The Counterintuitive Finding

Here's something that caught my attention: some newer "cutting-edge" models actually hallucinate MORE than older ones.

According to research published in 2025, models like OpenAI's o3 and o4-mini, and DeepSeek's R1, have shown hallucination rates of 30-50%—significantly higher than some earlier models.

Why? These are "reasoning" models designed to work through complex problems step by step. But that chain-of-thought process can introduce cascading errors. Each reasoning step is an opportunity for fabrication, and errors compound.

This is a great example of why "newer" doesn't automatically mean "more reliable." Different models have different strengths and weaknesses. The flashiest capabilities don't always correlate with the most accurate outputs.

### Task Matters More Than Model

Honestly, the specific task affects hallucination rates more than which model you use. All models do better on:
- Questions with clear, factual answers
- Topics well-represented in training data
- Shorter responses
- Domains they've been specifically fine-tuned for

All models do worse on:
- Questions requiring specialized knowledge
- Recent events (after knowledge cutoff)
- Longer, more complex responses
- Tasks requiring synthesis of multiple sources

The best model for accuracy depends on your specific use case, not on marketing claims about capability.

## How to Prevent AI Hallucinations

You can't eliminate hallucinations entirely, but you can significantly reduce them. Here's what actually works based on research and practical experience.

### Better Prompting Techniques

How you ask matters. A lot.

**Be specific and clear.** Vague prompts invite creative interpretation. Instead of "tell me about AI ethics," try "summarize the main arguments in the EU AI Act regarding transparency requirements."

**Ask for uncertainty.** Explicitly instruct the AI to indicate when it's unsure: "If you're not confident about information, say 'I'm uncertain about this.'" Studies show this simple instruction can reduce hallucinations by around 52%.

**Specify knowledge boundaries.** Tell the AI about its limitations: "Only share information you're confident was accurate before your knowledge cutoff. If you can't verify recent developments, say so." This reportedly eliminates 89% of fabricated recent information.

**Request step-by-step reasoning.** Chain-of-thought prompting—asking the model to work through problems step by step—improves accuracy by about 35% for reasoning tasks. This works because it forces the model to show its work, making errors more visible.

### Retrieval-Augmented Generation (RAG)

This is a technical approach, but it's important to understand because it's the most effective way to reduce hallucinations.

RAG connects the AI to external verified knowledge sources—databases, documents, real-time information. Instead of relying just on its training, the model retrieves relevant facts and uses them to generate responses.

Research shows that RAG combined with proper guardrails can reduce hallucination rates by up to 96%. If you're building AI applications for business, RAG should be your default architecture.

For personal use, you can achieve similar effects by providing context. Instead of asking "What's the current price of X stock?" (hallucination-prone), paste in the actual data and ask the AI to analyze it (much more accurate).

### Always Verify

This is the simplest and most important advice: **never trust AI-generated facts without verification.**

This doesn't mean AI is useless for research—it's incredibly helpful for finding starting points, generating ideas, and exploring topics. But treat it like a helpful but unreliable colleague. They might give you great leads, but you verify everything before acting on it.

Develop a habit:
- Cross-reference claims with authoritative sources
- Check that citations actually exist and say what the AI claims
- Be especially skeptical of specific numbers, dates, and names
- The more specific the claim, the more likely it needs verification

### Use the Right Tool for the Job

Sometimes the answer is to not use a general-purpose LLM.

For factual questions, search engines with AI features (like Perplexity) that cite sources are more reliable than chat-based models.

For specialized domains, fine-tuned models trained on verified data perform better than generalist models.

For anything consequential, human review should be non-negotiable. 76% of enterprises now use human-in-the-loop processes to catch hallucinations before they cause problems.

## Will AI Ever Stop Hallucinating?

Here's the honest answer: probably not entirely.

Some researchers are optimistic. Techniques like RAG, better training methods, and hybrid approaches combining neural networks with symbolic AI could dramatically reduce hallucinations. There's real progress being made.

But I'm skeptical that hallucinations will ever completely disappear from LLMs. Here's why:

The fundamental issue is architectural. LLMs predict probable token sequences. They don't have an internal mechanism for verifying truth. You can add external verification systems (like RAG), but the core model will always be generating based on patterns, not facts.

Making models "know" what they don't know is really hard. The model's confidence isn't calibrated to accuracy—it's calibrated to what sounds confident. Training models to express appropriate uncertainty has proven difficult.

There's a tension between capability and reliability. We want AI that can answer questions, generate creative content, and handle open-ended tasks. But the same flexibility that enables these capabilities also enables hallucinations. A model that refuses to answer anything it's uncertain about wouldn't be very useful.

My prediction? We'll see continued improvement, especially in specialized applications. RAG and hybrid approaches will make business applications much more reliable. Consumer-facing models will get better at flagging uncertainty.

But some rate of fabrication is probably inherent to the technology. The question isn't "will AI ever be perfectly reliable?" but "what error rate is acceptable for this use case, and how do we mitigate the remaining risk?"

## Frequently Asked Questions

### Why can't AI just tell me when it's not sure?

LLMs don't actually have a concept of certainty. They generate tokens based on probability, but they don't track how reliable that probability is. The "confidence" you perceive is just the model generating text that sounds confident—it's not a reflection of actual certainty about accuracy.

Researchers are working on methods to detect AI uncertainty, but it's a hard problem because certainty isn't an intrinsic part of how these models work.

### Is one AI less prone to hallucinations than others?

Generally, the major models (GPT-5.x, Claude Opus 4.x, Gemini 3.x) perform similarly on most tasks, with some variation by domain. Models specifically fine-tuned for accuracy or particular domains tend to do better in those areas.

The task matters more than the model. All models hallucinate more on complex, specialized, or recent topics.

### Can I trust AI for research?

AI is useful for research as a starting point, not as a final source. Use it to generate ideas, find topics to explore, and get initial drafts. Then verify everything against primary sources.

Never cite AI-generated information directly without checking that the facts, quotes, and sources are real.

### What should I do if I notice an AI hallucinating?

Note it for your own reference, but don't expect feedback to fix the model. If it's a commercial product, you might report it, but the model you're interacting with doesn't learn from your feedback in real time.

The best response is to verify anything that matters, regardless of whether you notice obvious errors.

### Are AI hallucinations getting worse or better over time?

Mixed picture. The base rate of hallucinations in top-tier models has generally improved over time. But new "reasoning" models have introduced new types of errors, and the overall volume of AI-generated content means more total fabrications are in circulation.

For most use cases, the trend is positive, but progress is slower than marketing materials suggest.

### Can hallucinations cause legal liability?

Yes, as the Air Canada case showed. Courts have held companies responsible for information provided by their AI systems, even when that information was hallucinated. If you're deploying AI in customer-facing or business-critical contexts, verification is a legal necessity, not just a best practice.

## The Bottom Line

AI hallucinations aren't a temporary bug that will be fixed in the next update. They're a fundamental characteristic of how large language models work—a consequence of systems that predict probable text rather than retrieving verified facts.

The statistics are sobering: meaningful hallucination rates even in top models, billions lost in stock value from single errors, professionals sanctioned for citing fabricated sources.

But the answer isn't to stop using AI. It's to use AI appropriately—as a powerful assistant that generates ideas, drafts, and starting points, not as an oracle of truth.

Develop verification habits. Use [prompt engineering techniques](/blog/prompt-engineering-beginners-guide) that reduce errors. For critical applications, implement RAG and human review. And always remember that sounding confident doesn't mean being correct.

AI can hallucinate about anything—including the [tips and tricks for using it effectively](/blog/chatgpt-tips-and-tricks). Trust but verify isn't just good advice. With AI, it's essential.

Understanding hallucinations is part of understanding [AI's limitations and biases](/blog/ai-bias-explained). The technology is powerful, but it's not magical. And treating it as an infallible source is a mistake that keeps costing people—sometimes money, sometimes reputations, and potentially worse.

Stay skeptical. Verify what matters. And use these remarkable tools for what they're good at while protecting yourself from what they're not.
