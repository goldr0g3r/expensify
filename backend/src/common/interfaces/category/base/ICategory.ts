import { UUID } from 'crypto';

export interface ICategory {
  id: UUID;
  name: string;
  icon: string;
  userId: UUID;
}
