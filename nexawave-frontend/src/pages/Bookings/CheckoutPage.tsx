import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, ShieldCheck, ChevronRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [isBooking, setIsBooking] = useState(false);

  const handleConfirm = () => {
    setIsBooking(true);
    setTimeout(() => {
      navigate('/tracking'); // Go to live tracking
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-20 pb-24 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Confirm Booking</h1>

        {/* Service Summary */}
        <GlassCard className="p-6 bg-white border-gray-200">
          <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Tractor with Cultivator</h2>
              <p className="text-gray-500 font-medium">Provider: Ramesh Singh</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">₹1,200</p>
              <p className="text-xs text-gray-500 font-medium uppercase">Per Acre</p>
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">Schedule Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Date</p>
                  <p className="text-sm font-bold text-gray-900">Tomorrow, 12 Oct</p>
                </div>
              </div>
              <div className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <Clock className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Time</p>
                  <p className="text-sm font-bold text-gray-900">08:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Location */}
        <GlassCard className="p-6 bg-white border-gray-200 flex items-center justify-between cursor-pointer hover:border-blue-300">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold">Service Location</p>
              <p className="text-sm font-bold text-gray-900">Farm Plot 42, Sector 14, Chandigarh</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </GlassCard>

        {/* DPDP Privacy / Trust */}
        <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-green-800 font-medium leading-relaxed">
            Your exact location and contact details are masked and will only be shared with the provider once the booking is confirmed.
          </p>
        </div>

        {/* Action */}
        <Button 
          onClick={handleConfirm}
          disabled={isBooking}
          className="w-full bg-[#00A86B] hover:bg-[#008f5a] text-white py-6 text-lg font-bold shadow-md"
        >
          {isBooking ? 'Processing Booking...' : 'Confirm Booking'}
        </Button>
      </div>
    </div>
  );
};