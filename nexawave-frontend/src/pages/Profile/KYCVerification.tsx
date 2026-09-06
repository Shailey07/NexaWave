import React, { useState } from 'react';
import { ShieldCheck, Lock, Upload, FileImage } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const KYCVerification: React.FC = () => {
  const [status, setStatus] = useState('unverified');

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="p-8 bg-white border border-gray-200">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Complete KYC Verification</h1>
            <p className="text-gray-500 mt-2">Upload your documents to get the Verified Blue Tick and build trust.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStatus('pending'); }}>
            
            {/* Personal Details */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 space-y-4">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-2">1. Personal Details</h2>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Full Legal Name</label>
                <Input placeholder="As exactly printed on your Government ID" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Full Aadhaar Number</label>
                  <Input placeholder="Enter 12-digit number" maxLength={12} required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Full PAN Number</label>
                  <Input placeholder="Enter 10-character PAN" maxLength={10} required className="uppercase" />
                </div>
              </div>
            </div>

            {/* Document Uploads */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 space-y-4">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-2">2. Upload Documents</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Aadhaar Card (Front & Back)</label>
                  <label className="w-full h-32 border-2 border-dashed border-gray-300 bg-white rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-500">Tap to upload Aadhaar</span>
                    <input type="file" className="hidden" accept="image/*" multiple required />
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">PAN Card (Front)</label>
                  <label className="w-full h-32 border-2 border-dashed border-gray-300 bg-white rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                    <FileImage className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-500">Tap to upload PAN</span>
                    <input type="file" className="hidden" accept="image/*" required />
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 text-blue-800 p-4 rounded-lg flex items-start text-sm mt-4 border border-blue-100">
              <Lock className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
              <p><strong>Secure Upload:</strong> Your full details and document images are encrypted and will only be visible to NexaWave Admins for verification purposes. Once verified, numbers will be masked.</p>
            </div>

            <Button type="submit" className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-md" disabled={status === 'pending'}>
              {status === 'pending' ? 'Verification Pending Admin Approval...' : 'Submit Documents for Verification'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};