import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Availability, AvailabilityQuery } from '../models/availability.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AvailabilityService {
  private readonly base = `${environment.apiUrl}/availability`;

  constructor(private http: HttpClient) {}

  get(query: AvailabilityQuery): Observable<Availability[]> {
    const params: Record<string, string> = {
      from: query.from,
      to: query.to,
    };
    if (query.productId) {
      params['productId'] = query.productId;
    }
    return this.http.get<Availability[]>(this.base, { params });
  }
}
