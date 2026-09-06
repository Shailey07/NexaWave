import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Wheat, Info, MapPin, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export const SellPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/home'); 
      alert('Your produce has been listed successfully! Buyers can now contact you.');
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20 pb-24 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-6">
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
            <Wheat className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Sell Your Produce</h1>
          <p className="text-gray-500 mt-1">List your crops directly for buyers, mills, and traders.</p>
        </div>

        {/* explicitly forcing background white here too */}
        <Card className="p-8 bg-white shadow-sm border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Organization Subscription Toggle */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6 transition-all hover:bg-blue-100/50 cursor-pointer">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 mt-0.5 rounded border-blue-300 text-blue-600 focus:ring-blue-600 bg-white" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-blue-900 flex items-center">
                      <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                      Register as Organization
                    </p>
                    <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded">₹500/month</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">For Fertilizer, Seed companies, and professional traders to get verified seller badges.</p>
                </div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Crop Type / Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-12 rounded-lg border border-gray-300 bg-white px-3 text-gray-900 focus:ring-2 focus:ring-green-600 shadow-sm"
                required
              >
                <option value="">Select Crop Category</option>
                <option value="anaaj">Grains (Anaaj - Wheat, Rice, Maize)</option>
                <option value="daale">Pulses (Daale - Moong, Chana, Urad)</option>
                <option value="tilhan">Oilseeds (Tilhan - Mustard, Soybean)</option>
                <option value="cashcrop">Cash Crops (Sugarcane, Cotton)</option>
                <option value="vegetables">Vegetables & Fruits</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Specific Crop Name</label>
              <Input placeholder="e.g. Sharbati Wheat, Basmati Rice, Mustard" className="bg-white text-gray-900 border-gray-300 shadow-sm" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Total Quantity</label>
                <Input type="number" placeholder="e.g. 50" className="bg-white text-gray-900 border-gray-300 shadow-sm" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Unit</label>
                <select className="w-full h-12 rounded-lg border border-gray-300 bg-white px-3 text-gray-900 shadow-sm">
                  <option>Quintals</option>
                  <option>Tons</option>
                  <option>Kg</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Expected Price (₹)</label>
              <Input type="number" placeholder="Price per Quintal (e.g. 2400)" className="bg-white text-gray-900 border-gray-300 shadow-sm" required />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-gray-500" /> Pickup Location
              </label>
              <Input placeholder="Village, District (e.g. Village Palwal, Haryana)" className="bg-white text-gray-900 border-gray-300 shadow-sm" required />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Upload Photos</label>
              <label className="w-full h-32 border-2 border-dashed border-gray-300 bg-gray-50 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-500">Tap to upload photos of your crop</span>
                <input type="file" className="hidden" multiple accept="image/*" />
              </label>
            </div>

            <div className="bg-green-50 p-4 rounded-xl flex items-start gap-3 mt-2 border border-green-100">
              <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-green-800 font-medium leading-relaxed">
                NexaWave doesn't charge commission on agricultural produce. Buyers will contact you directly. Ensure your photos clearly show the crop quality.
              </p>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-14 bg-[#00A86B] hover:bg-[#008f5a] text-white text-lg font-bold shadow-md rounded-xl mt-6"
            >
              {isSubmitting ? 'Listing your crop...' : 'Publish Listing'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};