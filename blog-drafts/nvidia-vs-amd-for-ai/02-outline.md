# Content Outline: Nvidia vs AMD for AI: Which GPU Should You Buy?

**Based on:** 01-research-brief.md
**Target Word Count:** 4,500+ words
**Content Type:** Comparison
**Primary Keyword:** nvidia vs amd for ai

---

## Article Structure

### Introduction (200-250 words)
**Hook:** Start with personal observation about the GPU debate
**Goal:** Frame the NVIDIA vs AMD decision and why it matters in 2026
**Include:** 
- Acknowledge NVIDIA's historical dominance
- Tease that AMD is closing the gap
- Promise practical, actionable guidance
- Primary keyword in first 100 words

---

### H2: The State of AI GPUs in 2026 (350-400 words)

**H3: Why GPUs Matter for AI**
- Parallel processing fundamentals
- Training vs inference distinction
- Why dedicated GPUs outperform integrated graphics

**H3: The Duopoly Landscape**
- NVIDIA's market position (80-92% share statistic)
- AMD's aggressive push into AI
- What changed in 2025-2026

**Internal Link:** Link to "AI PC Explained" article

---

### H2: NVIDIA for AI: The Dominant Force (500-550 words)

**H3: Current Consumer GPU Lineup (RTX 5000 Series)**
- RTX 5090: 32GB VRAM, Blackwell architecture highlights
- RTX 5080: 16GB VRAM, mid-high tier
- RTX 5070 Ti/5070: Entry Blackwell options
- RTX 4090: Still excellent, used market value

**H3: What Makes NVIDIA Excel**
- CUDA ecosystem maturity (15+ years)
- Tensor Cores for AI acceleration
- Universal framework support (PyTorch, TensorFlow, etc.)
- DLSS 4.5 and AI-native features

**H3: The NVIDIA Premium**
- Higher prices justified?
- "It just works" factor for AI
- First-party optimization advantage

**Personal experience:** Share observation about CUDA's reliability

---

### H2: AMD for AI: The Challenger Rises (500-550 words)

**H3: Current Consumer GPU Lineup (RX 9000 Series)**
- RX 9070 XT: 16GB VRAM, RDNA 4 AI improvements
- RX 9070: Mid-range contender
- RX 7900 XTX: 24GB VRAM champion
- Professional options (PRO W6800)

**H3: What Makes AMD Competitive**
- ROCm open-source platform
- 8x AI compute improvement (RDNA 4 vs RDNA 3)
- Better VRAM-per-dollar ratio
- No vendor lock-in

**H3: The AMD Reality Check**
- ROCm compatibility gaps (honest assessment)
- Smaller developer ecosystem
- Learning curve for troubleshooting
- ROCm 7.2 improvements

**Hot take:** "I was skeptical about AMD for AI until recently..."

---

### H2: CUDA vs ROCm: The Software Showdown (450-500 words)

**H3: NVIDIA CUDA Deep Dive**
- Industry standard status
- Library ecosystem (cuDNN, TensorRT)
- Framework integration depth
- Developer resources and community

**H3: AMD ROCm Reality**
- Open-source philosophy benefits
- PyTorch official support
- ROCm 7.2 features (Windows, ComfyUI)
- Where it still struggles

**H3: What This Means for You**
- If you want plug-and-play: NVIDIA
- If you want cost savings and flexibility: AMD
- The "tinkerer" vs "just works" spectrum

**Uncertainty:** "Even experts disagree on when ROCm will truly reach parity..."

**Internal Link:** Link to "Ollama Local AI Guide"

---

### H2: VRAM: The Most Important Spec for AI (400-450 words)

**H3: Why VRAM Matters More Than Raw Speed**
- Model loading requirements
- The ~2GB per billion parameter rule
- What happens when you run out

**H3: VRAM Requirements by Use Case**
| Use Case | Minimum VRAM | Recommended VRAM |
|----------|--------------|------------------|
| 7B models (Llama 3) | 8GB | 12GB |
| 13B models | 12GB | 16GB |
| 70B models (quantized) | 24GB | 32GB |
| Multiple models | 24GB+ | 32GB+ |

**H3: VRAM Comparison: NVIDIA vs AMD**
- RTX 5090 (32GB) vs no direct AMD consumer equivalent
- RTX 5070 Ti (16GB) vs RX 9070 XT (16GB)
- Value analysis at each tier

**Personal experience:** "Nothing's more frustrating than running out of VRAM mid-inference..."

**Internal Link:** Link to "Best Open Source LLMs" for model selection

---

### H2: Head-to-Head: Real-World AI Performance (450-500 words)

**H3: Local LLM Inference**
- Ollama performance comparison
- Tokens per second benchmarks
- Model loading times

**H3: Image Generation (Stable Diffusion)**
- NVIDIA's optimization advantage
- AMD's improving ComfyUI support
- Generation speed comparisons

**H3: Fine-Tuning and Training**
- Where NVIDIA truly shines
- AMD's memory advantage for larger batches
- Realistic expectations for consumer hardware

**Featured Snippet Target:** Performance comparison table

---

### H2: Which GPU Should You Buy? (400-450 words)

**H3: Best NVIDIA GPUs for AI (2026)**
| Budget | Recommendation | Why |
|--------|----------------|-----|
| No limit | RTX 5090 (32GB) | Maximum VRAM, latest architecture |
| High-end | RTX 4090 (used, 24GB) | Excellent value, proven performance |
| Mid-range | RTX 5070 Ti (16GB) | Sweet spot for most users |
| Budget | RTX 4060 Ti (16GB) | Entry point with adequate VRAM |

**H3: Best AMD GPUs for AI (2026)**
| Budget | Recommendation | Why |
|--------|----------------|-----|
| High-end | RX 7900 XTX (24GB) | Best AMD VRAM value |
| Mid-range | RX 9070 XT (16GB) | Latest architecture |
| Budget | RX 7800 XT (16GB) | Affordable, capable |

**H3: Clear Recommendations**
- For beginners: NVIDIA (fewer headaches)
- For tinkerers: AMD (better value, learning opportunity)
- For professionals: NVIDIA (time is money)
- For budget-conscious: AMD (more VRAM per dollar)

**Internal Link:** Link to "Llama 3 Guide"

---

### H2: The Future: What's Coming in 2026-2027 (300-350 words)

**H3: NVIDIA's Roadmap**
- Rubin architecture (late 2026)
- Expected improvements
- Enterprise focus impact on consumers

**H3: AMD's Trajectory**
- MI500 series (2027)
- Continued ROCm investment
- Consumer GPU evolution

**H3: Will AMD Catch Up?**
- Honest assessment of the gap
- What would need to change
- Prediction: "Real choice in AI GPUs within 2 years"

---

### H2: Frequently Asked Questions (300-350 words)

**Q: Is NVIDIA better than AMD for AI?**
A: For most users, yes. NVIDIA's CUDA ecosystem offers better compatibility and ease of use. However, AMD provides excellent value for users comfortable with some technical configuration.

**Q: How much VRAM do I need for running AI locally?**
A: At minimum 12GB for 7B models, 16GB for 13B models, and 24GB+ for larger models. More VRAM is always better for AI workloads.

**Q: Can I run ChatGPT-level AI on an AMD GPU?**
A: Yes! Modern AMD GPUs with ROCm support can run open-source LLMs like Llama 3 effectively. The setup may require more configuration than NVIDIA.

**Q: Is a used RTX 4090 still worth buying in 2026?**
A: Absolutely. The 24GB VRAM and mature CUDA support make it excellent for AI, often at better value than new mid-range cards.

**Q: What's the best budget GPU for AI in 2026?**
A: For NVIDIA, the RTX 4060 Ti 16GB version offers the best entry point. For AMD, the RX 7800 XT 16GB provides similar capability at lower cost.

---

### Conclusion (150-200 words)
**Summary:** Recap key differences and recommendations
**CTA:** Encourage readers to check internal links for setup guides
**Final thought:** Balance between "NVIDIA for ease" and "AMD for value"

---

## Word Count Allocation

| Section | Words |
|---------|-------|
| Introduction | 250 |
| State of AI GPUs in 2026 | 400 |
| NVIDIA for AI | 550 |
| AMD for AI | 550 |
| CUDA vs ROCm | 500 |
| VRAM Guide | 450 |
| Performance Comparison | 500 |
| Buying Recommendations | 450 |
| Future Outlook | 350 |
| FAQ | 350 |
| Conclusion | 200 |
| **Total** | **4,550** |

---

## Internal Links Planned

1. /blog/ai-pc-explained - "AI PC"
2. /blog/ollama-local-ai-guide - "running AI locally with Ollama"
3. /blog/best-open-source-llms - "open source LLMs"
4. /blog/llama-3-guide - "Llama 3"
5. /blog/best-gpu-for-ai - "best GPU for AI"

## External Links Planned

1. NVIDIA official specs page
2. AMD official GPU page
3. PyTorch ROCm support documentation
4. Tom's Hardware GPU benchmarks

---

*Outline complete. Ready for `/blog-writer` phase.*
