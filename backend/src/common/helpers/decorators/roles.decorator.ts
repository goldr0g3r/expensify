import { Reflector } from '@nestjs/core';
import { Roles } from 'src/common/models/auth/enum/Role';

export const AllowRoles = Reflector.createDecorator<Roles[]>();
