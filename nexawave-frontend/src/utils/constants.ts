import { Category, UserMode } from '@/types';

export const RURAL_CATEGORIES: Category[] = [
  {
    id: 'agri-machinery',
    name: 'Agricultural Machinery',
    icon: 'Tractor',
    color: 'bg-emerald-600',
    mode: 'rural',
    subcategories: ['Tractor', 'Rotavator', 'Thresher', 'Harvester', 'Seed Drill']
  },
  {
    id: 'farm-workers',
    name: 'Farm Workers',
    icon: 'Users',
    color: 'bg-blue-500',
    mode: 'rural',
    subcategories: ['Harvesting Labor', 'Irrigation Workers', 'Planting Crew', 'Weeding Staff', 'Crop Spraying']
  },
  {
    id: 'transport',
    name: 'Transport',
    icon: 'Truck',
    color: 'bg-amber-500',
    mode: 'rural',
    subcategories: ['Mini Truck', 'Pickup Vehicle', 'Tractor Trolley', 'Goods Carrier', 'Tempo/Auto']
  },
  {
    id: 'agri-support',
    name: 'Agricultural Support',
    icon: 'Leaf',
    color: 'bg-rose-500',
    mode: 'rural',
    subcategories: ['Fertilizer Suppliers', 'Seed Suppliers', 'Veterinary Services', 'Pesticide Dealers', 'Soil Testing']
  }
];

export const URBAN_CATEGORIES: Category[] = [
  {
    id: 'home-services',
    name: 'Home Services',
    icon: 'Home',
    color: 'bg-blue-600',
    mode: 'urban',
    subcategories: ['Plumber', 'Electrician', 'Carpenter', 'Painter', 'General Repairs']
  },
  {
    id: 'beauty-wellness',
    name: 'Beauty & Wellness',
    icon: 'Sparkles',
    color: 'bg-pink-500',
    mode: 'urban',
    subcategories: ['Salon at Home', 'Spa', 'Fitness Trainer', 'Yoga Instructor']
  },
  {
    id: 'food-delivery',
    name: 'Food & Delivery',
    icon: 'UtensilsCrossed',
    color: 'bg-yellow-500',
    mode: 'urban',
    subcategories: ['Restaurants', 'Catering', 'Groceries', 'Local Produce']
  },
  {
    id: 'professional',
    name: 'Professional',
    icon: 'Briefcase',
    color: 'bg-slate-600',
    mode: 'urban',
    subcategories: ['Consulting', 'Legal', 'Accounting', 'IT Services']
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: 'Music',
    color: 'bg-purple-500',
    mode: 'urban',
    subcategories: ['Events', 'Photography', 'DJ Services', 'Decorations']
  },
  {
    id: 'automotive',
    name: 'Automotive',
    icon: 'Car',
    color: 'bg-green-500',
    mode: 'urban',
    subcategories: ['Repair', 'Wash', 'Rental', 'Driver']
  }
];

export const MODE_CONFIG = {
  rural: {
    name: 'Rural',
    icon: 'Wheat',
    emoji: '🌾',
    colors: {
      primary: 'bg-green-600',
      secondary: 'bg-green-500',
      light: 'bg-green-100',
      text: 'text-green-700'
    }
  },
  urban: {
    name: 'Urban',
    icon: 'Building2',
    emoji: '🏙️',
    colors: {
      primary: 'bg-blue-600',
      secondary: 'bg-blue-500',
      light: 'bg-blue-100',
      text: 'text-blue-700'
    }
  }
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    VERIFY_OTP: '/auth/verify-otp',
    SEND_OTP: '/auth/send-otp'
  },
  SERVICES: {
    LIST: '/services',
    CREATE: '/services',
    UPDATE: '/services/:id',
    DELETE: '/services/:id',
    SEARCH: '/services/search'
  },
  PRODUCTS: {
    LIST: '/products',
    CREATE: '/products',
    UPDATE: '/products/:id',
    DELETE: '/products/:id',
    SEARCH: '/products/search'
  },
  QUOTES: {
    LIST: '/quotes',
    CREATE: '/quotes',
    UPDATE: '/quotes/:id',
    ACCEPT: '/quotes/:id/accept',
    REJECT: '/quotes/:id/reject'
  },
  BOOKINGS: {
    LIST: '/bookings',
    CREATE: '/bookings',
    UPDATE: '/bookings/:id',
    CANCEL: '/bookings/:id/cancel'
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/profile',
    LISTINGS: '/user/listings',
    TRANSACTIONS: '/user/transactions'
  }
};