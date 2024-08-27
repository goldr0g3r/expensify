import { Prop, Schema } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { UserEntity } from 'src/common/models/entity';

@Schema({ timestamps: true })
export class UserSchema implements UserEntity {
  @Prop({ required: true, unique: true, default: randomUUID() })
  id: `${string}-${string}-${string}-${string}-${string}`;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;
}
