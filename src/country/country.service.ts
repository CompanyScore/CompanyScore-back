import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}
  async create(createCountryDto: CreateCountryDto): Promise<Country> {
    const country = this.countryRepository.create(createCountryDto);
    return await this.countryRepository.save(country);
  }

  async findAll(): Promise<Country[]> {
    return await this.countryRepository.find({ relations: ['cities'] });
  }

  async findOne(id: string): Promise<Country> {
    const country = await this.countryRepository.findOne({
      where: { id },
      relations: ['cities'],
    });

    if (!country) {
      throw new NotFoundException('Страна не найдена');
    }

    return country;
  }

  async update(id: string, updateCountryDto: UpdateCountryDto) {
    const country = await this.countryRepository.findOneBy({ id });
    if (!country) {
      throw new BadRequestException('Страна не найдена!');
    }

    await this.countryRepository.update(id, updateCountryDto);
    return await this.countryRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    const country = await this.countryRepository.findOneBy({ id });
    if (!country) {
      throw new BadRequestException('Страна не найдена!');
    }

    await this.countryRepository.delete(id);
  }
}
