import { IsString, IsOptional, IsNumber, IsIn } from 'class-validator';
import { Ratings } from 'src/constants';

export class CreateCompanyDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsIn(Ratings, { message: 'Рэйтинг может быть только от 1 до 5' })
  rating?: number;
}
