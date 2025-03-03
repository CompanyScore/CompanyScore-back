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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

import { Role } from './entities/user.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { ImageFormatInterceptor } from 'src/interceptors/image-format.interceptor';

import * as multer from 'multer';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { USER_RESPONSE, USERS_RESPONSE } from './user.swagger.responses';
import { UserId } from 'src/decorators/user-id.decorator';

@ApiTags('users') // This tag will appear in the Swagger UI
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Users list',
    ...USERS_RESPONSE,
  })
  async findAll(
    @Query('isDeleted') isDeleted: boolean,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.usersService.findAll(isDeleted, page, limit);
  }

  @Get('/profile')
  @ApiResponse({
    status: 200,
    description: 'User profile',
    ...USER_RESPONSE,
  })
  async findProfile(@UserId() userId: string) {
    return this.usersService.findOne(userId);
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'User detail',
    ...USER_RESPONSE,
  })
  async findOne(@Query('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch()
  @ApiResponse({
    status: 200,
    description: 'Updated user',
    ...USER_RESPONSE,
  })
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
  @ApiResponse({
    status: 200,
    description: 'Deleted user',
    ...USER_RESPONSE,
  })
  async remove(@UserId() userId: string) {
    return this.usersService.remove(userId);
  }
}
