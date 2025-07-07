import {
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class PrimaryDto {
  @IsNotEmpty()
  @IsDateString()
  dateFrom: Date;

  @IsNotEmpty()
  @IsDateString()
  dateTo: Date;

  @IsInt()
  @Min(0)
  @Max(1000)
  management: number;

  @IsInt()
  @Min(0)
  @Max(1000)
  team: number;

  @IsInt()
  @Min(0)
  @Max(1000)
  project: number;

  @IsInt()
  @Min(0)
  @Max(1000)
  stack: number;

  @IsInt()
  @Min(0)
  @Max(1000)
  workingSchedule: number;

  @IsInt()
  @Min(0)
  @Max(1000)
  workFormat: number;

  @IsInt()
  @Min(0)
  @Max(1000)
  stability: number;

  @IsInt()
  @Min(0)
  @Max(1000)
  salaryPoints: number;

  @IsInt()
  salaryValue: number;
}

class SecondaryDto {
  @IsInt()
  @Min(0)
  @Max(1000)
  development: number;

  @IsInt()
  @Min(0)
  @Max(1000)
  comfort: number;

  @IsInt()
  @Min(0)
  @Max(1000)
  discrimination: number;

  @IsInt()
  @Min(0)
  @Max(1000)
  ethics: number;

  @IsInt()
  @Min(0)
  @Max(1000)
  performanceReview: number;

  @IsInt()
  @Min(0)
  @Max(1000)
  events: number;

  @IsArray()
  educations: string[];
}

class FinanceDto {
  @IsInt()
  @Min(0)
  @Max(1000)
  bonusesPoints: number;

  @IsInt()
  bonusesValue: number;

  @IsInt()
  @Min(0)
  @Max(1000)
  medicinePoints: number;

  @IsInt()
  medicineValue: number;

  @IsInt()
  @Min(0)
  @Max(1000)
  profitSharePoints: number;

  @IsInt()
  profitShareValue: number;

  @IsArray()
  socialBenefits: string[];
}

export class CreateCommentWorkDto {
  @IsUUID()
  commentId: string;

  @ValidateNested()
  @Type(() => PrimaryDto)
  primary: PrimaryDto;

  @ValidateNested()
  @Type(() => SecondaryDto)
  secondary: SecondaryDto;

  @ValidateNested()
  @Type(() => FinanceDto)
  finance: FinanceDto;
}
