import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { BookingApiService, ApiProduct } from '../../services/booking-api.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    ButtonModule, InputTextModule, TextareaModule,
    DatePickerModule, SelectModule
  ],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  submitted = false;
  loading = false;
  loadingProducts = true;
  errorMessage: string | null = null;

  products: ApiProduct[] = [];
  minDate = new Date();

  form = this.fb.group({
    productId: [null as string | null, Validators.required],
    date: [null as Date | null, Validators.required],
    customerName: ['', [Validators.required, Validators.minLength(2)]],
    customerEmail: ['', [Validators.required, Validators.email]],
    customerPhone: ['', Validators.required],
    customerAddress: ['', Validators.required],
    message: ['']
  });

  constructor(
    private fb: FormBuilder,
    private bookingApi: BookingApiService,
  ) {}

  ngOnInit() {
    this.bookingApi.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loadingProducts = false;
      },
      error: () => {
        // Fallback to static products if backend not running
        this.products = [
          { id: '1', name: 'Hüpfburg „Schloss"', description: '', price: 120, imageUrl: null, size: '3x3.5m', active: true },
          { id: '2', name: 'Hüpfburg „Bubble House"', description: '', price: 180, imageUrl: null, size: '3x4m', active: true },
        ];
        this.loadingProducts = false;
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    this.errorMessage = null;

    const v = this.form.value;
    const bookingDate = (v.date as Date).toISOString().split('T')[0];

    this.bookingApi.createBooking({
      customerName: v.customerName!,
      email: v.customerEmail!,
      phone: v.customerPhone!,
      address: v.customerAddress!,
      bookingDate,
      productId: v.productId!,
      notes: v.message || undefined,
    }).subscribe({
      next: () => {
        this.loading = false;
        this.submitted = true;
      },
      error: (err) => {
        this.loading = false;
        const msg = err?.error?.message;
        this.errorMessage = Array.isArray(msg)
          ? msg.join(', ')
          : (msg || 'Fehler beim Absenden. Bitte versuche es erneut.');
      }
    });
  }

  isInvalid(field: string) {
    const ctrl = this.form.get(field);
    return ctrl?.invalid && ctrl?.touched;
  }
}
