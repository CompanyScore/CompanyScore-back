import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentWorkService } from './comment_work.service';
import { CommentWorkController } from './comment_work.controller';

import { Comment } from 'src/comments/entities/comment.entity';
import { CommentWork } from './entities/comment_work.entity';
import { WorkEducationLink } from './entities/work_education_link.entity';
import { WorkSocialBenefitLink } from './entities/work_social_benefit_link.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Comment,
      CommentWork,
      WorkEducationLink,
      WorkSocialBenefitLink,
    ]),
  ],
  controllers: [CommentWorkController],
  providers: [CommentWorkService],
})
export class CommentWorkModule {}
