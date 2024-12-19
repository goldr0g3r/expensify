import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID, UUID } from 'crypto';
import { IUserSession, IUserSessionDevice } from 'src/common/interface';

@Schema()
export class UserSessionDevice implements IUserSessionDevice {
  @Prop({ required: true, unique: true, default: () => randomUUID() })
  id: UUID;

  @Prop({ default: () => randomUUID() })
  deviceId?: UUID;

  @Prop()
  name?: string;

  @Prop()
  type?: string;

  @Prop()
  os?: string;

  @Prop()
  osVersion?: string;

  @Prop()
  browser?: string;

  @Prop()
  browserVersion?: string;

  @Prop()
  ip?: string;

  @Prop()
  country?: string;

  @Prop()
  city?: string;

  @Prop()
  timezone?: string;
}

@Schema()
export class UserSessionSchema implements IUserSession {
  @Prop({ required: true, default: () => randomUUID() })
  id: UUID;

  @Prop({ required: true, type: [UserSessionDevice] })
  session: UserSessionDevice[];
}

export const UserSessionDeviceSchemaObject =
  SchemaFactory.createForClass(UserSessionDevice);

export const UserSessionSchemaObject =
  SchemaFactory.createForClass(UserSessionSchema);
