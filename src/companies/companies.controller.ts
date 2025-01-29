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
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { CompaniesService } from './services/companies.service';
import { LocationsService } from './services/locations.service';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { FileService } from 'src/providers/file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly locationsService: LocationsService,
    private readonly fileService: FileService,
  ) {}

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

    return this.companiesService.findAll(
      name,
      country,
      city,
      rating,
      pageNumber,
      limitNumber,
    );
  }

  @Get('locations')
  async getCountriesWithCities() {
    return this.locationsService.findLocations();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Company> {
    return this.companiesService.findOne(+id);
  }

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companiesService.create(createCompanyDto);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('logoFile'))
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @UploadedFile() logoFile: Express.Multer.File,
  ): Promise<Company> {
    if (logoFile) {
      const company = await this.companiesService.findOne(+id);
      if (!company) {
        throw new NotFoundException('Компания не найдена');
      }

      if (company.logo) {
        await this.fileService.deleteFile(company.logo);
      }

      const logoPath = await this.fileService.saveFile(
        logoFile.buffer,
        'companies/logos',
        logoFile.originalname,
      );

      updateCompanyDto.logoPath = logoPath;
    }

    return this.companiesService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.companiesService.remove(+id);
  }
}
