import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoRepository } from 'src/common/helpers';
import { UserSchema } from './schemas/User.schema';
import { DB_CONNECTION } from 'src/common/constant/mongoose';
import { PassportLocalModel } from 'mongoose';
import { IRegisterRequest } from 'src/common/interfaces';
import { plainToClass } from 'class-transformer';
import { UserResponse } from 'src/common/models/entity';

@Injectable()
export class UserRepository extends MongoRepository {
  constructor(
    @InjectModel(UserSchema.name, DB_CONNECTION.user)
    private userModel: PassportLocalModel<UserSchema>,
  ) {
    super();
  }

  async create(request: IRegisterRequest): Promise<UserResponse> {
    try {
      const user = await this.userModel.register(
        {
          id: undefined,
          username: request.username,
          email: request.email,
          name: request.name,
        },
        request.password,
      );
      const response = this.toUserModel(user);
      console.log(response);
      return response;
    } catch (err) {
      throw new UnprocessableEntityException(err.message.toString());
    }
  }

  private toUserModel(user: UserSchema) {
    const response = plainToClass(UserResponse, user, {
      excludeExtraneousValues: true,
    });
    return response;
  }
}
