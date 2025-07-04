import { PartialType } from '@nestjs/swagger';
import { CreateTaskFormDto } from './create-task-form.dto';

export class UpdateTaskFormDto extends PartialType(CreateTaskFormDto) {}
