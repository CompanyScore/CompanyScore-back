import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentWorkPrimary } from './entities/comment_work_primary.entity';
import { CreateCommentWorkPrimaryDto } from './dto/create-comment_work_primary.dto';

@Injectable()
export class CommentWorkPrimaryService {
  constructor(
    @InjectRepository(CommentWorkPrimary)
    private readonly repo: Repository<CommentWorkPrimary>,
  ) {}

  async create(dto: CreateCommentWorkPrimaryDto): Promise<CommentWorkPrimary> {
    const entity = this.repo.create(dto);
    return await this.repo.save(entity);
  }
}
