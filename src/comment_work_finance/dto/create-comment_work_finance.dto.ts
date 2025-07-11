import { IsBoolean, IsInt, Min, Max } from 'class-validator';

export class CreateCommentWorkFinanceDto {
  @IsInt()
  @Min(0)
  @Max(1000)
  bonusesPoints: number;

  @IsInt()
  @Min(0)
  bonusesValue: number;

  @IsInt()
  @Min(0)
  @Max(1000)
  medicinePoints: number;

  @IsInt()
  @Min(0)
  medicineValue: number;

  @IsInt()
  @Min(0)
  @Max(1000)
  profitSharePoints: number;

  @IsInt()
  @Min(0)
  profitShareValue: number;

  @IsBoolean()
  isFreeMealsSocial: boolean;

  @IsBoolean()
  isTransportSocial: boolean;

  @IsBoolean()
  isHousingSocial: boolean;

  @IsBoolean()
  isHolidayBonusSocial: boolean;

  @IsBoolean()
  isEducationSocial: boolean;

  @IsBoolean()
  isChildAllowanceSocial: boolean;

  @IsBoolean()
  isFinancialAssistSocial: boolean;
}
