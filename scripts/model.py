from tensorflow.keras.applications import ResNet50
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten, BatchNormalization, Dropout, Conv2D, MaxPooling2D
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

    # Freeze the weights of the ResNet50 layers to prevent training
    base_model.trainable = False

    # Build the model
    model = Sequential([
        base_model,
        Conv2D(128, (3, 3), activation='relu', padding='same'),
        MaxPooling2D(pool_size=(2, 2)),
        BatchNormalization(),
        Dropout(dropout_rate),

        Conv2D(64, (3, 3), activation='relu', padding='same'),
        MaxPooling2D(pool_size=(2, 2)),
        BatchNormalization(),
        Dropout(dropout_rate),

        Flatten(),
        Dense(512, activation='relu'),
        BatchNormalization(),
        Dropout(dropout_rate),
        Dense(256, activation='relu'),
        BatchNormalization(),
        Dropout(dropout_rate),
        Dense(num_classes, activation='softmax')
    ])

    # Compile the model with Adam optimizer and sparse categorical crossentropy loss
    model.compile(optimizer=Adam(learning_rate=learning_rate), loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])

    model.summary()
    return model


def fine_tune_model(model, learning_rate):
    """
    Unfreeze the base model and compile the model again for fine-tuning.

    Args:
        model (tf.keras.models.Model): The model to be fine-tuned.
        learning_rate (float): The learning rate for the Adam optimizer.

    Returns:
        tf.keras.models.Model: The fine-tuned model.
    """
    print("Starting fine-tuning")
    model.layers[0].trainable = True
    model.compile(optimizer=Adam(learning_rate=learning_rate/10), loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])
    return model
