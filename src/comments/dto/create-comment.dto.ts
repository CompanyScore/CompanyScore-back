import { IsString, IsNotEmpty, IsBoolean, IsDate } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  createDate: Date;

  @IsNotEmpty()
  @IsBoolean()
  isDeleted: boolean;
}
