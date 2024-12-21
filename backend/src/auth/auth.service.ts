import {
  BadRequestException,
  Injectable,
  LoggerService,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomUUID, UUID } from 'crypto';
import * as DeviceDetector from 'device-detector-js';
import {
  IPayloadAccessToken,
  IPayloadRefreshToken,
  IPayloadVerifyEmail,
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

  async verifyEmail(token: TACCESS_TOKEN) {
    try {
      const payload = this.jwtService.decode(token) as IPayloadVerifyEmail;
      console.log(token);
      const user = await this.userRepository.fetchUserVverifiedStatus(
        payload.id,
      );
      if (!user || typeof user === 'string' || user === null) {
        return new UnprocessableEntityException('User not found');
      }
      if (user.isVerified === true) {
        return new UnprocessableEntityException('User already verified');
      }

      const status = await this.userRepository.updateUserVerificationStatus(
        payload.id,
        true,
      );
      if (!status) {
        return new UnprocessableEntityException('Unable to verify user');
      }

      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  async sentVerificationEmail(userId: UUID, username: string) {
    try {
      const verifyToken =
        await this.userRepository.fetchUserVverifiedStatus(userId);
      console.log(verifyToken);
      const token = await this.generateVerificationToken(
        userId,
        username,
        verifyToken.verifyToken,
      );
      if (!token) {
        return new BadRequestException('Unable to generate token');
      }

      if (!token.status) {
        return new BadRequestException('Unable to update user');
      }

      return token.token;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  async generateVerificationToken(
    userId: UUID,
    username: string,
    verifyToken: UUID,
  ) {
    try {
      const payload: IPayloadVerifyEmail = {
        sub: userId,
        iss: 'auth',
        aud: 'user',
        type: 'verify-email',
        id: userId,
        jti: verifyToken,
        username: username,
      };
      const token = await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
        secret: this.configService.get<Environment>(Config).verifyEmailSecret,
      });

      return { token: token, status: true };
    } catch (error) {
      this.logger.error(error);
      return { status: false };
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
