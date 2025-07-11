import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { CommentTaskService } from './comment_task.service';
import { CreateCommentTaskDto } from './dto/create_comment_task.dto';

@Controller('comment_task')
export class CommentTaskController {
  constructor(private readonly commentTaskService: CommentTaskService) {}

  @Post()
  async create(@Body() dto: CreateCommentTaskDto & { commentId: string }) {
    const taskForm = await this.commentTaskService.create(dto.commentId, dto);
    if (!taskForm) {
      throw new NotFoundException('Комментарий не найден');
    }
    return taskForm;
  }
}
