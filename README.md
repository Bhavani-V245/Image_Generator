# Image Generator

**A sleek, Python-powered image generation tool** that leverages modern diffusion models to create stunning visuals from text prompts. This repository provides a simple CLI and a Flask web interface for quick experimentation.

---

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Web Interface](#web-interface)
- [Configuration](#configuration)
- [License](#license)
- [Contributing](#contributing)

---

## Features
- **Dynamic Prompt-to-Image** generation using stable diffusion models.
- **Command‑line interface** for rapid prototyping.
- **Flask web UI** with a glass‑morphic design for an elegant user experience.
- **GPU‑accelerated** (optional) for fast rendering.
- **Extensible** – plug‑in new models by updating `config.yaml`.

---

## Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/Image_Generator.git
cd Image_Generator

# Create a virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

> **Note**: For optimal performance, install the CUDA‑enabled PyTorch version matching your GPU.

---

## Usage
### CLI
```bash
python image_gen.py "A futuristic cityscape at sunset" --steps 50 --output outputs/city.png
```
- `--steps` – Number of diffusion steps (default 30).
- `--output` – Destination path for the generated PNG/JPEG.

### Python API
```python
from image_gen import generate_image

img = generate_image(
    prompt="A serene mountain lake with pastel colors",
    steps=40,
)
img.save("lake.png")
```

---

## Web Interface
Start the Flask app:
```bash
python app.py
```
Then open `http://127.0.0.1:5000` in your browser. The UI features:
- A glass‑morphic input card.
- Real‑time preview of the generated image.
- Download button for the final artwork.

---

## Configuration
Edit `config.yaml` to change:
- Model checkpoint path.
- Default inference parameters (guidance scale, seed, etc.).
- GPU vs CPU execution mode.

---

## License
This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feat/awesome-feature`).
3. Write tests and ensure they pass (`pytest`).
4. Submit a pull request with a clear description of your changes.

---

*Made with ❤️ by the Image Generator team.*
