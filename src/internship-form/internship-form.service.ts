import { Injectable } from '@nestjs/common';
// import { CreateInternshipFormDto } from './dto/create-internship-form.dto';
// import { UpdateInternshipFormDto } from './dto/update-internship-form.dto';

@Injectable()
export class InternshipFormService {
  // create(createInternshipFormDto: CreateInternshipFormDto) {
  //   return 'This action adds a new internshipForm';
  // }

  findAll() {
    return `This action returns all internshipForm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} internshipForm`;
  }

  // update(id: number, updateInternshipFormDto: UpdateInternshipFormDto) {
  //   return `This action updates a #${id} internshipForm`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} internshipForm`;
  // }
}
