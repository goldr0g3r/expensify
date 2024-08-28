import { IUser } from 'src/common/interfaces';

export class UserEntity implements IUser {
  id: `${string}-${string}-${string}-${string}-${string}`;
  username: string;
  email: string;
  name: string;
}
