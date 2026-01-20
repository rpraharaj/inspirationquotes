---
title: "LangChain Code Snippets: 25 Patterns for AI Apps (2026)"
description: "Copy-paste LangChain code snippets for building AI applications. 25 patterns for chains, RAG, agents, memory, and more."
pubDate: 2026-01-11
updatedDate: 2026-01-11
category: "ai-code-snippets"
keywords: ["LangChain code snippets", "LangChain examples", "LangChain Python patterns", "LangChain RAG tutorial"]
heroImage: "../../assets/images/langchain-code-snippets.webp"
author: "AI Agents Kit"
readTime: 17
tags: ["LangChain", "Python", "Code Snippets", "RAG", "AI Agents"]
difficulty: "intermediate"
featured: false
---

LangChain has evolved a lot since it first appeared. The abstractions have matured, the docs have improved, and what used to require 50 lines now takes 10. But finding working examples that use the current syntax? Still harder than it should be.

I've built dozens of LangChain applications—chatbots, RAG systems, multi-agent workflows. This is my curated collection of patterns that actually work with LangChain 0.3.x in 2026.

Twenty-five code snippets, organized by what you're building. Copy, paste, modify, ship.

## Setup & Models

Getting LangChain connected to various LLM providers.

### Snippet 1: Install and Basic Setup

```python
# pip install langchain langchain-openai langchain-anthropic

from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic

# Initialize models
gpt = ChatOpenAI(model="gpt-5")  # Reads OPENAI_API_KEY
claude = ChatAnthropic(model="claude-4-sonnet")  # Reads ANTHROPIC_API_KEY
```

LangChain 0.3+ uses separate packages for each provider. Install only what you need.

### Snippet 2: Model Configuration

```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="gpt-5",
    temperature=0.7,
    max_tokens=2000,
    timeout=30,
    max_retries=2,
    api_key="sk-..."  # Optional: overrides env var
)

# Test it
response = llm.invoke("Say hello")
print(response.content)
```

The `invoke()` method is the standard way to call models in LangChain 0.3+.

### Snippet 3: Using Open Source Models (Ollama)

```python
from langchain_community.llms import Ollama

# Requires Ollama running locally
llm = Ollama(model="llama3.2")

response = llm.invoke("What is machine learning?")
print(response)
```

Local models through Ollama—great for development and privacy-sensitive applications.

### Snippet 4: Model Fallback Chain

```python
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic

# Primary model with fallback
primary = ChatOpenAI(model="gpt-5")
fallback = ChatAnthropic(model="claude-4-haiku")

llm = primary.with_fallbacks([fallback])

# If GPT-5 fails, automatically tries Claude
response = llm.invoke("Hello!")
```

Fallbacks add resilience when a provider has issues.

## Prompt Templates

Structured prompts are more maintainable and reusable.

### Snippet 5: Basic Prompt Template

```python
from langchain_core.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant specialized in {topic}."),
    ("human", "{question}")
])

# Format with variables
formatted = prompt.invoke({
    "topic": "Python programming",
    "question": "How do I read a CSV file?"
})

# Use with model
response = llm.invoke(formatted)
```

Templates make your prompts dynamic and testable.

### Snippet 6: Few-Shot Prompting

```python
from langchain_core.prompts import FewShotChatMessagePromptTemplate, ChatPromptTemplate

examples = [
    {"input": "2+2", "output": "4"},
    {"input": "5*3", "output": "15"},
]

example_prompt = ChatPromptTemplate.from_messages([
    ("human", "{input}"),
    ("ai", "{output}")
])

few_shot_prompt = FewShotChatMessagePromptTemplate(
    example_prompt=example_prompt,
    examples=examples
)

final_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a calculator. Only output the number."),
    few_shot_prompt,
    ("human", "{input}")
])

response = llm.invoke(final_prompt.invoke({"input": "10/2"}))
```

Few-shot examples dramatically improve output consistency.

### Snippet 7: Dynamic Example Selection

```python
from langchain_core.example_selectors import SemanticSimilarityExampleSelector
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

examples = [
    {"input": "happy", "output": "sad"},
    {"input": "tall", "output": "short"},
    {"input": "bright", "output": "dark"},
]

selector = SemanticSimilarityExampleSelector.from_examples(
    examples,
    OpenAIEmbeddings(),
    FAISS,
    k=1  # Select 1 most similar example
)

# Dynamically picks the most relevant example
relevant = selector.select_examples({"input": "joyful"})
# Returns: [{"input": "happy", "output": "sad"}]
```

Semantic selection picks the most relevant examples for each query.

### Snippet 8: Prompt from File

```python
from langchain_core.prompts import ChatPromptTemplate

# prompts/system.txt contains your system prompt
with open("prompts/system.txt", "r") as f:
    system_prompt = f.read()

prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{input}")
])
```

Store complex prompts in files for version control and easier editing.

## Chains

Chains combine components into sequences. The foundation of LangChain applications.

### Snippet 9: Simple Chain with LCEL

```python
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser

prompt = ChatPromptTemplate.from_template("Tell me a joke about {topic}")
model = ChatOpenAI(model="gpt-5")
output_parser = StrOutputParser()

# Chain with pipe operator
chain = prompt | model | output_parser

result = chain.invoke({"topic": "programming"})
print(result)
```

LCEL (LangChain Expression Language) uses the pipe operator for clean, readable chains.

### Snippet 10: Sequential Chain

```python
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser

# Chain 1: Write an outline
outline_prompt = ChatPromptTemplate.from_template(
    "Create a brief outline for an article about {topic}"
)

# Chain 2: Write the article
article_prompt = ChatPromptTemplate.from_template(
    "Write an article based on this outline:\n{outline}"
)

llm = ChatOpenAI(model="gpt-5")
parser = StrOutputParser()

# Sequential chain
chain = (
    {"outline": outline_prompt | llm | parser}
    | article_prompt
    | llm
    | parser
)

article = chain.invoke({"topic": "AI in healthcare"})
```

Pass outputs between chains using dictionaries.

### Snippet 11: Parallel Chains

```python
from langchain_core.runnables import RunnableParallel

# Define parallel tasks
parallel = RunnableParallel(
    summary=ChatPromptTemplate.from_template("Summarize: {text}") | llm | parser,
    keywords=ChatPromptTemplate.from_template("Extract 5 keywords from: {text}") | llm | parser,
    sentiment=ChatPromptTemplate.from_template("What's the sentiment of: {text}") | llm | parser
)

# Run all in parallel
result = parallel.invoke({"text": "Your input text here"})
print(result["summary"])
print(result["keywords"])
print(result["sentiment"])
```

`RunnableParallel` executes multiple chains concurrently.

### Snippet 12: Conditional Chain

```python
from langchain_core.runnables import RunnableBranch

# Define branches
branch = RunnableBranch(
    (lambda x: "code" in x["topic"].lower(), 
     ChatPromptTemplate.from_template("Write code for: {topic}") | llm | parser),
    (lambda x: "explain" in x["topic"].lower(),
     ChatPromptTemplate.from_template("Explain simply: {topic}") | llm | parser),
    # Default branch
    ChatPromptTemplate.from_template("Answer: {topic}") | llm | parser
)

result = branch.invoke({"topic": "code a fibonacci function"})
```

Branches route inputs to different chains based on conditions.

## RAG & Retrieval

Retrieval-Augmented Generation—the killer use case for LangChain. For deeper coverage, see our [RAG tutorial](/blog/build-rag-chatbot-tutorial).

### Snippet 13: Basic RAG Setup

```python
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

# Create vector store from documents
texts = [
    "LangChain is a framework for building AI applications.",
    "RAG stands for Retrieval-Augmented Generation.",
    "Vector databases store embeddings for semantic search."
]
vectorstore = FAISS.from_texts(texts, OpenAIEmbeddings())
retriever = vectorstore.as_retriever()

# RAG prompt
template = """Answer based on the context below:

Context: {context}

Question: {question}"""
prompt = ChatPromptTemplate.from_template(template)

# RAG chain
chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt
    | ChatOpenAI(model="gpt-5")
    | StrOutputParser()
)

answer = chain.invoke("What is LangChain?")
```

This is the core RAG pattern—retrieve relevant docs, inject into prompt.

### Snippet 14: Document Loading

```python
from langchain_community.document_loaders import (
    TextLoader,
    PDFLoader,
    WebBaseLoader
)
from langchain_text_splitters import RecursiveCharacterTextSplitter

# Load from different sources
text_docs = TextLoader("document.txt").load()
pdf_docs = PDFLoader("document.pdf").load()
web_docs = WebBaseLoader("https://example.com").load()

# Split into chunks
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)

chunks = splitter.split_documents(pdf_docs)
print(f"Created {len(chunks)} chunks")
```

Chunk your documents appropriately—1000 chars with 200 overlap is a good default.

### Snippet 15: Conversational RAG

```python
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory

memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True
)

chain = ConversationalRetrievalChain.from_llm(
    llm=ChatOpenAI(model="gpt-5"),
    retriever=vectorstore.as_retriever(),
    memory=memory
)

# Multi-turn conversation
response1 = chain.invoke({"question": "What is LangChain?"})
response2 = chain.invoke({"question": "What else can it do?"})  # Uses history
```

Memory maintains context across multiple questions.

### Snippet 16: Hybrid Search (Dense + Sparse)

```python
from langchain.retrievers import EnsembleRetriever
from langchain_community.retrievers import BM25Retriever

# Dense retriever (semantic)
dense_retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# Sparse retriever (keyword-based)
bm25_retriever = BM25Retriever.from_texts(texts)
bm25_retriever.k = 3

# Combine with weights
ensemble = EnsembleRetriever(
    retrievers=[dense_retriever, bm25_retriever],
    weights=[0.6, 0.4]  # 60% semantic, 40% keyword
)

docs = ensemble.invoke("What is RAG?")
```

Hybrid search often outperforms pure semantic search.

## Agents & Tools

Agents decide which tools to use and in what order. The path to autonomous AI. Learn more in our [LangChain agents tutorial](/blog/langchain-agents-tutorial).

### Snippet 17: Simple ReAct Agent

```python
from langchain_openai import ChatOpenAI
from langchain.agents import create_react_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate
from langchain_community.tools import DuckDuckGoSearchRun

# Define tools
tools = [DuckDuckGoSearchRun()]

# Create agent
prompt = ChatPromptTemplate.from_template("""Answer the following question:

{input}

You have access to these tools: {tools}
Tool names: {tool_names}

{agent_scratchpad}""")

agent = create_react_agent(
    llm=ChatOpenAI(model="gpt-5"),
    tools=tools,
    prompt=prompt
)

executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
result = executor.invoke({"input": "What's the current weather in Tokyo?"})
```

ReAct agents reason about what tool to use next.

### Snippet 18: Custom Tool

```python
from langchain.tools import tool

@tool
def calculator(expression: str) -> str:
    """Evaluates a math expression. Input should be a valid Python expression."""
    try:
        return str(eval(expression))
    except Exception as e:
        return f"Error: {e}"

@tool
def get_current_time(timezone: str = "UTC") -> str:
    """Returns current time in the specified timezone."""
    from datetime import datetime
    import pytz
    tz = pytz.timezone(timezone)
    return datetime.now(tz).strftime("%Y-%m-%d %H:%M:%S")

tools = [calculator, get_current_time]
```

The `@tool` decorator is the cleanest way to create custom tools.

### Snippet 19: Agent with Memory

```python
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain_openai import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain_core.prompts import MessagesPlaceholder

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    MessagesPlaceholder(variable_name="chat_history"),
    ("human", "{input}"),
    MessagesPlaceholder(variable_name="agent_scratchpad")
])

memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

agent = create_openai_functions_agent(
    llm=ChatOpenAI(model="gpt-5"),
    tools=tools,
    prompt=prompt
)

executor = AgentExecutor(
    agent=agent,
    tools=tools,
    memory=memory,
    verbose=True
)

# Multi-turn with memory
executor.invoke({"input": "My name is Alex"})
executor.invoke({"input": "What's my name?"})  # Remembers "Alex"
```

Agents with memory can have coherent multi-turn conversations.

### Snippet 20: Structured Output Tools

```python
from langchain.tools import StructuredTool
from pydantic import BaseModel, Field

class SearchInput(BaseModel):
    query: str = Field(description="Search query")
    max_results: int = Field(default=5, description="Max results to return")

def search_func(query: str, max_results: int = 5) -> str:
    # Your actual search implementation
    return f"Found {max_results} results for: {query}"

search_tool = StructuredTool.from_function(
    func=search_func,
    name="search",
    description="Search the web",
    args_schema=SearchInput
)
```

Pydantic schemas give you type validation on tool inputs.

## Memory

Context management for multi-turn conversations.

### Snippet 21: Conversation Buffer Memory

```python
from langchain.memory import ConversationBufferMemory

memory = ConversationBufferMemory()

# Manually add messages
memory.save_context(
    {"input": "Hi, I'm Alice"},
    {"output": "Hello Alice! How can I help you?"}
)

# Load history
history = memory.load_memory_variables({})
print(history["history"])
```

Buffer memory stores the full conversation history.

### Snippet 22: Summary Memory

```python
from langchain.memory import ConversationSummaryMemory

memory = ConversationSummaryMemory(llm=ChatOpenAI(model="gpt-5"))

# Add many messages
memory.save_context({"input": "What is Python?"}, {"output": "Python is a programming language..."})
memory.save_context({"input": "How about JavaScript?"}, {"output": "JavaScript is a web language..."})
memory.save_context({"input": "Compare them"}, {"output": "Python is better for backend..."})

# Memory summarizes instead of storing everything
summary = memory.load_memory_variables({})
print(summary["history"])  # Contains a summary, not full messages
```

Summary memory uses an LLM to compress long histories.

### Snippet 23: Token Buffer Memory

```python
from langchain.memory import ConversationTokenBufferMemory
from langchain_openai import ChatOpenAI

memory = ConversationTokenBufferMemory(
    llm=ChatOpenAI(model="gpt-5"),
    max_token_limit=500  # Keep only last ~500 tokens of conversation
)

# Old messages are automatically dropped when limit is exceeded
memory.save_context({"input": "Long message..."}, {"output": "Long response..."})
```

Token buffer automatically trims old messages to stay within limits.

## Output Parsing

Structure LLM outputs into usable data.

### Snippet 24: JSON Output Parser

```python
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel

class Person(BaseModel):
    name: str
    age: int
    occupation: str

parser = JsonOutputParser(pydantic_object=Person)

prompt = ChatPromptTemplate.from_messages([
    ("system", "Extract person info and return JSON.\n{format_instructions}"),
    ("human", "{input}")
])

chain = prompt.partial(format_instructions=parser.get_format_instructions()) | llm | parser

result = chain.invoke({"input": "John is a 35-year-old software engineer."})
print(result)  # {"name": "John", "age": 35, "occupation": "software engineer"}
```

Pydantic models define your expected output structure.

### Snippet 25: List Output Parser

```python
from langchain_core.output_parsers import CommaSeparatedListOutputParser

parser = CommaSeparatedListOutputParser()

prompt = ChatPromptTemplate.from_template(
    "List 5 {category}. Return as comma-separated values.\n{format_instructions}"
)

chain = prompt.partial(format_instructions=parser.get_format_instructions()) | llm | parser

result = chain.invoke({"category": "programming languages"})
print(result)  # ["Python", "JavaScript", "Java", "C++", "Go"]
```

List parser handles comma-separated outputs cleanly.

## Frequently Asked Questions

### LangChain 0.2 vs 0.3—what changed?

LangChain 0.3 (released late 2025) brought cleaner imports, better LCEL, and separated provider packages. Old imports like `from langchain.llms import OpenAI` are deprecated. Use `from langchain_openai import ChatOpenAI` instead.

### Should I use LangChain or build directly with APIs?

Use LangChain when you need: chains, RAG, agents, memory, or multi-provider support. Use raw APIs for simple, single-model calls. LangChain adds overhead but saves time on complex applications.

### How do I debug LangChain chains?

Set `verbose=True` on `AgentExecutor` and chains. For deeper debugging, use LangSmith (LangChain's observability platform) or add logging at each chain step.

### Can I use LangChain with local models?

Yes! Use `langchain_community.llms.Ollama` for Ollama, or `langchain_huggingface` for HuggingFace models. Same patterns, different model initialization.

### What's the relationship between LangChain and LangGraph?

LangGraph builds on LangChain for complex, stateful multi-agent workflows. Use LangChain for simpler chains and agents; upgrade to LangGraph when you need cycles, conditional routing, or human-in-the-loop patterns.

## Build Your AI Application

Twenty-five patterns covering the core of LangChain development. These snippets work with the latest version as of January 2026.

LangChain's power is in composition—combining these patterns builds real applications. Start with a simple chain, add RAG for knowledge, add agents for autonomy. That's the progression.

For deeper dives, check our [RAG chatbot tutorial](/blog/build-rag-chatbot-tutorial) or [LangChain agents guide](/blog/langchain-agents-tutorial).

Now go chain some things together.
