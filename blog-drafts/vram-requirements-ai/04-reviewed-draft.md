# VRAM Requirements for AI: How Much Do You Need?

I ran out of VRAM three minutes into my first local AI experiment.

The model loaded fine. I typed my prompt. Then—nothing. My GPU fans spun up to jet-engine levels, my system stuttered, and eventually crashed with an "out of memory" error. The 7B model I was trying to run needed 14GB of VRAM. My GPU had 8GB.

That's when I learned the most important lesson in local AI: VRAM is everything. Not clock speed. Not CUDA cores. Not tensor cores. VRAM—video memory—is the single factor that determines what AI models you can run locally.

This guide gives you the exact formulas and tables to calculate your VRAM requirements before you waste time (or money) on hardware that can't run what you need.

## Why VRAM Is the Bottleneck for AI

When you run a Large Language Model on your GPU, the entire model needs to fit in VRAM. Not "most of it." Not the "active parts." The whole thing—every parameter, every weight.

Here's why: GPUs are extremely fast at the parallel math required for AI inference, but only when the data is in their local memory (VRAM). If even part of the model spills over to system RAM, performance falls off a cliff. We're talking 10-100x slower, sometimes more.

Think of it like a chef's workspace. System RAM is the pantry down the hall—you can store a lot there, but every trip takes time. VRAM is the counter in front of you—limited space, but everything is instantly accessible. For AI inference, you need your entire recipe (the model) on that counter.

**VRAM vs System RAM:**
- **VRAM (GPU memory):** High-speed memory on your graphics card. Directly accessible by GPU cores. This is what matters for AI.
- **System RAM:** Your computer's main memory. Much slower for AI workloads. Used as fallback when VRAM runs out.

Some frameworks support "CPU offloading," where portions of the model run on system RAM. This works in a pinch, but expect a 5-20x performance penalty. It's a last resort, not a strategy.

## The Simple Formula for VRAM Requirements

Here's the formula that will save you hours of confusion:

**VRAM Required = (Model Parameters × Bytes per Parameter) + Overhead**

The "bytes per parameter" depends on the precision format:

| Precision Format | Bytes per Parameter | VRAM per Billion Parameters |
|------------------|---------------------|----------------------------|
| FP32 (32-bit) | 4 bytes | ~4 GB |
| FP16 (16-bit) | 2 bytes | ~2 GB |
| INT8 (8-bit) | 1 byte | ~1 GB |
| INT4 (4-bit) | 0.5 bytes | ~0.5 GB |

**Real example calculations:**

A **Llama 3 8B** model at different precisions:
- FP16 (standard): 8B × 2 bytes = **16 GB VRAM**
- INT8 (quantized): 8B × 1 byte = **8 GB VRAM**
- INT4 (heavily quantized): 8B × 0.5 bytes = **4 GB VRAM**

A **Llama 3 70B** model:
- FP16: 70B × 2 bytes = **140 GB VRAM** (not happening on consumer hardware)
- INT4: 70B × 0.5 bytes = **35 GB VRAM** (possible on RTX 5090 or multiple GPUs)

These are baseline requirements. In practice, you need 10-20% extra for:
- KV cache (grows with context length)
- Framework overhead
- CUDA memory management

**Rule of thumb:** Add 15% to your calculated VRAM need for safety margin.

## Complete VRAM Requirements Table (2026 Models)

Here's a comprehensive table of popular models and their VRAM requirements. These are real-world numbers including typical overhead.

### Llama Family (Meta)

| Model | Parameters | Q4_K_M | Q5_K_M | Q8_0 | FP16 |
|-------|------------|--------|--------|------|------|
| Llama 3.2 1B | 1B | 0.8 GB | 1 GB | 1.5 GB | 2.5 GB |
| Llama 3.2 3B | 3B | 2 GB | 2.5 GB | 3.5 GB | 7 GB |
| Llama 3.1 8B | 8B | 5 GB | 6 GB | 9 GB | 17 GB |
| Llama 3.1 70B | 70B | 40 GB | 48 GB | 75 GB | 145 GB |
| Llama 3.1 405B | 405B | 230 GB | 275 GB | 430 GB | 850 GB |

### Mistral Family

| Model | Parameters | Q4_K_M | Q5_K_M | Q8_0 | FP16 |
|-------|------------|--------|--------|------|------|
| Mistral 7B | 7B | 4.5 GB | 5.5 GB | 8 GB | 15 GB |
| Mixtral 8x7B | 47B (active: 13B) | 27 GB | 33 GB | 50 GB | 100 GB |
| Mistral Large 2 | 123B | 70 GB | 85 GB | 130 GB | 260 GB |

### Qwen Family (Alibaba)

| Model | Parameters | Q4_K_M | Q5_K_M | Q8_0 | FP16 |
|-------|------------|--------|--------|------|------|
| Qwen 2.5 7B | 7B | 4.5 GB | 5.5 GB | 8 GB | 15 GB |
| Qwen 2.5 14B | 14B | 9 GB | 11 GB | 16 GB | 30 GB |
| Qwen 2.5 72B | 72B | 42 GB | 50 GB | 78 GB | 150 GB |

### Smaller/Efficient Models

| Model | Parameters | Q4_K_M | Q5_K_M | Q8_0 | FP16 |
|-------|------------|--------|--------|------|------|
| Phi-3.5 Mini | 3.8B | 2.5 GB | 3 GB | 4.5 GB | 8 GB |
| Phi-3 Medium | 14B | 9 GB | 11 GB | 16 GB | 30 GB |
| Gemma 2 9B | 9B | 6 GB | 7 GB | 10 GB | 19 GB |
| Gemma 2 27B | 27B | 16 GB | 19 GB | 29 GB | 56 GB |

**Reading the table:** Q4_K_M and Q5_K_M are the most common quantization formats for daily use—good balance of quality and size. Q8_0 offers near-original quality. FP16 is the unquantized format.

For most users, **Q4_K_M** or **Q5_K_M** is the sweet spot. You'll barely notice quality differences from FP16 for typical use cases.

## Context Length: The Hidden VRAM Cost

Here's what catches many people off guard: VRAM requirements grow with context length.

When an LLM processes text, it maintains a "KV cache"—a record of all previous tokens it needs to reference. This cache consumes VRAM, and it scales linearly with context length.

**The additional VRAM math:**

KV Cache VRAM ≈ 2 × Layers × Heads × (Head Dimension) × (Context Length) × Precision Bytes

That's complex, so here's a practical table for a typical 7B model:

| Context Length | Additional KV Cache VRAM (FP16) |
|----------------|--------------------------------|
| 2,048 tokens | ~0.5 GB |
| 4,096 tokens | ~1 GB |
| 8,192 tokens | ~2 GB |
| 16,384 tokens | ~4 GB |
| 32,768 tokens | ~8 GB |
| 65,536 tokens | ~16 GB |
| 131,072 tokens | ~32 GB |

**What this means in practice:**

That 8B model that "fits" in 5GB at Q4 with 4K context? Try to use its full 128K context window, and you suddenly need 37GB+. This is why you might load a model successfully but crash when you paste in a long document.

**Practical guidelines:**
- For 8GB VRAM: Stick to 4K-8K context reliably
- For 16GB VRAM: Use up to 16K context comfortably
- For 24GB VRAM: 32K context is reasonable
- For 32GB+ VRAM: Extended context windows become practical

## How Quantization Changes Everything

Quantization compresses model weights by reducing their numerical precision. It's the magic that makes local AI practical.

**How it works (simplified):**
- Original models use 16-bit floating-point numbers (FP16)
- Quantization converts these to 8-bit, 4-bit, or even lower
- Each step roughly halves the VRAM requirement
- Quality degrades slightly, but often imperceptibly

**Common quantization formats:**

| Format | Quality Impact | Use Case |
|--------|----------------|----------|
| Q8_0 | Minimal (~1% degradation) | When quality is paramount |
| Q6_K | Very slight | High-quality default |
| Q5_K_M | Slight | Balanced choice |
| Q4_K_M | Moderate | Best value for most users |
| Q4_0 | Noticeable | When VRAM is very tight |
| Q3_K | Significant | Last resort |
| Q2_K | Heavy | Don't use for serious work |

**My recommendations:**
- **Primary workhorse:** Q4_K_M or Q5_K_M. Best balance of quality and VRAM.
- **Quality-critical tasks:** Q8_0 if you have the VRAM
- **VRAM-constrained:** Q4_K_M is the floor for usable quality
- **Avoid:** Q3 and below for anything you care about

The "_K_M" suffix indicates K-quants with medium precision—a good middle ground. The "_S" variants save a bit more VRAM with slightly lower quality.

## GPU VRAM Options in 2026

Let me map VRAM requirements to actual GPU options:

### Consumer NVIDIA GPUs

| GPU | VRAM | Best Model Size | Street Price (Jan 2026) |
|-----|------|-----------------|-------------------------|
| RTX 4060 | 8 GB | 7B Q4 | ~$300 |
| RTX 4060 Ti 16GB | 16 GB | 13B Q4, 7B Q8 | ~$450 |
| RTX 4070 | 12 GB | 7B Q8, 13B Q4 | ~$550 |
| RTX 4070 Ti Super | 16 GB | 13B Q5 | ~$800 |
| RTX 4080 Super | 16 GB | 13B Q5 | ~$1,000 |
| RTX 4090 | 24 GB | 34B Q4, 13B FP16 | ~$1,600 |
| RTX 5090 | 32 GB | 70B Q4 | ~$2,000 |
| RTX 3090 (used) | 24 GB | 34B Q4, 13B FP16 | ~$650 |

### AMD GPUs

| GPU | VRAM | Best Model Size | Street Price |
|-----|------|-----------------|--------------|
| RX 7600 | 8 GB | 7B Q4 | ~$250 |
| RX 7800 XT | 16 GB | 13B Q4 | ~$450 |
| RX 7900 XTX | 24 GB | 34B Q4 | ~$900 |

### Apple Silicon

| Chip | Unified Memory Options | Notes |
|------|------------------------|-------|
| M3 | 8-24 GB | Shared with system |
| M3 Pro | 18-36 GB | Shared with system |
| M3 Max | 36-128 GB | Best for large models |
| M4 Pro | 24-48 GB | Good mid-range |
| M4 Max | 36-128 GB | Comparable to RTX 5090 |

Apple Silicon uses unified memory shared between CPU, GPU, and system. It's not directly comparable to dedicated VRAM, but for AI inference, a 64GB M3 Max can run models that would require a $2,000+ NVIDIA GPU.

## Checking Your Current VRAM Usage

Before you run out of memory, monitor your usage:

### NVIDIA (nvidia-smi)

```bash
# Check current VRAM usage
nvidia-smi

# Continuous monitoring (updates every 1 second)
watch -n 1 nvidia-smi

# Just the memory info
nvidia-smi --query-gpu=memory.used,memory.total --format=csv
```

**Reading the output:**
```
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 550.54.15    Driver Version: 550.54.15    CUDA Version: 12.4     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Memory-Usage |      GPU-Util        |
|===============================+======================+======================|
|   0  NVIDIA GeForce RTX 4090  |  18432MiB / 24564MiB |     45%           |
+-------------------------------+----------------------+----------------------+
```

This shows 18.4GB used of 24.5GB total. You have ~6GB headroom.

### During Ollama Inference

Ollama shows memory usage when you load a model:
```
>>> /show info
Model:    llama3:8b
Parameters: 8B
Quantization: Q4_K_M
Context Length: 8192
Memory Used: 4.92 GB
```

### Using nvitop (Better Monitoring)

```bash
pip install nvitop
nvitop
```

This gives a beautiful, real-time dashboard of GPU usage.

## What To Do When You Run Out of VRAM

Already hit an out-of-memory error? Here's your troubleshooting checklist:

### 1. Use More Aggressive Quantization

If you're running Q8, try Q5_K_M or Q4_K_M. The quality difference is usually acceptable.

```bash
# In Ollama, pull a smaller quantization
ollama pull llama3:8b-q4_K_M
```

### 2. Reduce Context Length

Most tools let you limit context length. Shorter context = less KV cache = less VRAM.

```bash
# Ollama example
ollama run llama3 --num-ctx 4096
```

### 3. Choose a Smaller Model

An 8B model outperforms a 70B model that doesn't run. Sometimes smaller is better.

Quality rankings within similar sizes:
- Llama 3.1 8B > Mistral 7B > older models
- For code: DeepSeek Coder performs above its size class

### 4. Close Other GPU Applications

Check what else is using your GPU:
```bash
nvidia-smi
```

Browsers, video players, and even some desktop effects use VRAM. Close them before loading large models.

### 5. Enable CPU Offloading (Last Resort)

Some tools let you offload layers to CPU. It's slow but works.

```bash
# llama.cpp example: offload 20 layers to GPU, rest to CPU
./main -m model.gguf -ngl 20
```

Expect 5-20x slower inference for offloaded layers.

### 6. Consider the Upgrade

If you're constantly fighting VRAM limits, a hardware upgrade may be the real solution. See our [GPU buying guide](/blog/best-gpu-for-ai) for recommendations.

## Frequently Asked Questions

### Can I run AI with only 4GB VRAM?

Barely. You can run very small models (1-3B parameters) or heavily quantized 7B models with short context. It's usable for experimentation but frustrating for real work. For serious local AI, 8GB is the minimum; 16GB is comfortable.

### Does faster VRAM (GDDR6X vs GDDR6) matter?

For inference, memory bandwidth matters more than capacity once you have enough VRAM. Higher-speed memory (GDDR6X, GDDR7) improves token generation speed. But if you don't have enough VRAM to load the model, speed is irrelevant. Capacity first, bandwidth second.

### Can I combine CPU and GPU memory?

Technically yes, but with severe performance penalties. When a model exceeds VRAM, frameworks like llama.cpp can offload layers to CPU. Expect each offloaded layer to slow things down significantly. It's a workaround, not a solution.

### How does Apple Silicon unified memory compare?

Apple's unified memory is shared between CPU and GPU, making direct comparisons tricky. A 64GB M3 Max can run models requiring ~40GB of dedicated VRAM on NVIDIA, but memory bandwidth is lower, so generation speed is typically 30-50% slower. The advantage is that you can actually access that much memory on a laptop.

### What about Intel Arc GPUs?

Intel Arc GPUs (like the A770 with 16GB) are budget-friendly and increasingly supported. Performance is lower than NVIDIA equivalents, and software compatibility still maturing. They're viable for experimentation but not my first recommendation for serious work.

## Get Enough VRAM, Then Everything Else

Local AI becomes dramatically easier once you have enough VRAM. Models load instantly. No more cryptic crashes. No more mental math about what will fit.

Here's my summary recommendation:

| Your Goal | Minimum VRAM | Recommended VRAM |
|-----------|--------------|------------------|
| Experiment with AI | 8 GB | 12 GB |
| Regular development | 12 GB | 16 GB |
| Run quality 13B models | 16 GB | 24 GB |
| Run 34B+ models | 24 GB | 32 GB+ |

Calculate your needs using the formulas above. Check the model table. Then buy the GPU that fits—or find ways to make your current GPU work with quantization and context limits.

For GPU buying advice, check our [complete guide to the best GPUs for AI](/blog/best-gpu-for-ai). For setting up local AI once you have the hardware, see our [Ollama tutorial](/blog/ollama-local-ai-guide).

Your VRAM is your runway. Make sure it's long enough for takeoff.
