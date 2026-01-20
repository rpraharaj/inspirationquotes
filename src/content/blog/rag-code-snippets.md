---
title: "RAG Code Snippets: Build Retrieval Systems Fast (2026)"
description: "25 copy-paste RAG code snippets for Python. Document loading, chunking, embeddings, vector stores, and retrieval patterns that work."
pubDate: 2025-12-18
category: "code-snippets"
keywords: ["RAG code snippets", "retrieval augmented generation code", "RAG Python examples", "vector database code"]
heroImage: "/images/featured/rag-code-snippets.webp"
author: "AI Agents Kit"
readTime: 22
tags: ["RAG", "Python", "Code Snippets", "Vector Database", "LLM"]
difficulty: "intermediate"
featured: false
---

RAG sounds simple on paper: retrieve relevant documents, stuff them in a prompt, get better answers. In practice, there are a dozen decisions that make or break your system—how you chunk, which embedding model, what retrieval strategy.

I've built RAG systems that worked beautifully and others that returned completely irrelevant garbage. The difference usually came down to small implementation details.

This collection is 25 code snippets covering every phase of RAG development. Not theoretical code that might work—actual patterns I've used in production. Copy, paste, adjust for your use case.

Let's build a RAG system that actually retrieves relevant context.

### What You'll Learn

By the end of this guide, you'll have working code for:

- **Document ingestion** from files, PDFs, and web pages
- **Smart chunking** that preserves semantic meaning
- **Embeddings** using both OpenAI and free local models
- **Vector storage** from simple in-memory to production-ready Pinecone
- **Advanced retrieval** including hybrid search and re-ranking
- **RAG generation** with citations and streaming
- **Quality evaluation** to measure retrieval and answer accuracy

Each snippet is designed to be copied directly into your project. I've stripped out the boilerplate and focused on patterns that actually work in production.

## Document Loading

Getting your data into a format you can work with.

### Snippet 1: Load Text Files

```python
from pathlib import Path

def load_text_files(directory: str) -> list[dict]:
    """Load all text files from a directory."""
    documents = []
    
    for path in Path(directory).glob("**/*.txt"):
        with open(path, "r", encoding="utf-8") as f:
            documents.append({
                "content": f.read(),
                "source": str(path),
                "filename": path.name
            })
    
    return documents

docs = load_text_files("./documents")
print(f"Loaded {len(docs)} documents")
```

Plain Python works fine for text files. No framework needed.

### Snippet 2: Load PDFs

```python
import fitz  # PyMuPDF

def load_pdf(path: str) -> str:
    """Extract text from a PDF file."""
    doc = fitz.open(path)
    text = ""
    
    for page in doc:
        text += page.get_text() + "\n\n"
    
    doc.close()
    return text

def load_pdf_with_metadata(path: str) -> dict:
    """Extract text and metadata from PDF."""
    doc = fitz.open(path)
    
    return {
        "content": "\n\n".join(page.get_text() for page in doc),
        "pages": len(doc),
        "title": doc.metadata.get("title", ""),
        "source": path
    }

content = load_pdf("document.pdf")
```

PyMuPDF (`fitz`) is faster and more reliable than most alternatives.

### Snippet 3: Load Web Pages

```python
import requests
from bs4 import BeautifulSoup

def load_webpage(url: str) -> dict:
    """Extract text content from a web page."""
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    
    # Remove scripts and styles
    for script in soup(["script", "style", "nav", "footer"]):
        script.decompose()
    
    text = soup.get_text(separator="\n", strip=True)
    
    return {
        "content": text,
        "url": url,
        "title": soup.title.string if soup.title else ""
    }

page = load_webpage("https://en.wikipedia.org/wiki/Large_language_model")
```

BeautifulSoup handles most HTML. Remove noise like scripts and navigation.

### Snippet 4: Load Multiple File Types

```python
from pathlib import Path

def load_document(path: str) -> dict:
    """Load a document, detecting type from extension."""
    path = Path(path)
    ext = path.suffix.lower()
    
    if ext == ".txt":
        with open(path, "r") as f:
            content = f.read()
    elif ext == ".pdf":
        content = load_pdf(str(path))
    elif ext == ".md":
        with open(path, "r") as f:
            content = f.read()
    elif ext == ".json":
        import json
        with open(path, "r") as f:
            content = json.dumps(json.load(f), indent=2)
    else:
        raise ValueError(f"Unsupported file type: {ext}")
    
    return {"content": content, "source": str(path), "type": ext}

# Load a folder of mixed documents
docs = [load_document(p) for p in Path("./docs").glob("**/*.*")]
```

A simple router for different file types.

## Text Splitting

Chunking matters more than most people realize. Bad chunks = bad retrieval.

### Choosing Your Chunking Strategy

The right chunking approach depends on your document type and retrieval needs:

| Document Type | Recommended Strategy | Why |
|---------------|---------------------|-----|
| **Long-form articles** | Recursive character splitting | Respects paragraph boundaries |
| **Technical docs** | Sentence-based | Keeps complete thoughts together |
| **Code documentation** | Token-based | Ensures context window fit |
| **Research papers** | Semantic splitting | Groups by topic changes |

**Common chunking mistakes:**
- Chunks too small (under 200 characters) lose context
- Chunks too large (over 2000 characters) dilute relevance
- Zero overlap loses information at boundaries
- Ignoring document structure (splitting mid-paragraph)

A good rule of thumb: start with 500-1000 characters and 100-200 character overlap. Test with real queries and adjust based on retrieval quality.

### Snippet 5: Recursive Character Splitting

```python
def recursive_split(text: str, chunk_size: int = 1000, overlap: int = 200) -> list[str]:
    """Split text recursively by paragraphs, then sentences, then characters."""
    separators = ["\n\n", "\n", ". ", " ", ""]
    
    def split_with_separator(text: str, sep_index: int) -> list[str]:
        if len(text) <= chunk_size:
            return [text]
        
        if sep_index >= len(separators):
            # Hard split at chunk_size
            return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size - overlap)]
        
        sep = separators[sep_index]
        if not sep:
            return split_with_separator(text, sep_index + 1)
        
        parts = text.split(sep)
        chunks = []
        current_chunk = ""
        
        for part in parts:
            test_chunk = current_chunk + sep + part if current_chunk else part
            
            if len(test_chunk) <= chunk_size:
                current_chunk = test_chunk
            else:
                if current_chunk:
                    chunks.append(current_chunk)
                if len(part) > chunk_size:
                    chunks.extend(split_with_separator(part, sep_index + 1))
                    current_chunk = ""
                else:
                    current_chunk = part
        
        if current_chunk:
            chunks.append(current_chunk)
        
        return chunks
    
    return split_with_separator(text, 0)

chunks = recursive_split(document_text, chunk_size=1000, overlap=200)
```

Recursive splitting preserves semantic boundaries when possible.

### Snippet 6: Sentence-Based Splitting

```python
import nltk
nltk.download('punkt', quiet=True)
from nltk.tokenize import sent_tokenize

def split_by_sentences(text: str, max_sentences: int = 5, overlap_sentences: int = 1) -> list[str]:
    """Split text into chunks of N sentences with overlap."""
    sentences = sent_tokenize(text)
    chunks = []
    
    for i in range(0, len(sentences), max_sentences - overlap_sentences):
        chunk = " ".join(sentences[i:i + max_sentences])
        chunks.append(chunk)
        
        if i + max_sentences >= len(sentences):
            break
    
    return chunks

chunks = split_by_sentences(text, max_sentences=5, overlap_sentences=1)
```

Sentence-based splitting is more linguistically sound than character-based.

### Snippet 7: Token-Based Splitting

```python
import tiktoken

def split_by_tokens(text: str, max_tokens: int = 500, overlap_tokens: int = 50) -> list[str]:
    """Split text into chunks by token count."""
    encoding = tiktoken.encoding_for_model("gpt-5")
    tokens = encoding.encode(text)
    
    chunks = []
    start = 0
    
    while start < len(tokens):
        end = start + max_tokens
        chunk_tokens = tokens[start:end]
        chunk_text = encoding.decode(chunk_tokens)
        chunks.append(chunk_text)
        start = end - overlap_tokens
    
    return chunks

chunks = split_by_tokens(text, max_tokens=500, overlap_tokens=50)
```

Token-based splitting ensures you don't exceed model context limits.

### Snippet 8: Semantic Splitting (by Topic)

```python
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def semantic_split(text: str, embedding_func, threshold: float = 0.5) -> list[str]:
    """Split text where topic changes significantly."""
    sentences = sent_tokenize(text)
    embeddings = [embedding_func(s) for s in sentences]
    
    chunks = []
    current_chunk = [sentences[0]]
    
    for i in range(1, len(sentences)):
        similarity = cosine_similarity(
            [embeddings[i-1]], 
            [embeddings[i]]
        )[0][0]
        
        if similarity < threshold:
            # Topic changed, start new chunk
            chunks.append(" ".join(current_chunk))
            current_chunk = [sentences[i]]
        else:
            current_chunk.append(sentences[i])
    
    if current_chunk:
        chunks.append(" ".join(current_chunk))
    
    return chunks
```

Semantic splitting creates more coherent chunks at topic boundaries.

## Embeddings

Turning text into vectors for similarity search.

### Choosing an Embedding Model

Your embedding model significantly impacts retrieval quality and cost. Here's how the main options compare:

| Model | Dimensions | Cost | Quality | Speed |
|-------|------------|------|---------|-------|
| **OpenAI text-embedding-3-large** | 3072 | ~$0.13/1M tokens | Excellent | Fast (API) |
| **OpenAI text-embedding-3-small** | 1536 | ~$0.02/1M tokens | Very Good | Fast (API) |
| **all-MiniLM-L6-v2** | 384 | Free | Good | Very Fast (local) |
| **bge-large-en-v1.5** | 1024 | Free | Excellent | Moderate (local) |

**My recommendation:** Start with `all-MiniLM-L6-v2` for development—it's free, fast, and good enough for most use cases. Switch to OpenAI's large model when you need maximum quality or when you're building a production system where embedding costs are minimal compared to LLM inference.

For a deeper dive into how embeddings work, see our [embeddings explained](/blog/embeddings-explained) guide. For benchmarks comparing embedding models, check the <a href="https://huggingface.co/spaces/mteb/leaderboard" target="_blank" rel="noopener">MTEB Embedding Leaderboard</a>.

### Snippet 9: OpenAI Embeddings

```python
from openai import OpenAI

client = OpenAI()

def get_embedding(text: str, model: str = "text-embedding-3-large") -> list[float]:
    """Get embedding from OpenAI."""
    response = client.embeddings.create(
        model=model,
        input=text
    )
    return response.data[0].embedding

def get_embeddings_batch(texts: list[str], model: str = "text-embedding-3-large") -> list[list[float]]:
    """Get embeddings for multiple texts at once."""
    response = client.embeddings.create(
        model=model,
        input=texts
    )
    return [item.embedding for item in response.data]

# Single embedding
embedding = get_embedding("What is machine learning?")

# Batch (more efficient)
embeddings = get_embeddings_batch(chunks)
```

Batch embedding is cheaper and faster for multiple texts.

### Snippet 10: Sentence Transformers (Free, Local)

```python
from sentence_transformers import SentenceTransformer

# Load model (downloads on first use)
model = SentenceTransformer("all-MiniLM-L6-v2")

def get_local_embedding(text: str) -> list[float]:
    """Get embedding using local model."""
    return model.encode(text).tolist()

def get_local_embeddings_batch(texts: list[str]) -> list[list[float]]:
    """Get embeddings for multiple texts."""
    return model.encode(texts).tolist()

# Usage
embedding = get_local_embedding("What is machine learning?")
embeddings = get_local_embeddings_batch(chunks)
```

Sentence Transformers are free, run locally, and are surprisingly good.

### Snippet 11: Caching Embeddings

```python
import json
import hashlib
from pathlib import Path

def cached_embedding(text: str, cache_dir: str = ".embedding_cache") -> list[float]:
    """Get embedding with disk caching."""
    Path(cache_dir).mkdir(exist_ok=True)
    
    # Create cache key from text hash
    text_hash = hashlib.md5(text.encode()).hexdigest()
    cache_path = Path(cache_dir) / f"{text_hash}.json"
    
    if cache_path.exists():
        return json.loads(cache_path.read_text())
    
    embedding = get_embedding(text)
    cache_path.write_text(json.dumps(embedding))
    
    return embedding

# First call: generates and caches
emb1 = cached_embedding("What is RAG?")

# Second call: loads from cache
emb2 = cached_embedding("What is RAG?")
```

Caching saves money and time on repeated embeddings.

### Snippet 12: Normalize Embeddings

```python
import numpy as np

def normalize_embedding(embedding: list[float]) -> list[float]:
    """Normalize embedding to unit length for cosine similarity."""
    arr = np.array(embedding)
    norm = np.linalg.norm(arr)
    return (arr / norm).tolist() if norm > 0 else embedding

def cosine_similarity(a: list[float], b: list[float]) -> float:
    """Compute cosine similarity between two normalized embeddings."""
    return np.dot(a, b)  # Works when embeddings are normalized

# Pre-normalize for faster similarity computation
normalized = [normalize_embedding(e) for e in embeddings]
```

Normalized embeddings allow dot product instead of full cosine calculation.

## Vector Stores

Storing and searching embeddings efficiently.

### Snippet 13: Simple In-Memory Vector Store

```python
import numpy as np
from dataclasses import dataclass

@dataclass
class Document:
    content: str
    embedding: list[float]
    metadata: dict

class SimpleVectorStore:
    def __init__(self):
        self.documents = []
    
    def add(self, content: str, embedding: list[float], metadata: dict = None):
        self.documents.append(Document(content, embedding, metadata or {}))
    
    def search(self, query_embedding: list[float], k: int = 5) -> list[tuple[Document, float]]:
        scores = []
        query = np.array(query_embedding)
        
        for doc in self.documents:
            doc_emb = np.array(doc.embedding)
            similarity = np.dot(query, doc_emb) / (np.linalg.norm(query) * np.linalg.norm(doc_emb))
            scores.append((doc, similarity))
        
        scores.sort(key=lambda x: x[1], reverse=True)
        return scores[:k]

# Usage
store = SimpleVectorStore()
for chunk in chunks:
    embedding = get_embedding(chunk)
    store.add(chunk, embedding, {"source": "doc.pdf"})

results = store.search(get_embedding("query"), k=3)
```

Good enough for prototyping and small datasets (<10k documents).

### Snippet 14: FAISS Vector Store

```python
import faiss
import numpy as np

class FAISSStore:
    def __init__(self, dimension: int):
        self.index = faiss.IndexFlatL2(dimension)
        self.documents = []
    
    def add(self, texts: list[str], embeddings: list[list[float]]):
        embeddings_array = np.array(embeddings).astype('float32')
        self.index.add(embeddings_array)
        self.documents.extend(texts)
    
    def search(self, query_embedding: list[float], k: int = 5) -> list[tuple[str, float]]:
        query = np.array([query_embedding]).astype('float32')
        distances, indices = self.index.search(query, k)
        
        results = []
        for dist, idx in zip(distances[0], indices[0]):
            if idx < len(self.documents):
                results.append((self.documents[idx], float(dist)))
        
        return results

# Usage
store = FAISSStore(dimension=3072)  # OpenAI large embedding dimension
store.add(chunks, embeddings)
results = store.search(query_embedding, k=5)
```

FAISS is fast and battle-tested. Great for medium-sized datasets.

### Snippet 15: Chroma Vector Store

```python
import chromadb

client = chromadb.Client()
collection = client.create_collection("my_docs")

def add_to_chroma(texts: list[str], embeddings: list[list[float]], ids: list[str] = None):
    """Add documents to Chroma collection."""
    if ids is None:
        ids = [f"doc_{i}" for i in range(len(texts))]
    
    collection.add(
        documents=texts,
        embeddings=embeddings,
        ids=ids
    )

def search_chroma(query_embedding: list[float], k: int = 5) -> list[dict]:
    """Search Chroma collection."""
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=k
    )
    
    return [
        {"text": doc, "id": id}
        for doc, id in zip(results["documents"][0], results["ids"][0])
    ]

# Usage
add_to_chroma(chunks, embeddings)
results = search_chroma(query_embedding, k=3)
```

Chroma is developer-friendly with built-in persistence.

### Snippet 16: Pinecone Vector Store

```python
from pinecone import Pinecone

pc = Pinecone(api_key="your-api-key")
index = pc.Index("my-index")

def add_to_pinecone(texts: list[str], embeddings: list[list[float]], ids: list[str] = None):
    """Upsert vectors to Pinecone."""
    if ids is None:
        ids = [f"doc_{i}" for i in range(len(texts))]
    
    vectors = [
        {"id": id, "values": emb, "metadata": {"text": text}}
        for id, emb, text in zip(ids, embeddings, texts)
    ]
    
    index.upsert(vectors=vectors)

def search_pinecone(query_embedding: list[float], k: int = 5) -> list[dict]:
    """Query Pinecone index."""
    results = index.query(
        vector=query_embedding,
        top_k=k,
        include_metadata=True
    )
    
    return [
        {"text": match.metadata["text"], "score": match.score}
        for match in results.matches
    ]

# Usage
add_to_pinecone(chunks, embeddings)
results = search_pinecone(query_embedding, k=3)
```

Pinecone for production—managed, scalable, fast. See our [vector database guide](/blog/vector-databases-explained) for more options.

## Retrieval

Getting the right context for your queries.

### Snippet 17: Basic Retrieval

```python
def retrieve(query: str, store, embedding_func, k: int = 5) -> list[str]:
    """Basic retrieval: embed query, find similar documents."""
    query_embedding = embedding_func(query)
    results = store.search(query_embedding, k=k)
    return [doc for doc, _ in results]

# Usage
context_docs = retrieve("What is machine learning?", store, get_embedding, k=3)
context = "\n\n".join(context_docs)
```

Simple but effective for many use cases.

### Snippet 18: Hybrid Retrieval (Dense + Sparse)

```python
from rank_bm25 import BM25Okapi
import numpy as np

class HybridRetriever:
    def __init__(self, documents: list[str], embeddings: list[list[float]]):
        self.documents = documents
        self.embeddings = np.array(embeddings)
        
        # BM25 for keyword matching
        tokenized = [doc.lower().split() for doc in documents]
        self.bm25 = BM25Okapi(tokenized)
    
    def search(self, query: str, query_embedding: list[float], 
               k: int = 5, dense_weight: float = 0.6) -> list[tuple[str, float]]:
        # Dense scores (semantic)
        query_emb = np.array(query_embedding)
        dense_scores = np.dot(self.embeddings, query_emb) / (
            np.linalg.norm(self.embeddings, axis=1) * np.linalg.norm(query_emb)
        )
        
        # Sparse scores (keyword)
        tokenized_query = query.lower().split()
        sparse_scores = np.array(self.bm25.get_scores(tokenized_query))
        
        # Normalize scores
        dense_scores = (dense_scores - dense_scores.min()) / (dense_scores.max() - dense_scores.min() + 1e-6)
        sparse_scores = (sparse_scores - sparse_scores.min()) / (sparse_scores.max() - sparse_scores.min() + 1e-6)
        
        # Combine
        combined = dense_weight * dense_scores + (1 - dense_weight) * sparse_scores
        
        top_indices = np.argsort(combined)[-k:][::-1]
        return [(self.documents[i], combined[i]) for i in top_indices]

retriever = HybridRetriever(chunks, embeddings)
results = retriever.search("machine learning", query_embedding, k=5)
```

Hybrid retrieval often outperforms pure semantic search.

### When to Use Each Retrieval Pattern

Not every RAG system needs hybrid search or re-ranking. Pick the right complexity for your use case:

**Basic retrieval** (Snippet 17) works well when:
- Your corpus is domain-specific and well-structured
- Queries closely match document language
- Speed is critical (sub-100ms retrieval)

**Hybrid retrieval** (Snippet 18) excels when:
- Users search for exact terms (product names, error codes)
- Your documents mix technical and natural language
- Keyword matches should boost relevance

**Re-ranking** (Snippet 19) is worth the latency when:
- You need maximum precision in top results
- Initial retrieval returns many similar-scoring documents
- Answer quality matters more than speed

Start simple. Add complexity only when basic retrieval fails on real queries from your users.

### Snippet 19: Re-ranking

```python
from sentence_transformers import CrossEncoder

reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-12-v2")

def retrieve_and_rerank(query: str, store, embedding_func, 
                        initial_k: int = 20, final_k: int = 5) -> list[str]:
    """Retrieve candidates then rerank with cross-encoder."""
    # Initial retrieval
    query_embedding = embedding_func(query)
    candidates = store.search(query_embedding, k=initial_k)
    
    # Rerank
    pairs = [(query, doc) for doc, _ in candidates]
    scores = reranker.predict(pairs)
    
    # Sort by reranker score
    reranked = sorted(zip(candidates, scores), key=lambda x: x[1], reverse=True)
    
    return [doc for (doc, _), _ in reranked[:final_k]]

results = retrieve_and_rerank("What is supervised learning?", store, get_embedding)
```

Re-ranking with a cross-encoder significantly improves relevance.

### Snippet 20: Multi-Query Retrieval

```python
def expand_query(query: str, llm) -> list[str]:
    """Generate multiple query variations using LLM."""
    prompt = f"""Generate 3 alternative phrasings for this search query.
Output each on a new line.

Query: {query}

Alternative phrasings:"""
    
    response = llm.invoke(prompt)
    variations = response.content.strip().split("\n")
    return [query] + [v.strip().lstrip("- ").strip() for v in variations if v.strip()]

def multi_query_retrieve(query: str, store, embedding_func, llm, k: int = 5) -> list[str]:
    """Retrieve using multiple query variations."""
    queries = expand_query(query, llm)
    
    all_results = {}
    for q in queries:
        results = store.search(embedding_func(q), k=k)
        for doc, score in results:
            if doc not in all_results or score > all_results[doc]:
                all_results[doc] = score
    
    # Sort by best score
    sorted_results = sorted(all_results.items(), key=lambda x: x[1], reverse=True)
    return [doc for doc, _ in sorted_results[:k]]

results = multi_query_retrieve("ML basics", store, get_embedding, llm, k=5)
```

Multiple query variations improve recall.

## Generation

Using retrieved context to generate answers.

### Snippet 21: Basic RAG Generation

```python
def generate_answer(query: str, context: list[str], llm) -> str:
    """Generate answer using retrieved context."""
    context_text = "\n\n---\n\n".join(context)
    
    prompt = f"""Answer the question based on the provided context.
If the context doesn't contain the answer, say "I don't have enough information."

Context:
{context_text}

Question: {query}

Answer:"""
    
    response = llm.invoke(prompt)
    return response.content

# Full RAG pipeline
context = retrieve(query, store, get_embedding, k=5)
answer = generate_answer(query, context, llm)
```

The classic RAG pattern: retrieve, format, generate.

### Snippet 22: RAG with Citations

```python
def generate_with_citations(query: str, context: list[dict], llm) -> dict:
    """Generate answer with source citations."""
    # Format context with source IDs
    formatted = ""
    for i, doc in enumerate(context):
        formatted += f"[{i+1}] {doc['content']}\n\n"
    
    prompt = f"""Answer the question using the provided sources. 
Cite sources using [1], [2], etc.

Sources:
{formatted}

Question: {query}

Answer (with citations):"""
    
    response = llm.invoke(prompt)
    
    return {
        "answer": response.content,
        "sources": [{"id": i+1, "source": doc["source"]} for i, doc in enumerate(context)]
    }

# Usage with sources
context = [{"content": chunk, "source": f"doc_{i}.pdf"} for i, chunk in enumerate(chunks)]
result = generate_with_citations(query, context[:5], llm)
print(result["answer"])  # "Machine learning is... [1][3]"
print(result["sources"])  # [{"id": 1, "source": "doc_0.pdf"}, ...]
```

Citations add verifiability to RAG answers.

### Snippet 23: Streaming RAG

```python
def stream_rag_answer(query: str, context: list[str], llm) -> None:
    """Stream RAG answer for real-time display."""
    context_text = "\n\n".join(context)
    
    prompt = f"""Answer based on context:
{context_text}

Question: {query}"""
    
    for chunk in llm.stream(prompt):
        print(chunk.content, end="", flush=True)

# Full streaming pipeline
context = retrieve(query, store, get_embedding, k=3)
stream_rag_answer(query, context, llm)
```

Streaming shows answers as they generate—better UX for long responses.

## Evaluation

Measuring RAG quality before deploying.

### Snippet 24: Retrieval Evaluation

```python
def evaluate_retrieval(queries: list[str], expected_docs: list[list[str]], 
                       retrieve_func, k: int = 5) -> dict:
    """Evaluate retrieval with precision and recall."""
    total_precision = 0
    total_recall = 0
    
    for query, expected in zip(queries, expected_docs):
        retrieved = retrieve_func(query, k=k)
        
        relevant_retrieved = len(set(retrieved) & set(expected))
        
        precision = relevant_retrieved / len(retrieved) if retrieved else 0
        recall = relevant_retrieved / len(expected) if expected else 0
        
        total_precision += precision
        total_recall += recall
    
    n = len(queries)
    return {
        "precision@k": total_precision / n,
        "recall@k": total_recall / n,
        "f1@k": 2 * (total_precision/n * total_recall/n) / (total_precision/n + total_recall/n + 1e-6)
    }

# Run evaluation
test_queries = ["What is ML?", "How does deep learning work?"]
expected = [["chunk_3", "chunk_7"], ["chunk_12", "chunk_15"]]
results = evaluate_retrieval(test_queries, expected, lambda q, k: retrieve(q, store, get_embedding, k))
```

Measure retrieval quality before worrying about generation quality.

### Snippet 25: End-to-End RAG Evaluation

```python
def evaluate_rag_answer(query: str, answer: str, context: list[str], llm) -> dict:
    """Evaluate RAG answer quality using LLM-as-judge."""
    
    eval_prompt = f"""Rate this answer on three criteria (1-5):

Question: {query}

Context provided:
{chr(10).join(context[:3])}

Answer: {answer}

Rate:
1. Relevance (does it answer the question?): 
2. Groundedness (is it based on the context?):
3. Completeness (is it thorough?):

Reply with JSON: {{"relevance": X, "groundedness": Y, "completeness": Z}}"""
    
    eval_response = llm.invoke(eval_prompt)
    
    import json
    try:
        scores = json.loads(eval_response.content)
        return scores
    except:
        return {"error": "Failed to parse evaluation"}

# Evaluate a RAG answer
context = retrieve(query, store, get_embedding, k=5)
answer = generate_answer(query, context, llm)
scores = evaluate_rag_answer(query, answer, context, llm)
print(scores)  # {"relevance": 4, "groundedness": 5, "completeness": 3}
```

LLM-as-judge evaluation scales better than human evaluation.

### Troubleshooting RAG Issues

When your RAG system returns irrelevant results, check these common causes:

**Problem: Retrieved documents don't match the query**
- Verify your embedding model matches between indexing and querying
- Check that chunks aren't too small (losing context) or too large (diluting relevance)
- Try hybrid search if exact keyword matches matter

**Problem: Good retrieval but poor answers**
- Your prompt template may need adjustment—show the LLM how to use context
- Retrieved chunks might lack the specific information needed
- Consider increasing k to retrieve more candidates

**Problem: Slow retrieval**
- Move from in-memory to FAISS or a managed vector database
- Reduce embedding dimensions if quality allows
- Add metadata filtering to narrow search scope

For more RAG best practices, see <a href="https://www.pinecone.io/learn/retrieval-augmented-generation/" target="_blank" rel="noopener">Pinecone's RAG guide</a>.

## Frequently Asked Questions

### What chunk size should I use?

Start with 500-1000 characters with 100-200 character overlap. Smaller chunks are better for precise retrieval, larger chunks provide more context. Experiment with your data—optimal chunk size depends on document structure.

### OpenAI embeddings vs local models?

OpenAI's `text-embedding-3-large` is best quality but costs money. Sentence Transformers (`all-MiniLM-L6-v2`) is free, fast, runs locally, and works well for most use cases. Start with local, upgrade if needed.

### How many documents should I retrieve (k)?

3-5 is a common starting point. More retrieval means more context but also more noise and higher token costs. Use re-ranking if you need to retrieve many candidates but present only the best.

### How do I handle large documents?

Split into chunks, retrieve relevant chunks, then use an LLM to summarize or synthesize across chunks. For very large documents, consider hierarchical retrieval: summarize sections, retrieve summaries, then retrieve from relevant sections.

### When should I use hybrid search?

When keyword matching matters. Pure semantic search can miss exact matches. Hybrid search catches both "machine learning" (semantically: AI, data science) AND the exact phrase. Try 70% dense / 30% sparse as a starting point.

## Build Your RAG System

Twenty-five patterns covering the complete RAG pipeline—from loading documents to evaluating answers.

RAG isn't magic. It's engineering: good chunks, good embeddings, good retrieval, good prompts. Each step compounds. Get any step wrong and quality suffers.

Start with the basics (snippets 1, 5, 9, 13, 17, 21). Get that working. Then add hybrid search, re-ranking, and multi-query retrieval to push quality higher.

For more depth on implementation, check our [complete RAG chatbot tutorial](/blog/build-rag-chatbot-tutorial) or [LangChain patterns](/blog/langchain-code-snippets).

Now go build something that actually retrieves relevant context.
