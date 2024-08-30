import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TransactionSchema,
  TransactionSchemaObject,
} from './schema/transaction.schema';
import { DB_CONNECTION } from 'src/common/constant/mongoose';
import { TransactionRepository } from './transaction.repository';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        // {
        //   name: 'income',
        //   schema: TransactionSchemaObject,
        //   collection: 'income',
        // },
        // {
        //   name: TransactionSchema.name,
        //   schema: TransactionSchemaObject,
        //   collection: 'expense',
        // },
        {
          name: TransactionSchema.name,
          schema: TransactionSchemaObject,
          collection: 'transaction',
        },
      ],
      DB_CONNECTION.transaction,
    ),
  ],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository],
})
export class TransactionModule {}
