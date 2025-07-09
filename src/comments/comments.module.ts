import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from './entities/comment.entity';
import { CommentWorkPrimary } from 'src/comment_work_primary/entities/comment_work_primary.entity';
import { CommentWorkSecondary } from 'src/comment_work_secondary/entities/comment_work_secondary.entity';
import { CommentWorkFinance } from 'src/comment_work_finance/entities/comment_work_finance.entity';

import { UsersModule } from 'src/users/users.module';
import { CompaniesModule } from 'src/companies/companies.module';
import { CommentTask } from 'src/comment_task/entities/comment_task.entity';
import { CommentInterview } from 'src/comment_interview/entities/comment_interview.entity';
import { CommentInternship } from 'src/comment_internship/entities/comment_internship.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Comment,
      CommentTask,
      CommentInterview,
      CommentInternship,
      CommentWorkPrimary,
      CommentWorkSecondary,
      CommentWorkFinance,
    ]),
    UsersModule,
    CompaniesModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
