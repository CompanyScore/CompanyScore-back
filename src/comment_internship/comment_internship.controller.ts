import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { CommentInternshipService } from './comment_internship.service';
import { CreateCommentInternshipDto } from './dto/create_comment_internship.dto';

@Controller('comment-internship')
export class CommentInternshipController {
  constructor(
    private readonly commentInternshipService: CommentInternshipService,
  ) {}

  @Post()
  async create(@Body() dto: CreateCommentInternshipDto) {
    const result = await this.commentInternshipService.create(dto);

    if (!result) throw new NotFoundException('Комментарий не найден');

    return result;
  }
}
