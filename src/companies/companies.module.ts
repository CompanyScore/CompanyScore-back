import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './services/companies.service';
import { Company } from './entities/company.entity';
import { LocationsService } from './services/locations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company], 'CompanyScore')],
  controllers: [CompaniesController],
  providers: [CompaniesService, LocationsService],
  exports: [TypeOrmModule],
})
export class CompaniesModule {}
