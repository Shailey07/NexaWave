import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ShieldCheck, AlertOctagon, Activity, CheckCircle, XCircle, LogOut, Search, BarChart3, Eye, FileText } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'kyc' | 'users' | 'disputes'>('kyc'); // Defaulting to KYC for demo

  // Dummy Data for Admin Operations
  const stats = [
    { label: 'Total Users', value: '1,248', icon: Users, color: 'text-blue-600' },
    { label: 'Pending KYC', value: '24', icon: ShieldCheck, color: 'text-orange-600' },
    { label: 'Active Disputes', value: '3', icon: AlertOctagon, color: 'text-red-600' },
    { label: 'Platform Revenue', value: '₹45,200', icon: BarChart3, color: 'text-green-600' },
  ];

  // Admin sees full details until verified. 
  const kycRequests = [
    { id: 'REQ-001', name: 'Ramesh Singh', type: 'Provider', aadhaar: '[Aadhaar Redacted]', pan: 'ABCDE1234F', status: 'Pending', docsUploaded: true },
    { id: 'REQ-002', name: 'Kisan Traders', type: 'Organization', aadhaar: '[Aadhaar Redacted]', pan: 'BZXCY9876G', status: 'Pending', docsUploaded: true },
  ];

  const usersList = [
    { id: 'USR-882', name: 'Shailendra M.', role: 'Buyer', verified: true, status: 'Active' },
    { id: 'USR-883', name: 'Raj Plumbing', role: 'Provider', verified: true, status: 'Active' },
  ];

  const disputes = [
    { id: 'DSP-01', txn: 'TXN-9942', user: 'Shailendra M.', provider: 'Ramesh Singh', issue: 'Tractor broke down halfway', amount: '₹2,400', status: 'Open' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 w-full absolute top-0 left-0 z-50">
      
      {/* Sidebar - Dark Premium Look */}
      <div className="w-64 bg-gray-900 text-white flex flex-col fixed h-full shadow-2xl">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold flex items-center">
            <ShieldCheck className="w-6 h-6 mr-2 text-blue-500" /> NexaWave Admin
          </h1>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Command Center</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
            <Activity className="w-5 h-5 mr-3" /> Dashboard
          </button>
          <button onClick={() => setActiveTab('kyc')} className={`w-full flex items-center p-3 rounded-lg transition-colors justify-between ${activeTab === 'kyc' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
            <div className="flex items-center"><ShieldCheck className="w-5 h-5 mr-3" /> KYC Approvals</div>
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">24</span>
          </button>
          <button onClick={() => setActiveTab('users')} className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
            <Users className="w-5 h-5 mr-3" /> User Control
          </button>
          <button onClick={() => setActiveTab('disputes')} className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'disputes' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
            <AlertOctagon className="w-5 h-5 mr-3" /> Disputes & Payouts
          </button>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button onClick={() => navigate('/admin/dashboard/login')} className="w-full flex items-center p-3 text-red-400 hover:bg-gray-800 hover:text-red-300 rounded-lg transition-colors">
            <LogOut className="w-5 h-5 mr-3" /> Secure Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 p-8">
        
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 capitalize">{activeTab}</h2>
            <p className="text-gray-500 mt-1">Manage system operations and platform health.</p>
          </div>
          <div className="flex items-center bg-white border border-gray-200 rounded-lg p-2 shadow-sm">
            <Search className="w-5 h-5 text-gray-400 ml-2" />
            <input type="text" placeholder="Search ID, User, or TXN..." className="border-none outline-none pl-3 text-sm w-64 text-gray-700" />
          </div>
        </header>

        {/* Tab Content: OVERVIEW (Unchanged) */}
        {activeTab === 'overview' && ( /* ... existing overview code ... */ 
          <div className="grid grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <Card key={i} className="p-6"><div className="flex justify-between items-start"><div><p className="text-sm font-bold text-gray-500 uppercase">{stat.label}</p><h3 className="text-3xl font-extrabold text-gray-900 mt-2">{stat.value}</h3></div><div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}><stat.icon className="w-6 h-6" /></div></div></Card>
            ))}
          </div>
        )}

        {/* Tab Content: KYC APPROVALS (UPDATED FOR FULL DOCS) */}
        {activeTab === 'kyc' && (
          <Card className="p-0 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-sm font-bold text-gray-600 uppercase">
                  <th className="p-4">Request & Name</th>
                  <th className="p-4">Submitted Documents</th>
                  <th className="p-4 text-center">Verify Docs</th>
                  <th className="p-4 text-right">Admin Decision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {kycRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <p className="font-bold text-gray-900">{req.name}</p>
                      <p className="text-xs text-gray-500">{req.id} • {req.type}</p>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-800 font-mono flex justify-between"><span className="text-gray-500 font-sans text-xs uppercase w-20">Aadhaar:</span> {req.aadhaar}</p>
                        <p className="text-sm text-gray-800 font-mono flex justify-between"><span className="text-gray-500 font-sans text-xs uppercase w-20">PAN:</span> {req.pan}</p>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <Button size="sm" variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 font-bold">
                        <Eye className="w-4 h-4 mr-2" /> View Images
                      </Button>
                    </td>
                    <td className="p-4 text-right flex justify-end gap-2 items-center h-full">
                      <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50"><XCircle className="w-4 h-4 mr-1"/> Reject</Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white shadow-sm"><CheckCircle className="w-4 h-4 mr-1"/> Approve</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        {/* User Control & Disputes tabs remain same as before... */}
        {activeTab === 'users' && (
           <Card className="p-8 text-center text-gray-500">User Control Active</Card> // (Kept condensed for brevity, use your previous users code here)
        )}
        {activeTab === 'disputes' && (
           <Card className="p-8 text-center text-gray-500">Disputes Active</Card> // (Kept condensed for brevity, use your previous disputes code here)
        )}

      </div>
    </div>
  );
};