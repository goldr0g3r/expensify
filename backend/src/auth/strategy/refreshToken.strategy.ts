import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RefreshTokenType } from 'src/common/models/types/auth';
import { envConfig, Environment } from 'src/config';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<Environment>(envConfig).refreshTokenSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload) {
    const refreshToken = req.headers.authorization.split(
      ' ',
    )[1] as RefreshTokenType;
    const refreshTokenValid = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get<Environment>(envConfig).refreshTokenSecret,
      ignoreExpiration: false,
    });

    if (!refreshTokenValid) throw new UnauthorizedException('Unauthorized');

    return { userId: payload.sub, username: payload.username };
  }
}
