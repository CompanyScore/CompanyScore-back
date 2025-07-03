import { Controller, Get } from '@nestjs/common';
import { WorkSocialBenefitService } from './work-social-benefit.service';

@Controller('work-social-benefit')
export class WorkSocialBenefitController {
  constructor(
    private readonly workSocialBenefitService: WorkSocialBenefitService,
  ) {}

  @Get()
  findAll() {
    return this.workSocialBenefitService.findAll();
  }
}
