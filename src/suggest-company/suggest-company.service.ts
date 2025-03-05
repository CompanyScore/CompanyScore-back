import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuggestCompany } from './entities/suggest-company.entity';
import { CreateSuggestCompanyDto } from './dto/create-suggest-company.dto';

@Injectable()
export class SuggestCompanyService {
  constructor(
    @InjectRepository(SuggestCompany)
    private readonly suggestCompanyRepository: Repository<SuggestCompany>,
  ) {}

  async create(
    userId: string,
    createSuggestCompanyDto: CreateSuggestCompanyDto,
  ) {
    const newCompany = this.suggestCompanyRepository.create({
      ...createSuggestCompanyDto,
      user: { id: userId },
    });

    this.suggestCompanyRepository.save(newCompany);
  }

  async findAll(): Promise<any> {
    const suggestedCompanies = await this.suggestCompanyRepository.find({
      relations: ['user'],
    });

    return suggestedCompanies.map((suggestedCompany) => ({
      id: suggestedCompany.id,
      name: suggestedCompany.name,
      description: suggestedCompany.description,
      user: {
        id: suggestedCompany.user.id,
        name: suggestedCompany.user.name,
        avatar: suggestedCompany.user.avatar,
      },
    }));
  }

  async findOne(id: string): Promise<any> {
    const suggestedCompanies = await this.suggestCompanyRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    return {
      id: suggestedCompanies.id,
      name: suggestedCompanies.name,
      description: suggestedCompanies.description,
      user: {
        id: suggestedCompanies.user.id,
        name: suggestedCompanies.user.name,
        avatar: suggestedCompanies.user.avatar,
      },
    };
  }

  async remove(id: string) {
    await this.suggestCompanyRepository.delete(id);
  }
}
