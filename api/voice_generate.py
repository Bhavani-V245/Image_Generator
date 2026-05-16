import os
import json
import requests as req
from http.server import BaseHTTPRequestHandler
from huggingface_hub import InferenceClient
from PIL import Image
import uuid
import base64
import io
import cgi

HF_TOKEN = os.environ.get("HF_TOKEN")

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_type = self.headers.get('Content-Type', '')
        content_length = int(self.headers.get('Content-Length', 0))

        # Parse multipart form data to get audio
        if 'multipart/form-data' in content_type:
            form = cgi.FieldStorage(
                fp=self.rfile,
                headers=self.headers,
                environ={
                    'REQUEST_METHOD': 'POST',
                    'CONTENT_TYPE': content_type,
                    'CONTENT_LENGTH': str(content_length),
                }
            )
            audio_item = form['audio']
            audio_bytes = audio_item.file.read()
        else:
            self._respond(400, {"error": "Audio file missing."})
            return

        try:
            # Transcribe
            headers = {
                "Authorization": f"Bearer {HF_TOKEN}",
                "Content-Type": "audio/webm"
            }
            res = req.post(
                "https://router.huggingface.co/hf-inference/models/openai/whisper-large-v3-turbo",
                headers=headers,
                data=audio_bytes
            )
            if res.status_code != 200:
                self._respond(400, {"error": f"Transcription failed: {res.text}"})
                return

            transcription = res.json()
            prompt = transcription.get("text", "").strip() if isinstance(transcription, dict) else str(transcription).strip()

            if not prompt:
                self._respond(400, {"error": "Empty transcription."})
                return

            # Generate image
            client = InferenceClient(api_key=HF_TOKEN, provider="hf-inference")
            image = client.text_to_image(prompt, model="black-forest-labs/FLUX.1-schnell")

            buf = io.BytesIO()
            image.save(buf, format="PNG")
            img_b64 = base64.b64encode(buf.getvalue()).decode("utf-8")
            self._respond(200, {"image_b64": img_b64, "prompt": prompt})
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
