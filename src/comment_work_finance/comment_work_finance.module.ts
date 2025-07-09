import { Module } from '@nestjs/common';
import { CommentWorkFinanceService } from './comment_work_finance.service';
import { CommentWorkFinanceController } from './comment_work_finance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentWorkFinance } from './entities/comment_work_finance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentWorkFinance])],
  exports: [TypeOrmModule],
  controllers: [CommentWorkFinanceController],
  providers: [CommentWorkFinanceService],
})
export class CommentWorkFinanceModule {}
