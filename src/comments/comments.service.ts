import { Injectable, NotFoundException } from '@nestjs/common';
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
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
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

  async findAll(userId: number, companyId: number): Promise<any> {
    const comments = await this.commentRepository.find({
      where: {
        user: { id: userId }, // Указываем связь с пользователем
        company: { id: companyId },
      },
      relations: ['user', 'company'], // Загружаем связанный объект User
    });

    return comments.map((comment) => ({
      id: comment.id,
      text: comment.text,
      createDate: comment.createDate,
      isDeleted: comment.isDeleted,
      rating: comment.rating,
      user: {
        id: comment.user.id,
        name: comment.user.name,
        photo: comment.user.photo,
      },
      company: {
        id: comment.company.id,
        name: comment.company.name,
        logo: comment.company.logo,
      },
    }));
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
