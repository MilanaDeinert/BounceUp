import {
  IsString,
  IsEmail,
  IsDateString,
  IsOptional,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsDateString()
  bookingDate: string;

  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
