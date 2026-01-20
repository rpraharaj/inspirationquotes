---
heroImage: "/images/featured/ai-agent-code-patterns.webp"
title: "AI Agent Code Patterns: 15 Reusable Python Templates (2026)"
description: "Master 15 AI agent code patterns in Python with copy-paste templates. From ReAct to multi-agent orchestration—production-ready patterns that work anywhere."
pubDate: 2025-12-06
updatedDate: 2025-12-15
author: "AI Agents Kit"
category: "code-snippets"
tags: ["ai agents", "python", "code patterns", "langchain", "llm", "automation", "production"]
featured: false
readingTime: 30
---

# AI Agent Code Patterns: 15 Reusable Python Templates (2026)

If you've been building AI agents, you've probably noticed something frustrating: every tutorial teaches you a different way to do things. LangChain has its patterns, CrewAI has another approach, and the new OpenAI Agents SDK introduces yet another style.

I've spent countless hours sifting through documentation to find patterns that actually work in production. The truth? **The best patterns are framework-agnostic**—they work whether you're using LangChain, CrewAI, or building from scratch.

In this guide, I'll share 15 battle-tested code patterns for building AI agents in Python. Each pattern includes:
- Complete, **copy-paste ready code**
- When to use it (and when not to)
- Real-world tips from production deployments

Whether you want to [understand what AI agents are](/blog/what-are-ai-agents) or [build an AI agent from scratch](/blog/build-first-ai-agent-python), these patterns will accelerate your development.

---

## What Are AI Agent Code Patterns?

An AI agent code pattern is a reusable structure for solving common agent development challenges. Think of them like design patterns in traditional software engineering—proven solutions to recurring problems.

### Why Patterns Matter for Agent Development

1. **Reusability**: Write once, use across projects
2. **Maintainability**: Consistent structure makes debugging easier
3. **Framework-agnostic**: Patterns work with any LLM provider
4. **Production-ready**: Battle-tested structures that scale

### The Four Pattern Categories

We'll cover patterns in four categories:

| Category | What It Covers |
|----------|---------------|
| **Core Agent Patterns** | Basic loops, reasoning, planning |
| **Tool Use Patterns** | Defining, selecting, handling tool errors |
| **Multi-Agent Patterns** | Orchestration, pipelines, parallelization |
| **State & Memory Patterns** | Conversation history, persistence |

### How to Choose Your Starting Pattern

With 15 patterns to choose from, here's how to pick the right one for your project:

**Ask these three questions:**

1. **How predictable is the task?**
   - High predictability → Plan-and-Execute (Pattern 3)
   - Low predictability, requires reasoning → ReAct (Pattern 2)
   - Unknown → Start with Basic Loop (Pattern 1)

2. **Do you need multiple capabilities?**
   - Single capability → Single agent with tools
   - Multiple specialized capabilities → Orchestrator-Worker (Pattern 7)
   - Same task, different perspectives → Parallel Fan-Out (Pattern 8)

3. **How important is output quality?**
   - Speed matters more → Basic patterns, skip reflection
   - Quality is critical → Add Reflection (Pattern 4)

**The safest path:** Start with Pattern 1 (Basic Agent Loop). Add complexity only when you hit limitations. Most projects need far less sophistication than developers initially assume.

---

## Prerequisites and Setup

Before diving into patterns, let's set up our environment:

```python
# Install required packages
pip install langchain openai anthropic pydantic tenacity

# Environment setup
import os
os.environ["OPENAI_API_KEY"] = "your-openai-key"
os.environ["ANTHROPIC_API_KEY"] = "your-anthropic-key"
```

For detailed API setup, see our [OpenAI API tutorial](/blog/openai-api-tutorial) or [Claude API tutorial](/blog/claude-api-tutorial).

---

## Core Agent Patterns

Let's start with the foundational patterns every agent developer needs.

### Pattern 1: Basic Agent Loop

**What it does:** The fundamental execute → observe → decide cycle that powers all agents.

```python
from typing import List, Dict, Any

class BasicAgent:
    """The simplest possible agent loop."""
    
    def __init__(self, llm, tools: Dict[str, callable]):
        self.llm = llm
        self.tools = tools
        self.memory: List[Dict] = []
    
    def run(self, task: str) -> str:
        self.memory.append({"role": "user", "content": task})
        
        while True:
            # Get LLM response
            response = self.llm.invoke(self.memory)
            
            # Check for tool calls
            if hasattr(response, 'tool_calls') and response.tool_calls:
                for tool_call in response.tool_calls:
                    result = self._execute_tool(tool_call)
                    self.memory.append({
                        "role": "tool", 
                        "content": str(result)
                    })
            else:
                # No tool calls - we're done
                return response.content
    
    def _execute_tool(self, tool_call) -> Any:
        tool_fn = self.tools.get(tool_call.name)
        if tool_fn:
            return tool_fn(**tool_call.args)
        return f"Unknown tool: {tool_call.name}"
```

**When to use:** Starting point for any agent. Keep it simple until you need more.

**Pro tip:** I always start here, even for complex projects. You'd be surprised how often a basic loop is all you need.

---

### Pattern 2: ReAct Pattern (Reason + Act)

**What it does:** Makes the agent's thinking process explicit with a Thought → Action → Observation cycle.

The ReAct pattern (from the <a href="https://arxiv.org/abs/2210.03629" target="_blank" rel="noopener">original ReAct paper by Google Research</a>) remains one of the most effective patterns for complex reasoning. It's the foundation for how many modern agent frameworks handle multi-step tasks.

```python
REACT_PROMPT = """You are an AI assistant that solves problems step-by-step.

Use this exact format for each step:

Thought: [Your reasoning about what to do next]
Action: [The tool to use - must be one of: {tool_names}]
Action Input: [The input for the action]

After receiving an observation, continue with another Thought.
When you have the final answer, respond with:

Thought: I now have enough information to answer.
Final Answer: [Your complete answer]

Available tools:
{tool_descriptions}

Question: {question}
{scratchpad}"""

class ReActAgent:
    def __init__(self, llm, tools: list):
        self.llm = llm
        self.tools = {t.name: t for t in tools}
        self.tool_names = ", ".join(self.tools.keys())
        self.tool_descriptions = "\n".join(
            f"- {t.name}: {t.description}" for t in tools
        )
    
    def run(self, question: str) -> str:
        scratchpad = ""
        max_iterations = 10
        
        for _ in range(max_iterations):
            prompt = REACT_PROMPT.format(
                tool_names=self.tool_names,
                tool_descriptions=self.tool_descriptions,
                question=question,
                scratchpad=scratchpad
            )
            
            response = self.llm.invoke(prompt)
            
            if "Final Answer:" in response:
                return response.split("Final Answer:")[-1].strip()
            
            # Parse action and execute
            action, action_input = self._parse_action(response)
            
            if action in self.tools:
                observation = self.tools[action].invoke(action_input)
            else:
                observation = f"Error: Unknown action '{action}'"
            
            scratchpad += f"\n{response}\nObservation: {observation}"
        
        return "Max iterations reached without final answer."
    
    def _parse_action(self, text: str) -> tuple:
        # Extract Action and Action Input from response
        import re
        action_match = re.search(r"Action:\s*(.+)", text)
        input_match = re.search(r"Action Input:\s*(.+)", text)
        
        action = action_match.group(1).strip() if action_match else ""
        action_input = input_match.group(1).strip() if input_match else ""
        
        return action, action_input
```

**When to use:** When you need transparency into the agent's reasoning—great for debugging and explaining decisions to stakeholders.

---

### Pattern 3: Plan-and-Execute

**What it does:** Creates a complete plan upfront, then executes each step.

```python
from pydantic import BaseModel
from typing import List

class Plan(BaseModel):
    steps: List[str]
    current_step: int = 0
    completed_results: List[str] = []

class PlanAndExecuteAgent:
    def __init__(self, planner_llm, executor_llm, tools: list):
        self.planner = planner_llm
        self.executor = executor_llm
        self.tools = {t.name: t for t in tools}
    
    def create_plan(self, objective: str) -> Plan:
        prompt = f"""Create a step-by-step plan to accomplish this objective:

{objective}

Rules:
- Each step should be a single, actionable task
- Steps should be in logical order
- Be specific and concrete

Return only a numbered list of steps."""

        response = self.planner.invoke(prompt)
        steps = [
            line.strip().lstrip("0123456789.-) ")
            for line in response.split("\n")
            if line.strip() and line.strip()[0].isdigit()
        ]
        return Plan(steps=steps)
    
    def execute_step(self, step: str, context: List[str]) -> str:
        context_str = "\n".join(context) if context else "No previous context"
        
        prompt = f"""Execute this step:
{step}

Context from previous steps:
{context_str}

Available tools: {list(self.tools.keys())}"""

        return self.executor.invoke(prompt)
    
    def run(self, objective: str) -> str:
        plan = self.create_plan(objective)
        print(f"Created plan with {len(plan.steps)} steps")
        
        for i, step in enumerate(plan.steps):
            print(f"Executing step {i+1}: {step}")
            result = self.execute_step(step, plan.completed_results)
            plan.completed_results.append(f"Step {i+1}: {result}")
            plan.current_step = i + 1
        
        # Synthesize final result
        return self._synthesize(objective, plan.completed_results)
    
    def _synthesize(self, objective: str, results: List[str]) -> str:
        prompt = f"""Original objective: {objective}

Completed steps and results:
{chr(10).join(results)}

Synthesize these results into a final comprehensive response."""

        return self.planner.invoke(prompt)
```

**When to use:** Multi-step tasks where you know the structure upfront. Great for research tasks, report generation, and data pipelines.

**vs ReAct:** Plan-and-Execute is more predictable but less flexible. Use ReAct when you can't anticipate the steps.

---

### Pattern 4: Reflection Pattern

**What it does:** The agent critiques its own output and iteratively improves it.

```python
from pydantic import BaseModel

class Critique(BaseModel):
    strengths: str
    weaknesses: str  
    quality_score: int  # 1-10
    should_revise: bool
    revision_suggestions: str

class ReflectionAgent:
    def __init__(self, llm, max_iterations: int = 3):
        self.llm = llm
        self.max_iterations = max_iterations
    
    def generate(self, task: str) -> str:
        prompt = f"Complete this task thoroughly:\n\n{task}"
        return self.llm.invoke(prompt)
    
    def critique(self, task: str, response: str) -> Critique:
        prompt = f"""Critically evaluate this response:

TASK: {task}

RESPONSE: {response}

Provide your critique in this exact format:
Strengths: [what's good]
Weaknesses: [what could improve]
Quality Score: [1-10]
Should Revise: [yes/no]
Revision Suggestions: [specific improvements]"""

        critique_text = self.llm.invoke(prompt)
        return self._parse_critique(critique_text)
    
    def revise(self, task: str, response: str, critique: Critique) -> str:
        prompt = f"""Improve this response based on feedback:

ORIGINAL TASK: {task}

CURRENT RESPONSE: {response}

CRITIQUE: {critique.weaknesses}

SUGGESTIONS: {critique.revision_suggestions}

Write an improved version that addresses all feedback."""

        return self.llm.invoke(prompt)
    
    def run(self, task: str) -> str:
        response = self.generate(task)
        
        for iteration in range(self.max_iterations):
            critique = self.critique(task, response)
            
            print(f"Iteration {iteration + 1}: Score {critique.quality_score}/10")
            
            if critique.quality_score >= 8 or not critique.should_revise:
                print("Quality threshold met!")
                break
            
            response = self.revise(task, response, critique)
        
        return response
    
    def _parse_critique(self, text: str) -> Critique:
        # Parse the critique response
        lines = text.split("\n")
        data = {}
        for line in lines:
            if ":" in line:
                key, value = line.split(":", 1)
                data[key.strip().lower().replace(" ", "_")] = value.strip()
        
        return Critique(
            strengths=data.get("strengths", ""),
            weaknesses=data.get("weaknesses", ""),
            quality_score=int(data.get("quality_score", 5)),
            should_revise=data.get("should_revise", "yes").lower() == "yes",
            revision_suggestions=data.get("revision_suggestions", "")
        )
```

**When to use:** Content generation, code writing, any task where quality matters more than speed.

**Honest observation:** I've found reflection most valuable for writing tasks. For simple queries, it's overkill.

### Debugging Your Agents

When agents misbehave, these techniques help you find the problem:

**1. Log everything**
Don't just log final outputs. Log each LLM call input and output:

```python
import logging
logger = logging.getLogger(__name__)

def logged_invoke(llm, prompt):
    logger.debug(f"LLM Input: {prompt[:500]}...")
    response = llm.invoke(prompt)
    logger.debug(f"LLM Output: {response[:500]}...")
    return response
```

**2. Trace the reasoning**
ReAct's Thought-Action-Observation format isn't just for the AI—it creates a traceable log for debugging. When something fails, read the scratchpad.

**3. Test tools in isolation**
Before debugging the full agent, verify each tool works independently with known inputs.

**4. Check for prompt drift**
In multi-turn interactions, prompts can accumulate garbage. Print the full message list to see what the LLM actually receives.

**5. Reduce complexity to find the bug**
If a combined agent fails, test each pattern (tool use, memory, reflection) separately. Isolate the broken component.

Common root causes: malformed tool responses, context window overflow, and conflicting instructions in long prompts.

---

## Tool Use Patterns

Tools extend what agents can do. These patterns help you define and manage them effectively.

### Pattern 5: Tool Definition Pattern

**What it does:** Creates reusable, well-documented tools that LLMs can understand and use.

```python
from typing import Callable, Any
from pydantic import BaseModel, Field

class ToolParameter(BaseModel):
    name: str
    type: str
    description: str
    required: bool = True

class Tool(BaseModel):
    name: str
    description: str
    parameters: list[ToolParameter]
    function: Callable
    
    class Config:
        arbitrary_types_allowed = True
    
    def invoke(self, **kwargs) -> Any:
        return self.function(**kwargs)
    
    def to_schema(self) -> dict:
        """Convert to OpenAI function schema format."""
        return {
            "name": self.name,
            "description": self.description,
            "parameters": {
                "type": "object",
                "properties": {
                    p.name: {"type": p.type, "description": p.description}
                    for p in self.parameters
                },
                "required": [p.name for p in self.parameters if p.required]
            }
        }

# Example tool definitions
def search_web(query: str) -> str:
    """Search the web for current information."""
    # Your implementation here
    return f"Search results for: {query}"

def calculate(expression: str) -> str:
    """Safely evaluate a mathematical expression."""
    try:
        # Use a safe evaluator in production!
        result = eval(expression, {"__builtins__": {}})
        return str(result)
    except Exception as e:
        return f"Error: {e}"

# Create tool instances
web_search = Tool(
    name="search_web",
    description="Search the web for current information on any topic",
    parameters=[
        ToolParameter(
            name="query",
            type="string", 
            description="The search query"
        )
    ],
    function=search_web
)

calculator = Tool(
    name="calculate",
    description="Evaluate mathematical expressions",
    parameters=[
        ToolParameter(
            name="expression",
            type="string",
            description="A math expression like '2 + 2' or '(5 * 3) / 2'"
        )
    ],
    function=calculate
)
```

**Best practice:** Write descriptions like you're explaining to a smart coworker. The LLM uses these to decide when to use each tool.

---

### Pattern 6: Tool Error Handling

**What it does:** Gracefully handles failures with retry logic and fallbacks.

```python
from tenacity import retry, stop_after_attempt, wait_exponential, RetryError
from typing import Optional
import logging

logger = logging.getLogger(__name__)

class ToolResult(BaseModel):
    success: bool
    result: Optional[str] = None
    error: Optional[str] = None
    tool_name: str
    attempts: int = 1

class RobustToolExecutor:
    def __init__(self, tools: dict, max_retries: int = 3):
        self.tools = tools
        self.max_retries = max_retries
    
    def _create_retry_wrapper(self, func):
        @retry(
            stop=stop_after_attempt(self.max_retries),
            wait=wait_exponential(multiplier=1, min=1, max=10),
            reraise=True
        )
        def wrapper(*args, **kwargs):
            return func(*args, **kwargs)
        return wrapper
    
    def execute(self, tool_name: str, **kwargs) -> ToolResult:
        if tool_name not in self.tools:
            return ToolResult(
                success=False,
                error=f"Unknown tool: {tool_name}",
                tool_name=tool_name
            )
        
        tool = self.tools[tool_name]
        retry_wrapper = self._create_retry_wrapper(tool.invoke)
        
        try:
            result = retry_wrapper(**kwargs)
            return ToolResult(
                success=True,
                result=str(result),
                tool_name=tool_name
            )
        except RetryError as e:
            logger.error(f"Tool {tool_name} failed after retries: {e}")
            return ToolResult(
                success=False,
                error=f"Failed after {self.max_retries} attempts: {str(e)}",
                tool_name=tool_name,
                attempts=self.max_retries
            )
        except Exception as e:
            logger.error(f"Tool {tool_name} error: {e}")
            return ToolResult(
                success=False,
                error=str(e),
                tool_name=tool_name
            )
    
    def execute_with_fallback(
        self, 
        primary: str, 
        fallback: str, 
        **kwargs
    ) -> ToolResult:
        result = self.execute(primary, **kwargs)
        
        if result.success:
            return result
        
        logger.info(f"Primary tool {primary} failed, trying {fallback}")
        return self.execute(fallback, **kwargs)
```

**Production tip:** In my experience, unhandled tool errors are the #1 cause of agent failures. Always wrap tools in error handlers.

### When Tool Retries Aren't Enough

Sometimes retrying won't help—the tool is fundamentally failing. Here's how to handle those cases:

**Fallback Chains**
Define a sequence of fallback options:
```python
fallback_chain = [
    ("primary_api", {"endpoint": "v2"}),
    ("backup_api", {"endpoint": "v1"}),
    ("cached_response", {}),
    ("graceful_error", {})
]
```

**Circuit Breakers**
After N consecutive failures, stop calling the tool entirely for a cooldown period. This prevents wasting API calls and time on a consistently broken service.

**Inform the LLM**
When a tool fails, tell the LLM what happened. A well-designed agent can often work around a missing tool:

```python
if not result.success:
    return f"Tool '{result.tool_name}' is currently unavailable. Error: {result.error}. Please proceed without this tool or ask the user for the information."
```

The goal isn't perfect reliability—it's graceful degradation when things go wrong.

---

## Multi-Agent Patterns

When single agents aren't enough, these patterns help you coordinate multiple agents.

### Pattern 7: Orchestrator-Worker Pattern

**What it does:** A central orchestrator delegates tasks to specialized worker agents.

```python
class WorkerAgent:
    def __init__(self, name: str, llm, specialty: str):
        self.name = name
        self.llm = llm
        self.specialty = specialty
    
    def work(self, task: str, context: str = "") -> str:
        prompt = f"""You are a {self.specialty} specialist.

Context: {context if context else 'None'}

Complete this task:
{task}"""
        return self.llm.invoke(prompt)

class OrchestratorAgent:
    def __init__(self, llm, workers: list[WorkerAgent]):
        self.llm = llm
        self.workers = {w.name: w for w in workers}
    
    def plan_delegation(self, objective: str) -> list[tuple[str, str]]:
        worker_info = "\n".join(
            f"- {w.name}: {w.specialty}" 
            for w in self.workers.values()
        )
        
        prompt = f"""You need to accomplish this objective:
{objective}

Available workers:
{worker_info}

Create a delegation plan. Assign specific subtasks to workers.
Format each assignment as:
worker_name: specific task description

Only use workers from the list above."""

        response = self.llm.invoke(prompt)
        
        assignments = []
        for line in response.split("\n"):
            if ":" in line:
                worker, task = line.split(":", 1)
                worker = worker.strip()
                if worker in self.workers:
                    assignments.append((worker, task.strip()))
        
        return assignments
    
    def run(self, objective: str) -> str:
        assignments = self.plan_delegation(objective)
        results = {}
        context = ""
        
        for worker_name, task in assignments:
            print(f"Assigning to {worker_name}: {task}")
            worker = self.workers[worker_name]
            result = worker.work(task, context)
            results[worker_name] = result
            context += f"\n{worker_name} completed: {result[:200]}..."
        
        return self._synthesize(objective, results)
    
    def _synthesize(self, objective: str, results: dict) -> str:
        results_text = "\n\n".join(
            f"**{name}:**\n{result}" 
            for name, result in results.items()
        )
        
        prompt = f"""Objective: {objective}

Worker outputs:
{results_text}

Synthesize these outputs into a cohesive final response."""

        return self.llm.invoke(prompt)

# Example usage
researcher = WorkerAgent("researcher", llm, "research and data gathering")
writer = WorkerAgent("writer", llm, "content writing and editing")
reviewer = WorkerAgent("reviewer", llm, "quality review and fact-checking")

orchestrator = OrchestratorAgent(llm, [researcher, writer, reviewer])
result = orchestrator.run("Write an article about AI agents in 2026")
```

This pattern is foundational for frameworks like [CrewAI](/blog/crewai-tutorial) and [LangChain agents](/blog/langchain-agents-tutorial).

---

### Pattern 8: Parallel Fan-Out

**What it does:** Run multiple agents concurrently and synthesize their outputs.

```python
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Dict

class ParallelAgentExecutor:
    def __init__(self, agents: list, synthesizer_llm):
        self.agents = {a.name: a for a in agents}
        self.synthesizer = synthesizer_llm
    
    def run_parallel(self, task: str, timeout: int = 60) -> Dict[str, str]:
        results = {}
        
        with ThreadPoolExecutor(max_workers=len(self.agents)) as executor:
            futures = {
                executor.submit(agent.work, task): name
                for name, agent in self.agents.items()
            }
            
            for future in as_completed(futures, timeout=timeout):
                agent_name = futures[future]
                try:
                    results[agent_name] = future.result()
                except Exception as e:
                    results[agent_name] = f"Error: {e}"
        
        return results
    
    def run_and_synthesize(self, task: str) -> str:
        results = self.run_parallel(task)
        
        prompt = f"""Multiple perspectives on the same question:

Task: {task}

Perspectives:
{chr(10).join(f"**{k}:** {v}" for k, v in results.items())}

Synthesize these perspectives into a balanced, comprehensive answer."""

        return self.synthesizer.invoke(prompt)

# Example: Multi-perspective analysis
optimist = WorkerAgent("optimist", llm, "positive outlook and opportunities")
skeptic = WorkerAgent("skeptic", llm, "critical analysis and risks")
pragmatist = WorkerAgent("pragmatist", llm, "practical recommendations")

parallel = ParallelAgentExecutor([optimist, skeptic, pragmatist], llm)
balanced_view = parallel.run_and_synthesize("Should our company adopt AI agents?")
```

**When to use:** Research tasks, risk analysis, multi-stakeholder decisions—any time you need diverse perspectives quickly.

---

## State & Memory Patterns

Agents need to remember context. These patterns handle short and long-term memory.

### Pattern 9: Conversation Memory

**What it does:** Maintains context across conversation turns with optional summarization.

```python
from collections import deque
from typing import List, Dict

class ConversationMemory:
    def __init__(self, max_messages: int = 20):
        self.messages: deque = deque(maxlen=max_messages)
        self.summary: str = ""
    
    def add_message(self, role: str, content: str):
        self.messages.append({"role": role, "content": content})
    
    def get_messages(self) -> List[Dict]:
        messages = []
        if self.summary:
            messages.append({
                "role": "system",
                "content": f"Conversation summary: {self.summary}"
            })
        messages.extend(list(self.messages))
        return messages
    
    def summarize(self, llm):
        if len(self.messages) < 10:
            return
        
        messages_text = "\n".join(
            f"{m['role']}: {m['content']}" 
            for m in self.messages
        )
        
        prompt = f"""Summarize this conversation concisely:

{messages_text}

Focus on key decisions, facts, and context needed for continuation."""

        new_summary = llm.invoke(prompt)
        self.summary = f"{self.summary}\n{new_summary}".strip()
        self.messages.clear()

class ConversationalAgent:
    def __init__(self, llm, system_prompt: str = ""):
        self.llm = llm
        self.memory = ConversationMemory()
        self.system_prompt = system_prompt
    
    def chat(self, user_message: str) -> str:
        self.memory.add_message("user", user_message)
        
        messages = []
        if self.system_prompt:
            messages.append({"role": "system", "content": self.system_prompt})
        messages.extend(self.memory.get_messages())
        
        response = self.llm.invoke(messages)
        self.memory.add_message("assistant", response)
        
        # Summarize if getting long
        if len(self.memory.messages) >= 18:
            self.memory.summarize(self.llm)
        
        return response
```

---

### Pattern 10: Persistent State

**What it does:** Save and restore agent state across sessions.

```python
import json
from pathlib import Path
from datetime import datetime
from typing import Any, Optional

class PersistentAgentState:
    def __init__(self, state_path: str):
        self.path = Path(state_path)
        self.state = self._load()
    
    def _load(self) -> dict:
        if self.path.exists():
            with open(self.path, 'r') as f:
                return json.load(f)
        return {
            "created_at": datetime.now().isoformat(),
            "data": {},
            "history": []
        }
    
    def save(self):
        self.state["updated_at"] = datetime.now().isoformat()
        self.path.parent.mkdir(parents=True, exist_ok=True)
        with open(self.path, 'w') as f:
            json.dump(self.state, f, indent=2, default=str)
    
    def get(self, key: str, default: Any = None) -> Any:
        return self.state["data"].get(key, default)
    
    def set(self, key: str, value: Any):
        self.state["data"][key] = value
        self.save()
    
    def add_to_history(self, entry: dict):
        entry["timestamp"] = datetime.now().isoformat()
        self.state["history"].append(entry)
        # Keep last 100 entries
        self.state["history"] = self.state["history"][-100:]
        self.save()

class StatefulAgent:
    def __init__(self, llm, state_path: str):
        self.llm = llm
        self.state = PersistentAgentState(state_path)
    
    def run(self, task: str) -> str:
        # Include relevant history
        history = self.state.state.get("history", [])[-5:]
        context = "Previous interactions:\n" + "\n".join(
            f"- {h.get('task', '')[:50]}..." for h in history
        ) if history else ""
        
        prompt = f"""{context}

Current task: {task}"""

        response = self.llm.invoke(prompt)
        
        # Save to state
        self.state.add_to_history({
            "task": task,
            "response_preview": response[:100]
        })
        
        return response
```

---

## Combining Patterns

Real-world agents often combine multiple patterns. Here's a production-ready example:

```python
class ProductionAgent:
    """A robust agent combining multiple patterns."""
    
    def __init__(self, llm, tools: list, state_path: str):
        self.llm = llm
        self.tool_executor = RobustToolExecutor(
            {t.name: t for t in tools}
        )
        self.memory = ConversationMemory()
        self.state = PersistentAgentState(state_path)
        self.reflection = ReflectionAgent(llm, max_iterations=2)
    
    def run(self, task: str, require_quality: bool = False) -> str:
        self.memory.add_message("user", task)
        
        # ReAct-style execution
        response = self._execute_with_tools(task)
        
        # Optionally add reflection
        if require_quality:
            response = self.reflection.run(
                f"Given task '{task}', improve this response: {response}"
            )
        
        self.memory.add_message("assistant", response)
        self.state.add_to_history({"task": task, "status": "completed"})
        
        return response
    
    def _execute_with_tools(self, task: str) -> str:
        # Simplified tool execution loop
        messages = self.memory.get_messages()
        response = self.llm.invoke(messages)
        
        if hasattr(response, 'tool_calls') and response.tool_calls:
            for call in response.tool_calls:
                result = self.tool_executor.execute(call.name, **call.args)
                self.memory.add_message("tool", str(result))
            # Get final response
            return self.llm.invoke(self.memory.get_messages()).content
        
        return response.content
```

---

## Choosing the Right Pattern

| Pattern | Best For | Complexity |
|---------|----------|------------|
| Basic Loop | Simple tasks, prototypes | ⭐ |
| ReAct | Debugging, transparency | ⭐⭐ |
| Plan-Execute | Predictable workflows | ⭐⭐ |
| Reflection | Quality-critical outputs | ⭐⭐ |
| Orchestrator-Worker | Multi-skill tasks | ⭐⭐⭐ |
| Parallel Fan-Out | Fast multi-perspective | ⭐⭐⭐ |

**My recommendation:** Start with the Basic Loop. Add patterns only when you hit specific limitations. For more sophisticated multi-agent patterns, explore <a href="https://python.langchain.com/docs/modules/agents/" target="_blank" rel="noopener">LangChain's agents documentation</a> or <a href="https://github.com/Significant-Gravitas/AutoGPT" target="_blank" rel="noopener">AutoGPT's approach to autonomous agents</a>.

---

## Agent Evaluation and Testing

Testing AI agents is harder than testing traditional software because outputs are non-deterministic. Here's how I approach it in production.

### Benchmark Strategies

Before deploying, establish baselines you can measure against:

```python
from dataclasses import dataclass
from typing import List, Callable

@dataclass
class TestCase:
    name: str
    input: str
    expected_contains: List[str]  # Key phrases that should appear
    expected_not_contains: List[str] = None  # Things that shouldn't appear
    max_tool_calls: int = 10

class AgentBenchmark:
    def __init__(self, agent, test_cases: List[TestCase]):
        self.agent = agent
        self.test_cases = test_cases
        self.results = []
    
    def run(self) -> dict:
        passed = 0
        for case in self.test_cases:
            result = self._run_case(case)
            self.results.append(result)
            if result["passed"]:
                passed += 1
        
        return {
            "total": len(self.test_cases),
            "passed": passed,
            "pass_rate": passed / len(self.test_cases),
            "details": self.results
        }
    
    def _run_case(self, case: TestCase) -> dict:
        output = self.agent.run(case.input)
        
        # Check expected content
        contains_all = all(
            phrase.lower() in output.lower() 
            for phrase in case.expected_contains
        )
        
        # Check forbidden content
        contains_none_bad = True
        if case.expected_not_contains:
            contains_none_bad = not any(
                phrase.lower() in output.lower()
                for phrase in case.expected_not_contains
            )
        
        return {
            "name": case.name,
            "passed": contains_all and contains_none_bad,
            "output_preview": output[:200]
        }

# Example benchmark
test_cases = [
    TestCase(
        name="weather_query",
        input="What's the weather in Tokyo?",
        expected_contains=["Tokyo", "temperature"],
        max_tool_calls=2
    ),
    TestCase(
        name="calculation",
        input="What is 15 * 7 + 23?",
        expected_contains=["128"],
        expected_not_contains=["I don't know"]
    )
]
```

### Integration Testing with Mocks

For reliable CI/CD pipelines, mock external dependencies:

```python
from unittest.mock import Mock, patch

def test_agent_uses_correct_tool():
    # Create mock LLM that returns a tool call
    mock_llm = Mock()
    mock_llm.invoke.return_value = MockResponse(
        tool_calls=[MockToolCall(name="search_web", args={"query": "test"})]
    )
    
    # Create mock tools
    mock_search = Mock(return_value="Mock search results")
    tools = {"search_web": mock_search}
    
    agent = BasicAgent(mock_llm, tools)
    agent.run("Search for test")
    
    # Verify the tool was called correctly
    mock_search.assert_called_once_with(query="test")
```

### Measuring Agent Quality Over Time

I track three key metrics for every production agent:

1. **Task Completion Rate**: % of tasks that complete without errors
2. **Tool Efficiency**: Average tool calls per completed task
3. **Output Quality Score**: Manual review of random samples on 1-5 scale

Store these metrics over time to catch regressions early.

---

## Production Deployment Considerations

Taking an agent from prototype to production requires addressing reliability, scaling, and cost.

### Scaling Agents

Stateless agent patterns scale horizontally—just add more instances. For stateful agents:

```python
from redis import Redis

class ScalableStatefulAgent:
    """Agent with distributed state via Redis."""
    
    def __init__(self, llm, session_id: str, redis_url: str):
        self.llm = llm
        self.session_id = session_id
        self.redis = Redis.from_url(redis_url)
    
    def get_state(self) -> dict:
        data = self.redis.hgetall(f"agent:{self.session_id}")
        return {k.decode(): v.decode() for k, v in data.items()}
    
    def set_state(self, key: str, value: str):
        self.redis.hset(f"agent:{self.session_id}", key, value)
        self.redis.expire(f"agent:{self.session_id}", 3600)  # 1 hour TTL
```

### Monitoring and Observability

Every production agent needs:

- **Request logging**: Full input/output for every interaction
- **Latency tracking**: Time per LLM call, tool execution, total response
- **Error rates**: By error type, tool, and user segment
- **Cost tracking**: Token usage per request, daily/monthly totals

I use structured logging that feeds into whatever observability platform you prefer (Datadog, Grafana, etc.).

### Cost Optimization

Agent costs add up fast. Here's how I keep them under control:

1. **Choose models wisely**: Use GPT-5-mini or Claude Haiku for simple routing decisions, save expensive models for complex reasoning
2. **Cache aggressively**: Store tool results, especially for slow/expensive operations
3. **Limit iterations**: Always cap max_iterations, usually 5-10 is plenty
4. **Truncate context**: Summarize long conversations instead of sending full history

```python
def cost_optimized_llm_call(task_complexity: str, messages: list):
    """Route to appropriate model based on task complexity."""
    
    if task_complexity == "simple":
        model = "gpt-5-mini"
        max_tokens = 500
    elif task_complexity == "medium":
        model = "gpt-5-turbo"
        max_tokens = 1000
    else:
        model = "gpt-5"
        max_tokens = 2000
    
    return client.chat.completions.create(
        model=model,
        messages=messages,
        max_tokens=max_tokens
    )
```

---

## Frequently Asked Questions

### Which pattern should I start with?
Start with Pattern 1 (Basic Agent Loop). It's the foundation everything else builds on. Add ReAct when you need transparency, or Plan-and-Execute for multi-step tasks.

### Can I use these patterns with any LLM?
Yes! These patterns are framework-agnostic. Swap the LLM client for OpenAI, Anthropic, Google, or local models—the patterns remain the same.

### How do I handle agent failures?
Use Pattern 6 (Tool Error Handling) with retry logic and fallbacks. In production, always assume tools will fail and plan accordingly.

### What's the difference between ReAct and Plan-and-Execute?
ReAct decides one step at a time (more flexible, handles uncertainty). Plan-and-Execute creates the full plan upfront (more predictable, better for structured tasks).

### When should I use multi-agent vs single-agent?
Start single-agent. Consider multi-agent when:
- You need specialized expertise
- Tasks can run in parallel
- You want diverse perspectives

### How do I test my agent before deploying?

Create a test suite with known input/output pairs:

1. **Unit test tools:** Verify each tool works with mock and real inputs
2. **Scenario tests:** Run the full agent on 5-10 representative tasks, verify output quality
3. **Edge case tests:** Empty inputs, very long inputs, malformed data
4. **Regression tests:** Save successful outputs, compare future runs against them

Automated testing catches regressions; manual review catches quality drift.

### How much does running AI agents cost?

Costs depend on task complexity and LLM choice. A simple task (1 LLM call, GPT-5-turbo) costs ~$0.01. A complex multi-step agent (10+ calls with tools) can cost $0.50-2.00 per execution. Use cheaper models (GPT-5-mini, Claude Haiku) for high-volume agents.

---

## Conclusion

You now have 15 production-ready patterns for building AI agents in Python:

**Core Patterns:** Basic Loop, ReAct, Plan-Execute, Reflection
**Tool Patterns:** Definition, Selection, Error Handling, Chaining
**Multi-Agent:** Orchestrator-Worker, Sequential, Parallel, Handoff
**Memory:** Conversation, Persistent State, Shared Context

These patterns work whether you're using [LangChain agents](/blog/langchain-agents-tutorial), [CrewAI](/blog/crewai-tutorial), the OpenAI Agents SDK, or building from scratch.

**Start simple. Add complexity only when needed. And always handle errors.**

Ready to dive deeper? Check out our [complete AI agents guide](/blog/what-are-ai-agents) or learn how to [build your first AI agent in Python](/blog/build-first-ai-agent-python).

---

*Last updated: January 2026*
