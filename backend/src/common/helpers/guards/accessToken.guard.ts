import { TACCESS_TOKEN } from 'src/common/types';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { UUID } from 'crypto';
import { AuthService } from 'src/auth/auth.service';
import { IPayloadAccessToken } from 'src/common/interface';
import { UserRepository } from 'src/user/user.repository';
import { IS_PUBLIC_KEY } from '../decorators/public.decorators';
import { Request } from 'express';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const activate = await this.setHTTPHeader(
      context.switchToHttp().getRequest(),
      isPublic,
    );
    if (!activate) {
      return false;
    }
    return activate;
  }
  /**
   * @Summary SetHTTPHeader
   * @description Chcecks if the header has a valid access token, validates it with the userID
   */
  async setHTTPHeader(req: Request, isPublic: boolean): Promise<boolean> {
    const auth = req.headers?.authorization;
    if (!auth || auth === undefined || auth === null) {
      return isPublic;
    }
    const bearer = req.headers.authorization.split(' ')[0];
    const accessToken = req.headers.authorization.split(
      ' ',
    )[1] as TACCESS_TOKEN;
    if (!accessToken) {
      return false;
    }

    if (bearer !== 'Bearer') {
      return false;
    }

    try {
      const decode = this.jwtService.decode(accessToken) as IPayloadAccessToken;
      if (!decode) {
        return false;
      }

      if (decode.type !== 'access' || decode.iss !== 'auth') {
        return false;
      }

      if (decode.sub === undefined || decode.username === undefined) {
        return false;
      }

      req.user = decode;
      const userId = decode.sub as UUID;
      const user = await this.userRepository.findUserById(userId);
      if (!user || typeof user === 'string') {
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);
      return isPublic;
    }
  }
}
