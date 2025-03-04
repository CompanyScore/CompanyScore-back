import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuggestCompany } from './entities/suggest-company.entity';
import { SuggestCompanyService } from './suggest-company.service';
import { SuggestCompanyController } from './suggest-company.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SuggestCompany])],
  controllers: [SuggestCompanyController],
  providers: [SuggestCompanyService],
  exports: [TypeOrmModule],
})
export class SuggestCompanyModule {}
