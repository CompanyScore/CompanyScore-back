import { PartialType } from '@nestjs/swagger';
import { CreateWorkFormDto } from './create-work-form.dto';

export class UpdateWorkFormDto extends PartialType(CreateWorkFormDto) {}
