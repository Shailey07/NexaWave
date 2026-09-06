import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Clock, Mic, Camera, Video } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useMode } from '@/context/ModeContext';

export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mode } = useMode();
  const [requirement, setRequirement] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hardcoded for UI demo
  const service = {
    title: 'Professional Plumbing Services',
    provider: 'Raj Plumbing',
    rating: 4.8,
    reviews: 124,
    distance: 1.2,
    basePrice: 250,
    visitCharge: 50,
    about: 'Expert plumbing services for all your household and commercial needs. We fix leaks, install pipes, and repair motors with 100% guarantee.'
  };

  const handleSubmitRequest = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/quotes'); // Redirects to quotes page to see incoming bids
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Service Info Card */}
        <Card className="p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 h-48 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
              <img src="/api/placeholder/400/300" alt="Service" className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{service.title}</h1>
                  <p className="text-blue-600 font-medium">{service.provider}</p>
                </div>
                <Badge variant={mode === 'rural' ? 'rural' : 'urban'}>{mode.toUpperCase()}</Badge>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="flex items-center"><Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500"/> {service.rating} ({service.reviews} Reviews)</span>
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-1"/> {service.distance} km away</span>
                <span className="flex items-center"><Clock className="w-4 h-4 mr-1"/> Available Now</span>
              </div>

              <p className="text-gray-600 leading-relaxed">{service.about}</p>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Starting from</p>
                  <p className="text-2xl font-bold text-gray-900">₹{service.basePrice}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Visit Charge (If Cancelled)</p>
                  <p className="text-lg font-bold text-gray-900">₹{service.visitCharge}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* The "Describe Requirement" Engine */}
        <Card className="p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Describe Your Requirement</h2>
          
          <div className="space-y-4">
            <div className="relative">
              <textarea 
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                placeholder="E.g., My kitchen tap is leaking constantly and I need it replaced..."
                className="w-full h-32 p-4 border border-gray-300 rounded-xl bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
              />
            </div>

            {/* Added Video Option Here */}
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50 text-xs sm:text-sm font-semibold">
                <Mic className="w-4 h-4 sm:mr-2" /> <span className="hidden sm:inline">Voice</span>
              </Button>
              <Button variant="outline" className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50 text-xs sm:text-sm font-semibold">
                <Camera className="w-4 h-4 sm:mr-2" /> <span className="hidden sm:inline">Photo</span>
              </Button>
              <Button variant="outline" className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50 text-xs sm:text-sm font-semibold">
                <Video className="w-4 h-4 sm:mr-2" /> <span className="hidden sm:inline">Video</span>
              </Button>
            </div>

            <Button 
              onClick={handleSubmitRequest}
              disabled={!requirement || isSubmitting}
              className={`w-full py-6 text-lg font-bold ${mode === 'rural' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {isSubmitting ? 'Finding nearby providers...' : 'Get Quotes Now'}
            </Button>
          </div>
        </Card>

      </div>
    </div>
  );
};