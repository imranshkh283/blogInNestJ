import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma.service';
import { PostType } from '../types/post.type';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    title,
    content,
    email,
  }: CreatePostDto): Promise<
    Omit<PostType, 'id' | 'title' | 'content' | 'createdAt' | 'tags'>
  > {
    const author = await this.prisma.user.findMany({
      select: { id: true },
      where: {
        AND: [{ email }, { status: 'ACTIVE' }, { role: 'USER' }],
      },
    });
    if (!author.length) {
      throw new HttpException('Author not found', HttpStatus.UNAUTHORIZED);
    }
    const post = await this.prisma.post.create({
      data: {
        authorId: author[0].id,
        title,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      },
    });

    return post;
  }

  findAll(): Promise<Pick<PostType, 'id' | 'title' | 'content'>[]> {
    return this.prisma.post.findMany({
      select: { id: true, title: true, content: true, tags: true },
    });
  }

  async findOne(id: number): Promise<PostType | null> {
    const postData = await this.prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        tags: true,
        createdAt: true,
      },
    });

    if (!postData) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return postData;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async addTags(id: number, tags: string) {
    const [post] = await Promise.all([
      this.prisma.post.findUnique({
        where: { id },
      }),
    ]);
    if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    const updateTags = await this.prisma.post.update({
      data: { tags },
      where: { id },
    });
    return updateTags;
  }
}
