import { Module } from '@nestjs/common';
import { WorkEducationService } from './work-education.service';
import { WorkEducationController } from './work-education.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkEducation } from './entities/work-education.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkEducation])],
  controllers: [WorkEducationController],
  providers: [WorkEducationService],
})
export class WorkEducationModule {}
