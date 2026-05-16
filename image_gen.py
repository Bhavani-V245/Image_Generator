import os
# pyrefly: ignore [missing-import]
from huggingface_hub import InferenceClient

import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

load_dotenv()

client = InferenceClient(
    provider="auto",
    api_key=os.getenv("HF_TOKEN"),
)

# Generate image
image = client.text_to_image(
    "Radha and Krishna holding hands in a beautiful garden with flowers",
    model="stabilityai/stable-diffusion-xl-base-1.0",
)

# Save image
image.save("Radha and Krishna.png")

print("Image saved successfully!")