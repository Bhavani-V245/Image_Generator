import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Heart, Share2 } from 'lucide-react';

const MOCK_DISCOVER = [
  { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', prompt: 'Abstract fluid waves' },
  { url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop', prompt: 'Neon cyberpunk portrait' },
  { url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2670&auto=format&fit=crop', prompt: 'Minimalist landscape' },
  { url: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=2530&auto=format&fit=crop', prompt: 'Vibrant futuristic city' },
  { url: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=2670&auto=format&fit=crop', prompt: 'Ethereal cosmic storm' },
  { url: 'https://images.unsplash.com/photo-1620121692029-d088224efc74?q=80&w=2532&auto=format&fit=crop', prompt: 'Digital 3D render' },
];

export default function Discover() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 text-slate-300">
        <Compass className="w-6 h-6 text-blue-400" />
        <h2 className="text-2xl font-bold tracking-tight">Community Showcase</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_DISCOVER.map((img, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group relative rounded-2xl overflow-hidden glass-panel border-slate-700/30"
          >
            <img src={img.url} alt={img.prompt} className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <p className="text-sm text-slate-300 italic mb-4 line-clamp-2">"{img.prompt}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-bold">AI</div>
                  <span className="text-xs font-medium text-slate-200">nexus_creator_{i}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-slate-400 hover:text-pink-400 transition-colors"><Heart className="w-4 h-4" /></button>
                  <button className="text-slate-400 hover:text-blue-400 transition-colors"><Share2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
