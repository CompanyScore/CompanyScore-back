import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { TaskFormService } from './comment_task.service';
import { CreateTaskFormDto } from './dto/create_comment_task.dto';

@Controller('comment_task')
export class TaskFormController {
  constructor(private readonly taskFormService: TaskFormService) {}

  @Post()
  async create(@Body() dto: CreateTaskFormDto & { commentId: string }) {
    const taskForm = await this.taskFormService.create(dto.commentId, dto);
    if (!taskForm) {
      throw new NotFoundException('Комментарий не найден');
    }
    return taskForm;
  }
}
