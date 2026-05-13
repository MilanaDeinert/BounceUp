import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(private email: EmailService) {}

  async sendMessage(dto: CreateContactDto) {
    await this.email.sendContactEmail(dto);
    return { success: true, message: 'Nachricht gesendet. Wir melden uns bald!' };
  }
}
