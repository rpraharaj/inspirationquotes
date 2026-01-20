# AI Inference Speed: What Affects Performance

Three dots. That's all I see when my local AI is thinking.

And sometimes those three dots blink for what feels like an eternity. My first local LLM setup was technically working—tokens were being generated—but at 2 tokens per second, having a conversation felt like messaging someone on a 1990s dial-up connection.

What I didn't understand then: AI inference speed isn't about having "a good GPU." It's about understanding which specific factors create bottlenecks—and which optimizations actually help. Some changes gave me 10x improvements. Others made no difference at all.

This guide explains what actually affects AI inference speed and how to systematically improve it.

## Understanding AI Speed Metrics

Before optimizing, you need to know what you're measuring.

### Tokens Per Second (tok/s)

The primary metric for AI speed. A token is roughly 3-4 characters of English text. When your AI generates a response, it produces tokens sequentially—more tokens per second means faster responses.

**What's "good" performance?**

| Speed | Feel | Use Case |
|-------|------|----------|
| 1-5 tok/s | Painful | Barely usable for experimentation |
| 5-15 tok/s | Acceptable | Development and testing |
| 15-30 tok/s | Comfortable | Daily usage |
| 30-60 tok/s | Smooth | Professional workflows |
| 60+ tok/s | Excellent | Real-time applications |

For reference, humans read at about 4-5 words per second. AI generating at 30+ tok/s feels like watching someone type very quickly.

### First Token Latency (Time to First Token)

This is how long you wait before the AI starts responding. Even if generation is fast, a 10-second delay before the first word appears feels broken.

First token latency includes:
- Tokenizing your input
- Processing through all model layers
- Starting context memory (KV cache)

For large models or long contexts, this can take several seconds. For small models with short contexts, it should be under a second.

### Throughput vs Latency

These can conflict. Techniques that maximize total throughput (tokens per minute across many requests) might increase latency for individual requests. For interactive use, prioritize low latency. For batch processing, prioritize throughput.

## The Hardware Factors That Determine Speed

Let's rank what actually matters:

### 1. Memory Bandwidth (Most Important for Inference)

Here's the counterintuitive truth: for AI inference, **memory bandwidth** matters more than raw GPU compute power.

Why? During inference, the model's weights must be read from memory for every token generated. The GPU's compute cores are often waiting for data to arrive—they're starved for memory bandwidth, not computation.

**Memory bandwidth comparison:**

| GPU | Memory Bandwidth | Relative Speed |
|-----|------------------|----------------|
| RTX 4060 | 288 GB/s | Baseline |
| RTX 4070 Ti Super | 672 GB/s | ~2.3x faster |
| RTX 4090 | 1,008 GB/s | ~3.5x faster |
| RTX 5090 | 1,792 GB/s | ~6.2x faster |
| M3 Max (unified) | 400 GB/s | ~1.4x baseline |

This is why a 4090 isn't just "a bit faster" than a 4060 for AI—it's 3-4x faster, primarily because of bandwidth.

### 2. VRAM Capacity (Enables Speed)

VRAM doesn't directly affect speed, but it determines what you can run. A model that fits entirely in VRAM runs at full GPU speed. A model that spills to system RAM runs at a fraction of that.

**The VRAM threshold:**
- Model fits in VRAM → GPU-speed inference
- Model doesn't fit → Massive slowdown (5-20x or worse)

There's no middle ground. Get enough VRAM for your target models. See our [VRAM requirements guide](/blog/vram-requirements-ai) for specific numbers.

### 3. GPU Compute (Tensor Cores)

For inference on consumer hardware, compute capacity is rarely the bottleneck. Modern GPUs have far more compute than they can feed from memory.

However, tensor cores do help with:
- Batch processing (multiple requests simultaneously)
- Mixed-precision operations
- Certain model architectures

For interactive single-user inference, compute is your last concern.

### 4. CPU Performance

Your CPU matters for:
- Tokenization (converting text to tokens)
- Preprocessing
- CPU offloading (if you're using it)
- Orchestrating GPU operations

A slow CPU can bottleneck first-token latency. But once generation starts, it's all GPU.

### 5. Storage Speed

Storage only affects model loading time, not inference speed. An NVMe SSD loads a 7B model in seconds. A spinning hard drive takes much longer. Once loaded, storage is irrelevant.

## Memory Bandwidth: The Real Speed Limiter

Let me explain why bandwidth is king.

During autoregressive inference (how LLMs generate text), the model produces one token at a time. For each token, the GPU must:

1. Read the model weights from VRAM
2. Read the KV cache (previous context)
3. Perform computations
4. Write the new KV entry
5. Repeat

Step 1 is the killer. For a 7B model at FP16, that's 14GB of data read per token. Even at 1,000 GB/s bandwidth, that limits you to ~71 tokens per second theoretical maximum.

**The arithmetic intensity problem:**

Arithmetic intensity = Compute operations / Memory operations

For LLM inference, arithmetic intensity is very low. The GPU does a tiny bit of math for every byte it reads. This is why bandwidth, not compute, is the constraint.

**Implications:**
- Faster VRAM (GDDR6X, GDDR7, HBM) directly improves speed
- Quantization helps because smaller weights = less bandwidth needed
- Apple Silicon's unified memory has lower bandwidth but can access more of it

**GPU memory bandwidth comparison (2026):**

| GPU | VRAM | Bandwidth | Est. Llama 8B Q4 Speed |
|-----|------|-----------|------------------------|
| RTX 4060 | 8 GB | 288 GB/s | ~25 tok/s |
| RTX 4070 | 12 GB | 504 GB/s | ~45 tok/s |
| RTX 4070 Ti Super | 16 GB | 672 GB/s | ~55 tok/s |
| RTX 4090 | 24 GB | 1,008 GB/s | ~75 tok/s |
| RTX 5090 | 32 GB | 1,792 GB/s | ~120 tok/s |
| M3 Max | 48-128 GB | 400 GB/s | ~35 tok/s |

These are approximate—actual speeds vary with model architecture and software stack.

## Software Factors You Can Control

Hardware is fixed once you buy it. Software you can optimize.

### 1. Quantization Format

Smaller weights = less data to move = faster inference.

| Quantization | Size Reduction | Speed Impact | Quality |
|--------------|----------------|--------------|---------|
| FP16 | Baseline | Baseline | Perfect |
| Q8_0 | 2x smaller | ~2x faster | Excellent |
| Q5_K_M | ~3x smaller | ~2.5x faster | Great |
| Q4_K_M | 4x smaller | ~3x faster | Good |
| Q4_0 | 4x smaller | ~3.2x faster | Acceptable |

Q4_K_M is often the sweet spot—significant speed gains with minimal quality loss.

### 2. Flash Attention

Flash attention is an algorithm that computes attention more efficiently, reducing memory usage and sometimes improving speed. Most modern inference engines enable it by default.

**Check if it's enabled:**
- llama.cpp: Enabled by default in recent versions
- Ollama: Automatic
- vLLM: Enabled by default

If you're using an older setup, updating your inference engine might give you a free speed boost.

### 3. Context Length

Longer context = more KV cache = slower inference, especially for first token.

| Context Length | KV Cache Size (7B) | Impact |
|----------------|-------------------|--------|
| 2,048 | ~0.5 GB | Fast |
| 8,192 | ~2 GB | Moderate |
| 32,768 | ~8 GB | Slow first token |
| 131,072 | ~32 GB | Very slow |

**Optimization tip:** Only use as much context as you need. Processing 128K tokens when you only need 4K wastes time.

### 4. Batch Size

For single-user interactive use, batch size is 1—you're generating one response at a time.

For server deployments handling multiple requests, batching them increases throughput but may increase individual latency. This is an advanced optimization for production systems.

### 5. Model Architecture

Not all models of the same size perform equally. Some architectures are more efficient:

- **Mixture of Experts (MoE):** Only activates part of the model—faster inference. Example: Mixtral 8x7B
- **Grouped Query Attention (GQA):** More memory-efficient attention. Example: Llama 3
- **Sliding Window Attention:** Efficient for long contexts. Example: Mistral

When choosing between models of similar quality, prefer newer architectures.

## How to Measure Your Inference Speed

You can't optimize what you don't measure.

### Ollama

Ollama shows tokens per second during generation:
```bash
ollama run llama3:8b "Explain inference speed in one paragraph."
```

Watch the bottom of the output for timing:
```
eval count: 156 tokens
eval duration: 4.2s
eval rate: 37.14 tok/s
```

### llama.cpp

llama.cpp provides detailed timing:
```bash
./main -m llama-8b-q4.gguf -p "Explain inference speed." -n 100
```

Output includes:
```
llama_print_timings:        load time =   3845.67 ms
llama_print_timings:      sample time =     34.56 ms
llama_print_timings: prompt eval time =    245.12 ms
llama_print_timings:        eval time =   2678.90 ms
llama_print_timings:       total time =   2958.58 ms
llama_print_timings:    tokens per second =    37.31 tok/s
```

### Python Timing

For custom applications:
```python
import time

start = time.time()
response = model.generate(prompt, max_tokens=100)
elapsed = time.time() - start

tokens_generated = count_tokens(response)
print(f"{tokens_generated / elapsed:.1f} tok/s")
```

### Consistent Testing Methodology

For meaningful comparisons:
1. Use the same prompt
2. Generate the same number of tokens
3. Run multiple times and average
4. Don't run other GPU-intensive tasks
5. Ensure the model is already loaded (not cold-start)

## Practical Optimization Techniques

Ranked by impact and ease:

### 1. Use Appropriate Quantization (High Impact, Easy)

Switch from Q8 to Q4_K_M if you're not already. Often doubles speed with minimal quality loss.

### 2. Match Model Size to VRAM (High Impact, One-time)

Running a model that barely fits is slow. Have 15-20% VRAM headroom for KV cache and overhead.

### 3. Reduce Context When Possible (Medium Impact, Easy)

If your use case doesn't need 32K context, don't use it:
```bash
ollama run llama3 --num-ctx 4096
```

### 4. Update Your Inference Engine (Medium Impact, Easy)

llama.cpp and Ollama receive constant optimizations. Update regularly:
```bash
ollama pull ollama/ollama
```

### 5. Enable Flash Attention (Low-Medium Impact, Easy)

Usually enabled by default, but verify. On older setups, this can give 20-30% speed improvement.

### 6. Try Different Backends (Low Impact, Technical)

llama.cpp supports different compute backends (CUDA, Metal, Vulkan). The right backend for your hardware can improve performance.

### 7. Optimize Power and Thermal (Low Impact)

Ensure your GPU isn't thermal throttling. Check temperatures during inference:
```bash
watch -n 1 nvidia-smi
```

Temperatures above 80°C may trigger throttling. Improve case airflow or fan curve if needed.

## When to Upgrade Your Hardware

Sometimes software optimization isn't enough. Signs you need a hardware upgrade:

**You're memory bandwidth limited:**
- GPU utilization is low during inference
- Speed doesn't scale with smaller quantization as expected
- Moving to a higher-bandwidth GPU is the only solution

**You're VRAM limited:**
- Can't load the models you need
- Constantly working around memory constraints
- Spending more time optimizing than working

**Your usage justifies the cost:**
- Using local AI daily
- Cloud API costs exceed hardware costs
- Need capabilities local hardware enables

**Upgrade path recommendations:**

| Current Situation | Recommendation |
|-------------------|----------------|
| 8 GB VRAM, slow speeds | RTX 4070 Ti Super (16 GB) or used 3090 (24 GB) |
| 16 GB VRAM, need more | RTX 4090 (24 GB) or RTX 5090 (32 GB) |
| Want maximum performance | RTX 5090 (32 GB) |
| Prefer Apple ecosystem | M4 Max with 64+ GB unified memory |

See our [GPU buying guide](/blog/best-gpu-for-ai) for detailed recommendations.

## Frequently Asked Questions

### Why is my first token so slow?

First token latency includes processing your entire prompt through the model. Longer prompts = longer first token time. The first token may take 1-5+ seconds for large models with long contexts. Once generation starts, subsequent tokens are much faster.

### Does more VRAM mean faster inference?

Not directly. VRAM capacity determines what models you can run—it's an enabler, not a speed factor. Once a model fits, more VRAM doesn't help. What matters for speed is memory bandwidth. A 24 GB card with high bandwidth beats a 48 GB card with low bandwidth.

### Is AMD or NVIDIA faster for AI?

In 2026, NVIDIA generally offers better AI inference performance due to:
- More mature CUDA ecosystem
- Better optimized inference libraries
- More efficient tensor cores

AMD is competitive on price-to-VRAM ratio and improving, but NVIDIA has the edge for pure performance.

### How do Apple Macs compare for speed?

Apple Silicon (M-series) has lower memory bandwidth than high-end NVIDIA GPUs, so token generation is typically slower. An M3 Max generates roughly 30-40 tok/s on a 7B model vs. 70+ tok/s for an RTX 4090.

However, Apple Silicon's unified memory lets you run much larger models than affordable NVIDIA cards. A 128 GB M3 Max can run models that would require multiple $2,000+ GPUs.

### Can I run inference on CPU only?

Yes, but slowly. CPU inference is typically 10-50x slower than GPU inference. It's useful for:
- Testing without GPU
- Running AI on machines without discrete GPUs
- Servers where GPU isn't available

For regular use, a GPU is strongly recommended.

## Make Speed Part of the Workflow

AI inference speed directly impacts how useful local AI feels. Slow inference interrupts your flow. Fast inference feels like having a smart collaborator.

The key insights:
1. Memory bandwidth is the primary speed determinant
2. VRAM capacity enables speed (model must fit)
3. Quantization offers the biggest software optimization
4. Measure before and after any optimization

Systematically address these factors, and local AI transforms from frustrating to fluid.

For VRAM planning, see our [VRAM requirements guide](/blog/vram-requirements-ai). For hardware recommendations, check the [GPU buying guide](/blog/best-gpu-for-ai). For getting started with local AI, our [Ollama tutorial](/blog/ollama-local-ai-guide) walks through the setup.

Fast AI is within reach. You just need to know what to optimize.
