import React, { useState } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { useLocation as useUserLocation } from '@/hooks/useLocation';

interface SearchBarProps {
  onSearch: (query: string, location: string, radius: number) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search for services, products..." 
}) => {
  const [query, setQuery] = useState('');
  const [radius, setRadius] = useState(5);
  const { location } = useUserLocation();

  const handleSearch = () => {
    onSearch(query, location?.address || '', radius);
  };

  return (
    <GlassCard className="p-4 bg-white shadow-sm border-gray-200">
      <div className="flex flex-col md:flex-row gap-3">
        
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            variant="default"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>

        {/* Location */}
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            variant="default"
            placeholder="Location"
            value={location?.address || 'Detecting location...'}
            readOnly
            className="pl-10 h-12 bg-gray-50"
          />
        </div>

        {/* Radius Selector */}
        <div className="w-full md:w-32">
          <select
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full h-12 rounded-md bg-white border border-gray-300 text-gray-900 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm cursor-pointer"
          >
            <option value={1}>1 km</option>
            <option value={5}>5 km</option>
            <option value={10}>10 km</option>
            <option value={25}>25 km</option>
            <option value={50}>50 km</option>
          </select>
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          className="h-12 whitespace-nowrap px-6 font-bold shadow-sm bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Search className="h-4 w-4 md:mr-2 text-white" />
          <span className="hidden md:inline">Search</span>
        </Button>

        {/* Filter Button */}
        <Button variant="outline" className="h-12 w-12 p-0 shadow-sm border-gray-300 hover:bg-gray-50">
          <Filter className="h-5 w-5 text-gray-600" />
        </Button>
      </div>
    </GlassCard>
  );
};