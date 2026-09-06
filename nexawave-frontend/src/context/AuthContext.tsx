import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserMode } from '@/types';
import { api } from '@/services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithPhone: (phone: string, otp: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  mode: UserMode;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Fallback mock user if page reloads (until we build a /profile route)
        const mockUser: User = {
          id: '1',
          name: 'Shailendra M.',
          email: 'test@example.com',
          phone: '9876543210',
          mode: 'rural',
          location: {
            latitude: 30.7333,
            longitude: 76.7794,
            address: 'Panchkula, Haryana',
            city: 'Panchkula',
            state: 'Haryana',
            pincode: '134109'
          },
          rating: 4.5,
          totalRatings: 10,
          isVerified: true,
          createdAt: new Date().toISOString()
        };
        setUser(mockUser);
      }
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Basic mock for email since we are focusing on Phone OTP
      localStorage.setItem('token', 'mock-token');
      await checkAuthStatus();
    } catch (error) {
      throw error;
    }
  };

  // 🚀 FIXED: REAL BACKEND LOGIN
  const loginWithPhone = async (phone: string, otp: string) => {
    try {
      const response = await api.post('/auth/verify-otp', { phone, otp });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
      }
    } catch (error) {
      throw new Error("Invalid OTP");
    }
  };

  const register = async (data: RegisterData) => {
    try {
      localStorage.setItem('token', 'mock-token');
      await checkAuthStatus();
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      loginWithPhone,
      register,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};