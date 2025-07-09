import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'src/country/entities/country.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(Country)
    private readonly countryReposutory: Repository<Country>,
  ) {}
  async create(createCityDto: CreateCityDto): Promise<City> {
    const { name, countryId } = createCityDto;

    const country = await this.countryReposutory.findOne({
      where: { id: countryId },
    });

    if (!country) {
      throw new NotFoundException(`Страна не найдена!`);
    }

    const city = this.cityRepository.create({ name, country });
    return this.cityRepository.save(city);
  }

  async findAll(): Promise<City[]> {
    return await this.cityRepository.find();
  }

  async findOne(id: string): Promise<City> {
    const city = await this.cityRepository.findOne({
      where: { id },
      relations: ['country'],
    });

    if (!city) {
      throw new NotFoundException('Город не найден!');
    }

    return city;
  }

  async update(id: string, updateCityDto: UpdateCityDto): Promise<City> {
    const city = await this.cityRepository.findOneBy({ id });
    if (!city) {
      throw new BadRequestException('Город не найден!');
    }

    if (updateCityDto.countryId) {
      const country = await this.countryReposutory.findOne({
        where: { id: updateCityDto.countryId },
      });

      if (!country) {
        throw new NotFoundException('Страна не найдена!');
      }
      city.country = country;
      city.name = updateCityDto.name;
    }

    return await this.cityRepository.save(city);
  }

  async remove(id: string): Promise<void> {
    const city = await this.cityRepository.findOneBy({ id });
    if (!city) {
      throw new BadRequestException('Город не найден!');
    }

    await this.cityRepository.delete(id);
  }
}
