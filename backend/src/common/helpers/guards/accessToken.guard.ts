import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IPayloadAccessToken } from 'src/common/interface';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> | boolean | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    return super.canActivate(context);
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

    return { userId: payload.sub, username: payload.username };
  }
}
