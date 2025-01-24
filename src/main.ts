import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as dotenv from 'dotenv';

// Загружаем переменные окружения перед созданием приложения

// console.log('JWT_SECRET:', process.env.JWT_SECRET);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Указываем фронтенд
    credentials: true, // Разрешаем отправку куки
  });
  await app.listen(8080);
}
bootstrap();
