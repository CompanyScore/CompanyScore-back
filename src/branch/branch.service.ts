import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/companies/entities/company.entity';
import { Branch } from './entities/branch.entity';
import { Country } from 'src/country/entities/country.entity';
import { City } from 'src/city/entities/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,

    @InjectRepository(Company)
    private companyRepository: Repository<Company>,

    @InjectRepository(Country)
    private countryRepository: Repository<Country>,

    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async create(createBranchDto: CreateBranchDto): Promise<Branch> {
    const company = await this.companyRepository.findOne({
      where: { id: createBranchDto.companyId, isDeleted: false },
    });

    if (!company) {
      throw new NotFoundException('Компания не найдена');
    }

    const country = await this.countryRepository.findOne({
      where: { id: createBranchDto.country },
    });

    if (!country) {
      throw new NotFoundException('Страна не найдена');
    }

    const city = await this.cityRepository.findOne({
      where: { id: createBranchDto.city },
    });

    if (!city) {
      throw new NotFoundException('Город не найден');
    }

    const branch = this.branchRepository.create({
      ...createBranchDto,
      company,
      country,
      city,
    });

    return this.branchRepository.save(branch);
  }

  async findAll(): Promise<Branch[]> {
    return this.branchRepository.find({
      relations: ['company', 'country', 'city'],
      where: { isDeleted: false },
    });
  }

  async findOne(id: string): Promise<Branch> {
    const branch = await this.branchRepository.findOne({
      where: { id, isDeleted: false },
      relations: ['company', 'country', 'city'],
    });

    if (!branch) {
      throw new NotFoundException('Филиал не найден');
    }

    return branch;
  }

  async update(id: string, updateBranchDto: UpdateBranchDto) {
    const branch = await this.branchRepository.findOne({
      where: { id },
      relations: ['company', 'country', 'city'],
    });

    if (!branch) {
      throw new NotFoundException('Филиал не найден');
    }

    if (updateBranchDto.country) {
      const country = await this.countryRepository.findOne({
        where: { id: updateBranchDto.country },
      });

      if (!country) {
        throw new NotFoundException('Страна не найдена');
      }
      branch.country = country;
    }

    if (updateBranchDto.city) {
      const city = await this.cityRepository.findOne({
        where: { id: updateBranchDto.city },
      });

      if (!city) {
        throw new NotFoundException('Город не найден');
      }
      branch.city = city;
    }

    const updatedBranch = {
      id: branch.id,
      name: updateBranchDto.name,
      address: updateBranchDto.address,
      rating: updateBranchDto.rating,
      country: branch.country,
      city: branch.city,
      createDate: branch.createDate,
      isDeleted: branch.isDeleted,
      company: branch.company,
    };

    await this.branchRepository.save(updatedBranch);

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const branch = await this.findOne(id);
    branch.isDeleted = true;
    await this.branchRepository.save(branch);
  }
}
