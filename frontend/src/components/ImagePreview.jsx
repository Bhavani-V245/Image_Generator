import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Share2, RefreshCw, AlertCircle, Image as ImageIcon } from 'lucide-react';

export default function ImagePreview({ imageUrl, isGenerating, error }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-panel p-2 md:p-6 h-full min-h-[400px] flex flex-col relative"
    >
      <div className="flex-1 relative rounded-xl overflow-hidden bg-slate-900/50 border border-slate-700/50 flex items-center justify-center group min-h-[300px]">
        <AnimatePresence mode="wait">
          {isGenerating && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm z-10"
            >
              <div className="relative w-20 h-20 mb-4">
                <div className="absolute inset-0 rounded-full border-t-2 border-purple-500 animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-r-2 border-pink-500 animate-spin animate-reverse"></div>
                <div className="absolute inset-4 rounded-full border-b-2 border-blue-500 animate-spin"></div>
              </div>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-medium animate-pulse">
                Synthesizing Pixels...
              </p>
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-200 mb-2">Generation Failed</h3>
              <p className="text-slate-400 max-w-sm">{error}</p>
            </motion.div>
          )}

          {!isGenerating && !error && !imageUrl && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-slate-500"
            >
              <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
              <p>Your masterpiece will appear here</p>
            </motion.div>
          )}

          {!isGenerating && !error && imageUrl && (
            <motion.img
              key="image"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              src={imageUrl}
              alt="Generated output"
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </AnimatePresence>

        {/* Hover Actions */}
        {!isGenerating && !error && imageUrl && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
            <a 
              href={imageUrl} 
              download 
              className="p-3 bg-slate-900/80 backdrop-blur-md rounded-full text-white hover:bg-purple-600 transition-colors shadow-lg shadow-black/50"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </a>
            <button className="p-3 bg-slate-900/80 backdrop-blur-md rounded-full text-white hover:bg-pink-600 transition-colors shadow-lg shadow-black/50" title="Share">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-3 bg-slate-900/80 backdrop-blur-md rounded-full text-white hover:bg-blue-600 transition-colors shadow-lg shadow-black/50" title="Regenerate">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
