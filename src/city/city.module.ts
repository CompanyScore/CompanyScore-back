import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Country } from 'src/country/entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City, Country])],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
