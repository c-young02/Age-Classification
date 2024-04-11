import logging
from load_data import load_data_parallel
from preprocessing import create_age_classes, undersample_age, split_data
from plots import (
    plot_age_distribution,
    plot_images_grid,
    plot_model_accuracy,
    plot_confusion_matrix,
    print_misclassifications,
    plot_predicted_vs_actual,
)
from model import build_model, fine_tune_model
from train import train_model
from image_processing import create_datagen
import numpy as np
from tensorflow.keras.models import save_model, load_model
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau, ModelCheckpoint

logging.basicConfig(level=logging.INFO)


def load_and_preprocess_data():
    """Load and preprocess data."""
    logging.info("Loading and preprocessing data...")
    image_folder = "UTKFace/UTKFace/"
    df = load_data_parallel(image_folder)
    df = df.sample(frac=1, random_state=42).reset_index(drop=True)
    plot_age_distribution(df, "Ages", 30, "Age Histogram")
    df = create_age_classes(df)
    plot_age_distribution(df, "AgeClass", 5, "Age Class Distribution")
    df = undersample_age(df, [(3, 0.7), (4, 0.3)])
    plot_age_distribution(df, "AgeClass", 5, "Undersampled Age Class Distribution")
    plot_images_grid(df)
    x_train, x_val, x_test, y_train, y_val, y_test = split_data(
        df, test_size=0.1, validation_size=0.1
    )
    np.save("data/x_test.npy", x_test)
    logging.info(f"Training Set Size: {len(x_train)} samples")
    logging.info(f"Validation Set Size: {len(x_val)} samples")
    logging.info(f"Testing Set Size: {len(x_test)} samples")
    return x_train, x_val, x_test, y_train, y_val, y_test


def train_and_evaluate_model(x_train, x_val, x_test, y_train, y_val, y_test):
    """Train and evaluate model."""
    logging.info("Training and evaluating model...")
    model = build_model(input_shape=(200, 200, 3), num_classes=6, learning_rate=0.001)
    early_stopping = EarlyStopping(monitor="val_loss", patience=10)
    lr_schedule = ReduceLROnPlateau(monitor="val_loss", factor=0.2, patience=5)

    # Define the checkpoint
    checkpoint = ModelCheckpoint('models/best_model.h5', verbose=1, monitor='val_loss', save_best_only=True, mode='auto')

    datagen = create_datagen()
    datagen.fit(x_train)
    trained_model, history = train_model(
        model,
        datagen.flow(x_train, y_train, batch_size=32),
        datagen.flow(x_val, y_val, batch_size=32),
        x_test,
        y_test,
        epochs=100,
        batch_size=32,
        callbacks=[early_stopping, lr_schedule, checkpoint],
    )
    logging.info(
        f"Training complete. {len(history.history['accuracy'])} epoch trained."
    )

    # Load the best model before fine-tuning
    model = load_model('models/best_model.h5')

    model = fine_tune_model(model, learning_rate=0.0001)
    trained_model, history = train_model(
        model,
        datagen.flow(x_train, y_train, batch_size=32),
        datagen.flow(x_val, y_val, batch_size=32),
        x_test,
        y_test,
        epochs=30,
        batch_size=32,
        callbacks=[early_stopping, lr_schedule, checkpoint],
    )
    logging.info(
        f"Fine-tuning complete. {len(history.history['accuracy'])} epoch trained."
    )
    save_model(trained_model, "models/resnet50_model.h5")
    trained_model = load_model('models/best_model.h5')
    val_loss, val_accuracy = trained_model.evaluate(x_val, y_val)
    logging.info(f"Validation Accuracy: {val_accuracy * 100:.2f}%")
    test_loss, test_accuracy = trained_model.evaluate(x_test, y_test)
    logging.info(f"Test Accuracy: {test_accuracy * 100:.2f}%")
    return trained_model, history


def analyse_results(trained_model, x_val, y_val, x_test, y_test, history=None):
    """Analyze results."""
    logging.info("Analyzing results...")
    y_val_pred_prob = trained_model.predict(x_val)
    y_val_pred_classes = np.argmax(y_val_pred_prob, axis=1)
    y_test_pred_prob = trained_model.predict(x_test)
    y_test_pred_classes = np.argmax(y_test_pred_prob, axis=1)

    if history is not None:
        plot_model_accuracy(history)

    class_labels = ["0-2", "3-17", "18-24", "25-39", "40-59", "60+"]
    plot_confusion_matrix(y_val, y_val_pred_classes, class_labels, title="Validation")
    plot_confusion_matrix(y_test, y_test_pred_classes, class_labels, title="Test")
    print_misclassifications(y_val, y_val_pred_classes, class_labels, title="Validation")
    print_misclassifications(y_test, y_test_pred_classes, class_labels, title="Test")
    num_images_to_plot = 25
    indices = list(range(num_images_to_plot))
    plot_predicted_vs_actual(x_test, y_test, indices, y_test_pred_classes)


def main():
    """Main function."""
    try:
        x_train, x_val, x_test, y_train, y_val, y_test = load_and_preprocess_data()
        trained_model, history = train_and_evaluate_model(
            x_train, x_val, x_test, y_train, y_val, y_test
        )
        analyse_results(trained_model, history, x_val, y_val, x_test, y_test)
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        raise


if __name__ == "__main__":
    main()
