import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma.service';
import { profileController } from './profile.controller';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [UserController, profileController],
  providers: [UserService, PrismaService, MailService],
  exports: [UserService],
})
export class UserModule {}
