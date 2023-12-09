import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma.service';
@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ title, content, email }: CreatePostDto) {
    const author = await this.prisma.user.findMany({
      select: { id: true },
      where: {
        AND: [{ email }, { status: 'ACTIVE' }, { role: 'USER' }],
      },
    });

    const post = await this.prisma.post.create({
      data: {
        authorId: author[0].id,
        title,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return post;
  }

  findAll() {
    return this.prisma.post.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }
}
