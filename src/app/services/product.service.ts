import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly base = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.base);
  }

  getBySlug(slug: string): Observable<Product> {
    return this.http.get<Product>(`${this.base}/${slug}`);
  }

  getFeatured(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.base}?featured=true`);
  }
}
