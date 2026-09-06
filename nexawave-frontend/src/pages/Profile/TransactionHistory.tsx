import React from 'react';
import { AlertOctagon, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const TransactionHistory: React.FC = () => {
  const transactions = [
    { id: 'TXN-9942', service: 'Tractor Rent (2 Hrs)', provider: 'Ramesh Singh', amount: 2400, date: '10 Sep 2026', status: 'Completed' },
    { id: 'TXN-8821', service: 'Plumbing Repair', provider: 'Raj Plumbing', amount: 350, date: '05 Sep 2026', status: 'Completed' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
          <p className="text-gray-500">Your completed jobs and payments. (Read-only)</p>
        </div>

        <div className="space-y-4">
          {transactions.map((txn) => (
            <Card key={txn.id} className="p-6 bg-white border-gray-200 flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">{txn.id} • {txn.date}</p>
                <h3 className="text-lg font-bold text-gray-900">{txn.service}</h3>
                <p className="text-sm text-gray-600">Provider: {txn.provider}</p>
                <p className="text-sm font-bold text-green-600 flex items-center mt-2">
                  <CheckCircle2 className="w-4 h-4 mr-1" /> Paid ₹{txn.amount}
                </p>
              </div>

              <div className="flex justify-end border-t md:border-none pt-4 md:pt-0 border-gray-100">
                <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 bg-white shadow-sm font-bold">
                  <AlertOctagon className="w-4 h-4 mr-2" /> Raise Dispute
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};