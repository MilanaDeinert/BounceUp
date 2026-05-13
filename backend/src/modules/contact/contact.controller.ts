import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // POST /api/contact
  @Post()
  @HttpCode(HttpStatus.OK)
  sendMessage(@Body() dto: CreateContactDto) {
    return this.contactService.sendMessage(dto);
  }
}
