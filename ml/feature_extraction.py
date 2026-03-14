import librosa
import numpy as np
import os

def extract_features(file_path):
    """
    Extracts MFCC, Mel Spectrogram, Chroma, and Spectral Contrast from an audio file.
    """
    try:
        # Load audio file (resample to 22050Hz)
        audio, sample_rate = librosa.load(file_path, resample_type='kaiser_fast')
        
        # 1. MFCC (Mel-Frequency Cepstral Coefficients)
        mfccs = np.mean(librosa.feature.mfcc(y=audio, sr=sample_rate, n_mfcc=40).T, axis=0)
        
        # 2. Mel Spectrogram
        mel = np.mean(librosa.feature.melspectrogram(y=audio, sr=sample_rate).T, axis=0)
        
        # 3. Chroma
        stft = np.abs(librosa.stft(audio))
        chroma = np.mean(librosa.feature.chroma_stft(S=stft, sr=sample_rate).T, axis=0)
        
        # 4. Spectral Contrast
        contrast = np.mean(librosa.feature.spectral_contrast(S=stft, sr=sample_rate).T, axis=0)
        
        # Concatenate all features into a single vector
        features = np.hstack([mfccs, mel, chroma, contrast])
        return features
    except Exception as e:
        print(f"Error extracting features from {file_path}: {e}")
        return None

if __name__ == "__main__":
    # Example usage
    test_file = "path/to/your/audio.wav"
    if os.path.exists(test_file):
        feat = extract_features(test_file)
        print(f"Extracted {len(feat)} features.")
