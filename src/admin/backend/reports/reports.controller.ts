import { Controller } from '@nestjs/common';
import { ReportsBackendService } from './reports.service';

@Controller('report')
export class ReportsBackendController {
  constructor(private readonly reportsService: ReportsBackendService) {}
}
