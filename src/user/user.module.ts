import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma.service';
import { profileController } from './profile.controller';

@Module({
  controllers: [UserController, profileController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
