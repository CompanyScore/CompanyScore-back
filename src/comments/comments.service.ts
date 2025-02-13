import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Company } from 'src/companies/entities/company.entity';
import { CustomException } from 'src/exceptions/custom.exception';

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

  async updateCompanyRating(companyId: number): Promise<void> {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
      relations: ['comments'],
    });

    if (!company) return;

    const ratings = company.comments
      .map((comment) => comment.rating)
      .filter((rating) => rating !== null);

    const averageRating =
      ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
        : 0;

    await this.companyRepository.update(companyId, { rating: averageRating });
  }

  async createCommentToUser(
    userId: number,
    companyId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    // Проверяем, есть ли уже комментарий от этого пользователя для этой компании
    const existingComment = await this.commentRepository.findOne({
      where: { user: { id: userId }, company: { id: companyId } },
    });

    if (existingComment) {
      throw new CustomException(
        `User with ID ${userId} has already left a comment for company with ID ${companyId}`,
        'comment_already_exists',
      );
      // throw new BadRequestException(
      //   `User with ID ${userId} already has comment`,
      // );
    }

    const company = await this.companyRepository.findOne({
      where: { id: companyId },
      relations: ['comments'],
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Создаем новый комментарий
    const comment = this.commentRepository.create({
      ...createCommentDto,
      user, // Передаем весь объект User, а не только id
      company,
    });

    const savedComment = await this.commentRepository.save(comment);

    // Обновляем рейтинг компании
    await this.updateCompanyRating(companyId);

    return savedComment;
  }

  async findAll(
    userId: number,
    companyId: number,
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
      data: comments.map((comment) => ({
        id: comment.id,
        text: comment.text, // Текст комментария
        createDate: comment.createDate, // Дата создания комментария
        isDeleted: comment.isDeleted, // Флаг удаленного комментария
        rating: comment.rating, // Рейтинг комментария
        position: comment.position,
        user: {
          id: comment.user.id, // ID пользователя
          name: comment.user.name, // Имя пользователя
          avatar: comment.user.avatar, // Фото пользователя
        },
        company: {
          id: comment.company.id, // ID компании
          name: comment.company.name, // Название компании
          logo: comment.company.logoPath, // Логотип компании
        },
      })),
      total, // Общее количество комментариев
      page, // Текущая страница
      limit, // Лимит на странице
    };
  }

  async findOne(id: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { id },
      relations: ['user', 'company'],
    });
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    await this.commentRepository.update(id, updateCommentDto);

    const updatedComment = await this.commentRepository.findOneBy({ id });

    return updatedComment;
  }

  async remove(id: number): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['company'],
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    await this.commentRepository.delete(id);

    // Обновляем рейтинг компании после удаления комментария
    await this.updateCompanyRating(comment.company.id);
  }
}
