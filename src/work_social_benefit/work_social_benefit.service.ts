import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkSocialBenefit } from './entities/work_social_benefit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkSocialBenefitService {
  constructor(
    @InjectRepository(WorkSocialBenefit)
    private readonly workSocialBenefitRepository: Repository<WorkSocialBenefit>,
  ) {}

  findAll() {
    return this.workSocialBenefitRepository.find({
      order: {
        number: 'ASC',
      },
    });
  }
}
