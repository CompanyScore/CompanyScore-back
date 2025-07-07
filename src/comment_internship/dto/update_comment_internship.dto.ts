import { PartialType } from '@nestjs/swagger';
import { CreateCommentInternshipDto } from './create_comment_internship.dto';

export class UpdateCommentInternshipDto extends PartialType(
  CreateCommentInternshipDto,
) {}
