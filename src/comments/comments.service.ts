import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create_comment.dto';
// import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Company } from 'src/companies/entities/company.entity';
import { CommentTask } from 'src/comment_task/entities/comment_task.entity';
import { CommentInterview } from 'src/comment_interview/entities/comment_interview.entity';
import { CommentInternship } from 'src/comment_internship/entities/comment_internship.entity';
import { CommentWorkPrimary } from 'src/comment_work_primary/entities/comment_work_primary.entity';
import { CommentWorkSecondary } from 'src/comment_work_secondary/entities/comment_work_secondary.entity';
import { CommentWorkFinance } from 'src/comment_work_finance/entities/comment_work_finance.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,

    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(CommentTask)
    private readonly taskRepository: Repository<CommentTask>,

    @InjectRepository(CommentInterview)
    private readonly interviewRepository: Repository<CommentInterview>,

    @InjectRepository(CommentInternship)
    private readonly internshipRepository: Repository<CommentInternship>,

    @InjectRepository(CommentWorkPrimary)
    private readonly workPrimaryRepository: Repository<CommentWorkPrimary>,

    @InjectRepository(CommentWorkSecondary)
    private readonly workSecondaryRepository: Repository<CommentWorkSecondary>,

    @InjectRepository(CommentWorkFinance)
    private readonly workFinanceRepository: Repository<CommentWorkFinance>,
  ) {}

  async updateCompanyRating(companyId: string): Promise<string> {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
      relations: ['comments'],
    });

    if (!company) return;

    await this.companyRepository.update(companyId, { rating: 0 });

    return 'Рэйтинг обновлен';
  }

  async createCommentToUser(
    userId: string,
    companyId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<string> {
    if (!userId || !companyId) {
      throw new BadRequestException('userId и companyId обязательны!');
    }

    // Проверка на уникальность
    const existingComment = await this.commentRepository.findOne({
      where: { user: { id: userId }, company: { id: companyId } },
    });

    if (existingComment) {
      throw new BadRequestException(
        `У вас уже есть комментарий для данной компании!`,
      );
    }

    // Получаем компанию и пользователя
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
      relations: ['comments'],
    });

    if (!company) {
      throw new NotFoundException(`Компания не найдена!`);
    }

    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(`Пользователь не найден!`);
    }

    // Деструктурируем вложенные формы
    const {
      task,
      interview,
      internship,
      workPrimary,
      workSecondary,
      workFinance,
      ...rest
    } = createCommentDto;

    // Создаём комментарий
    const comment = this.commentRepository.create({
      ...rest,
      user,
      company,
    });

    if (task) {
      comment.task = this.taskRepository.create(task);
    }

    if (interview) {
      comment.interview = this.interviewRepository.create(interview);
    }

    if (internship) {
      comment.internship = this.internshipRepository.create(internship);
    }

    if (workPrimary) {
      comment.workPrimary = this.workPrimaryRepository.create(workPrimary);
    }

    if (workSecondary) {
      comment.workSecondary =
        this.workSecondaryRepository.create(workSecondary);
    }

    if (workFinance) {
      comment.workFinance = this.workFinanceRepository.create(workFinance);
    }

    const createdComment = await this.commentRepository.save(comment);

    // await this.updateCompanyRating(companyId);

    return createdComment.id;
  }

  async findAll(
    userId: string,
    companyId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<any> {
    const skip = (page - 1) * limit; // Вычисляем, сколько элементов пропустить

    const [comments, total] = await this.commentRepository.findAndCount({
      where: {
        user: { id: userId }, // Указываем связь с пользователем
        company: { id: companyId },
      },
      relations: ['user', 'company'], // Загружаем связанный объект User
      take: limit, // Ограничиваем количество элементов на странице
      skip, // Пропускаем элементы для текущей страницы
    });

    // Преобразуем комментарии в нужный формат для фронтенда
    return {
      data: comments.map(comment => ({
        id: comment.id,
        position: comment.userPosition,
        grade: {
          years: comment.userGradeYears,
          months: comment.userGradeMonths,
        },
        recommendation: {
          isRecommended: comment.isRecommended,
          reasonJoined: comment.reasonJoined,
          reasonLeft: comment.reasonLeft,
        },
        user: {
          id: comment.user.id, // ID пользователя
          name: comment.user.name, // Имя пользователя
          avatar: comment.user.avatar, // Фото пользователя
        },
        company: {
          id: comment.company.id, // ID компании
          name: comment.company.name, // Название компании
          logo: comment.company.logo, // Логотип компании
        },
      })),
      total, // Общее количество комментариев
      page, // Текущая страница
      limit, // Лимит на странице
    };
  }
}
