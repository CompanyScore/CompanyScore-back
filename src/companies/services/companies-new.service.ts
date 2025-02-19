import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';

@Injectable()
export class CompaniesNewService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async findCompaniesNew(): Promise<any> {
    const whereCondition: any = { isDeleted: false };

    const [companies] = await this.companyRepository.findAndCount({
      where: whereCondition,
      relations: ['comments'],
      take: 7, // Ограничиваем выборку 7 записями
      order: { createDate: 'DESC' }, // Сортировка по дате создания (от новых к старым)
    });

    return companies.map((company) => ({
      id: company.id,
      name: company.name,
      logo: company.logo,
      description: company.description,
      rating: company.rating,
      commentsIds: company.comments.map((comment) => comment.id),
    }));
  }
}
