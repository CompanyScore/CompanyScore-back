import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentInternshipController } from './comment_internship.controller';
import { CommentInternshipService } from './comment_internship.service';

import { CommentInternship } from './entities/comment_internship.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentInternship, Comment])],
  controllers: [CommentInternshipController],
  providers: [CommentInternshipService],
})
export class CommentInternshipModule {}
