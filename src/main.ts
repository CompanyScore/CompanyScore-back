import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('CORS ORIGIN:', process.env.FRONT_URL);

  app.enableCors({
    origin: 'https://companyscore.net',
    // Указываем фронтенд
    credentials: true, // Разрешаем отправку куки
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Pragma',
      'Expires',
    ],
    methods: 'GET, POST, PUT, PATCH, DELETE',
  });

  app.use(cookieParser());

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
