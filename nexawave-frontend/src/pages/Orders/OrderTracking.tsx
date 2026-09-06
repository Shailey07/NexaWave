import React from 'react';
import { CheckCircle2, Circle, Navigation, Phone, MessageSquare } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';

export const OrderTracking: React.FC = () => {
  const steps = [
    { id: 1, title: 'Booking Confirmed', desc: 'Your request has been accepted.', time: '10:05 AM', completed: true },
    { id: 2, title: 'Provider on the way', desc: 'Ramesh is heading to your location.', time: '10:30 AM', completed: true },
    { id: 3, title: 'Arrived', desc: 'Provider has reached the location.', time: 'Pending', completed: false },
    { id: 4, title: 'In Progress', desc: 'Work is currently ongoing.', time: 'Pending', completed: false },
    { id: 5, title: 'Completed', desc: 'Awaiting final payment & rating.', time: 'Pending', completed: false },
  ];

  return (
    <div className="min-h-screen pt-20 pb-24 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Active Order Header */}
        <GlassCard className="p-6 bg-[#0052cc] text-white border-none shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-200 text-sm font-medium uppercase tracking-wide mb-1">Order #NW-8924</p>
              <h2 className="text-2xl font-bold">On the way</h2>
            </div>
            <Navigation className="w-10 h-10 text-white/50" />
          </div>
        </GlassCard>

        {/* Provider Connect Card */}
        <GlassCard className="p-4 bg-white border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700">RS</div>
            <div>
              <p className="font-bold text-gray-900">Ramesh Singh</p>
              <p className="text-xs text-gray-500 font-medium">Tractor Operator • 4.8 ★</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="outline" className="border-gray-200 text-gray-700 rounded-full"><Phone className="w-4 h-4" /></Button>
            <Button size="icon" className="bg-blue-600 text-white rounded-full"><MessageSquare className="w-4 h-4" /></Button>
          </div>
        </GlassCard>

        {/* Vertical Timeline */}
        <GlassCard className="p-8 bg-white border-gray-200">
          <h3 className="font-bold text-gray-900 mb-8 text-lg">Live Status</h3>
          <div className="relative border-l-2 border-gray-100 ml-4 space-y-8">
            {steps.map((step, index) => (
              <div key={step.id} className="relative pl-6">
                <span className="absolute -left-[13px] bg-white pt-1">
                  {step.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500 bg-white" />
                  ) : (
                    <Circle className={`w-6 h-6 bg-white ${index === 2 ? 'text-blue-500 animate-pulse' : 'text-gray-300'}`} />
                  )}
                </span>
                <div>
                  <h4 className={`text-base font-bold ${step.completed || index === 2 ? 'text-gray-900' : 'text-gray-400'}`}>{step.title}</h4>
                  <p className={`text-sm font-medium mt-1 ${step.completed || index === 2 ? 'text-gray-600' : 'text-gray-400'}`}>{step.desc}</p>
                  <p className="text-xs text-gray-400 font-bold mt-2">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

      </div>
    </div>
  );
};