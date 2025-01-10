import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company, 'CompanyScore')
    private companyRepository: Repository<Company>,
  ) {}

  findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  findOne(id: number): Promise<Company> {
    return this.companyRepository.findOneBy({ id });
  }

  create(company: Partial<Company>): Promise<Company> {
    return this.companyRepository.save(company);
  }

  async update(id: number, company: Partial<Company>): Promise<Company> {
    await this.companyRepository.update(id, company);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }
}
