import {
  IsUUID,
  IsBoolean,
  IsInt,
  Max,
  Min,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';

export class CreateCommentInternshipDto {
  @IsUUID()
  commentId: string;

  @IsNotEmpty()
  @IsBoolean()
  isInternship: boolean;

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
