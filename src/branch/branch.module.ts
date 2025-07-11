import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Country } from 'src/country/entities/country.entity';
import { City } from 'src/city/entities/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, Company, Country, City])],
  controllers: [BranchController],
  providers: [BranchService],
})
export class BranchModule {}
