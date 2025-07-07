// src/interview-form/dto/create-interview-form.dto.ts
import {
  IsUUID,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  Min,
  Max,
  IsArray,
  IsString,
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
  @Max(10)
  correspondedPosition: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(10)
  clearlyStages: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(10)
  talkedPolitely: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(10)
  realWork: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(10)
  interviewTime: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(10)
  feedback: number;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  stages: string[];
}
