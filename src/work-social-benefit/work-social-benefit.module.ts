import { Module } from '@nestjs/common';
import { WorkSocialBenefitService } from './work-social-benefit.service';
import { WorkSocialBenefitController } from './work-social-benefit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkSocialBenefit } from './entities/work-social-benefit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkSocialBenefit])],
  controllers: [WorkSocialBenefitController],
  providers: [WorkSocialBenefitService],
})
export class WorkSocialBenefitModule {}
