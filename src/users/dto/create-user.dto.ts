import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsDate,
  IsIn,
} from 'class-validator';
import { Positions } from 'src/constants';

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
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  passwordHash?: string;

  @IsOptional()
  avatar?: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(Positions, {
    message: `Должность должна быть: ${Positions.join(', ')}`,
  })
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

  @IsString()
  @IsOptional()
  country?: string;
}
