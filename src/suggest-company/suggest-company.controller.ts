import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SuggestCompanyService } from './suggest-company.service';
import { CreateSuggestCompanyDto } from './dto/create-suggest-company.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/users/entities/user.entity';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('suggest-company')
export class SuggestCompanyController {
  constructor(private readonly suggestCompanyService: SuggestCompanyService) {}

  @Post()
  create(
    @Body() createSuggestCompanyDto: CreateSuggestCompanyDto,
    @UserId() userId: string,
  ) {
    this.suggestCompanyService.create(userId, createSuggestCompanyDto);
  }

  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.suggestCompanyService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suggestCompanyService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.suggestCompanyService.remove(id);
  }
}
