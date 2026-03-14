import React from 'react';
import { motion } from 'motion/react';
import { 
  Smile, 
  Frown, 
  Angry, 
  Meh, 
  Zap, 
  Ghost,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Emotion } from '../types';
import { cn } from '../utils';

interface EmotionCardProps {
  emotion: Emotion;
  confidence: number;
}

const emotionConfig: Record<Emotion, { icon: any; color: string; label: string; desc: string }> = {
  happy: { icon: Smile, color: 'text-green-500', label: 'Happy', desc: 'Positive, energetic, and cheerful tone detected.' },
  sad: { icon: Frown, color: 'text-blue-500', label: 'Sad', desc: 'Low energy, melancholic, or somber tone detected.' },
  angry: { icon: Angry, color: 'text-red-500', label: 'Angry', desc: 'High intensity, aggressive, or frustrated tone detected.' },
  neutral: { icon: Meh, color: 'text-gray-400', label: 'Neutral', desc: 'Calm, steady, and balanced tone detected.' },
  fear: { icon: Zap, color: 'text-purple-500', label: 'Fear', desc: 'Anxious, trembling, or fearful tone detected.' },
  surprise: { icon: Ghost, color: 'text-orange-500', label: 'Surprise', desc: 'High pitch, sudden, or startled tone detected.' }
};

export default function EmotionCard({ emotion, confidence }: EmotionCardProps) {
  const config = emotionConfig[emotion];
  const Icon = config.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-6 opacity-10">
        <Icon className="w-32 h-32" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className={cn("w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center", config.color)}>
            <Icon className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{config.label}</h2>
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <Activity className="w-4 h-4" />
              Primary Emotion Detected
            </div>
          </div>
        </div>

        <p className="text-white/60 mb-8 leading-relaxed max-w-md">
          {config.desc}
        </p>

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40">
              <TrendingUp className="w-4 h-4" />
              Confidence Score
            </div>
            <div className="text-2xl font-mono font-bold text-orange-500">
              {(confidence * 100).toFixed(1)}%
            </div>
          </div>
          <div className="h-3 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${confidence * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-orange-500 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.3)]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
