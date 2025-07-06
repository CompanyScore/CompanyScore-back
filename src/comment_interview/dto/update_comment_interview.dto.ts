import { PartialType } from '@nestjs/swagger';
import { CreateCommentInterviewDto } from './create_comment_interview.dto';

export class UpdateCommentInterviewDto extends PartialType(
  CreateCommentInterviewDto,
) {}
