import { Module } from '@nestjs/common';
import { WorkFormService } from './work-form.service';
import { WorkFormController } from './work-form.controller';

@Module({
  controllers: [WorkFormController],
  providers: [WorkFormService],
})
export class WorkFormModule {}
