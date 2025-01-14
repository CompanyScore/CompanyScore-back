import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, 'CompanyScore')
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  async findAll(isDeleted: boolean): Promise<any> {
    const users = await this.userRepository.find({
      where: { isDeleted },
      relations: ['comments'],
    });

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      photo: user.photo,
      createDate: user.createDate,
      deleteDate: user.deleteDate,
      commentsIds: user.comments.map((comment) => comment.id.toString()),
    }));
  }

  async findOne(userId: number): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['comments'], // Загружаем связанные комментарии
    });

    if (!user) {
      throw new Error('User not found'); // Обработка ситуации, если пользователь не найден
    }

    // Преобразуем комментарии в массив строк id
    return {
      createDate: user.createDate,
      deleteDate: user.deleteDate,
      id: user.id,
      isDeleted: user.isDeleted,
      name: user.name,
      photo: user.photo,
      commentsIds: user.comments.map((comment) => comment.id.toString()),
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    const deletedUser = {
      ...user,
      isDeleted: true,
      deleteDate: new Date(),
    };

    await this.userRepository.update(id, deletedUser);

    return `User ${id} was deleted`;
  }
}
