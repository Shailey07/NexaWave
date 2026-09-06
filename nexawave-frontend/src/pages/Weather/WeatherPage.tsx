import React, { useState, useEffect } from 'react';
import { CloudRain, Wind, Droplets, AlertTriangle, Sun, Cloud, MapPin } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { useLocation } from '@/hooks/useLocation';
import { api } from '@/services/api';
import { Loader } from '@/components/common/Loader';

export const WeatherPage: React.FC = () => {
  const { location } = useLocation();
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLiveWeather = async () => {
      // Agar location nahi hai toh default Chandigarh ke coordinates bhej denge
      const lat = location?.latitude || 30.7333;
      const lon = location?.longitude || 76.7794;

      try {
        const response = await api.get('/crops/weather-advisory', {
          params: { latitude: lat, longitude: lon }
        });
        
        if (response.data.success) {
          setWeatherData(response.data.advisory);
        }
      } catch (error) {
        console.error("Weather fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLiveWeather();
  }, [location]);

  if (isLoading) {
    return <Loader text="Fetching live weather data from satellite..." fullScreen />;
  }

  if (!weatherData) {
    return (
      <div className="min-h-screen pt-24 pb-24 px-4 bg-gray-50 flex justify-center items-center">
        <p className="text-gray-500">Failed to load weather data. Check your API key.</p>
      </div>
    );
  }

  // Dynamic icon based on weather condition
  const WeatherIcon = () => {
    if (weatherData.condition === 'Rain' || weatherData.condition === 'Drizzle') {
      return <CloudRain className="w-6 h-6 mr-2" />;
    } else if (weatherData.condition === 'Clouds') {
      return <Cloud className="w-6 h-6 mr-2" />;
    } else {
      return <Sun className="w-6 h-6 mr-2" />;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Farming Weather Advisory</h1>
          <p className="text-gray-500 mt-1 flex items-center">
            <MapPin className="w-4 h-4 mr-1"/> 
            Live updates for {location?.city || 'Chandigarh'}
          </p>
        </div>

        {/* LIVE WEATHER CARD */}
        <GlassCard className="p-8 bg-gradient-to-br from-blue-500 to-blue-700 text-white border-none shadow-md relative overflow-hidden">
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-blue-100 font-medium mb-2 uppercase tracking-wide">Current Weather</p>
              <h2 className="text-6xl font-extrabold tracking-tighter">
                {Math.round(weatherData.temperature)}°C
              </h2>
              <p className="text-xl font-medium mt-2 flex items-center">
                <WeatherIcon /> {weatherData.condition}
              </p>
            </div>
            {weatherData.condition === 'Rain' ? (
              <CloudRain className="h-24 w-24 text-white/20 absolute right-8" />
            ) : (
              <Sun className="h-24 w-24 text-white/20 absolute right-8" />
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-blue-400/30 relative z-10">
            <div>
              <p className="text-blue-200 text-sm flex items-center"><Droplets className="w-4 h-4 mr-1"/> Humidity</p>
              <p className="font-bold text-xl">{weatherData.humidity}%</p>
            </div>
            <div>
              <p className="text-blue-200 text-sm flex items-center"><AlertTriangle className="w-4 h-4 mr-1"/> System Advisory</p>
              <p className="font-bold text-sm leading-tight mt-1">{weatherData.advisory}</p>
            </div>
          </div>
        </GlassCard>

        {/* DYNAMIC ALERTS */}
        <h2 className="text-xl font-bold text-gray-900 pt-4">⚠️ Smart Farming Alerts</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {weatherData.condition === 'Rain' ? (
            <GlassCard className="p-5 border-red-200 bg-red-50/50">
              <h3 className="font-bold text-red-800 flex items-center mb-2"><AlertTriangle className="w-4 h-4 mr-2"/> Spraying Conditions</h3>
              <p className="text-sm text-red-700">Rain detected. Strictly avoid pesticide or fertilizer spraying today as it will wash away.</p>
            </GlassCard>
          ) : (
            <GlassCard className="p-5 border-green-200 bg-green-50/50">
              <h3 className="font-bold text-green-800 flex items-center mb-2"><Cloud className="w-4 h-4 mr-2"/> Spraying Conditions</h3>
              <p className="text-sm text-green-700">Clear weather. Safe to proceed with scheduled pesticide or fertilizer spraying.</p>
            </GlassCard>
          )}

          {weatherData.temperature > 35 ? (
            <GlassCard className="p-5 border-orange-200 bg-orange-50/50">
              <h3 className="font-bold text-orange-800 flex items-center mb-2"><Sun className="w-4 h-4 mr-2"/> Extreme Heat Warning</h3>
              <p className="text-sm text-orange-700">High temperatures detected. Ensure adequate irrigation for crops to prevent heat stress.</p>
            </GlassCard>
          ) : (
            <GlassCard className="p-5 border-blue-200 bg-blue-50/50">
              <h3 className="font-bold text-blue-800 flex items-center mb-2"><Wind className="w-4 h-4 mr-2"/> Favorable Conditions</h3>
              <p className="text-sm text-blue-700">Temperature is optimal. Good conditions for general field work and harvesting.</p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
};