import base64
import io

import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from config import Config
from image_processing import crop_face
from PIL import Image

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app, origins=[Config.FRONTEND_ORIGIN, 'http://localhost:3000'])

# Load pre-trained model
model = load_model(Config.MODEL_PATH)

# Load test data
x_test = np.load(Config.TEST_DATA_PATH)


@app.route('/')
def home():
    return "Welcome to the backend"


@app.route('/get-validation-images/<int:start>/<int:end>', methods=['GET'])
def get_validation_images(start, end):
    # Convert images to base64 for transmission
    images_base64 = []
    for img in x_test[start:end]:
        img_pil = Image.fromarray(img.astype('uint8'))

        buffer = io.BytesIO()
        img_pil.save(buffer, format='PNG')
        img_base64 = base64.b64encode(buffer.getvalue()).decode()

        images_base64.append(img_base64)

    return jsonify({'images': images_base64})


@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Decode image from base64
        data = request.json
        base64_image = data['image']
        img_data = base64.b64decode(base64_image)
        img = Image.open(io.BytesIO(img_data))
        img = img.convert('RGB')

        # Crop face from image
        img = crop_face(img)
        # Resize image
        img = img.resize((200, 200))
        img_array = np.array(img)
        img_array = img_array.reshape(1, 200, 200, 3)
        # Make age classification
        prediction = model.predict(img_array)
        predicted_class = np.argmax(prediction[0], axis=0)
        confidence = prediction[0][predicted_class]
        return jsonify({'prediction': int(predicted_class), 'confidence': float(confidence)})
    except KeyError:
        return jsonify({'error': 'Invalid request. Please provide an image.'}), 400
    except Exception as e:
        return jsonify({'error': 'An error occurred while processing the image.'}), 500


if __name__ == '__main__':
    # Start Flask server
    app.run(host='0.0.0.0', port=8000)
