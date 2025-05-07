import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  IsDate,
  IsIn,
} from 'class-validator';
import { Ratings } from 'src/constants';

export class CreateCompanyDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsIn(Ratings, { message: 'Рэйтинг может быть только от 1 до 5' })
  rating?: number;

  @IsNotEmpty()
  @IsDate()
  createDate?: Date;

  @IsBoolean()
  isDeleted?: boolean;
}
