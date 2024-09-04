import { accessTokenType, refreshTokenType } from "../../../common/entities/auth";
import { IUser } from "../../../common/entities/user";

export interface IValidationError {
  [field: string]: string[];
}

export interface IValidationErrors {
  errors: IValidationError;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginSuccessResponse {
  status: true;
  data: IUser;
  message?: string;
}

export interface ILoginFailedResponse {
  status: false;
  message: string;
  errors?: IValidationError;
}

export interface ILoginAPIResponse {
  status: boolean;
  message: string;
  data: IUser;
  tokens: {
    refreshToken: refreshTokenType;
    accessToken: accessTokenType;
  };
}

export interface IValidationErrorApiResponse extends IValidationErrors {
  status: number;
  title: string;
  message?: string;
  error?: string;
  detail?: string;
  type: string;
}
