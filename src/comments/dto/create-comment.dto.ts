import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  postId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  userId: number;
}

export class CreateCommentDto extends PickType(CommentDto, ['content']) {}

export class ParamsCommentDto extends PickType(CommentDto, [
  'userId',
  'postId',
]) {}
