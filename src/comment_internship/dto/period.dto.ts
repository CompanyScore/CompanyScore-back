import { IsDateString } from 'class-validator';

export class PeriodDto {
  @IsDateString()
  from: string;

  @IsDateString()
  to: string;
}
