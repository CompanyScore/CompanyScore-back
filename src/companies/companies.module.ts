import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './services/companies.service';
import { Company } from './entities/company.entity';
import { CompaniesNewService } from './services/companies-new.service';
import { FileService } from 'src/providers/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompaniesController],
  providers: [CompaniesService, CompaniesNewService, FileService],
  exports: [TypeOrmModule],
})
export class CompaniesModule {}
