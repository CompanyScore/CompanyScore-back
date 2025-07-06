import { Module } from '@nestjs/common';
import { InterviewStageService } from './interview_stage.service';
import { InterviewStageController } from './interview_stage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewStage } from './entities/interview_stage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InterviewStage])],
  controllers: [InterviewStageController],
  providers: [InterviewStageService],
})
export class InterviewStageModule {}
