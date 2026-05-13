import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import { EmailService } from '../email/email.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';

@Injectable()
export class BookingsService {
  constructor(
    private supabase: SupabaseService,
    private email: EmailService,
  ) {}

  async create(dto: CreateBookingDto) {
    // Check product exists
    const { data: product } = await this.supabase.db
      .from('products')
      .select('id, name')
      .eq('id', dto.productId)
      .single();
    if (!product) throw new NotFoundException('Produkt nicht gefunden');

    // Check for double booking (same product + same date)
    const dayStart = dto.bookingDate + 'T00:00:00.000Z';
    const dayEnd = dto.bookingDate + 'T23:59:59.999Z';

    const { data: existing } = await this.supabase.db
      .from('bookings')
      .select('id')
      .eq('product_id', dto.productId)
      .gte('booking_date', dayStart)
      .lte('booking_date', dayEnd)
      .neq('status', 'CANCELLED')
      .limit(1)
      .single();

    if (existing) {
      throw new ConflictException(
        'Dieses Datum ist für die gewählte Hüpfburg bereits vergeben.',
      );
    }

    const { data: booking, error } = await this.supabase.db
      .from('bookings')
      .insert({
        customer_name: dto.customerName,
        email: dto.email,
        phone: dto.phone,
        address: dto.address,
        booking_date: dto.bookingDate,
        notes: dto.notes,
        product_id: dto.productId,
        status: 'PENDING',
      })
      .select('*, products(id, name)')
      .single();

    if (error) throw new InternalServerErrorException(error.message);

    // Send emails (non-blocking)
    this.email.sendBookingConfirmation({
      customerName: booking.customer_name,
      email: booking.email,
      productName: product.name,
      bookingDate: new Date(booking.booking_date),
    }).catch(() => {});

    this.email.sendAdminNotification({
      customerName: booking.customer_name,
      email: booking.email,
      phone: booking.phone,
      address: booking.address,
      productName: product.name,
      bookingDate: new Date(booking.booking_date),
      notes: booking.notes,
    }).catch(() => {});

    return booking;
  }

  async findAll() {
    const { data, error } = await this.supabase.db
      .from('bookings')
      .select('*, products(id, name)')
      .order('booking_date', { ascending: true });
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase.db
      .from('bookings')
      .select('*, products(*)')
      .eq('id', id)
      .single();
    if (error || !data) throw new NotFoundException(`Buchung #${id} nicht gefunden`);
    return data;
  }

  async updateStatus(id: string, dto: UpdateBookingStatusDto) {
    await this.findOne(id);
    const { data, error } = await this.supabase.db
      .from('bookings')
      .update({ status: dto.status })
      .eq('id', id)
      .select('*, products(id, name)')
      .single();
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async remove(id: string) {
    await this.findOne(id);
    const { error } = await this.supabase.db
      .from('bookings')
      .delete()
      .eq('id', id);
    if (error) throw new InternalServerErrorException(error.message);
  }
}
