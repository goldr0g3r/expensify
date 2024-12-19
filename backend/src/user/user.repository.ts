import { Injectable, LoggerService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoRepository } from 'src/common/helpers/repository';
import { UserSchema } from './schema/user.schema';
import { DatabaseConnection } from 'src/common/constants';
import { PassportLocalModel } from 'mongoose';
import { InjectLogger } from 'src/config/logger/Logger.decorator';
import { UserResponse } from './dto/response/userResponse';
import { plainToClass } from 'class-transformer';
import { IUserRegisterRequest } from 'src/common/interface';

@Injectable()
export class UserRepository extends MongoRepository {
  constructor(
    @InjectModel(UserSchema.name, DatabaseConnection.user)
    private userModel: PassportLocalModel<UserSchema>,
    @InjectLogger(UserRepository.name) private readonly logger: LoggerService,
  ) {
    super();
  }

  async registerAccount(request: IUserRegisterRequest) {
    try {
      const user = await this.userModel.register(
        {
          id: undefined,
          username: request.username,
          name: request.name,
          session: [],
        },
        request.password,
      );
      const response = this.toUserResponse(user);
      return response;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  private toUserResponse(user: UserSchema) {
    const response = plainToClass(UserResponse, user, {
      excludeExtraneousValues: true,
    });
    return response;
  }
}
