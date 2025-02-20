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

  async findAll(isDeleted: boolean): Promise<any> {
    const users = await this.userRepository.find({
      where: { isDeleted },
      relations: ['comments'],
    });

    return users.map((user) => {
      const { comments, ...userData } = user;
      return {
        ...userData,
        commentsIds: comments.map(({ id }) => id),
      };
    });
  }

  async findOne(userId?: string, linkedinId?: string): Promise<any> {
    const where: any = {};

    if (userId) {
      where.id = userId;
    }

    if (linkedinId) {
      where.linkedinId = linkedinId;
    }

    const user = await this.userRepository.findOne({
      where,
      relations: ['comments'],
    });

    if (!user) {
      return null; // нужно именно null, потому что проверка нужна для create
    }

    const { comments, ...userData } = user;
    return {
      ...userData,
      commentsIds: comments.map(({ id }) => id),
    };
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    avatarFile: Express.Multer.File,
  ): Promise<User> {
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
    return this.findOne(id);
  }

  async remove(id: string): Promise<string> {
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

    return `Пользователь удален!`;
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (user) {
      this.userRepository.update(id, { refreshToken: refreshToken });
    }
  }
}
