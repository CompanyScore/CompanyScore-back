import { Injectable } from '@nestjs/common';
// import { CreateTaskFormDto } from './dto/create-task-form.dto';
// import { UpdateTaskFormDto } from './dto/update-task-form.dto';

@Injectable()
export class TaskFormService {
  // create(createTaskFormDto: CreateTaskFormDto) {
  //   return 'This action adds a new taskForm';
  // }

  findAll() {
    return `This action returns all taskForm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskForm`;
  }

  // update(id: number, updateTaskFormDto: UpdateTaskFormDto) {
  //   return `This action updates a #${id} taskForm`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} taskForm`;
  // }
}
