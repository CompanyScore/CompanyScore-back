import { Module } from '@nestjs/common';
import { WorkSocialBenefitService } from './work_social_benefit.service';
import { WorkSocialBenefitController } from './work_social_benefit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkSocialBenefit } from './entities/work_social_benefit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkSocialBenefit])],
  controllers: [WorkSocialBenefitController],
  providers: [WorkSocialBenefitService],
})
export class WorkSocialBenefitModule {}
