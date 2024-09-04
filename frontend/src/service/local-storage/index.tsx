import ILocalStorageService, {
  IDeviceIdStorage,
  ILocalStorageValue,
  LocalStorageKey,
} from "../../common/entities/localStorage";
import generateUUID from "../../utilities/uuid";

export default class LocalStorageService implements ILocalStorageService {
  constructor() {
    const deviceId = (this.get(LocalStorageKey.DEVICE) as IDeviceIdStorage)
      ?.deviceId;

    if (!deviceId) {
      const newDeviceId = generateUUID();
      this.set(LocalStorageKey.DEVICE, { deviceId: newDeviceId });
    }
  }

  get(key: LocalStorageKey): ILocalStorageValue[LocalStorageKey] | null {
    try {
      const value = localStorage.getItem(key);
      if (value) return JSON.parse(value);
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  set(
    key: LocalStorageKey,
    value: ILocalStorageValue[LocalStorageKey]
  ): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  remove(key: LocalStorageKey): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  clear(): boolean {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
