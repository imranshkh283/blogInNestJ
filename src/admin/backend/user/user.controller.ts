import { Controller } from '@nestjs/common';
import { UserBackendService } from './user.service';
@Controller('admin/backend/user')
export class UserBackendController {
  constructor(private readonly userService: UserBackendService) {}
}
