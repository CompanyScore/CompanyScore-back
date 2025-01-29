import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  logoPath?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsBoolean()
  isDeleted?: boolean;
}
