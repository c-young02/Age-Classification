import base64
import io
import os

from PIL import Image
import cv2
import numpy as np
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model

# Load environment variables
load_dotenv()

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app, origins=[os.getenv('FRONTEND_ORIGIN'), 'http://localhost:3000'])

# Load pre-trained model
model = load_model('models/resnet50_model.h5')

# Load test data
x_test = np.load('data/x_test.npy')

# Load Haar cascade for face detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')


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
        prediction = np.argmax(prediction, axis=1)
        return jsonify({'prediction': int(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def crop_face(image):
    # Convert image to OpenCV format and detect faces
    img_cv = np.array(image)
    img_cv = cv2.cvtColor(img_cv, cv2.COLOR_RGB2BGR)

    faces = face_cascade.detectMultiScale(img_cv, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    # Crop first detected face from image
    if len(faces) > 0:
        (x, y, w, h) = faces[0]
        img_cv = img_cv[y:y+h, x:x+w]

    # Convert image back to PIL format and save for testing purposes
    img = Image.fromarray(cv2.cvtColor(img_cv, cv2.COLOR_BGR2RGB))
    img.save('cropped_face.png')

    return img


if __name__ == '__main__':
    # Start Flask server
    app.run(host='0.0.0.0', port=8000)
