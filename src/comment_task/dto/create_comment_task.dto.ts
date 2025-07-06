import { IsNotEmpty, IsBoolean, IsInt, Min, Max } from 'class-validator';

export class CreateTaskFormDto {
  @IsNotEmpty()
  @IsBoolean()
  isTask: boolean;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  requirementsForTask: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  taskLevel: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  fairAssessment: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  taskSize: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  realWork: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  feedback: number;
}
