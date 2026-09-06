import { api } from './api';
import { Service, Product, UserMode } from '@/types';

interface SearchFilters {
  query?: string;
  category?: string;
  mode?: UserMode;
  latitude?: number;
  longitude?: number;
  radius?: number;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
}

interface CreateServiceData {
  title: string;
  description: string;
  category: string;
  subcategory: string;
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
  tags: string[];
  mode: UserMode;
}

interface CreateProductData {
  title: string;
  description: string;
  category: string;
  subcategory: string;
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
}

export const listingService = {
  // Services
  async getServices(filters?: SearchFilters): Promise<Service[]> {
    const { data } = await api.get('/services', { params: filters });
    return data;
  },

  async getService(id: string): Promise<Service> {
    const { data } = await api.get(`/services/${id}`);
    return data;
  },

  async createService(serviceData: CreateServiceData): Promise<Service> {
    const { data } = await api.post('/services', serviceData);
    return data;
  },

  async updateService(id: string, updates: Partial<CreateServiceData>): Promise<Service> {
    const { data } = await api.put(`/services/${id}`, updates);
    return data;
  },

  async deleteService(id: string): Promise<void> {
    await api.delete(`/services/${id}`);
  },

  // Products
  async getProducts(filters?: SearchFilters): Promise<Product[]> {
    const { data } = await api.get('/products', { params: filters });
    return data;
  },

  async getProduct(id: string): Promise<Product> {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },

  async createProduct(productData: CreateProductData): Promise<Product> {
    const { data } = await api.post('/products', productData);
    return data;
  },

  async updateProduct(id: string, updates: Partial<CreateProductData>): Promise<Product> {
    const { data } = await api.put(`/products/${id}`, updates);
    return data;
  },

  async deleteProduct(id: string): Promise<void> {
    await api.delete(`/products/${id}`);
  },

  // Search
  async search(filters: SearchFilters): Promise<{ services: Service[], products: Product[] }> {
    const { data } = await api.get('/search', { params: filters });
    return data;
  },

  // Upload images
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);
    const { data } = await api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data.url;
  }
};
