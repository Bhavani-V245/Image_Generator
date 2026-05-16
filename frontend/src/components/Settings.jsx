import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Moon, Sun, Cpu, Database } from 'lucide-react';

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Use useEffect to handle theme switching safely
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const sections = [
    { title: 'Account', icon: Shield, description: 'Manage your security and privacy settings' },
    { title: 'Notifications', icon: Bell, description: 'Configure how you receive updates' },
    { 
      title: 'Appearance', 
      icon: isDarkMode ? Moon : Sun, 
      description: `Currently in ${isDarkMode ? 'Dark' : 'Light'} Mode`,
      isTheme: true 
    },
    { title: 'Compute', icon: Cpu, description: 'Manage AI model selection and performance' },
    { title: 'Data', icon: Database, description: 'Export or clear your generation history' },
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
            onClick={section.isTheme ? toggleTheme : null}
            className={`glass-panel p-6 hover:border-purple-500/30 transition-all group ${section.isTheme ? 'cursor-pointer active:scale-95' : 'cursor-default'}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform dark-theme-icon-bg">
                  <section.icon className={`w-6 h-6 group-hover:text-purple-400 ${section.isTheme ? 'text-yellow-400' : 'text-slate-400'}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200 dark-theme-text-bold">{section.title}</h3>
                  <p className="text-sm text-slate-400 dark-theme-text-dim">{section.description}</p>
                </div>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors p-1 relative ${isDarkMode ? 'bg-slate-800' : 'bg-purple-600'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-all absolute top-1 ${isDarkMode ? 'left-1' : 'left-7'}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
