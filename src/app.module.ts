import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_FILTER } from '@nestjs/core';
import * as path from 'path';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { CustomExceptionFilter } from './filters/custom-exception.filter';

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
      rootPath: path.join(__dirname, '..', 'files', 'users', 'avatars'), // Путь к папке с изображениями
      serveRoot: '/files/users/avatars', // Путь, по которому будут доступны файлы
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
  ],
})
export class AppModule {}
