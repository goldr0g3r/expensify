import { Body, Controller, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionCreateRequest } from 'src/common/models/entity/transaction/request/TransactionCreateRequest';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('income')
  async createIncome(@Body() request: TransactionCreateRequest) {
    return await this.transactionService.createIncome(request);
  }
}
