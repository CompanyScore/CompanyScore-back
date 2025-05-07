import { IsString, IsNotEmpty, IsInt, IsIn, IsBoolean } from 'class-validator';
import { Positions, Ratings } from 'src/constants';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsInt()
  @IsIn(Ratings, { message: 'Рэйтинг может быть только от 1 до 10' })
  Ratings: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(Positions, {
    message: `Должность должна быть: ${Positions.join(', ')}`,
  })
  position: string;

  @IsNotEmpty()
  @IsInt()
  @IsIn(Ratings, { message: 'Рэйтинг может быть только от 1 до 5' })
  gradeYear: number;

  @IsNotEmpty()
  @IsInt()
  @IsIn(Ratings, { message: 'Рэйтинг может быть только от 1 до 5' })
  gradeMonth: number;

  @IsNotEmpty()
  @IsString()
  taskText: string;

  @IsNotEmpty()
  @IsInt()
  @IsIn(Ratings, { message: 'Рэйтинг может быть только от 1 до 5' })
  taskRatings: number;

  @IsNotEmpty()
  @IsString()
  interviewText: string;

  @IsNotEmpty()
  @IsInt()
  @IsIn(Ratings, { message: 'Рэйтинг может быть только от 1 до 5' })
  interviewRatings: number;

  @IsNotEmpty()
  @IsInt()
  @IsIn(Ratings, { message: 'Рэйтинг может быть только от 1 до 5' })
  workRatingsTeam: number;

  @IsNotEmpty()
  @IsInt()
  @IsIn(Ratings, { message: 'Рэйтинг может быть только от 1 до 5' })
  workRatingsManagement: number;

  @IsNotEmpty()
  @IsInt()
  @IsIn(Ratings, { message: 'Рэйтинг может быть только от 1 до 5' })
  workRatingsStack: number;

  @IsNotEmpty()
  @IsInt()
  @IsIn(Ratings, { message: 'Рэйтинг может быть только от 1 до 5' })
  workRatingsProject: number;

  @IsNotEmpty()
  @IsInt()
  @IsIn(Ratings, { message: 'Рэйтинг может быть только от 1 до 5' })
  workRatingsWorkFormat: number;

  @IsNotEmpty()
  @IsInt()
  workRatingsFinanceSalary: number;

  @IsNotEmpty()
  @IsInt()
  workRatingsFinanceMedicine: number;

  @IsNotEmpty()
  @IsInt()
  workRatingsFinancePremium: number;

  @IsNotEmpty()
  @IsInt()
  workRatingsFinanceBonuses: number;

  @IsNotEmpty()
  @IsInt()
  workRatingsFinanceStocks: number;

  @IsNotEmpty()
  @IsInt()
  workRatingsFinanceDividends: number;

  @IsNotEmpty()
  @IsInt()
  @IsIn(Ratings, { message: 'Рэйтинг может быть только от 1 до 5' })
  workRatingsOtherEducation: number;

  @IsNotEmpty()
  @IsInt()
  @IsIn(Ratings, { message: 'Рэйтинг может быть только от 1 до 5' })
  workRatingsOtherEvents: number;

  @IsNotEmpty()
  @IsBoolean()
  recommendationIsRecommended: boolean;

  @IsNotEmpty()
  @IsString()
  recommendationReasonJoined: string;

  @IsNotEmpty()
  @IsString()
  recommendationReasonLeft: string;
}
