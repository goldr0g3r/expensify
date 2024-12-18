import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerService } from './config/logger/Logger.service';
import { ConfigService } from '@nestjs/config';
import { Config } from './config/environment/env.constant';
import { Environment } from './config/environment/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // logger
  const logger = await app.resolve(LoggerService);

  // environment
  const environment = app.get(ConfigService).get<Environment>(Config);

  // swagger
  const options = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('nestjs')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'refresh-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(environment.port);
  logger.http(`Application is running on: ${await app.getUrl()}`);
  logger.verbose(`Swagger is running on: ${await app.getUrl()}/api-docs`);
}
bootstrap();
