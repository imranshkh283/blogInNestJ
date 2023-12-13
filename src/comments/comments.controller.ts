import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
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
}
