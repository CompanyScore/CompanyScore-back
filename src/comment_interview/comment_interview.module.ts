import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentInterviewService } from './comment_interview.service';
import { CommentInterviewController } from './comment_interview.controller';
import { CommentInterview } from './entities/comment_interview.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentInterview, Comment])],
  controllers: [CommentInterviewController],
  providers: [CommentInterviewService],
})
export class CommentInterviewModule {}
