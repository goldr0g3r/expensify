import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionCreateRequest } from 'src/common/models/entity/transaction/request/TransactionCreateRequest';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ParentTransactionRoutes,
  TransactionRoutes,
} from './transaction.routes';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@ApiTags('Transaction')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth('accessToken')
@Controller(ParentTransactionRoutes)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post(TransactionRoutes.create)
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Create Transaction' })
  async createIncome(@Body() request: TransactionCreateRequest) {
    return await this.transactionService.createTransaction(request);
  }

  
}
