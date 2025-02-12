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

  @IsString()
  @IsNotEmpty()
  role?: string;

  @IsNotEmpty()
  linkedinId: string;

  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  avatar?: string;

  // @IsNotEmpty() // Файлы не должны быть частью DTO, потому что class-validator не может их валидировать.
  // avatarFile?: Express.Multer.File;

  @IsNotEmpty()
  @IsString()
  position?: string;

  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsDate()
  createDate?: Date;

  @IsNotEmpty()
  @IsDate()
  deleteDate?: Date;

  @IsNotEmpty()
  @IsBoolean()
  isDeleted?: boolean;
}
