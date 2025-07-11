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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesGuard } from './auth/role.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

import { getDatabaseConfig } from './config/database.config';
import { PositionsModule } from './positions/positions.module';
import { CommentTaskModule } from './comment_task/comment_task.module';
import { CommentInterviewModule } from './comment_interview/comment_interview.module';
import { CommentInternshipModule } from './comment_internship/comment_internship.module';
import { CountryModule } from './country/country.module';
import { CityModule } from './city/city.module';
import { CommentWorkPrimaryModule } from './comment_work_primary/comment_work_primary.module';
import { CommentWorkSecondaryModule } from './comment_work_secondary/comment_work_secondary.module';
import { CommentWorkFinanceModule } from './comment_work_finance/comment_work_finance.module';
import { BranchModule } from './branch/branch.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 20,
        },
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
    }),
    // TypeOrmModule.forRootAsync(databaseConfig.asProvider()),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'files'), // Путь к папке с изображениями
      serveRoot: '/files', // Путь, по которому будут доступны файлы
    }),
    CommentsModule,
    CompaniesModule,
    BranchModule,
    UsersModule,
    AuthModule,
    PositionsModule,
    CommentTaskModule,
    CommentInterviewModule,
    CommentInternshipModule,
    CountryModule,
    CityModule,
    CommentWorkPrimaryModule,
    CommentWorkSecondaryModule,
    CommentWorkFinanceModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // <-- Добавляем сначала JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class AppModule {}
