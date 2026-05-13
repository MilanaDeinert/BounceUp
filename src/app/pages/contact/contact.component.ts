import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, TextareaModule],
  template: `
    <div class="page-hero">
      <h1>Kontakt</h1>
      <p>Fragen, Wünsche oder Angebote? Wir sind für dich da!</p>
    </div>
    <div class="contact-container">
      <div class="contact-info">
        <div class="info-card">
          <i class="pi pi-phone"></i>
          <h3>Telefon</h3>
          <p>+49 123 456789</p>
          <small>Mo–Sa, 9–18 Uhr</small>
        </div>
        <div class="info-card">
          <i class="pi pi-envelope"></i>
          <h3>E-Mail</h3>
          <p>info&#64;bounceup.de</p>
          <small>Antwort innerhalb 24h</small>
        </div>
        <div class="info-card">
          <i class="pi pi-whatsapp"></i>
          <h3>WhatsApp</h3>
          <p>+49 123 456789</p>
          <small>Schnelle Antworten</small>
        </div>
      </div>

      @if (submitted) {
        <div class="success-msg">
          <i class="pi pi-check-circle"></i>
          <h2>Vielen Dank! Wir melden uns bald. 😊</h2>
        </div>
      } @else {
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="contact-form" novalidate>
          <div class="form-group">
            <label>Name *</label>
            <input pInputText formControlName="name" placeholder="Dein Name" class="w-full" />
          </div>
          <div class="form-group">
            <label>E-Mail *</label>
            <input pInputText formControlName="email" placeholder="deine@email.de" class="w-full" />
          </div>
          <div class="form-group">
            <label>Nachricht *</label>
            <textarea pInputTextarea formControlName="message" rows="5"
              placeholder="Wie können wir dir helfen?" class="w-full"></textarea>
          </div>
          <p-button type="submit" label="Nachricht senden" icon="pi pi-send" [loading]="loading" />
        </form>
      }
    </div>
  `,
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  submitted = false;
  loading = false;

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    setTimeout(() => { this.loading = false; this.submitted = true; }, 700);
  }
}
