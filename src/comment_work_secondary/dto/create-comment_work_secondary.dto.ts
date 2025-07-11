import { IsBoolean, IsInt, Min, Max } from 'class-validator';

export class CreateCommentWorkSecondaryDto {
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

  @IsBoolean()
  isOnlineCoursesEdu: boolean;

  @IsBoolean()
  isOfflineCoursesEdu: boolean;

  @IsBoolean()
  isTrainingsEdu: boolean;

  @IsBoolean()
  isBusinessTripsEdu: boolean;

  @IsBoolean()
  isPartUniPayEdu: boolean;

  @IsBoolean()
  isFullUniPayEdu: boolean;
}
