import { IsEnum } from 'class-validator';

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

export class UpdateBookingStatusDto {
  @IsEnum(BookingStatus, {
    message: 'Status must be PENDING, CONFIRMED or CANCELLED',
  })
  status: BookingStatus;
}
