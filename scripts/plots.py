import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix


def plot_age_distribution(data, column, class_labels, title):
    """
    Plot age distribution using a histogram.

    Args:
        data (pd.DataFrame): The DataFrame containing age-related data.
        column (str): The column to plot.
        class_labels (int): The number of bins or class labels for the histogram.
        title (str): The title of the plot.
    """
    plt.figure(figsize=(10, 6))
    sns.histplot(data[column], bins=class_labels, kde=False, color='skyblue')
    plt.title(f'{title} ')
    plt.xlabel(f'{column}')
    plt.ylabel('Count')
    plt.show()


def plot_images_grid(df, nrows=5, ncols=5, figsize=(15, 15)):
    """
    Plot a grid of images displaying age and age class.

    Args:
        df (pd.DataFrame): The DataFrame containing image data, ages, and age classes.
        nrows (int): The number of rows in the grid.
        ncols (int): The number of columns in the grid.
        figsize (int, int): The size of the entire figure.
    """
    # Plot a grid of images displaying age and age class
    fig, axes = plt.subplots(nrows=nrows, ncols=ncols, figsize=figsize)
    for index, ax in zip(df.index, axes.flatten()):
        img_array = np.array(df['Images'][index])
        ax.imshow(img_array)
        ax.set_title(f"Age: {df['Ages'][index]}\nClass: {df['AgeClass'][index]}")
        ax.axis('off')

    plt.tight_layout()
    plt.show()


def plot_model_accuracy(history):
    """
    Plot the training and validation accuracy over epochs.

    Args:
        history (tf.keras.callbacks.History): History object containing training metrics.
    """
    epochs = len(history.history['accuracy'])
    x_ticks = np.arange(1, epochs + 1)

    plt.plot(x_ticks, history.history['accuracy'], label='Training Accuracy')
    plt.plot(x_ticks, history.history['val_accuracy'], label='Validation Accuracy')
    plt.xlabel('Epoch')
    plt.xticks(x_ticks)
    plt.ylabel('Accuracy')
    plt.legend()
    plt.savefig('plots/accuracy_plot.png')
    plt.show()


def plot_confusion_matrix(y_true, y_pred, class_labels):
    """
    Plot the confusion matrix and the normalized confusion matrix.

    Args:
        y_true (np.ndarray): True labels.
        y_pred (np.ndarray): Predicted labels.
        class_labels (list): List of classes.
    """
    conf_matrix = confusion_matrix(y_true, y_pred)

    # Plot the original confusion matrix
    plt.figure(figsize=(8, 6))
    sns.heatmap(conf_matrix, annot=True, fmt='d', cmap='Blues', xticklabels=class_labels, yticklabels=class_labels)
    plt.title('Confusion Matrix')
    plt.xlabel('Predicted')
    plt.ylabel('True')
    plt.savefig('plots/confusion_matrix.png')
    plt.show()

    # Normalize the confusion matrix
    conf_matrix = conf_matrix.astype('float') / conf_matrix.sum(axis=1)[:, np.newaxis]
    conf_matrix = np.round(conf_matrix, 4)  # round to 2 decimal places

    # Plot the normalized confusion matrix
    plt.figure(figsize=(8, 6))
    sns.heatmap(conf_matrix, annot=True, fmt='.2%', cmap='Blues', xticklabels=class_labels, yticklabels=class_labels)
    plt.title('Normalized Confusion Matrix')
    plt.xlabel('Predicted')
    plt.ylabel('True')
    plt.savefig('plots/normalized_confusion_matrix.png')
    plt.show()


def print_misclassifications(y_true, y_pred, class_labels):
    """
    Print and return counts of misclassifications.

    Args:
        y_true (np.ndarray): True labels.
        y_pred (np.ndarray): Predicted labels.
        class_labels (list): List of labels for the classes to consider.

    Returns:
        dict: Dictionary with counts of misclassifications for each class.
    """
    conf_matrix = confusion_matrix(y_true, y_pred)

    # Indices for ages under 18 and over 25
    under_18_indices = [i for i, label in enumerate(class_labels) if label in ['0-2', '3-17']]
    over_25_indices = [i for i, label in enumerate(class_labels) if label in ['25-39', '40-59', '60+']]

    # Sum the elements of the confusion matrix that correspond to these indices
    misclassified_count = np.sum(conf_matrix[under_18_indices, :][:, over_25_indices])

    print(f'Number of people under 18 misclassified as over 25: {misclassified_count}')

    return misclassified_count
