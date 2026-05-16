import os
import json
from http.server import BaseHTTPRequestHandler
from huggingface_hub import InferenceClient
from PIL import Image
import uuid
import base64
import io

HF_TOKEN = os.environ.get("HF_TOKEN")

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length)
        data = json.loads(body or '{}')
        prompt = data.get("prompt", "").strip()

        if not prompt:
            self._respond(400, {"error": "Prompt cannot be empty."})
            return

        try:
            client = InferenceClient(api_key=HF_TOKEN, provider="hf-inference")
            image = client.text_to_image(prompt, model="black-forest-labs/FLUX.1-schnell")

            # Convert PIL image to base64
            buf = io.BytesIO()
            image.save(buf, format="PNG")
            img_b64 = base64.b64encode(buf.getvalue()).decode("utf-8")
            self._respond(200, {"image_b64": img_b64})
        except Exception as e:
            self._respond(500, {"error": str(e)})

    def _respond(self, status, data):
        body = json.dumps(data).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
