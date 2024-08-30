import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_CONNECTION } from 'src/common/constant/mongoose';
import { MongoRepository } from 'src/common/helpers';
import { TransactionSchema } from './schema/transaction.schema';
import { ITransactionCreateRequest } from 'src/common/interfaces/transaction';
import { JwtSecretRequestType } from '@nestjs/jwt';
import { TransactionType } from 'src/common/interfaces/transaction/base/ITransaction';
import { plainToClass } from 'class-transformer';
import { TransactionResponse } from 'src/common/models/entity/transaction/response/TransactionResponse';

@Injectable()
export class TransactionRepository extends MongoRepository {
  constructor(
    @InjectModel(TransactionSchema.name, DB_CONNECTION.transaction)
    private readonly transactionModel: Model<TransactionSchema>,
  ) {
    super();
  }

  async createTransaction(request: ITransactionCreateRequest) {
    try {
      if (request.type === TransactionType.INCOME) {
        const transaction = await this.transactionModel.create(request);
        return await this.toTransactionModel(transaction);
      } else {
        const transaction = await this.transactionModel.create(request);
        return await this.toTransactionModel(transaction);
      }
    } catch (error) {
      throw new UnprocessableEntityException('Failed to create Transaction');
    }
  }

  private async toTransactionModel(request: TransactionSchema) {
    const response = plainToClass(TransactionResponse, request, {
      excludeExtraneousValues: true,
    });
    return response;
  }
}
