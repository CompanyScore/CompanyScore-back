import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InterviewStage } from './entities/interview_stage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InterviewStageService {
  constructor(
    @InjectRepository(InterviewStage)
    private readonly interviewStageRepository: Repository<InterviewStage>,
  ) {}

  findAll(): Promise<InterviewStage[]> {
    return this.interviewStageRepository.find({
      order: {
        number: 'ASC',
      },
    });
  }
}
