import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { UserEntity } from 'src/common/models/entity';
import * as passportLocalMongoose from 'passport-local-mongoose';

@Schema({ timestamps: true })
export class UserSchema implements UserEntity {
  @Prop({ required: true, unique: true, default: randomUUID() })
  id: `${string}-${string}-${string}-${string}-${string}`;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;
}

export const UserSchemaObject = SchemaFactory.createForClass(UserSchema).plugin(
  passportLocalMongoose,
);
