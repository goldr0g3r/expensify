import { UUID } from 'crypto';
// user interface for an expense tracer
export interface IUser {
  id: UUID;
  email: string;
  username: string;
}
