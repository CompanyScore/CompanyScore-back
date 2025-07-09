import { Type } from 'class-transformer';
import {
  IsString,
  IsUUID,
  IsInt,
  Min,
  Max,
  Length,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CreateCommentInternshipDto } from 'src/comment_internship/dto/create_comment_internship.dto';
import { CreateCommentInterviewDto } from 'src/comment_interview/dto/create_comment_interview.dto';
import { CreateCommentTaskDto } from 'src/comment_task/dto/create_comment_task.dto';
import { CreateCommentWorkFinanceDto } from 'src/comment_work_finance/dto/create-comment_work_finance.dto';
import { CreateCommentWorkPrimaryDto } from 'src/comment_work_primary/dto/create-comment_work_primary.dto';
import { CreateCommentWorkSecondaryDto } from 'src/comment_work_secondary/dto/create-comment_work_secondary.dto';
export class CreateCommentDto {
  @IsUUID()
  companyId: string;

  @IsString()
  userPositionId: string;

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

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCommentTaskDto)
  task?: CreateCommentTaskDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCommentInterviewDto)
  interview?: CreateCommentInterviewDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCommentInternshipDto)
  internship?: CreateCommentInternshipDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCommentWorkPrimaryDto)
  workPrimary?: CreateCommentWorkPrimaryDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCommentWorkSecondaryDto)
  workSecondary?: CreateCommentWorkSecondaryDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCommentWorkFinanceDto)
  workFinance?: CreateCommentWorkFinanceDto;
}
