import { PartialType } from '@nestjs/swagger';
import { CreateSuggestCompanyDto } from './create-suggest-company.dto';

export class UpdateSuggestCompanyDto extends PartialType(CreateSuggestCompanyDto) {}
