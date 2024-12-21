import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { AccessTokenGuard } from 'src/common/helpers/guards/accessToken.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      verifyOptions: {
        ignoreExpiration: false,
        algorithms: ['HS256'],
      },
    }),
    UserModule,
  ],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AccessTokenGuard,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
