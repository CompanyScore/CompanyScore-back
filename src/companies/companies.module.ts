import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { R2Service } from 'src/providers/r2.service';
import { Country } from 'src/country/entities/country.entity';
import { City } from 'src/city/entities/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Country, City])],
  controllers: [CompaniesController],
  providers: [CompaniesService, R2Service],
  exports: [TypeOrmModule],
})
export class CompaniesModule {}
