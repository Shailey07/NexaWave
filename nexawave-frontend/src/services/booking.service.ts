import { api } from './api';
import { Quote, Booking } from '@/types';

interface CreateQuoteData {
  serviceId: string;
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
  notes?: string;
}

interface CreateBookingData {
  type: 'service' | 'product';
  serviceId?: string;
  productId?: string;
  quoteId?: string;
  scheduledDate: string;
  notes?: string;
}

export const bookingService = {
  // Quotes
  async getQuotes(type?: 'sent' | 'received'): Promise<Quote[]> {
    const { data } = await api.get('/quotes', { params: { type } });
    return data;
  },

  async getQuote(id: string): Promise<Quote> {
    const { data } = await api.get(`/quotes/${id}`);
    return data;
  },

  async createQuote(quoteData: CreateQuoteData): Promise<Quote> {
    const { data } = await api.post('/quotes', quoteData);
    return data;
  },

  async acceptQuote(id: string): Promise<Quote> {
    const { data } = await api.post(`/quotes/${id}/accept`);
    return data;
  },

  async rejectQuote(id: string, reason?: string): Promise<Quote> {
    const { data } = await api.post(`/quotes/${id}/reject`, { reason });
    return data;
  },

  // Bookings
  async getBookings(status?: string): Promise<Booking[]> {
    const { data } = await api.get('/bookings', { params: { status } });
    return data;
  },

  async getBooking(id: string): Promise<Booking> {
    const { data } = await api.get(`/bookings/${id}`);
    return data;
  },

  async createBooking(bookingData: CreateBookingData): Promise<Booking> {
    const { data } = await api.post('/bookings', bookingData);
    return data;
  },

  async updateBookingStatus(id: string, status: string): Promise<Booking> {
    const { data } = await api.put(`/bookings/${id}/status`, { status });
    return data;
  },

  async cancelBooking(id: string, reason?: string): Promise<Booking> {
    const { data } = await api.post(`/bookings/${id}/cancel`, { reason });
    return data;
  }
};
