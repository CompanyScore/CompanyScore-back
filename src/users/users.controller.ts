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

import * as multer from 'multer';
import { ImageFormatInterceptor } from 'src/interceptors/image-format.interceptor';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Query('isDeleted') isDeleted: boolean) {
    return this.usersService.findAll(isDeleted);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }

    return user;
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
    return this.usersService.update(id, updateUserDto, avatarFile);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
