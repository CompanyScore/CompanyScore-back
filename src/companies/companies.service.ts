import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';

import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

import { SpacesService } from 'src/providers/space.service';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    private readonly spacesService: SpacesService,
  ) {}

  async create(
    createCompanyDto: CreateCompanyDto,
    logoFile: Express.Multer.File,
  ): Promise<string> {
    if (logoFile) {
      // Генерация ключа для R2
      const logoKey = `companies/logos/${uuidv4()}${path.extname(logoFile.originalname)}`;

      // Загружаем логотип в R2
      await this.spacesService.saveFile(logoKey, logoFile.buffer);

      // Указываем путь к файлу в базе данных (используем ссылку на R2)
      createCompanyDto.logo = logoKey;
    }

    // Сохраняем компанию в базу данных
    const createdCompany = await this.companyRepository.save(createCompanyDto);

    return createdCompany.id;
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

    if (rating) {
      whereCondition.rating = Number(rating);
    }

    if (country) {
      whereCondition.country = Like(`%${country}%`);
    }

    if (city) {
      whereCondition.city = Like(`%${city}%`);
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
      data: companies.map(company => ({
        id: company.id,
        name: company.name,
        country: company.country,
        city: company.city,
        logo: company.logo,
        description: company.description,
        rating: company.rating,
        commentsIds: company.comments.map(comment => comment.id.toString()),
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

    return companies.map(company => ({
      id: company.id,
      name: company.name,
      country: company.country,
      city: company.city,
      logo: company.logo,
      description: company.description,
      rating: company.rating,
      commentsIds: company.comments.map(comment => comment.id),
    }));
  }

  async findLocations(): Promise<Record<string, string[]>> {
    const companies = await this.companyRepository.find({
      select: ['country', 'city'],
    });

    const result: Record<string, string[]> = {};

    companies.forEach(company => {
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

  async findOne(id: string): Promise<any> {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['comments'],
    });

    // Рассчитываем средний рейтинг
    // const ratings = company.comments
    //   .map((comment) => comment.rating)
    //   .filter((rating) => rating !== null);

    // const averageRating =
    //   ratings.length > 0
    //     ? Math.ceil(ratings.reduce((sum, r) => sum + r, 0) / ratings.length)
    //     : 0;
    // console.log(averageRating);

    // Обновляем рейтинг в базе
    await this.companyRepository.update(id, { rating: 0 });

    return {
      id: company.id,
      name: company.name,
      country: company.country,
      city: company.city,
      logo: company.logo,
      description: company.description,
      // rating: averageRating,
      commentsIds: company.comments.map(comment => comment.id),
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
      // Если компания уже имеет логотип, удаляем старое изображение из R2
      if (company.logo) {
        const oldKey = company.logo;
        await this.spacesService.deleteFile(oldKey);
      }

      // Генерация нового ключа для логотипа в R2
      const logoKey = `companies/logos/${uuidv4()}${path.extname(logoFile.originalname)}`;

      // Загружаем новый логотип в R2
      await this.spacesService.saveFile(logoKey, logoFile.buffer);

      // Обновляем ссылку на новый логотип в базе данных
      updateCompanyDto.logo = logoKey;
    }

    // Обновляем информацию о компании в базе данных
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
