import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import GeneratePanel from './components/GeneratePanel';
import ImagePreview from './components/ImagePreview';
import HistoryGallery from './components/HistoryGallery';
import Discover from './components/Discover';
import Settings from './components/Settings';

const API_BASE = 'https://image-generator-backend-tyfb.onrender.com';

function App() {
  const [activeTab, setActiveTab] = useState('generate');
  const [currentImage, setCurrentImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [galleryKey, setGalleryKey] = useState(0);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleGenerate = async (prompt, isVoice = false, audioBlob = null) => {
    setIsGenerating(true);
    setError(null);
    setCurrentImage(null);
    try {
      let response;
      if (isVoice && audioBlob) {
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.webm');
        response = await fetch(`${API_BASE}/voice_generate`, {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch(`${API_BASE}/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        });
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Generation failed');

      // Support both base64 (Vercel) and URL (local Flask)
      if (data.image_b64) {
        setCurrentImage(`data:image/png;base64,${data.image_b64}`);
      } else if (data.image_url) {
        setCurrentImage(`${API_BASE}${data.image_url}`);
      }
      setGalleryKey(k => k + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoggedOut) {
    return (
      <div className="h-screen bg-slate-950 flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-6">
          <div className="w-20 h-20 rounded-2xl bg-purple-600/20 flex items-center justify-center mx-auto">
            <LogOut className="w-10 h-10 text-purple-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Signed Out</h1>
          <p className="text-slate-400">You have been securely logged out of NexusAI. We hope to see you again soon!</p>
          <button 
            onClick={() => setIsLoggedOut(false)}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-white shadow-xl shadow-purple-500/20 hover:scale-105 transition-transform"
          >
            Sign In Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      {/* Animated background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-900/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-40 w-80 h-80 bg-blue-900/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-pink-900/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={() => setIsLoggedOut(true)} />

      <main className="flex-1 overflow-y-auto relative z-10">
        <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-10 pb-24">
          <Hero />

          {activeTab === 'generate' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5">
                <GeneratePanel onGenerate={handleGenerate} isGenerating={isGenerating} />
              </div>
              <div className="lg:col-span-7">
                <ImagePreview imageUrl={currentImage} isGenerating={isGenerating} error={error} />
              </div>
            </div>
          ) : activeTab === 'history' ? (
            <HistoryGallery key={galleryKey} />
          ) : activeTab === 'discover' ? (
            <Discover />
          ) : activeTab === 'settings' ? (
            <Settings />
          ) : (
            <div className="glass-panel p-12 text-center text-slate-400">
              <p>This section is coming soon!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
