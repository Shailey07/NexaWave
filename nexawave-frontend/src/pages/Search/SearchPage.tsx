import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';

export const SearchPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-24 px-4">
      <div className="max-w-6xl mx-auto">
        <GlassCard className="p-12 text-center bg-white border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Search Results</h1>
          <p className="text-gray-500">Advanced search functionality coming soon!</p>
        </GlassCard>
      </div>
    </div>
  );
};