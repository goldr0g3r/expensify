import {
  UserSessionSchema,
  UserSessionSchemaObject,
} from './userSession.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID, UUID } from 'crypto';
import { IUser } from 'src/common/interface';
import * as PassportLocalMongoose from 'passport-local-mongoose';
import { DefaultRoles, Roles } from 'src/common/models/auth/enum/Role';

@Schema({ timestamps: true })
export class UserSchema implements IUser {
  @Prop({ required: true, unique: true, default: () => randomUUID() })
  id: UUID;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: [], type: [UserSessionSchemaObject] })
  session: UserSessionSchema[];

  @Prop({ required: true, default: false })
  isVerified: boolean;

  @Prop({ default: () => randomUUID() })
  verifyToken: UUID;

  @Prop({ required: true, default: DefaultRoles, enum: Roles, type: [String] })
  roles: Roles[];
}

export const UserSchemaObject = SchemaFactory.createForClass(UserSchema).plugin(
  PassportLocalMongoose,
);
