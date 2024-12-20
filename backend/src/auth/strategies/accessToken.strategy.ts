import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IPayloadAccessToken } from 'src/common/interface';
import { Environment } from 'src/config/environment/env.config';
import { Config } from 'src/config/environment/env.constant';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<Environment>(Config).accessTokenSecret,
      passReqToCallback: true,
    });
  }

  async validate(payload: IPayloadAccessToken) {
    if (!payload) {
      return new UnauthorizedException('Invalid payload');
    }

    if (payload.type !== 'access' || payload.iss !== 'auth') {
      return new UnauthorizedException('Invalid token');
    }

    if (payload.sub === undefined || payload.username === undefined) {
      return new UnauthorizedException('Invalid token');
    }

    return { userId: payload.sub, username: payload.username };
  }
}
