import { PartialType } from '@nestjs/swagger';
import { CreateCommentTaskDto } from './create_comment_task.dto';

export class UpdateTaskFormDto extends PartialType(CreateCommentTaskDto) {}
