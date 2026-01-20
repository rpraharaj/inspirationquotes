---
title: "AI Error Handling Snippets: Retry, Fallback, Rate Limits"
description: "Production-ready Python code for handling LLM API errors. Includes exponential backoff, rate limiting, model fallbacks, and circuit breaker patterns."
pubDate: 2026-01-11
category: ai-code-snippets
author: Raj Praharaj
tags:
  - Error Handling
  - LLM
  - Python
  - API
  - Production
  - Best Practices
readingTime: 17 min read
---

Here's a truth nobody warns you about when you start building AI applications: LLM APIs fail constantly. Rate limits, timeouts, overloaded models, random server errors—I've seen them all, usually at the worst possible times. My first production AI feature hit rate limits within hours of launch and took down the entire workflow.

The difference between a prototype and a production-ready AI application isn't the model—it's the error handling. These snippets represent hundreds of hours of debugging production issues and learning what actually works when things go wrong.

Every pattern here is something I've used in real systems. Copy them directly into your projects.

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

**Rate limits** are by far the most common in production. Every LLM provider has them, and they're often surprisingly low for new accounts. OpenAI, Anthropic, and Google all throttle aggressively until you've built up usage history.

**Timeouts** are the sneakiest. Your API call might succeed on the provider's end, but your client gives up waiting. Now you've potentially used tokens without getting a response.

**Context length errors** are entirely preventable but still catch people off guard. Claude 4 supports 200K tokens, GPT-5-Turbo handles 128K, but if you're building a RAG system, it's easy to accidentally exceed limits.

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

Rate limits require more sophisticated handling than simple retries.

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

## Fallback Patterns

When one model or provider fails, fall back to alternatives.

### Model Fallback

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

## Frequently Asked Questions

### How many retries should I configure?

For user-facing requests, 3 retries with exponential backoff is usually enough—more than that and the user is waiting too long. For background jobs, you can retry more aggressively (5-10 times) with longer delays.

### Should I always use fallback models?

Only if your use case can tolerate different model capabilities. If you need GPT-5's specific abilities, falling back to a weaker model might give worse results than failing gracefully. For general chat, fallbacks work great.

### How do I handle context length errors?

These aren't recoverable by retry—you need to truncate or chunk your input. Use a tokenizer to count tokens before sending, and truncate from the beginning (keeping recent context) if needed.

### Is it safe to retry requests that might have succeeded?

For completions, yes—they're idempotent. The worst case is you pay for tokens twice. For operations with side effects (like tool calls that modify data), implement idempotency keys.

### What's the difference between rate limiting and circuit breaking?

Rate limiting controls your request rate to stay within API limits. Circuit breaking stops requests entirely when a service is failing, preventing cascade failures and giving the service time to recover.

### How should I log errors for debugging?

Log the error type, message, request ID (if available), model, and retry attempt. Include timing information. This helps you spot patterns like "Claude fails every day at 2pm" (traffic spikes).

## Wrapping Up

Production AI applications need robust error handling. The patterns here cover:

- **Exponential backoff** with jitter for retries
- **Rate limiting** to stay within API quotas
- **Fallback** to alternative models and providers
- **Circuit breaking** to fail fast and recover gracefully
- **Timeouts** to prevent hung requests

Copy the production wrapper class into your projects as a starting point, and customize based on your specific needs. Your users will thank you when things go wrong—because they will.

For more on building with LLM APIs, check out our [OpenAI API tutorial](/blog/openai-api-tutorial) and [Claude API tutorial](/blog/claude-api-tutorial).
