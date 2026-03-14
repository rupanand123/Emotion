export type Emotion = 'happy' | 'angry' | 'sad' | 'neutral' | 'fear' | 'surprise';

export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  createdAt: any;
}

export interface Prediction {
  predictionId: string;
  userId: string;
  audioUrl?: string;
  predictedEmotion: Emotion;
  confidenceScore: number;
  createdAt: any;
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo: {
    userId?: string;
    email?: string | null;
    emailVerified?: boolean;
    isAnonymous?: boolean;
  };
}
