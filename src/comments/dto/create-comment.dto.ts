import { IsString, IsUUID, IsInt, Min, Max, Length } from 'class-validator';

export class CreateCommentDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  companyId: string;

  @IsString()
  companyCountry: string;

  @IsString()
  companyCity: string;

  @IsString()
  userPosition: string;

  @IsInt()
  @Min(0)
  userGradeYears: number;

  @IsInt()
  @Min(0)
  @Max(12)
  userGradeMonths: number;

  @IsInt()
  @Min(0)
  @Max(1)
  isAnonym: number;

  @IsInt()
  @Min(0)
  @Max(1)
  isRecommended: number;

  @IsString()
  @Length(10, 1000)
  reasonJoined: string;

  @IsString()
  @Length(10, 1000)
  reasonLeft: string;
}
