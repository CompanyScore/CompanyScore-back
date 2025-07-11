import { Controller, Post, Body } from '@nestjs/common';
import { CommentWorkSecondaryService } from './comment_work_secondary.service';
import { CreateCommentWorkSecondaryDto } from './dto/create-comment_work_secondary.dto';

@Controller('comment-work-secondary')
export class CommentWorkSecondaryController {
  constructor(
    private readonly workSecondaryService: CommentWorkSecondaryService,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateCommentWorkSecondaryDto,
  ): Promise<{ id: string }> {
    const created = await this.workSecondaryService.create(dto);
    return { id: created.id };
  }
}
