---
title: "AI on Raspberry Pi: Run Models on Tiny Hardware"
description: "A practical guide to running AI models on Raspberry Pi 5. Learn how to set up Ollama, deploy LLMs, run computer vision, and build edge AI projects on affordable hardware."
pubDate: "2026-01-10"
updatedDate: "2026-01-10"
author: "AI Agents Kit"
authorImage: "/images/authors/ai-agents-kit.svg"
coverImage: "/images/blog/ai-raspberry-pi.svg"
coverImageAlt: "Raspberry Pi 5 running AI models with connected camera and display"
category: "ai-hardware"
tags: ["raspberry pi", "edge ai", "local ai", "llm", "computer vision"]
featured: false
draft: false
readingTime: 16
---

There's something deeply satisfying about running AI on a $80 computer the size of a credit card. While everyone else debates which cloud API to use, you can have your own AI assistant running entirely offline, on a device that fits in your pocket.

I've been experimenting with AI on Raspberry Pi for a while now, and I'm genuinely impressed by what's possible. The Pi 5, especially with 8GB of RAM, can run small language models, perform real-time computer vision, and handle voice processing—all without an internet connection.

This guide walks you through everything you need to know to get started with AI on Raspberry Pi: hardware selection, setup, running large language models, computer vision projects, and optimization tips. Whether you're building a privacy-focused assistant, an edge AI prototype, or just learning how AI works, the Pi is a surprisingly capable platform.

## Why Run AI on a Raspberry Pi?

Before diving into the how, let's address the why. Given that cloud AI APIs exist, why bother with local hardware?

### Privacy and Offline Operation

This is the big one for many people. Running AI locally means:

- **Your data never leaves your network**: No uploading voice recordings, photos, or documents to third-party servers
- **Works without internet**: Your AI assistant keeps working when the network goes down
- **No ongoing costs**: No API fees, subscriptions, or usage charges

For home automation, personal assistants, or any privacy-sensitive application, local AI makes a lot of sense.

### Learning and Understanding

There's no better way to understand how AI works than running it yourself. When you deploy a model on a Pi:

- You see exactly how much memory it uses
- You understand the trade-offs between model size and capability
- You learn about quantization, inference, and optimization firsthand

This hands-on experience demystifies AI in a way that API calls never can.

### Prototyping and Edge Deployment

The Raspberry Pi is perfect for:

- Building proof-of-concept edge AI devices
- Prototyping before expensive hardware investments
- Deploying AI in locations without reliable connectivity
- Educational projects and demonstrations

Many successful edge AI products started as Pi prototypes.

### It's Just Fun

Let's be honest: running a ChatGPT-like model on a tiny computer is cool. There's something magical about having a conversation with AI that's running entirely on hardware you can hold in your hand.

## Raspberry Pi Hardware for AI

Not all Pi models are equal for AI workloads. Here's what you need to know:

### Raspberry Pi 5 (Recommended)

The Pi 5 is a significant upgrade for AI:

- **CPU:** Quad-core Arm Cortex-A76 @ 2.4GHz (2-3x faster than Pi 4)
- **RAM:** 4GB or 8GB options (8GB strongly recommended for LLMs)
- **GPU:** VideoCore VII (supports Vulkan 1.2)
- **PCIe:** External PCIe support via FFC connector (enables AI accelerators)
- **I/O:** USB 3.0, Gigabit Ethernet, improved camera/display interfaces

For AI work, **always get the 8GB model**. The extra RAM is essential for loading larger models. The price difference is minimal compared to the capability boost.

### Essential Accessories

Beyond the Pi itself, you'll need:

- **Power Supply:** Official USB-C 27W adapter (5V, 5A). Don't skimp here—AI workloads draw significant power
- **Cooling:** Active cooling is essential. The Pi 5 runs hot under AI loads. Get a case with a built-in fan or a quality heatsink with fan
- **Storage:** Fast microSD or USB SSD. NVMe via HAT is even better. Models load faster from SSDs
- **RAM:** As mentioned, 8GB is the minimum for LLM work

### Optional AI Accelerators

For serious AI work, consider adding dedicated AI hardware:

**Raspberry Pi AI Kit (Hailo-8L):**
- 13 TOPS of AI acceleration
- Connects via PCIe to Pi 5
- Optimized for computer vision and neural network inference
- ~$70 USD

**Google Coral USB Accelerator:**
- Edge TPU providing 4 TOPS
- USB 3.0 connection (works with Pi 4 and 5)
- Excellent TensorFlow Lite support
- ~$60 USD

**Intel Neural Compute Stick 2:**
- More capable vision processor
- USB 3.0 connection
- Good for OpenVINO models
- ~$70 USD

For getting started, the Pi 5 alone is sufficient. Add accelerators once you understand your workload needs.

## Setting Up Your Pi for AI

Let's get your Pi ready for AI projects:

### Operating System

Start with the latest **Raspberry Pi OS (64-bit)**. The 64-bit version is essential for running most modern AI frameworks.

```bash
# After first boot, update everything
sudo apt update
sudo apt full-upgrade -y
sudo reboot
```

### Python Environment

Most AI tools use Python. Set up a clean environment:

```bash
# Install Python essentials
sudo apt install python3-pip python3-venv -y

# Create a virtual environment for AI projects
python3 -m venv ~/ai-env
source ~/ai-env/bin/activate

# Upgrade pip
pip install --upgrade pip
```

### Essential Libraries

Install the foundations for AI development:

```bash
# NumPy and basic ML libraries
pip install numpy scipy

# For computer vision
pip install opencv-python-headless

# For deep learning
pip install tflite-runtime  # Lightweight TensorFlow for inference
```

### Swap Space

For running LLMs, increase swap space to supplement RAM:

```bash
# Edit swap configuration
sudo nano /etc/dphys-swapfile

# Change CONF_SWAPSIZE to 4096 (4GB)
# Save and exit

# Apply changes
sudo systemctl restart dphys-swapfile
```

This gives you more headroom for large models, though disk-based swap is slow compared to RAM.

## Running LLMs with Ollama

The easiest way to run large language models on Raspberry Pi is [Ollama](https://ollama.ai/)—a tool that makes running LLMs locally almost trivial.

### Installing Ollama

```bash
# One-line install
curl -fsSL https://ollama.com/install.sh | sh

# Verify installation
ollama --version
```

Ollama handles model downloading, quantization, and inference. You don't need to worry about most technical details.

### Choosing Models for Pi

Not every model runs well on limited hardware. Here's what works on an 8GB Pi 5:

**Recommended models:**

| Model | Parameters | RAM Usage | Speed | Use Case |
|-------|------------|-----------|-------|----------|
| Phi-3 Mini | 3.8B | ~3GB | Fast | General assistant |
| Qwen2 0.5B | 0.5B | ~500MB | Very fast | Simple tasks |
| Qwen2 1.5B | 1.5B | ~1.5GB | Fast | Balanced |
| TinyLlama 1.1B | 1.1B | ~800MB | Very fast | Chat, basic tasks |
| Gemma 2B | 2B | ~1.8GB | Fast | General purpose |

**Models that work but are slower:**

| Model | Parameters | RAM Usage | Speed |
|-------|------------|-----------|-------|
| Llama 3.2 3B | 3B | ~3GB | Moderate |
| Mistral 7B Q4 | 7B (quantized) | ~5GB | Slow |

### Running Your First Model

```bash
# Download and run Phi-3 Mini
ollama run phi3

# You're now chatting with an LLM on your Pi!
# Type your messages and press Enter
```

The first run downloads the model (a few GB), so be patient. Subsequent runs start quickly.

### Example Conversation

```
>>> What's the capital of France?
The capital of France is Paris. It's the largest city in France 
and serves as the country's political, economic, and cultural center.

>>> Write a haiku about Raspberry Pi
Silicon wonder
Small board, endless potential
Code flows like spring streams
```

Response times are 2-5 seconds for small models—not instant, but perfectly usable for personal projects.

### Running Ollama as a Service

To have Ollama always available:

```bash
# The installer typically sets this up automatically
# Check status:
sudo systemctl status ollama

# If not running:
sudo systemctl enable ollama
sudo systemctl start ollama
```

Now you can query it from other applications on your network.

### Using the API

Ollama exposes a REST API you can use from any programming language:

```python
import requests

response = requests.post('http://localhost:11434/api/generate', json={
    'model': 'phi3',
    'prompt': 'Explain what a Raspberry Pi is in one sentence.',
    'stream': False
})

print(response.json()['response'])
```

This opens up possibilities for integrating local LLMs into your own applications.

## Computer Vision Projects

Raspberry Pi excels at computer vision, especially with a camera module attached.

### Hardware Setup

**Camera options:**

- **Pi Camera Module 3:** 12MP, autofocus, native support, ~$25
- **Pi Camera 3 NoIR:** Same but without IR filter (for night vision)
- **USB webcams:** Work fine, more variety

Connect the camera and enable it:

```bash
# Should work automatically on Pi 5
# Test with:
libcamera-hello --timeout 0
```

### Basic Object Detection

Using TensorFlow Lite with a pre-trained model:

```python
import cv2
import numpy as np
from tflite_runtime.interpreter import Interpreter

# Load a pre-trained MobileNet SSD model
interpreter = Interpreter(model_path="detect.tflite")
interpreter.allocate_tensors()

# Get input and output details
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Start camera
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    # Preprocess frame
    input_frame = cv2.resize(frame, (300, 300))
    input_frame = np.expand_dims(input_frame, axis=0)
    
    # Run inference
    interpreter.set_tensor(input_details[0]['index'], input_frame)
    interpreter.invoke()
    
    # Get results
    boxes = interpreter.get_tensor(output_details[0]['index'])
    classes = interpreter.get_tensor(output_details[1]['index'])
    scores = interpreter.get_tensor(output_details[2]['index'])
    
    # Draw detections (simplified)
    for i in range(len(scores[0])):
        if scores[0][i] > 0.5:
            # Draw bounding box
            # ... (box drawing code)
            pass
    
    cv2.imshow('Detection', frame)
    if cv2.waitKey(1) == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

With the Hailo-8L accelerator, you can achieve 30+ FPS real-time detection. Without it, expect 2-5 FPS on Pi 5 CPU alone.

### Face Recognition

Basic face detection is straightforward:

```python
import cv2

# Load pre-trained face detector
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
)

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)
    
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
    
    cv2.imshow('Faces', frame)
    if cv2.waitKey(1) == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

For more sophisticated face recognition (identifying who someone is), use the `face_recognition` library, though it's more computationally demanding.

### Pose Estimation

Detect human body poses using MediaPipe:

```python
import cv2
import mediapipe as mp

mp_pose = mp.solutions.pose
pose = mp_pose.Pose()
mp_draw = mp.solutions.drawing_utils

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    
    results = pose.process(rgb)
    
    if results.pose_landmarks:
        mp_draw.draw_landmarks(
            frame, 
            results.pose_landmarks,
            mp_pose.POSE_CONNECTIONS
        )
    
    cv2.imshow('Pose', frame)
    if cv2.waitKey(1) == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

This runs at about 5-10 FPS on Pi 5—sufficient for many applications.

## AI Accelerators in Detail

For better performance, adding an AI accelerator is worth considering.

### Raspberry Pi AI Kit (Hailo-8L)

The official AI acceleration option:

**Installation:**
```bash
# Install Hailo utilities
sudo apt install hailo-all

# Reboot
sudo reboot

# Verify
hailortcli fw-control identify
```

**Performance:**
- 13 TOPS (tera operations per second)
- Runs many YOLOv8 models at 30+ FPS
- Significant power savings compared to CPU inference

**Best for:** Real-time computer vision, video analytics, robotics

### Google Coral USB

Popular and well-supported:

**Installation:**
```bash
# Add Coral package repository
echo "deb https://packages.cloud.google.com/apt coral-edgetpu-stable main" | \
  sudo tee /etc/apt/sources.list.d/coral-edgetpu.list

curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | \
  sudo apt-key add -

sudo apt update
sudo apt install libedgetpu1-std

# Install Python library
pip install pycoral
```

**Best for:** TensorFlow Lite models, image classification, object detection

### When to Use What

| Use Case | Recommended |
|----------|-------------|
| LLM chat | Pi 5 alone (Ollama) |
| Real-time video AI | Hailo-8L or Coral |
| Basic image classification | Pi 5 CPU (TFLite) |
| Face detection | Pi 5 CPU (fast enough) |
| YOLOv8 object detection | Hailo-8L |
| Voice processing | Pi 5 alone |

## Practical Project Ideas

Some inspiration for what you can build:

### Local Voice Assistant

Build a privacy-focused assistant that runs entirely offline:

- **Wake word detection:** Use a small model like Porcupine or OpenWakeWord
- **Speech-to-text:** Whisper.cpp runs on Pi with acceptable speed
- **LLM response:** Ollama with Phi-3 or similar
- **Text-to-speech:** eSpeak or Piper TTS

Result: "Hey Pi, what's the weather like?" → processes locally, responds in 3-5 seconds

### Smart Security Camera

Edge AI for home security:

- **Person detection:** TensorFlow Lite model
- **Notification:** Alert only when people (not pets) are detected
- **Local storage:** Record clips to USB drive
- **No subscription:** Unlike Ring or Nest, no monthly fees

### Plant Monitor

AI-powered plant care:

- **Camera module** watching your plants
- **Disease detection:** Train or use a plant disease model
- **Growth tracking:** Time-lapse with change detection
- **Watering alerts:** Combine with moisture sensors

### AI-Powered Doorbell

Smart doorbell without cloud:

- **Camera and speaker**
- **Face recognition:** Know who's at the door
- **Local LLM:** "Someone's at the door" → can even describe them
- **Optional:** Two-way audio via speaker/mic

## Performance Tips

Get the most from your Pi's AI capability:

### Thermal Management

AI workloads generate heat. Keep your Pi cool:

- Use active cooling (fan) for sustained workloads
- Monitor temperature: `vcgencmd measure_temp`
- If throttling occurs (>80°C), improve cooling

### Model Optimization

Choose and configure models wisely:

- **Use quantized models:** Q4 or Q5 quantization reduces memory and speeds inference
- **Match model to task:** Don't use 7B parameters for simple classification
- **Batch when possible:** Process multiple inputs together

### Storage Speed

Faster storage helps:

- **NVMe via HAT:** Fastest option, ~400MB/s
- **USB 3.0 SSD:** Good option, ~300MB/s
- **Class 10 microSD:** Minimum acceptable, ~90MB/s

Model loading benefits most from fast storage.

### Memory Management

With limited RAM:

- Run one large model at a time
- Close unused applications
- Monitor with `htop` or `free -h`
- Use swap for occasional overflow, but don't rely on it

## Frequently Asked Questions

### Can I run ChatGPT on a Raspberry Pi?

**Not ChatGPT specifically** (it's OpenAI's cloud service), but you can run similar open-source LLMs locally. Models like Phi-3, TinyLlama, and Qwen2 provide conversational AI comparable to early GPT models. They're not as capable as GPT-5, but surprisingly useful.

### Which Raspberry Pi model should I buy for AI?

**Raspberry Pi 5 with 8GB RAM** is the only serious choice for LLM work. The 4GB model can run very small models but limits your options. Pi 4 works for computer vision but struggles with LLMs. Older Pis are generally too slow for meaningful AI.

### How fast is local AI compared to cloud APIs?

**Slower, but not unusably so.** Expect 2-5 seconds per response for small LLMs on Pi 5, versus sub-second from cloud APIs. Computer vision can hit real-time (30 FPS) with accelerators. For many personal projects, the speed is acceptable.

### Do I need the AI Kit accelerator?

**For LLMs, no.** Ollama runs on CPU and doesn't benefit from the Hailo accelerator. **For computer vision, maybe.** If you need real-time video processing (30 FPS), the accelerator helps significantly. For basic detection at a few FPS, CPU works fine.

### Can I fine-tune models on Raspberry Pi?

**Not practically.** Training and fine-tuning require much more compute than inference. Fine-tune on a desktop or cloud GPU, then deploy the resulting model to your Pi for inference.

## Conclusion

Running AI on Raspberry Pi is more practical than ever in 2026. The Pi 5's improved performance, combined with tools like Ollama and efficient small models, makes local AI accessible for hobbyists, educators, and developers alike.

The sweet spot is an 8GB Pi 5 running quantized 1-3B parameter models. This setup handles conversational AI, basic vision tasks, and voice processing—all offline and private. Add an AI accelerator if you need real-time video processing.

The Pi won't replace cloud AI for heavy workloads, but it's not trying to. It excels at:
- Privacy-focused personal assistants
- Edge AI prototyping
- Educational exploration
- Offline operation
- Cost-effective deployment

If you've been curious about [edge AI](/blog/edge-ai-explained) but haven't tried building anything, the Raspberry Pi is the perfect starting point. The total cost is under $150 for a complete AI-capable system, and the learning experience is invaluable.

**What will you build?** Start with Ollama and a simple chat model, then expand from there. The Pi community has extensive resources, and new AI tools are constantly improving support for ARM-based hardware.
