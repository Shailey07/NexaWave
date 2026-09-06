import React from 'react';
import { cn } from '@/utils/helpers';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'minimal';
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className, 
  variant = 'default',
  onClick,
  ...props
}) => {
  // Completely solid cards, no blur, exact app-like feel
  const variants = {
    default: 'bg-white border border-gray-200 shadow-sm',
    elevated: 'bg-white shadow-md border border-gray-100',
    minimal: 'bg-white border border-gray-100'
  };

  return (
    <div 
      className={cn(
        'rounded-xl transition-shadow duration-200',
        variants[variant],
        onClick ? 'cursor-pointer hover:shadow-md' : '',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};