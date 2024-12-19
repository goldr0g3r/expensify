import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AppModuleRoutes } from './app.routes';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Root')
@Controller(AppModuleRoutes)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
