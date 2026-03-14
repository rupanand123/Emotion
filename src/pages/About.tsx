import React from 'react';
import { motion } from 'motion/react';
import { Brain, Database, Cpu, Globe, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-none">
            THE SCIENCE OF <br />
            <span className="text-orange-500">VOICE ANALYSIS</span>
          </h1>
          <p className="text-lg text-white/60 mb-12 leading-relaxed">
            Speech Emotion Recognition (SER) is the act of recognizing human emotion and affective states from speech. This is capitalizing on the fact that voice often reflects underlying emotion through tone and pitch.
          </p>

          <div className="space-y-12">
            {[
              {
                title: "Feature Extraction (MFCC)",
                desc: "We process raw audio signals to extract Mel-Frequency Cepstral Coefficients, which represent the short-term power spectrum of sound, mimicking human hearing.",
                icon: <Database className="w-6 h-6" />
              },
              {
                title: "Deep Learning Models",
                desc: "Our system utilizes Convolutional Neural Networks (CNN) and Long Short-Term Memory (LSTM) networks to identify complex patterns in audio features.",
                icon: <Brain className="w-6 h-6" />
              },
              {
                title: "Real-time Inference",
                desc: "Optimized for low-latency processing, providing near-instantaneous feedback on emotional states.",
                icon: <Cpu className="w-6 h-6" />
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="w-12 h-12 shrink-0 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center text-orange-500">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 border border-white/10 rounded-[40px] p-12 sticky top-32"
        >
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Globe className="w-6 h-6 text-orange-500" />
            Project Objectives
          </h2>
          <ul className="space-y-6">
            {[
              "Accurate emotion detection from diverse speech patterns",
              "Support for multiple datasets (RAVDESS, TESS, EMO-DB)",
              "User-friendly interface for non-technical users",
              "Scalable cloud-based architecture",
              "Comprehensive prediction history and analytics"
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-4 group">
                <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <span className="text-white/70 leading-relaxed">{text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 p-6 bg-orange-500/10 border border-orange-500/20 rounded-3xl">
            <p className="text-sm italic text-orange-500 leading-relaxed">
              "Our mission is to bridge the gap between human emotion and artificial intelligence, creating more empathetic and responsive technology for everyone."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
