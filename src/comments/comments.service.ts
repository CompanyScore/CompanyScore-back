import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
// import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Company } from 'src/companies/entities/company.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async updateCompanyRating(companyId: string): Promise<string> {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
      relations: ['comments'],
    });

    if (!company) return;

    // const ratings = company.comments
    //   .map((comment) => comment.rating)
    //   .filter((rating) => rating !== null);

    // const averageRating =
    //   ratings.length > 0
    //     ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
    //     : 0;

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

    // Проверяем, есть ли уже комментарий от этого пользователя для этой компании
    const existingComment = await this.commentRepository.findOne({
      where: { user: { id: userId }, company: { id: companyId } },
    });

    if (existingComment) {
      throw new BadRequestException(
        `У вас уже есть комментарий для данной компании!`,
      );
    }

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

    // Создаем новый комментарий
    const comment = this.commentRepository.create({
      ...createCommentDto,
      user,
      company,
    });

    const createdComment = await this.commentRepository.save(comment);

    // Обновляем рейтинг компании
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
