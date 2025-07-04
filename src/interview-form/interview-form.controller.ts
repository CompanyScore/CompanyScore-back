import {
  Controller,
  Get,
  Post,
  // Body,
  // Patch,
  Param,
  // Delete,
} from '@nestjs/common';
import { InterviewFormService } from './interview-form.service';
// import { CreateInterviewFormDto } from './dto/create-interview-form.dto';
// import { UpdateInterviewFormDto } from './dto/update-interview-form.dto';

@Controller('interview-form')
export class InterviewFormController {
  constructor(private readonly interviewFormService: InterviewFormService) {}

  @Post()
  // create(@Body() createInterviewFormDto: CreateInterviewFormDto) {
  //   return this.interviewFormService.create(createInterviewFormDto);
  // }
  @Get()
  findAll() {
    return this.interviewFormService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interviewFormService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateInterviewFormDto: UpdateInterviewFormDto,
  // ) {
  //   return this.interviewFormService.update(+id, updateInterviewFormDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.interviewFormService.remove(+id);
  // }
}
