import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto, ParamsCommentDto } from './dto/create-comment.dto';
import { PrismaService } from '../prisma.service';
import { PostService } from 'src/post/post.service';

@Injectable()
export class CommentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly post: PostService,
  ) {}

  async create(createCommentDto: CreateCommentDto, params: ParamsCommentDto) {
    const { content } = createCommentDto;
    const { userId, postId } = params;

    const post = await this.post.getPostById(+postId);

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    const comments = await this.prisma.comments.create({
      data: {
        content: content,
        postId: +postId,
        authorId: +userId,
      },
      select: {
        content: true,
        createdAt: true,
        post: {
          select: {
            title: true,
          },
        },
      },
    });
    return comments;
  }

  async getCommentById(postId: number): Promise<any> {
    const postsWithComments = await this.prisma.comments.findMany({
      where: {
        postId: postId,
      },
      select: {
        content: true,
        post: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
    if (!postsWithComments) {
      return null;
    }
    return postsWithComments;
  }
}
