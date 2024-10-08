import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { ITransactionCreateRequest } from 'src/common/interfaces/transaction';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async createTransaction(request: ITransactionCreateRequest) {
    return this.transactionRepository.createTransaction(request);
  }
}
