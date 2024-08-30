import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UUID } from 'crypto';
import { ITransactionResponse } from 'src/common/interfaces/transaction';
import { TransactionType } from 'src/common/interfaces/transaction/base/ITransaction';

export class TransactionResponse implements ITransactionResponse {
  @ApiProperty({
    title: 'Transaction ID',
    example: '12345678-1234-1234-1234-123456789012',
    required: true,
  })
  @Expose()
  id: UUID;

  @ApiProperty({
    title: 'Transaction Type',
    example: TransactionType.INCOME,
    required: true,
    enum: TransactionType,
  })
  @Expose()
  type: TransactionType;

  @ApiProperty({
    title: 'Transaction Amount',
    example: 100000,
    required: true,
  })
  @Expose()
  amount: number;

  @ApiProperty({
    title: 'Transaction Date',
    example: new Date(),
    required: true,
  })
  @Expose()
  date: Date;

  @ApiProperty({
    title: 'Transaction Title',
    example: 'Salary',
    required: true,
  })
  @Expose()
  title: string;

  @ApiProperty({
    title: 'Transaction Description',
    example: 'Monthly Salary',
    required: false,
  })
  @Expose()
  description: string;

  @ApiProperty({
    title: 'Transaction Category ID',
    example: ['12345678-1234-1234-1234-123456789012'],
    required: true,
  })
  @Expose()
  categoryId: string[];

  @ApiProperty({
    title: 'User ID',
    example: '12345678-1234-1234-1234-123456789012',
    required: true,
  })
  @Expose()
  userId: UUID;

  @ApiProperty({
    title: 'Created At',
    example: new Date(),
    required: true,
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    title: 'Updated At',
    example: new Date(),
    required: true,
  })
  @Expose()
  updatedAt: Date;
}
