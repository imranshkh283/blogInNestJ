import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('EVENT_STORE') private readonly eventBus,
  ) {
    console.log(this.eventBus);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
