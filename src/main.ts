import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:3000', // Указываем фронтенд
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Pragma',
      'Expires',
    ],
    credentials: true, // Разрешаем отправку куки
    methods: 'GET, POST, PUT, PATCH, DELETE',
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 8080);

  await app.listen(port);
}
bootstrap();
