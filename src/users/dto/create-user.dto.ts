import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  Length,
  IsDate,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Length(10, 20)
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  photo: string;

  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  createDate: Date;

  @IsOptional()
  @IsDate()
  deleteDate: Date;

  @IsNotEmpty()
  @IsBoolean()
  isDeleted: boolean;
}
