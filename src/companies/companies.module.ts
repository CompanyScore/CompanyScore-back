import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './services/companies.service';
import { Company } from './entities/company.entity';
import { LocationsService } from './services/locations.service';
import { FileService } from 'src/providers/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompaniesController],
  providers: [CompaniesService, LocationsService, FileService],
  exports: [TypeOrmModule],
})
export class CompaniesModule {}
