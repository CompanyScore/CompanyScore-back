// src/interview-form/dto/create-interview-form.dto.ts
import {
  IsUUID,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  Min,
  Max,
} from 'class-validator';

export class CreateCommentInterviewDto {
  @IsUUID()
  commentId: string;

  @IsNotEmpty()
  @IsBoolean()
  isInterview: boolean;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  correspondedPosition: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  clearlyStages: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  talkedPolitely: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  realWork: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  interviewTime: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  feedback: number;

  @IsNotEmpty()
  @IsBoolean()
  isTestStage: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isVideoStage: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isHrStage: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isTaskStage: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isTechStage: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isTeamStage: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isFinalStage: boolean;
}
