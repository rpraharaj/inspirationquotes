---
title: "LangChain Agents Tutorial: Build Smart AI Workflows"
description: "Learn to build AI agents with LangChain and LangGraph. Step-by-step Python tutorial with code examples, tools, and best practices for 2026."
pubDate: 2026-01-10
updatedDate: null
heroImage: "/blog-placeholder-2.jpg"
category: "ai-agents"
tags: ["LangChain", "LangGraph", "AI Agents", "Python", "Tutorial"]
author: "Vibe Coder"
difficulty: "intermediate"
featured: false
---

When I first tried building an AI assistant that could actually *do things*—not just answer questions, but search the web, run calculations, and interact with APIs—I realized that basic LLM calls weren't going to cut it.

That's when I discovered LangChain agents.

LangChain agents are AI systems that can reason through problems, decide which tools to use, and take actions—all without you hardcoding every step. They're the difference between a chatbot that says "I can't browse the web" and one that actually goes and finds the answer.

In this tutorial, I'll walk you through building LangChain agents from scratch. We'll start with the basics, then level up to [LangGraph](https://python.langchain.com/docs/langgraph) for more complex workflows. By the end, you'll have working code you can actually run and extend for your own projects.

Let's build something smart.

## What Are LangChain Agents?

Before we write any code, let's understand what makes agents different from regular LLM applications.

**Traditional LLM chains** follow a fixed sequence: user input → prompt → LLM → output. Every step is predetermined. If you want the system to search Google, you hardcode when to search Google.

**Agents** are different. They use the LLM as a "reasoning engine" that decides what to do next. The LLM sees the user's question, thinks about which tools might help, picks one (or none), observes the result, and keeps going until it has a final answer.

This is called the **ReAct pattern**: Reasoning + Acting. The agent reasons about what to do, acts by using a tool, observes the outcome, and repeats.

Here's the mental model:

```
User: "What's the weather in Tokyo?"

Agent thinking: 
  - I need to find weather data
  - I have a weather tool
  - Let me call it with "Tokyo"
  
[Calls weather tool]

Agent thinking:
  - I got 18°C and cloudy
  - That answers the question
  
Agent: "The weather in Tokyo is 18°C and cloudy."
```

The agent decides at runtime which tool to use. You didn't hardcode "always check weather for weather questions"—the agent figured it out.

This dynamic decision-making is what separates agents from chains. It's also what makes them powerful for real-world applications where you can't predict every possible user request.

For more on why agents are fundamentally different from simpler AI interfaces, see our breakdown of [agents vs chatbots](/blog/ai-agents-vs-chatbots).

## Prerequisites and Setup

Let's get your environment ready. This won't take long.

### What You'll Need

Before we start:
- **Python 3.9+** installed (3.11 recommended)
- **OpenAI API key** ([get one here](https://platform.openai.com/api-keys))
- Basic Python knowledge (functions, classes)
- A code editor you're comfortable with

### Installing the Packages

Open your terminal and install the required packages:

```bash
pip install langchain langchain-openai langgraph python-dotenv
```

Here's what each package does:
- `langchain` - Core LangChain functionality
- `langchain-openai` - OpenAI integration
- `langgraph` - For building graph-based agent workflows
- `python-dotenv` - Load environment variables from .env files

Create a `.env` file in your project directory:

```
OPENAI_API_KEY=your-api-key-here
```

### Quick Test

Let's verify everything works. Create a file called `test_setup.py`:

```python
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

load_dotenv()

llm = ChatOpenAI(model="gpt-4o")
response = llm.invoke("Say hello in exactly three words.")
print(response.content)
```

Run it:

```bash
python test_setup.py
```

If you see a response, you're ready to go. If not, double-check your API key is set correctly.

## Building Your First LangChain Agent

Now the fun part. We're going to build an agent with custom tools.

### Step 1: Import and Initialize

Create a new file called `first_agent.py`:

```python
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.agents import create_react_agent, AgentExecutor
from langchain.tools import tool
from langchain import hub

load_dotenv()

# Initialize the LLM
llm = ChatOpenAI(model="gpt-4o", temperature=0)
```

We're using `gpt-4o` because it's excellent at tool usage. Set `temperature=0` for more deterministic agent behavior—you want reliable tool selection, not creative interpretation.

### Step 2: Define Your Tools

Tools are Python functions that your agent can call. The key is the `@tool` decorator and a clear docstring:

```python
@tool
def get_current_weather(location: str) -> str:
    """Get the current weather for a given location.
    
    Args:
        location: The city name, e.g., "London" or "New York"
    
    Returns:
        A string describing the current weather conditions.
    """
    # In production, this would call a real weather API
    weather_data = {
        "london": "15°C, rainy",
        "new york": "22°C, sunny",
        "tokyo": "18°C, cloudy",
        "paris": "17°C, partly cloudy"
    }
    return weather_data.get(location.lower(), f"Weather data not available for {location}")

@tool
def calculate(expression: str) -> str:
    """Evaluate a mathematical expression.
    
    Args:
        expression: A mathematical expression like "2 + 2" or "15 * 7"
    
    Returns:
        The result of the calculation as a string.
    """
    try:
        result = eval(expression)
        return str(result)
    except Exception as e:
        return f"Error calculating: {e}"

tools = [get_current_weather, calculate]
```

**Here's what tripped me up initially:** The docstring isn't just for documentation—it's how the LLM decides whether to use this tool. Write it like you're explaining to a smart colleague what the tool does and when to use it.

Bad docstring: `"Weather function"`  
Good docstring: `"Get the current weather for a given location. Use this when the user asks about weather conditions."`

The difference in agent performance is huge.

### Step 3: Create the Agent

Now we wire everything together:

```python
# Get the ReAct prompt template from LangChain hub
prompt = hub.pull("hwchase17/react")

# Create the agent
agent = create_react_agent(llm, tools, prompt)

# Create the executor that will run the agent
agent_executor = AgentExecutor(
    agent=agent, 
    tools=tools, 
    verbose=True,  # See the agent's thinking
    handle_parsing_errors=True
)
```

The `AgentExecutor` manages the agent loop—it runs the LLM, parses tool calls, executes tools, and keeps going until the agent decides it's done.

### Step 4: Run and Observe

Let's test our agent:

```python
# Run the agent
result = agent_executor.invoke({
    "input": "What's the weather in Tokyo, and what's 15 times 7?"
})

print("\n=== Final Answer ===")
print(result["output"])
```

With `verbose=True`, you'll see the agent's thinking process:

```
> Entering new AgentExecutor chain...

Thought: I need to find the weather in Tokyo and also calculate 15 times 7.
Let me start with the weather.

Action: get_current_weather
Action Input: Tokyo

Observation: 18°C, cloudy

Thought: Good, I got the weather. Now let me calculate 15 * 7.

Action: calculate
Action Input: 15 * 7

Observation: 105

Thought: I now have both pieces of information.

Final Answer: The weather in Tokyo is 18°C and cloudy. 
15 times 7 equals 105.
```

That's an agent in action—reasoning, acting, observing, and concluding.

If you want a gentler introduction to agent concepts, check out our guide on how to [build your first AI agent](/blog/build-first-ai-agent-python).

## Understanding LangChain Tools

Tools are the heart of any agent. Let's go deeper.

### Anatomy of a Tool

Every tool needs three things:

1. **Name** - The function name becomes the tool name
2. **Description** - The docstring tells the LLM when to use it
3. **Function** - What actually happens when it's called

```python
@tool
def search_database(query: str) -> str:
    """Search the company knowledge base for relevant information.
    
    Use this tool when the user asks about company policies, procedures,
    or internal documentation.
    
    Args:
        query: The search query string
        
    Returns:
        Relevant text from the knowledge base, or "No results found"
    """
    # Your search logic here
    pass
```

### Built-in Tools

LangChain includes many pre-built tools:

```python
from langchain_community.tools import WikipediaQueryRun
from langchain_community.utilities import WikipediaAPIWrapper

# Wikipedia tool
wikipedia = WikipediaQueryRun(api_wrapper=WikipediaAPIWrapper())
```

Other built-in options include:
- **DuckDuckGo Search** - Web search without API keys
- **Tavily Search** - AI-optimized search
- **Python REPL** - Execute Python code
- **Requests** - Make HTTP requests
- **Shell** - Run shell commands (be careful!)

### Creating Custom Tools

For production applications, you'll mostly create custom tools. Here's a more sophisticated example:

```python
from langchain.tools import StructuredTool
from pydantic import BaseModel, Field

class EmailInput(BaseModel):
    """Input schema for the email tool."""
    to: str = Field(description="Email recipient address")
    subject: str = Field(description="Email subject line")
    body: str = Field(description="Email body content")

def send_email_function(to: str, subject: str, body: str) -> str:
    """Actually send the email (in production, connect to SMTP/API)."""
    # Simulated for this tutorial
    print(f"Sending email to {to}...")
    return f"Email sent successfully to {to}"

email_tool = StructuredTool.from_function(
    func=send_email_function,
    name="send_email",
    description="Send an email to someone. Use this when the user wants to send an email.",
    args_schema=EmailInput
)
```

StructuredTool gives you type safety and validation—the LLM must provide correctly typed arguments.

## Introduction to LangGraph

LangChain's `create_react_agent` is great for simple use cases. But what happens when you need:
- Multiple agents working together
- Complex branching logic
- Checkpointing and recovery
- More control over the workflow

That's where [LangGraph](https://langchain-ai.github.io/langgraph/) comes in.

LangGraph models your agent as a **graph** with:
- **Nodes** - Functions that process state
- **Edges** - Connections between nodes
- **State** - Shared data that flows through the graph

Instead of "run LLM → maybe call tool → repeat", you define exactly how your agent moves through different states of execution.

**My opinion:** LangGraph is where production agents are heading. It's more verbose than the simple agent pattern, but the control you get is worth it. For understanding multi-agent systems at scale, this architecture is essential.

If you haven't already, read our explanation of [multi-agent systems](/blog/multi-agent-systems-explained) to understand the bigger picture.

## Building an Agent with LangGraph

Let's rebuild our agent using LangGraph. This is more code, but you'll see why the control matters.

### Step 1: Define the State

First, we define what data flows through our graph:

```python
from typing import TypedDict, Annotated, Sequence
from langchain_core.messages import BaseMessage
import operator

class AgentState(TypedDict):
    """The state that flows through our agent graph."""
    messages: Annotated[Sequence[BaseMessage], operator.add]
```

The `messages` key stores the conversation history. The `Annotated` with `operator.add` means new messages get appended, not replaced.

### Step 2: Create Nodes

Nodes are functions that take state and return updated state:

```python
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, AIMessage, ToolMessage

# Our tools from before
tools = [get_current_weather, calculate]

# LLM with tools bound
llm = ChatOpenAI(model="gpt-4o", temperature=0)
llm_with_tools = llm.bind_tools(tools)

def agent_node(state: AgentState) -> dict:
    """The agent decides what to do next."""
    messages = state["messages"]
    response = llm_with_tools.invoke(messages)
    return {"messages": [response]}

def tool_node(state: AgentState) -> dict:
    """Execute any tool calls from the last message."""
    messages = state["messages"]
    last_message = messages[-1]
    
    tool_outputs = []
    for tool_call in last_message.tool_calls:
        # Find and execute the tool
        for tool in tools:
            if tool.name == tool_call["name"]:
                result = tool.invoke(tool_call["args"])
                tool_outputs.append(
                    ToolMessage(content=result, tool_call_id=tool_call["id"])
                )
    
    return {"messages": tool_outputs}
```

### Step 3: Add Edges

Edges define how nodes connect. We need conditional logic:

```python
from langgraph.graph import StateGraph, END

def should_continue(state: AgentState) -> str:
    """Decide whether to call tools or finish."""
    last_message = state["messages"][-1]
    
    # If the LLM made tool calls, go to tools
    if last_message.tool_calls:
        return "tools"
    # Otherwise, we're done
    return "end"

# Build the graph
workflow = StateGraph(AgentState)

# Add nodes
workflow.add_node("agent", agent_node)
workflow.add_node("tools", tool_node)

# Add edges
workflow.set_entry_point("agent")

workflow.add_conditional_edges(
    "agent",
    should_continue,
    {
        "tools": "tools",
        "end": END
    }
)

# After tools, always go back to agent
workflow.add_edge("tools", "agent")
```

### Step 4: Compile and Run

Now we compile the graph and run it:

```python
from langchain_core.messages import HumanMessage

# Compile the graph
app = workflow.compile()

# Run it
result = app.invoke({
    "messages": [HumanMessage(content="What's the weather in London?")]
})

# Get the final response
final_message = result["messages"][-1]
print(final_message.content)
```

Yes, it's more code than the simple agent. But now you have:
- Clear visual of how state flows
- Easy to add new nodes (logging, validation, etc.)
- Checkpointing support for long-running agents
- Better debugging and observability

## Common Patterns and Best Practices

After building many agents, here's what I've learned works.

### Tool Descriptions Are Everything

I cannot stress this enough. The LLM decides whether to use a tool based on its description. Spend time on these.

**Bad:**
```python
@tool
def search(q: str) -> str:
    """Search function."""
    pass
```

**Good:**
```python
@tool
def search_knowledge_base(query: str) -> str:
    """Search the company knowledge base for policies, procedures, and documentation.
    
    Use this when the user asks about:
    - Company policies (PTO, expenses, etc.)
    - How to do something at work
    - Internal processes and procedures
    
    Do NOT use for general knowledge questions - use the web search tool instead.
    
    Args:
        query: Natural language search query
        
    Returns:
        Relevant excerpts from internal documentation
    """
    pass
```

The detailed description helps the LLM make better decisions about when to use this tool vs. others.

### Error Handling

Tools can fail. Handle it gracefully:

```python
@tool
def fetch_data(url: str) -> str:
    """Fetch data from a URL."""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.text[:1000]  # Limit response size
    except requests.exceptions.Timeout:
        return "Error: Request timed out. The server is not responding."
    except requests.exceptions.HTTPError as e:
        return f"Error: HTTP {e.response.status_code}. Unable to access the URL."
    except Exception as e:
        return f"Error: {str(e)}"
```

Return error messages that help the agent understand what went wrong and potentially try something else.

### Memory and Context

For conversational agents, you need memory. Here's a simple pattern:

```python
from langchain_core.messages import HumanMessage, AIMessage

conversation_history = []

def chat(user_message: str) -> str:
    conversation_history.append(HumanMessage(content=user_message))
    
    result = agent_executor.invoke({
        "input": user_message,
        "chat_history": conversation_history
    })
    
    conversation_history.append(AIMessage(content=result["output"]))
    return result["output"]
```

For production, use LangChain's message history classes or a database.

For a broader comparison of agent frameworks, see our guide on how to [compare AI agent frameworks](/blog/best-ai-agent-frameworks-compared).

## Troubleshooting Common Issues

Agents can be finicky. Here's how to fix common problems.

### Agent Loops Forever

**Symptom:** Agent keeps calling tools without reaching a final answer.

**Fixes:**
```python
agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    max_iterations=10,  # Limit iterations
    max_execution_time=60  # Limit time in seconds
)
```

Also check your tool descriptions—vague descriptions cause the agent to keep trying.

### Tool Not Being Called

**Symptom:** Agent gives a generic answer instead of using a tool.

**Fixes:**
1. Make the tool description clearer
2. Use a more capable model (gpt-4o over gpt-3.5-turbo)
3. Check that the tool is in the `tools` list

### "Tool not found" Errors

**Symptom:** Agent tries to call a tool that doesn't exist.

**Fix:** The agent is hallucinating tool names. This often happens with weaker models. Use gpt-4o and ensure your tool names are clear.

### Context Overflow

**Symptom:** Error about maximum context length.

**Fixes:**
1. Limit tool output length
2. Summarize conversation history periodically
3. Use a model with larger context window

### Rate Limiting

**Symptom:** OpenAI rate limit errors.

**Fixes:**
```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="gpt-4o",
    max_retries=3,
    request_timeout=30
)
```

## Frequently Asked Questions

### What is a LangChain agent?

A LangChain agent is an AI system that uses an LLM to decide which tools to use and when. Unlike chains where every step is predetermined, agents dynamically choose actions based on the conversation. They follow the ReAct pattern: Reason about what to do, Act by calling a tool, observe the result, and repeat.

### What is the difference between LangChain and LangGraph?

LangChain provides building blocks for LLM applications, including a simple agent pattern. LangGraph, built on LangChain, models applications as graphs with explicit state, nodes, and edges. Use LangChain for simple agents; use LangGraph for complex workflows, multi-agent systems, or when you need fine-grained control.

### How do I add custom tools to LangChain?

Use the `@tool` decorator on a Python function. The function's docstring becomes the tool description (critical for good agent behavior). The function name becomes the tool name. For more complex tools with multiple arguments, use `StructuredTool.from_function()` with a Pydantic schema.

### Is LangChain still relevant in 2026?

Absolutely. LangChain remains the most popular framework for building LLM applications, with over 100K GitHub stars. LangGraph extends its capabilities for production-grade agents. The ecosystem is mature, well-documented, and actively maintained. It's the standard choice for Python AI development.

### What are the best use cases for LangChain agents?

LangChain agents excel at: (1) Research assistants that search multiple sources, (2) Customer service bots that can look up orders and process requests, (3) Data analysis agents that query databases and run calculations, (4) Automation workflows that interact with APIs, and (5) Personal assistants that manage calendar, email, and tasks.

### Why does my LangChain agent keep looping?

Agent loops usually happen because: (1) Tool descriptions are vague—the agent doesn't know when it has enough info, (2) The task is ambiguous—clarify user intent, (3) Tools return unhelpful errors—make error messages actionable, or (4) You're using a weak model—upgrade to gpt-4o for better reasoning.

## Build Something Real

You now have the foundations to build serious AI agents:

- **LangChain agents** for straightforward tool-using applications
- **LangGraph** for complex, stateful workflows
- **Tools** that extend what your agent can do
- **Best practices** for production reliability

My advice? Start with the simple `create_react_agent` for your first projects. When you hit its limits—when you need branching, loops, or multiple agents—migrate to LangGraph.

The most important lesson I've learned: **invest time in your tool descriptions**. That's the difference between an agent that works and one that frustrates you.

Now go build something. Start with a real problem you have. Agents are most useful when they're solving actual needs, not demo scenarios.

Happy building.
