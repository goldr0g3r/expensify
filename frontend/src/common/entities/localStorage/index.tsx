import { refreshTokenType } from "../auth";
import { IUser } from "../user";

export interface IRefreshTokenStorage {
  refreshToken: refreshTokenType;
}
export interface IDeviceIdStorage {
  deviceId: string;
}

export enum LocalStorageKey {
  USER = "user",
  REFRESH_TOKEN = "refreshToken",
  DEVICE = "device",
}

export interface ILocalStorageValue {
  [LocalStorageKey.USER]: IUser;
  [LocalStorageKey.REFRESH_TOKEN]: IRefreshTokenStorage;
  [LocalStorageKey.DEVICE]: IDeviceIdStorage;
}

export default interface ILocalStorageService {
  get(key: LocalStorageKey): ILocalStorageValue[LocalStorageKey] | null;
  set(
    key: LocalStorageKey,
    value: ILocalStorageValue[LocalStorageKey]
  ): boolean;
  remove(key: LocalStorageKey): boolean;
  clear(): boolean;
}
