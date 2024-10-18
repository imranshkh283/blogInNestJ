import { Body, Injectable, Post } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  @Post('send-mail')
  async sendMail(@Body() body: { to: string; subject: string; text: string }) {
    await this.mailService.sendMail({
      to: body.to,
      subject: body.subject,
      text: body.text,
    });
  }
}
