import { Module } from '@nestjs/common';
import { ReportsBackendController } from './reports.controller';
import { ReportsBackendService } from './reports.service';

@Module({
  controllers: [ReportsBackendController],
  providers: [ReportsBackendService],
})
export class ReportsBackendModule {}
