import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    if (!author.length) {
      throw new HttpException('Author not found', HttpStatus.UNAUTHORIZED);
    }
    let post = await this.prisma.post.create({
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
    const postData = this.prisma.post.findMany({
      select: { title: true, content: true },
      where: { id: id },
    });
    return postData;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }
}
