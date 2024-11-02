import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProfileDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import { isEmailExists } from '../utils/email.utils';
import { isEmail } from 'class-validator';
import { UserType } from '../types/user.type';
import { MailService } from 'src/mail/mail.service';
import VerifyEmailTemplate from '../mail/templates/verifymail.template';
import { hashPassword } from 'src/utils/hashPassword.util';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailService,
  ) {}

  async create({
    firstname,
    lastname,
    email,
    password,
  }: CreateUserDto): Promise<Pick<UserType, 'email' | 'fullname'>> {
    const emailExists = await isEmailExists(this.prisma, email);
    if (emailExists) throw new ConflictException(`Email already exists.`);

    const user = await this.prisma.user.create({
      data: {
        firstname: firstname,
        lastname: lastname,
        fullname: `${firstname} ${lastname}`,
        email: email,
        password: await hashPassword(password),
      },
      select: {
        fullname: true,
        email: true,
      },
    });

    return user;
  }

  async findAll(): Promise<any> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  // async findActiveUsers(): Promise<Omit<UserType, 'role' | 'status'>> {
  async findActiveUsers(): Promise<Omit<UserType, 'role' | 'status'>[] | null> {
    return this.prisma.user.findMany({
      where: { status: 'ACTIVE' },
    });
  }

  async findUserByEmail(
    email: string,
  ): Promise<
    Pick<UserType, 'id' | 'fullname' | 'email' | 'status' | 'password'>
  > {
    const checkEmailValid = isEmail(email);
    if (!checkEmailValid) throw new ConflictException(`Invalid Email.`);

    const EmailExists = await isEmailExists(this.prisma, email);
    if (!EmailExists) throw new ConflictException(`Email does not exist.`);

    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        fullname: true,
        email: true,
        status: true,
        password: true,
      },
    });
    return { ...user, status: user.status as UserType['status'] };
  }

  async update(
    email: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Pick<UserType, 'id' | 'fullname' | 'email'>> {
    const emailExists = await isEmailExists(this.prisma, email);

    if (!emailExists) {
      throw new ConflictException(`Invalid Email.`);
    }
    return this.prisma.user.update({
      where: { email },
      data: {
        ...updateUserDto,
        fullname: `${updateUserDto.firstname} ${updateUserDto.lastname}`,
      },
      select: {
        id: true,
        fullname: true,
        email: true,
      },
    });
  }

  async activateUser(email: string) {
    const emailExists = await isEmailExists(this.prisma, email);

    if (!emailExists) {
      throw new ConflictException(`Invalid Email.`);
    }

    const user = await this.prisma.user.update({
      where: { email },
      data: {
        status: 'ACTIVE',
      },
      select: {
        id: true,
        email: true,
        status: true,
      },
    });

    return { message: 'Email verified successfully', user };
  }

  async sendVerificationEmail(email: string) {
    const emailExists = await isEmailExists(this.prisma, email);

    if (!emailExists) {
      throw new ConflictException(`Invalid Email.`);
    }

    await this.mailer.sendMail({
      to: email,
      subject: 'Verify Your Email Address',
      text: VerifyEmailTemplate(email),
    });

    return 'Email sent successfully';
  }

  async createProfile(data: CreateProfileDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });
    if (!userExists) throw new ConflictException(`User does not exist.`);
    const profile = await this.prisma.profile.create({
      data: { ...data },
      select: {
        id: true,
        bio: true,
        userId: true,
      },
    });
    return profile;
  }

  async updateProfile(data: CreateProfileDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });
    if (!userExists) throw new ConflictException(`User does not exist.`);
    const profile = await this.prisma.profile.update({
      where: { id: data.userId },
      data: { ...data },
      select: {
        bio: true,
        user: {
          select: {
            fullname: true,
          },
        },
      },
    });
    return profile;
  }

  async setPassword(email: string, password: string) {
    const emailExists = await isEmailExists(this.prisma, email);

    if (!emailExists) {
      throw new ConflictException(`Invalid Email.`);
    }
    return this.prisma.user.update({
      where: { email },
      data: {
        password: password,
      },
      select: {
        email: true,
        password: true,
      },
    });
  }
}
