import os
from concurrent.futures import ThreadPoolExecutor
from PIL import Image
import numpy as np
import pandas as pd


def load_images(files, folder):
    """
    Load images from the specified folder.

    Args:
        files (list): List of file names to load.
        folder (str): Path to the folder containing the images.

    Returns:
        results(list): A list of dictionaries, each containing image data, age, and gender.
    """
    results = []

    for file in files:
        split = file.split('_')
        age = int(split[0])
        gender = int(split[1])

        # Load the image
        img_path = os.path.join(folder, file)
        img = Image.open(img_path)
        img_array = np.array(img)

        results.append({'Images': img_array, 'Ages': age, 'Genders': gender})

    return results


def load_data_parallel(folder, batch_size=100):
    """
    Load data in parallel using ThreadPoolExecutor.

    Args:
        folder (str): Path to the folder containing the images.
        batch_size (int, optional): Number of files to process in each batch.

    Returns:
        pandas.DataFrame: A DataFrame containing loaded image data, age, and gender.
    """
    files = os.listdir(folder)
    with ThreadPoolExecutor() as executor:
        results = []

        for i in range(0, len(files), batch_size):
            batch_files = files[i:i+batch_size]
            batch_results = list(executor.map(lambda f: load_images(f, folder), [batch_files]))
            results.extend(batch_results)
    # Flatten the list of lists into a single list
    return pd.DataFrame([item for sublist in results for item in sublist])
