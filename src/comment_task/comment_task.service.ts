import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentTask } from './entities/comment_task.entity';
import { Repository } from 'typeorm';
import { CreateCommentTaskDto } from './dto/create_comment_task.dto';
import { Comment } from 'src/comments/entities/comment.entity';

import { calculateTaskRating } from './utils/calculate-task-rating';

@Injectable()
export class CommentTaskService {
  constructor(
    @InjectRepository(CommentTask)
    private readonly commentTaskRepository: Repository<CommentTask>,

    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(
    commentId: string,
    dto: CreateCommentTaskDto,
  ): Promise<CommentTask> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Комментарий не найден');
    }

    const taskForm = this.commentTaskRepository.create(dto);
    const savedForm = await this.commentTaskRepository.save(taskForm);

    comment.task = savedForm;
    await this.commentRepository.save(comment);

    taskForm.rating = calculateTaskRating(taskForm); // <--- ВАЖНО

    return savedForm;
  }

  // async recalculateAllRatings(): Promise<void> {
  //   const allTasks = await this.commentTaskRepository.find();

  //   for (const task of allTasks) {
  //     task.rating = calculateTaskRating(task);
  //     await this.commentTaskRepository.save(task);
  //   }
  // }
}
