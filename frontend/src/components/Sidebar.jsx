import React from 'react';
import { Sparkles, Image as ImageIcon, History, Settings, LogOut, Compass } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 glass-panel border-l-0 border-y-0 rounded-none h-full flex flex-col p-6 hidden md:flex z-20">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
          <Sparkles className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          NexusAI
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        <a href="#" className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl text-white font-medium transition-all">
          <ImageIcon className="w-5 h-5 text-purple-400" />
          Generate
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 rounded-xl hover:text-slate-200 transition-all">
          <Compass className="w-5 h-5" />
          Discover
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 rounded-xl hover:text-slate-200 transition-all">
          <History className="w-5 h-5" />
          History
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 rounded-xl hover:text-slate-200 transition-all">
          <Settings className="w-5 h-5" />
          Settings
        </a>
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800">
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 rounded-xl hover:text-slate-200 transition-all">
          <LogOut className="w-5 h-5" />
          Log Out
        </a>
      </div>
    </aside>
  );
}
