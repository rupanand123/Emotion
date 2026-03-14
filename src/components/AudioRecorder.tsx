import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Square, Play, Trash2, Loader2, Volume2, Brain } from 'lucide-react';
import { cn } from '../utils';

interface AudioRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
  isProcessing: boolean;
}

export default function AudioRecorder({ onRecordingComplete, isProcessing }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Please allow microphone access to record audio.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnalyze = () => {
    if (audioBlob) {
      onRecordingComplete(audioBlob);
    }
  };

  const reset = () => {
    setAudioBlob(null);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setRecordingTime(0);
  };

  return (
    <div className="w-full">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
        {/* Background Animation when recording */}
        <AnimatePresence>
          {isRecording && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-orange-500/5 z-0"
            >
              <div className="absolute bottom-0 left-0 right-0 h-1/2 flex items-end justify-center gap-1 px-4">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [10, Math.random() * 60 + 20, 10] }}
                    transition={{ repeat: Infinity, duration: 0.5 + Math.random() * 0.5 }}
                    className="w-1 bg-orange-500/40 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-8 text-center">
            <h3 className="text-xl font-bold mb-2">Record Audio</h3>
            <p className="text-white/40 text-sm">Speak clearly into your microphone for better results</p>
          </div>

          <div className="flex items-center justify-center gap-8 mb-8">
            {!audioBlob ? (
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg",
                  isRecording 
                    ? "bg-red-500 hover:bg-red-600 scale-110" 
                    : "bg-orange-500 hover:bg-orange-600"
                )}
              >
                {isRecording ? (
                  <Square className="w-8 h-8 text-white fill-current" />
                ) : (
                  <Mic className="w-8 h-8 text-black" />
                )}
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={reset}
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-500/20 hover:text-red-500 transition-colors"
                  title="Delete recording"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="px-6 py-3 bg-white/10 rounded-2xl flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-orange-500" />
                  <audio src={audioUrl!} controls className="h-8 w-40" />
                </div>
              </div>
            )}
          </div>

          <div className="text-3xl font-mono font-bold text-white/80 mb-8">
            {formatTime(recordingTime)}
          </div>

          <div className="w-full flex gap-4">
            <button
              onClick={handleAnalyze}
              disabled={!audioBlob || isProcessing}
              className="flex-1 bg-white text-black font-bold py-4 rounded-2xl hover:bg-orange-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5" />
                  Analyze Emotion
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
