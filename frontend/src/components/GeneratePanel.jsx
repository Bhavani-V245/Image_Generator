import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, Image as ImageIcon, StopCircle, Loader2 } from 'lucide-react';

export default function GeneratePanel({ onGenerate, isGenerating }) {
  const [prompt, setPrompt] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        onGenerate(null, true, audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      alert("Microphone access denied or not available.");
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleGenerateClick = () => {
    if (!prompt.trim()) return;
    onGenerate(prompt, false, null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-panel p-6 space-y-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Your Prompt
        </label>
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating || isRecording}
            placeholder="A futuristic city with flying cars at sunset, cyberpunk style..."
            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 resize-none h-32 transition-all disabled:opacity-50"
          />
          <button
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            disabled={isGenerating}
            className={`absolute bottom-4 right-4 p-3 rounded-full transition-all duration-300 ${
              isRecording 
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 animate-pulse ring-2 ring-red-500/50' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
            } disabled:opacity-50`}
            title={isRecording ? "Stop Recording" : "Use Voice Input"}
          >
            {isRecording ? <StopCircle className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Style</label>
          <select className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none cursor-pointer">
            <option>Cinematic</option>
            <option>Cyberpunk</option>
            <option>Anime</option>
            <option>Photorealistic</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Aspect Ratio</label>
          <select className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none cursor-pointer">
            <option>1:1 (Square)</option>
            <option>16:9 (Landscape)</option>
            <option>9:16 (Portrait)</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleGenerateClick}
        disabled={isGenerating || isRecording || (!prompt.trim() && !isRecording)}
        className="glow-button w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed bg-slate-800 border border-slate-700"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating Magic...
          </>
        ) : (
          <>
            <ImageIcon className="w-5 h-5" />
            Generate Image
          </>
        )}
      </button>
    </motion.div>
  );
}
