import {
  BadRequestException,
  Injectable,
  LoggerService,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UUID } from 'crypto';
import * as DeviceDetector from 'device-detector-js';
import {
  IPayloadAccessToken,
  IPayloadRefreshToken,
  IUserRegisterRequest,
} from 'src/common/interface';
import { TACCESS_TOKEN, TIpAddress, TREFRESH_TOKEN } from 'src/common/types';
import { Environment } from 'src/config/environment/env.config';
import { Config } from 'src/config/environment/env.constant';
import { InjectLogger } from 'src/config/logger/Logger.decorator';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectLogger(AuthService.name) private readonly logger: LoggerService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  private deviceDetector = new DeviceDetector();

  async loginAccount(
    username: string,
    password: string,
    userAgent?: string,
    ip?: TIpAddress,
    deviceId?: UUID,
  ) {
    try {
      const user = await this.userRepository.loginAccount(username, password);
      if (!user)
        throw new UnprocessableEntityException('Unable to create your account');
      if (typeof user === 'string')
        throw new UnprocessableEntityException(user);
      const tokens = await this.getTokens(user.id, user.username);
      let deviceDetails: DeviceDetector.DeviceDetectorResult | undefined;

      if (userAgent) {
        deviceDetails = this.deviceDetector.parse(userAgent);
      }
      await this.userRepository.addRefreshToken(user.id, {
        refreshToken: tokens.refreshToken,
        deviceId: deviceId,
        ip: ip,
        name: deviceDetails?.device?.model || 'Unknown',
        type: deviceDetails?.device?.type || 'Unknown',
        os: deviceDetails?.os?.name || 'Unknown',
        osVersion: deviceDetails?.os?.version || 'Unknown',
        browser: deviceDetails?.client?.name || 'Unknown',
        browserVersion: deviceDetails?.client?.version || 'Unknown',
      });

      return { user, tokens };
    } catch (error) {
      this.logger.error(error);
      return new BadRequestException();
    }
  }

  async loginAccountWithEmail(
    email: string,
    password: string,
    userAgent?: string,
    ip?: TIpAddress,
    deviceId?: UUID,
  ) {
    try {
      const user = await this.userRepository.loginAccountWithEmail(
        email,
        password,
      );
      if (!user)
        throw new UnprocessableEntityException('Unable to create your account');
      if (typeof user === 'string')
        throw new UnprocessableEntityException(user);
      const tokens = await this.getTokens(user.id, user.username);
      let deviceDetails: DeviceDetector.DeviceDetectorResult | undefined;

      if (userAgent) {
        deviceDetails = this.deviceDetector.parse(userAgent);
      }
      await this.userRepository.addRefreshToken(user.id, {
        refreshToken: tokens.refreshToken,
        deviceId: deviceId,
        ip: ip,
        name: deviceDetails?.device?.model || 'Unknown',
        type: deviceDetails?.device?.type || 'Unknown',
        os: deviceDetails?.os?.name || 'Unknown',
        osVersion: deviceDetails?.os?.version || 'Unknown',
        browser: deviceDetails?.client?.name || 'Unknown',
        browserVersion: deviceDetails?.client?.version || 'Unknown',
      });

      return { user, tokens };
    } catch (error) {
      this.logger.error(error);
      return new BadRequestException();
    }
  }

  async registerAccount(
    request: IUserRegisterRequest,
    userAgent?: string,
    ip?: TIpAddress,
    deviceId?: UUID,
  ) {
    try {
      const user = await this.userRepository.registerAccount(request);
      if (!user)
        throw new UnprocessableEntityException('Unable to create your account');
      if (typeof user === 'string')
        throw new UnprocessableEntityException(user);
      const tokens = await this.getTokens(user.id, user.username);
      let deviceDetails: DeviceDetector.DeviceDetectorResult | undefined;

      if (userAgent) {
        deviceDetails = this.deviceDetector.parse(userAgent);
      }
      await this.userRepository.addRefreshToken(user.id, {
        refreshToken: tokens.refreshToken,
        deviceId: deviceId,
        ip: ip,
        name: deviceDetails?.device?.model || 'Unknown',
        type: deviceDetails?.device?.type || 'Unknown',
        os: deviceDetails?.os?.name || 'Unknown',
        osVersion: deviceDetails?.os?.version || 'Unknown',
        browser: deviceDetails?.client?.name || 'Unknown',
        browserVersion: deviceDetails?.client?.version || 'Unknown',
      });

      return { user, tokens };
    } catch (error) {
      this.logger.error(error.message);
      return false;
    }
  }
  async logoutAccount(userId: UUID, refreshToken: TREFRESH_TOKEN) {
    try {
      console.log(refreshToken, userId);
      const status = await this.userRepository.logoutAccount(
        userId,
        refreshToken,
      );
      if (!status) {
        return new BadRequestException('Something went wrong');
      }
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  async getTokens(userId: UUID, username: string) {
    const accessTokenPayload: IPayloadAccessToken = {
      username: username,
      sub: userId,
      iss: 'auth',
      aud: 'user',
      type: 'access',
    };

    const refreshTokenPayload: IPayloadRefreshToken = {
      username: username,
      sub: userId,
      iss: 'auth',
      aud: 'user',
      type: 'refresh',
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(accessTokenPayload, {
        expiresIn:
          this.configService.get<Environment>(Config).accessTokenExpiresIn,
        secret: this.configService.get<Environment>(Config).accessTokenSecret,
      }) as Promise<TACCESS_TOKEN>,

      this.jwtService.signAsync(refreshTokenPayload, {
        expiresIn:
          this.configService.get<Environment>(Config).refreshTokenExpiresIn,
        secret: this.configService.get<Environment>(Config).refreshTokenSecret,
      }) as Promise<TREFRESH_TOKEN>,
    ]);
    return { accessToken, refreshToken };
  }

  async verifyRefreshTokenInDatabase(
    userId: UUID,
    refreshToken: TREFRESH_TOKEN,
  ) {
    return await this.userRepository.verifyRefreshTokenInDatabase(
      userId,
      refreshToken,
    );
  }
}
