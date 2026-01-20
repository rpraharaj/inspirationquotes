# Enhancement Draft: RAG Code Snippets: Build Retrieval Systems Fast (2026)

**Generated:** 2026-01-12
**Current Word Count:** 768 (visible to Google)
**Target Word Count:** 1500+
**Words to Add:** ~750

---

## Voice Analysis

The existing prose uses:
- First-person perspective ("I've built RAG systems...")
- Medium-length sentences with practical focus
- Direct, no-nonsense tone ("Not theoretical code that might work—actual patterns")
- Technical but accessible language
- Bullet points for lists, tables for comparisons
- Brief explanations before/after each code block

---

## Enhancement 1: Expand Introduction with Learning Objectives

**Location:** After line 22 (after "Let's build a RAG system that actually retrieves relevant context.")
**Words Added:** ~150

### Content to Add:

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

---

## Enhancement 2: Add Chunking Strategy Guide

**Location:** After line 148 (after "Chunking matters more than most people realize. Bad chunks = bad retrieval.")
**Words Added:** ~180

### Content to Add:

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

---

## Enhancement 3: Add Embedding Model Comparison

**Location:** After line 289 (after "Turning text into vectors for similarity search.")
**Words Added:** ~170

### Content to Add:

### Choosing an Embedding Model

Your embedding model significantly impacts retrieval quality and cost. Here's how the main options compare:

| Model | Dimensions | Cost | Quality | Speed |
|-------|------------|------|---------|-------|
| **OpenAI text-embedding-3-large** | 3072 | ~$0.13/1M tokens | Excellent | Fast (API) |
| **OpenAI text-embedding-3-small** | 1536 | ~$0.02/1M tokens | Very Good | Fast (API) |
| **all-MiniLM-L6-v2** | 384 | Free | Good | Very Fast (local) |
| **bge-large-en-v1.5** | 1024 | Free | Excellent | Moderate (local) |

**My recommendation:** Start with `all-MiniLM-L6-v2` for development—it's free, fast, and good enough for most use cases. Switch to OpenAI's large model when you need maximum quality or when you're building a production system where embedding costs are minimal compared to LLM inference.

For a deeper dive into how embeddings work, see our [embeddings explained](/blog/embeddings-explained) guide.

---

## Enhancement 4: Add Retrieval Quality Section

**Location:** After line 619 (after "Hybrid retrieval often outperforms pure semantic search.")
**Words Added:** ~150

### Content to Add:

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

---

## Enhancement 5: Troubleshooting Common Issues

**Location:** After line 851 (after "LLM-as-judge evaluation scales better than human evaluation.")
**Words Added:** ~120

### Content to Add:

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

---

## New Internal Links

| Anchor Text | Target | Insert Location |
|-------------|--------|-----------------|
| embeddings explained | /blog/embeddings-explained | Enhancement 3 (embedding comparison) |
| vector databases explained | /blog/vector-databases-explained | Around line 556 (Pinecone section) |
| LangChain patterns | /blog/langchain-code-snippets | Keep existing (line 883) |
| RAG chatbot tutorial | /blog/build-rag-chatbot-tutorial | Keep existing (lines 556, 883) |

---

## New External Links

| Anchor Text | URL | Insert Location |
|-------------|-----|-----------------|
| MTEB Embedding Leaderboard | https://huggingface.co/spaces/mteb/leaderboard | After embedding model comparison table |
| OpenAI Embeddings Guide | https://platform.openai.com/docs/guides/embeddings | Near OpenAI embedding snippets |
| Pinecone's RAG best practices | https://www.pinecone.io/learn/retrieval-augmented-generation/ | Near evaluation section |

---

## Summary

- Total words added: ~770
- New word count: ~1538
- New internal links: 2 (keeping 2 existing)
- New external links: 3
