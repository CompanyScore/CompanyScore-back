import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentWorkSecondary } from './entities/comment_work_secondary.entity';
import { CreateCommentWorkSecondaryDto } from './dto/create-comment_work_secondary.dto';

@Injectable()
export class CommentWorkSecondaryService {
  constructor(
    @InjectRepository(CommentWorkSecondary)
    private readonly repo: Repository<CommentWorkSecondary>,
  ) {}

  async create(
    dto: CreateCommentWorkSecondaryDto,
  ): Promise<CommentWorkSecondary> {
    const entity = this.repo.create(dto);
    return await this.repo.save(entity);
  }
}
