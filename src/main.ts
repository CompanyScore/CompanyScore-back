import { NestFactory } from '@nestjs/core';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
// import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Обрабатываем preflight-запросы (OPTIONS) https://companyscore.net/
  // app.use((req, res, next) => {
  //   console.log('Origin:', req.headers.origin); // Добавьте это для проверки

  //   const allowedOrigins = [
  //     'https://companyscore.net',
  //     'https://api.companyscore.net',
  //   ];
  //   const origin = req.headers.origin;

  //   if (allowedOrigins.includes(origin)) {
  //     res.header('Access-Control-Allow-Origin', origin);
  //   }

  //   res.header(
  //     'Access-Control-Allow-Methods',
  //     'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  //   );
  //   res.header(
  //     'Access-Control-Allow-Headers',
  //     'Content-Type, Authorization, Cache-Control, Pragma, Expires',
  //   );
  //   res.header('Access-Control-Allow-Credentials', 'true');

  //   if (req.method === 'OPTIONS') {
  //     res.status(200).send();
  //   } else {
  //     next();
  //   }
  // });

  // app.use(
  //   helmet({
  //     crossOriginResourcePolicy: { policy: 'cross-origin' },
  //   }),
  // );

  // app.enableCors({
  //   origin: 'https://companyscore.net',
  //   credentials: true,
  // });

  app.enableCors({
    origin: ['https://companyscore.net/', 'https://api.companyscore.net/'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Pragma',
      'Expires',
    ],
    credentials: true, // Разрешаем отправку куки
    methods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  });

  app.use(cookieParser());

  // const config = new DocumentBuilder()
  //   .setTitle('CompanyScore')
  //   .setDescription('The CompanyScore API description')
  //   .setVersion('1.0')
  //   .addTag('CompanyScore')
  //   .build();
  // const documentFactory = () => SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, documentFactory);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 8000);

  await app.listen(port);
}
bootstrap();
