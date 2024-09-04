import { UUID } from "crypto";

export interface IUser {
  id: UUID;
  name: string;
  email: string;
  username: string;
}
