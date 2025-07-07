import { Controller, Post, Body } from '@nestjs/common';
import { CommentWorkService } from './comment_work.service';
import { CreateCommentWorkDto } from './dto/create_comment_work.dto';

@Controller('comment-work')
export class CommentWorkController {
  constructor(private readonly commentWorkService: CommentWorkService) {}

  @Post()
  create(@Body() createWorkFormDto: CreateCommentWorkDto) {
    return this.commentWorkService.create(createWorkFormDto);
  }
}
