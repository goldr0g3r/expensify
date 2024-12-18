import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './config/logger/Logger.module';
import { ConfigModule } from '@nestjs/config';
import GetWinstonConfig from './config/logger/WinstonConfig';
import { registerConfig } from './config/environment/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [registerConfig] }),
    LoggerModule.forRoot(GetWinstonConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
