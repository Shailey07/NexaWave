import React, { useState } from 'react';
import { Search, Info } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

export const MachineryPage: React.FC = () => {
  const [driverMode, setDriverMode] = useState<'with' | 'without'>('with');

  const machinery = [
    { id: 1, name: 'Mahindra 575 DI Tractor', rating: 4.9, distance: '2.5', priceWith: 1200, priceWithout: 800, unit: 'hour' },
    { id: 2, name: 'Swaraj 744 FE Tractor', rating: 4.7, distance: '4.1', priceWith: 1100, priceWithout: 750, unit: 'hour' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Machinery Rental</h1>
            <p className="text-gray-500 mt-1">Rent tractors, harvesters, and equipment instantly.</p>
          </div>
          
          <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm w-full md:w-auto">
            <button onClick={() => setDriverMode('with')} className={`flex-1 md:w-32 py-2 text-sm font-bold rounded-md transition-all ${driverMode === 'with' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>With Driver</button>
            <button onClick={() => setDriverMode('without')} className={`flex-1 md:w-32 py-2 text-sm font-bold rounded-md transition-all ${driverMode === 'without' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>Without Driver</button>
          </div>
        </div>

        {driverMode === 'without' && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl flex items-start gap-3">
            <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800 font-medium leading-relaxed">
              <strong>Notice:</strong> Renting without a driver requires mandatory pre-pickup and post-return condition photos. You will be responsible for fuel and any operational damages during the rental period.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {machinery.map((item) => (
            <GlassCard key={item.id} className="p-0 bg-white border-gray-200 overflow-hidden flex flex-col">
              <div className="h-48 bg-gray-200 relative">
                <img src={`/api/placeholder/400/250`} alt={item.name} className="w-full h-full object-cover" />
                <Badge className="absolute top-3 left-3 bg-white text-gray-900 border-none shadow-sm">{item.distance} km away</Badge>
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div className="space-y-2 mb-6">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                  <p className="text-2xl font-extrabold text-green-600">
                    ₹{driverMode === 'with' ? item.priceWith : item.priceWithout}
                    <span className="text-sm font-medium text-gray-500"> / {item.unit}</span>
                  </p>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-base py-6 shadow-sm">
                  Request to Rent
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>

      </div>
    </div>
  );
};