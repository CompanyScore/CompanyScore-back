import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { FileService } from 'src/providers/file.service';

@Injectable()
export class UsersService {
  private readonly DEFAULT_AVATAR = '/files/users/avatars/default-ava.jpg';

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly fileService: FileService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  async findAll(isDeleted: boolean, page: number, limit: number): Promise<any> {
    const whereCondition: any = { isDeleted };

    const take = limit || 10;
    const skip = (page - 1) * take || 0;

    const [users, total] = await this.userRepository.findAndCount({
      where: whereCondition,
      relations: ['comments'],
      take,
      skip,
    });

    return {
      data: users.map((user) => ({
        id: user.id,
        role: user.role,
        name: user.name,
        avatar: user.avatar,
        position: user.position,
        createDate: user.createDate,
        deleteDate: user.deleteDate,
        commentsIds: user.comments.map((comment) => comment.id),
      })),
      total,
      page,
      limit: take,
    };
  }

  async findOneByLinkedin(linkedinId: string): Promise<User> {
    return this.userRepository.findOne({ where: { linkedinId } });
  }

  async findOne(id: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['comments'],
    });

    if (!user) {
      throw new BadRequestException(`Пользователь не найден!`);
    }

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
      commentsIds: user.comments.map((comment) => comment.id),
    };
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    avatarFile: Express.Multer.File,
  ) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new BadRequestException(`Пользователь не найден!`);
    }

    if (avatarFile) {
      if (user.avatar && user.avatar != this.DEFAULT_AVATAR) {
        await this.fileService.deleteFile(user.avatar);
      }

      const avatar = await this.fileService.saveFile(
        avatarFile.buffer,
        'users/avatars',
        avatarFile.originalname,
      );

      updateUserDto.avatar = avatar;
    }

    await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new BadRequestException(`Пользователь не найден!`);
    }

    const deletedUser = {
      ...user,
      isDeleted: true,
      deleteDate: new Date(),
    };

    await this.userRepository.update(id, deletedUser);
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (user) {
      this.userRepository.update(id, { refreshToken: refreshToken });
    }
  }
}
