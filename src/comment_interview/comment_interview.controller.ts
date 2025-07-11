import { Controller, Get, Post, Body, NotFoundException } from '@nestjs/common';
import { CommentInterviewService } from './comment_interview.service';
import { CreateCommentInterviewDto } from './dto/create_comment_interview.dto';

@Controller('comment-interview')
export class CommentInterviewController {
  constructor(
    private readonly commentInterviewService: CommentInterviewService,
  ) {}

  @Post()
  async create(@Body() dto: CreateCommentInterviewDto) {
    const result = await this.commentInterviewService.create(dto);

    if (!result) throw new NotFoundException('Комментарий не найден');

    return result;
  }

  @Get()
  findAll() {
    return this.commentInterviewService.findAll();
  }
}
