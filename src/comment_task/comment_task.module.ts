import { Module } from '@nestjs/common';
import { TaskFormService } from './comment_task.service';
import { TaskFormController } from './comment_task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskForm } from './entities/comment_task.entity';
import { CommentsModule } from 'src/comments/comments.module';
import { Comment } from 'src/comments/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskForm, Comment]), CommentsModule],
  controllers: [TaskFormController],
  providers: [TaskFormService],
})
export class TaskFormModule {}
