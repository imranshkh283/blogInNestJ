import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostType } from '../types/post.type';
import { AuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { getCurrentUser } from 'src/auth/auth.decorator';
@UseGuards(AuthGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('createPost')
  @HttpCode(HttpStatus.CREATED)
  createPost(@getCurrentUser('id') id: number, @Body(ValidationPipe) data) {
    return this.postService.create(data, id['sub']);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Pick<PostType, 'id' | 'title' | 'content'>[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Post('addTags/:id')
  @HttpCode(HttpStatus.OK)
  addTags(@Param('id') id: number, @Body('tags') tags: string) {
    return this.postService.addTags(+id, tags); // +id converts string to number
  }
}
