import { AxiosError } from "axios";
import { LocalStorageKey } from "../common/entities/localStorage";
import { SessionStorageKey } from "../common/entities/sessionStorage";
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

export function isLoggedIn(): boolean {
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
