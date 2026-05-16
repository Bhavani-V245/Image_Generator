import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { History, Download } from 'lucide-react';

const API_BASE = 'https://image-generator-backend-tyfb.onrender.com';

export default function HistoryGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // In a real app, you would fetch this from the backend
    // For now, we'll try to fetch from the /gallery endpoint if it exists
    fetch(`${API_BASE}/gallery`)
      .then(res => res.json())
      .then(data => {
        if (data.images) {
          setImages(data.images);
        }
      })
      .catch(err => console.log('Gallery fetch error:', err));
  }, []);

  if (images.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mt-12 space-y-6"
    >
      <div className="flex items-center gap-2 text-slate-300">
        <History className="w-5 h-5 text-purple-400" />
        <h2 className="text-xl font-bold">Your Creations</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * (i % 10) }}
            key={i} 
            className="group relative aspect-square rounded-xl overflow-hidden bg-slate-900 border border-slate-800"
          >
            <img 
              src={`${API_BASE}/static/generated/${img}`} 
              alt="Generated" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <a 
                href={`${API_BASE}/static/generated/${img}`} 
                download
                className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-lg text-white transition-colors"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
