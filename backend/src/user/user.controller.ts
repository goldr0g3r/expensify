import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserParentRoute, userRoutes } from './user.routes';
import { RegisterAccountRequest } from 'src/common/models/entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller(UserParentRoute)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(userRoutes.register)
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiOperation({ summary: 'Register a new user' })
  register(@Body() request: RegisterAccountRequest) {
    return this.userService.register(request);
  }
}
