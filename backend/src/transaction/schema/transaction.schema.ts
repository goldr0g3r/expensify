import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID, UUID } from 'crypto';
import { ITransaction } from 'src/common/interfaces/transaction';
import { TransactionType } from 'src/common/interfaces/transaction/base/ITransaction';
import { UserSchema } from 'src/user/schemas/User.schema';

@Schema({ timestamps: true })
export class TransactionSchema implements ITransaction {
  @Prop({ required: true, unique: true, default: () => randomUUID() })
  id: UUID;

  @Prop({ required: true })
  userId: UUID;

  @Prop({ required: true, default: [] })
  categories: UUID[];

  @Prop({ required: true, enum: TransactionType })
  type: TransactionType;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  //   @Prop({ required: true })
  //   createdAt: Date;

  //   @Prop({ required: true })
  //   updatedAt: Date;
}

export const TransactionSchemaObject =
  SchemaFactory.createForClass(TransactionSchema);
