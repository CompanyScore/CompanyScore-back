import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async findLocations(): Promise<Record<string, string[]>> {
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
