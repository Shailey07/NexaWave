import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ 
  size = 'md', 
  text,
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const container = fullScreen 
    ? 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50'
    : 'flex items-center justify-center p-8';

  return (
    <div className={container}>
      <GlassCard className="p-6 flex flex-col items-center space-y-4">
        <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-white/20 border-t-white`} />
        {text && (
          <p className="text-white/80 text-sm text-center">{text}</p>
        )}
      </GlassCard>
    </div>
  );
};
