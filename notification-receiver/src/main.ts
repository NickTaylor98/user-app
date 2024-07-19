import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('PORT');

  const logger = new Logger();

  await app.listen(port, '0.0.0.0', () => logger.log(`Listening on port: ${port}`));
}

bootstrap();
