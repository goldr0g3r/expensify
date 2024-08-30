import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { ITransactionCreateRequest } from 'src/common/interfaces/transaction';
import { TransactionType } from 'src/common/interfaces/transaction/base/ITransaction';

export class TransactionCreateRequest implements ITransactionCreateRequest {
  @ApiProperty({
    title: 'Transaction Type',
    example: 'INCOME',
    required: true,
    enum: TransactionType,
  })
  type: string;

  @ApiProperty({
    title: 'Transaction Amount',
    example: 100000,
    required: true,
  })
  amount: number;

  @ApiProperty({
    title: 'Transaction Date',
    example: new Date(),
    required: true,
  })
  date: Date;

  @ApiProperty({
    title: 'Transaction Title',
    example: 'Salary',
    required: true,
  })
  title: string;

  @ApiProperty({
    title: 'Transaction Description',
    example: 'Monthly Salary',
    required: false,
  })
  description: string;

  @ApiProperty({
    title: 'Transaction Category ID',
    example: ['12345678-1234-1234-1234-123456789012'],
    required: true,
  })
  categoryId: UUID[];

  @ApiProperty({
    title: 'User ID',
    example: '12345678-1234-1234-1234-123456789012',
    required: true,
  })
  userId: UUID;
}
