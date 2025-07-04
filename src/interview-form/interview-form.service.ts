import { Injectable } from '@nestjs/common';
// import { CreateInterviewFormDto } from './dto/create-interview-form.dto';
// import { UpdateInterviewFormDto } from './dto/update-interview-form.dto';

@Injectable()
export class InterviewFormService {
  // create(createInterviewFormDto: CreateInterviewFormDto) {
  //   return 'This action adds a new interviewForm';
  // }

  findAll() {
    return `This action returns all interviewForm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} interviewForm`;
  }

  // update(id: number, updateInterviewFormDto: UpdateInterviewFormDto) {
  //   return `This action updates a #${id} interviewForm`;
  // }

  remove(id: number) {
    return `This action removes a #${id} interviewForm`;
  }
}
