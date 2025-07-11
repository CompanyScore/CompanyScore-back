import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@UserId() userId: string, @Body() createCommentDto: any) {
    console.log('createCommentDto', createCommentDto);

    const { companyId } = createCommentDto;

    return this.commentsService.createCommentToUser(
      userId,
      companyId,
      createCommentDto,
    );
  }

  @Get()
  findAll(
    @UserId() userId: string,
    @Query('companyId') companyId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.commentsService.findAll(userId, companyId, page, limit);
  }
}
