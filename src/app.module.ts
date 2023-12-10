import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { LoggerInterceptor } from './logger.interceptor';

@Module({
  imports: [UserModule, PostModule],
  controllers: [AppController],
  providers: [AppService, LoggerInterceptor],
})
export class AppModule {}
