---
heroImage: "/images/featured/ai-error-handling-snippets.webp"
title: "AI Error Handling: Retry, Fallback, and Rate Limit Patterns"
description: "Production-ready Python code for handling LLM API errors with exponential backoff, rate limiting, and fallbacks."
pubDate: 2025-12-08
category: code-snippets
author: Raj Praharaj
tags: ["Error Handling", "Python", "API", "Production"]
keywords: ["error handling", "LLM", "python", "API", "production", "best practices"]
readingTime: 25
---

Here's a truth nobody warns you about when you start building AI applications: LLM APIs fail constantly. Rate limits, timeouts, overloaded models, random server errors—I've seen them all, usually at the worst possible times. My first production AI feature hit rate limits within hours of launch and took down the entire workflow.

The difference between a prototype and a production-ready AI application isn't the model—it's the error handling. These snippets represent hundreds of hours of debugging production issues and learning what actually works when things go wrong.

Every pattern here is something I've used in real systems. Copy them directly into your projects.

**What you'll learn:**
- How to identify and classify AI API errors
- Retry strategies that actually work (exponential backoff, jitter)
- Rate limiting to stay within quotas
- Fallback patterns for model and provider failures
- Circuit breakers for cascade failure prevention
- Cost protection against runaway API spending
- Production-ready wrapper code you can use immediately

**Prerequisites:** Basic Python knowledge and familiarity with async programming. Some patterns work with any language, but code examples are in Python. Understanding [how LLM APIs work](/blog/openai-api-tutorial) will help you get more from this guide.

## Common AI API Errors

Before diving into solutions, let's understand what we're dealing with. These are the errors you'll encounter most frequently:

| Error | HTTP Code | Cause | Recovery |
|-------|-----------|-------|----------|
| **Rate Limited** | 429 | Too many requests | Exponential backoff |
| **Server Overload** | 503 | Model capacity exceeded | Retry with backoff |
| **Timeout** | 408/504 | Request took too long | Retry or fail fast |
| **Authentication** | 401/403 | Invalid API key | Check credentials |
| **Context Exceeded** | 400 | Input too long | Truncate or chunk |
| **Invalid Request** | 400 | Malformed input | Fix and retry |
| **Internal Error** | 500 | Provider issue | Retry or fallback |

**Rate limits** are by far the most common in production. Every LLM provider has them, and they're often surprisingly low for new accounts. <a href="https://platform.openai.com/docs/guides/rate-limits" target="_blank" rel="noopener">OpenAI</a>, <a href="https://docs.anthropic.com/en/docs/build-with-claude/rate-limits" target="_blank" rel="noopener">Anthropic</a>, and Google all throttle aggressively until you've built up usage history.

**Timeouts** are the sneakiest. Your API call might succeed on the provider's end, but your client gives up waiting. Now you've potentially used tokens without getting a response.

**Context length errors** are entirely preventable but still catch people off guard. Claude 4 supports 200K tokens, GPT-5-Turbo handles 128K, but if you're building a [RAG system](/blog/understanding-rag-retrieval-augmented-generation), it's easy to accidentally exceed limits.

### Understanding Error Sources

AI API errors fall into three categories, each requiring different handling:

**Provider-side errors** originate from OpenAI, Anthropic, or Google's infrastructure. Rate limits, server overload, and model capacity issues fall here. These are generally transient—retry with backoff usually succeeds.

**Client-side errors** result from your code: malformed requests, invalid API keys, exceeding context length. These won't fix themselves on retry. Catch them early and fail with clear error messages.

**Network errors** happen between you and the provider: DNS failures, connection timeouts, SSL issues. They're unpredictable and often regional. Retry helps, but consider geographic redundancy for critical applications.

**Error frequency in production** (based on my logs from a mid-scale AI application):

| Error Type | Frequency | Typical Resolution |
|------------|-----------|-------------------|
| Rate limits (429) | 60% | Wait and retry |
| Timeouts | 20% | Retry or fail fast |
| Server errors (5xx) | 15% | Retry with backoff |
| Auth errors (401/403) | 4% | Fix credentials |
| Invalid requests (400) | 1% | Fix request format |

Most errors are recoverable. The key is distinguishing which ones are worth retrying.

## Error Handling Philosophy for AI Applications

Before diving into code, let's establish the right mindset for AI error handling. The techniques here differ from traditional web API error handling in important ways.

### Why AI APIs Are Different

Traditional REST APIs are relatively predictable. You send a request, you get a response in milliseconds, and errors are usually your fault (bad input) or the server's fault (outage). AI APIs introduce unique challenges:

**Non-deterministic response times.** A simple question might take 500ms while a complex reasoning task takes 30 seconds. This variability makes timeout settings much harder to calibrate.

**Token-based throttling.** Rate limits aren't just about requests per minute. Providers limit tokens per minute, tokens per day, and concurrent requests. Understanding [how LLMs work](/blog/what-is-llm-explained) helps you predict which requests will consume more capacity.

**Model availability varies.** Popular models face capacity constraints during peak hours. Claude, GPT-4, and Gemini sometimes reject requests because they're literally too busy, not because you've exceeded any limit.

**Costs accumulate silently.** Unlike traditional APIs where you might get charged per request, LLM APIs charge per token. A runaway loop or overly verbose prompt can rack up significant costs before you notice.

**Partial success is possible.** Streaming responses might stop mid-message. You could receive 80% of an answer before hitting a timeout. Deciding how to handle partial results requires careful thought.

### The Error Handling Pyramid

I think of error handling as a pyramid with four levels:

**Level 1: Detection** — Knowing something went wrong. This means proper exception handling, logging, and monitoring.

**Level 2: Classification** — Understanding what went wrong. Is this a transient error worth retrying? A configuration issue? A fundamental problem with your request?

**Level 3: Recovery** — Taking appropriate action. Retry? Fall back? Fail gracefully? Each error type needs a specific recovery strategy.

**Level 4: Prevention** — Learning from errors to prevent them. Rate limiting before you hit limits. Truncating before you exceed context length. Monitoring before small issues become outages.

The code patterns that follow address all four levels. But the mindset matters as much as the implementation.

### Graceful Degradation Strategies

When AI fails, you have several options depending on your use case:

**Return cached results.** If you've seen a similar query before, a slightly stale answer might be better than no answer. This works well for common questions or recommendations.

**Simplify the request.** Try a smaller model or a simpler prompt. GPT-4's 128K context might be overwhelmed, but GPT-4-Turbo with a truncated context could succeed.

**Offer a limited experience.** If AI-powered search fails, fall back to keyword search. If smart summaries fail, show the raw text. Users prefer something over nothing.

**Queue and notify.** For non-urgent requests, acknowledge receipt and process later. "We'll email you when your report is ready" is better than an error page.

**Fail transparently.** When you must fail, tell users why. "Our AI is currently overloaded—please try again in a few minutes" is better than a generic error.

The right strategy depends on your specific application and user expectations. The code below gives you the building blocks to implement any of these approaches.

## Exponential Backoff

The foundation of all retry logic is exponential backoff: wait longer between each retry attempt, giving the API time to recover.

### Basic Implementation

```python
import time
import random
from typing import TypeVar, Callable

T = TypeVar("T")

def retry_with_backoff(
    func: Callable[[], T],
    max_retries: int = 5,
    base_delay: float = 1.0,
    max_delay: float = 60.0,
    exponential_base: float = 2.0,
) -> T:
    """
    Retry a function with exponential backoff.
    
    Args:
        func: Function to retry (should be a callable with no args)
        max_retries: Maximum number of retry attempts
        base_delay: Initial delay between retries in seconds
        max_delay: Maximum delay between retries
        exponential_base: Base for exponential calculation
    
    Returns:
        Result of the function
    
    Raises:
        Last exception if all retries fail
    """
    last_exception = None
    
    for attempt in range(max_retries + 1):
        try:
            return func()
        except Exception as e:
            last_exception = e
            
            if attempt == max_retries:
                raise
            
            delay = min(
                base_delay * (exponential_base ** attempt),
                max_delay
            )
            
            print(f"Attempt {attempt + 1} failed: {e}")
            print(f"Retrying in {delay:.1f}s...")
            time.sleep(delay)
    
    raise last_exception

# Usage
from openai import OpenAI

client = OpenAI()

def make_request():
    return client.chat.completions.create(
        model="gpt-5-turbo",
        messages=[{"role": "user", "content": "Hello"}]
    )

response = retry_with_backoff(make_request)
```

**Understanding the Math:**

With default settings (base_delay=1.0, exponential_base=2.0), your retry delays look like:
- Attempt 1 fails → wait 1 second
- Attempt 2 fails → wait 2 seconds  
- Attempt 3 fails → wait 4 seconds
- Attempt 4 fails → wait 8 seconds
- Attempt 5 fails → wait 16 seconds (then give up)

Total maximum wait: about 31 seconds before failure. This is usually enough for transient issues to resolve.

**When to Adjust:**

**Shorter timeouts** for user-facing requests where responsiveness matters. Use max_retries=3 and max_delay=10.

**Longer timeouts** for background jobs where completion matters more than speed. Use max_retries=7 and max_delay=120.

**Different base delays** based on the error. Rate limits often require 30-60 seconds; connection errors may resolve in 1-2 seconds.

### With Jitter

Adding randomness prevents the "thundering herd" problem where multiple clients retry at exactly the same time:

```python
def retry_with_jitter(
    func: Callable[[], T],
    max_retries: int = 5,
    base_delay: float = 1.0,
    max_delay: float = 60.0,
) -> T:
    """Retry with exponential backoff and jitter."""
    
    for attempt in range(max_retries + 1):
        try:
            return func()
        except Exception as e:
            if attempt == max_retries:
                raise
            
            # Exponential backoff
            delay = base_delay * (2 ** attempt)
            
            # Add jitter: random value between 0 and delay
            jitter = random.uniform(0, delay)
            total_delay = min(delay + jitter, max_delay)
            
            print(f"Attempt {attempt + 1} failed. Retrying in {total_delay:.1f}s...")
            time.sleep(total_delay)
```

### Selective Retry by Exception Type

Only retry on recoverable errors:

```python
from openai import (
    APIError,
    APIConnectionError,
    RateLimitError,
    APIStatusError
)

RETRYABLE_ERRORS = (
    RateLimitError,
    APIConnectionError,
    APIStatusError,  # 5xx errors
)

NON_RETRYABLE_ERRORS = (
    # Don't retry on these - they won't magically fix themselves
    # AuthenticationError, InvalidRequestError, etc.
)

def smart_retry(func: Callable[[], T], max_retries: int = 5) -> T:
    """Retry only on recoverable errors."""
    
    for attempt in range(max_retries + 1):
        try:
            return func()
        except RETRYABLE_ERRORS as e:
            if attempt == max_retries:
                raise
            
            delay = min(2 ** attempt, 60)
            
            # Rate limits often include retry-after header
            if isinstance(e, RateLimitError):
                retry_after = getattr(e, 'retry_after', None)
                if retry_after:
                    delay = float(retry_after)
            
            time.sleep(delay)
        except Exception as e:
            # Non-retryable error, fail immediately
            raise
```

## Rate Limit Handling

Rate limits require more sophisticated handling than simple retries. Understanding how providers implement limits helps you work within them gracefully.

### Understanding Rate Limit Types

LLM providers typically enforce several types of limits simultaneously:

**Requests per minute (RPM):** The simplest limit—how many API calls you can make. Typically 60-3000 depending on your tier.

**Tokens per minute (TPM):** How many tokens (input + output) you can process. This is usually the binding constraint for high-volume applications.

**Tokens per day (TPD):** A daily cap to prevent runaway costs. Especially strict for new accounts.

**Concurrent requests:** How many requests can be in-flight at once. Often 5-50 depending on provider and tier.

**Understanding [token counting](/blog/what-is-llm-explained) helps you estimate where you'll hit limits first.**

**Tier-Based Limits:**

| Tier | OpenAI RPM | OpenAI TPM | Anthropic RPM | Anthropic TPM |
|------|------------|------------|---------------|---------------|
| Free | 3 | 40K | 5 | 40K |
| Tier 1 | 60 | 60K | 60 | 40K |
| Tier 2 | 500 | 300K | 400 | 100K |
| Enterprise | Custom | Custom | Custom | Custom |

*Limits increase automatically as you build usage history and spend.*

### Proactive vs. Reactive Rate Limiting

There are two approaches to rate limit handling:

**Reactive:** Wait until you hit a limit, then back off. Simple to implement but creates user-visible delays.

**Proactive:** Track your usage and slow down before hitting limits. Smoother experience but more complex to implement.

For most applications, I recommend a hybrid: proactive limiting to stay within 80% of your quota, with reactive handling for the occasional spike.

### Respecting Rate Limit Headers

Most APIs tell you exactly how long to wait:

```python
from openai import RateLimitError
import re

def extract_retry_after(error: RateLimitError) -> float:
    """Extract wait time from rate limit error."""
    
    # Try the retry_after attribute first
    if hasattr(error, 'retry_after') and error.retry_after:
        return float(error.retry_after)
    
    # Parse from error message as fallback
    message = str(error)
    
    # Match patterns like "Please retry after X seconds"
    match = re.search(r'retry after (\d+)', message, re.IGNORECASE)
    if match:
        return float(match.group(1))
    
    # Match "Please try again in Xms"
    match = re.search(r'try again in (\d+)ms', message, re.IGNORECASE)
    if match:
        return float(match.group(1)) / 1000
    
    # Default fallback
    return 60.0

def handle_rate_limit(error: RateLimitError):
    """Handle rate limit with proper wait time."""
    wait_time = extract_retry_after(error)
    print(f"Rate limited. Waiting {wait_time:.1f}s...")
    time.sleep(wait_time)
```

### Token Bucket Rate Limiter

Proactively limit your requests to avoid hitting rate limits:

```python
import threading
import time
from typing import Optional

class TokenBucket:
    """
    Token bucket rate limiter for proactive rate limiting.
    
    Configure with your API's rate limits (e.g., 60 requests per minute).
    """
    
    def __init__(
        self,
        tokens_per_second: float,
        max_tokens: Optional[int] = None
    ):
        self.tokens_per_second = tokens_per_second
        self.max_tokens = max_tokens or int(tokens_per_second * 10)
        self.tokens = self.max_tokens
        self.last_refill = time.time()
        self.lock = threading.Lock()
    
    def _refill(self):
        """Add tokens based on elapsed time."""
        now = time.time()
        elapsed = now - self.last_refill
        tokens_to_add = elapsed * self.tokens_per_second
        self.tokens = min(self.max_tokens, self.tokens + tokens_to_add)
        self.last_refill = now
    
    def acquire(self, tokens: int = 1, timeout: float = 60.0) -> bool:
        """
        Acquire tokens, blocking until available or timeout.
        
        Returns True if tokens acquired, False if timeout.
        """
        deadline = time.time() + timeout
        
        while True:
            with self.lock:
                self._refill()
                
                if self.tokens >= tokens:
                    self.tokens -= tokens
                    return True
            
            if time.time() >= deadline:
                return False
            
            # Wait a bit before checking again
            time.sleep(0.1)

# Usage: 60 requests per minute = 1 per second
rate_limiter = TokenBucket(tokens_per_second=1.0)

def rate_limited_request(prompt: str):
    """Make a request with proactive rate limiting."""
    if not rate_limiter.acquire(timeout=30):
        raise TimeoutError("Rate limiter timeout")
    
    return client.chat.completions.create(
        model="gpt-5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
```

### Request Queue for Batch Processing

For batch operations, queue requests to stay within limits:

```python
import asyncio
from typing import List, Any
from dataclasses import dataclass

@dataclass
class QueuedRequest:
    prompt: str
    future: asyncio.Future

class RequestQueue:
    """Queue for rate-limited batch processing."""
    
    def __init__(self, requests_per_minute: int = 60):
        self.delay = 60.0 / requests_per_minute
        self.queue: asyncio.Queue[QueuedRequest] = asyncio.Queue()
        self._running = False
    
    async def start(self):
        """Start processing the queue."""
        self._running = True
        while self._running:
            try:
                request = await asyncio.wait_for(
                    self.queue.get(),
                    timeout=1.0
                )
                
                try:
                    result = await self._make_request(request.prompt)
                    request.future.set_result(result)
                except Exception as e:
                    request.future.set_exception(e)
                
                await asyncio.sleep(self.delay)
                
            except asyncio.TimeoutError:
                continue
    
    async def _make_request(self, prompt: str):
        # Your async LLM call here
        pass
    
    async def submit(self, prompt: str) -> Any:
        """Submit a request and wait for result."""
        future = asyncio.get_event_loop().create_future()
        await self.queue.put(QueuedRequest(prompt=prompt, future=future))
        return await future
    
    def stop(self):
        self._running = False
```

### Logging for AI Error Debugging

Good error logs make the difference between hours of debugging and minutes. Here's what to capture. I've spent too many hours trying to debug AI API issues with insufficient logging—don't repeat my mistakes.

### The Art of AI Debugging

Debugging AI API issues differs from traditional debugging:

**You can't reproduce locally.** Rate limits depend on your production quota. Outages are transient. The bug you saw five minutes ago might not happen again.

**Provider state is invisible.** You don't know why OpenAI returned a 500. Was it your request? Their infrastructure? A shared resource with another customer?

**Timing matters enormously.** An issue at 2pm PST might be due to US peak traffic. An issue at midnight might be scheduled maintenance. Log timestamps in UTC consistently.

**Correlation is everything.** Link your errors to specific request IDs, user sessions, and business transactions. When support asks "what was the request ID?", you need to answer instantly.

### Essential Logging Fields

Every AI API call should log:

| Field | Why It Matters |
|-------|----------------|
| Request ID | Provider-side trace for support escalation |
| Internal Trace ID | Your own correlation across services |
| Model | Different models have different issues |
| Prompt Tokens | Helps identify context-length issues |
| Completion Tokens | Cost tracking and detecting truncation |
| Latency (ms) | Performance baseline and anomaly detection |
| Status | Success, error, or retry |
| Error Type | Classification for aggregation |
| Retry Attempt | Understanding retry patterns |
| Estimated Cost | Budget tracking |

**Implementation example:**

**Essential fields for every AI API call:**
```python
import logging
from datetime import datetime

def log_api_call(
    model: str,
    prompt_tokens: int,
    request_id: str,
    status: str,
    latency_ms: float,
    error: str = None
):
    logging.info({
        "timestamp": datetime.utcnow().isoformat(),
        "model": model,
        "prompt_tokens": prompt_tokens,
        "request_id": request_id,  # From response headers
        "status": status,
        "latency_ms": latency_ms,
        "error": error
    })
```

**Include request IDs.** OpenAI returns `x-request-id` in response headers. Anthropic uses `request-id`. Log these—support teams can trace individual requests when you need to escalate issues.

**Track patterns over time.** Daily rate limit hits at 2pm might indicate a scheduled job elsewhere. Timeout spikes could correlate with provider status page incidents. Aggregate logs reveal patterns individual errors don't.

### Building a Logging Strategy

Good logging is the foundation of debuggable AI applications. Here's what I recommend:

**Log Levels:**

- **DEBUG:** Full request/response payloads (careful with sensitive data!)
- **INFO:** Every API call with timing, tokens, status
- **WARNING:** Retries, rate limits, partial failures
- **ERROR:** Unrecoverable failures, circuit breaker triggers

**Structured Fields for Every AI Request:**

```python
{
    "timestamp": "2026-01-12T22:15:00Z",
    "request_id": "req-abc123",              # Provider's ID
    "trace_id": "trace-xyz789",              # Your internal trace
    "model": "gpt-5-turbo",
    "prompt_tokens": 1500,
    "completion_tokens": 500,
    "total_tokens": 2000,
    "latency_ms": 2340,
    "status": "success|error|retry",
    "error_type": "rate_limit|timeout|etc",  # If applicable
    "attempt": 1,                            # Current retry attempt
    "estimated_cost_usd": 0.0045,            # For cost tracking
}
```

**Log Analysis Queries:**

Once you have structured logs, useful queries include:

- "Show all rate limit errors in the last 24 hours grouped by hour"
- "What's the P95 latency by model over the past week?"
- "Which requests cost more than $0.10?"
- "How many retries are we averaging per request?"

These patterns help you optimize usage and catch issues early.

### Monitoring and Alerting

Production AI applications need real-time visibility into error rates.

**Key metrics to track:**
- **Error rate**: Percentage of failed requests (target: <1%)
- **P95 latency**: 95th percentile response time (target: varies by model)
- **Rate limit utilization**: How close you are to limits
- **Token consumption**: Daily/hourly usage for cost tracking

**Alert thresholds I recommend:**
- Error rate > 5% for 5 minutes → Page on-call
- All requests failing → Immediate alert
- Rate limit utilization > 80% → Warning to plan capacity
- Latency P95 > 2x baseline → Performance investigation

**Simple monitoring with Prometheus metrics:**
```python
from prometheus_client import Counter, Histogram

ai_requests = Counter('ai_requests_total', 'AI API requests', ['model', 'status'])
ai_latency = Histogram('ai_request_latency_seconds', 'AI request latency', ['model'])

def tracked_completion(prompt: str, model: str):
    with ai_latency.labels(model=model).time():
        try:
            result = make_completion(prompt, model)
            ai_requests.labels(model=model, status='success').inc()
            return result
        except Exception as e:
            ai_requests.labels(model=model, status='error').inc()
            raise
```

## Fallback Patterns

When one model or provider fails, fall back to alternatives. Fallback strategies are essential for production AI applications because no single provider guarantees 100% uptime.

### Fallback Strategy Design

Several factors determine your fallback strategy:

**Capability preservation.** Does the fallback model provide equivalent capabilities? Claude Opus falling back to Claude Haiku sacrifices quality for availability.

**Cost implications.** Fallback models may cost more or less. GPT-5 falling back to GPT-5-Turbo saves money; GPT-5-Turbo falling back to Claude Opus may cost more.

**Response consistency.** Different models produce different outputs. For applications requiring consistent formatting or behavior, test fallbacks thoroughly.

**Latency changes.** Fallback models may have different latency characteristics. Factor this into timeout handling.

### Fallback Architecture Options

**Same-provider fallback:** Stay within one provider but switch models (GPT-5 → GPT-5-Turbo → GPT-5-Mini). Simpler to implement, but doesn't protect against provider-wide outages.

**Cross-provider fallback:** Switch between providers (OpenAI → Anthropic → Google). More resilient, but requires maintaining multiple integrations.

**Hybrid fallback:** Try within-provider fallback first, then cross-provider. Best of both worlds but most complex.

**Graceful degradation:** Instead of full fallback, offer reduced functionality. If complex analysis fails, offer simpler summaries using a cheaper model.

### Choosing a Fallback Strategy

| Use Case | Recommended Strategy |
|----------|---------------------|
| Customer-facing chat | Cross-provider (maximize uptime) |
| Internal tools | Same-provider (simplicity) |
| Mission-critical | Hybrid with multiple fallbacks |
| Cost-sensitive | Same-provider with cheaper model |

### Model Fallback Implementation

```python
from dataclasses import dataclass
from typing import List, Optional

@dataclass
class ModelConfig:
    provider: str  # "openai", "anthropic", "google"
    model: str
    priority: int  # Lower is higher priority

FALLBACK_MODELS = [
    ModelConfig("openai", "gpt-5-turbo", 1),
    ModelConfig("openai", "gpt-5-mini", 2),
    ModelConfig("anthropic", "claude-4-haiku", 3),
]

def completion_with_fallback(
    prompt: str,
    models: List[ModelConfig] = FALLBACK_MODELS
) -> tuple[str, ModelConfig]:
    """
    Try models in priority order until one succeeds.
    Returns the response and which model was used.
    """
    sorted_models = sorted(models, key=lambda m: m.priority)
    last_error = None
    
    for model_config in sorted_models:
        try:
            response = call_model(model_config, prompt)
            return response, model_config
        except Exception as e:
            print(f"Model {model_config.model} failed: {e}")
            last_error = e
            continue
    
    raise last_error

def call_model(config: ModelConfig, prompt: str) -> str:
    """Call the appropriate provider's API."""
    if config.provider == "openai":
        response = openai_client.chat.completions.create(
            model=config.model,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content
    
    elif config.provider == "anthropic":
        response = anthropic_client.messages.create(
            model=config.model,
            max_tokens=1024,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.content[0].text
    
    # Add other providers...
```

### Provider Fallback with Health Checks

```python
import time
from enum import Enum

class ProviderStatus(Enum):
    HEALTHY = "healthy"
    DEGRADED = "degraded"
    DOWN = "down"

class ProviderHealthTracker:
    """Track provider health and route accordingly."""
    
    def __init__(self, providers: List[str]):
        self.providers = providers
        self.error_counts = {p: 0 for p in providers}
        self.last_errors = {p: 0.0 for p in providers}
        self.cooldown_until = {p: 0.0 for p in providers}
    
    def record_success(self, provider: str):
        """Record successful request."""
        self.error_counts[provider] = 0
    
    def record_failure(self, provider: str):
        """Record failed request."""
        self.error_counts[provider] += 1
        self.last_errors[provider] = time.time()
        
        # Put provider in cooldown after 3 consecutive failures
        if self.error_counts[provider] >= 3:
            cooldown = min(60 * self.error_counts[provider], 300)  # Max 5 min
            self.cooldown_until[provider] = time.time() + cooldown
    
    def get_status(self, provider: str) -> ProviderStatus:
        """Get current provider status."""
        if time.time() < self.cooldown_until[provider]:
            return ProviderStatus.DOWN
        
        if self.error_counts[provider] > 0:
            return ProviderStatus.DEGRADED
        
        return ProviderStatus.HEALTHY
    
    def get_available_providers(self) -> List[str]:
        """Get providers sorted by health (healthiest first)."""
        available = [
            p for p in self.providers
            if self.get_status(p) != ProviderStatus.DOWN
        ]
        
        # Sort by error count (least errors first)
        return sorted(available, key=lambda p: self.error_counts[p])
```

## Circuit Breaker Pattern

The circuit breaker pattern comes from electrical engineering: when a circuit overloads, the breaker trips to prevent damage. In software, we apply the same concept to API calls.

### When to Use Circuit Breakers

Circuit breakers are essential when:

**Protecting downstream services.** If your AI provider is struggling, hammering them with retries makes things worse for everyone.

**Failing fast.** Rather than waiting 30 seconds for a timeout, fail immediately when you know the service is down.

**Enabling recovery.** Circuit breakers include a "half-open" state that periodically tests if the service has recovered.

**Preventing cascade failures.** If component A depends on component B, and B fails, you don't want A to exhaust its resources waiting for B.

### Circuit Breaker vs. Retry

These patterns complement each other:

- **Retry:** For transient failures where success is likely if you wait a bit
- **Circuit Breaker:** For sustained outages where retrying wastes resources

A typical architecture uses both: retry on individual failures, but trip the circuit breaker if failures become frequent.

### Implementation

Prevent cascade failures by stopping requests to failing services:

```python
import time
from enum import Enum
from typing import Callable, TypeVar

class CircuitState(Enum):
    CLOSED = "closed"      # Normal operation
    OPEN = "open"          # Failing, reject requests
    HALF_OPEN = "half_open"  # Testing if recovered

T = TypeVar("T")

class CircuitBreaker:
    """
    Circuit breaker for AI API calls.
    
    - CLOSED: Normal operation, track failures
    - OPEN: Service is down, fail fast
    - HALF_OPEN: Allow one test request
    """
    
    def __init__(
        self,
        failure_threshold: int = 5,
        recovery_timeout: float = 30.0,
        half_open_requests: int = 1
    ):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.half_open_requests = half_open_requests
        
        self.state = CircuitState.CLOSED
        self.failure_count = 0
        self.last_failure_time = 0.0
        self.half_open_successes = 0
    
    def call(self, func: Callable[[], T]) -> T:
        """Execute function through circuit breaker."""
        
        if self.state == CircuitState.OPEN:
            if time.time() - self.last_failure_time >= self.recovery_timeout:
                self.state = CircuitState.HALF_OPEN
                self.half_open_successes = 0
            else:
                raise Exception("Circuit breaker is OPEN")
        
        try:
            result = func()
            self._record_success()
            return result
        except Exception as e:
            self._record_failure()
            raise
    
    def _record_success(self):
        if self.state == CircuitState.HALF_OPEN:
            self.half_open_successes += 1
            if self.half_open_successes >= self.half_open_requests:
                self.state = CircuitState.CLOSED
                self.failure_count = 0
        else:
            self.failure_count = 0
    
    def _record_failure(self):
        self.failure_count += 1
        self.last_failure_time = time.time()
        
        if self.failure_count >= self.failure_threshold:
            self.state = CircuitState.OPEN
        elif self.state == CircuitState.HALF_OPEN:
            self.state = CircuitState.OPEN

### Cost Protection Patterns

A runaway loop can rack up thousands of dollars in API costs in minutes. Protect yourself. I've seen teams get surprised by five-figure bills from bugs in production AI systems.

### Why Cost Protection Matters

**AI APIs are expensive at scale.** A simple bug that calls an API in a tight loop can spend thousands before anyone notices. Unlike traditional APIs with flat-rate pricing, LLM costs scale with usage.

**Costs are hard to predict.** Token counts depend on input and output length, which varies by prompt. A feature that costs $10/day in testing might cost $1000/day with real user behavior.

**Feedback loops are dangerous.** AI systems that call other AI systems can create multiplicative cost explosions. An [AI agent](/blog/what-are-ai-agents) that makes 10 API calls per user request, called by another agent, quickly becomes expensive.

### Cost Protection Strategies

**Hard budget limits:** Stop all requests when spending exceeds a threshold. Disruptive but safe. Essential for development and staging environments.

**Soft budget limits:** Alert when approaching limits but don't block. Better for production where availability matters.

**Per-request limits:** Reject requests that would exceed a certain cost. Prevents individual expensive requests.

**Tiered quotas:** Different limits for different user types, request types, or time periods.

**Implementation:**

```python
from datetime import datetime

class SpendingGuard:
    def __init__(self, daily_limit_usd: float):
        self.daily_limit = daily_limit_usd
        self.today_spend = 0.0
        self.last_reset = datetime.now().date()
    
    def can_spend(self, estimated_cost: float) -> bool:
        self._maybe_reset()
        return self.today_spend + estimated_cost <= self.daily_limit
    
    def record_spend(self, cost: float):
        self._maybe_reset()
        self.today_spend += cost
    
    def _maybe_reset(self):
        if datetime.now().date() > self.last_reset:
            self.today_spend = 0.0
            self.last_reset = datetime.now().date()
```

**Token estimation before sending.** Use tiktoken to estimate input tokens. Reject requests that would exceed your budget. For output, estimate based on max_tokens parameter.

# Usage
openai_breaker = CircuitBreaker(failure_threshold=3, recovery_timeout=60)

def safe_completion(prompt: str):
    return openai_breaker.call(
        lambda: client.chat.completions.create(
            model="gpt-5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
    )
```

## Timeout Management

Handle slow responses before they become problems:

```python
import asyncio
from typing import Optional

async def completion_with_timeout(
    prompt: str,
    timeout: float = 30.0,
    model: str = "gpt-5-turbo"
) -> Optional[str]:
    """
    Make completion request with timeout.
    Returns None if timeout exceeded.
    """
    try:
        response = await asyncio.wait_for(
            async_client.chat.completions.create(
                model=model,
                messages=[{"role": "user", "content": prompt}]
            ),
            timeout=timeout
        )
        return response.choices[0].message.content
    except asyncio.TimeoutError:
        print(f"Request timed out after {timeout}s")
        return None

# Synchronous version using threading
import concurrent.futures

def sync_completion_with_timeout(
    prompt: str,
    timeout: float = 30.0
) -> Optional[str]:
    """Synchronous completion with timeout."""
    
    def make_request():
        return client.chat.completions.create(
            model="gpt-5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
    
    with concurrent.futures.ThreadPoolExecutor() as executor:
        future = executor.submit(make_request)
        try:
            response = future.result(timeout=timeout)
            return response.choices[0].message.content
        except concurrent.futures.TimeoutError:
            return None
```

### Timeout Best Practices

Choosing the right timeout values requires understanding your use case:

**User-facing requests:** 10-30 seconds maximum. Users won't wait longer. If AI can't respond in time, either fail gracefully or show a loading state and complete asynchronously.

**Background processing:** 60-120 seconds is reasonable. The user isn't waiting, so you can be more patient.

**Streaming responses:** Timeout should reflect time-to-first-token, not total response time. Once tokens are flowing, extend the timeout dynamically.

**Timeout by Model:**

| Model | Typical Latency | Suggested Timeout |
|-------|----------------|-------------------|
| GPT-5-Turbo | 1-5 seconds | 15 seconds |
| GPT-5 (full) | 3-15 seconds | 45 seconds |
| Claude 4 Sonnet | 2-8 seconds | 30 seconds |
| Claude 4 Opus | 5-20 seconds | 60 seconds |
| Gemini 2 Pro | 1-5 seconds | 15 seconds |

*Latency varies significantly by prompt length and complexity.*

### Handling Timeout Edge Cases

**Partial responses:** When using streaming, you might receive partial content before timeout. Decide in advance: is 80% of an answer useful, or should you retry for the complete response?

**Idempotency:** If a request times out, the provider may have started generating a response. For non-idempotent operations (like function calls that modify data), implement request deduplication.

**Timeout cascades:** If your application has multiple AI calls in sequence, individual timeouts should sum to less than your total budget. A 30-second timeout for each of 5 calls means 2.5 minutes worst case.

## Production-Ready Wrapper

Combining everything into a single, production-ready client:

```python
from dataclasses import dataclass
from typing import Optional, List
import time

@dataclass
class CompletionResult:
    content: str
    model_used: str
    attempts: int
    total_time: float

class ResilientLLMClient:
    """Production-ready LLM client with comprehensive error handling."""
    
    def __init__(
        self,
        primary_model: str = "gpt-5-turbo",
        fallback_models: List[str] = None,
        max_retries: int = 3,
        timeout: float = 30.0,
    ):
        self.primary_model = primary_model
        self.fallback_models = fallback_models or ["gpt-5-mini"]
        self.max_retries = max_retries
        self.timeout = timeout
        self.circuit_breaker = CircuitBreaker()
        self.rate_limiter = TokenBucket(tokens_per_second=1.0)
    
    def complete(self, prompt: str) -> CompletionResult:
        """Make a completion with full error handling."""
        start_time = time.time()
        attempts = 0
        
        models = [self.primary_model] + self.fallback_models
        
        for model in models:
            for attempt in range(self.max_retries):
                attempts += 1
                
                try:
                    # Rate limiting
                    self.rate_limiter.acquire()
                    
                    # Circuit breaker
                    response = self.circuit_breaker.call(
                        lambda: self._make_request(model, prompt)
                    )
                    
                    return CompletionResult(
                        content=response,
                        model_used=model,
                        attempts=attempts,
                        total_time=time.time() - start_time
                    )
                    
                except RateLimitError as e:
                    wait = extract_retry_after(e)
                    time.sleep(wait)
                except Exception as e:
                    delay = min(2 ** attempt, 30)
                    time.sleep(delay)
        
        raise Exception(f"All models failed after {attempts} attempts")
    
    def _make_request(self, model: str, prompt: str) -> str:
        response = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            timeout=self.timeout
        )
        return response.choices[0].message.content

# Usage
resilient_client = ResilientLLMClient()
result = resilient_client.complete("Explain machine learning")
print(f"Response: {result.content[:100]}...")
print(f"Model: {result.model_used}, Attempts: {result.attempts}")
```

### Testing Your Error Handling

Error handling code only helps if it actually works. Test it:

**Mock API failures:**
```python
from unittest.mock import patch, MagicMock

def test_retry_on_rate_limit():
    with patch('openai.OpenAI') as mock:
        # First call fails, second succeeds
        mock.return_value.chat.completions.create.side_effect = [
            RateLimitError("Rate limited"),
            MagicMock(choices=[MagicMock(message=MagicMock(content="Success"))])
        ]
        
        result = retry_with_backoff(make_request)
        assert result.choices[0].message.content == "Success"
```

**Chaos testing.** Periodically inject failures in staging: random timeouts, rate limits, 500 errors. Your monitoring and alerting should catch them. If it doesn't, fix the gaps before production does it for you.

### What to Test

A comprehensive test suite for AI error handling should cover:

**Unit tests:**
- Each retry type (rate limit, timeout, server error)
- Proper backoff timing
- Correct exception propagation
- Circuit breaker state transitions

**Integration tests:**
- Full request flows with mock failures
- Fallback chain execution
- Budget limit enforcement

**Chaos tests:**
- Random failure injection in staging
- Provider outage simulation
- Rate limit exhaustion

**Load tests:**
- Behavior under concurrent requests
- Rate limiter accuracy at scale
- Circuit breaker under sustained failure

### Testing Tools

**Useful libraries for testing AI error handling:**

- `unittest.mock` for Python mocking
- `responses` for HTTP mocking
- `toxiproxy` for network-level chaos
- `pytest-timeout` for test timeouts

**Sample test for circuit breaker:**

```python
def test_circuit_breaker_opens_after_failures():
    breaker = CircuitBreaker(failure_threshold=3)
    
    # Simulate 3 failures
    for _ in range(3):
        try:
            breaker.call(lambda: raise_error())
        except:
            pass
    
    assert breaker.state == CircuitState.OPEN
    
    # Next call should fail fast
    with pytest.raises(Exception, match="Circuit breaker is OPEN"):
        breaker.call(lambda: "should not execute")
```

## Frequently Asked Questions

### How many retries should I configure?

For user-facing requests, 3 retries with exponential backoff is usually enough—more than that and the user is waiting too long. For background jobs, you can retry more aggressively (5-10 times) with longer delays.

### Should I always use fallback models?

Only if your use case can tolerate different model capabilities. If you need GPT-5's specific abilities, falling back to a weaker model might give worse results than failing gracefully. For general chat, fallbacks work great.

**When fallbacks make sense:**
- Chatbots and conversational interfaces
- Content generation where quality variance is acceptable
- High-availability requirements trump consistency

**When to skip fallbacks:**
- Code generation requiring specific model capabilities
- Structured output formats that vary between models
- Specialized tasks where only one model performs well

### How do I handle context length errors?

These aren't recoverable by retry—you need to truncate or chunk your input. Use a tokenizer to count tokens before sending, and truncate from the beginning (keeping recent context) if needed.

**Strategies for large contexts:**
1. Truncate from the beginning (keep recent messages)
2. Summarize older context before passing it
3. Use a smaller model with larger context window
4. Chunk the input and process in parts

### Is it safe to retry requests that might have succeeded?

For completions, yes—they're idempotent. The worst case is you pay for tokens twice. For operations with side effects (like tool calls that modify data), implement idempotency keys.

**Implementing idempotency:**
- Generate a unique request ID on the client side
- Store which IDs have been processed
- Skip reprocessing for duplicate IDs

### What's the difference between rate limiting and circuit breaking?

Rate limiting controls your request rate to stay within API limits. Circuit breaking stops requests entirely when a service is failing, preventing cascade failures and giving the service time to recover.

**Use both together:**
- Rate limiting prevents you from hitting provider limits
- Circuit breaking protects you when the provider is already stressed

### How should I log errors for debugging?

Log the error type, message, request ID (if available), model, and retry attempt. Include timing information. This helps you spot patterns like "Claude fails every day at 2pm" (traffic spikes).

**Essential log fields:**
- Timestamp (UTC)
- Request ID (from provider)
- Model and provider
- Error type and message
- Retry attempt number
- Latency before failure

### What alerting thresholds should I set?

Start with these baselines and adjust based on your experience:
- Error rate > 1% for 5 minutes → Warning
- Error rate > 5% for 5 minutes → Alert on-call
- All requests failing → Immediate alert
- Rate limit utilization > 80% → Capacity planning warning


## Real-World Implementation Guide

Let me share some patterns from production systems I've worked on:

### Multi-Provider Architecture

For mission-critical applications, I recommend using multiple providers:

**Primary-Secondary Pattern:**
```python
PROVIDER_CONFIG = {
    "primary": {"provider": "openai", "model": "gpt-5-turbo"},
    "secondary": {"provider": "anthropic", "model": "claude-4-sonnet"},
    "tertiary": {"provider": "google", "model": "gemini-2-pro"},
}
```

The idea is simple: if OpenAI fails, try Anthropic. If that fails, try Google. This protects you from single-provider outages—which happen more often than you'd think.

**Cross-Region Deployment:**
For global applications, consider deploying across regions. API performance varies significantly by geography. A request from Asia to US-based servers adds latency that a local endpoint wouldn't have.

**Provider-Specific Rate Limits:**

| Provider | RPM (Tier 1) | TPM (Tier 1) | Notes |
|----------|--------------|--------------|-------|
| OpenAI | 60 | 60K | Increases with usage |
| Anthropic | 60 | 40K | Message-based limits |
| Google | 60 | 60K | Varies by model |

*RPM = Requests per minute, TPM = Tokens per minute*

These limits increase as you build usage history. New accounts hit limits quickly; established accounts rarely do.

**Getting Higher Limits:**
- OpenAI: Spending history and account age determine tier
- Anthropic: Usage-based with manual limit increase requests
- Google: Generally more generous for new users

**Monitoring Limit Utilization:**
Track your usage against limits and alert at 80% utilization. This gives you time to request increases before impacting users.

### Provider-Specific Error Handling

Each provider has quirks worth knowing. I've learned these through trial and error—hopefully you can skip some of my mistakes:

**OpenAI-Specific Patterns:**
```python
from openai import RateLimitError, APIConnectionError, BadRequestError

def handle_openai_error(error):
    if isinstance(error, RateLimitError):
        # OpenAI returns retry-after in header
        return float(error.response.headers.get("retry-after", 60))
    elif isinstance(error, BadRequestError):
        if "context_length" in str(error):
            return "TRUNCATE"  # Need to reduce input
        elif "content_filter" in str(error):
            return "FILTER_VIOLATION"  # Content policy issue
    return "RETRY"
```

**Anthropic-Specific Patterns:**
```python
import anthropic

def handle_anthropic_error(error):
    if isinstance(error, anthropic.RateLimitError):
        # Anthropic uses 429 with retry-after
        return "RATE_LIMIT"
    elif isinstance(error, anthropic.APIError):
        if error.status_code >= 500:
            return "RETRY"
    return "FAIL"
```

**Google AI-Specific Patterns:**
```python
import google.generativeai as genai

def handle_google_error(error):
    if "RESOURCE_EXHAUSTED" in str(error):
        return "RATE_LIMIT"
    elif "INVALID_ARGUMENT" in str(error):
        return "BAD_REQUEST"
    return "RETRY"
```

### Implementing Observability

You can't fix what you can't see. Here's a simple observability setup:

**Structured Logging:**
Log every API call with consistent fields:
- Request ID (from provider headers)
- Model used
- Prompt tokens
- Completion tokens
- Latency (ms)
- Status (success/error)
- Error type (if applicable)

**Sample Implementation:**
```python
import json
from datetime import datetime

def log_ai_call(
    request_id: str,
    model: str,
    prompt_tokens: int,
    completion_tokens: int,
    latency_ms: float,
    status: str,
    error_type: str = None
):
    log_entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "request_id": request_id,
        "model": model,
        "prompt_tokens": prompt_tokens,
        "completion_tokens": completion_tokens,
        "latency_ms": latency_ms,
        "status": status,
        "error_type": error_type,
    }
    print(json.dumps(log_entry))
```

**Key Metrics to Dashboard:**
- Error rate (target: <1%)
- P95 latency (varies by model, but track trends)
- Rate limit utilization (alert at 80%)
- Cost per request (track for budget control)
- Success rate by model (identify weak links)

### Cost Control Implementation

AI APIs can get expensive fast. Here's how to control costs and prevent budget overruns from unexpected traffic spikes or bugs. I've seen teams accidentally spend thousands in a single day due to runaway loops or unexpected user behavior.

**Cost Control Principles:**
- Always set hard limits for development and staging environments
- Use soft limits with alerts for production
- Monitor token consumption in real-time
- Implement per-request cost estimation

**Budget Limits:**
```python
class BudgetController:
    def __init__(self, daily_limit: float, hourly_limit: float):
        self.daily_limit = daily_limit
        self.hourly_limit = hourly_limit
        self.daily_spend = 0.0
        self.hourly_spend = 0.0
        
    def can_proceed(self, estimated_cost: float) -> bool:
        return (
            self.daily_spend + estimated_cost <= self.daily_limit and
            self.hourly_spend + estimated_cost <= self.hourly_limit
        )
```

**Token Estimation Before Sending:**
Use tiktoken to estimate costs before making requests. Reject prompts that would blow your budget.

**Cost by Model (approximate, 2026):**

| Model | Input (per 1M tokens) | Output (per 1M tokens) |
|-------|----------------------|------------------------|
| GPT-5-Turbo | $2.50 | $10.00 |
| Claude 4 Sonnet | $3.00 | $15.00 |
| Gemini 2 Pro | $1.25 | $5.00 |

*Prices change frequently—check current documentation.*

### Streaming Response Handling

Streaming adds complexity to error handling. Here's how to handle it:

```python
async def handle_streaming_response(stream):
    full_content = ""
    try:
        async for chunk in stream:
            if chunk.choices[0].delta.content:
                full_content += chunk.choices[0].delta.content
                yield chunk.choices[0].delta.content
    except Exception as e:
        if full_content:
            # Partial success - return what we got
            logging.warning(f"Streaming interrupted: {e}")
            yield "\n[Response interrupted]"
        else:
            # Complete failure
            raise
```

**Stream Interruption Strategies:**
- If you got >80% of expected response, consider it a success
- Log partial responses for later analysis
- Consider implementing checkpoints for long generations

## Wrapping Up
Production AI applications need robust error handling. The patterns here cover:

- **Exponential backoff** with jitter for retries
- **Rate limiting** to stay within API quotas
- **Fallback** to alternative models and providers
- **Circuit breaking** to fail fast and recover gracefully
- **Timeouts** to prevent hung requests
- **Cost control** to prevent budget overruns
- **Observability** to understand what's happening
- **Provider-specific handling** for each API's quirks

Copy the production wrapper class into your projects as a starting point, and customize based on your specific needs. Your users will thank you when things go wrong—because they will.

### Implementation Recommendations

**Start simple, add complexity as needed:**
1. Begin with basic retry logic
2. Add circuit breakers when you scale
3. Implement fallbacks for high-availability requirements
4. Add cost controls before production launch
5. Build observability as you learn what you need to monitor

**Test thoroughly:**
- Mock failure modes in unit tests
- Use chaos engineering in staging
- Monitor closely after deployments

**Iterate based on production data:**
Your error patterns will be unique. The patterns here are starting points—adapt them based on what you actually observe.

The difference between a frustrating application and a reliable one isn't avoiding errors—it's handling them gracefully when they inevitably occur.

For more on building with LLM APIs, check out our [OpenAI API tutorial](/blog/openai-api-tutorial), [Claude API tutorial](/blog/claude-api-tutorial), and our guide on [what are AI agents](/blog/what-are-ai-agents) for building more complex AI systems. If you're building [agentic AI systems](/blog/what-is-agentic-ai), error handling becomes even more critical as agents make autonomous decisions.


