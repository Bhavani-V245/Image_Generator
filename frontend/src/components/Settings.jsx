import React from 'react';
import { Settings as SettingsIcon, Bell, Shield, Moon, Cpu, Database } from 'lucide-react';

export default function Settings() {
  const sections = [
    { title: 'Account', icon: Shield, description: 'Manage your security and privacy settings' },
    { title: 'Notifications', icon: Bell, description: 'Configure how you receive updates' },
    { title: 'Appearance', icon: Moon, description: 'Customize your interface (Dark/Light mode)' },
    { title: 'Compute', icon: Cpu, description: 'Manage AI model selection and performance' },
    { title: 'Data', icon: Database, description: 'Export or clear your generation history' },
  ];

  return (
    <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 text-slate-300">
        <SettingsIcon className="w-6 h-6 text-purple-400" />
        <h2 className="text-2xl font-bold tracking-tight">User Settings</h2>
      </div>

      <div className="space-y-4">
        {sections.map((section, i) => (
          <div key={i} className="glass-panel p-6 hover:border-purple-500/30 transition-all group cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <section.icon className="w-6 h-6 text-slate-400 group-hover:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200">{section.title}</h3>
                  <p className="text-sm text-slate-400">{section.description}</p>
                </div>
              </div>
              <div className="w-12 h-6 rounded-full bg-slate-800 p-1 relative">
                <div className="w-4 h-4 rounded-full bg-slate-500 absolute left-1 top-1" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 border border-dashed border-slate-800 rounded-2xl text-center">
        <p className="text-sm text-slate-500 italic">Advanced developer settings are currently locked.</p>
      </div>
    </div>
  );
}
