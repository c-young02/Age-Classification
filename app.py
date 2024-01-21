from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import numpy as np
import base64
import io
from PIL import Image

app = Flask(__name__)
CORS(app)  # Enables CORS for all domains on all routes

# Load the model
model = load_model('models/resnet50_model.h5')

# Load the split data
x_test = np.load('x_test.npy')


@app.route('/')
def home():
    return "Welcome to the backend"


@app.route('/get-validation-images/<int:start>/<int:end>', methods=['GET'])
def get_validation_images(start, end):
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
    data = request.json
    # Preprocess the data in the way your model expects
    data = np.array(data).reshape(1, -1)
    prediction = model.predict(data)
    prediction = np.argmax(prediction, axis=1)
    return jsonify({'prediction': int(prediction)})


if __name__ == '__main__':
    app.run(debug=True, port=8000)
