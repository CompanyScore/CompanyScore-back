import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Comment } from 'src/comments/entities/comment.entity';
import { CommentInterview } from './entities/comment_interview.entity';
import { InterviewStageLink } from './entities/interview_stage_link.entity';

import { CreateCommentInterviewDto } from './dto/create_comment_interview.dto';

@Injectable()
export class CommentInterviewService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(CommentInterview)
    private readonly commentInterviewRepository: Repository<CommentInterview>,

    @InjectRepository(InterviewStageLink)
    private readonly interviewStageLinkRepository: Repository<InterviewStageLink>,
  ) {}

  async create(dto: CreateCommentInterviewDto): Promise<CommentInterview> {
    const { commentId, stages, ...rest } = dto;

    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    if (!comment) throw new NotFoundException('Комментарий не найден');

    const commentInterview = this.commentInterviewRepository.create({
      ...rest,
      stages: [],
    });

    const savedInterview =
      await this.commentInterviewRepository.save(commentInterview);

    const stageLinks = stages.map(stageId =>
      this.interviewStageLinkRepository.create({
        stageId,
        commentInterview: savedInterview,
      }),
    );

    await this.interviewStageLinkRepository.save(stageLinks);

    const result = await this.commentInterviewRepository.findOne({
      where: { id: savedInterview.id },
      relations: ['stages'],
    });

    comment.interview = result!;
    await this.commentRepository.save(comment);

    return result!;
  }

  async findAll(): Promise<CommentInterview[]> {
    return this.commentInterviewRepository.find();
  }
}
