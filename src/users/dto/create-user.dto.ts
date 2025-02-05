import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsDate,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  refreshToken?: string;

  @IsNotEmpty()
  linkedinId: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  avatarFile?: Express.Multer.File; // Новый параметр для загрузки файла

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsDate()
  createDate?: Date;

  @IsOptional()
  @IsDate()
  deleteDate?: Date;

  @IsNotEmpty()
  @IsBoolean()
  isDeleted?: boolean;
}
