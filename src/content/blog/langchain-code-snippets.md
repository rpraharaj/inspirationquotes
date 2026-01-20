---
title: "LangChain Code Snippets: 25+ Patterns for AI Apps (2026)"
description: "Master LangChain with 25+ ready-to-use code snippets. LCEL, agents, memory patterns, and production tips for AI app developers."
pubDate: 2025-12-03
updatedDate: 2025-12-26
category: "code-snippets"
keywords: ["LangChain code snippets", "LangChain examples", "LangChain Python patterns", "LangChain RAG tutorial"]
heroImage: "/images/featured/langchain-code-snippets.webp"
author: "AI Agents Kit"
readTime: 30
tags: ["LangChain", "Python", "Code Snippets", "RAG", "AI Agents"]
difficulty: "intermediate"
featured: false
---

LangChain has evolved a lot since it first appeared. The abstractions have matured, the docs have improved, and what used to require 50 lines now takes 10. But finding working examples that use the current syntax? Still harder than it should be.

I've built dozens of LangChain applications—chatbots, RAG systems, multi-agent workflows. This is my curated collection of patterns that actually work with LangChain 0.3.x in 2026.

Twenty-five code snippets is just the start. We're going deep into the LangChain Expression Language (LCEL), advanced memory patterns, and production deployment strategies. These aren't just toy examples; they are the exact same patterns I use in production environments every day, stripped of business logic and ready for you to adapt.

### Before You Start: Version Notes

These snippets target **<a href="https://python.langchain.com/docs/" target="_blank" rel="noopener">LangChain v0.3 Documentation</a>** (released late 2025). If you're upgrading from earlier versions, the main changes:

- **Imports moved:** `from langchain.llms import OpenAI` → `from langchain_openai import ChatOpenAI`
- **invoke() is standard:** The old `__call__` pattern is deprecated. Use `chain.invoke()` consistently.
- **Provider packages separated:** Install `langchain-openai`, `langchain-anthropic`, etc. separately

If you're starting fresh, you're fine. If upgrading, check your imports first—that's where most breaking changes live.

**Minimum installs for these examples:**
```bash
pip install langchain langchain-core langchain-openai langchain-community
```

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

**Why separate packages matter.** In earlier LangChain versions, installing `langchain` pulled in dependencies for every provider—even ones you'd never use. The new architecture keeps your dependencies lean. A project using only OpenAI doesn't need Anthropic's SDK installed.

**Environment variable conventions.** LangChain follows standard conventions: `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GOOGLE_API_KEY`. You can also pass keys directly to model constructors, but I recommend environment variables for security. Never commit API keys to version control.

**Async support.** Every model in LangChain supports both sync and async operations. The patterns in this guide use synchronous `invoke()` for simplicity, but you can substitute `ainvoke()` for async contexts. This matters when you're building web applications where blocking the event loop kills performance.

**Model fallback strategy.** In production, I always configure a fallback model. If your primary provider has an outage or hits rate limits, the fallback kicks in automatically. The cost of running a backup model is negligible compared to the cost of complete AI feature failures.

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

## LangChain Expression Language (LCEL)

LCEL is the biggest shift in how LangChain works. It's a declarative way to chain components, replacing the old `LLMChain` classes.

### Snippet 9: The Pipe Operator Explained

In standard Python, `a | b` usually means "bitwise OR". In LCEL, it means "pass the output of `a` into `b`".

```python
# The Old Way (Deprecated)
# chain = LLMChain(llm=llm, prompt=prompt)
# result = chain.run("topic")

# The LCEL Way
chain = prompt | llm | parser
result = chain.invoke("topic")
```

Under the hood, this works because LangChain components implement the `__or__` method. The data flows from left to right:
1. `dictionary` input goes into `prompt`
2. `PromptValue` goes into `llm`
3. `ChatMessage` goes into `parser`
4. `String` comes out

### Snippet 10: Runnables and Coercion

You can pipe more than just LangChain objects. Dictionaries and functions are automatically converted to "Runnables".

```python
from langchain_core.runnables import RunnableLambda

def length_function(text):
    return len(text)

# Functions become steps in the chain
chain = prompt | llm | StrOutputParser() | length_function

# Dictionaries enable parallel execution
map_chain = RunnableParallel({
    "original": RunnablePassthrough(),
    "length": length_function
})
```

This composability is what makes LCEL powerful. You can mix and match pre-built components with your own custom logic seamlessly.

### Snippet 11: Binding Runtime Arguments

Sometimes you need to pass arguments to the model at runtime, like stop sequences or function definitions.

```python
# Bind a stop sequence to the model
model_with_stop = llm.bind(stop=["\nEND"])

chain = prompt | model_with_stop | parser

# The model will always use that stop sequence in this chain
chain.invoke({"input": "Write a poem"})
```

This is cleaner than configuring the model instance differently for every chain.

## Chains

Chains combine components into sequences. The foundation of LangChain applications.

### Snippet 12: Simple Chain with LCEL

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

### Snippet 13: Sequential Chain

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

### Snippet 14: Parallel Chains

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

### Snippet 15: Conditional Chain

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

### Snippet 16: Basic RAG Setup

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

**Understanding retrieval quality.** The most common RAG failure isn't the LLM—it's retrieval. If the retriever returns irrelevant documents, the LLM has no choice but to generate incorrect answers or hallucinate. Always evaluate your retriever separately from your full RAG chain.

**Key metrics to track:**
- **Recall@k:** Of all relevant documents, how many appear in your top k results?
- **Precision@k:** Of the k documents retrieved, how many are actually relevant?
- **Mean Reciprocal Rank:** How high does the first relevant result appear?

**Retrieval tuning strategies:**
- Adjust `k` (number of documents retrieved)—more isn't always better, as irrelevant docs add noise
- Experiment with [embedding models](/blog/embeddings-explained)—domain-specific embeddings often outperform general ones
- Add metadata filtering to narrow the search space before semantic matching
- Consider hybrid search (Snippet 16) when keyword matching matters

I've seen teams spend weeks tuning LLM prompts when 10 minutes of retrieval analysis would have solved their accuracy problems. Check retrieval first.

### Snippet 17: Document Loading

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

### Snippet 18: Conversational RAG

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

### Snippet 19: Hybrid Search (Dense + Sparse)

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

### Snippet 20: Simple ReAct Agent

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

### Snippet 21: Custom Tool

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

### Snippet 22: Agent with Memory

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

### Snippet 23: Structured Output Tools

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

## Memory Patterns for Conversations

Memory is what turns a stateless LLM into a conversational partner. While passing `chat_history` manually always works, LangChain's memory utilities handle the plumbing for you.

### Snippet 24: Conversation Buffer Memory

The simplest form of memory: simply storing every message.

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

### Snippet 25: Summary Memory

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

### Snippet 26: Token Buffer Memory

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

### Snippet 27: Entity Memory

Extracts and stores specific facts about entities (people, places, things) separate from the conversation text.

```python
from langchain.memory import ConversationEntityMemory
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-5")
memory = ConversationEntityMemory(llm=llm)

input_text = "Deven & Sam are working on a hackathon project"
memory.save_context(
    {"input": input_text},
    {"output": "That sounds fun. What project?"}
)

print(memory.entity_store.store)
# Output: {'Deven': 'Working on a hackathon project', 'Sam': 'Working on a hackathon project'}
```

Use this for "long-term memory" about the user, rather than just the conversation context.

### Snippet 28: Vector Store Memory

For virtually infinite memory, store conversation turns in a vector database.

```python
from langchain.memory import VectorStoreRetrieverMemory
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings

vectorstore = FAISS.from_texts(["Initial context"], OpenAIEmbeddings())
retriever = vectorstore.as_retriever(search_kwargs=dict(k=1))
memory = VectorStoreRetrieverMemory(retriever=retriever)

memory.save_context({"input": "My favorite color is blue"}, {"output": "Noted."})
memory.save_context({"input": "I live in Boston"}, {"output": "Cool city."})

# Later...
print(memory.load_memory_variables({"prompt": "What do I like?"})["history"])
# Returns the 'blue' context because it's semantically relevant
```

This is how you build a "Second Brain" style assistant that remembers things from weeks ago.

## Output Parsing

Structure LLM outputs into usable data.

### Snippet 29: JSON Output Parser

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

### Snippet 30: List Output Parser

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

## LangSmith Debugging and Tracing

Building with LLMs is non-deterministic. Debugging strings is hard. LangSmith is the platform that solves this.

### Snippet 31: Configuring LangSmith

You don't need code changes—just environment variables.

```bash
export LANGCHAIN_TRACING_V2=true
export LANGCHAIN_ENDPOINT="https://api.smith.langchain.com"
export LANGCHAIN_API_KEY="ls-..."
export LANGCHAIN_PROJECT="my-agent-project"
```

Once set, every `invoke()` call is automatically logged to the LangSmith dashboard, showing:
- Exact inputs and outputs
- Latency and token usage per step
- Full trace of intermediate chain steps

### Snippet 32: Evaluation with LangSmith

How do you know if your changes made the bot better or worse?

```python
from langsmith import Client
from langchain.smith import RunEvalConfig, run_on_dataset

client = Client()

# Define your evaluation metrics
eval_config = RunEvalConfig(
    evaluators=["qa", "context_qa"],  # Built-in evaluators
    custom_evaluators=[]
)

# Run your chain against a dataset
chain_results = run_on_dataset(
    client=client,
    dataset_name="support-questions-v1",
    llm_or_chain_factory=my_chain,
    evaluation=eval_config,
)
```

This runs your chain against a test set and grades the answers automatically.

## Production Deployment Patterns

Moving from valid code to production service requires a different set of patterns.

### Snippet 33: Streaming with Timeout

In production, you never want to hang forever.

```python
import asyncio
from langchain_core.runnables import RunnableConfig

chain = prompt | llm

async def stream_with_timeout():
    try:
        # Set a strict timeout
        config = RunnableConfig(timeout=float(10.0))
        
        async for chunk in chain.astream({"input": "Hello"}, config=config):
            print(chunk.content, end="", flush=True)
            
    except asyncio.TimeoutError:
        print("\nRequest timed out.")
    except Exception as e:
        print(f"\nError: {e}")
```

### Snippet 34: User-Per-Request Configuration

Pass user IDs to the model for tracking and caching.

```python
config = {"metadata": {"user_id": "user_123", "conversation_id": "abc-456"}}

response = chain.invoke({"input": "Hi"}, config=config)
```

These metadata fields show up in LangSmith traces, making debugging user-specific issues trivial.

## Troubleshooting LangChain Issues

### "No module named 'langchain_openai'"

**Why it happens:** LangChain 0.3+ splits provider integrations into separate packages.

**Fix:** Install the provider package: `pip install langchain-openai` (or `-anthropic`, `-community`, etc.)

### Chain Returns Empty or None

**Why it happens:** Usually a mismatch between template variables and the data you're passing.

**Fix:** Print intermediate results. Add a step that logs: `chain = prompt | (lambda x: print(x) or x) | model | parser`

### "Retrying langchain.embeddings..." in a loop

**Why it happens:** Rate limiting or API key issues with the embedding provider.

**Fix:** Check your API key is set correctly. Add delays for batch embedding operations. Consider local embeddings for development.

### Agent Gets Stuck in a Loop

**Why it happens:** The agent can't find a satisfactory answer and keeps trying.

**Fix:** Set `max_iterations=5` on `AgentExecutor`. Add a fallback response for when iterations are exhausted.

### Vector Store Search Returns Irrelevant Results

**Why it happens:** Chunk size too large, or the [embedding model](/blog/embeddings-explained) doesn't capture your domain well.

**Fix:** Experiment with chunk sizes (500-1500 range). Try a different embedding model. Add metadata filtering.

## Combining These Patterns

Real applications mix patterns. Here's how they fit together:

**Customer Support Bot:**
- **Snippet 16 (Basic RAG)** for knowledge base search to answer common questions
- **Snippet 18 (Conversational RAG)** to handle follow-up questions with context
- **Snippet 20 (ReAct Agent)** if you need to check order status via an API
- **Snippet 29 (JSON Parser)** to categorize the ticket sentiment for reporting

**Document Analysis Pipeline:**
- **Snippet 17 (Document Loading)** for ingesting PDFs and websites
- **Snippet 14 (Parallel Chains)** to run summary, keyword extraction, and entity recognition simultaneously
- **Snippet 27 (Entity Memory)** to build a graph of people and companies mentioned across documents
- **Snippet 29 (JSON Parser)** to structure the final output for your database

**Code Assistant:**
- **Snippet 21 (Custom Tool)** for file system operations (read/write code)
- **Snippet 22 (Agent with Memory)** for understanding context across multiple files
- **Snippet 6 ([Few-Shot](/blog/zero-shot-vs-few-shot-prompting))** for consistent code formatting and style adhesion
- **Snippet 33 (Streaming)** to give real-time feedback as the code is generated

Start with the simplest pattern that solves your problem. Add complexity only when you hit its limits. For example, don't start with an agent if a simple chain will do.

## Frequently Asked Questions

### LangChain 0.2 vs 0.3—what changed?

LangChain 0.3 (released late 2025) brought cleaner imports, better LCEL, and separated provider packages. Old imports like `from langchain.llms import OpenAI` are deprecated. Use `from langchain_openai import ChatOpenAI` instead. This modularity reduces package size and conflicts.

### Should I use LangChain or build directly with APIs?

Use LangChain when you need: chains, RAG, agents, memory, or multi-provider support. Use raw APIs for simple, single-model calls. LangChain adds overhead but saves time on complex applications. If you're building a simple wrapper, the <a href="https://cookbook.openai.com/" target="_blank" rel="noopener">OpenAI Cookbook</a> has great raw API examples.

### How do I debug LangChain chains?

Set `verbose=True` on `AgentExecutor` and chains. For deeper debugging, use LangSmith (Snippet 31) or add logging at each chain step. You can also implement custom callbacks to log to your own observability stack. For error handling patterns, see our [AI error handling guide](/blog/ai-error-handling-snippets).

### Can I use LangChain with local models?

Yes! Use `langchain_community.llms.Ollama` for Ollama, or `langchain_huggingface` for HuggingFace models. The patterns remain 90% the same; you just swap the model initialization. This is excellent for testing without incurring API costs.

### What's the relationship between LangChain and LangGraph?

LangGraph builds on LangChain for complex, stateful multi-agent workflows. Use LangChain for simpler chains and agents (DAGs); upgrade to LangGraph when you need cycles, conditional routing, or human-in-the-loop patterns.

### How do I add streaming to my chains?

Replace `.invoke()` with `.stream()`. It returns an iterator of partial responses:
```python
for chunk in chain.stream({"input": "Hello"}):
    print(chunk, end="", flush=True)
```
Snippet 33 covers this in more detail with timeout handling.

### Why is my RAG returning the wrong context?

Three things to check: (1) Chunk size may be too large—try 500 characters. (2) Your [embedding model](/blog/embeddings-explained) may not understand your domain—fine-tuned embeddings help. (3) You may need hybrid search combining semantic and keyword matching (Snippet 19).

### Can I use LangChain without an API key for testing?

Yes! Use `langchain_community.llms.FakeListLLM` or Ollama with a local model. Great for unit tests and CI pipelines. For deeper debugging and evaluation, try <a href="https://www.langchain.com/langsmith" target="_blank" rel="noopener">LangSmith</a>.

## Build Your AI Application

Thirty-four patterns covering the core of LangChain development. These snippets work with the latest version as of January 2026.

LangChain's power is in composition—combining these patterns builds real applications. Start with a simple chain, add RAG for knowledge, add agents for autonomy. That's the progression.

**The learning path I recommend:**
1. Master basic chains and prompts first (Snippets 1-12)
2. Add retrieval and RAG when you need external knowledge (Snippets 16-19)
3. Graduate to agents when you need planning and tool use (Snippets 20-23)
4. Use memory and output parsing to polish the user experience (Snippets 24-30)
5. Optimize for production with tracing and streaming (Snippets 31-34)

For deeper dives, check our [RAG chatbot tutorial](/blog/build-rag-chatbot-tutorial) or [LangChain agents guide](/blog/langchain-agents-tutorial).

Building AI applications is a journey of continuous iteration. The snippets here are your starting blocks—the primitives you'll combine to build sophisticated, reasoned systems. As models get smarter and context windows get larger, these patterns will evolve, but the core principles of chaining, retrieval, and agency will remain the foundation of the AI engineer's toolkit.

Whatever you build next—whether it's a simple summarizer or a complex multi-agent system—remember to value reliability over complexity.

Now go chain some things together.
