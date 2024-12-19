import { UUID } from 'crypto';

export interface IUserSession {
  session: IUserSessionDevice[];
}

export interface IUserSessionDevice {
  id: UUID;
  deviceId?: UUID;
  name?: string;
  type?: string;
  os?: string;
  osVersion?: string;
  browser?: string;
  browserVersion?: string;
  ip?: string;
  country?: string;
  city?: string;
  timezone?: string;
}
