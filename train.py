def train_model(model, x_train, y_train, x_test, y_test, epochs, batch_size=32, callbacks=None):
    """
    Train the given model on the provided training data and evaluate it on the testing data.

    Args:
        model (tf.keras.models.Model): The neural network model to be trained.
        x_train (np.ndarray): The input features of the training set.
        y_train (np.ndarray): The target labels of the training set.
        x_test (np.ndarray): The input features of the testing set.
        y_test (np.ndarray): The target labels of the testing set.
        epochs (int): The number of training epochs.
        batch_size (int, optional): The size of each batch during training.
        callbacks (list, optional): List of keras callbacks to be applied during training.

    Returns:
        tf.keras.models.Model, tf.keras.callbacks.History: The trained model and its training history.
    """
    # Train the model and record the training history
    history = model.fit(x_train, y_train, epochs=epochs, batch_size=batch_size, validation_data=(x_test, y_test), callbacks=callbacks)
    return model, history