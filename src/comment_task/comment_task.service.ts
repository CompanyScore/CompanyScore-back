import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskForm } from './entities/comment_task.entity';
import { Repository } from 'typeorm';
import { CreateTaskFormDto } from './dto/create_comment_task.dto';
import { Comment } from 'src/comments/entities/comment.entity';

@Injectable()
export class TaskFormService {
  constructor(
    @InjectRepository(TaskForm)
    private readonly taskFormRepository: Repository<TaskForm>,

    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(commentId: string, dto: CreateTaskFormDto): Promise<TaskForm> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Комментарий не найден');
    }

    const taskForm = this.taskFormRepository.create(dto);
    const savedForm = await this.taskFormRepository.save(taskForm);

    comment.task = savedForm;
    await this.commentRepository.save(comment);

    return savedForm;
  }
}
