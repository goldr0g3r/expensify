import { registerAs } from '@nestjs/config';
import { Expose, plainToClass } from 'class-transformer';
import { IsNotEmpty, IsNumber, Max, Min, validateSync } from 'class-validator';
import { Config } from './env.constant';

export interface IEnvironment {
  port: number;
}
export class Environment implements IEnvironment {
  @IsNumber()
  @IsNotEmpty()
  @Expose({ name: 'PORT' })
  @Max(65535)
  @Min(1)
  port: number;
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
