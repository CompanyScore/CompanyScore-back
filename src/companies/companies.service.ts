import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

import { R2Service } from 'src/providers/r2.service';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { Country } from 'src/country/entities/country.entity';
import { City } from 'src/city/entities/city.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    private readonly r2Service: R2Service,

    @InjectRepository(Country)
    private countryRepository: Repository<Country>,

    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async create(
    createCompanyDto: CreateCompanyDto,
    logoFile: Express.Multer.File,
  ): Promise<string> {
    const exsistingCompany = await this.companyRepository.findOne({
      where: { name: createCompanyDto.name },
    });

    if (exsistingCompany) {
      throw new BadRequestException('Компания с таким именем уже существует');
    }

    if (logoFile) {
      // Генерация ключа для R2
      const logoKey = `companies/logos/${uuidv4()}${path.extname(logoFile.originalname)}`;

      // Загружаем логотип в R2
      await this.r2Service.saveFile(logoKey, logoFile.buffer);

      // Указываем путь к файлу в базе данных (используем ссылку на R2)
      createCompanyDto.logo = logoKey;
    }

    const country = await this.countryRepository.findOneBy({
      id: createCompanyDto.country,
    });
    if (!country) {
      throw new NotFoundException('Такой страны не существует!');
    }

    const city = await this.cityRepository.findOne({
      where: { name: createCompanyDto.city },
      relations: ['country'],
    });

    if (!city) {
      throw new NotFoundException('Такого города не существует!');
    }

    if (city.country.id !== country.id) {
      throw new NotFoundException('Город не принадлежит этой стране!');
    }

    // Сохраняем компанию в базу данных
    const createdCompany = await this.companyRepository.save({
      ...createCompanyDto,
      country,
      city,
    });

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
    // Убедимся, что лимит и страница имеют значения по умолчанию
    const take = limit || 10; // количество элементов на странице (по умолчанию 10)
    const skip = (page - 1) * take || 0; // пропуск элементов (по умолчанию 0)

    const query = this.companyRepository
      .createQueryBuilder('company')
      .leftJoinAndSelect('company.country', 'country')
      .leftJoinAndSelect('company.city', 'city')
      .leftJoinAndSelect('company.comments', 'comment')
      .leftJoinAndSelect('company.branches', 'branch')
      .where('company.isDeleted = false');

    if (name) {
      query.andWhere('company.name ILIKE :name', { name: `%${name}%` });
    }

    if (rating) {
      query.andWhere('company.rating = :rating', { rating: Number(rating) });
    }

    if (country) {
      query.andWhere('country.name ILIKE :country', {
        country: `%${country}%`,
      });
    }

    if (city) {
      query.andWhere('city.name ILIKE :city', { city: `%${city}%` });
    }

    query.skip(skip).take(take);

    const [companies, total] = await query.getManyAndCount();

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
        branches: company.branches.map(branch => ({
          id: branch.id,
          name: branch.name,
          country: branch.country,
          city: branch.city,
          address: branch.address,
          rating: branch.rating,
        })),
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
      relations: ['comments', 'branches'],
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
      branches: company.branches.map(branch => ({
        id: branch.id,
        name: branch.name,
        country: branch.country,
        city: branch.city,
        address: branch.address,
        rating: branch.rating,
      })),
    }));
  }

  async findLocations(): Promise<Record<string, string[]>> {
    const companies = await this.companyRepository.find({
      select: ['country', 'city'],
      relations: ['country', 'city'],
    });

    const result: Record<string, string[]> = {};

    companies.forEach(company => {
      if (!result[company.country.name]) {
        result[company.country.name] = [];
      }

      // Добавляем только уникальные города
      if (!result[company.country.name].includes(company.city.name)) {
        result[company.country.name].push(company.city.name);
      }
    });

    return result;
  }

  async findOne(id: string): Promise<any> {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['comments', 'branches'],
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
      branches: company.branches.map(branch => ({
        id: branch.id,
        name: branch.name,
        country: branch.country,
        city: branch.city,
        address: branch.address,
        rating: branch.rating,
      })),
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
        await this.r2Service.deleteFile(oldKey);
      }

      // Генерация нового ключа для логотипа в R2
      const logoKey = `companies/logos/${uuidv4()}${path.extname(logoFile.originalname)}`;

      // Загружаем новый логотип в R2
      await this.r2Service.saveFile(logoKey, logoFile.buffer);

      // Обновляем ссылку на новый логотип в базе данных
      updateCompanyDto.logo = logoKey;
    }

    const country = await this.countryRepository.findOne({
      where: { id: updateCompanyDto.country },
    });

    if (!country) {
      throw new NotFoundException('Такой страны не существует!');
    }

    const city = await this.cityRepository.findOne({
      where: { name: updateCompanyDto.city },
      relations: ['country'],
    });

    if (!city) {
      throw new NotFoundException('Такого города не существует!');
    }

    if (city.country.id !== country.id) {
      throw new NotFoundException('Город не принадлежит этой стране!');
    }

    const updatedData = {
      ...updateCompanyDto,
      country,
      city,
    };
    // Обновляем информацию о компании в базе данных
    await this.companyRepository.update(id, updatedData);

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
