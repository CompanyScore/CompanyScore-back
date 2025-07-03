import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkEducation } from './entities/work-education.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkEducationService {
  constructor(
    @InjectRepository(WorkEducation)
    private readonly workEducationRepository: Repository<WorkEducation>,
  ) {}

  findAll(): Promise<WorkEducation[]> {
    return this.workEducationRepository.find({
      order: {
        number: 'ASC',
      },
    });
  }
}
