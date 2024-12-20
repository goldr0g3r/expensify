import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID, UUID } from 'crypto';
import { IUserSessionDevice } from 'src/common/interface';
import { TIpAddress, TREFRESH_TOKEN } from 'src/common/types';

@Schema({ timestamps: true })
export class UserSessionSchema implements IUserSessionDevice {
  @Prop({ default: () => randomUUID() })
  deviceId: UUID;

  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  os: string;

  @Prop()
  osVersion: string;

  @Prop()
  browser: string;

  @Prop()
  browserVersion: string;

  @Prop()
  ip: TIpAddress;

  @Prop()
  refreshToken?: TREFRESH_TOKEN;
}

export const UserSessionSchemaObject =
  SchemaFactory.createForClass(UserSessionSchema);
