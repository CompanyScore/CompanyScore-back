import { IsString, IsNotEmpty, IsInt, IsIn } from 'class-validator';
import { Position, Rating } from 'src/constants';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsInt()
  @IsIn(Rating, { message: 'Рэйтинг может быть только от 1 до 10' })
  rating: number;

  @IsString()
  @IsIn(Position, { message: `Должность должна быть: ${Position.join(', ')}` })
  position: string;

  @IsNotEmpty()
  @IsString()
  companyId: string;
}
