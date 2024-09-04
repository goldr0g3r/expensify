import { accessTokenType } from "../auth";

export enum SessionStorageKey {
  ACCESS_TOKEN = "accessToken",
}

export interface IAccessTokenStorage {
  accessToken: accessTokenType;
}

export interface ISessionStorageValue {
  [SessionStorageKey.ACCESS_TOKEN]: IAccessTokenStorage;
}

export interface ISessionStorageService {
  get(key: SessionStorageKey): ISessionStorageValue[SessionStorageKey] | null;
  set(
    key: SessionStorageKey,
    value: ISessionStorageValue[SessionStorageKey]
  ): boolean;
  remove(key: SessionStorageKey): boolean;
  clear(): boolean;
}
