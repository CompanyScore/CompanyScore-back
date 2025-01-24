import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsDate,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  githubId: number;

  // @IsNotEmpty()
  // linkedinId: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  avatarPath?: string;

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
