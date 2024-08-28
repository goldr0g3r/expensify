import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ILoginRequest, IRegisterRequest } from 'src/common/interfaces';
import {
  AccessTokenType,
  RefreshTokenType,
} from 'src/common/models/types/auth';
import { envConfig, Environment } from 'src/config';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(request: IRegisterRequest) {
    const user = await this.userRepository.create(request);
    const tokens = await this.generateToken(user.id, user.username, user.email);
    return { user, tokens };
  }

  async login(request: ILoginRequest) {
    try {
      const user = await this.userRepository.login(request);
      const tokens = await this.generateToken(
        user.id,
        user.username,
        user.email,
      );
      return { user, tokens };
    } catch (err) {
      throw new BadRequestException(err.message.toString());
    }
  }

  private async generateToken(userId, username, email) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          email,
        },
        {
          secret:
            this.configService.get<Environment>(envConfig).accessTokenSecret,
          expiresIn:
            this.configService.get<Environment>(envConfig).accessTokenLife,
          issuer: `http://localhost:${this.configService.get<Environment>(envConfig).port}`,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          email,
        },
        {
          secret:
            this.configService.get<Environment>(envConfig).refreshTokenSecret,
          expiresIn:
            this.configService.get<Environment>(envConfig).refreshTokenLife,
          issuer: `http://localhost:${this.configService.get<Environment>(envConfig).port}`,
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
