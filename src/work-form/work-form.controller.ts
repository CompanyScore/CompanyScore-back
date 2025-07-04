import {
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  Param,
  // Delete,
} from '@nestjs/common';
import { WorkFormService } from './work-form.service';
// import { CreateWorkFormDto } from './dto/create-work-form.dto';
// import { UpdateWorkFormDto } from './dto/update-work-form.dto';

@Controller('work-form')
export class WorkFormController {
  constructor(private readonly workFormService: WorkFormService) {}

  // @Post()
  // create(@Body() createWorkFormDto: CreateWorkFormDto) {
  //   return this.workFormService.create(createWorkFormDto);
  // }

  @Get()
  findAll() {
    return this.workFormService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workFormService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateWorkFormDto: UpdateWorkFormDto,
  // ) {
  //   return this.workFormService.update(+id, updateWorkFormDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.workFormService.remove(+id);
  // }
}
