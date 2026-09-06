import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ModeToggle } from '@/components/home/ModeToggle';
import { useAuth } from '@/context/AuthContext';
import { useMode } from '@/context/ModeContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { mode } = useMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isLandingPage = location.pathname === '/';

  const navLinks = [
    { path: '/home', label: 'Home' },
    { path: '/buy', label: 'Buy' },
    { path: '/sell', label: 'Sell' },
    { path: '/services', label: 'Services' },
    { path: '/quotes', label: 'Quotes' },
  ];

  // Ye magic line color switch karegi! Urban = Deep Blue, Rural = Fresh Green
  const headerTheme = mode === 'rural' ? 'bg-green-600' : 'bg-[#0052cc]';
  const hoverTheme = mode === 'rural' ? 'hover:bg-green-700' : 'hover:bg-blue-700';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 shadow-md transition-colors duration-300 ${headerTheme}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-white p-1 rounded-md shadow-sm">
              <img 
                src="/a749135c-5273-4c5e-b344-d1bbc3d5ed40.png" 
                alt="NexaWave Logo" 
                className="h-8 w-auto object-contain" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x50?text=Logo+Missing';
                }}
              />
            </div>
            <span className="text-xl font-bold text-white hidden sm:block tracking-wide drop-shadow-md">
              NexaWave
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isLandingPage && isAuthenticated && (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium transition-colors pb-1 border-b-2 ${
                      location.pathname === link.path 
                        ? 'text-white border-white' 
                        : 'text-white/80 border-transparent hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            <ModeToggle />
            
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-1">
                <Button variant="ghost" size="icon" className={`text-white ${hoverTheme}`}>
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className={`text-white ${hoverTheme}`}>
                  <Bell className="h-5 w-5" />
                </Button>
                <Link to="/profile">
                  <Button variant="ghost" size="icon" className={`text-white ${hoverTheme}`}>
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" className={`text-white font-medium ${hoverTheme}`}>Login</Button>
                </Link>
                <Link to="/register">
                  <Button className={`bg-white font-bold shadow-sm ${mode === 'rural' ? 'text-green-700 hover:bg-green-50' : 'text-blue-700 hover:bg-blue-50'}`}>
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className={`md:hidden text-white ${hoverTheme}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};