import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export const AdminLogin: React.FC = () => {
  const [key, setKey] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (key === 'supersecret123') { // Secret Access Key
      navigate('/admin/dashboard/main');
    } else {
      alert('Access Denied: Unauthorized access attempt logged.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] p-4">
      <Card className="w-full max-w-md p-8 shadow-2xl border-0">
        
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
            <ShieldAlert className="w-8 h-8 text-red-600" />
          </div>
          {/* Text is now explicitly dark so it shows clearly on the white card */}
          <h1 className="text-2xl font-bold text-gray-900">Restricted Area</h1>
          <p className="text-gray-500 mt-2 text-sm font-medium">NexaWave Admin Operations</p>
        </div>

        <form onSubmit={handleAdminLogin} className="space-y-6">
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                type="password"
                placeholder="Enter Admin Access Key" 
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-300 text-gray-900 h-12 focus:ring-2 focus:ring-blue-600 shadow-sm"
              />
            </div>
          </div>
          <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-md">
            Verify & Enter
          </Button>
        </form>
        
      </Card>
    </div>
  );
};