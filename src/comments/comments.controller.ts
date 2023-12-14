import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto, ParamsCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':userId/:postId')
  @HttpCode(HttpStatus.ACCEPTED)
  create(
    @Body() { content }: CreateCommentDto,
    @Param() params: ParamsCommentDto,
  ) {
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
