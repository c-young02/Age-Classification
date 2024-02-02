# preprocessing.py
import numpy as np
from sklearn.model_selection import train_test_split
import pandas as pd


def create_age_classes(df):
    """
    Create age classes based on specified bins and labels.

    Args:
        df (pd.DataFrame): The DataFrame containing the 'Ages' column.

    Returns:
        pd.DataFrame: The DataFrame with an added 'AgeClass' column.
    """

    bins = [0, 2, 10, 17, 24, 39, 59, np.inf]
    # '0-2', '3-10', '11-17', '18-24', '25-39', '40-59', '60+'
    labels = [0, 1, 2, 3, 4, 5, 6]
    df['AgeClass'] = pd.cut(df['Ages'], bins=bins, labels=labels)
    return df


def undersample_age(dataframe, undersampling_operations):
    """
    Undersample specified age classes in the DataFrame.

    Args:
        dataframe (pd.DataFrame): The DataFrame to be undersampled.
        undersampling_operations (List[int, float]): List specifying age and fraction to be undersampled.

    Returns:
        pd.DataFrame: The DataFrame after undersampling.
    """
    for age, frac in undersampling_operations:
        undersample = dataframe[dataframe['AgeClass'] == age].sample(frac=frac, random_state=42).index
        dataframe = dataframe.drop(undersample)
    return dataframe


def split_data(df, test_size=0.2):
    """
    Split data into training and testing sets.

    Args:
        df (pd.DataFrame): The DataFrame containing features and labels.
        test_size (float, optional): The proportion of the dataset to include in the test split.

    Returns:
        x_train, x_test, y_train, y_test (np.ndarray): The training and testing sets.
    """
    # Create features (x) and labels (y)
    x = np.array(df['Images'].values.tolist())  # Convert Series to list, then to NumPy array
    y = np.array(df['AgeClass'])

    # Split data into training and testing sets
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=test_size, stratify=y, random_state=42)

    return x_train, x_test, y_train, y_test
