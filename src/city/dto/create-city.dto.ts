import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCityDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  countryId: string;
}
