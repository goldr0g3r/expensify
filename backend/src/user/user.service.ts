import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/config/logger/Logger.service';
import { UserSchema } from './schema/user.schema';
import { DatabaseConnection } from 'src/common/constants';
import { InjectModel } from '@nestjs/mongoose';
import { InjectLogger } from 'src/config/logger/Logger.decorator';
import { PassportLocalModel } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserSchema.name, DatabaseConnection.user)
    private userModel: PassportLocalModel<UserSchema>,
    @InjectLogger(UserService.name) private readonly logger: LoggerService,
  ) {}
  async findAll() {
    this.logger.silly('Getting all users');
    return [];
  }
}
