# Importing necessary modules and functions
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import numpy as np
import base64
import io
from PIL import Image

# Creating a Flask app and enabling CORS
app = Flask(__name__)
CORS(app, origins=['http://localhost:3000', 'http://192.168.1.212:3000'])

# Loading the model
model = load_model('models/resnet50_model.h5')

# Loading the split data
x_test = np.load('data/x_test.npy')


# Home route
@app.route('/')
def home():
    return "Welcome to the backend"


# Route to get validation images
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


# Route to predict the class of an image
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    # Extracting the base64 image string from the data
    base64_image = data['image']
    # Decoding the base64 string
    img_data = base64.b64decode(base64_image)
    # Converting the raw image data to a PIL Image
    img = Image.open(io.BytesIO(img_data))
    # Resizing the image to the size expected by the model
    img = img.resize((200, 200))
    # Converting the PIL Image to a NumPy array
    img_array = np.array(img)
    # Reshaping the NumPy array to the shape expected by the model
    img_array = img_array.reshape(1, 200, 200, 3)
    # Predicting the class of the image
    prediction = model.predict(img_array)
    prediction = np.argmax(prediction, axis=1)
    return jsonify({'prediction': int(prediction)})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)