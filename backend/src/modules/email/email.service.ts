import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get<string>('smtp.host'),
      port: this.config.get<number>('smtp.port'),
      secure: this.config.get<boolean>('smtp.secure'),
      auth: {
        user: this.config.get<string>('smtp.user'),
        pass: this.config.get<string>('smtp.pass'),
      },
    });
  }

  private get fromAddress(): string {
    const name = this.config.get<string>('mail.fromName');
    const user = this.config.get<string>('smtp.user');
    return `"${name}" <${user}>`;
  }

  // ── Booking confirmation to customer ────────────────────────
  async sendBookingConfirmation(booking: {
    customerName: string;
    email: string;
    productName: string;
    bookingDate: Date;
  }) {
    const date = new Date(booking.bookingDate).toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    await this.transporter.sendMail({
      from: this.fromAddress,
      to: booking.email,
      subject: `✅ Buchungsanfrage erhalten – ${booking.productName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #B07D78;">Hallo ${booking.customerName}!</h2>
          <p>Deine Buchungsanfrage ist bei uns eingegangen. Wir melden uns innerhalb von 24 Stunden.</p>
          <table style="border-collapse: collapse; width: 100%; margin: 1.5rem 0;">
            <tr>
              <td style="padding: 8px; border: 1px solid #EDD8D3; background: #FBF5F3;"><strong>Hüpfburg:</strong></td>
              <td style="padding: 8px; border: 1px solid #EDD8D3;">${booking.productName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #EDD8D3; background: #FBF5F3;"><strong>Datum:</strong></td>
              <td style="padding: 8px; border: 1px solid #EDD8D3;">${date}</td>
            </tr>
          </table>
          <p>Bei Fragen erreichst du uns unter <a href="mailto:${this.config.get('mail.adminEmail')}">${this.config.get('mail.adminEmail')}</a>.</p>
          <p style="color: #9E7E7A; font-size: 0.875rem;">— Dein BounceUp Team 🎉</p>
        </div>
      `,
    });

    this.logger.log(`Booking confirmation sent to ${booking.email}`);
  }

  // ── Admin notification on new booking ───────────────────────
  async sendAdminNotification(booking: {
    customerName: string;
    email: string;
    phone: string;
    address: string;
    productName: string;
    bookingDate: Date;
    notes?: string;
  }) {
    const adminEmail = this.config.get<string>('mail.adminEmail');
    const date = new Date(booking.bookingDate).toLocaleDateString('de-DE');

    await this.transporter.sendMail({
      from: this.fromAddress,
      to: adminEmail,
      subject: `🔔 Neue Buchungsanfrage: ${booking.customerName} – ${date}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #B07D78;">Neue Buchungsanfrage</h2>
          <table style="border-collapse: collapse; width: 100%; margin: 1rem 0;">
            <tr><td style="padding: 8px; border: 1px solid #EDD8D3; background: #FBF5F3; width: 140px;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #EDD8D3;">${booking.customerName}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #EDD8D3; background: #FBF5F3;"><strong>E-Mail:</strong></td><td style="padding: 8px; border: 1px solid #EDD8D3;">${booking.email}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #EDD8D3; background: #FBF5F3;"><strong>Telefon:</strong></td><td style="padding: 8px; border: 1px solid #EDD8D3;">${booking.phone}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #EDD8D3; background: #FBF5F3;"><strong>Adresse:</strong></td><td style="padding: 8px; border: 1px solid #EDD8D3;">${booking.address}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #EDD8D3; background: #FBF5F3;"><strong>Hüpfburg:</strong></td><td style="padding: 8px; border: 1px solid #EDD8D3;">${booking.productName}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #EDD8D3; background: #FBF5F3;"><strong>Datum:</strong></td><td style="padding: 8px; border: 1px solid #EDD8D3;">${date}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #EDD8D3; background: #FBF5F3;"><strong>Anmerkungen:</strong></td><td style="padding: 8px; border: 1px solid #EDD8D3;">${booking.notes || '–'}</td></tr>
          </table>
        </div>
      `,
    });

    this.logger.log(`Admin notification sent for booking by ${booking.email}`);
  }

  // ── Contact form email to admin ──────────────────────────────
  async sendContactEmail(contact: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    const adminEmail = this.config.get<string>('mail.adminEmail');

    await this.transporter.sendMail({
      from: this.fromAddress,
      to: adminEmail,
      replyTo: contact.email,
      subject: `📩 Kontaktanfrage: ${contact.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #B07D78;">Neue Kontaktanfrage</h2>
          <p><strong>Von:</strong> ${contact.name} (${contact.email})</p>
          <p><strong>Betreff:</strong> ${contact.subject}</p>
          <hr style="border-color: #EDD8D3;">
          <p style="white-space: pre-line;">${contact.message}</p>
        </div>
      `,
    });

    this.logger.log(`Contact email sent from ${contact.email}`);
  }
}
