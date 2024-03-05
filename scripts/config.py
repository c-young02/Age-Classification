import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    FRONTEND_ORIGIN = os.getenv('FRONTEND_ORIGIN')
    MODEL_PATH = './models/best_model.h5'
    TEST_DATA_PATH = './data/x_test.npy'
