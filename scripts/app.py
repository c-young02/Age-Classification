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
    # Home route, returns a welcome message
    return "Welcome to the backend"


@app.route('/get-validation-images/<int:start>/<int:end>', methods=['GET'])
def get_validation_images(start, end):
    # Route to get validation images, converts images to base64 for transmission
    images_base64 = []
    for img in x_test[start:end]:
        img_pil = Image.fromarray(img.astype('uint8'))

        buffer = io.BytesIO()
        img_pil.save(buffer, format='PNG')
        img_base64 = base64.b64encode(buffer.getvalue()).decode()

        images_base64.append(img_base64)

    return jsonify({'images': images_base64})


def decode_image(base64_image):
    # Function to decode base64 image data to bytes
    return base64.b64decode(base64_image)


def validate_image_size(img_data):
    # Function to validate if the image size is 5MB or under
    if len(img_data) > 5 * 1024 * 1024:  # 5MB
        raise ValueError('Image size should be 5MB or under.')


def process_image(img_data):
    # Function to process the image data (convert to RGB, crop face, resize, reshape)
    img = Image.open(io.BytesIO(img_data))
    img = img.convert('RGB')
    img = crop_face(img)
    img = img.resize((200, 200))
    img_array = np.array(img)
    return img_array.reshape(1, 200, 200, 3)


def make_prediction(img_array):
    # Function to make age classification prediction
    prediction = model.predict(img_array)
    predicted_class = np.argmax(prediction[0], axis=0)
    confidence = prediction[0][predicted_class]
    return predicted_class, confidence


@app.route('/predict', methods=['POST'])
def predict():
    # Route to make prediction on the provided image
    try:
        data = request.json
        base64_image = data['image']
        img_data = decode_image(base64_image)
        validate_image_size(img_data)
        img_array = process_image(img_data)
        predicted_class, confidence = make_prediction(img_array)
        return jsonify({'prediction': int(predicted_class), 'confidence': float(confidence)})
    except KeyError:
        # Handle case when image is not provided in the request
        return jsonify({'error': 'Invalid request. Please provide an image.'}), 400
    except ValueError as e:
        # Handle case when image size is more than 5MB
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        # Handle any other exception that may occur during image processing
        return jsonify({'error': 'An error occurred while processing the image.'}), 500


if __name__ == '__main__':
    # Start Flask server
    app.run(host='0.0.0.0', port=8000)