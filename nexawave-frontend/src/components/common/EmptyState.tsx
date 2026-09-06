import React from 'react';
import { Search, Plus } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action
}) => {
  const defaultIcon = <Search className="h-12 w-12 text-gray-400" />;

  return (
    <GlassCard className="p-8 text-center bg-gray-50 border-dashed border-2">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          {icon || defaultIcon}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-500 max-w-md mx-auto">{description}</p>
        </div>

        {action && (
          <Button
            onClick={action.onClick}
            variant="glass"
            className="mt-4"
          >
            <Plus className="h-4 w-4 mr-2" />
            {action.label}
          </Button>
        )}
      </div>
    </GlassCard>
  );
};