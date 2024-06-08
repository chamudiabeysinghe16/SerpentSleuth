from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
import numpy as np
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Set the upload folder
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load your model
model = load_model('/Users/chamudi/Desktop/changed data/Project_SerpentSleuth/h5/ensemble/ensemble_version1_1.h5')

# Image preprocessing function to match your Jupyter notebook
def preprocess_image(img_path):
    img_height, img_width = 224, 224
    img = image.load_img(img_path, target_size=(img_height, img_width))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.route('/')
def home():
    return "Flask is running!"

@app.route('/classify', methods=['POST'])
def classify_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    file = request.files['image']
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    img_array = preprocess_image(filepath)
    prediction = model.predict(img_array)
    predicted_class_idx = np.argmax(prediction, axis=1)[0]

    # Assuming 0 is non-venomous and 1 is venomous
    predicted_class = "Venomous" if predicted_class_idx == 1 else "Non-Venomous"

    return jsonify({'prediction': predicted_class})

if __name__ == '__main__':
    app.run(debug=True)
