import os
from concurrent.futures import ThreadPoolExecutor

import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from PIL import Image
from sklearn.model_selection import train_test_split


def load_images(file):
    split = file.split('_')
    age = int(split[0])
    gender = int(split[1])
    with Image.open(os.path.join(image_folder, file)) as img:
        return {'Images': img.copy(), 'Ages': age, 'Genders': gender}


def load_data_parallel(folder):
    files = os.listdir(folder)
    with ThreadPoolExecutor() as executor:
        results = list(executor.map(load_images, files))
    return pd.DataFrame(results)


def plot_age_distribution(data, column, class_labels, title):
    plt.figure(figsize=(10, 6))
    sns.histplot(data[column], bins=np.arange(len(class_labels)+1)-0.5, kde=False, color='skyblue')
    plt.title(f'{title} ')
    plt.xlabel(f'{column}')
    plt.ylabel('Count')
    plt.show()


def undersample_age(dataframe, label, frac):
    undersample = dataframe[dataframe['AgeClass'] == label].sample(frac=frac, random_state=42).index
    return dataframe.drop(undersample)


# Load data in parallel
image_folder = 'UTKFace/UTKFace/'
df = load_data_parallel(image_folder)

# Randomize the DataFrame
df = df.sample(frac=1, random_state=42).reset_index(drop=True)

# Plot age distribution
plt.figure(figsize=(10, 6))
sns.histplot(df['Ages'], bins=30, kde=True, color='skyblue')
plt.title('Age Histogram')
plt.xlabel('Age')
plt.ylabel('Density')
plt.show()

# Create age classes
bins = [0, 2, 10, 17, 24, 40, 60, np.inf]
labels = ['0-2', '3-10', '11-17', '18-24', '25-40', '40-60', '60+']
df['AgeClass'] = pd.cut(df['Ages'], bins=bins, labels=labels)

# Plot age class distribution
plot_age_distribution(df, 'AgeClass', labels, 'Age Class Distribution')

# Undersample age class
df = undersample_age(df, '25-40', 0.7)
df = undersample_age(df, '40-60', 0.3)

# Plot undersampled age class distribution
plot_age_distribution(df, 'AgeClass', labels, 'Undersampled Age Class Distribution')

# Plot a grid of images displaying age and age class
fig, axes = plt.subplots(nrows=5, ncols=5, figsize=(15, 15))
for index, ax in zip(df.index, axes.flatten()):
    img_array = np.array(df['Images'][index])
    ax.imshow(img_array)
    ax.set_title(f"Age: {df['Ages'][index]}\nClass: {df['AgeClass'][index]}", fontsize=10)
    ax.axis('off')

plt.tight_layout()
plt.show()

# Split data into training and testing sets (80/20 split)
df_train, df_test = train_test_split(df, test_size=0.2, stratify=df['AgeClass'], random_state=42)

# Convert image data to NumPy array and reshape
x_train = np.array(df_train['Images'].values).reshape(len(df_train), -1)
x_test = np.array(df_test['Images'].values).reshape(len(df_test), -1)

# Directly use 'AgeClass' column as labels
y_train = df_train['AgeClass']
y_test = df_test['AgeClass']

# Plot the sizes of the training and testing sets
plt.figure(figsize=(8, 5))
plt.bar(['Training', 'Testing'], [len(x_train), len(x_test)], color=['blue', 'orange'])
plt.title('Training vs. Testing Set Size')
plt.xlabel('Dataset')
plt.ylabel('Number of Samples')
plt.show()
