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
      role: user.role,
      name: user.name,
      avatar: user.avatar,
      createDate: user.createDate,
      deleteDate: user.deleteDate,
      commentsIds: user.comments.map((comment) => comment.id.toString()),
    }));
  }

  async findOne(userId?: number, linkedinId?: number): Promise<any> {
    const where: any = {};
    if (userId !== undefined) {
      where.id = userId;
    }
    if (linkedinId !== undefined) {
      where.linkedinId = linkedinId;
    }

    const user = await this.userRepository.findOne({
      where,
      relations: ['comments'], // Загружаем связанные комментарии
    });

    if (!user) {
      return null;
    }

    // Преобразуем комментарии в массив строк id
    return {
      id: user.id,
      role: user.role,
      refreshToken: user.refreshToken,
      createDate: user.createDate,
      deleteDate: user.deleteDate,
      isDeleted: user.isDeleted,
      name: user.name,
      avatar: user.avatar,
      position: user.position,
      description: user.description,
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

  async updateRefreshToken(userId: number, refreshToken: string) {
    const user: User | undefined = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (user) {
      this.userRepository.update(userId, { refreshToken: refreshToken });
    }
  }
}
