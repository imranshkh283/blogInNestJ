import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { user_status } from 'src/types/user.type';
import { comparePassword } from 'src/utils/hashPassword.util';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly user: UserService,
    private readonly jwtService: JwtService,
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
    const hashPassword = await comparePassword(
      data?.password,
      userDetails?.password,
    );
    if (hashPassword) {
      const payload = {
        sub: userDetails?.id,
        email: userDetails?.email,
      };

      return {
        token: await this.jwtService.signAsync(
          payload,
          this.getAccessTokenOptions(userDetails?.id),
        ),
        success: true,
        message: 'Login Successful',
        failure: false,
      };
    }
  }

  getAccessTokenOptions(user: number) {
    return this.getTokenOption('access', user);
  }

  private getTokenOption(
    type: 'refresh' | 'access',
    user: number,
  ): JwtSignOptions {
    const option: JwtSignOptions = {
      secret: process.env.ACCESS_TOKEN_SECRET + user,
    };

    const expiration = process.env.ACCESS_TOKEN_EXPIRATION;
    if (expiration) {
      option.expiresIn = expiration;
    }
    return option;
  }
}
