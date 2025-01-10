import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { Company } from '../entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company], 'CompanyScore')],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
