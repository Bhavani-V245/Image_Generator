import os
from pathlib import Path
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
from huggingface_hub import InferenceClient
from PIL import Image
import uuid
import requests

# Load env variables
load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")
if not HF_TOKEN:
    raise RuntimeError("HF_TOKEN not set in .env")

# Serve React build from frontend/dist
FRONTEND_DIST = Path(__file__).parent / "frontend" / "dist"

app = Flask(__name__,
            static_folder=str(FRONTEND_DIST / "assets"),
            static_url_path="/assets")
CORS(app)

# Directory for generated images
GENERATED_DIR = Path(__file__).parent / "static" / "generated"
GENERATED_DIR.mkdir(parents=True, exist_ok=True)

def _save_image(pil_img):
    """Save a PIL.Image to the generated folder and return its URL."""
    filename = f"{uuid.uuid4().hex}.png"
    filepath = GENERATED_DIR / filename
    pil_img.save(filepath, format="PNG")
    return f"/static/generated/{filename}"

# ── Serve React static assets ─────────────────────────────────────────────────

@app.route("/static/generated/<path:filename>")
def serve_generated(filename):
    return send_from_directory(GENERATED_DIR, filename)

@app.route("/assets/<path:filename>")
def serve_assets(filename):
    return send_from_directory(FRONTEND_DIST / "assets", filename)

@app.route("/vite.svg")
def vite_svg():
    return send_from_directory(FRONTEND_DIST, "vite.svg")

# ── API Routes ─────────────────────────────────────────────────────────────────

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json(silent=True) or {}
    prompt = data.get("prompt", "").strip()
    if not prompt:
        return jsonify({"error": "Prompt cannot be empty."}), 400
    try:
        text_client = InferenceClient(api_key=HF_TOKEN, provider="hf-inference")
        image = text_client.text_to_image(
            prompt,
            model="black-forest-labs/FLUX.1-schnell",
        )
        image_url = _save_image(image)
        return jsonify({"image_url": image_url})
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"Image generation failed: {e}"}), 500

@app.route("/voice_generate", methods=["POST"])
def voice_generate():
    if "audio" not in request.files:
        return jsonify({"error": "Audio file missing."}), 400
    audio_file = request.files["audio"]
    audio_bytes = audio_file.read()
    try:
        headers = {
            "Authorization": f"Bearer {HF_TOKEN}",
            "Content-Type": "audio/webm"
        }
        API_URL = "https://router.huggingface.co/hf-inference/models/openai/whisper-large-v3-turbo"
        response = requests.post(API_URL, headers=headers, data=audio_bytes)

        if response.status_code != 200:
            return jsonify({"error": f"Transcription API error: {response.text}"}), 400

        transcription = response.json()
        if isinstance(transcription, dict):
            prompt = transcription.get("text", "").strip()
        else:
            prompt = str(transcription).strip()

        if not prompt:
            return jsonify({"error": "Transcription resulted in empty prompt."}), 400

        text_client = InferenceClient(api_key=HF_TOKEN, provider="hf-inference")
        image = text_client.text_to_image(
            prompt,
            model="black-forest-labs/FLUX.1-schnell",
        )
        image_url = _save_image(image)
        return jsonify({"image_url": image_url, "prompt": prompt})
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"Voice generation failed: {e}"}), 500

@app.route("/gallery", methods=["GET"])
def gallery():
    files = sorted(GENERATED_DIR.iterdir(), reverse=True)[:50]
    images = [f.name for f in files if f.is_file()]
    return jsonify({"images": images})

# ── Serve React App (catch-all) ────────────────────────────────────────────────

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    index_file = FRONTEND_DIST / "index.html"
    if not index_file.exists():
        return "React build not found. Run 'npm run build' inside the frontend folder.", 404
    return send_from_directory(FRONTEND_DIST, "index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
