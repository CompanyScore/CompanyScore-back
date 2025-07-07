import { Module } from '@nestjs/common';
import { WorkEducationService } from './work_education.service';
import { WorkEducationController } from './work_education.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkEducation } from './entities/work_education.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkEducation])],
  controllers: [WorkEducationController],
  providers: [WorkEducationService],
})
export class WorkEducationModule {}
