import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserMode } from '@/types';

interface ModeContextType {
  mode: UserMode;
  setMode: (mode: UserMode) => void;
  toggleMode: () => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<UserMode>(() => {
    const saved = localStorage.getItem('nexawave-mode');
    return (saved as UserMode) || 'urban';
  });

  useEffect(() => {
    localStorage.setItem('nexawave-mode', mode);
    document.documentElement.setAttribute('data-mode', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(prev => prev === 'rural' ? 'urban' : 'rural');
  };

  return (
    <ModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) throw new Error('useMode must be used within ModeProvider');
  return context;
};
