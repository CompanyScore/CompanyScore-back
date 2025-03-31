import { NestFactory } from '@nestjs/core';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
// import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Обрабатываем preflight-запросы (OPTIONS)
  // app.use((req, res, next) => {
  //   if (req.method === 'OPTIONS') {
  //     res.header('Access-Control-Allow-Origin', process.env.FRONT_URL);
  //     res.header(
  //       'Access-Control-Allow-Methods',
  //       'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  //     );
  //     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
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
  //   origin: true,
  // Указываем фронтенд
  // allowedHeaders: [
  //   'Content-Type',
  //   'Authorization',
  //   'Cache-Control',
  //   'Pragma',
  //   'Expires',
  // ],
  // credentials: true, // Разрешаем отправку куки
  // methods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  // });

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
  const port = configService.get<number>('PORT', 8080);

  await app.listen(port);
}
bootstrap();
