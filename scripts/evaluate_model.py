import logging
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import plot_model
from main import load_and_preprocess_data, analyse_results


def evaluate_model(trained_model, x_val, y_val, x_test, y_test):
    """Evaluate the model and print the loss."""
    val_loss, _ = trained_model.evaluate(x_val, y_val)
    logging.info(f"Loss on validation data: {val_loss}")
    test_loss, _ = trained_model.evaluate(x_test, y_test)
    logging.info(f"Loss on test data: {test_loss}")


def main():
    """Main function."""
    try:
        trained_model = load_model('models/best_model.h5')
        x_train, x_val, x_test, y_train, y_val, y_test = load_and_preprocess_data()
        evaluate_model(trained_model, x_val, y_val, x_test, y_test)
        analyse_results(trained_model, x_val, y_val, x_test, y_test)
        plot_model(trained_model, to_file='plots/model_architecture.png', show_shapes=True, show_layer_names=True)
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        raise


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    main()