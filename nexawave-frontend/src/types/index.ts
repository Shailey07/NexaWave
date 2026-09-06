export type UserMode = 'rural' | 'urban';

export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
  mode: UserMode;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  avatar?: string;
  rating: number;
  totalRatings: number;
  isVerified: boolean;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  provider: User;
  price: {
    min: number;
    max: number;
    unit: string;
  };
  images: string[];
  location: {
    latitude: number;
    longitude: number;
    address: string;
    serviceRadius: number;
  };
  availability: {
    days: string[];
    hours: { start: string; end: string };
  };
  rating: number;
  totalRatings: number;
  tags: string[];
  mode: UserMode;
  isActive: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  seller: User;
  price: number;
  images: string[];
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  quantity: number;
  tags: string[];
  mode: UserMode;
  isAvailable: boolean;
  createdAt: string;
}

export interface Quote {
  id: string;
  service: Service;
  provider: User;
  customer: User;
  description: string;
  priceBreakdown: {
    item: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  totalAmount: number;
  estimatedDuration: string;
  validUntil: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  notes?: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  type: 'service' | 'product';
  service?: Service;
  product?: Product;
  provider: User;
  customer: User;
  quote?: Quote;
  scheduledDate: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  totalAmount: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
  mode: UserMode | 'both';
  color: string;
}
