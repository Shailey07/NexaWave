import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { ServiceCard } from '@/components/home/ServiceCard';
import { useMode } from '@/context/ModeContext';

export const ServicesPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mode } = useMode();
  
  // Get selected category & subcategory from Home Page
  const { categoryName, subcategory } = location.state || { categoryName: 'All Services', subcategory: 'All' };

  // Dummy Providers Data based on Subcategory
  const providers = [
    { id: 1, name: 'Ramesh Singh', specialty: subcategory, rating: 4.8, totalRatings: 124, distance: '1.2 km', price: { min: 250, unit: 'visit' } },
    { id: 2, name: 'Suresh Kumar', specialty: subcategory, rating: 4.6, totalRatings: 89, distance: '3.5 km', price: { min: 300, unit: 'visit' } },
    { id: 3, name: 'Ali Enterprises', specialty: subcategory, rating: 4.9, totalRatings: 210, distance: '5.0 km', price: { min: 200, unit: 'visit' } },
  ];

  const handleBook = (provider: any) => {
    navigate(`/services/${provider.id}`);
  };

  const handleChat = (provider: any) => {
    navigate('/chat', { state: { providerName: provider.name, role: provider.specialty } });
  };

  return (
    <div className="min-h-screen pt-20 pb-24 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header & Back Navigation */}
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="outline" size="icon" onClick={() => navigate('/home')} className="bg-white rounded-full border-slate-200">
            <ArrowLeft className="h-5 w-5 text-slate-700" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{subcategory} Providers</h1>
            <p className="text-slate-500 font-medium">{categoryName} • {providers.length} available near you</p>
          </div>
        </div>

        {/* Quick Filters */}
        <GlassCard className="p-3 bg-white shadow-sm border-slate-200 flex gap-3 overflow-x-auto">
          <Button variant="outline" className="bg-slate-50 border-slate-200 text-slate-700 whitespace-nowrap"><Filter className="w-4 h-4 mr-2" /> Sort By</Button>
          <Button variant="outline" className="bg-slate-50 border-slate-200 text-slate-700 whitespace-nowrap">Top Rated</Button>
          <Button variant="outline" className="bg-slate-50 border-slate-200 text-slate-700 whitespace-nowrap">Nearest First</Button>
          <Button variant="outline" className="bg-slate-50 border-slate-200 text-slate-700 whitespace-nowrap">Available Now</Button>
        </GlassCard>

        {/* Providers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <ServiceCard
              key={provider.id}
              provider={provider}
              onBook={handleBook}
              onChat={handleChat}
            />
          ))}
        </div>

      </div>
    </div>
  );
};