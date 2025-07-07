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
import { InterviewStageModule } from './interview_stage/interview_stage.module';
import { WorkEducationModule } from './work_education/work_education.module';
import { WorkSocialBenefitModule } from './work_social_benefit/work_social_benefit.module';
import { CommentTaskModule } from './comment_task/comment_task.module';
import { CommentInterviewModule } from './comment_interview/comment_interview.module';
import { CommentInternshipModule } from './comment_internship/comment_internship.module';
import { CommentWorkModule } from './comment_work/comment_work.module';

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
    CommentTaskModule,
    CommentInterviewModule,
    CommentInternshipModule,
    CommentWorkModule,
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
