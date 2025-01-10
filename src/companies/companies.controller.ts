import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Company } from '../entities/company.entity';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  findAll(): Promise<Company[]> {
    return this.companiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Company> {
    return this.companiesService.findOne(+id);
  }

  @Post()
  create(@Body() company: Partial<Company>): Promise<Company> {
    return this.companiesService.create(company);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() company: Partial<Company>,
  ): Promise<Company> {
    return this.companiesService.update(+id, company);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.companiesService.remove(+id);
  }
}
