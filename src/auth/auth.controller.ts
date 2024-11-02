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
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body(ValidationPipe) data: SignInDto) {
    return await this.authService.signIn(data);
  }

  @Post('/forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body(ValidationPipe) data: Pick<SignInDto, 'email'>) {
    return await this.authService.forgotPassword(data);
  }

  @Get('/reset-password/:token')
  async resetPassword(
    @Body('password') password: string,
    @Param('token') token: string,
  ) {
    return await this.authService.resetPassword(token, password);
  }
}
