import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from '../prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { PostService } from 'src/post/post.service';

@Module({
  imports: [AuthModule],
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService, PostService],
})
export class CommentsModule {}
