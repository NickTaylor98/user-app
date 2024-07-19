import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors();

  const swaggerConfig = new DocumentBuilder().addBearerAuth().setTitle('Test app API').setVersion('1.0').build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('PORT');

  const logger = new Logger();

  await app.listen(port, '0.0.0.0', () => logger.log(`Listening on port: ${port}`));
}

bootstrap();
