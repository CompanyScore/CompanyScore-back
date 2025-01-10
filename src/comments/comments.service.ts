import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment, 'CompanyScore')
    private commentRepository: Repository<Comment>,

    @InjectRepository(User, 'CompanyScore')
    private readonly userRepository: Repository<User>,
  ) {}

  async createCommentToUser(
    userId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const comment = this.commentRepository.create({
      ...createCommentDto,
      user, // Передаем весь объект User, а не только id
    });

    return this.commentRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find({
      relations: ['user'], // Загружаем связанный объект User
    });
  }

  async findOne(id: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { id },
      relations: ['user'],
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
