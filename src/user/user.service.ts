import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        email: 'imranshkh283@gmail.com',
        fullname: 'imran',
      },
    });
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return { users };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data: {
        role: 'ADMIN',
        status: 'ACTIVE',
      },
      select: {
        fullname: true,
        email: true,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
