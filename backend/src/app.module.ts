import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envConfig, Environment, registerConfig } from './config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_CONNECTION } from './common/constant/mongoose';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { ContactsModule } from './contacts/contacts.module';
import { GroupsModule } from './groups/groups.module';

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
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      connectionName: DB_CONNECTION.category,
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<Environment>(envConfig).mongoURI,
        dbName: configService.get<Environment>(envConfig).categoryDB,
        retryWrites: true,
        writeConcern: {
          w: 'majority',
        },
      }),
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      connectionName: DB_CONNECTION.transaction,
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<Environment>(envConfig).mongoURI,
        dbName: configService.get<Environment>(envConfig).transactionDB,
        retryWrites: true,
        writeConcern: {
          w: 'majority',
        },
      }),
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    TransactionModule,
    ContactsModule,
    GroupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
