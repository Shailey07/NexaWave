import React from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/ui/GlassCard';

export const Footer: React.FC = () => {
  return (
    <footer className="p-4 mt-16">
      <GlassCard className="px-6 py-8 bg-slate-900 border-none text-slate-300">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">NEXAWAVE</h3>
            <p className="text-slate-400 mb-4 max-w-sm">
              Connecting communities through local discovery. Bridging the gap between rural and urban services.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <div className="space-y-2 flex flex-col">
              <Link to="/about" className="text-slate-400 hover:text-white transition-colors">About Us</Link>
              <Link to="/help" className="text-slate-400 hover:text-white transition-colors">Help Center</Link>
              <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Legal</h4>
            <div className="space-y-2 flex flex-col">
              <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} NEXAWAVE. All rights reserved.
          </p>
        </div>
      </GlassCard>
    </footer>
  );
};