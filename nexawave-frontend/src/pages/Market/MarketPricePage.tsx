import React, { useState } from 'react';
import { Search, TrendingUp, TrendingDown, Minus, MapPin } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const MarketPricePage: React.FC = () => {
  const [search, setSearch] = useState('');

  const marketData = [
    { id: 1, crop: 'Wheat (Gehu)', price: '2,400', trend: 'up', change: '+50', date: '06 Sep 2026' },
    { id: 2, crop: 'Rice (Chawal)', price: '3,000', trend: 'stable', change: '0', date: '06 Sep 2026' },
    { id: 3, crop: 'Sugarcane', price: '3,500', trend: 'up', change: '+100', date: '05 Sep 2026' },
    { id: 4, crop: 'Potato', price: '1,200', trend: 'down', change: '-100', date: '06 Sep 2026' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Market Price Reference</h1>
            <p className="text-gray-500 mt-1 flex items-center"><MapPin className="w-4 h-4 mr-1"/> APMC Mandi, Rajasthan</p>
          </div>
        </div>

        <GlassCard className="p-4 bg-white shadow-sm flex gap-4">
          <Input placeholder="Search crop (e.g. Wheat, Tomato)..." className="flex-1" value={search} onChange={(e) => setSearch(e.target.value)} />
          <Button className="bg-blue-600 hover:bg-blue-700 text-white"><Search className="w-4 h-4 mr-2"/>Search</Button>
        </GlassCard>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-4 bg-gray-50 p-4 border-b border-gray-200 font-bold text-gray-700 text-sm uppercase">
            <div className="col-span-2">Crop / Produce</div>
            <div>Price (₹/Quintal)</div>
            <div>Trend</div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {marketData.map((item) => (
              <div key={item.id} className="grid grid-cols-4 p-4 items-center hover:bg-gray-50 transition-colors">
                <div className="col-span-2 font-semibold text-gray-900">{item.crop} <span className="block text-xs text-gray-400 font-normal mt-0.5">Updated: {item.date}</span></div>
                <div className="font-bold text-gray-900 text-lg">₹{item.price}</div>
                <div>
                  {item.trend === 'up' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800"><TrendingUp className="w-4 h-4 mr-1"/> {item.change}</span>}
                  {item.trend === 'down' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800"><TrendingDown className="w-4 h-4 mr-1"/> {item.change}</span>}
                  {item.trend === 'stable' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800"><Minus className="w-4 h-4 mr-1"/> Stable</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <p className="text-sm text-blue-800 font-medium italic">
            *Market prices are provided as reference information and may vary by location, quality, and transaction terms. Not an official guarantee.
          </p>
        </div>
      </div>
    </div>
  );
};