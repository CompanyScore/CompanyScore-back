import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  IsDate,
} from 'class-validator';

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
  rating?: number;

  @IsNotEmpty()
  @IsDate()
  createDate?: Date;

  @IsBoolean()
  isDeleted?: boolean;
}
