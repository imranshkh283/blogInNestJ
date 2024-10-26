import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { user_status } from 'src/types/user.type';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly user: UserService,
  ) {}

  async signIn(data: SignInDto) {
    const email = data?.email;
    const userDetails = await this.user.findUserByEmail(email);
    if (userDetails?.status == user_status.INACTIVE) {
      const sendMail = await this.user.sendVerificationEmail(email);
      if (sendMail) {
        return { message: 'please check your email' };
      }
    }
  }
}
