import axios from "axios";
import configurations from "../../config";
import SessionStorageService from "../session-storage";
import {
  IAccessTokenStorage,
  SessionStorageKey,
} from "../../common/entities/sessionStorage";
import { isLoggedIn, refresh } from "../../auth/auth.service";
import { randomUUID } from "crypto";
import generateUUID from "../../utilities/uuid";
import LocalStorageService from "../local-storage";

const api = axios.create({
  baseURL: configurations.backendUrl,
  withCredentials: true,
});

const sessionStorage = new SessionStorageService();
const localStorage = new LocalStorageService();

api.interceptors.request.use(async (config) => {
  const loggedIn = isLoggedIn();

  if (loggedIn) {
    let token = (
      sessionStorage.get(SessionStorageKey.ACCESS_TOKEN) as IAccessTokenStorage
    )?.accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    else {
      const res = await refresh();
      if (res.status) {
        config.headers.Authorization = `Bearer ${res.tokens?.accessToken}`;
      }
    }

    const deviceId = generateUUID(); /* TODO: setup local storage/cookie */
    config.headers["deviceId"] = deviceId;
    config.headers["request-starttime"] = Date.now();
  }
  return config;
});

export default api;
