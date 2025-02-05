import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import * as path from 'path';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { CustomExceptionFilter } from './filters/custom-exception.filter';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { RolesGuard } from './auth/role.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'CompanyScore',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'CompanyScore',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'files'), // Путь к папке с изображениями
      serveRoot: '/files', // Путь, по которому будут доступны файлы
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Делаем доступным во всем приложении
      load: [configuration], // Загружаем наш конфиг
    }),
    CommentsModule,
    CompaniesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // <-- Добавляем сначала JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
