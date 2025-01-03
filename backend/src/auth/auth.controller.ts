import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterRequest } from 'src/user/dto/request/registerRequest.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  UserLoginRequest,
  UserLoginWithEmailRequest,
} from 'src/user/dto/request/loginRequest.dto';
import { Request } from 'express';
import { UUID } from 'crypto';
import { TACCESS_TOKEN, TIpAddress, TREFRESH_TOKEN } from 'src/common/types';
import { AccessTokenGuard } from 'src/common/helpers/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/helpers/guards/refreshToken.guard';
import { UserRepository } from 'src/user/user.repository';
import {
  Private,
  Public,
} from 'src/common/helpers/decorators/public.decorators';
@ApiTags('Authentication')
@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepo: UserRepository,
  ) {}

  @Post('login')
  async loginAccount(@Body() request: UserLoginRequest, @Req() req: Request) {
    return await this.authService.loginAccount(
      request.username,
      request.password,
      req.headers['user-agent'],
      req.ip as TIpAddress,
      req.headers['deviceid'] as UUID,
    );
  }

  @Post('login-with-email')
  async loginAccountWithEmail(
    @Body() request: UserLoginWithEmailRequest,
    @Req() req: Request,
  ) {
    return await this.authService.loginAccountWithEmail(
      request.email,
      request.password,
      req.headers['user-agent'],
      req.ip as TIpAddress,
      req.headers['deviceid'] as UUID,
    );
  }

  @Post('register')
  async registerAccount(
    @Body() request: UserRegisterRequest,
    @Req() req: Request,
  ) {
    console.log(req.headers['deviceid']);
    return await this.authService.registerAccount(
      request,
      req.headers['user-agent'],
      req.ip as TIpAddress,
      req.headers['deviceid'] as UUID,
    );
  }

  @Private()
  @ApiBearerAuth('refresh-token')
  @UseGuards(RefreshTokenGuard)
  @Post('logout')
  async logout(@Req() req: Request) {
    const refreshToken = req.headers['authorization'].split(
      ' ',
    )[1] as TREFRESH_TOKEN;

    const userId = req?.user['id'];
    if (!userId) {
      return new UnauthorizedException('Something went wrong');
    }
    return await this.authService.logoutAccount(
      req.user['id'] as UUID,
      refreshToken,
    );
  }

  @ApiTags('Profile')
  @Private()
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Post('profile')
  async profile(@Req() req: Request) {
    if (!req.user) return 'Something went wrong';
    return this.userRepo.findUserById(req.user['sub'] as UUID);
  }

  @ApiTags('Verification')
  @Post('verify-email')
  @ApiParam({ name: 'token' })
  async verifyEmail(@Req() req: Request, @Param('token') input: string) {
    const token = input as TACCESS_TOKEN;
    return await this.authService.verifyEmail(token);
  }

  @UseGuards(AccessTokenGuard)
  @Private()
  @ApiBearerAuth('access-token')
  @Post('sent-verification-email')
  async sentVerificationEmail(@Req() request: Request) {
    console.log(request.user);
    return await this.authService.sentVerificationEmail(
      request.user['sub'] as UUID,
      request.user['username'],
    );
  }
}
