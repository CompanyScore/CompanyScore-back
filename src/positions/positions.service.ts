import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
  ) {}
  async create(createPositionDto: CreatePositionDto) {
    return this.positionRepository.create(createPositionDto);
  }

  async findAll() {
    return await this.positionRepository.find();
  }

  async findOne(id: string) {
    return await this.positionRepository.findOneBy({ id });
  }

  async update(id: string, updatePositionDto: UpdatePositionDto) {
    const positionToUpdate = await this.positionRepository.findOneBy({ id });
    positionToUpdate.title = updatePositionDto.title;

    return await this.positionRepository.save(positionToUpdate);
  }

  async remove(id: string) {
    const positionToRemove = await this.positionRepository.findOneBy({ id });
    return await this.positionRepository.remove(positionToRemove);
  }
}
