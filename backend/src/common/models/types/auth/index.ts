import { UUID } from 'crypto';

export interface JwtPayload {
  sub: UUID;
  username: string;
  tokenValue: string;
}

export type RefreshTokenType = `${string}.${string}.${string}`;
export type AccessTokenType = `${string}.${string}.${string}`;

export type IpAddressType = `${number}.${number}.${number}.${number}`;
