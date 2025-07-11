import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentWorkFinance } from './entities/comment_work_finance.entity';
import { CreateCommentWorkFinanceDto } from './dto/create-comment_work_finance.dto';

@Injectable()
export class CommentWorkFinanceService {
  constructor(
    @InjectRepository(CommentWorkFinance)
    private readonly repo: Repository<CommentWorkFinance>,
  ) {}

  async create(dto: CreateCommentWorkFinanceDto): Promise<CommentWorkFinance> {
    const entity = this.repo.create(dto);
    return await this.repo.save(entity);
  }
}
