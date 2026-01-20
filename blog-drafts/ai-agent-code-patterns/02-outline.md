# Content Outline: AI Agent Code Patterns: Reusable Python Templates

**Created:** 2026-01-11
**Based on:** Research Brief (01-research-brief.md)
**Target Word Count:** 4,500+ words
**Format:** Listicle with comprehensive code snippets

---

## SEO Optimized Title Options

1. **AI Agent Code Patterns: 15 Reusable Python Templates (2026)**
2. AI Agent Python Patterns: Copy-Paste Code for Every Use Case
3. 15 AI Agent Code Patterns Every Python Developer Needs

**Selected Title:** AI Agent Code Patterns: 15 Reusable Python Templates (2026)

---

## Meta Description (155 characters)

"Master 15 AI agent code patterns in Python with copy-paste templates. From ReAct to multi-agent orchestration—production-ready patterns that work anywhere."

---

## Heading Structure with Word Allocation

### Introduction (250 words)
- Hook: The patterns that power every major AI agent
- Problem: Scattered documentation, framework-specific code
- Promise: 15 universal patterns that work with any framework
- What reader will learn

---

### H2: What Are AI Agent Code Patterns? (300 words)

**H3: Why Patterns Matter for Agent Development**
- Reusability and maintainability
- Framework-agnostic thinking
- Production readiness

**H3: The Four Pattern Categories**
- Core Agent Patterns
- Tool Use Patterns
- Multi-Agent Patterns
- State & Memory Patterns

---

### H2: Prerequisites and Setup (200 words)

**Required Libraries:**
```python
pip install langchain openai anthropic langgraph
```

**Environment Setup:**
```python
import os
os.environ["OPENAI_API_KEY"] = "your-key"
os.environ["ANTHROPIC_API_KEY"] = "your-key"
```

---

## CORE AGENT PATTERNS

### H2: Pattern 1: Basic Agent Loop (300 words)

**What it does:** The fundamental execute → observe → decide cycle

**Code snippet:**
```python
class BasicAgent:
    def __init__(self, llm, tools):
        self.llm = llm
        self.tools = tools
        self.memory = []
    
    def run(self, task: str) -> str:
        self.memory.append({"role": "user", "content": task})
        
        while True:
            response = self.llm.invoke(self.memory)
            
            if response.tool_calls:
                for tool_call in response.tool_calls:
                    result = self.execute_tool(tool_call)
                    self.memory.append({"role": "tool", "content": result})
            else:
                return response.content
    
    def execute_tool(self, tool_call):
        tool = self.tools[tool_call.name]
        return tool(**tool_call.args)
```

**When to use:** Starting point for any agent project
**Internal link:** Build Your First AI Agent in Python

---

### H2: Pattern 2: ReAct Pattern (Reason + Act) (350 words)

**What it does:** Explicit thought process before each action

**Code snippet:**
```python
REACT_PROMPT = """Answer the question using the following format:

Thought: [Your reasoning about what to do next]
Action: [The action to take - tool name]
Action Input: [Input for the action]
Observation: [Result of the action]
... (repeat Thought/Action/Observation as needed)
Thought: I now have enough information
Final Answer: [Your final answer]

Question: {question}
"""

class ReActAgent:
    def __init__(self, llm, tools):
        self.llm = llm
        self.tools = {t.name: t for t in tools}
    
    def run(self, question: str) -> str:
        prompt = REACT_PROMPT.format(question=question)
        scratchpad = ""
        
        while True:
            response = self.llm.invoke(prompt + scratchpad)
            
            if "Final Answer:" in response:
                return response.split("Final Answer:")[-1].strip()
            
            # Parse and execute action
            action, action_input = self.parse_action(response)
            observation = self.tools[action].invoke(action_input)
            scratchpad += f"\n{response}\nObservation: {observation}"
```

**When to use:** Complex reasoning tasks, debugging transparency
**Opinion:** "I've found ReAct indispensable for tasks where you need to explain the agent's reasoning to stakeholders."

---

### H2: Pattern 3: Plan-and-Execute (350 words)

**What it does:** Create a complete plan first, then execute step-by-step

**Code snippet:**
```python
from typing import List
from pydantic import BaseModel

class Plan(BaseModel):
    steps: List[str]
    current_step: int = 0

class PlanAndExecuteAgent:
    def __init__(self, planner_llm, executor_llm, tools):
        self.planner = planner_llm
        self.executor = executor_llm
        self.tools = tools
    
    def create_plan(self, task: str) -> Plan:
        prompt = f"""Create a step-by-step plan to accomplish:
        {task}
        
        Return a numbered list of steps."""
        response = self.planner.invoke(prompt)
        steps = self.parse_steps(response)
        return Plan(steps=steps)
    
    def execute_plan(self, plan: Plan) -> str:
        results = []
        for i, step in enumerate(plan.steps):
            plan.current_step = i
            result = self.execute_step(step, results)
            results.append(result)
        return self.synthesize_results(results)
    
    def run(self, task: str) -> str:
        plan = self.create_plan(task)
        return self.execute_plan(plan)
```

**When to use:** Multi-step tasks, predictable workflows
**Contrast with ReAct:** Plan-and-Execute is better when you know the structure upfront

---

### H2: Pattern 4: Reflection Pattern (350 words)

**What it does:** Self-critique and improve outputs

**Code snippet:**
```python
class ReflectionAgent:
    def __init__(self, llm, max_iterations: int = 3):
        self.llm = llm
        self.max_iterations = max_iterations
    
    def generate(self, task: str) -> str:
        response = self.llm.invoke(f"Complete this task: {task}")
        return response
    
    def critique(self, task: str, response: str) -> dict:
        critique_prompt = f"""
        Task: {task}
        Response: {response}
        
        Critique this response:
        1. What's good about it?
        2. What could be improved?
        3. Rate quality 1-10
        4. Should we iterate? (yes/no)
        """
        critique = self.llm.invoke(critique_prompt)
        return self.parse_critique(critique)
    
    def revise(self, task: str, response: str, critique: str) -> str:
        revise_prompt = f"""
        Original task: {task}
        Previous response: {response}
        Critique: {critique}
        
        Write an improved response addressing the critique.
        """
        return self.llm.invoke(revise_prompt)
    
    def run(self, task: str) -> str:
        response = self.generate(task)
        
        for i in range(self.max_iterations):
            critique = self.critique(task, response)
            if critique["quality"] >= 8 or not critique["iterate"]:
                break
            response = self.revise(task, response, critique["feedback"])
        
        return response
```

**When to use:** Content generation, code review, quality-critical outputs

---

## TOOL USE PATTERNS

### H2: Pattern 5: Tool Definition Pattern (350 words)

**What it does:** Create reusable, well-documented tools

**Code snippet:**
```python
from typing import Callable
from pydantic import BaseModel, Field

class Tool(BaseModel):
    name: str
    description: str
    parameters: dict
    function: Callable
    
    class Config:
        arbitrary_types_allowed = True
    
    def invoke(self, **kwargs):
        return self.function(**kwargs)

# Example tool definitions
def search_web(query: str) -> str:
    """Search the web for information."""
    # Implementation
    return f"Results for: {query}"

def calculate(expression: str) -> str:
    """Evaluate a mathematical expression."""
    return str(eval(expression))

web_search_tool = Tool(
    name="search_web",
    description="Search the web for current information",
    parameters={
        "query": {"type": "string", "description": "Search query"}
    },
    function=search_web
)

calculator_tool = Tool(
    name="calculate",
    description="Perform mathematical calculations",
    parameters={
        "expression": {"type": "string", "description": "Math expression"}
    },
    function=calculate
)
```

**Best practice:** Always include clear descriptions—the LLM uses these to decide when to use each tool.

---

### H2: Pattern 6: Tool Selection Pattern (300 words)

**What it does:** Let the agent intelligently choose which tool to use

**Code snippet:**
```python
class ToolSelector:
    def __init__(self, llm, tools: list):
        self.llm = llm
        self.tools = {t.name: t for t in tools}
        self.tool_descriptions = self.format_tools()
    
    def format_tools(self) -> str:
        return "\n".join([
            f"- {t.name}: {t.description}" 
            for t in self.tools.values()
        ])
    
    def select_tool(self, task: str) -> tuple:
        prompt = f"""Given this task: {task}
        
        Available tools:
        {self.tool_descriptions}
        
        Which tool should be used? Return:
        Tool: [tool_name]
        Args: [arguments as JSON]
        """
        response = self.llm.invoke(prompt)
        tool_name, args = self.parse_response(response)
        return self.tools[tool_name], args
    
    def run(self, task: str) -> str:
        tool, args = self.select_tool(task)
        return tool.invoke(**args)
```

**When to use:** When you have multiple tools and need dynamic selection

---

### H2: Pattern 7: Tool Error Handling (350 words)

**What it does:** Graceful failure with retry and fallback

**Code snippet:**
```python
from tenacity import retry, stop_after_attempt, wait_exponential

class RobustToolExecutor:
    def __init__(self, tools: dict, max_retries: int = 3):
        self.tools = tools
        self.max_retries = max_retries
    
    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=1, max=10)
    )
    def execute_with_retry(self, tool_name: str, **kwargs):
        tool = self.tools[tool_name]
        return tool.invoke(**kwargs)
    
    def execute_safe(self, tool_name: str, **kwargs) -> dict:
        try:
            result = self.execute_with_retry(tool_name, **kwargs)
            return {"success": True, "result": result}
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "tool": tool_name,
                "args": kwargs
            }
    
    def execute_with_fallback(
        self, 
        primary_tool: str, 
        fallback_tool: str, 
        **kwargs
    ) -> str:
        result = self.execute_safe(primary_tool, **kwargs)
        if result["success"]:
            return result["result"]
        
        # Try fallback
        fallback_result = self.execute_safe(fallback_tool, **kwargs)
        if fallback_result["success"]:
            return fallback_result["result"]
        
        return f"Both tools failed: {result['error']}"
```

**Tip:** "In production, I always wrap tools in error handlers. The number one cause of agent failures is unhandled tool errors."

---

### H2: Pattern 8: Tool Chaining Pattern (300 words)

**What it does:** Sequential tool execution with output passing

**Code snippet:**
```python
class ToolChain:
    def __init__(self, tools: list):
        self.tools = tools
    
    def run(self, initial_input: str) -> str:
        result = initial_input
        
        for tool in self.tools:
            result = tool.invoke(input=result)
        
        return result

# Example: Research → Summarize → Format
research_tool = Tool(name="research", ...)
summarize_tool = Tool(name="summarize", ...)
format_tool = Tool(name="format", ...)

chain = ToolChain([research_tool, summarize_tool, format_tool])
final_output = chain.run("AI trends 2026")
```

**When to use:** ETL pipelines, content processing workflows

---

## MULTI-AGENT PATTERNS

### H2: Pattern 9: Orchestrator-Worker Pattern (400 words)

**What it does:** Central coordinator delegates to specialized workers

**Code snippet:**
```python
from typing import Dict, Any

class Worker:
    def __init__(self, name: str, llm, specialty: str):
        self.name = name
        self.llm = llm
        self.specialty = specialty
    
    def work(self, task: str) -> str:
        prompt = f"As a {self.specialty}, complete: {task}"
        return self.llm.invoke(prompt)

class Orchestrator:
    def __init__(self, llm, workers: list):
        self.llm = llm
        self.workers = {w.name: w for w in workers}
    
    def plan_delegation(self, task: str) -> list:
        worker_info = "\n".join([
            f"- {w.name}: {w.specialty}" 
            for w in self.workers.values()
        ])
        
        prompt = f"""Task: {task}
        
        Available workers:
        {worker_info}
        
        Create subtasks and assign each to a worker.
        Format: worker_name: subtask description
        """
        response = self.llm.invoke(prompt)
        return self.parse_assignments(response)
    
    def run(self, task: str) -> str:
        assignments = self.plan_delegation(task)
        results = {}
        
        for worker_name, subtask in assignments:
            worker = self.workers[worker_name]
            results[worker_name] = worker.work(subtask)
        
        return self.synthesize(task, results)
    
    def synthesize(self, task: str, results: dict) -> str:
        prompt = f"""Original task: {task}
        
        Worker outputs:
        {results}
        
        Synthesize into a final response.
        """
        return self.llm.invoke(prompt)

# Usage
researcher = Worker("researcher", llm, "research and data gathering")
writer = Worker("writer", llm, "content writing")
reviewer = Worker("reviewer", llm, "quality review")

orchestrator = Orchestrator(llm, [researcher, writer, reviewer])
result = orchestrator.run("Write a blog post about AI agents")
```

**When to use:** Complex tasks requiring multiple skill sets
**Internal link:** CrewAI Tutorial

---

### H2: Pattern 10: Sequential Pipeline (300 words)

**What it does:** Agents in assembly line—each passes output to next

**Code snippet:**
```python
class PipelineAgent:
    def __init__(self, name: str, llm, role: str):
        self.name = name
        self.llm = llm
        self.role = role
    
    def process(self, input_data: str, context: dict = None) -> str:
        prompt = f"""Role: {self.role}
        
        Previous context: {context or 'None'}
        Input: {input_data}
        
        Process this input according to your role."""
        return self.llm.invoke(prompt)

class AgentPipeline:
    def __init__(self, agents: list):
        self.agents = agents
    
    def run(self, initial_input: str) -> str:
        current_output = initial_input
        context = {}
        
        for agent in self.agents:
            current_output = agent.process(current_output, context)
            context[agent.name] = current_output
        
        return current_output

# Example: Research → Draft → Edit → Publish
pipeline = AgentPipeline([
    PipelineAgent("researcher", llm, "Gather information"),
    PipelineAgent("drafter", llm, "Write first draft"),
    PipelineAgent("editor", llm, "Edit and polish"),
    PipelineAgent("publisher", llm, "Format for publication")
])
```

**When to use:** Content pipelines, data processing workflows

---

### H2: Pattern 11: Parallel Fan-Out (350 words)

**What it does:** Run multiple agents concurrently and combine results

**Code snippet:**
```python
import asyncio
from concurrent.futures import ThreadPoolExecutor

class ParallelAgents:
    def __init__(self, agents: list):
        self.agents = agents
    
    async def run_async(self, task: str) -> dict:
        tasks = [
            agent.process(task) 
            for agent in self.agents
        ]
        results = await asyncio.gather(*tasks)
        return dict(zip([a.name for a in self.agents], results))
    
    def run_parallel(self, task: str) -> dict:
        with ThreadPoolExecutor() as executor:
            futures = {
                agent.name: executor.submit(agent.process, task)
                for agent in self.agents
            }
            return {
                name: future.result()
                for name, future in futures.items()
            }
    
    def synthesize(self, results: dict, llm) -> str:
        prompt = f"""Multiple agents analyzed the same task.
        
        Results:
        {results}
        
        Synthesize into a single comprehensive response.
        """
        return llm.invoke(prompt)

# Example: Get perspectives from multiple specialized agents
analyst = Agent("market_analyst", ...)
technologist = Agent("tech_expert", ...)
ethicist = Agent("ethics_advisor", ...)

parallel = ParallelAgents([analyst, technologist, ethicist])
results = parallel.run_parallel("Evaluate AI in healthcare")
final = parallel.synthesize(results, llm)
```

**When to use:** Multi-perspective analysis, parallel research

---

### H2: Pattern 12: Handoff Pattern (350 words)

**What it does:** Agent-to-agent delegation with context transfer

**Code snippet:**
```python
class HandoffAgent:
    def __init__(self, name: str, llm, can_handle: list):
        self.name = name
        self.llm = llm
        self.can_handle = can_handle
        self.handoff_target = None
    
    def set_handoff(self, target_agent):
        self.handoff_target = target_agent
    
    def should_handoff(self, task: str) -> bool:
        prompt = f"""Task: {task}
        
        You can handle: {self.can_handle}
        
        Can you handle this task? (yes/no)
        If no, briefly explain why.
        """
        response = self.llm.invoke(prompt)
        return "no" in response.lower()
    
    def process(self, task: str, context: dict = None) -> str:
        if self.should_handoff(task) and self.handoff_target:
            # Create handoff context
            handoff_context = {
                "from_agent": self.name,
                "original_task": task,
                "previous_context": context,
                "handoff_reason": "Task outside my capabilities"
            }
            return self.handoff_target.process(task, handoff_context)
        
        return self.execute(task, context)
    
    def execute(self, task: str, context: dict) -> str:
        prompt = f"""Task: {task}
        Context: {context}
        
        Complete this task."""
        return self.llm.invoke(prompt)

# Usage
general_agent = HandoffAgent("general", llm, ["general questions"])
code_agent = HandoffAgent("coder", llm, ["code", "programming", "debugging"])

general_agent.set_handoff(code_agent)
# If general_agent can't handle, it passes to code_agent
```

**When to use:** Specialized agent teams, escalation workflows

---

## STATE & MEMORY PATTERNS

### H2: Pattern 13: Conversation Memory (300 words)

**What it does:** Maintain context across conversation turns

**Code snippet:**
```python
from collections import deque

class ConversationMemory:
    def __init__(self, max_turns: int = 10):
        self.messages = deque(maxlen=max_turns * 2)
        self.summary = ""
    
    def add_user_message(self, content: str):
        self.messages.append({"role": "user", "content": content})
    
    def add_assistant_message(self, content: str):
        self.messages.append({"role": "assistant", "content": content})
    
    def get_context(self) -> list:
        context = []
        if self.summary:
            context.append({
                "role": "system", 
                "content": f"Previous conversation summary: {self.summary}"
            })
        context.extend(list(self.messages))
        return context
    
    def summarize_if_needed(self, llm, threshold: int = 10):
        if len(self.messages) >= threshold:
            prompt = f"""Summarize this conversation:
            {list(self.messages)}
            """
            self.summary = llm.invoke(prompt)
            self.messages.clear()

class MemoryAgent:
    def __init__(self, llm):
        self.llm = llm
        self.memory = ConversationMemory()
    
    def chat(self, message: str) -> str:
        self.memory.add_user_message(message)
        context = self.memory.get_context()
        
        response = self.llm.invoke(context)
        self.memory.add_assistant_message(response)
        self.memory.summarize_if_needed(self.llm)
        
        return response
```

**When to use:** Chatbots, conversational AI applications

---

### H2: Pattern 14: Persistent State (300 words)

**What it does:** Save and restore agent state across sessions

**Code snippet:**
```python
import json
from pathlib import Path
from datetime import datetime

class PersistentState:
    def __init__(self, state_file: str = "agent_state.json"):
        self.state_file = Path(state_file)
        self.state = self.load()
    
    def load(self) -> dict:
        if self.state_file.exists():
            with open(self.state_file) as f:
                return json.load(f)
        return {"created": datetime.now().isoformat(), "data": {}}
    
    def save(self):
        self.state["last_updated"] = datetime.now().isoformat()
        with open(self.state_file, "w") as f:
            json.dump(self.state, f, indent=2)
    
    def get(self, key: str, default=None):
        return self.state["data"].get(key, default)
    
    def set(self, key: str, value):
        self.state["data"][key] = value
        self.save()

class StatefulAgent:
    def __init__(self, llm, state_file: str):
        self.llm = llm
        self.state = PersistentState(state_file)
    
    def run(self, task: str) -> str:
        # Load previous context
        history = self.state.get("task_history", [])
        
        context = f"Previous tasks: {history[-5:]}" if history else ""
        response = self.llm.invoke(f"{context}\n\nNew task: {task}")
        
        # Save to state
        history.append({"task": task, "result": response[:100]})
        self.state.set("task_history", history)
        
        return response
```

**When to use:** Long-running agents, agents that need to remember across restarts

---

### H2: Pattern 15: Shared Context (300 words)

**What it does:** Pass context between multiple agents

**Code snippet:**
```python
from typing import Any
from threading import Lock

class SharedContext:
    def __init__(self):
        self._context = {}
        self._lock = Lock()
    
    def set(self, key: str, value: Any, agent_name: str = None):
        with self._lock:
            self._context[key] = {
                "value": value,
                "set_by": agent_name,
                "timestamp": datetime.now().isoformat()
            }
    
    def get(self, key: str) -> Any:
        with self._lock:
            return self._context.get(key, {}).get("value")
    
    def get_all(self) -> dict:
        with self._lock:
            return {k: v["value"] for k, v in self._context.items()}

class ContextAwareAgent:
    def __init__(self, name: str, llm, shared_context: SharedContext):
        self.name = name
        self.llm = llm
        self.context = shared_context
    
    def process(self, task: str) -> str:
        # Get shared context
        all_context = self.context.get_all()
        
        prompt = f"""Shared context from other agents:
        {all_context}
        
        Your task: {task}
        """
        result = self.llm.invoke(prompt)
        
        # Share our result
        self.context.set(f"{self.name}_result", result, self.name)
        
        return result

# Usage
shared = SharedContext()
agent1 = ContextAwareAgent("researcher", llm, shared)
agent2 = ContextAwareAgent("writer", llm, shared)

agent1.process("Research AI trends")  # Shares findings
agent2.process("Write summary")  # Can see researcher's findings
```

**When to use:** Multi-agent collaboration, shared knowledge bases

---

## PUTTING IT ALL TOGETHER

### H2: Combining Patterns (400 words)

**Example: Production-Ready Agent System**

```python
class ProductionAgent:
    """Combines multiple patterns for a robust agent."""
    
    def __init__(self, llm, tools):
        self.llm = llm
        self.tools = RobustToolExecutor(tools)  # Pattern 7
        self.memory = ConversationMemory()  # Pattern 13
        self.state = PersistentState()  # Pattern 14
    
    def run(self, task: str) -> str:
        # Add to memory
        self.memory.add_user_message(task)
        
        # ReAct-style execution (Pattern 2)
        while True:
            context = self.memory.get_context()
            response = self.llm.invoke(context)
            
            if response.tool_calls:
                for call in response.tool_calls:
                    # Safe execution (Pattern 7)
                    result = self.tools.execute_safe(
                        call.name, **call.args
                    )
                    self.memory.add_tool_result(result)
            else:
                break
        
        # Reflection check (Pattern 4)
        final = self.reflect_and_improve(response)
        
        # Save state (Pattern 14)
        self.state.set("last_task", task)
        
        return final
```

---

### H2: Choosing the Right Pattern (300 words)

| Pattern | Best For | Complexity |
|---------|----------|------------|
| Basic Loop | Simple tasks | Low |
| ReAct | Debugging, transparency | Medium |
| Plan-Execute | Predictable workflows | Medium |
| Reflection | Quality-critical | Medium |
| Orchestrator-Worker | Complex multi-skill | High |
| Sequential Pipeline | Content/data pipelines | Medium |
| Parallel Fan-Out | Fast multi-perspective | High |

**Decision framework:**
1. Start with the simplest pattern that works
2. Add complexity only when needed
3. Combine patterns for production systems

---

### H2: FAQ Section (300 words)

**Q: Which pattern should I start with?**
A: Start with the Basic Agent Loop (Pattern 1). Add ReAct for transparency or Plan-and-Execute for multi-step tasks.

**Q: Can I use these patterns with any LLM?**
A: Yes! These patterns work with OpenAI, Anthropic, Google, and local models. Just swap the LLM client.

**Q: How do I handle agent failures?**
A: Implement Pattern 7 (Tool Error Handling) with retries and fallbacks. Always assume tools will fail.

**Q: What's the difference between ReAct and Plan-and-Execute?**
A: ReAct decides one step at a time (flexible). Plan-and-Execute creates the full plan upfront (predictable).

**Q: How do I choose between single-agent and multi-agent?**
A: Start single-agent. Add multi-agent only when you need specialized skills or parallel processing.

---

### Conclusion (150 words)

- Recap: 15 patterns covering core, tools, multi-agent, memory
- These patterns are framework-agnostic building blocks
- Start simple, combine as needed
- Link to related resources
- CTA: Download the complete code repository

---

## Internal Linking Plan

| Location | Link To | Anchor Text |
|----------|---------|-------------|
| Introduction | What Are AI Agents | "understand what AI agents are" |
| Pattern 1 | Build First AI Agent | "build an AI agent from scratch" |
| Pattern 9 | CrewAI Tutorial | "CrewAI framework" |
| Pattern 9 | LangChain Agents | "LangChain agents" |
| Prerequisites | OpenAI API Tutorial | "OpenAI API" |
| Prerequisites | Claude API Tutorial | "Claude API" |

---

## External Link Plan

| Topic | Source to Cite |
|-------|---------------|
| ReAct Paper | arXiv/Google Research |
| LangChain Docs | python.langchain.com |
| OpenAI Agents SDK | OpenAI Documentation |

---

*Outline completed. Ready for `/blog-writer` phase.*
