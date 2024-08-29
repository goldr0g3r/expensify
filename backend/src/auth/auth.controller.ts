import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginAccountRequest,
  RegisterAccountRequest,
} from 'src/common/models/entity';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { AuthParentRoute, AuthRoutes } from './auth.routes';

@Controller(AuthParentRoute)
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post(AuthRoutes.register)
  registerAccount(@Body() request: RegisterAccountRequest) {
    return this.authService.register(request);
  }

  @Post(AuthRoutes.login)
  loginAccount(@Body() request: LoginAccountRequest) {
    return this.authService.login(request);
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('accessToken')
  @Get('is_auth')
  isAuth(@Req() req: Request) {
    // get user from request object
    return {
      message: 'Hi, User is authenticated - accessToken',
    };
  }

  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth('refreshToken')
  @Get('refresh')
  refresh(@Req() req: Request) {
    return {
      message: 'Hi, User is authenticated - refreshToken',
    };
  }
}
