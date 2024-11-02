import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { user_status } from 'src/types/user.type';
import { comparePassword, hashPassword } from 'src/utils/hashPassword.util';
import { CustomJwtService } from './jwt/jwt.service';
import { isEmailExists } from 'src/utils/email.utils';
import ResetEMailTemplate from 'src/mail/templates/resetPassword.mail.template';
import { MailService } from 'src/mail/mail.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly customJwtService: CustomJwtService,

    private readonly mailer: MailService,
  ) {}

  async signIn(data: SignInDto) {
    const email = data?.email;
    const userDetails = await this.userService.findUserByEmail(email);

    if (userDetails?.status == user_status.INACTIVE) {
      const sendMail = await this.userService.sendVerificationEmail(email);
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
        type: 'singIn',
      };

      return {
        token: await this.customJwtService.signToken({
          payload,
        }),
        success: true,
        message: 'Login Successful',
        failure: false,
      };
    }
  }

  async forgotPassword(data) {
    const email = data?.email;

    const emailExists = await isEmailExists(this.prisma, email);

    if (!emailExists) {
      throw new ConflictException(`Invalid Email.`);
    }

    const payload = {
      email: email,
      type: 'resetPassword',
    };

    const token = await this.customJwtService.generateResetToken(payload);

    await this.mailer.sendMail({
      to: email,
      subject: 'Password Reset Link',
      text: ResetEMailTemplate(token),
    });

    return 'Email sent successfully';
  }
  async resetPassword(token: string, password: string) {
    const payload = await this.customJwtService.verfiyPasswordResetToken(token);

    const email = payload.email;
    const emailExists = await isEmailExists(this.prisma, email);

    if (!emailExists) {
      throw new ConflictException(`Invalid Email.`);
    }

    const user = await this.userService.setPassword(
      email,
      await hashPassword(password),
    );

    if (user) {
      return { message: 'Password reset successfully' };
    }
  }
}
