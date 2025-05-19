import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

import { Role } from './entities/user.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { ImageFormatInterceptor } from 'src/interceptors/image-format.interceptor';

import * as multer from 'multer';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(
    @Query('isDeleted') isDeleted: boolean,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.usersService.findAll(isDeleted, page, limit);
  }

  @Get('/profile')
  async findProfile(@UserId() userId: string) {
    return this.usersService.findOne(userId);
  }

  @Get('/:id')
  async findOne(@Query('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch()
  @UseInterceptors(
    FileInterceptor('avatarFile', { storage: multer.memoryStorage() }),
    ImageFormatInterceptor,
  )
  async update(
    @UserId() userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() avatarFile: Express.Multer.File,
  ) {
    return this.usersService.update(userId, updateUserDto, avatarFile);
  }

  @Roles(Role.ADMIN)
  @Delete()
  async remove(@UserId() userId: string) {
    return this.usersService.remove(userId);
  }
}
