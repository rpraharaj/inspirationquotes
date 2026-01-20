---
heroImage: "/images/featured/fine-tune-llama-tutorial.webp"
title: "Fine-Tune Llama: Customize AI For Your Use Case (2026)"
description: "Learn how to fine-tune Llama 4 with LoRA to create a custom AI model. Step-by-step tutorial covering dataset prep, training, and deployment."
pubDate: 2025-09-25
updatedDate: 2025-11-22
author: aiagentskit
category: open-source-ai
tags:
  - fine-tuning
  - llama
  - lora
  - training
  - open-source
  - tutorial
readingTime: 19 min read
---

Last month I built a code review assistant that actually understands my team's coding standards. Not just generic best practices—our specific conventions, our preferred patterns, our exact feedback style.

The secret wasn't clever prompting. It was fine-tuning. I took Meta's Llama 4 model and trained it on examples of how we do code reviews. Now it gives feedback that sounds like a senior developer on our team, not a generic AI.

Fine-tuning sounds intimidating, but modern techniques like LoRA make it surprisingly accessible. You don't need a data center or a PhD. With the right approach, you can create genuinely custom AI models on consumer hardware using tools from <a href="https://huggingface.co/docs/peft" target="_blank" rel="noopener">Hugging Face</a>.

Let me walk you through exactly how to do it.

## When to Fine-Tune vs Prompt Engineer

Before investing in fine-tuning, ask whether you actually need it.

### Prompt Engineering Limits

Prompt engineering is powerful. With good prompts, you can make AI write in specific styles, follow complex formats, and behave in particular ways. See our [prompt engineering guide](/blog/prompt-engineering-beginners-guide) for fundamentals.

But prompting has limits:
- **Token costs**: Long system prompts use tokens every time
- **Context limits**: You can only fit so many examples in a prompt
- **Consistency**: Models can drift from prompt instructions over long outputs
- **Deep behavior**: Some behaviors are hard to describe but easy to demonstrate

If you find yourself copying the same 500-word prompt into every conversation, or the AI frequently "forgets" your instructions mid-response, fine-tuning might help.

### Fine-Tuning Benefits

Fine-tuning bakes behavior into the model itself:
- **No prompt overhead**: The model just knows how to behave
- **Better consistency**: Learned behavior is more stable than prompted behavior
- **Unlimitied context for training**: You can show thousands of examples
- **Proprietary knowledge**: Train on data you can't share in prompts

### Decision Framework

**Use prompt engineering when:**
- Your needs can be described in a few paragraphs
- You're still experimenting with what you want
- You need flexibility to change behavior easily
- Your requirements are similar to the model's default behavior

**Use fine-tuning when:**
- You have many examples of desired behavior
- You need very consistent, specific output style
- Prompt overhead is costing you tokens
- The behavior is hard to describe but easy to show
- You're building a product with specific requirements

## Prerequisites and Requirements

Fine-tuning requires some computational resources. Let's be realistic about what you need.

### Hardware Requirements

**Minimum viable setup:**
- GPU with 12+ GB VRAM (RTX 3080, RTX 4070 Ti, etc.)
- 32 GB system RAM
- 50+ GB free disk space
- CUDA support (NVIDIA GPUs)

**Recommended setup:**
- GPU with 24+ GB VRAM (RTX 4090, A5000, etc.)
- 64 GB system RAM
- 200+ GB SSD storage
- Fast internet for downloading models

**Cloud alternatives:**
If your hardware is insufficient, cloud options work well:
- Google Colab Pro+ (~$50/month) has adequate GPUs
- RunPod, Lambda Labs offer hourly GPU rental
- Many tutorials run fine on cloud platforms

For more on hardware considerations, see our [GPU guide for AI](/blog/best-gpu-for-ai).

### Software Setup

You'll need:
- Python 3.10+
- CUDA toolkit (version matching your GPU driver)
- Hugging Face account (free, for model access)
- <a href="https://llama.meta.com/" target="_blank" rel="noopener">Meta's Llama license</a> acceptance

Install the core libraries:

```bash
pip install torch transformers datasets accelerate peft bitsandbytes trl
```

These packages provide:
- `torch`: PyTorch deep learning framework
- `transformers`: Hugging Face model library
- `datasets`: Dataset handling
- `accelerate`: Training optimization
- `peft`: LoRA and adapter methods
- `bitsandbytes`: Quantization for lower memory
- `trl`: Fine-tuning helpers

### Understanding the Compute Cost

Let's be honest about costs:

**Time:**
- Small dataset (100 examples): 30 min - 2 hours
- Medium dataset (1,000 examples): 2 - 6 hours  
- Large dataset (10,000+ examples): 12+ hours

**Electricity:** Running GPUs at full load uses significant power. Budget accordingly if using personal hardware.

**Cloud costs:** At ~$1-3/hour for capable GPUs, a training run might cost $5-50 depending on dataset size.

### Alternatives for Limited Hardware

If you can't access a high-end GPU:
- **Google Colab**: Free tier sometimes has T4 GPUs (limited but usable)
- **Kaggle Notebooks**: 30 hours/week of free GPU
- **Smaller models**: Fine-tune smaller Llama variants (8B instead of 70B)
- **Aggressive quantization**: Use 4-bit training to reduce memory

## Understanding LoRA and QLoRA

You don't need to fully understand these techniques to use them, but a basic grasp helps.

### Full Fine-Tuning vs LoRA

**Full fine-tuning** updates every parameter in the model. For a 7B parameter model, that means adjusting 7 billion numbers. This requires enormous memory and storage—you end up with a complete modified model larger than the original.

**LoRA (Low-Rank Adaptation)** takes a clever shortcut. Instead of modifying all parameters, it trains small adapter matrices that modify the model's behavior. For a 7B model, the adapters might be only 20-100 MB.

The result is:
- 99%+ memory reduction during training
- Tiny storage (adapters only)
- Similar quality to full fine-tuning for most use cases
- Can merge adapters into base model later

### How LoRA Works

Without getting too mathematical: neural networks have layers that transform information. Each layer has a weight matrix. LoRA adds small "side matrices" to these weights that adjust behavior.

During training, only these small matrices are updated. The original model weights never change. This is why it's so efficient.

After training, you can either:
- Keep adapters separate (load base model + adapter when running)
- Merge adapters into base model (slightly slower to merge, simpler to deploy)

### QLoRA for Memory Efficiency

QLoRA (Quantized LoRA) goes further by loading the base model in 4-bit precision. This cuts memory requirements roughly in half again.

The trade-off is slight quality reduction and slower training. But it enables fine-tuning models that otherwise wouldn't fit in memory.

**When to use each:**
- **LoRA**: When you have enough VRAM for the base model in 16-bit
- **QLoRA**: When memory is tight, or for larger models

## Preparing Your Dataset

Dataset quality matters more than quantity. A small, high-quality dataset often outperforms a large, messy one.

### Dataset Formats

For instruction fine-tuning (the most common type), your data should be formatted as instruction-response pairs:

```json
{
  "instruction": "How would you describe the character development in this passage?",
  "input": "[passage text here]",
  "output": "The passage shows Dorothy developing from a passive observer to an active participant..."
}
```

Or in conversational format:

```json
{
  "conversations": [
    {"role": "user", "content": "Review this code for issues: [code]"},
    {"role": "assistant", "content": "I found three issues: First, ..."}
  ]
}
```

Common formats:
- **Alpaca format**: instruction, input (optional), output
- **ShareGPT format**: List of turns with roles
- **OpenAI format**: Messages array with role and content

### Quality Over Quantity

**100 excellent examples often beat 10,000 mediocre ones.**

What makes a good training example:
- **Representative**: Shows the behavior you actually want
- **Consistent**: All examples follow the same style
- **Complete**: Full responses, not cut off
- **Correct**: No errors in the outputs you're training toward

What to avoid:
- Contradictory examples (one says "use passive voice," another uses active)
- Low-quality outputs (typos, unclear writing)
- Ambiguous examples where good behavior isn't clear

### Cleaning and Formatting

Before training, clean your data:

```python
import json

def clean_example(example):
    # Remove excessive whitespace
    example['instruction'] = ' '.join(example['instruction'].split())
    example['output'] = example['output'].strip()
    
    # Ensure minimum quality
    if len(example['output']) < 50:
        return None  # Skip too-short examples
    
    return example

# Load and clean
with open('raw_data.json', 'r') as f:
    data = json.load(f)

cleaned = [clean_example(ex) for ex in data]
cleaned = [ex for ex in cleaned if ex is not None]

# Save cleaned data
with open('cleaned_data.json', 'w') as f:
    json.dump(cleaned, f)
```

### Train/Validation Split

Always hold out some data for validation:

```python
from sklearn.model_selection import train_test_split

train_data, val_data = train_test_split(cleaned, test_size=0.1, random_state=42)

print(f"Training examples: {len(train_data)}")
print(f"Validation examples: {len(val_data)}")
```

Validation data helps you detect overfitting—when the model memorizes your training data rather than learning generalizable patterns.

## Step-by-Step Fine-Tuning with Hugging Face

Let's build a complete fine-tuning pipeline.

### Environment Setup

Create a fresh virtual environment:

```bash
python -m venv finetune-env
source finetune-env/bin/activate  # Windows: finetune-env\Scripts\activate

pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
pip install transformers datasets accelerate peft bitsandbytes trl
```

Verify GPU access:

```python
import torch
print(f"CUDA available: {torch.cuda.is_available()}")
print(f"Device: {torch.cuda.get_device_name(0)}")
print(f"Memory: {torch.cuda.get_device_properties(0).total_memory / 1e9:.1f} GB")
```

### Loading the Base Model

For this tutorial, we'll use Llama 4 8B—large enough to be capable, small enough to fine-tune on consumer hardware:

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

model_name = "meta-llama/Llama-4-8B-Instruct"

# Load tokenizer
tokenizer = AutoTokenizer.from_pretrained(model_name)
tokenizer.pad_token = tokenizer.eos_token

# Load model in 4-bit for memory efficiency (QLoRA)
from transformers import BitsAndBytesConfig

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
    bnb_4bit_use_double_quant=True,
)

model = AutoModelForCausalLM.from_pretrained(
    model_name,
    quantization_config=bnb_config,
    device_map="auto",
    trust_remote_code=True,
)
```

You'll need to have accepted Meta's Llama license and be logged into Hugging Face:

```bash
huggingface-cli login
```

For more on accessing models, see our [Hugging Face tutorial](/blog/hugging-face-tutorial).

### Configuring LoRA

Set up the LoRA configuration:

```python
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training

# Prepare model for training
model = prepare_model_for_kbit_training(model)

# LoRA configuration
lora_config = LoraConfig(
    r=16,                       # Rank - higher = more capacity, more memory
    lora_alpha=32,              # Scaling factor
    target_modules=[            # Which layers to adapt
        "q_proj", "k_proj", "v_proj", "o_proj",
        "gate_proj", "up_proj", "down_proj"
    ],
    lora_dropout=0.1,           # Dropout for regularization
    bias="none",                # Don't train biases
    task_type="CAUSAL_LM"       # Task type
)

# Apply LoRA to model
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
```

The output will show something like:
```
trainable params: 19,922,944 || all params: 8,030,261,248 || trainable%: 0.2481
```

Only 0.25% of parameters are being trained—that's the LoRA efficiency.

### Training Parameters

Configure the training run:

```python
from transformers import TrainingArguments

training_args = TrainingArguments(
    output_dir="./llama4-finetuned",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,
    learning_rate=2e-4,
    warmup_ratio=0.03,
    logging_steps=10,
    save_strategy="epoch",
    evaluation_strategy="epoch",
    fp16=True,
    optim="paged_adamw_32bit",
    max_grad_norm=0.3,
    lr_scheduler_type="cosine",
)
```

Key parameters explained:
- **num_train_epochs**: How many times to go through the data (2-5 usually)
- **batch_size × gradient_accumulation**: Effective batch size (16 here)
- **learning_rate**: 1e-4 to 3e-4 works well for LoRA
- **warmup_ratio**: Gradual learning rate increase at start

### Running the Training

Prepare your data and start training:

```python
from datasets import load_dataset
from trl import SFTTrainer

# Load your dataset
dataset = load_dataset("json", data_files={
    "train": "train_data.json",
    "validation": "val_data.json"
})

# Format function for your data
def format_instruction(example):
    return f"""### Instruction:
{example['instruction']}

### Response:
{example['output']}"""

# Create trainer
trainer = SFTTrainer(
    model=model,
    train_dataset=dataset["train"],
    eval_dataset=dataset["validation"],
    tokenizer=tokenizer,
    args=training_args,
    formatting_func=format_instruction,
    max_seq_length=2048,
)

# Train!
trainer.train()
```

Training progress will be logged:
```
{'loss': 2.1453, 'learning_rate': 0.0002, 'epoch': 0.5}
{'loss': 1.8234, 'learning_rate': 0.00019, 'epoch': 1.0}
...
```

Watch for decreasing loss. If validation loss starts increasing while training loss decreases, you're overfitting.

### Saving the Adapter

After training, save your LoRA adapter:

```python
# Save adapter weights
model.save_pretrained("./llama4-lora-adapter")

# Also save tokenizer
tokenizer.save_pretrained("./llama4-lora-adapter")
```

This creates a small directory (tens of MB) with just your fine-tuned adapter weights.

## Evaluating Your Fine-Tuned Model

Before deploying, test your model thoroughly.

### Qualitative Testing

Load your fine-tuned model and test manually:

```python
from peft import PeftModel

# Load base model
base_model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-4-8B-Instruct",
    quantization_config=bnb_config,
    device_map="auto",
)

# Load adapter
model = PeftModel.from_pretrained(base_model, "./llama4-lora-adapter")

# Test generation
def generate(prompt, max_tokens=200):
    inputs = tokenizer(prompt, return_tensors="pt").to("cuda")
    outputs = model.generate(
        **inputs,
        max_new_tokens=max_tokens,
        temperature=0.7,
        do_sample=True,
    )
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

# Test with examples similar to training data
print(generate("### Instruction:\n[Your test instruction]\n\n### Response:\n"))
```

Compare outputs to:
1. The original base model (without fine-tuning)
2. Your training examples
3. Your actual use case requirements

### Quantitative Metrics

For more rigorous evaluation, compute metrics on held-out data:

```python
import numpy as np

# Run inference on validation set
predictions = []
references = []

for example in dataset["validation"]:
    prompt = format_instruction(example).split("### Response:")[0] + "### Response:\n"
    pred = generate(prompt)
    
    predictions.append(pred)
    references.append(example["output"])

# Compute metrics (using your preferred metric)
# Options: BLEU, ROUGE, custom similarity scores, LLM-as-judge
```

For many fine-tuning use cases, qualitative assessment by humans is more meaningful than automatic metrics.

### Overfitting Detection

Signs of overfitting:
- Validation loss increasing while training loss decreases
- Model outputs training examples nearly verbatim
- Good performance on training-like inputs, poor on novel inputs

If overfitting:
- Use less training data
- Train for fewer epochs
- Increase dropout
- Reduce LoRA rank

## Deploying Your Custom Model

Once you're happy with your model, deploy it.

### Merging LoRA Weights

For simpler deployment, merge adapters into the base model:

```python
# Merge adapter into base model
merged_model = model.merge_and_unload()

# Save the merged model
merged_model.save_pretrained("./llama4-merged")
tokenizer.save_pretrained("./llama4-merged")
```

This creates a full model ready to run without loading adapters separately.

### Using with Ollama

To use your fine-tuned model with Ollama for easy local deployment:

1. Convert to GGUF format (Ollama's preferred format)
2. Create a Modelfile
3. Create the Ollama model

```bash
# Convert to GGUF (using llama.cpp's convert script)
python convert.py ./llama4-merged --outtype f16 --outfile llama4-finetuned.gguf

# Quantize for efficiency
./quantize llama4-finetuned.gguf llama4-finetuned-q4.gguf Q4_K_M
```

Create a Modelfile:
```
FROM ./llama4-finetuned-q4.gguf

SYSTEM "You are a helpful assistant fine-tuned for [your use case]."
```

Create in Ollama:
```bash
ollama create my-custom-llama -f Modelfile
ollama run my-custom-llama
```

See our [Ollama guide](/blog/ollama-local-ai-guide) for more details on local deployment.

### API Deployment Options

For production APIs:
- **vLLM**: High-throughput inference server
- **Text Generation Inference (TGI)**: Hugging Face's server
- **Replicate**: Cloud deployment with simple API

Each option has trade-offs in complexity, cost, and performance.

## Common Mistakes and Fixes

**Problem: Loss doesn't decrease**
- Learning rate too low or too high
- Dataset formatting issues
- Try learning rates: 1e-4, 2e-4, 3e-4

**Problem: Model outputs garbage**
- Tokenizer mismatch (using wrong tokenizer)
- Training data format doesn't match inference format
- Not enough training data

**Problem: Model memorizes but doesn't generalize**
- Classic overfitting
- Reduce epochs, increase dropout
- Add more diverse training examples

**Problem: Out of memory during training**
- Reduce batch size
- Use gradient checkpointing: `model.gradient_checkpointing_enable()`
- Use smaller LoRA rank (r=8 instead of r=16)

**Problem: Training is too slow**
- Enable bf16/fp16 training
- Use flash attention if available
- Reduce max sequence length if your data is shorter

## Frequently Asked Questions

### How much training data do I need?

Quality matters more than quantity. 50-100 high-quality examples can produce noticeable improvement. 500-1000 examples usually enough for good results. More data helps for complex tasks, but diminishing returns set in.

### Can I fine-tune on copyrighted material?

Technically possible, legally questionable. The training process doesn't "contain" the original data, but you may face legal challenges if your model reproduces copyrighted content. Consult legal advice for commercial use.

### How long does fine-tuning take?

With QLoRA on a capable GPU: 1-2 hours for small datasets (100-500 examples), 4-8 hours for medium datasets, 12+ hours for large datasets. Cloud GPUs are often faster than consumer hardware.

### What's the quality difference between LoRA and full fine-tuning?

For most use cases, nearly identical. LoRA might slightly underperform for very complex behavior changes, but the efficiency gain is almost always worth it.

### Can I fine-tune GPT-5 or Claude?

No—those are closed models. You can only fine-tune [open source models](/blog/best-open-source-llms) like Llama, Mistral, and Phi. Some closed providers offer fine-tuning services (OpenAI), but you don't get the model weights.

## Conclusion

Fine-tuning isn't magic, but it is powerful. With LoRA and modern tools, you can create genuinely custom AI models that understand your specific needs—not just generic capabilities twisted through prompting.

The key takeaways:
1. Fine-tune when prompting isn't enough (consistency, efficiency, proprietary knowledge)
2. Quality training data matters more than quantity
3. LoRA makes fine-tuning accessible on consumer hardware
4. Test thoroughly before deploying

My code review assistant has saved my team countless hours. The investment in fine-tuning paid for itself in the first week. Your custom model might do the same for your use case.

For more on working with open source AI, explore our guides on [Llama models](/blog/llama-3-guide) and [running AI locally with Ollama](/blog/ollama-local-ai-guide).

Now go build something that's actually yours.

*Last updated: January 11, 2026*
