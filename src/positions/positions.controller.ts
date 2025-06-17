import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post()
  async create(@Body() createPositionDto: CreatePositionDto) {
    return await this.positionsService.create(createPositionDto);
  }

  @Get()
  async findAll() {
    return await this.positionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.positionsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return await this.positionsService.update(id, updatePositionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.positionsService.remove(id);
  }
}
