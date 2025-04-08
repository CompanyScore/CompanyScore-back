import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { FileService } from 'src/providers/r2.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompaniesController],
  providers: [CompaniesService, FileService],
  exports: [TypeOrmModule],
})
export class CompaniesModule {}
