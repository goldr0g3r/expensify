import { IsInt, IsNotEmpty, Max, Min, validateSync } from 'class-validator';
import { Expose, plainToClass } from 'class-transformer';
import { registerAs } from '@nestjs/config';
import { IEnvironment } from './common/interfaces';

export class Environment implements IEnvironment {
  @IsNotEmpty()
  @Max(65535)
  @Min(0)
  @IsInt()
  @Expose({ name: 'PORT' })
  port: number;

  @IsNotEmpty()
  @Expose({ name: 'MONGO_URI' })
  mongoURI: string;

  @IsNotEmpty()
  @Expose({ name: 'NODE_ENV' })
  nodeEnv: string;

  @IsNotEmpty()
  @Expose({ name: 'USER_DB' })
  userDB: string;

  @IsNotEmpty()
  @Expose({ name: 'ACCESS_TOKEN_LIFE' })
  accessTokenLife: string;

  @IsNotEmpty()
  @Expose({ name: 'ACCESS_TOKEN_SECRET' })
  accessTokenSecret: string;

  @IsNotEmpty()
  @Expose({ name: 'REFRESH_TOKEN_LIFE' })
  refreshTokenLife: string;

  @IsNotEmpty()
  @Expose({ name: 'REFRESH_TOKEN_SECRET' })
  refreshTokenSecret: string;

  @IsNotEmpty()
  @Expose({ name: 'CATEGORY_DB' })
  categoryDB: string;
}

export const envConfig = 'envConfig';

export const registerConfig = registerAs(envConfig, (): Environment => {
  const envClass = plainToClass(Environment, process.env, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
    exposeDefaultValues: true,
    exposeUnsetFields: true,
  });

  const errors = validateSync(envClass, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) throw new Error(errors.toString());

  return envClass;
});
