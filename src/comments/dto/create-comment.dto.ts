import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsInt()
  rating: number;

  @IsString()
  position: string;

  @IsNotEmpty()
  @IsInt()
  userId: string;

  @IsNotEmpty()
  @IsInt()
  companyId: number;
}
