import { Controller, Get } from '@nestjs/common';
import { WorkEducationService } from './work-education.service';

@Controller('work-education')
export class WorkEducationController {
  constructor(private readonly workEducationService: WorkEducationService) {}

  @Get()
  findAll() {
    return this.workEducationService.findAll();
  }
}
