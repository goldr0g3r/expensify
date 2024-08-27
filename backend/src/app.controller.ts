import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Root')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiProperty({
    type: String,
    description: 'Hello World!',
    example: 'Hello World!',
  })
  @ApiResponse({
    status: 200,
    description: 'Hello World!',
    type: String,
    example: 'Hello World!',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
