import tensorflow as tf
from tensorflow.keras import layers, models
import numpy as np

def create_cnn_model(input_shape, num_classes):
    """
    CNN Model for Speech Emotion Recognition.
    Best for spatial patterns in spectrograms/MFCCs.
    """
    model = models.Sequential([
        layers.Input(shape=input_shape),
        
        layers.Conv1D(64, 3, activation='relu', padding='same'),
        layers.BatchNormalization(),
        layers.MaxPooling1D(2),
        layers.Dropout(0.2),
        
        layers.Conv1D(128, 3, activation='relu', padding='same'),
        layers.BatchNormalization(),
        layers.MaxPooling1D(2),
        layers.Dropout(0.3),
        
        layers.Conv1D(256, 3, activation='relu', padding='same'),
        layers.BatchNormalization(),
        layers.GlobalAveragePooling1D(),
        layers.Dropout(0.4),
        
        layers.Dense(128, activation='relu'),
        layers.Dense(num_classes, activation='softmax')
    ])
    
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    return model

def create_lstm_model(input_shape, num_classes):
    """
    LSTM Model for Speech Emotion Recognition.
    Best for temporal dependencies in speech sequences.
    """
    model = models.Sequential([
        layers.Input(shape=input_shape),
        layers.LSTM(128, return_sequences=True),
        layers.LSTM(64),
        layers.Dropout(0.3),
        layers.Dense(64, activation='relu'),
        layers.Dense(num_classes, activation='softmax')
    ])
    
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    return model

# Recommendation:
# CNN is often better for SER when using fixed-length feature vectors (like MFCC averages).
# LSTM is superior if you preserve the time-series nature of the audio.
