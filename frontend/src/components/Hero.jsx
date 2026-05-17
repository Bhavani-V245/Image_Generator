import React from 'react';
import { motion } from 'framer-motion';
import { Wand2 } from 'lucide-react';

export default function Hero() {
  return (
    <div className="text-center space-y-6 pt-10 pb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-300 text-sm font-medium backdrop-blur-sm"
      >
        <Wand2 className="w-4 h-4 text-pink-400" />
        <span>Next-Gen Creative Engine</span>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400"
      >
        Imagine Anything.
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto"
      >
        Generate stunning, production-ready AI images in seconds using just your voice or text.
      </motion.p>
    </div>
  );
}
