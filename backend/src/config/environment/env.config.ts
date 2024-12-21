import { registerAs } from '@nestjs/config';
import { Expose, plainToClass } from 'class-transformer';
import { IsNotEmpty, IsNumber, Max, Min, validateSync } from 'class-validator';
import { Config } from './env.constant';
import IEnvironment from 'src/common/interface/environment';

export class Environment implements IEnvironment {
  @IsNumber()
  @IsNotEmpty()
  @Expose({ name: 'PORT' })
  @Max(65535)
  @Min(1)
  port: number;

  @IsNotEmpty()
  @Expose({ name: 'NODE_ENV' })
  nodeEnv: string;

  @IsNotEmpty()
  @Expose({ name: 'MONGO_URI' })
  mongoURI: string;

  @IsNotEmpty()
  @Expose({ name: 'USER_DATABASE' })
  userDatabase: string;

  @IsNotEmpty()
  @Expose({ name: 'CATEGORY_DATABASE' })
  categoryDatabase: string;

  @IsNotEmpty()
  @Expose({ name: 'EXPENSE_DATABASE' })
  expenseDatabase: string;

  @IsNotEmpty()
  @Expose({ name: 'ACCESS_TOKEN_SECRET' })
  accessTokenSecret: string;

  @IsNotEmpty()
  @Expose({ name: 'REFRESH_TOKEN_SECRET' })
  refreshTokenSecret: string;

  @IsNotEmpty()
  @Expose({ name: 'ACCESS_TOKEN_EXPIRES_IN' })
  accessTokenExpiresIn: string;

  @IsNotEmpty()
  @Expose({ name: 'REFRESH_TOKEN_EXPIRES_IN' })
  refreshTokenExpiresIn: string;

  @IsNotEmpty()
  @Expose({ name: 'COOKIE_SECRET' })
  cookieSecret: string;

  @IsNotEmpty()
  @Expose({ name: 'VERIFY_EMAIL_SECRET' })
  verifyEmailSecret: string;
}

export const registerConfig = registerAs(Config, (): Environment => {
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
