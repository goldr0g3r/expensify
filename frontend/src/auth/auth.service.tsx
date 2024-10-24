import axios, { AxiosError } from "axios";
import {
  IDeviceIdStorage,
  IRefreshTokenStorage,
  LocalStorageKey,
} from "../common/entities/localStorage";
import { IAccessTokenStorage, SessionStorageKey } from "../common/entities/sessionStorage";
import api from "../service/api";
import LocalStorageService from "../service/local-storage";
import SessionStorageService from "../service/session-storage";
import {
  ILoginAPIResponse,
  ILoginFailedResponse,
  ILoginRequest,
  ILoginSuccessResponse,
  IValidationErrorApiResponse,
} from "./entities/login";
import configurations from "../config";

const sessionStorageService = new SessionStorageService();
const localStorageService = new LocalStorageService();

export async function login(
  request: ILoginRequest
): Promise<ILoginSuccessResponse | ILoginFailedResponse> {
  try {
    const response = await api.post<ILoginAPIResponse>("/auth/login", request);
    if (!response)
      return { status: false, message: "No Response from Server!" };

    if (!response.data.tokens)
      return { status: false, message: "No Response from Server!" };

    sessionStorageService.set(SessionStorageKey.ACCESS_TOKEN, {
      accessToken: response.data.tokens.accessToken,
    });
    localStorageService.set(LocalStorageKey.REFRESH_TOKEN, {
      refreshToken: response.data.tokens.refreshToken,
    });

    if (response.data.data) {
      localStorageService.set(LocalStorageKey.USER, response.data.data);
    }
    return {
      status: true,
      data: response.data.data,
    };
  } catch (error: AxiosError | any) {
    return classValidatorErrorParser(error);
  }
}

export async function refresh() {
  try {
    const refreshToken = localStorageService.get(
      LocalStorageKey.REFRESH_TOKEN
    ) as IRefreshTokenStorage;
    if (!refreshToken)
      return {
        status: false,
        message: "Something went wrong! Kindly login again.",
      };
    const deviceId = (
      localStorageService.get(LocalStorageKey.DEVICE) as IDeviceIdStorage
    )?.deviceId;

    const response = await axios.post<ILoginAPIResponse>(
      "/auth/refresh",
      {},
      {
        baseURL: configurations.backendUrl,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          deviceId: deviceId,
        },
      }
    );
    if (!response)
      return { status: false, message: "No Response from the server" };

    if (!response.data.tokens)
      return { status: false, message: "No Response from the server" };

    sessionStorageService.set(SessionStorageKey.ACCESS_TOKEN, {
      accessToken: response.data.tokens.accessToken,
    });

    if (response.data.data)
      localStorageService.set(LocalStorageKey.USER, response.data.data);
    return {
      status: true,
      data: response.data.data,
      tokens: { accessToken: response.data.tokens.accessToken },
    };
  } catch (error: any | AxiosError) {
    console.error(error);
    if (
      error?.response?.status === 401 ||
      error?.response?.data?.detail === "Unauthorized" ||
      error?.response?.data?.status === 401
    ) {
      await logout();

      return { status: false, message: "LOGGED OUT" };
    }
    if (error instanceof AxiosError) {
      return {
        status: false,
        message:
          "Network Error Occurred. Check your internet connection and try again!",
      };
    }

    return {
      status: false,
      message: "Error Occurred. Please Logout and Login",
    };
  }
}

export function isLoggedIn(): boolean {
  try {
    const refreshToken = localStorageService.get(LocalStorageKey.REFRESH_TOKEN);
    if (!refreshToken) return false;
    return true;
  } catch (error) {
    console.error("Error in Handling Tokens: ", error);
    return false;
  }
}

export async function logout(): Promise<boolean> {
  try {
    const accessToken = (
      sessionStorageService.get(
        SessionStorageKey.ACCESS_TOKEN
      ) as IAccessTokenStorage
    )?.accessToken;
    const deviceId = (
      localStorageService.get(LocalStorageKey.DEVICE) as IDeviceIdStorage
    )?.deviceId;

    await axios.post(
      "/auth/logout",
      {},
      {
        withCredentials: true,
        baseURL: configurations.backendUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          deviceid: deviceId,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }

  sessionStorageService.clear();
  localStorageService.remove(LocalStorageKey.USER);
  localStorageService.remove(LocalStorageKey.REFRESH_TOKEN);

  window.location.reload();

  return true;
}

function classValidatorErrorParser(
  error: AxiosError<IValidationErrorApiResponse> | any
): ILoginFailedResponse {
  if (error?.response?.data) {
    if (error.response.data.errors)
      return {
        status: false,
        message: "Kindly re-verify the details you submitted",
        errors: error.response.data.errors,
      };

    if (error.response.data.title)
      return { status: false, message: error.response.data.title };

    if (error.response.data.message)
      return { status: false, message: error.response.data.message };

    if (error.response.data.error)
      return { status: false, message: error.response.data.error };

    if (error.response.data.detail)
      return { status: false, message: error.response.data.detail };
  }

  if (error.response?.title)
    return { status: false, message: error.response.data.title };

  if (error.response?.message)
    return { status: false, message: error.response.data.message };

  if (error.response?.error)
    return { status: false, message: error.response.data.error };

  if (error.response?.detail)
    return { status: false, message: error.response.data.detail };

  return {
    status: false,
    message: `Unable to perform the action. Error: ${error}`,
  };
}
