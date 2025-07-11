import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentInternship } from './entities/comment_internship.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { CreateCommentInternshipDto } from './dto/create_comment_internship.dto';

@Injectable()
export class CommentInternshipService {
  constructor(
    @InjectRepository(CommentInternship)
    private readonly commentInternshipRepository: Repository<CommentInternship>,

    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(dto: CreateCommentInternshipDto): Promise<CommentInternship> {
    const { commentId, ...rest } = dto;

    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });
    if (!comment) throw new NotFoundException('Комментарий не найден');

    const internship = this.commentInternshipRepository.create({
      ...rest,
    });

    const saved = await this.commentInternshipRepository.save(internship);

    comment.internship = saved;
    await this.commentRepository.save(comment);

    return saved;
  }
}
