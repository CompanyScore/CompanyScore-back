import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

import { FileService } from 'src/providers/file.service';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    private readonly fileService: FileService,
  ) {}

  async create(
    createCompanyDto: CreateCompanyDto,
    logoFile: Express.Multer.File,
  ): Promise<string> {
    if (logoFile) {
      const logo = await this.fileService.saveFile(
        logoFile.buffer,
        'companies/logos',
        logoFile.originalname,
      );

      createCompanyDto.logo = logo;
    }

    this.companyRepository.save(createCompanyDto);

    return 'Компания создана';
  }

  async findAll(
    name: string,
    rating: string,
    page: number,
    limit: number,
  ): Promise<any> {
    const whereCondition: any = {};

    if (name) {
      whereCondition.name = ILike(`%${name}%`);
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
        logo: company.logo,
        description: company.description,
        rating: company.rating,
        commentsIds: company.comments.map((comment) => comment.id.toString()),
      })),
      total, // общее количество элементов
      page,
      limit: take,
    };
  }

  async findNewCompanies(): Promise<any> {
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

  async findOne(id: string): Promise<any> {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['comments'],
    });

    // Рассчитываем средний рейтинг
    const ratings = company.comments
      .map((comment) => comment.rating)
      .filter((rating) => rating !== null);

    const averageRating =
      ratings.length > 0
        ? Math.ceil(ratings.reduce((sum, r) => sum + r, 0) / ratings.length)
        : 0;
    console.log(averageRating);

    // Обновляем рейтинг в базе
    await this.companyRepository.update(id, { rating: averageRating });

    return {
      id: company.id,
      name: company.name,
      logo: company.logo,
      description: company.description,
      rating: averageRating,
      commentsIds: company.comments.map((comment) => comment.id),
    };
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
    logoFile: Express.Multer.File,
  ): Promise<string> {
    const company = await this.findOne(id);

    if (!company) {
      throw new BadRequestException('Компания не найдена!');
    }

    if (logoFile) {
      if (company.logo) {
        await this.fileService.deleteFile(company.logo);
      }

      const logo = await this.fileService.saveFile(
        logoFile.buffer,
        'companies/logos',
        logoFile.originalname,
      );

      updateCompanyDto.logo = logo;
    }

    await this.companyRepository.update(id, updateCompanyDto);

    return 'Компания обновлена';
  }

  async remove(id: string): Promise<string> {
    const company = await this.findOne(id);

    if (!company) {
      throw new BadRequestException('Компания не найдена!');
    }

    await this.companyRepository.delete(id);

    return 'Компания удалена';
  }
}
