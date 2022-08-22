import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

function swaggerSetup(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Wallet Service API REST')
    .setDescription('This module is uses to define all endpoints and examples of this project.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerSetup(app);
  
  await app.listen(3000);
}

bootstrap();
