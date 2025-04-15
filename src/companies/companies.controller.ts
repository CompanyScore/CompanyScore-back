import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompaniesService } from './companies.service';

import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/users/entities/user.entity';

import { ImageFormatInterceptor } from 'src/interceptors/image-format.interceptor';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Roles(Role.ADMIN)
  @UseInterceptors(
    FileInterceptor('logoFile', {
      storage: multer.memoryStorage(),
    }),
    ImageFormatInterceptor,
  )
  @Post()
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
    @UploadedFile() logoFile: Express.Multer.File,
  ) {
    return this.companiesService.create(createCompanyDto, logoFile);
  }

  @Get()
  findAll(
    @Query('name') name: string,
    @Query('country') country: string,
    @Query('city') city: string,
    @Query('rating') rating: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<Company[]> {
    // Преобразуем параметры в числа с безопасным значением по умолчанию
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    return this.companiesService.findAll(name, country, city, rating, pageNumber, limitNumber);
  }

  @Get('new')
  async getCompaniesNew() {
    return this.companiesService.findNewCompanies();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Company> {
    return this.companiesService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('logoFile', {
      storage: multer.memoryStorage(),
    }),
    ImageFormatInterceptor,
  )
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @UploadedFile() logoFile: Express.Multer.File,
  ) {
    return this.companiesService.update(id, updateCompanyDto, logoFile);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(id);
  }
}
