import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('createUser')
  @HttpCode(HttpStatus.OK)
  create(@Body(ValidationPipe) data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/active')
  findActiveUsers() {
    return this.userService.findActiveUsers();
  }

  @Get('email/:email')
  findUserByEmail(@Param('email') email: string) {
    return this.userService.findUserByEmail(email);
  }

  @Post('/updateInfo')
  update(@Body('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(email, updateUserDto);
  }

  @Get('/sendVerificationEmail')
  sendVerificationEmail(@Body('email') email: string) {
    return this.userService.sendVerificationEmail(email);
  }

  @Get('/verify-email/:email')
  async activateChange(@Param('email') email: string) {
    return await this.userService.activateUser(email);
  }
}
