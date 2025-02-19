import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/providers/file.service';
import * as multer from 'multer';
import { ImageFormatInterceptor } from 'src/interceptors/image-format.interceptor';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query('isDeleted') isDeleted: boolean) {
    return this.usersService.findAll(isDeleted);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id, null);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('avatarFile', {
      storage: multer.memoryStorage(),
    }),
    ImageFormatInterceptor,
  )
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() avatarFile: Express.Multer.File,
  ) {
    if (avatarFile) {
      const user = await this.usersService.findOne(id);
      if (!user) {
        throw new NotFoundException('Пользователь не найден!');
      }

      if (
        user.avatar &&
        user.avatar != '/files/users/avatars/default-ava.jpg'
      ) {
        await this.fileService.deleteFile(user.avatar);
      }

      const avatar = await this.fileService.saveFile(
        avatarFile.buffer,
        'users/avatars',
        avatarFile.originalname,
      );

      updateUserDto.avatar = avatar;
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
