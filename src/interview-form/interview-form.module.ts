import { Module } from '@nestjs/common';
import { InterviewFormService } from './interview-form.service';
import { InterviewFormController } from './interview-form.controller';

@Module({
  controllers: [InterviewFormController],
  providers: [InterviewFormService],
})
export class InterviewFormModule {}
