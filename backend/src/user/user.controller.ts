import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AllowRoles } from 'src/common/helpers/decorators/roles.decorator';
import { Roles } from 'src/common/models/auth/enum/Role';
import { AccessTokenGuard } from 'src/common/helpers/guards/accessToken.guard';
import { RolesGuard } from 'src/common/helpers/guards/role.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
  ) {}
  @Get('findall')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @AllowRoles([Roles.SUPER_USER])
  findAll() {
    return this.userService.findAll();
  }
}
