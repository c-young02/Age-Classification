from PIL import Image
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
