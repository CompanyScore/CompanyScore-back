import { PartialType } from '@nestjs/swagger';
import { CreateTaskFormDto } from './create_comment_task.dto';

export class UpdateTaskFormDto extends PartialType(CreateTaskFormDto) {}
