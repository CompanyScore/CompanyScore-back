import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  findAll(
    @Query('searchedCompanyName') searchedCompanyName: string,
  ): Promise<Company[]> {
    return this.companiesService.findAll(searchedCompanyName);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Company> {
    return this.companiesService.findOne(+id);
  }

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companiesService.create(createCompanyDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.companiesService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.companiesService.remove(+id);
  }
}
