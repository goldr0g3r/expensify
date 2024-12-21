import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AllowRoles } from '../decorators/roles.decorator';
import { Roles } from 'src/common/models/auth/enum/Role';
import { UserRepository } from 'src/user/user.repository';
import { UUID } from 'crypto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userRepo: UserRepository,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(AllowRoles, context.getHandler());
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user || {
      roles: [],
    };
    console.log('for roles', user);

    const userRoles = this.getRoles(user['sub'] as UUID);
    console.log(userRoles);
    request.user.roles = userRoles;
    console.log('roles in request', request.user.roles);

    const match = this.matchRoles(roles, user.roles);

    if (match) return true;

    throw new ForbiddenException("You don't have access for this action");
  }

  private getRoles(userId: UUID) {
    const user = this.userRepo.findUserRoles(userId);
    console.log('fetched for roles', user);
    return user;
  }

  private matchRoles(requiredRoles: Roles[], userRoles: Roles[]): boolean {
    userRoles.map((role) => {
      console.log('User role:', role);
    });
    if (userRoles.includes(Roles.BANNED) || userRoles.includes(Roles.SUSPENDED))
      return false;
    if (userRoles.includes(Roles.SUPER_USER)) return true;

    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
