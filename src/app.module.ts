import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AdminModule } from './admin/admin.modules';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportsBackendModule } from './admin/backend/reports/reports.module';
import { UserBackendModule } from './admin/backend/user/user.module';
import { PostModule } from './post/post.module';
import { LoggerInterceptor } from './logger.interceptor';

@Module({
  imports: [
    UserModule,
    AdminModule,
    RouterModule.register([
      { path: 'admin/backend/', module: UserBackendModule },
      { path: 'admin/backend/', module: ReportsBackendModule },
    ]),
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerInterceptor],
})
export class AppModule {}
