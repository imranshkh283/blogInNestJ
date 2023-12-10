import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProfileDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import { isEmailExists } from '../utils/email.utils';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ firstname, lastname, email }: CreateUserDto) {
    const emailExists = await isEmailExists(this.prisma, email);
    if (emailExists) {
      throw new ConflictException(`Email already exists.`);
    }
    const user = await this.prisma.user.create({
      select: {
        fullname: true,
        email: true,
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

  async findAll() {
    const users = await this.prisma.user.findMany();
    return { users };
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    const emailExists = await isEmailExists(this.prisma, email);

    if (!emailExists) {
      throw new ConflictException(`Invalid Email.`);
    }
    const updateData = await this.prisma.user.update({
      where: { email },
      data: {
        ...updateUserDto,
        fullname: `${updateUserDto.firstname} ${updateUserDto.lastname}`,
      },
      select: {
        fullname: true,
        email: true,
      },
    });
    return updateData;
  }

  async activateUser(email: string) {
    const emailExists = await isEmailExists(this.prisma, email);

    if (!emailExists) {
      throw new ConflictException(`Invalid Email.`);
    }

    const changeStatus = await this.prisma.user.update({
      where: { email },
      data: {
        status: 'ACTIVE',
      },
      select: {
        status: true,
      },
    });
    return `${changeStatus.status}`;
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
