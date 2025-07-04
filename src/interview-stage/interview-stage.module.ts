import { Module } from '@nestjs/common';
import { InterviewStageService } from './interview-stage.service';
import { InterviewStageController } from './interview-stage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewStage } from './entities/interview-stage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InterviewStage])],
  controllers: [InterviewStageController],
  providers: [InterviewStageService],
})
export class InterviewStageModule {}
