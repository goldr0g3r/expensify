import {
  BadRequestException,
  Injectable,
  LoggerService,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoRepository } from 'src/common/helpers/repository';
import { UserSchema } from './schema/user.schema';
import { DatabaseConnection } from 'src/common/constants';
import { PassportLocalModel } from 'mongoose';
import { InjectLogger } from 'src/config/logger/Logger.decorator';
import { UserResponse } from './dto/response/userResponse';
import { plainToClass } from 'class-transformer';
import { IUserRegisterRequest, IUserSessionDevice } from 'src/common/interface';
import { UUID } from 'crypto';
import { TREFRESH_TOKEN } from 'src/common/types';
import { DefaultRoles } from 'src/common/models/auth/enum/Role';

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
          email: request.email,
          session: [],
          roles: DefaultRoles,
          isVerified: false,
          verifyToken: undefined,
        },
        request.password,
      );
      const response = this.toUserResponse(user);
      return response;
    } catch (error) {
      this.logger.error(error.message);
      return error.message as string;
    }
  }

  async loginAccount(username: string, password: string) {
    try {
      const { user, error } = await this.userModel.authenticate()(
        username,
        password,
      );
      if (error) {
        return false;
      }

      const response = this.toUserResponse(user);
      return response;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  async verifyAccount(userId: UUID) {
    try {
      const user = await this.userModel.findOne({ id: userId });
      if (!user) {
        return new UnprocessableEntityException('User not found');
      }
      user.isVerified = true;
      await user.save();
      return true;
    } catch (error) {
      this.logger.error(error);
      return new BadRequestException('Something went wrong');
    }
  }

  async fetchUsername(email: string) {
    try {
      const user = await this.userModel.findOne({ email: email });
      if (!user) {
        return new UnprocessableEntityException('User not found');
      }
      return user.username;
    } catch (error) {
      this.logger.error(error);
      return new BadRequestException('Something went wrong');
    }
  }

  async loginAccountWithEmail(email: string, password: string) {
    try {
      const userFromEmail = await this.userModel.findOne({ email: email });
      if (!userFromEmail) {
        return false;
      }
      const { user, error } = await this.userModel.authenticate()(
        userFromEmail.username,
        password,
      );
      if (error) {
        return false;
      }

      const response = this.toUserResponse(user);
      return response;
    } catch (error) {
      this.logger.error(error, error.message);
      return null;
    }
  }

  async logoutAccount(userId: UUID, refreshToken: TREFRESH_TOKEN) {
    try {
      const user = await this.userModel.findOne({ id: userId });
      if (!user) {
        return new UnprocessableEntityException('User not found');
      }

      const found = user.session.findIndex(
        (s) => s.refreshToken === refreshToken,
      );
      if (found === -1) {
        return new UnprocessableEntityException('Session not found');
      }
      user.session[found].refreshToken = undefined;
      await user.save();

      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  async findUserById(userId: UUID) {
    try {
      const user = await this.userModel.findOne({ id: userId });
      if (!user) {
        return false;
      }
      return this.toUserResponse(user);
    } catch (error) {
      this.logger.error(error);
      return new BadRequestException('Something went wrong');
    }
  }

  async fetchUserVverifiedStatus(userId: UUID) {
    try {
      const user = await this.userModel.findOne({ id: userId });
      if (!user) {
        return null;
      }
      return {
        isVerified: user.isVerified,
        verifyToken: user.verifyToken,
      };
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  async updateUserVerificationStatus(userId: UUID, status: boolean) {
    try {
      const user = await this.userModel.findOne({ id: userId });
      if (!user) {
        return new UnprocessableEntityException('User not found');
      }
      user.isVerified = status;
      await user.save();
      return true;
    } catch (error) {
      this.logger.error(error);
      return new BadRequestException('Something went wrong');
    }
  }

  async findUserByUsername(username: string) {
    try {
      const user = await this.userModel.findOne({ username: username });
      if (!user) {
        return new UnprocessableEntityException('User not found');
      }
      return this.toUserResponse(user);
    } catch (error) {
      this.logger.error(error);
      return new BadRequestException('Something went wrong');
    }
  }

  async findUserRoles(userId: UUID) {
    try {
      const user = await this.userModel.findOne({ id: userId });
      if (!user) {
        return new UnprocessableEntityException('User not found');
      }
      return user.roles;
    } catch (error) {
      this.logger.error(error);
      return new BadRequestException('Something went wrong');
    }
  }

  async addRefreshToken(
    userId: UUID,
    session: IUserSessionDevice,
  ): Promise<boolean> {
    try {
      const user = await this.userModel.findOne({ id: userId });
      if (!user) {
        return false;
      }

      const found = user.session.findIndex(
        (s) => s.deviceId === session.deviceId,
      );
      if (found !== -1) {
        user.session[found].refreshToken = session.refreshToken;
        user.session[found].ip = session.ip;
      } else {
        user.session.push(session);
      }
      await user.save();

      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  async updateRefreshToken(username: string, refreshToken: TREFRESH_TOKEN) {
    try {
      const user = await this.userModel.findOne({ username: username });
      if (!user) {
        return false;
      }

      const found = user.session.findIndex(
        (s) => s.refreshToken === refreshToken,
      );
      if (found === -1) {
        return false;
      }
      user.session[found].refreshToken = refreshToken;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  async verifyRefreshTokenInDatabase(
    userId: UUID,
    refreshToken: TREFRESH_TOKEN,
  ) {
    try {
      const user = await this.userModel.findOne({ id: userId });
      if (!user) {
        return false;
      }

      const found = user.session.findIndex(
        (s) => s.refreshToken === refreshToken,
      );
      if (found === -1) {
        return false;
      }

      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  private toUserResponse(user: UserSchema) {
    const response = plainToClass(UserResponse, user, {
      excludeExtraneousValues: true,
    });
    return response;
  }
}
