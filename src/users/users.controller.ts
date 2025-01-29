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
  // UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// import * as path from 'path';
// import * as fs from 'fs';
// import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/providers/file.service';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
  // @UseGuards(JwtAuthGuard)
  findAll(@Query('isDeleted') isDeleted: boolean) {
    return this.usersService.findAll(isDeleted);
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  findOne(@Body('githubId') githubId: number, @Param('id') id: string) {
    return this.usersService.findOne(+id, githubId);
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatarFile'))
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() avatarFile: Express.Multer.File,
  ) {
    if (avatarFile) {
      const user = await this.usersService.findOne(+id);
      if (!user) {
        throw new NotFoundException('Пользователь не найден');
      }

      if (user.avatar) {
        await this.fileService.deleteFile(user.avatar);
      }

      const avatarPath = await this.fileService.saveFile(
        avatarFile.buffer,
        'users/avatars',
        avatarFile.originalname,
      );

      updateUserDto.avatarPath = avatarPath;
    }
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
