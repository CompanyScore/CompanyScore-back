import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
// import * as dotenv from 'dotenv';

// Загружаем переменные окружения перед созданием приложения

// console.log('JWT_SECRET:', process.env.JWT_SECRET);

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
  await app.listen(8080);
}
bootstrap();
