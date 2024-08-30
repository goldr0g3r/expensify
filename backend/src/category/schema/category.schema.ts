import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID, UUID } from 'crypto';
import { ICategory } from 'src/common/interfaces/category';

@Schema({ timestamps: true })
export class CategorySchema implements ICategory {
  @Prop({ unique: true, required: true, default: () => randomUUID() })
  id: UUID;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  icon: string;

  @Prop({ required: true })
  userId: UUID;
}

export const CategorySchemaObject =
  SchemaFactory.createForClass(CategorySchema);
