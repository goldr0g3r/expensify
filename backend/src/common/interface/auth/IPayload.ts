import { UUID } from 'crypto';

export interface IPayloadBase {
  username: string;
  sub: string;
  iss: string;
  aud: string;
}

export interface IPayload extends IPayloadBase {
  id: UUID;
}

export interface IPayloadRefreshToken extends IPayloadBase {
  type: 'refresh';
}

export interface IPayloadAccessToken extends IPayloadBase {
  type: 'access';
}

export interface IPayloadForgotPassword extends IPayloadBase {
  id: UUID;
  jti: UUID;
  type: 'forgot-password';
}

export interface IPayloadVerifyEmail extends IPayloadBase {
  id: UUID;
  jti: UUID;
  type: 'verify-email';
}
