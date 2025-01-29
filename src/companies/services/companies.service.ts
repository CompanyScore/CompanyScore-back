import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { Company } from '../entities/company.entity';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company, 'CompanyScore')
    private companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    return this.companyRepository.save(createCompanyDto);
  }

  async findAll(
    name: string,
    country: string,
    city: string,
    rating: string,
    page: number,
    limit: number,
  ): Promise<any> {
    const whereCondition: any = {};

    if (name) {
      whereCondition.name = ILike(`%${name}%`);
    }

    if (country) {
      whereCondition.country = Like(`%${country}%`);
    }

    if (city) {
      whereCondition.city = Like(`%${city}%`);
    }

    if (rating) {
      whereCondition.rating = Number(rating);
    }

    // Убедимся, что лимит и страница имеют значения по умолчанию
    const take = limit || 10; // количество элементов на странице (по умолчанию 10)
    const skip = (page - 1) * take || 0; // пропуск элементов (по умолчанию 0)

    const [companies, total] = await this.companyRepository.findAndCount({
      where: whereCondition,
      relations: ['comments'],
      take,
      skip,
    });

    return {
      data: companies.map((company) => ({
        id: company.id,
        name: company.name,
        logo: company.logoPath,
        description: company.description,
        country: company.country,
        city: company.city,
        rating: company.rating,
        commentsIds: company.comments.map((comment) => comment.id.toString()),
      })),
      total, // общее количество элементов
      page,
      limit: take,
    };
  }

  async findOne(id: number): Promise<any> {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['comments'],
    });

    return {
      id: company.id,
      name: company.name,
      logo: company.logoPath,
      description: company.description,
      country: company.country,
      city: company.city,
      rating: company.rating,
      commentsIds: company.comments.map((comment) => comment.id.toString()),
    };
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    await this.companyRepository.update(id, updateCompanyDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }

  async findCountriesWithCities(): Promise<Record<string, string[]>> {
    const companies = await this.companyRepository.find({
      select: ['country', 'city'],
    });

    const result: Record<string, string[]> = {};

    companies.forEach((company) => {
      if (!result[company.country]) {
        result[company.country] = [];
      }

      // Добавляем только уникальные города
      if (!result[company.country].includes(company.city)) {
        result[company.country].push(company.city);
      }
    });

    return result;
  }
}
