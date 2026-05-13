import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking, BookingRequest } from '../models/booking.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly base = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) {}

  submit(request: BookingRequest): Observable<Booking> {
    return this.http.post<Booking>(`${environment.apiUrl}/booking`, request);
  }

  getAll(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.base);
  }
}
