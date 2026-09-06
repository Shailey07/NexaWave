import React, { useState } from 'react';
import { User as UserIcon, ShieldCheck, MapPin, Package, Settings, LogOut } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('activity');

  return (
    <div className="min-h-screen pt-20 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* User Identity Card */}
        <GlassCard className="p-8 bg-white border-gray-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          
          <div className="relative pt-12 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-md flex items-center justify-center shrink-0">
              <UserIcon className="w-10 h-10 text-gray-400" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{user?.name || 'Shailendra'}</h1>
                <ShieldCheck className="w-5 h-5 text-blue-500" /> {/* Blue Tick */}
              </div>
              <p className="text-gray-500 font-medium">{user?.phone || '+91 98765 43210'}</p>
              <div className="flex items-center justify-center md:justify-start text-sm text-gray-500 mt-2 font-medium">
                <MapPin className="w-4 h-4 mr-1" /> Chandigarh, India
              </div>
            </div>

            <Button variant="outline" onClick={logout} className="border-red-200 text-red-600 hover:bg-red-50 font-bold shrink-0">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </GlassCard>

        {/* Tabs */}
        <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
          <button onClick={() => setActiveTab('activity')} className={`flex-1 py-2.5 text-sm font-bold rounded-md transition-all ${activeTab === 'activity' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>My Activity</button>
          <button onClick={() => setActiveTab('listings')} className={`flex-1 py-2.5 text-sm font-bold rounded-md transition-all ${activeTab === 'listings' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>My Listings</button>
          <button onClick={() => setActiveTab('settings')} className={`flex-1 py-2.5 text-sm font-bold rounded-md transition-all ${activeTab === 'settings' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>Settings</button>
        </div>

        {/* Tab Content */}
        {activeTab === 'activity' && (
          <GlassCard className="p-8 text-center border-dashed border-2 bg-gray-50 border-gray-200">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900">No Recent Activity</h3>
            <p className="text-gray-500 text-sm mt-1">Your bookings and orders will appear here.</p>
          </GlassCard>
        )}
        
        {activeTab === 'settings' && (
          <GlassCard className="p-6 bg-white border-gray-200 space-y-4">
            <Button variant="outline" className="w-full justify-start h-14 bg-gray-50 border-gray-200 font-bold text-gray-700">
              <Settings className="w-5 h-5 mr-3 text-gray-500" /> Account Preferences
            </Button>
            <Button variant="outline" className="w-full justify-start h-14 bg-gray-50 border-gray-200 font-bold text-gray-700">
              <ShieldCheck className="w-5 h-5 mr-3 text-blue-500" /> KYC & Verification
            </Button>
          </GlassCard>
        )}

      </div>
    </div>
  );
};