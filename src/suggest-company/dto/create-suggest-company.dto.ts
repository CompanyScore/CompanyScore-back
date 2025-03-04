import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSuggestCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
