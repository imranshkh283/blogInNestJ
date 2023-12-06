import { Controller } from '@nestjs/common';
import { UserBackendService } from './user.service';
@Controller('user')
export class UserBackendController {
  constructor(private readonly userService: UserBackendService) {}
}
