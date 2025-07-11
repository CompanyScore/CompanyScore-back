import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class CreateCommentTaskDto {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  @Type(() => Number)
  requirementsForTask: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  @Type(() => Number)
  taskLevel: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  @Type(() => Number)
  fairAssessment: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  @Type(() => Number)
  taskSize: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  @Type(() => Number)
  realWork: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  @Type(() => Number)
  feedback: number;
}
