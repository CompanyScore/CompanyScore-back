import { Module } from '@nestjs/common';
import { InternshipFormService } from './internship-form.service';
import { InternshipFormController } from './internship-form.controller';

@Module({
  controllers: [InternshipFormController],
  providers: [InternshipFormService],
})
export class InternshipFormModule {}
