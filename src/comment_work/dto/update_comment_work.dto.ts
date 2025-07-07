import { PartialType } from '@nestjs/swagger';
import { CreateCommentWorkDto } from './create_comment_work.dto';

export class UpdateCommentWorkDto extends PartialType(CreateCommentWorkDto) {}
