import React from 'react';
import { Image as ImageIcon, History, Settings, Compass, LogOut } from 'lucide-react';

export default function MobileNav({ activeTab, onTabChange, onLogout }) {
  const navItems = [
    { id: 'generate', label: 'Generate', icon: ImageIcon },
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'history', label: 'History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-4 left-4 right-4 h-16 glass-panel flex items-center justify-around px-4 md:hidden z-50 shadow-2xl border-slate-700/50 backdrop-blur-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
              isActive 
                ? 'text-purple-400 scale-110 font-semibold' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </button>
        );
      })}
      
      {/* Mini Logout on Mobile */}
      <button
        onClick={onLogout}
        className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-red-400 transition-all duration-300"
        title="Log Out"
      >
        <LogOut className="w-5 h-5" />
        <span className="text-[10px] tracking-tight">Log Out</span>
      </button>
    </nav>
  );
}
