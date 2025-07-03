import { Controller, Get } from '@nestjs/common';
import { InterviewStageService } from './interview-stage.service';

@Controller('interview-stage')
export class InterviewStageController {
  constructor(private readonly interviewStageService: InterviewStageService) {}

  @Get()
  findAll() {
    return this.interviewStageService.findAll();
  }
}
