import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { isEmailExists } from 'src/utils/email.utils';

@Injectable()
export class CustomJwtService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async signToken({ payload }: { payload: any }): Promise<string> {
    const { email, sub } = payload;
    try {
      return await this.jwt.signAsync(
        { email, sub },
        {
          secret: process.env.ACCESS_TOKEN_SECRET,
          expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
          algorithm: 'HS256',
        },
      );
    } catch (error) {
      throw new UnauthorizedException('Could not sign token');
    }
  }

  async generateResetToken({
    email,
    type = 'resetPassword',
  }: {
    email: string;
    type: string;
  }): Promise<string> {
    try {
      const emailExists = await isEmailExists(this.prisma, email);

      if (!emailExists) {
        throw new ConflictException(`Invalid Email.`);
      }

      return await this.jwt.signAsync(
        { email },
        {
          secret: process.env.ACCESS_TOKEN_SECRET,
          expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
          algorithm: 'HS256',
        },
      );
    } catch (error) {
      throw new UnauthorizedException('Could not sign token');
    }
  }

  async verfiyPasswordResetToken(token: string) {
    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Could not sign token');
    }
  }
}