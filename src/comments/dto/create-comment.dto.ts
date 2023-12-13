import { PickType } from '@nestjs/mapped-types';

export class CommentDto {
  content: string;
  postId: number;
  userId: number;
}

export class CreateCommentDto extends PickType(CommentDto, ['content']) {}

export class ParamsCommentDto extends PickType(CommentDto, [
  'userId',
  'postId',
]) {}
