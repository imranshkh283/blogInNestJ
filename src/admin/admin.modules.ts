import { Module } from '@nestjs/common';
import { UserBackendModule } from './backend/user/user.module';
import { ReportsBackendModule } from './backend/reports/reports.module';

@Module({
  imports: [UserBackendModule, ReportsBackendModule],
})
export class AdminModule {}
