import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ApiProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  size: string | null;
  active: boolean;
}

export interface CreateBookingPayload {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  bookingDate: string; // ISO string YYYY-MM-DD
  productId: string;
  notes?: string;
}

export interface BookingResponse {
  id: string;
  customerName: string;
  email: string;
  bookingDate: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  product: { id: string; name: string };
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class BookingApiService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ApiProduct[]> {
    return this.http.get<ApiProduct[]>(`${this.base}/products`);
  }

  createBooking(payload: CreateBookingPayload): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(`${this.base}/bookings`, payload);
  }

  getBookedDates(month: string): Observable<{ bookedDates: string[] }> {
    return this.http.get<{ bookedDates: string[] }>(
      `${this.base}/availability?month=${month}`,
    );
  }
}
