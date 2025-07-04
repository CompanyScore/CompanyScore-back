import { Module } from '@nestjs/common';
import { TaskFormService } from './task-form.service';
import { TaskFormController } from './task-form.controller';

@Module({
  controllers: [TaskFormController],
  providers: [TaskFormService],
})
export class TaskFormModule {}
