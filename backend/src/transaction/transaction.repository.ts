import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_CONNECTION } from 'src/common/constant/mongoose';
import { MongoRepository } from 'src/common/helpers';
import { TransactionSchema } from './schema/transaction.schema';
import { ITransactionCreateRequest } from 'src/common/interfaces/transaction';
import { JwtSecretRequestType } from '@nestjs/jwt';
import { TransactionType } from 'src/common/interfaces/transaction/base/ITransaction';

@Injectable()
export class TransactionRepository extends MongoRepository {
  constructor(
    @InjectModel('income', DB_CONNECTION.transaction)
    private readonly incomeModel: Model<TransactionSchema>,
  ) {
    super();
  }

  async createIncome(request: ITransactionCreateRequest) {
    try {
      if (request.type === TransactionType.INCOME) {
        return await this.incomeModel.create(request);
      } else {
        return request;
      }
    } catch (error) {
      throw new UnprocessableEntityException('Failed to create Transaction');
    }
  }
}
