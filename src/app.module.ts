import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { LoggerInterceptor } from './logger.interceptor';
import { CommentsModule } from './comments/comments.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { CustomJwtService } from './auth/jwt/jwt.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UserModule, PostModule, CommentsModule, MailModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, LoggerInterceptor, CustomJwtService, PrismaService],
})
export class AppModule {}
