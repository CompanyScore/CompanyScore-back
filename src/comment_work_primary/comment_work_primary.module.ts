import { Module } from '@nestjs/common';
import { CommentWorkPrimaryService } from './comment_work_primary.service';
import { CommentWorkPrimaryController } from './comment_work_primary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentWorkPrimary } from './entities/comment_work_primary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentWorkPrimary])],
  exports: [TypeOrmModule],
  controllers: [CommentWorkPrimaryController],
  providers: [CommentWorkPrimaryService],
})
export class CommentWorkPrimaryModule {}
