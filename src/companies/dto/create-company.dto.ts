import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  IsDate,
  IsIn,
} from 'class-validator';
import { Rating } from 'src/constants';

export class CreateCompanyDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsIn(Rating, { message: 'Рэйтинг может быть только от 1 до 10' })
  rating?: number;

  @IsNotEmpty()
  @IsDate()
  createDate?: Date;

  @IsBoolean()
  isDeleted?: boolean;
}
