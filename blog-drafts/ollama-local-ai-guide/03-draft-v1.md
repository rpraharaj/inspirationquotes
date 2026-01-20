---
title: "Run AI Locally: Complete Guide to Ollama (2026)"
description: "Learn how to run AI models locally with Ollama. Step-by-step installation, best models, essential commands, and tips for private, free AI on your own machine."
pubDate: 2026-01-09
author: aiagentskit
categories:
  - open-source-ai
tags:
  - ollama
  - local-ai
  - llm
  - self-hosted
  - privacy
  - open-source
readingTime: 15 min read
---

I got tired of every question I asked going to some server thousands of miles away. Every code snippet, every brainstorm, every half-formed idea—all transmitted, logged, and processed somewhere in the cloud.

Then I discovered Ollama, and everything changed. Within five minutes, I had a powerful AI model running entirely on my laptop. No internet required. No API fees. No data leaving my machine.

The moment I ran my first local prompt and got an instant, private response? That's when I understood why local AI matters. Let me show you exactly how to do the same.

## What Is Ollama?

### The Simplest Way to Run AI Locally

<a href="https://ollama.ai" target="_blank" rel="noopener noreferrer">Ollama</a> is a tool that makes running large language models (LLMs) on your computer remarkably simple. It handles the complex parts—downloading models, managing memory, optimizing performance—so you can focus on actually using AI.

The core concept: type `ollama run llama3.3` in your terminal, and you're chatting with an AI that lives entirely on your machine.

**What Ollama handles for you:**
- Model downloading and storage
- Memory management and optimization
- GPU acceleration when available
- API serving for other applications
- Model customization and fine-tuning

### Why "Ollama" Specifically?

Several tools let you run local AI: LM Studio, text-generation-webui, llama.cpp, and others. I recommend Ollama for beginners because:

- **Simplest setup**: One command to install, one command to run
- **Best model library**: Huge selection of ready-to-run models
- **Active development**: Frequent updates with new features
- **Cross-platform**: Works identically on Mac, Windows, and Linux
- **Great community**: Easy to find help and resources

Other tools are more powerful for specific use cases, but Ollama's simplicity makes it the right starting point.

## Why Run AI Locally?

Before we get into the how, let's discuss the why. Local AI isn't just a tech flex—it solves real problems.

### Privacy First

When you use ChatGPT, Claude, or Gemini, your conversations are transmitted to remote servers. Even with privacy policies in place, your data:
- Travels over the internet
- Gets processed on systems you don't control
- May be logged, reviewed, or used for training (varies by service)

With local AI:
- Your prompts never leave your machine
- No logging by third parties
- Complete control over your data
- Safe for sensitive business, legal, or personal questions

For anything confidential—code, business plans, personal matters—local AI means true privacy.

### Speed and Latency

Cloud AI requires:
1. Your prompt to upload
2. Server-side processing
3. Response to download

That round trip takes time, especially with longer responses.

Local AI eliminates network latency entirely. On capable hardware, responses begin streaming almost instantly. For interactive work like coding assistance, this speed difference is noticeable and valuable.

### Cost Savings

Let's do the math:
- ChatGPT Plus: $20/month = $240/year
- Claude Pro: $20/month = $240/year
- API usage for serious work: Can easily exceed $50-100/month

With Ollama: $0/month forever.

Yes, you need capable hardware—but if you already have a modern computer, running local AI costs nothing beyond electricity. For heavy users, the savings are substantial.

### Offline Access

Traveling? Bad internet? Remote location?

Local AI works anywhere your computer works. I've used Ollama on airplanes, in remote cabins, and during internet outages. The AI doesn't care about connectivity.

### Learning and Experimentation

With cloud AI, every experiment costs credits or counts against rate limits. With local AI:
- Try unlimited models freely
- Experiment without cost concerns
- Break things without consequences
- Learn at your own pace

The freedom to experiment is underrated.

## System Requirements

Let's be honest about what hardware you need.

### RAM: The Critical Factor

Local AI models live in memory. Model size determines RAM requirements:

| Model Size | Minimum RAM | Recommended RAM |
|------------|-------------|-----------------|
| 7B models | 8 GB | 16 GB |
| 13B models | 16 GB | 32 GB |
| 34B models | 32 GB | 64 GB |
| 70B models | 64 GB | 128 GB |

The "B" stands for billion parameters. Larger models are smarter but hungrier.

**My recommendation for most users:** 16 GB RAM minimum. This runs 7B and 13B models comfortably, which handle most tasks well.

### GPU Considerations

**Apple Silicon (M1/M2/M3/M4):**
Ollama runs excellently on Apple Silicon. The unified memory architecture means your Mac's RAM is also your "GPU memory." An M1 MacBook with 16 GB runs local AI beautifully.

**NVIDIA GPUs:**
If you have an NVIDIA GPU with sufficient VRAM (8GB+), Ollama will automatically use it for acceleration. This dramatically speeds up generation.

**AMD GPUs:**
Support has improved significantly. Most modern AMD GPUs work, though NVIDIA still has an edge.

**No GPU (CPU only):**
Ollama works on CPU alone—just slower. A 7B model on a modern CPU is usable but not fast. For CPU-only systems, stick to smaller models.

### Disk Space

Models need to be downloaded and stored. Approximate sizes:

| Model | Download Size |
|-------|---------------|
| Llama 3.3 8B | ~5 GB |
| Llama 3.3 70B | ~40 GB |
| Mistral 7B | ~4 GB |
| DeepSeek Coder 33B | ~19 GB |

Plan for 20-50 GB if you want a variety of models available.

## Installing Ollama

The installation is genuinely simple.

### macOS Installation

**Option 1: Direct download**
1. Go to <a href="https://ollama.ai" target="_blank" rel="noopener noreferrer">ollama.ai</a>
2. Click "Download for macOS"
3. Open the downloaded .zip
4. Drag Ollama to Applications
5. Launch Ollama from Applications

**Option 2: Homebrew**
```bash
brew install ollama
```

Done. Ollama is now available in your terminal.

### Windows Installation

1. Go to <a href="https://ollama.ai" target="_blank" rel="noopener noreferrer">ollama.ai</a>
2. Click "Download for Windows"
3. Run the installer
4. Follow the installation wizard
5. Open Command Prompt or PowerShell

Ollama is now available via `ollama` commands.

### Linux Installation

The one-liner that handles everything:

```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

This downloads and installs Ollama with proper system configuration.

**For specific distributions**, Ollama also offers:
- Snap packages
- Docker containers
- Manual installation options

### Verifying Installation

Confirm Ollama is working:

```bash
ollama --version
```

You should see version information. If you get "command not found," the installation needs troubleshooting (check PATH, restart terminal).

## Running Your First Model

Let's get AI running on your machine.

### Downloading a Model

Start by pulling (downloading) a model:

```bash
ollama pull llama3.3
```

This downloads Llama 3.3 8B, a great general-purpose model. First download takes a few minutes depending on your internet speed.

**What happens:**
- Ollama downloads the model files
- Automatically selects the right version for your hardware
- Stores the model for future use
- Handles all optimization automatically

### Starting a Conversation

Once downloaded, start chatting:

```bash
ollama run llama3.3
```

You'll see a prompt like:
```
>>> 
```

Type your message and press Enter:

```
>>> Explain quantum computing in simple terms

Quantum computing is like having a coin that can be heads AND tails at the same 
time, rather than just one or the other...
```

The AI responds directly in your terminal. No internet, no API calls, no logging.

### Your First Real Prompt

Try something practical:

```
>>> Write a Python function that reverses a string

def reverse_string(s):
    """
    Reverses the input string.
    
    Args:
        s: The string to reverse
        
    Returns:
        The reversed string
    """
    return s[::-1]

# Example usage
print(reverse_string("hello"))  # Output: "olleh"
```

Local AI. On your machine. Private and free.

### Exiting

To exit the chat:
- Type `/bye` and press Enter
- Or press `Ctrl+D`

## Best Models to Try

Ollama supports dozens of models. Here are my recommendations:

### General Purpose

**Llama 3.3 (8B and 70B)**
- Meta's flagship open model
- Best overall quality for most tasks
- Start with 8B, upgrade to 70B if you have the RAM

```bash
ollama pull llama3.3
```

**Mistral Large (123B or smaller variants)**
- European AI lab's top model
- Excellent at reasoning and instruction following
- Strong competitor to Llama

```bash
ollama pull mistral
```

**Qwen 2.5**
- Alibaba's open model
- Excellent for multilingual tasks
- Strong coding capabilities

```bash
ollama pull qwen2.5
```

### Coding Focus

**DeepSeek Coder V3**
- Specialized for programming
- Multiple language support
- Code completion and generation

```bash
ollama pull deepseek-coder-v2
```

**CodeLlama**
- Meta's code-specialized Llama variant
- Great for code review and generation
- Multiple sizes available

```bash
ollama pull codellama
```

### Compact and Fast

For older hardware or when speed matters more than capability:

**Phi-4**
- Microsoft's compact model
- Surprisingly capable for its size
- Fast on modest hardware

```bash
ollama pull phi4
```

**Gemma 2**
- Google's open model
- Good balance of speed and quality
- 2B and 9B versions

```bash
ollama pull gemma2
```

### Uncensored/Unrestricted

Some models have fewer content restrictions:

**Dolphin-Mistral**
- Based on Mistral
- Fewer refusals
- Good for creative writing

```bash
ollama pull dolphin-mistral
```

**Caveat:** Unrestricted models require responsible use. They won't refuse harmful requests—that responsibility falls on you.

## Essential Ollama Commands

Master these commands to use Ollama effectively:

### Managing Models

**List installed models:**
```bash
ollama list
```

Shows all models on your machine with sizes.

**Download a model:**
```bash
ollama pull <model-name>
```

**Remove a model (free disk space):**
```bash
ollama rm <model-name>
```

**Get model details:**
```bash
ollama show <model-name>
```

### Running Models

**Start interactive chat:**
```bash
ollama run <model-name>
```

**Send a single prompt (non-interactive):**
```bash
ollama run llama3.3 "What is the capital of France?"
```

**Run with specific parameters:**
```bash
ollama run llama3.3 --verbose
```

### API Server

**Start the API server:**
```bash
ollama serve
```

This starts Ollama listening on `localhost:11434` for API requests from other applications.

The API is OpenAI-compatible, meaning many tools built for OpenAI's API work with Ollama.

### System Commands

**Check Ollama version:**
```bash
ollama --version
```

**See running models:**
```bash
ollama ps
```

**Copy a model (for customization):**
```bash
ollama cp llama3.3 my-custom-llama
```

## Creating Custom Models with Modelfiles

Ollama's killer feature: customizing models with Modelfiles.

### What Is a Modelfile?

A Modelfile is a configuration file that lets you:
- Set a custom system prompt
- Adjust generation parameters
- Create specialized personas
- Package your customizations for reuse

### Basic Modelfile Example

Create a file named `Modelfile`:

```dockerfile
FROM llama3.3

SYSTEM """
You are a helpful Python programming assistant. You write clean, 
well-documented code with proper error handling. When asked for code, 
always include example usage and explain your approach briefly.
"""

PARAMETER temperature 0.7
PARAMETER top_p 0.9
```

Then create your custom model:

```bash
ollama create python-assistant -f Modelfile
```

Now you can run:
```bash
ollama run python-assistant
```

### Setting System Prompts

The `SYSTEM` instruction defines the model's persona:

```dockerfile
FROM mistral

SYSTEM """
You are a creative writing assistant specializing in science fiction.
You help writers develop compelling narratives, create interesting 
characters, and build believable worlds. Be encouraging and constructive.
"""
```

### Adjusting Parameters

Common parameters to tune:

| Parameter | Effect | Default |
|-----------|--------|---------|
| `temperature` | Higher = more creative, Lower = more focused | 0.8 |
| `top_p` | Controls response diversity | 0.9 |
| `top_k` | Limits token choices | 40 |
| `num_ctx` | Context window size | Model-dependent |

Example for precise, deterministic responses:
```dockerfile
PARAMETER temperature 0.2
PARAMETER top_p 0.5
```

Example for creative, varied responses:
```dockerfile
PARAMETER temperature 1.0
PARAMETER top_p 0.95
```

## GUI Options for Ollama

Terminal not your thing? Several graphical interfaces work with Ollama:

### Open WebUI

<a href="https://github.com/open-webui/open-webui" target="_blank" rel="noopener noreferrer">Open WebUI</a> is the most popular Ollama frontend:

- ChatGPT-like interface in your browser
- Conversation history
- Multiple model switching
- Document upload and RAG capabilities
- Multi-user support

**Installation via Docker:**
```bash
docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway \
    -v open-webui:/app/backend/data --name open-webui --restart always \
    ghcr.io/open-webui/open-webui:main
```

Then open `http://localhost:3000` in your browser.

### Other GUI Options

**Chatbox** - Desktop app for Mac/Windows/Linux
**Msty** - Native Mac app with clean interface
**LM Studio** - Alternative that can also connect to Ollama
**Enchanted** - iOS app for Ollama on mobile

## Integration with Applications

Ollama's API makes it work with many tools:

### API Access

Ollama provides an OpenAI-compatible API at `http://localhost:11434`:

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.3",
  "prompt": "What is the meaning of life?"
}'
```

### Using with VS Code

Several VS Code extensions support Ollama:
- **Continue** - AI code assistant
- **Cody** - Coding AI companion
- **Ollama Coder** - Code completion

Configure them to point at `localhost:11434` and select your preferred model.

### Python Integration

```python
import requests

def ask_ollama(prompt, model="llama3.3"):
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={"model": model, "prompt": prompt, "stream": False}
    )
    return response.json()["response"]

# Usage
answer = ask_ollama("Explain recursion in programming")
print(answer)
```

For more robust applications, use the official `ollama` Python library:

```bash
pip install ollama
```

```python
import ollama

response = ollama.chat(model='llama3.3', messages=[
    {'role': 'user', 'content': 'Why is the sky blue?'}
])
print(response['message']['content'])
```

## Troubleshooting Common Issues

### Model Loading Errors

**"Model not found"**
The model isn't downloaded. Run:
```bash
ollama pull <model-name>
```

**"Insufficient memory"**
Your system doesn't have enough RAM. Try a smaller model:
```bash
ollama run phi4  # Instead of llama3.3:70b
```

### Memory Issues

**Symptoms:** Slow performance, system freezing, crashes

**Solutions:**
1. Close other applications to free RAM
2. Use smaller models (7B instead of 70B)
3. Reduce context length in Modelfile: `PARAMETER num_ctx 2048`
4. Add more RAM (the real solution for serious use)

### Slow Performance

**On CPU:**
- Expected with no GPU
- Use smaller, quantized models
- Be patient—it works, just slower

**With GPU but still slow:**
- Verify GPU is being used: `ollama run llama3.3 --verbose`
- Check CUDA/Metal drivers are current
- Ensure model fits in VRAM

### Port Conflicts

**"Address already in use"**
Another service is using port 11434.

```bash
# Find what's using the port
lsof -i :11434

# Kill the process if needed
kill -9 <PID>

# Or run Ollama on a different port
OLLAMA_HOST=0.0.0.0:11435 ollama serve
```

## Frequently Asked Questions

### Is Ollama free?

Yes, completely free. Ollama is open-source software. Models are also free to download and use. No subscriptions, no API fees, no hidden costs.

### Can my computer run it?

If you have:
- 8 GB RAM minimum (16 GB recommended)
- A few GB of free disk space
- macOS, Windows, or Linux

Then yes, you can run basic models. Quality of experience scales with hardware.

### Is it as good as ChatGPT?

Depends on the task:
- For general conversation: Close, but ChatGPT (GPT-4o) has an edge
- For coding: Comparable with the right models
- For privacy-sensitive work: Local AI wins by definition
- For offline use: Local AI is the only option

The gap has narrowed dramatically. For most practical uses, local models are "good enough."

### Can I use it offline?

Yes, completely. Once models are downloaded, Ollama works without any internet connection.

### Which model should I start with?

Start with `llama3.3` (the 8B version downloads by default). It's capable, fast, and handles most general tasks well. Upgrade to larger models as you understand your needs.

## Conclusion

Running AI locally went from "expert hobby" to "5-minute setup" thanks to Ollama. The benefits are real:
- Complete privacy for sensitive work
- No ongoing costs
- Offline functionality
- Freedom to experiment

Start simple:
1. Install Ollama (one command)
2. Pull Llama 3.3 (`ollama pull llama3.3`)
3. Start chatting (`ollama run llama3.3`)

That's genuinely all it takes.

As you get comfortable, explore different models, create custom Modelfiles, and integrate Ollama into your development workflow. The ecosystem keeps improving, with new models and features arriving regularly.

For more on AI development, check out our guide on [what AI agents are](/blog/what-are-ai-agents) or learn how to [build your first AI agent with Python](/blog/build-first-ai-agent-python).

Your AI, your machine, your control.

*Last updated: January 9, 2026*
