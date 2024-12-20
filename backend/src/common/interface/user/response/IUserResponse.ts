import { UUID } from 'crypto';
import { IUserSessionDevice } from '../IUserSession';

export interface IUserResponse {
  id: UUID;
  email: string;
  username: string;
  name: string;
}

export interface IUserResponseWithSession {
  id: UUID;
  username: string;
  name: string;
  session: IUserSessionDevice[];
}
