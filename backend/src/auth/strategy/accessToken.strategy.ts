import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/common/models/types/auth';
import { envConfig, Environment } from 'src/config';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<Environment>(envConfig).accessTokenSecret,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload) {
    return { userId: payload.sub, username: payload.username };
  }
}
