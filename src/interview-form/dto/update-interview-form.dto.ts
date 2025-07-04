import { PartialType } from '@nestjs/swagger';
import { CreateInterviewFormDto } from './create-interview-form.dto';

export class UpdateInterviewFormDto extends PartialType(
  CreateInterviewFormDto,
) {}
