import { UUID } from 'crypto';

export interface ITransactionCreateRequest {
  amount: number;
  categoryId: UUID[];
  date: Date;
  title: string;
  description: string;
  type: string;
  userId: UUID;
}
