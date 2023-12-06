import { Module } from '@nestjs/common';
import { UserBackendController } from './user.controller';
import { UserBackendService } from './user.service';

@Module({
  controllers: [UserBackendController],
  providers: [UserBackendService],
  exports: [UserBackendModule],
})
export class UserBackendModule {}
