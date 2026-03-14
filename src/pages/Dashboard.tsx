import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Upload, 
  Mic, 
  History as HistoryIcon, 
  AlertCircle,
  FileAudio,
  X,
  Loader2
} from 'lucide-react';
import { Prediction, Emotion } from '../types';
import { predictEmotionFromAudio } from '../services/geminiService';
import { handleFirestoreError, cn } from '../utils';

// Components
import AudioRecorder from '../components/AudioRecorder';
import EmotionCard from '../components/EmotionCard';
import PredictionHistory from '../components/PredictionHistory';

interface DashboardProps {
  user: User;
}

export default function Dashboard({ user }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'record' | 'upload'>('record');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [currentPrediction, setCurrentPrediction] = useState<{ emotion: Emotion; confidence: number } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const q = query(
      collection(db, 'predictions'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        predictionId: doc.id,
        ...doc.data()
      })) as Prediction[];
      setPredictions(data);
    }, (err) => {
      handleFirestoreError(err, 'list', 'predictions');
    });

    return () => unsubscribe();
  }, [user.uid]);

  const processAudio = async (blob: Blob) => {
    setIsProcessing(true);
    setError('');
    try {
      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64data = (reader.result as string).split(',')[1];
        
        const result = await predictEmotionFromAudio(base64data, blob.type);
        setCurrentPrediction(result);

        // Save to Firestore
        await addDoc(collection(db, 'predictions'), {
          userId: user.uid,
          predictedEmotion: result.emotion,
          confidenceScore: result.confidence,
          createdAt: serverTimestamp()
        });
      };
    } catch (err: any) {
      setError(err.message || 'Failed to analyze audio');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'predictions', id));
    } catch (err) {
      handleFirestoreError(err, 'delete', `predictions/${id}`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('audio/')) {
        setError('Please upload a valid audio file.');
        return;
      }
      processAudio(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column: Controls & Result */}
        <div className="flex-1 space-y-8">
          <header>
            <h1 className="text-4xl font-bold tracking-tight mb-2 flex items-center gap-3">
              <LayoutDashboard className="w-8 h-8 text-orange-500" />
              Dashboard
            </h1>
            <p className="text-white/40">Welcome back, {user.displayName || 'User'}</p>
          </header>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-between text-red-500 text-sm">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
              <button onClick={() => setError('')}><X className="w-4 h-4" /></button>
            </div>
          )}

          <div className="bg-white/5 border border-white/10 rounded-[32px] p-2 flex gap-2">
            <button 
              onClick={() => setActiveTab('record')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-3xl font-bold transition-all",
                activeTab === 'record' ? "bg-white text-black" : "text-white/40 hover:text-white"
              )}
            >
              <Mic className="w-4 h-4" />
              Record
            </button>
            <button 
              onClick={() => setActiveTab('upload')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-3xl font-bold transition-all",
                activeTab === 'upload' ? "bg-white text-black" : "text-white/40 hover:text-white"
              )}
            >
              <Upload className="w-4 h-4" />
              Upload
            </button>
          </div>

          <div className="min-h-[400px]">
            {activeTab === 'record' ? (
              <AudioRecorder onRecordingComplete={processAudio} isProcessing={isProcessing} />
            ) : (
              <div className="bg-white/5 border border-white/10 border-dashed rounded-[32px] p-12 flex flex-col items-center justify-center text-center group hover:border-orange-500/50 transition-colors relative">
                <input 
                  type="file" 
                  accept="audio/*" 
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  disabled={isProcessing}
                />
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileAudio className="w-10 h-10 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Drop your audio here</h3>
                <p className="text-white/40 text-sm max-w-xs">Support for WAV, MP3, and OGG formats. Max file size 10MB.</p>
                {isProcessing && (
                  <div className="mt-8 flex items-center gap-3 text-orange-500 font-bold">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing File...
                  </div>
                )}
              </div>
            )}
          </div>

          {currentPrediction && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <EmotionCard 
                emotion={currentPrediction.emotion} 
                confidence={currentPrediction.confidence} 
              />
            </motion.div>
          )}
        </div>

        {/* Right Column: History */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="sticky top-32">
            <PredictionHistory predictions={predictions} onDelete={handleDelete} />
          </div>
        </div>
      </div>
    </div>
  );
}
