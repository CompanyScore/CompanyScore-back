import { Controller, Post, Body } from '@nestjs/common';
import { CommentWorkPrimaryService } from './comment_work_primary.service';
import { CreateCommentWorkPrimaryDto } from './dto/create-comment_work_primary.dto';

@Controller('comment-work-primary')
export class CommentWorkPrimaryController {
  constructor(private readonly workPrimaryService: CommentWorkPrimaryService) {}

  @Post()
  async create(
    @Body() dto: CreateCommentWorkPrimaryDto,
  ): Promise<{ id: string }> {
    const created = await this.workPrimaryService.create(dto);
    return { id: created.id };
  }
}
