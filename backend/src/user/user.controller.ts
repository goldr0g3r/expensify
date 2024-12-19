import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { RegisterUserRequest } from './dto/request/registerRequest.dto';

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

  @Post('register')
  register(@Body() body: RegisterUserRequest) {
    return this.userRepository.registerAccount(body);
  }
}
