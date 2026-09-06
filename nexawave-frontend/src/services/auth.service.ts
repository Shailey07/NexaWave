import { api } from './api';
import { User, UserMode } from '@/types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface PhoneLoginCredentials {
  phone: string;
  otp: string;
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

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },

  async loginWithPhone(credentials: PhoneLoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post('/auth/login-phone', credentials);
    return data;
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const { data } = await api.post('/auth/register', userData);
    return data;
  },

  async sendOtp(phone: string): Promise<void> {
    await api.post('/auth/send-otp', { phone });
  },

  async verifyOtp(phone: string, otp: string): Promise<void> {
    await api.post('/auth/verify-otp', { phone, otp });
  },

  async getProfile(): Promise<User> {
    const { data } = await api.get('/auth/profile');
    return data;
  },

  async updateProfile(updates: Partial<User>): Promise<User> {
    const { data } = await api.put('/auth/profile', updates);
    return data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },

  async refreshToken(): Promise<string> {
    const { data } = await api.post('/auth/refresh');
    return data.token;
  }
};
