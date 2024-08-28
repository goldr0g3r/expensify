import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { IRegisterRequest } from 'src/common/interfaces';
import { plainToClass } from 'class-transformer';
import { UserSchema } from './schemas/User.schema';
import { UserResponse } from 'src/common/models/entity';

@Injectable()
export class UserService {
  constructor(@Inject() private userRepository: UserRepository) {}
   async register(request: IRegisterRequest) {
    const user = await this.userRepository.create(request);
    console.log('service',user);
    return user;
  }
}
