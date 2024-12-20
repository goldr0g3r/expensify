import { UUID } from 'crypto';
import { TIpAddress, TREFRESH_TOKEN } from 'src/common/types';

export interface IUserSession {
  session: IUserSessionDevice[];
}

export interface IUserSessionDevice {
  deviceId: UUID;
  name: string;
  type: string;
  os: string;
  osVersion: string;
  browser: string;
  browserVersion: string;
  ip: TIpAddress;
  refreshToken?: TREFRESH_TOKEN;
}
