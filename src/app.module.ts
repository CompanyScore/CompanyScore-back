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
import { InterviewStageModule } from './interview-stage/interview-stage.module';
import { WorkEducationModule } from './work-education/work-education.module';
import { WorkSocialBenefitModule } from './work-social-benefit/work-social-benefit.module';
import { TaskFormModule } from './task-form/task-form.module';
import { InterviewFormModule } from './interview-form/interview-form.module';
import { InternshipFormModule } from './internship-form/internship-form.module';
import { WorkFormModule } from './work-form/work-form.module';

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
    UsersModule,
    AuthModule,
    PositionsModule,
    InterviewStageModule,
    WorkEducationModule,
    WorkSocialBenefitModule,
    TaskFormModule,
    InterviewFormModule,
    InternshipFormModule,
    WorkFormModule,
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
