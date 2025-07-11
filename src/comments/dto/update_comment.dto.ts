import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create_comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
