import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto, ParamsCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { getCurrentUser } from 'src/auth/auth.decorator';

@UseGuards(AuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':postId')
  @HttpCode(HttpStatus.ACCEPTED)
  create(
    @getCurrentUser('id') id: number,
    @Body() { content }: CreateCommentDto,
    @Param() params: ParamsCommentDto,
  ) {
    params = { postId: params.postId, userId: id['sub'] };
    return this.commentsService.create({ content }, params);
  }

  @Get(':postId')
  getCommentById(
    @Param(
      'postId',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        exceptionFactory: () => new Error('postId must be a number'),
      }),
    )
    postId: number,
  ) {
    return this.commentsService.getCommentById(postId);
  }
}
