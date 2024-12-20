import { UserSchema, UserSchemaObject } from './schema/user.schema';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LoggerModule } from 'src/config/logger/Logger.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConnection } from 'src/common/constants';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    LoggerModule,
    MongooseModule.forFeature(
      [
        {
          name: UserSchema.name,
          schema: UserSchemaObject,
          collection: 'user',
        },
      ],
      DatabaseConnection.user,
    ),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
