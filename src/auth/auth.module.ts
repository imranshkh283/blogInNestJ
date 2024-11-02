import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guard/jwt-auth.guard';
import { CustomJwtService } from './jwt/jwt.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    AuthGuard,
    CustomJwtService,
    MailService,
  ],
  exports: [AuthService, AuthGuard, JwtModule],
})
export class AuthModule {}
