import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from 'src/companies/entities/company.entity';
import { Branch } from './entities/branch.entity';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,

    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(createBranchDto: CreateBranchDto): Promise<Branch> {
    const company = await this.companyRepository.findOne({
      where: { id: createBranchDto.companyId, isDeleted: false },
    });

    if (!company) {
      throw new NotFoundException('Компания не найдена');
    }

    const branch = this.branchRepository.create({
      ...createBranchDto,
      company,
    });

    return this.branchRepository.save(branch);
  }

  async findAll(): Promise<Branch[]> {
    return this.branchRepository.find({
      relations: ['company'],
      where: { isDeleted: false },
    });
  }

  async findOne(id: string): Promise<Branch> {
    const branch = await this.branchRepository.findOne({
      where: { id, isDeleted: false },
      relations: ['company'],
    });

    if (!branch) {
      throw new NotFoundException('Филиал не найден');
    }

    return branch;
  }

  async update(id: string, updateBranchDto: UpdateBranchDto) {
    await this.branchRepository.update(id, updateBranchDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const branch = await this.findOne(id);
    branch.isDeleted = true;
    await this.branchRepository.save(branch);
  }
}
