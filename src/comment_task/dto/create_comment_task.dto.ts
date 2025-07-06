import { IsBoolean, IsInt, Min, Max } from 'class-validator';

export class CreateTaskFormDto {
  @IsBoolean()
  isTask: boolean;

  @IsInt()
  @Min(0)
  @Max(1000)
  requirementsForTask: number;

  @IsInt()
  @Min(0)
  @Max(1000)
  taskLevel: number;

  @IsInt()
  @Min(0)
  @Max(1000)
  fairAssessment: number;

  @IsInt()
  @Min(0)
  @Max(1000)
  taskSize: number;

  @IsInt()
  @Min(0)
  @Max(1000)
  realWork: number;

  @IsInt()
  @Min(0)
  @Max(1000)
  feedback: number;
}
