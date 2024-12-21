import {
  Injectable,
  LoggerService,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IPayloadAccessToken } from 'src/common/interface';
import { Environment } from 'src/config/environment/env.config';
import { Config } from 'src/config/environment/env.constant';
import { Request } from 'express';
import { UserRepository } from 'src/user/user.repository';
import { UUID } from 'crypto';
import { InjectLogger } from 'src/config/logger/Logger.decorator';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    @InjectLogger(AccessTokenStrategy.name)
    private readonly logger: LoggerService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<Environment>(Config).accessTokenSecret,
      passReqToCallback: true,
    });
  }

  async validate(payload: IPayloadAccessToken) {
    if (!payload) {
      return false;
    }
    if (payload.type !== 'access' || payload.iss !== 'auth') {
      return false;
    }

    if (payload.sub === undefined || payload.username === undefined) {
      return false;
    }
    console.log(payload.sub);

    const userRoles = await this.userRepository.findUserRoles(
      payload.sub as UUID,
    );
    this.logger.log(`User roles: ${userRoles}`);

    return { ...payload, roles: userRoles };
  }
}
