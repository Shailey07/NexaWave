import React, { useState } from 'react';
import { Mic, X } from 'lucide-react';

export const VoiceAssistant: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTranscript('Listening... Speak now.');
      // Yahan hum baad me AI Speech-to-Text API lagayenge
    } else {
      setTranscript('');
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end">
      {/* Transcript Tooltip */}
      {isListening && (
        <div className="bg-gray-900 text-white text-sm px-4 py-3 rounded-lg shadow-lg mb-4 max-w-[200px] text-center border border-gray-700 animate-in fade-in slide-in-from-bottom-2">
          {transcript}
        </div>
      )}

      {/* Mic Button */}
      <button
        onClick={toggleListening}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isListening 
            ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-500/30' 
            : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl'
        }`}
      >
        {isListening ? <X className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
      </button>
    </div>
  );
};