import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginAccountRequest,
  RegisterAccountRequest,
} from 'src/common/models/entity';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  registerAccount(@Body() request: RegisterAccountRequest) {
    return this.authService.register(request);
  }

  @Post('login')
  loginAccount(@Body() request: LoginAccountRequest) {
    return this.authService.login(request);
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('accessToken')
  @Get('is_auth')
  isAuth(@Req() req: Request) {
    return { message: 'Hi, User is authenticated' };
  }
}
