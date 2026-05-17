import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Moon, Sun, Cpu, Database } from 'lucide-react';

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [securityLock, setSecurityLock] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [computeBoost, setComputeBoost] = useState(false);
  const [dataSaver, setDataSaver] = useState(false);

  // Use useEffect to handle theme switching safely
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
    }
  }, [isDarkMode]);

  const sections = [
    { 
      title: 'Account Security', 
      icon: Shield, 
      description: securityLock ? 'Two-Factor Authentication is active' : 'Secure your account settings',
      isActive: securityLock,
      onToggle: () => setSecurityLock(!securityLock)
    },
    { 
      title: 'Notifications', 
      icon: Bell, 
      description: notifications ? 'All prompt updates enabled' : 'Notifications are paused',
      isActive: notifications,
      onToggle: () => setNotifications(!notifications)
    },
    { 
      title: 'Appearance', 
      icon: isDarkMode ? Moon : Sun, 
      description: `Currently in ${isDarkMode ? 'Dark' : 'Light'} Mode`,
      isActive: isDarkMode,
      onToggle: () => setIsDarkMode(!isDarkMode),
      isYellow: true
    },
    { 
      title: 'Compute Performance', 
      icon: Cpu, 
      description: computeBoost ? 'High-Performance Mode (Whisper V3 Turbo)' : 'Standard generation speed',
      isActive: computeBoost,
      onToggle: () => setComputeBoost(!computeBoost)
    },
    { 
      title: 'Data & Sync', 
      icon: Database, 
      description: dataSaver ? 'Cloud history synchronization active' : 'Local storage only',
      isActive: dataSaver,
      onToggle: () => setDataSaver(!dataSaver)
    },
  ];

  return (
    <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 text-slate-300 dark-theme-text">
        <SettingsIcon className="w-6 h-6 text-purple-400" />
        <h2 className="text-2xl font-bold tracking-tight">User Settings</h2>
      </div>

      <div className="space-y-4">
        {sections.map((section, i) => (
          <div 
            key={i} 
            onClick={section.onToggle}
            className="glass-panel p-6 hover:border-purple-500/30 transition-all group cursor-pointer active:scale-[0.99]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform dark-theme-icon-bg">
                  <section.icon className={`w-6 h-6 group-hover:text-purple-400 transition-colors ${section.isYellow ? 'text-yellow-400' : 'text-slate-400'}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200 dark-theme-text-bold">{section.title}</h3>
                  <p className="text-sm text-slate-400 dark-theme-text-dim">{section.description}</p>
                </div>
              </div>
              
              {/* Toggle Switch */}
              <div className={`w-12 h-6 rounded-full transition-colors duration-300 p-1 relative ${section.isActive ? 'bg-purple-600' : 'bg-slate-800'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-all duration-300 absolute top-1 ${section.isActive ? 'left-7' : 'left-1'}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
