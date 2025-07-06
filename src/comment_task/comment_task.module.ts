import { Module } from '@nestjs/common';
import { CommentTaskService } from './comment_task.service';
import { CommentTaskController } from './comment_task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentTask } from './entities/comment_task.entity';
import { CommentsModule } from 'src/comments/comments.module';
import { Comment } from 'src/comments/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentTask, Comment]), CommentsModule],
  controllers: [CommentTaskController],
  providers: [CommentTaskService],
})
export class CommentTaskModule {}
