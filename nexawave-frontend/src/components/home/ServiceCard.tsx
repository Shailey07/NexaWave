import React from 'react';
import { MapPin, Star, Phone, MessageCircle } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

// Using partial any type for demo based on your PRD
interface ProviderCardProps {
  provider: any; 
  onBook: (provider: any) => void;
  onChat: (provider: any) => void;
}

export const ServiceCard: React.FC<ProviderCardProps> = ({ provider, onBook, onChat }) => {
  return (
    <GlassCard className="p-0 overflow-hidden bg-white border border-slate-200 shadow-sm flex flex-col h-full">
      {/* Top Banner & Info */}
      <div className="p-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-xl relative">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-xl">{provider.name || 'Raj Services'}</h3>
            <p className="text-blue-100 text-sm mt-1">{provider.specialty || 'Expert Plumber'}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/50">
            <span className="font-bold text-lg text-white">R</span>
          </div>
        </div>
        
        {/* Ratings Badge */}
        <div className="inline-flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mt-4">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm ml-1 font-medium">4.8 (120 reviews)</span>
        </div>
      </div>

      {/* Details Body */}
      <div className="p-5 flex-grow space-y-4">
        <div className="flex items-center text-slate-600 text-sm font-medium border-b border-slate-100 pb-4">
          <MapPin className="w-4 h-4 mr-2 text-slate-400" />
          <span>2.4 km away • Sector 14, Chandigarh</span>
        </div>

        <div className="flex justify-between items-center py-2">
          <div className="text-sm text-slate-500 font-medium">Starting Price</div>
          <div className="text-xl font-bold text-blue-600">₹250</div>
        </div>
        
        {/* Chat & Call Buttons (Blinkit Style) */}
        <div className="flex gap-3 pt-2">
          <Button 
            variant="outline" 
            className="flex-1 bg-white border-green-500 text-green-600 hover:bg-green-50 font-bold"
            onClick={() => window.open('tel:+919876543210')} // Native call integration
          >
            <Phone className="w-4 h-4 mr-2" /> Call
          </Button>
          <Button 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm"
            onClick={() => onChat(provider)}
          >
            <MessageCircle className="w-4 h-4 mr-2" /> Message
          </Button>
        </div>
      </div>
    </GlassCard>
  );
};