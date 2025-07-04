import {
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  Param,
  // Delete,
} from '@nestjs/common';
import { TaskFormService } from './task-form.service';
// import { CreateTaskFormDto } from './dto/create-task-form.dto';
// import { UpdateTaskFormDto } from './dto/update-task-form.dto';

@Controller('task-form')
export class TaskFormController {
  constructor(private readonly taskFormService: TaskFormService) {}

  // @Post()
  // create(@Body() createTaskFormDto: CreateTaskFormDto) {
  //   return this.taskFormService.create(createTaskFormDto);
  // }

  @Get()
  findAll() {
    return this.taskFormService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskFormService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateTaskFormDto: UpdateTaskFormDto,
  // ) {
  //   return this.taskFormService.update(+id, updateTaskFormDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.taskFormService.remove(+id);
  // }
}
