import {
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  Param,
  // Delete,
} from '@nestjs/common';
import { InternshipFormService } from './internship-form.service';
// import { CreateInternshipFormDto } from './dto/create-internship-form.dto';
// import { UpdateInternshipFormDto } from './dto/update-internship-form.dto';

@Controller('internship-form')
export class InternshipFormController {
  constructor(private readonly internshipFormService: InternshipFormService) {}

  // @Post()
  // create(@Body() createInternshipFormDto: CreateInternshipFormDto) {
  //   return this.internshipFormService.create(createInternshipFormDto);
  // }

  @Get()
  findAll() {
    return this.internshipFormService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.internshipFormService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateInternshipFormDto: UpdateInternshipFormDto) {
  //   return this.internshipFormService.update(+id, updateInternshipFormDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.internshipFormService.remove(+id);
  // }
}
