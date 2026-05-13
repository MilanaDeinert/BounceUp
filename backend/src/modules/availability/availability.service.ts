import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class AvailabilityService {
  constructor(private supabase: SupabaseService) {}

  async getBookedDates(month: string): Promise<{ bookedDates: string[] }> {
    if (!/^\d{4}-\d{2}$/.test(month)) {
      throw new BadRequestException('month must be in format YYYY-MM');
    }

    const [year, mon] = month.split('-').map(Number);
    const start = `${year}-${String(mon).padStart(2, '0')}-01`;
    const lastDay = new Date(year, mon, 0).getDate();
    const end = `${year}-${String(mon).padStart(2, '0')}-${lastDay}`;

    const { data, error } = await this.supabase.db
      .from('bookings')
      .select('booking_date')
      .gte('booking_date', start)
      .lte('booking_date', end)
      .neq('status', 'CANCELLED');

    if (error) throw new InternalServerErrorException(error.message);

    const bookedDates = [
      ...new Set(
        (data || []).map((b) => b.booking_date.split('T')[0]),
      ),
    ];

    return { bookedDates };
  }
}
