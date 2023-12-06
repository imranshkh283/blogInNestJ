import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AdminModule } from './admin/admin.modules';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportsBackendModule } from './admin/backend/reports/reports.module';
import { UserBackendModule } from './admin/backend/user/user.module';

const arr = ['PROD', 'DEV', 'STAGE'];
const IS_DEV_MODE = false;

@Module({
  imports: [
    UserModule,
    AdminModule,
    RouterModule.register([
      { path: 'admin/backend/', module: UserBackendModule },
      { path: 'admin/backend/', module: ReportsBackendModule },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
