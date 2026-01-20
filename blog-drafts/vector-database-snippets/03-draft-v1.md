---
title: "Vector Database Snippets: Pinecone, Weaviate, Chroma"
description: "Copy-paste ready Python code snippets for Pinecone, Weaviate, and Chroma vector databases. Complete examples for indexing, querying, and filtering embeddings."
pubDate: 2026-01-11
category: ai-code-snippets
author: Raj Praharaj
tags:
  - Vector Databases
  - Pinecone
  - Weaviate
  - Chroma
  - Python
  - RAG
readingTime: 16 min read
---

Vector databases power every modern RAG system, semantic search, and AI-powered recommendation engine—but working with them can be frustrating. Each database has its own API conventions, query syntax, and quirks that take time to learn using their documentation.

I've spent countless hours context-switching between Pinecone, Weaviate, and Chroma docs while building AI applications. So I compiled this reference: copy-paste ready snippets organized by operation type, all tested and working with the latest SDK versions as of January 2026.

Whether you're prototyping with Chroma, scaling with Pinecone, or leveraging Weaviate's hybrid search, you'll find working examples here. Bookmark this page—you'll come back to it.

## Getting Started

Before diving into the snippets, here's what you need to know about each database:

| Database | Best For | Hosting | Free Tier |
|----------|----------|---------|-----------|
| **Pinecone** | Production scale, managed service | Cloud only | 1 index, 100K vectors |
| **Weaviate** | Hybrid search, GraphQL | Self-host or cloud | Self-host (free) |
| **Chroma** | Local development, prototyping | Local or embedded | Unlimited (open source) |

**Prerequisites:**
- Python 3.10 or higher
- Basic understanding of [embeddings and how they work](/blog/embeddings-explained)
- An embedding model (OpenAI, Cohere, or local)

If you're new to vector databases, check out our [vector databases explained](/blog/vector-databases-explained) guide first.

## Pinecone Snippets

Pinecone is a fully managed vector database optimized for production workloads. The latest SDK (v7.x) uses the 2025-04 API version.

### Setup and Installation

```python
# Install the latest Pinecone SDK
# pip install pinecone

from pinecone import Pinecone

# Initialize with API key
pc = Pinecone(api_key="your-api-key")

# Check connection
print(pc.list_indexes().names())
```

### Creating and Managing Indexes

```python
from pinecone import Pinecone, ServerlessSpec

pc = Pinecone(api_key="your-api-key")

# Create a serverless index
pc.create_index(
    name="my-index",
    dimension=1536,  # OpenAI embedding dimension
    metric="cosine",  # or "euclidean", "dotproduct"
    spec=ServerlessSpec(
        cloud="aws",
        region="us-east-1"
    )
)

# Wait for index to be ready
import time
while not pc.describe_index("my-index").status["ready"]:
    time.sleep(1)

# Connect to the index
index = pc.Index("my-index")

# Delete an index
pc.delete_index("my-index")
```

### Upserting Vectors

```python
# Single vector upsert
index.upsert(
    vectors=[
        {
            "id": "doc-1",
            "values": [0.1, 0.2, ...],  # 1536-dim vector
            "metadata": {
                "title": "Introduction to AI",
                "category": "tutorial",
                "date": "2026-01-11"
            }
        }
    ],
    namespace="articles"  # optional namespace
)

# Batch upsert (recommended for large datasets)
def batch_upsert(index, vectors, batch_size=100):
    """Upsert vectors in batches to avoid timeouts."""
    for i in range(0, len(vectors), batch_size):
        batch = vectors[i:i + batch_size]
        index.upsert(vectors=batch, namespace="articles")
        print(f"Upserted batch {i // batch_size + 1}")

# Example with embeddings
vectors_to_upsert = [
    {"id": f"doc-{i}", "values": embeddings[i], "metadata": metadata[i]}
    for i in range(len(documents))
]
batch_upsert(index, vectors_to_upsert)
```

### Querying and Searching

```python
# Basic similarity search
results = index.query(
    vector=[0.1, 0.2, ...],  # query embedding
    top_k=10,
    include_metadata=True,
    namespace="articles"
)

# Process results
for match in results["matches"]:
    print(f"ID: {match['id']}")
    print(f"Score: {match['score']:.4f}")
    print(f"Metadata: {match['metadata']}")
    print("---")

# Query by ID (fetch existing vector)
fetched = index.fetch(ids=["doc-1", "doc-2"], namespace="articles")
for id, data in fetched["vectors"].items():
    print(f"{id}: {data['metadata']}")
```

### Metadata Filtering

```python
# Filter by exact match
results = index.query(
    vector=query_embedding,
    top_k=10,
    filter={
        "category": {"$eq": "tutorial"}
    }
)

# Complex filters
results = index.query(
    vector=query_embedding,
    top_k=10,
    filter={
        "$and": [
            {"category": {"$in": ["tutorial", "guide"]}},
            {"date": {"$gte": "2026-01-01"}},
            {"views": {"$gt": 1000}}
        ]
    }
)

# Filter operators: $eq, $ne, $gt, $gte, $lt, $lte, $in, $nin, $and, $or
```

### Namespace Management

```python
# List all namespaces in an index
stats = index.describe_index_stats()
print(f"Namespaces: {list(stats['namespaces'].keys())}")

# Delete all vectors in a namespace
index.delete(delete_all=True, namespace="old-articles")

# Delete specific vectors
index.delete(ids=["doc-1", "doc-2"], namespace="articles")
```

## Weaviate Snippets

Weaviate shines with its native hybrid search (combining vector and keyword search) and GraphQL interface. The v4 Python client is the current stable release.

### Setup (Local and Cloud)

```python
# Install: pip install weaviate-client

import weaviate
from weaviate.classes.init import Auth

# Connect to Weaviate Cloud
client = weaviate.connect_to_weaviate_cloud(
    cluster_url="https://your-cluster.weaviate.network",
    auth_credentials=Auth.api_key("your-api-key")
)

# Or connect to local instance
client = weaviate.connect_to_local()

# Check connection
print(client.is_ready())

# Always close when done
client.close()

# Or use context manager
with weaviate.connect_to_local() as client:
    print(client.is_ready())
```

### Schema and Collections

```python
from weaviate.classes.config import Configure, Property, DataType

# Create a collection (replaces "class" in v3)
client.collections.create(
    name="Article",
    vectorizer_config=Configure.Vectorizer.text2vec_openai(),
    properties=[
        Property(name="title", data_type=DataType.TEXT),
        Property(name="content", data_type=DataType.TEXT),
        Property(name="category", data_type=DataType.TEXT),
        Property(name="published", data_type=DataType.DATE),
    ]
)

# Get collection reference
articles = client.collections.get("Article")

# List all collections
print([c.name for c in client.collections.list_all()])

# Delete a collection
client.collections.delete("Article")
```

### Adding Objects

```python
articles = client.collections.get("Article")

# Add single object (auto-vectorized)
uuid = articles.data.insert(
    properties={
        "title": "Getting Started with AI Agents",
        "content": "AI agents are autonomous systems...",
        "category": "tutorial",
        "published": "2026-01-11T00:00:00Z"
    }
)
print(f"Created: {uuid}")

# Add with custom vector
uuid = articles.data.insert(
    properties={"title": "Custom Vector Example", ...},
    vector=[0.1, 0.2, ...]
)

# Batch insert
with articles.batch.dynamic() as batch:
    for doc in documents:
        batch.add_object(
            properties={
                "title": doc["title"],
                "content": doc["content"],
                "category": doc["category"]
            }
        )
```

### Vector Search

```python
from weaviate.classes.query import MetadataQuery

articles = client.collections.get("Article")

# Near text search (uses vectorizer)
results = articles.query.near_text(
    query="how to build AI agents",
    limit=5,
    return_metadata=MetadataQuery(distance=True)
)

for obj in results.objects:
    print(f"Title: {obj.properties['title']}")
    print(f"Distance: {obj.metadata.distance:.4f}")
    print("---")

# Near vector search (provide your own vector)
results = articles.query.near_vector(
    near_vector=[0.1, 0.2, ...],
    limit=5
)
```

### Hybrid Search

```python
# Combine vector and keyword search
results = articles.query.hybrid(
    query="AI agents tutorial",
    alpha=0.5,  # 0 = keyword only, 1 = vector only
    limit=10
)

for obj in results.objects:
    print(f"Title: {obj.properties['title']}")
    print(f"Score: {obj.metadata.score}")

# Hybrid with BM25 boost
results = articles.query.hybrid(
    query="AI agents",
    query_properties=["title^2", "content"],  # boost title matches
    alpha=0.7,
    limit=10
)
```

### Filters and GraphQL

```python
from weaviate.classes.query import Filter

# Filter with vector search
results = articles.query.near_text(
    query="machine learning basics",
    filters=Filter.by_property("category").equal("tutorial"),
    limit=10
)

# Complex filters
results = articles.query.near_text(
    query="AI development",
    filters=(
        Filter.by_property("category").contains_any(["tutorial", "guide"]) &
        Filter.by_property("published").greater_than("2026-01-01T00:00:00Z")
    ),
    limit=10
)

# Raw GraphQL query (for advanced use cases)
result = client.graphql_raw_query("""
{
    Get {
        Article(
            limit: 5
            nearText: {concepts: ["AI agents"]}
            where: {
                path: ["category"]
                operator: Equal
                valueText: "tutorial"
            }
        ) {
            title
            content
            _additional {
                distance
                certainty
            }
        }
    }
}
""")
```

## Chroma Snippets

Chroma is perfect for local development and prototyping—it's open source, runs in-memory or persisted, and has the simplest API of the three.

### Installation and Persistence

```python
# Install: pip install chromadb

import chromadb

# In-memory client (data lost on restart)
client = chromadb.Client()

# Persistent client (saves to disk)
client = chromadb.PersistentClient(path="./chroma_db")

# HTTP client (connect to running server)
client = chromadb.HttpClient(host="localhost", port=8000)
```

### Collection Management

```python
# Create a collection
collection = client.create_collection(
    name="articles",
    metadata={"hnsw:space": "cosine"}  # or "l2", "ip"
)

# Get or create (idempotent)
collection = client.get_or_create_collection(name="articles")

# List all collections
print([c.name for c in client.list_collections()])

# Get existing collection
collection = client.get_collection(name="articles")

# Delete collection
client.delete_collection(name="articles")
```

### Adding Documents

```python
collection = client.get_or_create_collection("articles")

# Add with auto-generated embeddings (uses default embedding function)
collection.add(
    documents=["First document text", "Second document text"],
    ids=["doc-1", "doc-2"],
    metadatas=[
        {"category": "tutorial", "author": "Alice"},
        {"category": "guide", "author": "Bob"}
    ]
)

# Add with custom embeddings
collection.add(
    embeddings=[[0.1, 0.2, ...], [0.3, 0.4, ...]],
    documents=["First doc", "Second doc"],
    ids=["doc-1", "doc-2"],
    metadatas=[{"category": "tutorial"}, {"category": "guide"}]
)

# Update existing documents
collection.update(
    ids=["doc-1"],
    documents=["Updated first document text"],
    metadatas=[{"category": "updated-tutorial"}]
)

# Upsert (insert or update)
collection.upsert(
    ids=["doc-1", "doc-3"],
    documents=["Updated doc 1", "New doc 3"],
    metadatas=[{"category": "tutorial"}, {"category": "new"}]
)
```

### Querying

```python
# Query by text (auto-embeds query)
results = collection.query(
    query_texts=["how to build AI applications"],
    n_results=5,
    include=["documents", "metadatas", "distances"]
)

# Process results
for i, doc_id in enumerate(results["ids"][0]):
    print(f"ID: {doc_id}")
    print(f"Document: {results['documents'][0][i][:100]}...")
    print(f"Distance: {results['distances'][0][i]:.4f}")
    print(f"Metadata: {results['metadatas'][0][i]}")
    print("---")

# Query with custom embedding
results = collection.query(
    query_embeddings=[[0.1, 0.2, ...]],
    n_results=5
)

# Get by ID (no search)
results = collection.get(
    ids=["doc-1", "doc-2"],
    include=["documents", "metadatas"]
)
```

### Metadata Filtering

```python
# Filter by metadata
results = collection.query(
    query_texts=["AI tutorial"],
    n_results=10,
    where={"category": "tutorial"}
)

# Complex filters
results = collection.query(
    query_texts=["machine learning"],
    n_results=10,
    where={
        "$and": [
            {"category": {"$in": ["tutorial", "guide"]}},
            {"author": {"$ne": "Alice"}}
        ]
    }
)

# Document content filter
results = collection.query(
    query_texts=["AI"],
    n_results=10,
    where_document={"$contains": "machine learning"}
)

# Combined filters
results = collection.query(
    query_texts=["AI development"],
    where={"category": "tutorial"},
    where_document={"$contains": "Python"},
    n_results=5
)
```

### Custom Embedding Functions

```python
from chromadb.utils.embedding_functions import OpenAIEmbeddingFunction

# Use OpenAI embeddings
openai_ef = OpenAIEmbeddingFunction(
    api_key="your-openai-key",
    model_name="text-embedding-3-small"
)

collection = client.create_collection(
    name="articles-openai",
    embedding_function=openai_ef
)

# Sentence Transformers (local, free)
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction

local_ef = SentenceTransformerEmbeddingFunction(
    model_name="all-MiniLM-L6-v2"
)

collection = client.create_collection(
    name="articles-local",
    embedding_function=local_ef
)
```

## Cross-Database Patterns

### Choosing the Right Database

Here's my take after using all three in production:

**Choose Pinecone when:**
- You need a managed service with strong SLAs
- Your workload requires millions of vectors
- You want minimal operational overhead
- Budget isn't a primary concern

**Choose Weaviate when:**
- You need hybrid search (vector + keyword)
- GraphQL fits your architecture
- You want to self-host for data sovereignty
- You need advanced filtering capabilities

**Choose Chroma when:**
- You're prototyping or in early development
- Your dataset is small to medium (<1M vectors)
- You want zero infrastructure setup
- You prefer embedded databases

### Common Embedding Workflow

Regardless of which database you use, the embedding workflow is similar:

```python
from openai import OpenAI

def get_embeddings(texts: list[str], model="text-embedding-3-small"):
    """Get embeddings for a list of texts using OpenAI."""
    client = OpenAI()
    response = client.embeddings.create(
        input=texts,
        model=model
    )
    return [item.embedding for item in response.data]

# Usage
documents = ["First document", "Second document", "Third document"]
embeddings = get_embeddings(documents)

# Now insert into your database of choice
# Pinecone: index.upsert(vectors=[{"id": ..., "values": emb, ...}])
# Weaviate: collection.data.insert(properties=..., vector=emb)
# Chroma: collection.add(embeddings=..., documents=..., ids=...)
```

For more on embeddings, see our [OpenAI API tutorial](/blog/openai-api-tutorial).

### Error Handling Pattern

```python
import time
from typing import Callable

def retry_with_backoff(
    func: Callable,
    max_retries: int = 3,
    base_delay: float = 1.0
):
    """Retry a function with exponential backoff."""
    for attempt in range(max_retries):
        try:
            return func()
        except Exception as e:
            if attempt == max_retries - 1:
                raise
            delay = base_delay * (2 ** attempt)
            print(f"Attempt {attempt + 1} failed: {e}. Retrying in {delay}s...")
            time.sleep(delay)

# Usage
result = retry_with_backoff(
    lambda: index.query(vector=embedding, top_k=10)
)
```

## Frequently Asked Questions

### Which vector database should I start with?

Start with Chroma for local development—it's the fastest to set up and has zero config. When you need production scale or managed infrastructure, migrate to Pinecone or Weaviate.

### How do I migrate between vector databases?

Export your documents and metadata, regenerate embeddings if needed (to match dimension requirements), and re-insert into the new database. The core data model (id, vector, metadata) is similar across all three.

### Can I use the same embeddings across different databases?

Yes, as long as the embedding dimension matches what the database expects. A 1536-dimension OpenAI embedding works in any database configured for that size.

### How do I handle large datasets that don't fit in memory?

Use batch processing: split your data into chunks of 100-1000 vectors, process each batch sequentially, and use the database's batch/upsert methods. All three databases support this pattern.

### What's the difference between "distance" and "similarity" scores?

Distance measures how far apart vectors are (lower = more similar). Similarity is the inverse (higher = more similar). Cosine similarity ranges from -1 to 1, while cosine distance ranges from 0 to 2.

### Do I need to handle rate limits?

Pinecone and Weaviate Cloud have API rate limits—use exponential backoff and batch your requests. Chroma (local) has no limits beyond your hardware capacity.

## Wrapping Up

Vector databases are essential infrastructure for any AI application using embeddings. With these snippets, you can:

- **Pinecone**: Scale to millions of vectors with a managed service
- **Weaviate**: Leverage hybrid search and self-hosting
- **Chroma**: Prototype quickly with zero configuration

The snippets here are tested and ready to copy into your projects. Bookmark this page and come back whenever you need a quick reference.

Ready to build something with these? Check out our [RAG chatbot tutorial](/blog/build-rag-chatbot-tutorial) to see vector databases in action, or explore how [embeddings power semantic search](/blog/embeddings-explained).
