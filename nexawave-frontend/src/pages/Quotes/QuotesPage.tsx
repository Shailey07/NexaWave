import React, { useState } from 'react';
import { CheckCircle, XCircle, MapPin, Star, MessageSquare } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';

export const QuotesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('received');

  // Dummy Quotes Data
  const quotes = [
    {
      id: 1,
      provider: 'Raj Plumbing',
      rating: 4.8,
      distance: '1.2 km',
      time: 'Available in 30 mins',
      breakdown: { labour: 200, parts: 150, total: 350 },
      status: 'pending'
    },
    {
      id: 2,
      provider: 'Sharma Repairs',
      rating: 4.5,
      distance: '3.4 km',
      time: 'Available Today 4 PM',
      breakdown: { labour: 150, parts: 150, total: 300 },
      status: 'negotiating',
      lastOffer: 280
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Quotes</h1>
          <div className="bg-white p-1 rounded-lg border border-gray-200 flex shadow-sm">
            <button onClick={() => setActiveTab('received')} className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'received' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'}`}>Received Quotes</button>
            <button onClick={() => setActiveTab('sent')} className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'sent' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'}`}>Sent Quotes</button>
          </div>
        </div>

        {/* Quote Comparison Engine */}
        <div className="grid md:grid-cols-2 gap-6">
          {quotes.map((quote) => (
            <GlassCard key={quote.id} className="p-6 bg-white border-gray-200 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{quote.provider}</h3>
                    <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                      <span className="flex items-center"><Star className="w-3 h-3 text-yellow-500 mr-1 fill-yellow-500"/>{quote.rating}</span>
                      <span className="flex items-center"><MapPin className="w-3 h-3 mr-1"/>{quote.distance}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-blue-600">₹{quote.status === 'negotiating' ? quote.lastOffer : quote.breakdown.total}</p>
                    <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mt-1">{quote.time}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Quote Breakdown</p>
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Labour Charge</span><span className="font-medium text-gray-900">₹{quote.breakdown.labour}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Estimated Parts</span><span className="font-medium text-gray-900">₹{quote.breakdown.parts}</span></div>
                  <div className="flex justify-between text-sm border-t border-gray-200 pt-2 mt-2"><span className="font-bold text-gray-900">Total</span><span className="font-bold text-gray-900">₹{quote.breakdown.total}</span></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <Button variant="outline" className="w-full bg-white border-gray-300 text-gray-700">
                  <MessageSquare className="w-4 h-4 mr-2" /> Negotiate
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                  <CheckCircle className="w-4 h-4 mr-2" /> Accept & Book
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};