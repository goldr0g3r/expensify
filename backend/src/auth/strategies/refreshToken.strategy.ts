import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IPayloadRefreshToken } from 'src/common/interface';
import { TREFRESH_TOKEN } from 'src/common/types';
import { Environment } from 'src/config/environment/env.config';
import { Config } from 'src/config/environment/env.constant';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { UUID } from 'crypto';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    environment: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.get<Environment>(Config).refreshTokenSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: IPayloadRefreshToken) {
    const refreshToken = req.headers.authorization.split(
      ' ',
    )[1] as TREFRESH_TOKEN;
    const refreshTokenValid =
      await this.authService.verifyRefreshTokenInDatabase(
        payload.sub as UUID,
        refreshToken,
      );

    if (!refreshTokenValid) throw new UnauthorizedException('Unauthorized');

    return {
      id: payload.sub as UUID,
      username: payload.username,
      refreshToken,
    };
  }
}
