from tensorflow.keras.applications import ResNet50
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten, BatchNormalization, Dropout
from tensorflow.keras.optimizers import Adam

dropout_rate = 0.5


def build_model(input_shape, num_classes, learning_rate):
    """
    Build and compile a convolutional neural network model using ResNet50 as the base.

    Args:
        input_shape ([int, int, int]): The shape of the input images in the format (height, width, channels).
        num_classes (int): The number of classes in the classification task.
        learning_rate (float): The learning rate for the Adam optimizer.

    Returns:
        tf.keras.models.Model: Compiled convolutional neural network model.
    """
    # Load pre-trained ResNet50 model
    base_model = ResNet50(weights='imagenet', include_top=False, input_shape=input_shape)

    # Build a sequential model
    model = Sequential()

    # Add ResNet50 as the base model
    model.add(base_model)

    # Flatten the output before dense layers
    model.add(Flatten())

    # Add Batch Normalization for stability
    model.add(BatchNormalization())

    # Add Dropout for regularization
    model.add(Dropout(dropout_rate))

    # Dense layer with ReLU activation
    model.add(Dense(256, activation='relu'))

    # Add Batch Normalization for stability
    model.add(BatchNormalization())

    # Add Dropout for regularization
    model.add(Dropout(dropout_rate))

    # Output layer with softmax activation for multi-class classification
    model.add(Dense(num_classes, activation='softmax'))

    # Compile the model with Adam optimizer and sparse categorical crossentropy loss
    model.compile(optimizer=Adam(learning_rate=learning_rate), loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])

    model.summary()

    return model
