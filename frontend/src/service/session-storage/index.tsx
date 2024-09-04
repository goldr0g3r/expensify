import {
  ISessionStorageService,
  ISessionStorageValue,
  SessionStorageKey,
} from "../../common/entities/sessionStorage";

export default class SessionStorageService implements ISessionStorageService {
  get(key: SessionStorageKey): ISessionStorageValue[SessionStorageKey] | null {
    try {
      const value = sessionStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      }
      return null;
    } catch (error) {
      console.error(error);

      return null;
    }
  }
  set(
    key: SessionStorageKey,
    value: ISessionStorageValue[SessionStorageKey]
  ): boolean {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  }
  remove(key: SessionStorageKey): boolean {
    try {
      sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  }
  clear(): boolean {
    try {
      sessionStorage.clear();
      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  }
}
