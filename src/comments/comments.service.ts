import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Company } from 'src/companies/entities/company.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment, 'CompanyScore')
    private commentRepository: Repository<Comment>,

    @InjectRepository(User, 'CompanyScore')
    private readonly userRepository: Repository<User>,

    @InjectRepository(Company, 'CompanyScore')
    private readonly companyRepository: Repository<User>,
  ) {}

  async createCommentToUser(
    userId: number,
    companyId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (user) {
      throw new BadRequestException(
        `User with ID ${userId} already has comment`,
      );
    }

    const company = await this.companyRepository.findOneBy({ id: companyId });
    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    const comment = this.commentRepository.create({
      ...createCommentDto,
      user, // Передаем весь объект User, а не только id
      company,
    });

    return this.commentRepository.save(comment);
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
        user: {
          id: comment.user.id, // ID пользователя
          name: comment.user.name, // Имя пользователя
          photo: comment.user.photo, // Фото пользователя
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
    this.commentRepository.delete(id);
  }
}
