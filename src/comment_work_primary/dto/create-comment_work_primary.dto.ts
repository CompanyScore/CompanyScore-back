import { IsDateString, IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateCommentWorkPrimaryDto {
  @IsNotEmpty()
  @IsDateString()
  dateFrom: Date;

  @IsNotEmpty()
  @IsDateString()
  dateTo: Date;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  management: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  team: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  project: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  stack: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  workingSchedule: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  workFormat: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  stability: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  salaryPoints: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  salaryValue: number;
}
