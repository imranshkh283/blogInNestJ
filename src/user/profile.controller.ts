import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateProfileDto } from './dto/create-user.dto';

@Controller('profile')
export class profileController {
  constructor(private readonly userService: UserService) {}

  @Post('createProfile')
  @HttpCode(HttpStatus.CREATED)
  createProfile(@Body() data: CreateProfileDto) {
    return this.userService.createProfile(data);
  }

  @Post('updateProfile')
  @HttpCode(HttpStatus.OK)
  updateProfile(@Body() data: CreateProfileDto) {
    return this.userService.updateProfile(data);
  }
}
