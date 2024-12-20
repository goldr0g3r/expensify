import { UUID } from 'crypto';

export interface IUser {
  id: UUID;
  username: string;
  email: string;
  name: string;
}
