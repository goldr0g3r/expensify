import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './config/logger/Logger.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import GetWinstonConfig from './config/logger/WinstonConfig';
import { Environment, registerConfig } from './config/environment/env.config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Config } from './config/environment/env.constant';
import { DatabaseConnection } from './common/constants';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [registerConfig] }),
    LoggerModule.forRoot(GetWinstonConfig()),

    MongooseModule.forRootAsync({
      connectionName: DatabaseConnection.user,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<Environment>(Config).mongoURI,
        dbName: config.get<Environment>(Config).userDatabase,
        retryWrites: true,
        writeConcern: {
          w: 'majority',
        },
      }),
    }),

    UserModule,

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
