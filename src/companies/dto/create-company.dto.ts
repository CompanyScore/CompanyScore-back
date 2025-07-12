import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  IsDate,
  IsIn,
} from 'class-validator';
import { CompanyStatuses, CompanyTypes, Ratings } from 'src/constants';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  legal_name: string;

  @IsOptional()
  @IsString()
  industry: string;

  @IsOptional()
  @IsString()
  size: string;

  @IsOptional()
  @IsString()
  website: string;

  @IsOptional()
  @IsNumber()
  @IsIn(Ratings, { message: 'Рэйтинг может быть только от 1 до 5' })
  rating?: number;

  @IsOptional()
  @IsIn(Object.values(CompanyStatuses), {
    message: 'Статус должен быть из: active, inactive, close',
  })
  status?: CompanyStatuses;

  @IsOptional()
  @IsIn(Object.values(CompanyTypes), {
    message: 'Тип должен быть одним из: holding, susbdiairy, branch',
  })
  type?: CompanyTypes;

  @IsNotEmpty()
  @IsDate()
  createDate?: Date;

  @IsBoolean()
  isDeleted?: boolean;
}
