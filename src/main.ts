import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: process.env.FRONT_URL,
    // Указываем фронтенд
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

  const config = new DocumentBuilder()
    .setTitle('CompanyScore')
    .setDescription('The CompanyScore API description')
    .setVersion('1.0')
    .addTag('CompanyScore')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 8080);

  await app.listen(port);
}
bootstrap();
