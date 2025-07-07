import {
  IsUUID,
  IsBoolean,
  IsInt,
  Max,
  Min,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { PeriodDto } from './period.dto';
import { Type } from 'class-transformer';

export class CreateCommentInternshipDto {
  @IsUUID()
  commentId: string;

  @IsNotEmpty()
  @IsBoolean()
  isInternship: boolean;

  @ValidateNested()
  @Type(() => PeriodDto)
  @IsNotEmpty()
  period: PeriodDto;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  isUseful: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  clearlyOrganized: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  correspondedInternLevel: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  developingAssignment: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  supportSupervisor: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1)
  isPaid: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1)
  isOffer: number;
}
