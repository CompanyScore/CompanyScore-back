import { Module } from '@nestjs/common';
import { CommentWorkSecondaryService } from './comment_work_secondary.service';
import { CommentWorkSecondaryController } from './comment_work_secondary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentWorkSecondary } from './entities/comment_work_secondary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentWorkSecondary])],
  exports: [TypeOrmModule],
  controllers: [CommentWorkSecondaryController],
  providers: [CommentWorkSecondaryService],
})
export class CommentWorkSecondaryModule {}
