import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProfileDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import { isEmailExists } from '../utils/email.utils';
import { isEmail } from 'class-validator';
import { UserType } from '../types/user.type';
import { MailService } from 'src/mail/mail.service';
import mailTemplate from '../mail/mail.template';

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
  }: CreateUserDto): Promise<
    Pick<UserType, 'firstname' | 'lastname' | 'email' | 'fullname'>
  > {
    const emailExists = await isEmailExists(this.prisma, email);
    if (emailExists) throw new ConflictException(`Email already exists.`);

    const user = await this.prisma.user.create({
      select: {
        fullname: true,
        email: true,
        firstname: true,
        lastname: true,
      },
      data: {
        firstname: firstname,
        lastname: lastname,
        fullname: `${firstname} ${lastname}`,
        email: email,
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
  ): Promise<Pick<UserType, 'id' | 'fullname' | 'email'>> {
    const checkEmailValid = isEmail(email);
    if (!checkEmailValid) throw new ConflictException(`Invalid Email.`);

    const EmailExists = await isEmailExists(this.prisma, email);
    if (!EmailExists) throw new ConflictException(`Email does not exist.`);

    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        fullname: true,
        email: true,
        status: true,
      },
    });
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

    await this.prisma.user.update({
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
  }

  async sendVerificationEmail(email: string) {
    const emailExists = await isEmailExists(this.prisma, email);

    if (!emailExists) {
      throw new ConflictException(`Invalid Email.`);
    }

    await this.mailer.sendMail({
      to: email,
      subject: 'Verify Your Email Address',
      text: mailTemplate(email),
    });
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
}
