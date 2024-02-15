from PIL import Image
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import cv2
import numpy as np


face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')


def crop_face(image):
    """
    Crop the first detected face from the given image.

    This function converts the image to OpenCV format, detects faces in the image using a Haar cascade,
    crops the first detected face from the image, and then converts the image back to PIL format.

    Args:
        image (PIL.Image): The image from which to crop the face.

    Returns:
        PIL.Image: The cropped face image. If no face is detected in the image, the original image is returned.
    """
    # Convert image to OpenCV format and detect faces
    img_cv = np.array(image)
    img_cv = cv2.cvtColor(img_cv, cv2.COLOR_RGB2BGR)

    faces = face_cascade.detectMultiScale(img_cv, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    # Crop first detected face from image
    if len(faces) > 0:
        (x, y, w, h) = faces[0]
        img_cv = img_cv[y:y+h, x:x+w]

    # Convert image back to PIL format
    img = Image.fromarray(cv2.cvtColor(img_cv, cv2.COLOR_BGR2RGB))

    return img


def create_datagen(rotation_range=20, width_shift_range=0.2, height_shift_range=0.2, horizontal_flip=True):
    """
    Create an ImageDataGenerator object with the given parameters.

    Args:
        rotation_range (int, optional): Degree range for random rotations. Defaults to 20.
        width_shift_range (float, optional): Range for random horizontal shifts. Defaults to 0.2.
        height_shift_range (float, optional): Range for random vertical shifts. Defaults to 0.2.
        horizontal_flip (bool, optional): Whether to randomly flip inputs horizontally. Defaults to True.

    Returns:
        ImageDataGenerator: The created ImageDataGenerator object.
    """
    datagen = ImageDataGenerator(
        rotation_range=rotation_range,
        width_shift_range=width_shift_range,
        height_shift_range=height_shift_range,
        horizontal_flip=horizontal_flip,
    )
    return datagen
