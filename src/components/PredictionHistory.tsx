import React from 'react';
import { History, Clock, Trash2, ExternalLink } from 'lucide-react';
import { Prediction } from '../types';
import { formatTimestamp } from '../utils';

interface PredictionHistoryProps {
  predictions: Prediction[];
  onDelete: (id: string) => void;
}

export default function PredictionHistory({ predictions, onDelete }: PredictionHistoryProps) {
  if (predictions.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <History className="w-8 h-8 text-white/20" />
        </div>
        <h3 className="text-xl font-bold mb-2">No History Yet</h3>
        <p className="text-white/40 text-sm">Your emotion predictions will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6 px-2">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <History className="w-5 h-5 text-orange-500" />
          Recent Activity
        </h3>
        <span className="text-xs font-bold uppercase tracking-widest text-white/40">
          {predictions.length} Total Records
        </span>
      </div>

      <div className="grid gap-4">
        {predictions.map((p) => (
          <div 
            key={p.predictionId}
            className="group bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between hover:border-white/20 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xs uppercase",
                p.predictedEmotion === 'happy' ? 'bg-green-500/10 text-green-500' :
                p.predictedEmotion === 'angry' ? 'bg-red-500/10 text-red-500' :
                p.predictedEmotion === 'sad' ? 'bg-blue-500/10 text-blue-500' :
                p.predictedEmotion === 'neutral' ? 'bg-gray-500/10 text-gray-400' :
                p.predictedEmotion === 'fear' ? 'bg-purple-500/10 text-purple-500' :
                'bg-orange-500/10 text-orange-500'
              )}>
                {p.predictedEmotion.slice(0, 3)}
              </div>
              <div>
                <div className="font-bold capitalize">{p.predictedEmotion}</div>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Clock className="w-3 h-3" />
                  {formatTimestamp(p.createdAt)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-mono font-bold text-orange-500">
                  {(p.confidenceScore * 100).toFixed(0)}%
                </div>
                <div className="text-[10px] uppercase tracking-widest text-white/20">Confidence</div>
              </div>
              <button 
                onClick={() => onDelete(p.predictionId)}
                className="p-2 text-white/20 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { cn } from '../utils';
