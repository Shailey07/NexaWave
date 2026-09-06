import React from 'react';
import { Settings, User, Truck, Wrench, Sprout, Tractor, Leaf, Home, Sparkles, UtensilsCrossed, Briefcase, Music, Car, Users } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { useMode } from '@/context/ModeContext';
import { RURAL_CATEGORIES, URBAN_CATEGORIES } from '@/utils/constants';
import { Category } from '@/types';

interface CategoryGridProps {
  onCategorySelect: (category: Category, subcategory: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelect }) => {
  const { mode } = useMode();
  const categories = mode === 'rural' ? RURAL_CATEGORIES : URBAN_CATEGORIES;

  const getIconComponent = (iconName: string, className: string) => {
    const iconMap: Record<string, React.ElementType> = {
      'Tractor': Tractor, 'Users': Users, 'Truck': Truck, 'Leaf': Leaf,
      'Home': Home, 'Sparkles': Sparkles, 'UtensilsCrossed': UtensilsCrossed,
      'Briefcase': Briefcase, 'Music': Music, 'Car': Car,
    };
    const Icon = iconMap[iconName] || Settings;
    return <Icon className={className} />;
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Services Provided</h2>
        <p className="text-slate-500 mt-1">One platform, endless possibilities for {mode} communities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <GlassCard key={category.id} className="p-0 overflow-hidden bg-white border border-slate-200">
            {/* Category Header */}
            <div className="p-4 border-b border-slate-100 flex items-center space-x-3 bg-slate-50">
              <div className={`p-2 rounded-lg ${category.color}`}>
                {getIconComponent(category.icon, "h-5 w-5 text-white")}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{category.name}</h3>
            </div>

            {/* Subcategories List */}
            <div className="p-4 space-y-2">
              {category.subcategories.map((sub, idx) => (
                <button
                  key={idx}
                  onClick={() => onCategorySelect(category, sub)}
                  className="w-full flex items-center p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                >
                  <Settings className="h-4 w-4 text-emerald-600 mr-3" />
                  <span className="text-sm font-medium text-slate-700">{sub}</span>
                </button>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};