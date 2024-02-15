import logging
from load_data import load_data_parallel
from preprocessing import create_age_classes, undersample_age, split_data
from plots import plot_age_distribution, plot_images_grid, plot_model_accuracy, plot_confusion_matrix, print_misclassifications
from model import build_model, fine_tune_model
from train import train_model
from image_processing import create_datagen
import numpy as np
from tensorflow.keras.models import save_model
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau

logging.basicConfig(level=logging.INFO)


def load_and_preprocess_data():
    logging.info("Loading and preprocessing data...")
    # Load data in parallel
    image_folder = 'UTKFace/UTKFace/'
    df = load_data_parallel(image_folder)

    # Randomize the DataFrame
    df = df.sample(frac=1, random_state=42).reset_index(drop=True)

    # Plot age distribution
    # plot_age_distribution(df, 'Ages', 30, 'Age Histogram')

    # Create age classes and plot age class distribution
    df = create_age_classes(df)
    # plot_age_distribution(df, 'AgeClass', 5, 'Age Class Distribution')

    # Undersample age class and plot undersampled age class distribution
    df = undersample_age(df, [(3, 0.7), (4, 0.3)])
    # plot_age_distribution(df, 'AgeClass', 5, 'Undersampled Age Class Distribution')

    # Plot a grid of images displaying age and age class
    # plot_images_grid(df)

    # Split data into training and testing sets (80/20 split)
    x_train, x_test, y_train, y_test = split_data(df, test_size=0.2)

    # Save the split data
    np.save('data/x_test.npy', x_test)

    # Print the sizes of the training and testing sets
    logging.info(f"Training Set Size: {len(x_train)} samples")
    logging.info(f"Testing Set Size: {len(x_test)} samples")

    return x_train, x_test, y_train, y_test


def train_and_evaluate_model(x_train, x_test, y_train, y_test):
    logging.info("Training and evaluating model...")
    # Build and compile the model
    model = build_model(input_shape=(200, 200, 3), num_classes=6, learning_rate=0.001)

    # Define callbacks
    early_stopping = EarlyStopping(monitor='val_loss', patience=10)
    lr_schedule = ReduceLROnPlateau(monitor='val_loss', factor=0.2, patience=5)

    # Create an ImageDataGenerator object
    datagen = create_datagen()

    # Compute quantities required for featurewise normalization
    datagen.fit(x_train)

    # Train the model with callbacks and data augmentation
    trained_model, history = train_model(model, datagen.flow(x_train, y_train, batch_size=32), None, x_test, y_test,
                                         epochs=100, batch_size=32,
                                         callbacks=[early_stopping, lr_schedule])
    logging.info(f"Training complete. {len(history.history['accuracy'])} epoch trained.")

    # Fine-tune the model
    model = fine_tune_model(model, learning_rate=0.001)

    # Train the model again with fine-tuning
    trained_model, history = train_model(model, datagen.flow(x_train, y_train, batch_size=32), None, x_test, y_test,
                                         epochs=10, batch_size=32,
                                         callbacks=[early_stopping, lr_schedule])
    logging.info(f"Fine-tuning complete. {len(history.history['accuracy'])} epoch trained.")

    # Evaluate the model
    accuracy = trained_model.evaluate(x_test, y_test)[1]
    logging.info(f"Validation Accuracy: {accuracy * 100:.2f}%")

    return trained_model, history


def analyse_results(trained_model, history, x_test, y_test):
    logging.info("Analyzing results...")
    # Get model predictions for the test set
    y_pred_prob = trained_model.predict(x_test)
    y_pred_classes = np.argmax(y_pred_prob, axis=1)

    # Plot accuracy over epochs
    plot_model_accuracy(history)

    class_labels = ['0-2', '3-17', '18-24', '25-39', '40-59', '60+']

    # Plot the confusion matrix
    plot_confusion_matrix(y_test, y_pred_classes, class_labels)

    # Print misclassifications
    print_misclassifications(y_test, y_pred_classes, class_labels)
    save_model(trained_model, 'models/resnet50_model.h5')


def main():
    try:
        x_train, x_test, y_train, y_test = load_and_preprocess_data()
        trained_model, history = train_and_evaluate_model(x_train, x_test, y_train, y_test)
        analyse_results(trained_model, history, x_test, y_test)
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        raise


if __name__ == "__main__":
    main()
