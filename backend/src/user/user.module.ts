import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserSchemaObject } from './schemas/User.schema';
import { DB_CONNECTION } from 'src/common/constant/mongoose';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          schema: UserSchemaObject,
          name: UserSchema.name,
          collection: 'users',
        },
      ],
      DB_CONNECTION.user,
    ),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
