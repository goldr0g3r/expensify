import axios from "axios";
import configurations from "../../config";
import SessionStorageService from "../session-storage";
import {
  IAccessTokenStorage,
  SessionStorageKey,
} from "../../common/entities/sessionStorage";
import { isLoggedIn } from "../../auth/auth.service";
import { randomUUID } from "crypto";

const api = axios.create({
  baseURL: configurations.backendUrl,
  withCredentials: true,
});

const sessionStorage = new SessionStorageService();

api.interceptors.request.use(async (config) => {
  const loggedIn = isLoggedIn();

  if (loggedIn) {
    let token = (
      sessionStorage.get(SessionStorageKey.ACCESS_TOKEN) as IAccessTokenStorage
    )?.accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    else {
      //const res = await refresh();
      const res = { status: true, tokens: { accessToken: "token" } };
      if (res.status) {
        config.headers.Authorization = `Bearer ${res.tokens.accessToken}`;
      }
    }

    const deviceId = randomUUID(); /* TODO: setup local storage/cookie */
    config.headers["deviceId"] = deviceId;
    config.headers["request-starttime"] = Date.now();
  }
  return config;
});

export default api;
