import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.SESSION_COOKIE_SECURE === 'true',
        maxAge:
          Number(process.env.SESSION_COOKIE_MAXAGE) || 24 * 60 * 60 * 1000,
      },
    }),
  );

  app.enableCors({
    origin: [
      'https://companyscore.net',
      'https://api.companyscore.net',
      'http://localhost:3000',
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
