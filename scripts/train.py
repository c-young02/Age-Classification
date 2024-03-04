def train_model(model, train_data, val_data, x_test, y_test, epochs=10, batch_size=32, callbacks=None):
    """
    Train the model.

    Args:
        model (tf.keras.Model): The model to train.
        train_data (tf.keras.preprocessing.image.ImageDataGenerator): Training data.
        val_data (tf.keras.preprocessing.image.ImageDataGenerator): Validation data.
        x_test (np.ndarray): Testing features.
        y_test (np.ndarray): Testing labels.
        epochs (int, optional): The number of epochs to train for.
        batch_size (int, optional): The batch size to use for training.
        callbacks (list, optional): List of callbacks to use during training.

    Returns:
        tf.keras.Model: The trained model.
        tf.keras.callbacks.History: History object containing training metrics.
    """
    history = model.fit(train_data, epochs=epochs, validation_data=val_data, callbacks=callbacks)
    return model, history