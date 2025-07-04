import { Injectable } from '@nestjs/common';
// import { CreateWorkFormDto } from './dto/create-work-form.dto';
// import { UpdateWorkFormDto } from './dto/update-work-form.dto';

@Injectable()
export class WorkFormService {
  // create(createWorkFormDto: CreateWorkFormDto) {
  //   return 'This action adds a new workForm';
  // }

  findAll() {
    return `This action returns all workForm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workForm`;
  }

  // update(id: number, updateWorkFormDto: UpdateWorkFormDto) {
  //   return `This action updates a #${id} workForm`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} workForm`;
  // }
}
