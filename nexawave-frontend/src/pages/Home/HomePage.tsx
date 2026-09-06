import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Plus, CloudSun, BarChart3, Tractor, Wheat } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { SearchBar } from '@/components/home/SearchBar';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { useAuth } from '@/context/AuthContext';
import { useMode } from '@/context/ModeContext';
import { Category } from '@/types';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { mode } = useMode();

  const handleSearch = async (query: string, location: string, radius: number) => {
    navigate('/search', { state: { query, location, radius, mode } });
  };

  const handleCategorySelect = (category: Category, subcategory: string) => {
    navigate('/services', { state: { category: category.id, categoryName: category.name, subcategory, mode } });
  };

  return (
    <div className="px-4 pb-24 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Welcome Section */}
        <GlassCard className="p-6 mt-6 border-none shadow-sm bg-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Ram Ram, {user?.name || 'Shailendra'}! 👋
              </h1>
              <p className="text-slate-500 mt-1">What are you looking for today?</p>
            </div>
            <Badge variant={mode === 'rural' ? 'rural' : 'urban'} className="px-3 py-1 text-sm shadow-sm">
              {mode === 'rural' ? '🌾 Rural' : '🏙️ Urban'} Mode
            </Badge>
          </div>
        </GlassCard>

        {/* 🚀 NAYA SECTION: QUICK ACCESS (Blinkit Style) 🚀 */}
        <div className="grid grid-cols-4 gap-3">
          <GlassCard onClick={() => navigate('/sell')} className="p-3 text-center cursor-pointer hover:border-green-400 bg-green-50 border-green-100 shadow-sm flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mb-2"><Wheat className="w-6 h-6 text-green-700" /></div>
            <span className="text-xs font-bold text-green-900 leading-tight">Sell<br/>Produce</span>
          </GlassCard>
          
          <GlassCard onClick={() => navigate('/market')} className="p-3 text-center cursor-pointer hover:border-blue-400 bg-blue-50 border-blue-100 shadow-sm flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mb-2"><BarChart3 className="w-6 h-6 text-blue-700" /></div>
            <span className="text-xs font-bold text-blue-900 leading-tight">Market<br/>Price</span>
          </GlassCard>

          <GlassCard onClick={() => navigate('/machinery')} className="p-3 text-center cursor-pointer hover:border-orange-400 bg-orange-50 border-orange-100 shadow-sm flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center mb-2"><Tractor className="w-6 h-6 text-orange-700" /></div>
            <span className="text-xs font-bold text-orange-900 leading-tight">Rent<br/>Machinery</span>
          </GlassCard>

          <GlassCard onClick={() => navigate('/weather')} className="p-3 text-center cursor-pointer hover:border-sky-400 bg-sky-50 border-sky-100 shadow-sm flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-sky-200 rounded-full flex items-center justify-center mb-2"><CloudSun className="w-6 h-6 text-sky-700" /></div>
            <span className="text-xs font-bold text-sky-900 leading-tight">Weather<br/>Alerts</span>
          </GlassCard>
        </div>

        {/* Search Section */}
        <SearchBar onSearch={handleSearch} />

        {/* Services Categories */}
        <CategoryGrid onCategorySelect={handleCategorySelect} />

      </div>
    </div>
  );
};