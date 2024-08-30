import { UUID } from 'crypto';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface ITransaction {
  id: UUID;
  userId: UUID;
  categories?: UUID[];
  type: TransactionType;
  amount: number;
  date: Date;
  title: string;
  description?: string;
  //   createdAt: Date;
  //   updatedAt: Date;
}
