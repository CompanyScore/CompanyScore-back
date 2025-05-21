import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.enableCors({
    origin: [
      'https://companyscore.net',
      'http://localhost:3000',
      'https://admin.companyscore.net',
      'http://localhost:4000',
    ],
    credentials: true,
    methods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Pragma',
      'Expires',
    ],
  });

  app.use(cookieParser());

  const port = process.env.PORT || 8000;
  await app.listen(port);
}
bootstrap();
