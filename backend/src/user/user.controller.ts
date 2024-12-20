import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
  ) {}
  @Get('findall')
  findAll() {
    return this.userService.findAll();
  }
}
