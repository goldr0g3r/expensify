import {
  UserSessionSchema,
  UserSessionSchemaObject,
} from './userSession.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID, UUID } from 'crypto';
import { IUser } from 'src/common/interface';
import * as PassportLocalMongoose from 'passport-local-mongoose';

@Schema({ timestamps: true })
export class UserSchema implements IUser {
  @Prop({ required: true, unique: true, default: () => randomUUID() })
  id: UUID;

  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: [], type: [UserSessionSchemaObject] })
  session: UserSessionSchema[];
}

export const UserSchemaObject = SchemaFactory.createForClass(UserSchema).plugin(
  PassportLocalMongoose,
);
