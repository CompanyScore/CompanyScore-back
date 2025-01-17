import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company, 'CompanyScore')
    private companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    return this.companyRepository.save(createCompanyDto);
  }

  async findAll(searchedCompanyName: string): Promise<any> {
    let whereCondition = {};

    if (searchedCompanyName) {
      whereCondition = {
        name: ILike(`%${searchedCompanyName}%`), // Используем ILIKE для регистронезависимого поиска
      };
    }

    const companies = await this.companyRepository.find({
      where: whereCondition,
      relations: ['comments'],
    });

    return companies.map((company) => ({
      id: company.id,
      name: company.name,
      logo: company.logo,
      description: company.description,
      country: company.country,
      city: company.city,
      rating: company.rating,
      commentsIds: company.comments.map((comment) => comment.id.toString()),
    }));
  }

  async findOne(id: number): Promise<any> {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['comments'],
    });

    return {
      id: company.id,
      name: company.name,
      logo: company.logo,
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
}
