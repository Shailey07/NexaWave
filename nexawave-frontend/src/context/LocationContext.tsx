import React, { createContext, useContext, useState, useEffect } from 'react';

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface LocationContextType {
  location: LocationData | null;
  isLoading: boolean;
  error: string | null;
  requestLocation: () => void;
  setLocation: (location: LocationData) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocationState] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedLocation = localStorage.getItem('user-location');
    if (savedLocation) {
      setLocationState(JSON.parse(savedLocation));
    } else {
      requestLocation();
    }
  }, []);

  const requestLocation = () => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Reverse geocoding (you can use Google Maps API or any other service)
          const locationData: LocationData = {
            latitude,
            longitude,
            address: 'Current Location',
            city: 'Panchkula',
            state: 'Haryana',
            pincode: '134109'
          };

          setLocationState(locationData);
          localStorage.setItem('user-location', JSON.stringify(locationData));
        } catch (error) {
          setError('Failed to get location details');
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        setError('Location access denied');
        setIsLoading(false);
      }
    );
  };

  const setLocation = (newLocation: LocationData) => {
    setLocationState(newLocation);
    localStorage.setItem('user-location', JSON.stringify(newLocation));
  };

  return (
    <LocationContext.Provider value={{
      location,
      isLoading,
      error,
      requestLocation,
      setLocation
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) throw new Error('useLocation must be used within LocationProvider');
  return context;
};
