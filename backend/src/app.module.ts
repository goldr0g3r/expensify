import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envConfig, Environment, registerConfig } from './config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_CONNECTION } from './common/constant/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [registerConfig],
      envFilePath: ['src/.env', 'src/.env.development'],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      connectionName: DB_CONNECTION.user,
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<Environment>(envConfig).mongoURI,
        dbName: configService.get<Environment>(envConfig).userDB,
        retryWrites: true,
        writeConcern: {
          w: 'majority',
        },
      }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
