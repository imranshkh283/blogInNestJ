import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

interface Param {
  id: number;
  name: string;
}

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('createPost')
  createPost(@Body() data: CreatePostDto) {
    return this.postService.create(data);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Query('id') params: Param) {
    // return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }
}
