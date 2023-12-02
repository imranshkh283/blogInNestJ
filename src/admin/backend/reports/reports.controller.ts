import { Controller } from '@nestjs/common';
import { ReportsBackendService } from './reports.service';

@Controller('admin/reports/')
export class ReportsBackendController {
  constructor(private readonly reportsService: ReportsBackendService) {}
}
