import { IsInt, IsNotEmpty, Max, Min, validateSync } from 'class-validator';
import { IEnvironment } from './common/interfaces/environment';
import { Expose, plainToClass } from 'class-transformer';
import { registerAs } from '@nestjs/config';

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
}

export const envConfig = 'envConfig';

export const env = registerAs(envConfig, (): Environment => {
  const environment = plainToClass(Environment, process.env, {
    exposeDefaultValues: true,
    enableImplicitConversion: true,
  });
  const error = validateSync(environment);
  if (error.length) {
    // throw error in red color
    throw new Error(
      '\x1b[31mSomething went wrong with the environment variables!\x1b[0m',
    );
  }

  return environment;
});
