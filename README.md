# Speech Emotion Recognition System

An intelligent web application that detects human emotions from speech audio using deep learning.

## Project Structure

- `/src`: React frontend with Tailwind CSS and Lucide icons.
- `/server.ts`: Express backend serving the React app and handling API routes.
- `/ml`: Python scripts for feature extraction and model training (Academic Reference).
- `/src/services/geminiService.ts`: Real-time AI inference using Gemini 2.5 Native Audio.

## Setup Instructions

### 1. Environment Variables
Ensure you have the following in your environment (or `.env` file):
- `GEMINI_API_KEY`: Your Google AI Studio API key.

### 2. Frontend & Backend (Node.js)
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Build for production: `npm run build`

### 3. Machine Learning (Python)
To run the academic ML scripts:
1. Navigate to `/ml`: `cd ml`
2. Install Python dependencies: `pip install -r requirements.txt`
3. Use `feature_extraction.py` to process datasets like RAVDESS or TESS.

## AI Model Details
The live application uses **Gemini 2.5 Flash (Native Audio)**. This model is specifically trained to understand audio signals directly, providing superior accuracy for emotion detection compared to traditional MFCC-based CNNs.

## Database Schema (Firestore)
- `users`: Stores user profiles.
- `predictions`: Stores history of emotion detections with confidence scores.

## Deployment
This app is ready to be deployed to **Cloud Run** or **Vercel**.
- Ensure `NODE_ENV=production` is set.
- The app starts via `node server.ts` (after build).
