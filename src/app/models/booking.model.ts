export interface Booking {
  id?: string;
  productId: string;
  productName?: string;
  date: string;        // ISO date string
  endDate?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  message?: string;
  status: BookingStatus;
  createdAt?: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface BookingRequest {
  productId: string;
  date: string;
  endDate?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  message?: string;
}
