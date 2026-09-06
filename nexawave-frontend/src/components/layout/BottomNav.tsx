import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Plus, MessageSquare, User } from 'lucide-react';
import { useMode } from '@/context/ModeContext'; 

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const { mode } = useMode();

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/buy', icon: ShoppingBag, label: 'Buy' },
    { path: '/sell', icon: Plus, label: 'Sell' },
    { path: '/quotes', icon: MessageSquare, label: 'Quotes' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'fill-blue-50/50' : ''}`} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};