import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mic, Brain, BarChart3, ShieldCheck, ArrowRight, Play } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-widest mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              AI-Powered Audio Analysis
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-8"
            >
              DECODE <br />
              <span className="text-orange-500 italic">EMOTIONS</span> <br />
              FROM SPEECH
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl text-lg md:text-xl text-white/60 mb-12 leading-relaxed"
            >
              An advanced Speech Emotion Recognition (SER) system that uses deep learning to identify human feelings from voice signals with high precision.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link 
                to="/register" 
                className="group flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-orange-500 transition-all hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/about" 
                className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all"
              >
                <Play className="w-5 h-5 fill-current" />
                How it Works
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[800px] bg-orange-500/10 blur-[120px] rounded-full" />
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Mic className="w-8 h-8 text-orange-500" />,
                title: "Voice Capture",
                desc: "Record high-quality audio directly from your browser with real-time visualization."
              },
              {
                icon: <Brain className="w-8 h-8 text-orange-500" />,
                title: "Deep Learning",
                desc: "Powered by advanced CNN and LSTM architectures for state-of-the-art accuracy."
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-orange-500" />,
                title: "Feature Extraction",
                desc: "Extracts MFCCs, Chroma, and Spectral features for comprehensive signal analysis."
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-orange-500" />,
                title: "Secure History",
                desc: "Your data is encrypted and stored securely, accessible only to you."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-colors group"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
                Real-world <span className="text-orange-500 italic">Applications</span>
              </h2>
              <div className="space-y-6">
                {[
                  { title: "Mental Health Support", desc: "Monitor emotional well-being through voice journals and therapeutic sessions." },
                  { title: "Customer Care Analysis", desc: "Analyze customer satisfaction and agent performance in call centers." },
                  { title: "Virtual Assistants", desc: "Enable AI to respond with empathy and context-aware emotional intelligence." },
                  { title: "Education Technology", desc: "Identify student engagement and frustration levels in remote learning." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors">
                    <div className="text-orange-500 font-mono text-sm pt-1">0{i+1}</div>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-white/40 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="aspect-square rounded-full border border-white/10 flex items-center justify-center p-12">
                <div className="w-full h-full rounded-full border border-orange-500/20 animate-pulse flex items-center justify-center">
                   <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-orange-500/20 to-transparent blur-2xl" />
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-8xl font-bold text-orange-500">98%</div>
                <div className="text-xs uppercase tracking-widest font-bold text-white/40">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
