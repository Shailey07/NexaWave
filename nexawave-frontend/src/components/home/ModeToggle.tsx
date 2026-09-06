import React from 'react';
import { Trees, Building2 } from 'lucide-react';
import { Toggle } from '@/components/ui/Toggle';
import { useMode } from '@/hooks/useMode';

export const ModeToggle: React.FC = () => {
  const { mode, setMode } = useMode();

  return (
    <div className="flex items-center space-x-1 bg-slate-900 rounded-lg p-1 border border-slate-800">
      <Toggle
        pressed={mode === 'rural'}
        onPressedChange={() => setMode('rural')}
        variant="glass"
        size="sm"
        className="rounded-md data-[state=on]:bg-green-600/20 data-[state=on]:text-green-500"
      >
        <Trees className="h-4 w-4 sm:mr-2" />
        <span className="hidden sm:inline">Rural</span>
      </Toggle>
      <Toggle
        pressed={mode === 'urban'}
        onPressedChange={() => setMode('urban')}
        variant="glass"
        size="sm"
        className="rounded-md data-[state=on]:bg-blue-600/20 data-[state=on]:text-blue-500"
      >
        <Building2 className="h-4 w-4 sm:mr-2" />
        <span className="hidden sm:inline">Urban</span>
      </Toggle>
    </div>
  );
};