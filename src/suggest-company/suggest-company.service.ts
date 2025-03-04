import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuggestCompany } from './entities/suggest-company.entity';
import { CreateSuggestCompanyDto } from './dto/create-suggest-company.dto';
import { UpdateSuggestCompanyDto } from './dto/update-suggest-company.dto';

@Injectable()
export class SuggestCompanyService {
  constructor(
    @InjectRepository(SuggestCompany)
    private readonly suggestCompanyRepository: Repository<SuggestCompany>,
  ) {}

  async create(
    userId: string,
    createSuggestCompanyDto: CreateSuggestCompanyDto,
  ): Promise<SuggestCompany> {
    const newCompany = this.suggestCompanyRepository.create({
      ...createSuggestCompanyDto,
      user: { id: userId },
    });
    return this.suggestCompanyRepository.save(newCompany);
  }

  async findAll(): Promise<SuggestCompany[]> {
    return this.suggestCompanyRepository.find();
  }

  async findOne(id: string): Promise<SuggestCompany | null> {
    return this.suggestCompanyRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateSuggestCompanyDto: UpdateSuggestCompanyDto,
  ): Promise<SuggestCompany | null> {
    await this.suggestCompanyRepository.update(id, updateSuggestCompanyDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.suggestCompanyRepository.delete(id);
  }
}
