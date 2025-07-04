import { PartialType } from '@nestjs/swagger';
import { CreateInternshipFormDto } from './create-internship-form.dto';

export class UpdateInternshipFormDto extends PartialType(
  CreateInternshipFormDto,
) {}
