import { Controller, Post, Body } from '@nestjs/common';
import { CommentWorkFinanceService } from './comment_work_finance.service';
import { CreateCommentWorkFinanceDto } from './dto/create-comment_work_finance.dto';

@Controller('comment-work-finance')
export class CommentWorkFinanceController {
  constructor(private readonly workFinanceService: CommentWorkFinanceService) {}

  @Post()
  async create(
    @Body() dto: CreateCommentWorkFinanceDto,
  ): Promise<{ id: string }> {
    const created = await this.workFinanceService.create(dto);
    return { id: created.id };
  }
}
