import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { CommentTaskService } from './comment_task.service';
import { CreateCommentTaskDto } from './dto/create_comment_task.dto';

// import { Cron } from '@nestjs/schedule';
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

  // @Cron('0 3 * * *') // каждый день в 3:00 утра по серверному времени
  // async handleCron() {
  //   console.log('⏰ Пересчёт рейтингов CommentTask запущен...');
  //   await this.commentTaskService.recalculateAllRatings();
  //   console.log('✅ Рейтинги CommentTask пересчитаны');
  // }
}
