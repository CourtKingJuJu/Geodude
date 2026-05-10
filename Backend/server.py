from flask import Flask, request
import base64
from PIL import Image
from io import BytesIO
import os
import time

app = Flask(__name__)

SAVE_DIR = "dataset"

os.makedirs(SAVE_DIR, exist_ok=True)

@app.route("/upload", methods=["POST"])
def upload():
    data = request.json["image"]
    
    image_data = data.split(",")[1]
    
    image_bytes = base64.b64decode(image_data)
    
    image = Image.open(BytesIO(image_bytes))
    
    filename = f"{SAVE_DIR}/img_{int(time.time()*1000)}.png"
    
    image.save(filename)
    
    return {"success": True}

app.run(port=5000)