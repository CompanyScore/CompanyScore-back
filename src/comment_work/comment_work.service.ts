import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentWork } from './entities/comment_work.entity';
import { WorkEducationLink } from './entities/work_education_link.entity';
import { WorkSocialBenefitLink } from './entities/work_social_benefit_link.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { CreateCommentWorkDto } from './dto/create_comment_work.dto';

@Injectable()
export class CommentWorkService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(CommentWork)
    private readonly commentWorkRepository: Repository<CommentWork>,

    @InjectRepository(WorkEducationLink)
    private readonly educationLinkRepository: Repository<WorkEducationLink>,

    @InjectRepository(WorkSocialBenefitLink)
    private readonly socialLinkRepository: Repository<WorkSocialBenefitLink>,
  ) {}

  async create(dto: CreateCommentWorkDto): Promise<CommentWork> {
    const comment = await this.commentRepository.findOne({
      where: { id: dto.commentId },
    });

    if (!comment) throw new NotFoundException('Комментарий не найден');

    const workForm = this.commentWorkRepository.create({
      primaryFrom: dto.primary.periodFrom,
      primaryTo: dto.primary.periodTo,
      primaryManagement: dto.primary.management,
      primaryTeam: dto.primary.team,
      primaryProject: dto.primary.project,
      primaryStack: dto.primary.stack,
      primaryWorkingSchedule: dto.primary.workingSchedule,
      primaryWorkFormat: dto.primary.workFormat,
      primaryStability: dto.primary.stability,
      primarySalaryPoints: dto.primary.salaryPoints,
      primarySalaryValue: dto.primary.salaryValue,

      secondaryDevelopment: dto.secondary.development,
      secondaryComfort: dto.secondary.comfort,
      secondaryDiscrimination: dto.secondary.discrimination,
      secondaryEthics: dto.secondary.ethics,
      secondaryPerformanceReview: dto.secondary.performanceReview,
      secondaryEvents: dto.secondary.events,

      financeBonusesPoints: dto.finance.bonusesPoints,
      financeBonusesValue: dto.finance.bonusesValue,
      financeMedicinePoints: dto.finance.medicinePoints,
      financeMedicineValue: dto.finance.medicineValue,
      financeProfitSharePoints: dto.finance.profitSharePoints,
      financeProfitShareValue: dto.finance.profitShareValue,

      educations: [],
      socialBenefits: [],
    });

    const saved = await this.commentWorkRepository.save(workForm);

    const educationLinks = dto.secondary.educations.map(id =>
      this.educationLinkRepository.create({
        educationId: id,
        commentWork: saved,
      }),
    );
    const socialLinks = dto.finance.socialBenefits.map(id =>
      this.socialLinkRepository.create({
        benefitId: id,
        commentWork: saved,
      }),
    );

    await this.educationLinkRepository.save(educationLinks);
    await this.socialLinkRepository.save(socialLinks);

    comment.work = saved;
    await this.commentRepository.save(comment);

    return this.commentWorkRepository.findOne({
      where: { id: saved.id },
      relations: ['educations', 'socialBenefits'],
    });
  }
}
