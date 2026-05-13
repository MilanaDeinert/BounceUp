import { Controller, Get, Query } from '@nestjs/common';
import { AvailabilityService } from './availability.service';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  // GET /api/availability?month=YYYY-MM
  @Get()
  getBookedDates(@Query('month') month: string) {
    return this.availabilityService.getBookedDates(month);
  }
}
